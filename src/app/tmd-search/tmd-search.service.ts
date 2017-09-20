import { Injectable } from '@angular/core';
import { Http, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import * as config from './config.json';
import { SearchParameters } from './search-parameters.model';

@Injectable()
/**
 * Service to communicate with 'The Movie Database' API
 *
 * @class
 */
export class TmdSearchService {

  constructor(private http: Http) {}

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
    const searchParameters: URLSearchParams = new URLSearchParams();
    this.addHeaders(queryParameters, searchParameters);
    return this.http.get(endpoint, {search: searchParameters})
      .map(res => res.json());
  }

  private addHeaders(
    queryParameters: SearchParameters, searchParameters: URLSearchParams)
  {
    searchParameters.set('api_key', config['api-key']);
    searchParameters.set('language', 'en-US');
    this.checkAndAddHeader('query', queryParameters.searchQuery, searchParameters);
    this.checkAndAddHeader('include_adult', queryParameters.adult, searchParameters);
    this.checkAndAddHeader('page', queryParameters.page, searchParameters);
  }

  private checkAndAddHeader(
    key: any, value: any, searchParameters: URLSearchParams)
  {
    if (typeof value !== 'undefined') {
      if (typeof value !== 'string') {
        searchParameters.set(key, String(value));
      } else {
        searchParameters.set(key, value);
      }
    }
  }
}
