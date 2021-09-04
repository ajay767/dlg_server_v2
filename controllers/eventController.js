const Event = require('./../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      name: req.body.name,
      poster: req.body.poster,
      date: req.body.date,
      mainGuest: req.body.mainGuest,
      overview: req.body.overview,
      organizer: req.body.organizer,
      description: req.body.description,
    });

    res.status(200).json({
      status: 'Success',
      event: event,
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({
      status: 'Success',
      total: events.length,
      events: events,
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getEventByID = async (req, res) => {
  try {
    const event = await Event.find({ _id: req.params.id });

    res.status(200).json({
      status: 'Success',
      events: event,
    });
  } catch (error) {
    res.status(200).json({
      status: 'error',
      message: error.message,
    });
  }
};
