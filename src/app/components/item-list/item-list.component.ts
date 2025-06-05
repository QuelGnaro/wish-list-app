import { Component, } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.class';
import { AddMoneyModalComponent } from '../add-money-modal/add-money-modal.component';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  items: Item[] = [];
  isSubmitting: boolean = false;

  constructor(private modalService: NgbModal,
    private itemService: ItemService
  ) {

  }

  ngOnInit() {
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        console.log(this.items, "items");
      },
      error: (err) => console.error("Errore caricamento", err)
    });

    this.itemService.refreshItems$.subscribe(() => {
      this.itemService.getItems().subscribe(items => {
        this.items = items;
      });
    });
  }

  openModal() {
    import('../modal/modal.component').then(m => {
      const modalRef = this.modalService.open(m.ModalComponent, { centered: true });
      modalRef.componentInstance.itemToEdit = null;
    });
  }


  openGlobalMoneyModal() {
    const modalRef = this.modalService.open(AddMoneyModalComponent, { centered: true });
    modalRef.componentInstance.mode = 'distribute';
    modalRef.componentInstance.eligibleItemsCount = this.items.filter(i => i.moneySaved < i.targetPrice).length;

    modalRef.componentInstance.moneyAdded.subscribe((totalAmount: number) => {
      this.itemService.getItems().subscribe(items => {
        const incompleteItems = items.filter(i => i.moneySaved < i.targetPrice);
        const quota = totalAmount / incompleteItems.length;

        incompleteItems.forEach(item => {
          const remaining = item.targetPrice - item.moneySaved;
          const toAdd = Math.min(quota, remaining);

          this.itemService.updateMoneySaved(item.id, toAdd).subscribe({
            next: () => console.log(`Item ${item.id} aggiornato`),
            error: err => console.error('Errore update', err)
          });
        });
      });
    });
  }


}
