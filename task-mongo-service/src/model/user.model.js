const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
    select: false
  },
  FirstName: {
    type: String,

  },
  LastName: {
    type: String,

  },
  DOB: {
    type: Date,

  },
  Gender: {
    type: String,

  },

  EmailAddress: {
    type: String,
    unique: true,

  },
  CurrentAddress: {
    Street: String,
    City: String,
    State: String,
    Zipcode: String
  },
  Phone: {
    type: String,

  },
  EmergencyContact: {
    FirstName: String,
    LastName: String,
    Phone: String
  },
  Insurance: {
    ProviderName: String,
    PlanDetails: {
      PolicyName: String,
      PolicyId: String
    }
  },
  Role: {
    RoleName: {
      type: String,

      unique: true
    },
  },
  IsEmailVerified: {
    type: Boolean,
    default: false
  },
  IsProfileCompleted: {
    type: Boolean,
    default: false
  },
  VerificationCode: {
    type: String,
    default: false
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  UpdatedDate: {
    type: Date,
    default: Date.now
  }
})



// Export the model
module.exports = mongoose.model('User', userSchema);
