require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = "mongodb://127.0.0.1:27017/wanderwow";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listingsWithGeometry = [];

  for (let listing of initData.data) {
    const address = `${listing.location}, ${listing.country}`;

    const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address,
    )}&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (geoData.features && geoData.features.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: geoData.features[0].geometry.coordinates,
      };
    }

    listingsWithGeometry.push({
      ...listing,
      owner: "6a0f163d5b88220eb7123b66",
    });
  }

  await Listing.insertMany(listingsWithGeometry);

  console.log("Data initialized with geometry");
};

initDB();
