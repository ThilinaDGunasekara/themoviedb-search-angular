import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

import { TmdSearchComponent } from './tmd-search.component';
import { TmdSearchService } from './tmd-search.service';
import { SearchQueryParameters } from './search-query-parameters.model';

describe('TmdSearchComponent', () => {
  let component: TmdSearchComponent;
  let fixture: ComponentFixture<TmdSearchComponent>;

  class TmdSearchServiceStub {
    searchMovie(route: string, searchQueryParameters: SearchQueryParameters): Observable<any> {
      return new Observable((observer) => {
        observer.complete();
      });
    }
  }

  function initializeSearchQuery(
    query?: string,
    page?: number,
    includeAdult?: boolean,
    year?: number): SearchQueryParameters
  {
    const searchQueryParameters = new SearchQueryParameters();
    searchQueryParameters.query = query;
    if (typeof page !== 'undefined') {
      searchQueryParameters.page = page;
    }
    if (typeof includeAdult !== 'undefined') {
      searchQueryParameters.include_adult = includeAdult;
    }
    if (typeof year !== 'undefined') {
      searchQueryParameters.year = year;
    }
    return searchQueryParameters;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TmdSearchComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: TmdSearchService, useClass: TmdSearchServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain input field', () => {
    expect(component).toBeTruthy();
    const input = fixture.nativeElement.querySelector('input#tmd-search-input');
    expect(input).not.toBeNull();
  });

  it('should contain button', () => {
    expect(component).toBeTruthy();
    const button = fixture.nativeElement.querySelector('button#tmd-search-button');
    expect(button).not.toBeNull();
    expect(button.innerHTML).toEqual('Search');
  });

  it('should contain "for adult" checkbox', () => {
    expect(component).toBeTruthy();
    const checkbox = fixture.nativeElement.querySelector('input#tmd-for-adults');
    expect(checkbox).not.toBeNull();
  });

  it('should return because search query is empty - default parameter',
    inject([TmdSearchService], (tmdSearchService) =>
  {
    expect(component).toBeTruthy();
    spyOn(tmdSearchService, 'searchMovie').and.callThrough();
    component.search();
    expect(tmdSearchService.searchMovie).not.toHaveBeenCalled();
  }));

  it('should generate proper url parameters - default parameter',
    inject([TmdSearchService], (tmdSearchService) =>
  {
    const toCompare = initializeSearchQuery('Abc', 1, false);
    expect(component).toBeTruthy();
    spyOn(tmdSearchService, 'searchMovie').and.callThrough();
    component.searchQuery = 'Abc';
    component.search();
    expect(tmdSearchService.searchMovie).toHaveBeenCalledWith(
      '/search/movie', toCompare);
  }));

  it('should generate proper url parameters with page = 3',
    inject([TmdSearchService], (tmdSearchService) =>
  {
    const toCompare = initializeSearchQuery('Abc', 3, false);
    expect(component).toBeTruthy();
    spyOn(tmdSearchService, 'searchMovie').and.callThrough();
    component.searchQuery = 'Abc';
    component.search(3);
    expect(tmdSearchService.searchMovie).toHaveBeenCalledWith(
      '/search/movie', toCompare);
  }));
});
