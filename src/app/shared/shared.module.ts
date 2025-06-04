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

const sharedModules = [
  DynamicFormComponent, CommonModule, RouterModule, NgbNavModule, NgbProgressbarModule, NgbModule, NgbModalModule, HttpClientModule
];

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    ItemComponent,
    ItemListComponent,
    ToggleButtonComponent,
    ModalComponent,
  ],
  imports: [
    ...sharedModules
  ],
  exports: [...sharedModules]
})
export class SharedModule { }
