import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wish-list-app';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.loadCategories();
  }
}
