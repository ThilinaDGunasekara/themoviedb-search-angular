import { Component, OnInit } from '@angular/core';

import * as config from './config.json';
import { TmdSearchService } from './tmd-search.service';
import { SearchQueryParameters } from './search-query-parameters.model'

@Component({
  selector: 'app-tmd-search',
  templateUrl: './tmd-search.component.html',
  styleUrls: ['./tmd-search.component.scss']
})
/**
 * Component which handles 'The Movie Database' API communication
 * and data presentation
 * @class
 */
export class TmdSearchComponent implements OnInit {

  movies: Object = {};
  totalPages: number = 0;
  imageBaseUrl: string = config['image-url'];
  searchQuery: string = '';
  forAdults: boolean = false;

  constructor(private tmdSearchService: TmdSearchService) {}

  ngOnInit() {}

  /**
   * Main callback to handle and the API query with a given parameters
   * @param {number} page - page number parameter for the API (default 1)
   */
  search(page: number = 1): void {
    if(!this.searchQuery.length) {
      return;
    }

    const route = '/search/movie';
    this.tmdSearchService.searchMovie(route, this.prepareQueryParameters(page))
      .subscribe(
          res => this.movies = res,
          err => console.error(err),
          () => {}
      );
  }

  private prepareQueryParameters(page: number): SearchQueryParameters {
    let queryParameters = new SearchQueryParameters();
    queryParameters['query'] = this.searchQuery;
    queryParameters['page'] = page;
    queryParameters['include_adult'] = this.forAdults;
    //queryParameters['year'] = 1999;
    return queryParameters;
  }
}
