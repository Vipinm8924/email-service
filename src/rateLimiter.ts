class RateLimiter {
    private lastRequestTime: number = 0;
    private rateLimit: number = 1000; // 1 second
  
    isRateLimited(): boolean {
      const now = Date.now();
      if (now - this.lastRequestTime < this.rateLimit) {
        return true;
      }
      this.lastRequestTime = now;
      return false;
    }
  }
  
  export { RateLimiter };
  