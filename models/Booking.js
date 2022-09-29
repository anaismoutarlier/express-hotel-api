import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  startDate: Date,
  endDate: Date,
  room: { type: mongoose.Schema.Types.ObjectId, ref: "rooms" },
  nbPersons: Number
});

const Booking = mongoose.model("bookings", BookingSchema);

export default Booking;