import { createReducer, on } from '@ngrx/store';
import * as ItemActions from './item.actions';
import { Item } from '../models/item.class';

export interface ItemState {
  items: Item[];
}

export const initialState: ItemState = {
  items: []
};

export const itemReducer = createReducer(
  initialState,

  on(ItemActions.addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),

  on(ItemActions.updateItem, (state, { id, changes }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, ...changes, updatedAt: new Date() } : item
    )
  })),

  on(ItemActions.toggleDelete, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, deleted: !item.deleted } : item
    )
  })),

  on(ItemActions.togglePurchased, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    )
  })),

  // Per dimostrare immutability nel portfolio
  on(ItemActions.resetItems, () => initialState)
);