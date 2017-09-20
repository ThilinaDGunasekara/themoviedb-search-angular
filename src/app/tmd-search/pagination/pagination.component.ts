import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() pages: Array<number>;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  paginationPage = 1;

  constructor() {}

  setPage(page: number): void {
    this.paginationPage = page;
    this.onPageChange.emit(page);
  }
}
