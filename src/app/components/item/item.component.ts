import { Component, Input } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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



  openModal(item: Item) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.itemToEdit = item;
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


}
