import { inject, Injectable } from '@angular/core';
import { Item } from '../models/item.class';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  $baseUrl = "https://script.google.com/macros/s/AKfycbwNl7x90zCx_7It29jlz1BZnv04J1fmvceotH10Nc3fqQ3TQjSU0vCm42HnF4zmUdY/exec";




  private refreshItemsSubject = new Subject<void>();
  refreshItems$ = this.refreshItemsSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  items: Item[] = [];

  createItem(data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) {
    const newItem: any = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false
    };
    console.log(newItem, "newItem");

    const body = new URLSearchParams();
    body.set('action', 'addItem');

    for (const key in newItem) {
      if (newItem[key] !== undefined && newItem[key] !== null) {
        body.set(key, String(newItem[key]));
      }
    }

    return this.http.post(this.$baseUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text'
    }).pipe(
      tap(() => {
        this.refreshItemsSubject.next();
      })
    );;
  }

  getItems(): Observable<Item[]> {
    const body = new URLSearchParams();
    body.set('action', 'getItems');

    return this.http.post<Item[]>(this.$baseUrl, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }


  getCategories() {

  }

  deleteItem(id: string) {
    const body = new URLSearchParams();
    body.set('action', 'deleteItem');
    body.set('id', id);
    return this.http.post(this.$baseUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    }).pipe(
      tap(() => {
        this.refreshItemsSubject.next();
      })
    );;;
  }




}