const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const contactController = require("../controllers/contactController");

// GET /contact
router.get("/", contactController.getContact);

// POST /contact
router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("phone")
      .optional()
      .trim()
      .matches(/^[\d\s\-\+\(\)]+$/)
      .withMessage("Please enter a valid phone number"),
    body("company").optional().trim(),
    body("service").optional().trim(),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Message is required")
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters"),
  ],
  contactController.postContact,
);

module.exports = router;
