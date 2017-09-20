import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import * as config from './config.json';
import { SearchParameters } from './search-parameters.model';

@Injectable()
/**
 * Service to communicate with 'The Movie Database' API
 *
 * @class
 */
export class TmdSearchService {
  searchParameters: HttpParams;

  constructor(private http: HttpClient) {}

  /**
   * Main service's method to search for a movie
   * @param {SearchParameters} queryParameters - parameters from the view
   *
   * @return {Observable} - returns Observable to be handled outside
   */
  searchMovie(queryParameters: SearchParameters): Observable<Object> {
    if (queryParameters.searchQuery === '') {
      return null;
    }
    const endpoint: string = config['api-url'] + '/search/movie';
    this.searchParameters = new HttpParams();
    this.addParams(queryParameters);
    return this.http.get(endpoint, { params: this.searchParameters });
  }

  private addParams(queryParameters: SearchParameters)
  {
    this.searchParameters = this.searchParameters.set('api_key', config['api-key']);
    this.searchParameters = this.searchParameters.set('language', 'en-US');
    this.verifyAndAddToParams('query', queryParameters.searchQuery);
    this.verifyAndAddToParams('include_adult', queryParameters.adult);
    this.verifyAndAddToParams('page', queryParameters.page);
  }

  private verifyAndAddToParams(key: any, value: any)
  {
    if (typeof value !== 'undefined') {
      if (typeof value !== 'string') {
        this.searchParameters = this.searchParameters.set(key, String(value));
      } else {
        this.searchParameters = this.searchParameters.set(key, value);
      }
    }
  }
}
