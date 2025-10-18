import { config } from 'dotenv';
import { Resend } from 'resend';

// Load environment variables
config({ path: '.env' });
config({ path: '.env.local' });

const resend = new Resend(process.env.RESEND_API_KEY);

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Email template for order confirmation
const getOrderConfirmationEmail = (data: OrderEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - MADADEN</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4ECDC4; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 15px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MADADEN</h1>
            <p>Order Confirmation</p>
        </div>
        <div class="content">
            <h2>Thank you for your order!</h2>
            <p>Dear ${data.customerName},</p>
            <p>We have received your order and are processing it. You will receive updates on your order status via email.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                
                <h4>Items Ordered:</h4>
                ${data.items.map(item => `
                    <div class="item">
                        <span>${item.productName} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                
                <div class="total">
                    <strong>Total: $${data.total.toFixed(2)}</strong>
                </div>
            </div>
            
            <div class="order-details">
                <h4>Shipping Address:</h4>
                <p>${data.shippingAddress}<br>
                ${data.city}, ${data.state} ${data.zipCode}<br>
                ${data.country}</p>
            </div>
            
            <p>We will review your order and send you an email once it's approved and ready for delivery.</p>
            
            <p>If you have any questions, please contact us at support@madaden.com</p>
        </div>
        <div class="footer">
            <p>© 2024 MADADEN. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

// Email template for admin notification
const getAdminNotificationEmail = (data: OrderEmailData) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Order Received - MADADEN</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4ECDC4; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
        .item { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 15px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MADADEN</h1>
            <p>Congrats! You have received a new order.</p>
        </div>
        <div class="content">
            <h2>Order Details</h2>
            <p>A customer has placed an order. Review the details below and process it from your admin dashboard.</p>
            
            <div class="order-details">
                <h3>Order Details</h3>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
                <p><strong>Customer:</strong> ${data.customerName}</p>
                <p><strong>Email:</strong> ${data.customerEmail}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                
                <h4>Items Ordered:</h4>
                ${data.items.map(item => `
                    <div class="item">
                        <span>${item.productName} x${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                
                <div class="total">
                    <strong>Total: $${data.total.toFixed(2)}</strong>
                </div>
            </div>
            
            <div class="order-details">
                <h4>Shipping Address:</h4>
                <p>${data.shippingAddress}<br>
                ${data.city}, ${data.state} ${data.zipCode}<br>
                ${data.country}</p>
            </div>
            
            <p>Please review and approve this order in your admin dashboard.</p>
        </div>
        <div class="footer">
            <p>© 2024 MADADEN. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

// Email template for order status updates
const getOrderStatusEmail = (data: OrderEmailData, status: string) => {
  const statusMessages = {
    'APPROVED': 'Your order has been approved and is being prepared for delivery.',
    'OUT_FOR_DELIVERY': 'Your order is out for delivery and will arrive soon.',
    'DELIVERED': 'Your order has been delivered successfully!'
  };

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Update - MADADEN</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4ECDC4; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .status { background: #4ECDC4; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>MADADEN</h1>
            <p>Order Update</p>
        </div>
        <div class="content">
            <h2>Order Status Update</h2>
            <p>Dear ${data.customerName},</p>
            
            <div class="status">
                <h3>Order Status: ${status.replace('_', ' ')}</h3>
            </div>
            
            <p>${statusMessages[status as keyof typeof statusMessages]}</p>
            
            <p><strong>Order ID:</strong> ${data.orderId}</p>
            <p><strong>Total Amount:</strong> $${data.total.toFixed(2)}</p>
            
            <p>Thank you for choosing MADADEN!</p>
        </div>
        <div class="footer">
            <p>© 2024 MADADEN. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const sendOrderConfirmationEmail = async (data: OrderEmailData) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return;
    }

    // Use verified Resend domain sender
    const fromEmail = 'orders@madaden.com';
    const toEmail = data.customerEmail; // Send to customer

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Order Confirmation - ${data.orderId}`,
      html: getOrderConfirmationEmail(data),
    });
    
    console.log('Order confirmation email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
};

export const sendAdminNotificationEmail = async (data: OrderEmailData) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'Layepam19@gmail.com';
    
    const result = await resend.emails.send({
      from: 'orders@madaden.com',
      to: adminEmail,
      subject: `Congrats — You received a new order (${data.orderId})`,
      html: getAdminNotificationEmail(data),
    });
    
    console.log('Admin notification email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
};

export const sendOrderStatusEmail = async (data: OrderEmailData, status: string) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return;
    }

    // Use verified Resend domain sender
    const fromEmail = 'orders@madaden.com';
    const toEmail = data.customerEmail; // Send to customer

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Order Update - ${status.replace('_', ' ')} - ${data.orderId}`,
      html: getOrderStatusEmail(data, status),
    });
    
    console.log('Order status email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send order status email:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
};
