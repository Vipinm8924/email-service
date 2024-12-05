import { ProviderA } from './providerA';
import { ProviderB } from './providerB';
import { RateLimiter } from './rateLimiter';
import { CircuitBreaker } from './circuitBreaker';
import { Logger } from './logger';

class EmailService {
  private providerA = new ProviderA();
  private providerB = new ProviderB();
  private rateLimiter = new RateLimiter();
  private circuitBreaker = new CircuitBreaker();
  private logger = new Logger();

  private currentProvider = this.providerA;

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    // Check if rate limit is exceeded
    if (this.rateLimiter.isRateLimited()) {
      this.logger.log('Rate limit exceeded');
      return;
    }

    try {
      // Attempt to send email with retries
      await this.sendWithRetry(email, subject, body, 3, 1000);
    } catch (error: unknown) {
      // Handle error by checking if it's an instance of Error
      if (error instanceof Error) {
        // Now TypeScript knows `error` is an instance of `Error`
        this.logger.log(`Failed to send email: ${error.message}`);
      } else {
        // If error is not an instance of Error, log a generic error message
        this.logger.log('An unknown error occurred while sending email');
      }
    }
  }

  private async sendWithRetry(email: string, subject: string, body: string, retries: number, delay: number) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Try sending email through current provider
        await this.sendEmailThroughProvider(email, subject, body);
        this.logger.log('Email sent successfully');
        return;
      } catch (error) {
        // If the email sending fails, handle retries and fallback
        if (attempt === retries) {
          this.logger.log('Max retries reached. Fallback mechanism triggered');
          await this.switchProvider();
          await this.sendEmailThroughProvider(email, subject, body);
        } else {
          await this.exponentialBackoff(delay * attempt);
        }
      }
    }
  }

  private async sendEmailThroughProvider(email: string, subject: string, body: string): Promise<void> {
    // Check if circuit breaker is open (failure state)
    if (this.circuitBreaker.isOpen()) {
      throw new Error('Circuit breaker is open');
    }
    // Send the email using the current provider
    await this.currentProvider.sendEmail(email, subject, body);
  }

  private async switchProvider() {
    // Switch between providers
    this.currentProvider = this.currentProvider === this.providerA ? this.providerB : this.providerA;
  }

  private exponentialBackoff(delay: number) {
    // Implement exponential backoff strategy
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}

export { EmailService };
