import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item.class';

// Azioni atomiche
export const addItem = createAction(
  '[Item] Add',
  props<{ item: Item; }>()  // Item già generato dal service
);

export const updateItem = createAction(
  '[Item] Update',
  props<{ id: string; changes: Partial<Item>; }>()
);

export const toggleDelete = createAction(
  '[Item] Toggle Delete',
  props<{ id: string; }>()
);

export const togglePurchased = createAction(
  '[Item] Toggle Purchased',
  props<{ id: string; }>()
);


// Solo per dimostrazione nel portfolio
export const resetItems = createAction('[Item] Reset');