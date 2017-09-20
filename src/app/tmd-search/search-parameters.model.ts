export class SearchParameters {
  constructor(
    public searchQuery = '',
    public adult?: boolean,
    public page?: number) {}
}
