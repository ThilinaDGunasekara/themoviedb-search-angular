import { AppPage } from './app.po';

describe('themoviedb-search App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('The Movie Database Search');
  });

  it('should have app-tmd-search directive', () => {
    page.navigateTo();
    expect(page.getContentSectionContents()).toBeTruthy();
  });


});
