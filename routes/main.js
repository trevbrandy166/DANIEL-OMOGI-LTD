const express = require("express");
const router = express.Router();

// GET /
router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Daniel Omogi & Associates LTD | Professional Audit & Assurance",
    activePage: "home",
  });
});

// GET /about
router.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About Us | Daniel Omogi & Associates LTD",
    activePage: "about",
  });
});

// GET /services/audit-assurance
router.get("/services/audit-assurance", (req, res) => {
  res.render("pages/audit-assurance", {
    title: "Audit & Assurance Services | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/tax-advisory
router.get("/services/tax-advisory", (req, res) => {
  res.render("pages/tax-advisory", {
    title: "Tax Advisory Services | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/hr-outsourcing
router.get("/services/hr-outsourcing", (req, res) => {
  res.render("pages/hr-outsourcing", {
    title: "HR Outsourcing Solutions | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/risk-advisory
router.get("/services/risk-advisory", (req, res) => {
  res.render("pages/risk-advisory", {
    title: "Risk Advisory & Management | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/iso-consultancy
router.get("/services/iso-consultancy", (req, res) => {
  res.render("pages/iso-consultancy", {
    title: "ISO Consultancy & Certification | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/financial-planning
router.get("/services/financial-planning", (req, res) => {
  res.render("pages/financial-planning", {
    title: "Financial Planning | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/investment-advisory
router.get("/services/investment-advisory", (req, res) => {
  res.render("pages/investment-advisory", {
    title: "Investment Advisory | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /services/retirement-planning
router.get("/services/retirement-planning", (req, res) => {
  res.render("pages/retirement-planning", {
    title: "Retirement Planning | Daniel Omogi & Associates LTD",
    activePage: "services",
  });
});

// GET /team
router.get("/team", (req, res) => {
  res.render("pages/team", {
    title: "Our Team | Daniel Omogi & Associates LTD",
    activePage: "team",
  });
});

// GET /clients
router.get("/clients", (req, res) => {
  res.render("pages/clients", {
    title: "Our Clients | Daniel Omogi & Associates LTD",
    activePage: "clients",
  });
});

module.exports = router;
