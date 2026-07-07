const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
    },
    // Only meaningful for role = 'admin' | 'superadmin'. Kept generic so
    // the same model can express fine-grained admin permissions later.
    permissions: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Only set/updated for admin & superadmin logins.
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    loginOtpCode: {
      type: String,
      select: false,
    },
    loginOtpExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving whenever it has been modified
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare a plaintext candidate password with the stored hash
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate and store a hashed password-reset token; returns the raw
// (unhashed) token that should be emailed to the user.
UserSchema.methods.getResetPasswordToken = function getResetPasswordToken() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);