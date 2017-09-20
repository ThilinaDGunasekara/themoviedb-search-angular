import { Component, Input } from '@angular/core';

import * as config from '../config.json';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent {
  @Input() movie = {};
  imageBaseUrl: string = config['image-url'];

  constructor() {}

}
