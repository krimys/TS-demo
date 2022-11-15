import { model, Schema } from 'mongoose';
import { pick } from 'lodash';
import bcrypt from 'bcryptjs';
import userInterface from '../interface/userInterface';

export type UserDocument = userInterface;

const UserSchema = new Schema(
  {
    // personal detail

    firstName: {
      type: String,
      required: false,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    mobileNumber: {
      type: Number,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    image: {
      type: String,
    },
    parmenentAddress: {
      type: String,
      required: false,
    },
    presentAddress: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['Enable', 'Disable', 'Deleted'],
      default: 'Enable',
    },
    userRole: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    // bank details

    bankName: {
      type: String,
      required: false,
    },
    accoutName: {
      type: String,
      required: false,
    },
    bankAccountNumber: {
      type: Number,
      required: false,
    },
    ifscCode: {
      type: String,
      required: false,
    },
    adharcardNumber: {
      type: Number,
      required: false,
    },
    panNumber: {
      type: String,
      required: false,
    },
    // Professional Details
    designation: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    experienceMonth: {
      type: String,
      required: false,
    },
    experienceYear: {
      type: String,
      required: false,
    },

    currentLocation: {
      type: String,
      required: false,
    },
    skills: [String],
    resume: {
      type: String,
    },
    // Education Details

    educationDetail1: [
      {
        educationName: {
          type: String,
          required: false,
        },
        universityName: {
          type: String,
          required: false,
        },
        result: {
          type: String,
          required: false,
        },
        yearOfPAssing: {
          type: String,
          required: false,
        },
        edId: {
          type: String,
          required: false,
        },
      },
    ],
    //Experience Details
    experienceDetail1: [
      {
        companyName: {
          type: String,
          required: false,
        },
        position: {
          type: String,
          required: false,
        },
        totalYear: {
          type: String,
          required: false,
        },
        lastCtc: {
          type: String,
          required: false,
        },
        epId: {
          type: String,
          required: false,
        },
      },
    ],
    //Current Organization Details

    joiningDate: {
      type: Date,
      required: false,
    },
    nextAppraisal: {
      type: Date,
      required: false,
    },
    currentCtc: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

UserSchema.methods.transform = function () {
  const user = this;
  return pick(user.toJSON(), ['id']);
};

// UserSchema.pre('save', async function (next) {
//   const user: any = this;
//   user.sPassword = await bcrypt.hash(user.sPassword, 8);

//   next();
// });

UserSchema.index({ location: '2dsphere' });
const UserData = model<UserDocument>('users', UserSchema);
export default UserData;
