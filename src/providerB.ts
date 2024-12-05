class ProviderB {
    async sendEmail(email: string, subject: string, body: string): Promise<void> {
      console.log('Provider B sending email...');
      // Simulate a failure or success
      if (Math.random() < 0.5) {
        throw new Error('Provider B failed to send email');
      }
    }
  }
  
  export { ProviderB };
  