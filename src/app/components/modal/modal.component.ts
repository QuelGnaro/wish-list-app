import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IForm } from '../../interface/form.interface';
import { itemFormConfig } from '../../constants/item-form.constant';
import { Item } from '../../models/item.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  itemForm = itemFormConfig as IForm;

  @Input() title = 'Modale';
  @Input() message = 'Messaggio generico';


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }



}
