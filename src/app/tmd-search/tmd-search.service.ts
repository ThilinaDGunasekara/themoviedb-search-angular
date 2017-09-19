import { Injectable } from '@angular/core';
import { Http, URLSearchParams, QueryEncoder } from '@angular/http';
import 'rxjs/add/operator/map';

import * as config from './config.json';
import { SearchQueryParameters } from './search-query-parameters.model';

@Injectable()
/**
 * Service to communicate with 'The Movie Database' API
 * @class
 */
export class TmdSearchService {

  constructor(private http: Http) {}

  /**
   * Main service's method to search for a movie
   * @param {string} route - route which is used to get JSON data from the API
   * @param {SearchQueryParameters} queryParameters - query parameters for the GET request
   *
   * @return {Observable} - returns Observable to be handled outside
   */
  searchMovie(route: string, queryParameters: SearchQueryParameters) {
      if (queryParameters.query === '') {
        return null;
      }
      const endpoint: string = config['api-url'] + route;
      const queryParametersKeys: Array<string> = Object.keys(queryParameters);
      const searchParameters: URLSearchParams = new URLSearchParams();

      searchParameters.set('api_key', config['api-key']);

      for (const key of queryParametersKeys) {
        if (typeof queryParameters[key] !== 'undefined') {
          searchParameters.set(key, queryParameters[key]);
        }
      }

      return this.http.get(endpoint, {search: searchParameters})
        .map(res => res.json());
  }
}
