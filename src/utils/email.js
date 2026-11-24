// Utility for sending email notifications (using EmailJS or similar service)
// This is a mock implementation for demo purposes. Replace with real email logic as needed.

/**
 * Send an email notification to a user.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} body - Email body (plain text)
 * @returns {Promise<void>} Resolves when sent
 */
export async function sendEmail(to, subject, body) {
  // In a real app, integrate with an email service (e.g., EmailJS, SendGrid, backend API)
  // For demo, just log to console
  // eslint-disable-next-line no-console
  console.log('[MOCK EMAIL] To:', to, '\nSubject:', subject, '\nBody:', body);
  // Simulate async
  return new Promise(resolve => setTimeout(resolve, 300));
}
