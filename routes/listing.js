const express = require("express");
const router = express.Router();

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const expressError = require("../utils/expressError.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// INDEX ROUTE & CREATE ROUTE

router
  .route("/")

  // Index Route
  .get(wrapAsync(listingController.index))

  // Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW ROUTE, UPDATE ROUTE & DELETE ROUTE

router
  .route("/:id")

  // Show Route
  .get(wrapAsync(listingController.showListing))

  // Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )

  // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// EDIT ROUTE

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEdit),
);

module.exports = router;
