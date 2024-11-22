const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email address is required');
  }

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Welcome to Sportshub 360',
    text: 'Thank you for subscribing to Sportshub 360! Stay tuned for the latest sports updates.',
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Email sending failed:', error);
      return res.status(500).send('Failed to send email. Please try again later.');
    }
    res.status(200).send('Email sent successfully!');
  });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'your_email@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error('Contact form submission failed:', error);
      return res.status(500).send('Failed to send the contact form. Please try again later.');
    }
    res.status(200).send('Thank you for reaching out! We’ll get back to you shortly.');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
