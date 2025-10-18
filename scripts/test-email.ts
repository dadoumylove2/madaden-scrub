import { config } from 'dotenv';
import { Resend } from 'resend';
import { sendOrderStatusEmail } from '../lib/email';

// Load environment variables from .env files
config({ path: '.env' });
config({ path: '.env.local' });

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Configured' : 'Not configured');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set');
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables');
      return;
    }

    // Test order status email function
    const testOrderData = {
      orderId: 'TEST-ORDER-123',
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      total: 99.99,
      items: [
        {
          productName: 'Test Product',
          quantity: 1,
          price: 99.99,
        }
      ],
      shippingAddress: '123 Test St',
      city: 'Test City',
      state: 'Test State',
      zipCode: '12345',
      country: 'Test Country',
    };

    console.log('Sending order status email...');
    await sendOrderStatusEmail(testOrderData, 'APPROVED');
    console.log('Order status email function completed');

  } catch (error) {
    console.error('Failed to send test email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

testEmail();
