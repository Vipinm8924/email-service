class ProviderA {
    async sendEmail(email: string, subject: string, body: string): Promise<void> {
      console.log('Provider A sending email...');
      // Simulate a failure or success
      if (Math.random() < 0.5) {
        throw new Error('Provider A failed to send email');
      }
    }
  }
  
  export { ProviderA };