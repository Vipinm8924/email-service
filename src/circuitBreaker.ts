class CircuitBreaker {
    private failureCount = 0;
    private threshold = 3;
  
    isOpen(): boolean {
      return this.failureCount >= this.threshold;
    }
  
    recordFailure() {
      this.failureCount++;
    }
  
    reset() {
      this.failureCount = 0;
    }
  }
  
  export { CircuitBreaker };
  