import { Component, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMoneyModalComponent } from '../add-money-modal/add-money-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {

  @Input() item: Item | undefined;
  isFeatureEnabled: boolean = false;
  selectedItem: Item | null = null;

  customOnColor = '#3f51b5';
  customOffColor = '#9e9e9e';
  constructor(private itemService: ItemService,
    private modalService: NgbModal
  ) {

  }



  openEditModal(item: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
      size: 'lg'
    });

    // Passa direttamente i dati dell'item alla modale
    modalRef.componentInstance.itemData = item;
    modalRef.componentInstance.title = 'Modifica Item';

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
        }
      },
      (reason) => {
        console.log('Modale chiusa:', reason);
      }
    );
  }

  onDelete(id: string) {
    console.log(id, "id");
    this.itemService.deleteItem(id).subscribe({
      next: () => {
        console.log("Item deleted");
      }
    });
  }

  onPurchaseHandler(id: string) {
    this.itemService.togglePurchaseStatus(id).subscribe({
      next: () => {
        console.log("Item purchased");
      }
    });
  }


  openMoneyModal(item: Item) {
    const modalRef = this.modalService.open(AddMoneyModalComponent, { centered: true });
    modalRef.componentInstance.context = 'single';
    modalRef.componentInstance.item = item;
    modalRef.componentInstance.maxAmount = item.targetPrice - (item.moneySaved || 0);

    modalRef.componentInstance.moneyAdded.subscribe((amount: number) => {
      console.log("moneyAdded", amount);

      this.itemService.updateMoneySaved(item.id, amount).subscribe({
        next: () => console.log('Aggiornato'),
        error: err => console.error('Errore', err)
      });
    });
  }
}


