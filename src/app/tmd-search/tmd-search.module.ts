import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TmdSearchComponent } from './tmd-search.component';
import { TmdSearchService } from './tmd-search.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    TmdSearchComponent
  ],
  declarations: [TmdSearchComponent],
  providers: [TmdSearchService]
})
export class TmdSearchModule { }
