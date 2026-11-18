const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Product not Found" });
  }
  next();
};

module.exports = validateObjectId;
