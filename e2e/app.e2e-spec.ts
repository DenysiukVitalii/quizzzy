import { QuizzzyPage } from './app.po';

describe('quizzzy App', function() {
  let page: QuizzzyPage;

  beforeEach(() => {
    page = new QuizzzyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
