import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  fb = inject(FormBuilder);

  @Input() form!: IForm;
  @Input() itemId?: string; // Riceve l'ID dall'esterno
  @Output() formSubmitted = new EventEmitter<void>(); // Emette evento al submit
  @Input() formData?: any;

  isSubmitting = false;
  isEditMode = false;
  currentItemId: string | null = null;
  dynamicForm: FormGroup = this.fb.group({}, { updateOn: 'submit' });

  ngOnInit(): void {
    this.initializeForm();

    if (this.formData) {
      this.loadFormData(this.formData);
    }
  }

  loadFormData(data: any): void {
    this.isEditMode = true;
    this.currentItemId = data.id;

    this.dynamicForm.patchValue({
      itemName: data.itemName,
      externalUrl: data.externalUrl,
      imageUrl: data.imageUrl,
      targetPrice: data.targetPrice,
      quantity: data.quantity,
      type: data.type,
      category: data.category,
      description: data.description
    });

    this.form.saveBtnLabel = 'Aggiorna';
  }

  initializeForm(): void {
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
      this.isSubmitting = true;
      const formData = this.dynamicForm.value;

      if (this.isEditMode && this.currentItemId) {
        this.updateItem(formData);
      } else {
        this.createItem(formData);
      }
    }
  }

  private updateItem(formData: any): void {
    const updatedData = {
      id: this.currentItemId,
      itemName: formData.itemName,
      description: formData.description,
      targetPrice: formData.targetPrice,
      quantity: formData.quantity,
      imageUrl: formData.imageUrl,
      category: formData.category,
      type: formData.type,
      externalUrl: formData.externalUrl
    };

    this.itemService.updateItem(updatedData).subscribe({
      next: () => {
        this.handleSuccess();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private createItem(formData: any): void {
    this.itemService.createItem(formData).subscribe({
      next: () => {
        this.handleSuccess();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private handleSuccess(): void {
    this.resetForm();
    this.isSubmitting = false;
    this.formSubmitted.emit(); // Notifica il submit riuscito
  }

  private handleError(err: any): void {
    console.error(err);
    this.isSubmitting = false;
    // Qui potresti aggiungere la gestione degli errori visibile all'utente
  }

  resetForm(): void {
    this.dynamicForm.reset();
    Object.keys(this.dynamicForm.controls).forEach(controlName => {
      const control = this.dynamicForm.get(controlName);
      control?.setErrors(null);
      control?.markAsUntouched();
    });
    this.isEditMode = false;
    this.currentItemId = null;
    this.form.saveBtnLabel = 'Crea';
    this.isSubmitting = false;
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
