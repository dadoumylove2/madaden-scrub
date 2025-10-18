import { config } from 'dotenv';
import { Resend } from 'resend';

// Load environment variables
config({ path: '.env' });
config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testProductionEmail() {
  try {
    console.log('Testing production email configuration...');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Configured' : 'Not configured');
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return;
    }

    // Test with your verified domain (once configured)
    const testEmail = {
      from: 'orders@madaden.vercel.app', // Update this when domain is verified
      to: 'Layepam19@gmail.com', // Test email
      subject: 'Production Test - Madaden Order System',
      html: `
        <h1>Production Email Test</h1>
        <p>This is a test email from your production Madaden order system.</p>
        <p>If you receive this, your email configuration is working correctly!</p>
        <p>Order ID: TEST-PROD-123</p>
        <p>Customer: Test Customer</p>
        <p>Total: $99.99</p>
      `,
    };

    console.log('Sending production test email...');
    const result = await resend.emails.send(testEmail);
    console.log('Production email sent successfully:', result);

  } catch (error) {
    console.error('Failed to send production test email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

testProductionEmail();
