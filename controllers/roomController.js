import Room from "../models/Room.js";

export const newRoom = async (req, res) => {
  const newRoom = new Room(req.body);
  const room = await newRoom.save();

  res.json({ room })
}

export const getRooms = async (req, res) => {
  const rooms = await Room.find();

  res.json({ rooms })
}

export const getRoom = async (req, res) => {
  const { id } = req.params;
  const room = await Room.findOne({ _id: id })

  res.json({ room })
}

export const editRoom = async (req, res) => {
  const { id } = req.params;

  await Room.updateOne({ _id: id }, req.body);

  res.json({ result: true })
}

export const isBooked = async (req, res) => {
  const { id, date } = req.params;

  const result = await Room.isBooked(id, date);

  res.json({ result: true, booked: result })
}