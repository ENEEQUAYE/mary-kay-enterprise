import mongoose from "mongoose"

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    stock: { type: Number, default: 10 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    features: [{ type: String }],
    specifications: [
      {
        name: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true },
)

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    phone: { type: String },
  },
  { timestamps: true },
)

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    trackingNumber: { type: String },
  },
  { timestamps: true },
)

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    title: { type: String },
  },
  { timestamps: true },
)

// Export models
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)
export const User = mongoose.models.User || mongoose.model("User", userSchema)
export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema)
