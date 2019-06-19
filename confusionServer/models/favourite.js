const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const favouriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    dishes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dishes"
      }
    ]
  },
  {
    timestamps: true
  }
);

var Favourites = mongoose.model("Favourite", favouriteSchema);
module.exports = Favourites;
