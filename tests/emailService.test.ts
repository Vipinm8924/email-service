import { EmailService } from '../src/emailService';
import { ProviderA } from '../src/providerA';  // Import the mock providers

jest.mock('../src/providerA');  // Mock the provider

describe('EmailService', () => {
  let emailService: EmailService;
  let providerAMock: jest.Mocked<ProviderA>;  // Use the mocked type for the provider

  beforeEach(() => {
    emailService = new EmailService();
    providerAMock = new ProviderA() as jest.Mocked<ProviderA>;  // Mock instance of ProviderA
  });

  it('should send email successfully', async () => {
    // Mocking the behavior of sendEmail method
    providerAMock.sendEmail.mockResolvedValueOnce(undefined);  // Mock resolved behavior
    
    await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).resolves.not.toThrow();
  });

  it('should handle retries and fallback', async () => {
    // Mock the ProviderA behavior to reject once and resolve later
    providerAMock.sendEmail.mockRejectedValueOnce(new Error('Failed'))  // First failure
      .mockResolvedValueOnce(undefined);  // Success on the second attempt

    await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).resolves.not.toThrow();
  });
});
