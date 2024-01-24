import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimeServiceService {
  private url = 'https://api.jikan.moe/v4/'

  constructor(private http: HttpClient) { }

    getAnime() {
      return this.http.get(`${this.url}anime`);
    }

    getAnimeByName(name: string) {
      const params = { q: name };
      return this.http.get<any>(`${this.url}anime`, { params });
    }

  getAnimeGenre() {
    console.log(`${this.url}genres/anime`)
    return this.http.get<any>(`${this.url}genres/anime`);
  }

  getAnimeByGenreAndName(name: string, genres: number) {
    const params = new HttpParams()
      .set('q', name)
      .set('genres', genres.toString() || '');
    console.log(`${this.url}anime`, { params });

    return this.http.get<any>(`${this.url}anime`, { params });
  }
}
