import { TwitchHubPage } from './app.po';

describe('twitch-hub App', () => {
  let page: TwitchHubPage;

  beforeEach(() => {
    page = new TwitchHubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
