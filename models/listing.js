const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  image: {
    url: String,
    filename: String,
  },
  country: String,
  price: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  category: {
    type: String,
    enum: [
      "Rooms",
      "Trending",
      "Mountain",
      "Lakefront",
      "Beach",
      "Arctic",
      "Forest",
      "Camping",
      "Pools",
      "City View",
      "Luxury",
      "Pets",
      "Boats",
    ],
    default: "Rooms",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
