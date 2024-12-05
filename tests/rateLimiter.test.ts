import { RateLimiter } from '../src/rateLimiter';

describe('RateLimiter', () => {
  it('should limit requests', () => {
    const rateLimiter = new RateLimiter();
    expect(rateLimiter.isRateLimited()).toBe(false);
    rateLimiter.isRateLimited(); // Called again too soon
    expect(rateLimiter.isRateLimited()).toBe(true);
  });
});
