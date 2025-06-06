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

  loadingText = 'Salvataggio';

  private dotsCount = 0;
  private maxDots = 3;
  private loadingInterval?: any;


  loading = false;

  form: FormGroup = this.fb.group({
    category: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    const categoryName = this.form.value.category.trim();

    this.startLoadingAnimation();
    this.categoryService.addCategory(categoryName).subscribe({
      next: () => {
        this.form.reset();
        this.stopLoadingAnimation();
      },
      error: (err: any) => {
        console.error('Errore salvataggio categoria', err);
        this.stopLoadingAnimation();
      }
    });
  }




  startLoadingAnimation() {
    this.loading = true;
    this.loadingText = 'Salvataggio';

    this.loadingInterval = setInterval(() => {
      this.dotsCount = (this.dotsCount + 1) % (this.maxDots + 1); // da 0 a maxDots
      this.loadingText = 'Salvataggio' + '.'.repeat(this.dotsCount);
    }, 500); // ogni 500ms cambia
  }

  stopLoadingAnimation() {
    this.loading = false;
    clearInterval(this.loadingInterval);
    this.loadingInterval = undefined;
    this.loadingText = 'Salva';
  }

}
