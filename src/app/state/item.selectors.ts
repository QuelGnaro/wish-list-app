import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectItems = (state: AppState) => state.items.items;

export const selectActiveItems = createSelector(
  selectItems,
  (items) => items.filter((item: { deleted: any; }) => !item.deleted)
);