import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-money-modal',
  templateUrl: './add-money-modal.component.html',
  styleUrl: './add-money-modal.component.scss'
})
export class AddMoneyModalComponent {
  @Input() mode: 'single' | 'distribute' = 'single';
  @Input() maxAmount?: number;
  @Input() eligibleItemsCount?: number;
  @Output() moneyAdded = new EventEmitter<number>(); // Aggiungi questo


  amount: number = 0;
  isSubmitting = false;

  constructor(public activeModal: NgbActiveModal) { }

  get title(): string {
    return this.mode === 'single'
      ? 'Aggiungi risparmi'
      : 'Distribuisci risparmi';
  }

  get confirmLabel(): string {
    return this.mode === 'single'
      ? 'Conferma'
      : 'Distribuisci';
  }

  get maxAllowed(): number {
    return this.mode === 'single'
      ? this.maxAmount || 0
      : Infinity;
  }

  confirm() {
    if (this.amount > 0) {
      this.moneyAdded.emit(this.amount); // Emetti l'evento
      console.log("moneyAdded", this.amount);
      this.activeModal.close();
    }
  }
}
