import { Movie } from './movie.model';
import { MoviesService } from './movies.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  films: Array<Movie> = [];

  user: any = {};

  constructor(private service: MoviesService) { }

  ngOnInit(): void {
    this.readResults();
      this.account();
    }

  async readResults() {

    const response = await this.service.makeUrl();
    const json = await response.json();
    const results = json.results;

    for (var i in results) {
      this.films.push(results[i]);
    }
  }

  async account() {
    const user = await localStorage.getItem('user');
    this.user = await JSON.parse(user!);
  }

  getImage(url: string) {
    const urlImage = `https://image.tmdb.org/t/p/w200${url}`
    return urlImage;
  }

}
