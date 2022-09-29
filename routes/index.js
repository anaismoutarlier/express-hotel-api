import { Router } from "express";
import {
  newRoom,
  getRooms,
  getRoom,
  editRoom,
  isBooked,
} from "../controllers/roomController.js";
import { catchErrors } from "../helpers/catchErrors.js";

const router = Router();

router.post("/api/rooms", catchErrors(newRoom));

router.get("/api/rooms", catchErrors(getRooms));

router.get("/api/rooms/:id", catchErrors(getRoom));

router.patch("/api/rooms/:id", catchErrors(editRoom));

router.get("/api/rooms/bookings/status/:id/:date", catchErrors(isBooked));

export default router;
