const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

// Render contact page
exports.getContact = (req, res) => {
  res.render("pages/contact", {
    title: "Contact Us | Daniel Omogi & Associates LTD",
    activePage: "contact",
    errors: [],
    formData: {},
    success: false,
  });
};

// Handle form submission
exports.postContact = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("pages/contact", {
      title: "Contact Us | Daniel Omogi & Associates LTD",
      activePage: "contact",
      errors: errors.array(),
      formData: req.body,
      success: false,
    });
  }

  const { name, email, phone, company, service, message } = req.body;

  // Create transporter (using Gmail as example — you can change this)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to company
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.COMPANY_EMAIL || "info@danielomogi-associates.co.ke",
    subject: `New Contact Form Submission from ${name}`,
    html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Service Interested:</strong> ${service || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
  };

  // Confirmation email to sender
  const confirmOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting Daniel Omogi & Associates LTD",
    html: `
            <h2>Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Daniel Omogi & Associates LTD</strong></p>
            <p>📞 +254 715 475 134 | +254 705 916 757</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmOptions);

    res.render("pages/contact", {
      title: "Contact Us | Daniel Omogi & Associates LTD",
      activePage: "contact",
      errors: [],
      formData: {},
      success: true,
    });
  } catch (error) {
    console.error("Email error:", error);
    res.render("pages/contact", {
      title: "Contact Us | Daniel Omogi & Associates LTD",
      activePage: "contact",
      errors: [
        {
          msg: "Failed to send message. Please try again or call us directly.",
        },
      ],
      formData: req.body,
      success: false,
    });
  }
};
