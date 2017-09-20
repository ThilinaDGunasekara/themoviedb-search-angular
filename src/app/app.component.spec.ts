import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TmdSearchService } from './tmd-search/tmd-search.service';
import { TmdSearchComponent } from './tmd-search/tmd-search.component';
import { SearchParameters } from './tmd-search/search-parameters.model';

describe('AppComponent', () => {

  class TmdSearchServiceStub {
    searchMovie(route: string, searchQueryParameters: SearchParameters): Observable<any> {
      return new Observable((observer) => {
        observer.complete();
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TmdSearchComponent
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: TmdSearchService, useClass: TmdSearchServiceStub}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'The Movie Database Search'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('The Movie Database Search');
  }));

  it(`should have section app-header`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const section1 = fixture.nativeElement.querySelector('section#app-header');
    expect(section1).not.toBeNull();
  }));

  it(`should have section app-content`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const section2 = fixture.nativeElement.querySelector('section#app-content');
    expect(section2).not.toBeNull();
  }));
});
