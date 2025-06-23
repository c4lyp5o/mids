import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'crypto';

// Interface for Mosque Account document
export interface IMosqueAccount extends Document {
  mosqueName: string;
  details?: string;
  zone: string;
  email: string;
  password: string;
  notifications?: Array<{
    type: string;
  }>;
  images?: Array<{
    filename: string;
    path: string;
    uploadedAt: Date;
  }>;
  //   phoneNumber: string;
  //   establishedYear?: number;
  //   address: {
  //     street: string;
  //     city: string;
  //     state: string;
  //     country: string;
  //     postalCode: string;
  //     coordinates?: [number, number]; // [longitude, latitude]
  //   };
  //   facilities: {
  //     prayerHall: {
  //       capacity: number;
  //       hasWomenSection: boolean;
  //     };
  //     parking: {
  //       available: boolean;
  //       capacity?: number;
  //     };
  //     wuduFacilities: {
  //       men: number;
  //       women: number;
  //     };
  //     hasWheelchairAccess: boolean;
  //   };
  //   prayerSettings: {
  //     calculationMethod: string;
  //     madhab: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
  //     adjustments: {
  //       fajr?: number;
  //       dhuhr?: number;
  //       asr?: number;
  //       maghrib?: number;
  //       isha?: number;
  //       jumuah?: string; // Time in HH:mm format
  //     };
  //   };
  //   services: {
  //     dailyClasses: boolean;
  //     weekendSchool: boolean;
  //     funeralServices: boolean;
  //     marriageServices: boolean;
  //     charityCollection: boolean;
  //     ifterDuringRamadan: boolean;
  //   };
  //   createdAt: Date;
  //   updatedAt: Date;
  //   comparePassword(candidatePassword: string): Promise<boolean>;
}

// Mosque Account Schema
const mosqueAccountSchema = new Schema<IMosqueAccount>(
  {
    mosqueName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
      default: '',
    },
    zone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    notifications: [
      {
        id: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
    images: [
      {
        filename: {
          type: String,
          required: true,
        },
        path: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // phoneNumber: {
    //     type: String,
    //     required: true
    // },
    // establishedYear: {
    //     type: Number
    // },
    // address: {
    //     street: {
    //         type: String,
    //         required: true
    //     },
    //     city: {
    //         type: String,
    //         required: true
    //     },
    //     state: {
    //         type: String,
    //         required: true
    //     },
    //     country: {
    //         type: String,
    //         required: true
    //     },
    //     postalCode: {
    //         type: String,
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         index: '2dsphere'
    //     }
    // },
    // facilities: {
    //     prayerHall: {
    //         capacity: {
    //             type: Number,
    //             required: true
    //         },
    //         hasWomenSection: {
    //             type: Boolean,
    //             default: true
    //         }
    //     },
    //     parking: {
    //         available: {
    //             type: Boolean,
    //             default: true
    //         },
    //         capacity: Number
    //     },
    //     wuduFacilities: {
    //         men: {
    //             type: Number,
    //             required: true
    //         },
    //         women: {
    //             type: Number,
    //             required: true
    //         }
    //     },
    //     hasWheelchairAccess: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    // prayerSettings: {
    //     calculationMethod: {
    //         type: String,
    //         default: 'MWL' // Muslim World League
    //     },
    //     madhab: {
    //         type: String,
    //         enum: ['hanafi', 'shafi', 'maliki', 'hanbali'],
    //         default: 'hanafi'
    //     },
    //     adjustments: {
    //         fajr: Number,
    //         dhuhr: Number,
    //         asr: Number,
    //         maghrib: Number,
    //         isha: Number,
    //         jumuah: String
    //     }
    // },
    // services: {
    //     dailyClasses: {
    //         type: Boolean,
    //         default: false
    //     },
    //     weekendSchool: {
    //         type: Boolean,
    //         default: false
    //     },
    //     funeralServices: {
    //         type: Boolean,
    //         default: false
    //     },
    //     marriageServices: {
    //         type: Boolean,
    //         default: false
    //     },
    //     charityCollection: {
    //         type: Boolean,
    //         default: false
    //     },
    //     ifterDuringRamadan: {
    //         type: Boolean,
    //         default: false
    //     }
    // }
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Index for faster queries
// mosqueAccountSchema.index({ email: 1 });
// mosqueAccountSchema.index({ mosqueName: 1 });
// mosqueAccountSchema.index({ 'address.coordinates': '2dsphere' });

// Hash password before saving
// mosqueAccountSchema.pre(
//   'save',
//   async function (this: IMosqueAccount, next: any) {
//     if (!this.isModified('password')) return next();

//     try {
//       const salt = await bcrypt.randomBytes(16).toString('hex');
//       const hash = await bcrypt
//         .pbkdf2Sync(this.password, salt, 1000, 64, 'sha512')
//         .toString('hex');
//       this.password = `${salt}:${hash}`;
//       next();
//     } catch (error) {
//       next(error as Error);
//     }
//   }
// );

// // Method to compare passwords
// mosqueAccountSchema.methods.comparePassword = async function (
//   this: IMosqueAccount,
//   candidatePassword: string
// ): Promise<boolean> {
//   try {
//     const [salt, storedHash] = this.password.split(':');
//     const hash = bcrypt
//       .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
//       .toString('hex');
//     return storedHash === hash;
//   } catch (error) {
//     return false;
//   }
// };

// Create and export the model
export const MosqueAccount = mongoose.model<IMosqueAccount>(
  'MosqueAccount',
  mosqueAccountSchema
);

export default MosqueAccount;
