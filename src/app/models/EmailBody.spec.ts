import { EmailBody } from './EmailBody';

describe('EmailBody', () => {
  it('should create an instance', () => {
    expect(new EmailBody("email", "subject", "content")).toBeTruthy();
  });
});