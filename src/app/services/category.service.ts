import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  $baseUrl = "https://script.google.com/macros/s/AKfycbwNl7x90zCx_7It29jlz1BZnv04J1fmvceotH10Nc3fqQ3TQjSU0vCm42HnF4zmUdY/exec";

  private refreshCategoriesSubject = new Subject<void>();
  refreshCategories$ = this.refreshCategoriesSubject.asObservable();

  constructor(private http: HttpClient) { }

  addCategory(name: string) {
    const body = new URLSearchParams();
    body.set('action', 'addCategory');
    body.set('name', name);

    return this.http.post(this.$baseUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    }).pipe(
      tap(() => {
        this.refreshCategoriesSubject.next();
      })
    );
  }

  getCategories() {
    //todo: get categories from google sheet
  }
}
