import { VocaCliPage } from './app.po';

describe('voca-cli App', () => {
  let page: VocaCliPage;

  beforeEach(() => {
    page = new VocaCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
