import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('section #tmd-main-title')).getText();
  }

  getContentSectionContents() {
    return element(by.css('section#app-content app-tmd-search')).getText();
  }
}
