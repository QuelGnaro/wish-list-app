import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IForm, IFormControl, IValidator } from '../../interface/form.interface';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {

  private itemService = inject(ItemService);

  isSubmitting = false;
  @Input() form !: IForm;


  fb = inject(FormBuilder);
  dynamicForm: FormGroup = this.fb.group({}, { updateOn: 'submit' });

  ngOnInit(): void {
    if (this.form?.formControls) {
      let formGroup: any = {};
      this.form.formControls.forEach((control: IFormControl) => {
        let controlValidators: any[] = [];
        if (control.validators) {
          control.validators.forEach((val: IValidator) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
            if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern as string));
            if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minLength as number));
            if (val.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength as number));
          });
        }
        // !multiple checkbox management
        if (control.type === 'checkbox' && control.options) {
          const selectedValues = control.options
            .filter(option => option.selected)
            .map(option => option.value);
          formGroup[control.name] = this.fb.control(selectedValues, controlValidators);
        } else {
          formGroup[control.name] = [control.value || '', controlValidators];
        }
      });
      this.dynamicForm = this.fb.group(formGroup);
    }
  }

  onSubmit(): void {
    if (this.dynamicForm.valid && !this.isSubmitting) {
      this.isSubmitting = true; // Disabilita il bottone

      const newItem = this.dynamicForm.value;
      this.itemService.createItem(newItem).subscribe({
        next: () => {
          this.resetForm();
          this.isSubmitting = false; // Riabilita il bottone
        },
        error: (err) => {
          console.log(err, "err");
          this.isSubmitting = false; // Riabilita il bottone anche in caso di errore
        }
      });
    }
  }

  resetForm(): void {
    this.dynamicForm.reset();
    Object.keys(this.dynamicForm.controls).forEach(controlName => {
      const control = this.dynamicForm.get(controlName);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
  }

  getValidationErrorMessage(control: IFormControl): string {
    const myControl = this.dynamicForm.get(control.name);
    let errorMessage = '';
    control.validators?.forEach((val) => {
      if (myControl?.hasError(val.validatorName as string)) {
        errorMessage = val.message as string;
      }
    });
    return errorMessage;
  }

  onCheckboxChange(controlName: string, optionValue: any, event: Event): void {
    const control = this.dynamicForm.get(controlName) as FormControl;
    const selectedValues: any[] = control.value || [];
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      if (!selectedValues.includes(optionValue)) {
        selectedValues.push(optionValue);
      }
    } else {
      const index = selectedValues.indexOf(optionValue);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }


    control.setValue(selectedValues);
    control.markAsTouched();
  }

  get textCounter(): number {
    const description = this.dynamicForm.get('description')?.value;
    if (description) {
      return this.dynamicForm.get('description')?.value.length;
    } else {
      return 0;
    }
  }
}
