import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpUrlEncodingCodec } from '@angular/common/http';

import * as config from './config.json';
import { TmdSearchService } from './tmd-search.service';
import { SearchParameters } from './search-parameters.model';

describe('TmdSearchService', () => {
  let http: HttpTestingController;
  let service: TmdSearchService;
  const urlCodec = new HttpUrlEncodingCodec();

  const mockResponse = {
    id: '5'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdSearchService]
    });

    http = TestBed.get(HttpTestingController);
    service = TestBed.get(TmdSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return when no query provided', () => {
    expect(service).toBeTruthy();
    const queryParameters = new SearchParameters();
    expect(service.searchMovie(queryParameters)).toBeNull();
    http.expectNone(config['api-url'] + '/search/movie');
    http.verify();
  });

  it('should generate proper GET request - query provided', function(done) {
    expect(service).toBeTruthy();
    const queryParameters = new SearchParameters();
    queryParameters.searchQuery = 'Matrix';
    service.searchMovie(queryParameters).subscribe(res => {
      expect(res).toEqual({id: '5'});
      done();
    });
    const expectation = http.expectOne({
      url: config['api-url'] + '/search/movie?api_key=' +
      urlCodec.encodeKey(config['api-key']) + '&language=en-US&query=Matrix'});
    expect(expectation.request.method).toEqual('GET');
    expectation.flush(mockResponse);
    http.verify();
  });

  it('should generate proper GET request with custom parameters', function(done) {
    expect(service).toBeTruthy();
    const queryParameters = new SearchParameters('Pirates of', true, 3);
    service.searchMovie(queryParameters).subscribe(res => {
      expect(res).toEqual({id: '5'});
      done();
    });
    const expectation = http.expectOne({
      url: config['api-url'] + '/search/movie?api_key=' +
      urlCodec.encodeKey(config['api-key']) +
      '&language=en-US&query=Pirates%20of&include_adult=true&page=3'});
    expect(expectation.request.method).toEqual('GET');
    expectation.flush(mockResponse);
    http.verify();
  });
});
