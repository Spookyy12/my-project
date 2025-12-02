import { EmailNotification } from '../types';

// Helper to trigger a UI toast to "show" the email working
const dispatchEmailEvent = (to: string, subject: string, body: string) => {
  const event = new CustomEvent('mock-email-sent', {
    detail: { to, subject, body }
  });
  window.dispatchEvent(event);
};

// In a real app, this would connect to SendGrid via a backend API
export const sendMockEmail = async (to: string, type: EmailNotification['type'], details?: string): Promise<boolean> => {
  console.log(`[SendGrid Simulation] Sending ${type} email to ${to}...`);
  
  const template = getEmailTemplate(type, to.split('@')[0]); // Simple username extraction
  const finalBody = `${template.body} ${details ? `\n\nDetails: ${details}` : ''}`;

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[SendGrid Simulation] Email sent successfully.`);
      dispatchEmailEvent(to, template.subject, finalBody);
      resolve(true);
    }, 1500);
  });
};

export const getEmailTemplate = (type: EmailNotification['type'], username: string) => {
  switch (type) {
    case 'welcome':
      return {
        subject: "Welcome to Our Ears Are Open",
        body: `Hi ${username}, welcome to our warm community. We are here to listen. Your account has been created.`
      };
    case 'confirmation':
      return {
        subject: "Booking Confirmed",
        body: `Hi ${username}, your 15-minute session has been booked. Payment received.`
      };
    case 'reminder':
      return {
        subject: "Upcoming Conversation",
        body: `Hi ${username}, your chat with a volunteer starts in 15 minutes.`
      };
    default:
      return { subject: "Notification", body: "You have a new notification." };
  }
};