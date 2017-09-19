import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { TmdSearchComponent } from './tmd-search.component';
import { TmdSearchService } from './tmd-search.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule
  ],
  exports: [
    TmdSearchComponent
  ],
  declarations: [TmdSearchComponent],
  providers: [TmdSearchService]
})
export class TmdSearchModule { }
