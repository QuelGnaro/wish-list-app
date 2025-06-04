import { Component, } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.class';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  items: Item[] = [];

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
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.itemToEdit = null;
  }




}
