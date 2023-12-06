import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Book, BooksDTO } from '../models/books-DTO';

@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  private readonly BookAPI = 'https://www.googleapis.com/books/v1/volumes'
  constructor(
    private http: HttpClient
  ) { }

  getLivros(name: string): Observable<Book[]> {
    const params = new HttpParams().append('q', name)
    return this.http.get<BooksDTO>(this.BookAPI, {params}).pipe(
      tap(response=> console.log("tap: ", response)),
      map(response=> response.items),
      tap(response=> console.log("tap pos map: ", response)),
    )
  }
}