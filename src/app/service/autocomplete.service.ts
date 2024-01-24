import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private url = 'https://api.jikan.moe/v4/'

  constructor(private http: HttpClient) { }
  
  search(query: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}anime?q=${query}`)
  }
}
