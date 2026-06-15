const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  isLoggedIn,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");

const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

const expressError = require("../utils/expressError.js");

const reviewsController = require("../controllers/review.js");

// CREATE REVIEW ROUTE

router
  .route("/")

  // Reviews Post Route
  .post(
    isLoggedIn,
    validateReview,
    wrapAsync(reviewsController.createReview)
  );

// DELETE REVIEW ROUTE

router
  .route("/:reviewId")

  // Reviews Delete Route
  .delete(
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewsController.destroyReview)
  );


module.exports = router;