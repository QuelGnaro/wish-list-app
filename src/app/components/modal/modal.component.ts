import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IForm } from '../../interface/form.interface';
import { itemFormConfig } from '../../constants/item-form.constant';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  itemForm = itemFormConfig as IForm;

  @Input() title = 'Modale';
  @Input() itemData?: any; // Riceve direttamente i dati dell'item

  constructor(public activeModal: NgbActiveModal) { }

  confirm() {
    this.activeModal.close('confirm');
  }

}
