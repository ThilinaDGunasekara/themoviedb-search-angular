import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { TmdSearchService } from './tmd-search.service';
import { SearchParameters } from './search-parameters.model';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchItemComponent } from './search-item/search-item.component';

@Component({
  selector: 'app-tmd-search',
  templateUrl: './tmd-search.component.html',
  styleUrls: ['./tmd-search.component.scss']
})
/**
 * Component which calls the service and handles data presentation
 *
 * @class
 */
export class TmdSearchComponent implements OnInit {
  movies: Object = {};
  totalPages = 0;
  searchQuery: '';
  forAdults = false;
  page = 1;
  pages: Array<number> = [];
  searchForm: FormGroup;

  constructor(private tmdSearchService: TmdSearchService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
      forAdults: new FormControl(false)
    });
  }

  /**
   * Callback to handle the API query with a given parameters (from pagination)
   * @param {number} page - page number parameter for the API (default 1)
   */
  setPage(page: number = 1): void {
    this.tmdSearchService.searchMovie(this.packSearchParameters(page))
      .subscribe(
        res => this.handleResponse(res),
        err => console.error(err),
        () => {}
      );
  }

  /**
   * Callback to handle the API query with a given parameters (from form)
   * @param {FormGroup} form - form from the view (HTML)
   */
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.tmdSearchService.searchMovie(this.packSearchParametersForm(form))
        .subscribe(
          res => this.handleResponse(res),
          err => console.error(err),
          () => {}
        );
    }
  }

  private packSearchParametersForm(form: FormGroup): SearchParameters {
    return new SearchParameters(
      this.searchQuery = form.value.searchQuery,
      this.forAdults = form.value.forAdults
    );
  }

  private packSearchParameters(page: number): SearchParameters {
    return new SearchParameters(
      this.searchQuery,
      this.forAdults,
      page
    );
  }

  private handleResponse(response) {
    this.movies = response;
    this.pages.length = 0;
    for (let i = 0; i < response.total_pages; ++i) {
      this.pages.push(i + 1);
    }
  }
}
