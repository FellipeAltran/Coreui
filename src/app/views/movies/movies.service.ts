import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apikey: string = 'f3441998870ae77c459a30ad1ffd9fe8';

  baseUrl: string = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=';

  constructor() { }

  makeUrl() {
    const response = fetch(`${this.baseUrl}${this.apikey}`);
    return response;
  }
}
