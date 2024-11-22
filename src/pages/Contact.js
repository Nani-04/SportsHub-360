import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { Twitter, Facebook, Instagram } from '@mui/icons-material';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name && form.email && form.message) {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      try {
        const response = await fetch('http://localhost:5000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const message = await response.text();
          setSuccessMessage(message);
          setForm({ name: '', email: '', message: '' });
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
        setErrorMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Please fill out all fields.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', padding: '20px' }}>
      {/* Hero Section */}
      <Box
        style={{
          backgroundImage: 'url(https://via.placeholder.com/1200x300?text=Contact+Sportshub+360)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h3" style={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Contact Sportshub 360
        </Typography>
      </Box>

      {/* Contact Form Section */}
      <Card style={{ marginTop: '30px', padding: '20px', borderRadius: '10px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)' }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: '20px', color: '#1976d2', textAlign: 'center' }}>
            Reach Out to Us
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={form.name}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={form.email}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  name="message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  value={form.message}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ style: { fontSize: '1.1rem' } }}
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" size="large" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                </Button>
              </Grid>
            </Grid>
          </form>
          {successMessage && (
            <Typography variant="body1" style={{ marginTop: '20px', color: 'green', textAlign: 'center' }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="body1" style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
              {errorMessage}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Social Media and Support Section */}
      <Box style={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h6" style={{ marginBottom: '15px', fontWeight: 'bold' }}>
          Follow Us on Social Media
        </Typography>
        <IconButton href="https://twitter.com" target="_blank" style={{ color: '#1DA1F2' }}>
          <Twitter fontSize="large" />
        </IconButton>
        <IconButton href="https://facebook.com" target="_blank" style={{ color: '#4267B2' }}>
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" style={{ color: '#C13584' }}>
          <Instagram fontSize="large" />
        </IconButton>
        <Typography variant="body1" style={{ marginTop: '20px', color: '#555' }}>
          Need assistance? Contact us at support@sportshub360.com or call us at +1 (555) 123-4567.
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
