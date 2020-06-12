const Event = require("../models/event");

const updatePdf = async (req, res, next) => {
  const eventId = req.params.eventId;
  const pdf = req.file;
  console.log("PDF:", pdf);
  const eventData = {
    pdf: `/pdfs/${pdf.filename}`,
  };
  const result = await Event.findOneAndUpdate({ _id: eventId }, eventData, {
    new: true,
  }).catch(next);

  res.json(result);
};

module.exports = {
  updatePdf,
};
