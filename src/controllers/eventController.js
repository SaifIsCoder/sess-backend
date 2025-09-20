import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { name, date, description } = req.body;
    const image = req.file?.path;

    if (!name || !date || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const event = await Event.create({ name, date, description, image });
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Events (split into past & upcoming)
export const getEvents = async (req, res) => {
  try {
    const today = new Date();

    const pastEvents = await Event.find({ date: { $lt: today } }).sort({ date: -1 });
    const upcomingEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });

    res.json({ pastEvents, upcomingEvents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get latest past event + next upcoming event
export const getLatestEvents = async (req, res) => {
  try {
    const today = new Date();

    // Find the most recent past event
    const latestPast = await Event.findOne({ date: { $lt: today } })
      .sort({ date: -1 }) // latest past (closest to today)
      .exec();

    // Find the nearest upcoming event
    const nextUpcoming = await Event.findOne({ date: { $gte: today } })
      .sort({ date: 1 }) // earliest future event
      .exec();

    res.json({
      latestPast,
      nextUpcoming,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
