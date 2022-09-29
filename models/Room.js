import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["double", "single", "triple", "family"],
    lowercase: true,
    trim: true,
  },
  maxOccupancy: {
    type: Number,
    default: 1,
    validate: value => {
      if (value <= 0) {
        throw new Error("Rooms must accomodate at least one person");
      }
    },
  },
  underConstruction: {
    type: Boolean,
    default: false
  }
});

RoomSchema.loadClass(
  class {
    static async isBooked(_id, date) {
      const query = [
        {
          $lookup: {
            from: "bookings",
            as: "bookings",
            localField: "_id",
            foreignField: "room",
          },
        },
        {
          $unwind: {
            path: "$bookings",
          },
        },
        {
          $match: {
            "bookings.startDate": { $lte: new Date(date) },
            "bookings.endDate": { $gte: new Date(date) },
          },
        },
      ];

      const results = await this.aggregate(query);

      return results.length > 0;
    }

    
  static findAvailable(filter) {
    return this.find({ underConstruction: false, ...filter });
  }
  }
);

const Room = mongoose.model("rooms", RoomSchema);

export default Room;
