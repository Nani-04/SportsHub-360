import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';

const About = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Open and close the modal
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setEmail('');
    setSuccessMessage('');
  };

  // Handle email submission
  const handleEmailSubmit = async () => {
  if (email) {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Done! Sports news is on the way.');
      } else {
        setSuccessMessage('Failed to send email. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSuccessMessage('An error occurred. Please try again.');
    }
  } else {
    setSuccessMessage('Please enter a valid email address.');
  }
};


  return (
    <Container style={{ padding: '40px 20px', maxWidth: '1200px' }}>
      {/* Hero Section */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: '20px', color: '#1976d2' }}>
          Welcome to Sportshub 360
        </Typography>
        <Typography variant="h6" style={{ color: '#555', lineHeight: 1.6 }}>
          Your ultimate destination for real-time sports updates, live scores, and in-depth analytics across cricket,
          football, and more. Immerse yourself in the world of sports like never before.
        </Typography>
      </section>

      {/* Key Features Section */}
      <section style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#1976d2' }}>
          Why Choose Sportshub 360?
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: 'Real-Time Updates',
              description: 'Stay ahead of the game with instant live scores, match commentary, and breaking sports news.',
              image: 'https://via.placeholder.com/300x200?text=Real-Time+Updates',
            },
            {
              title: 'Personalized Experience',
              description: 'Follow your favorite teams and players with tailored notifications and content.',
              image: 'https://via.placeholder.com/300x200?text=Personalized+Experience',
            },
            {
              title: 'Analytics & Insights',
              description: 'Dive deep into match statistics, player performance, and post-game analyses.',
              image: 'https://via.placeholder.com/300x200?text=Analytics+and+Insights',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia component="img" height="200" image={feature.image} alt={feature.title} />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Our Team Section */}
      <section style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', color: '#1976d2' }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              name: 'Naveen Kumar',
              role: 'Founder & CEO',
              description: 'Visionary leader with a passion for innovation and sports technology.',
              image: 'https://via.placeholder.com/150x150?text=Naveen+Kumar',
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card style={{ textAlign: 'center', padding: '20px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={member.image}
                  alt={member.name}
                  style={{ borderRadius: '50%', width: '150px', margin: '0 auto' }}
                />
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2">{member.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* Call to Action Section */}
      <section style={{ textAlign: 'center' }}>
        <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Join the Sportshub 360 Community Today!
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '20px', color: '#555' }}>
          Subscribe to get the latest updates, match insights, and personalized sports experiences delivered to you.
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={handleOpenModal}>
          Subscribe Now
        </Button>
      </section>

      {/* Subscription Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" style={{ marginBottom: '20px' }}>
            Subscribe to our Newsletter
          </Typography>
          <TextField
            fullWidth
            label="Enter your email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Button variant="contained" color="primary" onClick={handleEmailSubmit} fullWidth>
            Submit
          </Button>
          {successMessage && (
            <Typography variant="body2" style={{ marginTop: '20px', color: '#1976d2' }}>
              {successMessage}
            </Typography>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default About;
