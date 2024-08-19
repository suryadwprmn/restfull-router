const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nama: {
      type: String,
      required: true,
    },
    jenis_kelamin: {
      type: String,
      enum: ['Pria', 'Wanita'],
      required: true,
    },
    no_hp: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^\d{12,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number! It should be between 12 and 15 digits.`
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'], // Validasi format email
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);
module.exports = User;