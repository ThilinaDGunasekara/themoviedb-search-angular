import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { TmdSearchComponent } from './tmd-search.component';
import { TmdSearchService } from './tmd-search.service';
import { SearchParameters } from './search-parameters.model';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchItemComponent } from './search-item/search-item.component';

describe('TmdSearchComponent', () => {
  let component: TmdSearchComponent;
  let fixture: ComponentFixture<TmdSearchComponent>;

  class TmdSearchServiceStub {
    searchMovie(route: string, searchQueryParameters: SearchParameters): Observable<any> {
      return new Observable((observer) => {
        observer.complete();
      });
    }
  }

  function createSearchForm(query: string, adult: boolean = false): FormGroup {
    return new FormGroup({
      searchQuery: new FormControl(query),
      forAdults: new FormControl(adult)
    });
  }

  function initializeSearchQuery(
    query?: string,
    page?: number,
    includeAdult?: boolean): SearchParameters
  {
    const searchQueryParameters = new SearchParameters();
    searchQueryParameters.searchQuery = query;
    if (typeof page !== 'undefined') {
      searchQueryParameters.page = page;
    }
    if (typeof includeAdult !== 'undefined') {
      searchQueryParameters.adult = includeAdult;
    }
    return searchQueryParameters;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TmdSearchComponent,
        PaginationComponent,
        SearchItemComponent
      ],
      imports: [
        ReactiveFormsModule
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
    const form = createSearchForm('');
    form.disable();
    component.onSubmit(form);
    expect(tmdSearchService.searchMovie).not.toHaveBeenCalled();
  }));

  it('should generate proper url parameters - default parameter',
    inject([TmdSearchService], (tmdSearchService) =>
  {
    const toCompare = initializeSearchQuery('Abc', undefined, false);
    expect(component).toBeTruthy();
    spyOn(tmdSearchService, 'searchMovie').and.callThrough();
    component.onSubmit(createSearchForm('Abc'));
    expect(tmdSearchService.searchMovie).toHaveBeenCalledWith(toCompare);
  }));

  it('should generate proper url parameters with page = 3',
    inject([TmdSearchService], (tmdSearchService) =>
  {
    let toCompare = initializeSearchQuery('Abc', undefined, true);
    expect(component).toBeTruthy();
    spyOn(tmdSearchService, 'searchMovie').and.callThrough();
    component.onSubmit(createSearchForm('Abc', true));
    expect(tmdSearchService.searchMovie).toHaveBeenCalledWith(toCompare);
    toCompare = initializeSearchQuery('Abc', 3, true);
    component.setPage(3);
    expect(tmdSearchService.searchMovie).toHaveBeenCalledWith(toCompare);
  }));
});
