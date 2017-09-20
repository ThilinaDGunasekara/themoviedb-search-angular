import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TmdSearchService } from './tmd-search.service';
import { SearchParameters } from './search-parameters.model';

describe('TmdSearchService', () => {
  const mockResponse = {
    id: '5'
  };

  function customEquality(expected: any, value: any): boolean {
    return JSON.stringify(expected).trim() === JSON.stringify(value).trim();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TmdSearchService,
        {provide: XHRBackend, useClass: MockBackend}
      ]
    });
    jasmine.addCustomEqualityTester(customEquality);
  });

  it('should be created',
    inject([TmdSearchService], (service) =>
  {
    expect(service).toBeTruthy();
  }));

  it('should return when no query provided',
    inject([TmdSearchService, Http], (service, http) =>
  {
    expect(service).toBeTruthy();
    const queryParameters = new SearchParameters();
    spyOn(http, 'get').and.callThrough();
    expect(service.searchMovie(queryParameters)).toBeNull();
    expect(http.get).not.toHaveBeenCalled();
  }));

  it('should generate proper GET request - query provided', function(done) {
    inject([TmdSearchService, XHRBackend, Http], (service, mockBackend, http) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      expect(service).toBeTruthy();
      const queryParameters = new SearchParameters();
      queryParameters.searchQuery = 'Matrix';
      spyOn(http, 'get').and.callThrough();
      service.searchMovie(queryParameters).subscribe(res => {
        expect(res).toEqual({id: '5'});
        done();
      });
      expect(http.get).toHaveBeenCalled();
    })();
  });

  it('should generate proper GET request with custom parameters', function(done) {
    inject([TmdSearchService, XHRBackend, Http], (service, mockBackend, http) => {
      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });
      expect(service).toBeTruthy();
      const queryParameters = new SearchParameters();
      queryParameters.searchQuery = 'Pirates';
      queryParameters.adult = true;
      spyOn(http, 'get').and.callThrough();
      service.searchMovie(queryParameters).subscribe(res => {
        expect(res).toEqual({id: '5'});
        done();
      });
      expect(http.get).toHaveBeenCalled();
    })();
  });
});
