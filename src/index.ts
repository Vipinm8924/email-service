import { EmailService } from './emailService';

const emailService = new EmailService();
emailService.sendEmail('test@example.com', 'Test Subject', 'Test Body');
