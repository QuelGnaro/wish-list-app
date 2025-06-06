import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../components/item/item.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgbModalModule, NgbModule, NgbNavModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemListComponent } from '../components/item-list/item-list.component';
import { ToggleButtonComponent } from '../components/toggle-button/toggle-button.component';
import { ModalComponent } from '../components/modal/modal.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMoneyModalComponent } from '../components/add-money-modal/add-money-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryModalComponent } from '../components/category-modal/category-modal.component';
import { SkeletonComponent } from '../components/skeleton/skeleton.component';

const sharedModules = [
  DynamicFormComponent, CommonModule, RouterModule, NgbNavModule, NgbProgressbarModule, NgbModule, NgbModalModule, HttpClientModule, ReactiveFormsModule, FormsModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    ItemComponent,
    ItemListComponent,
    ToggleButtonComponent,
    ModalComponent,
    AddMoneyModalComponent,
    CategoryModalComponent,
    SkeletonComponent,

  ],
  imports: [
    ...sharedModules
  ],
  exports: [...sharedModules,]
})
export class SharedModule { }
