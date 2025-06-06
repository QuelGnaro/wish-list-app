import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.scss'
})
export class CategoryModalComponent {
  modal = inject(NgbActiveModal);
  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);

  loading = false;

  form: FormGroup = this.fb.group({
    category: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    const categoryName = this.form.value.category.trim();


    this.categoryService.addCategory(categoryName).subscribe({
      next: () => {
        this.form.reset();
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Errore salvataggio categoria', err);
        this.loading = false;
      }
    });
  }

}
