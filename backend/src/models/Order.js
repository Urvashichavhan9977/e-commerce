const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const ShippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String, default: '' },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String, default: '' },
    type: { type: String, enum: ['Home', 'Office'], default: 'Home' },
  },
  { _id: false }
);

const StatusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        'Placed',
        'Confirmed',
        'Out of Stock',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
        'Returned',
      ],
      required: true,
    },
    note: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: {
      type: [OrderItemSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'gpay', 'phonepe', 'paytm', 'credit', 'debit', 'netbanking', 'wallet', 'cod'],
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    coupon: {
      code: { type: String, default: null },
      discountAmount: { type: Number, default: 0 },
    },
    orderStatus: {
      type: String,
      enum: [
        'Placed',
        'Confirmed',
        'Out of Stock',
        'Shipped',
        'Out for Delivery',
        'Delivered',
        'Cancelled',
        'Returned',
      ],
      default: 'Placed',
    },
    statusHistory: {
      type: [StatusHistorySchema],
      default: [],
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    estimatedDelivery: { type: Date },
    trackingId: { type: String, default: '' },
  },
  { timestamps: true }
);

OrderSchema.index({ user: 1, createdAt: -1 });

OrderSchema.pre('validate', function generateOrderId(next) {
  if (!this.orderId) {
    this.orderId = 'AYU' + Math.floor(100000 + Math.random() * 900000);
  }
  if (this.isNew && this.statusHistory.length === 0) {
    this.statusHistory.push({ status: this.orderStatus || 'Placed', note: 'Order placed' });
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);