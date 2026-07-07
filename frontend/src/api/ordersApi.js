import { apiPost, apiGet } from './client'

// Customer-facing order + payment API.
// COD orders are created directly. Online payments go through Razorpay:
// 1) createRazorpayOrder -> gets a Razorpay order + the public key
// 2) Razorpay Checkout widget opens in the browser
// 3) verifyPayment -> backend checks the signature and creates the real Order

export const ordersApi = {
  // Cash on Delivery — creates the order immediately.
  createCodOrder: (payload) => apiPost('/orders', payload),

  // Step 1 of online payment — server computes the real amount and asks
  // Razorpay for an order id.
  createRazorpayOrder: (payload) => apiPost('/orders/razorpay/create-order', payload),

  // Step 3 of online payment — verifies razorpay_signature server-side,
  // then creates the paid Order.
  verifyPayment: (payload) => apiPost('/orders/razorpay/verify', payload),

  // Logged-in customer's own orders.
  myOrders: () => apiGet('/orders/my'),
}