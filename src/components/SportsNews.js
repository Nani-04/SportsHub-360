import React, { useEffect, useState } from 'react';
import { fetchSportsNews } from '../utils/fetchNews';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import gsap from 'gsap';

const SportsNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const data = await fetchSportsNews();
      setNews(data);
    };

    fetchNewsData();

    // GSAP animation for grid items
    gsap.from('.news-card', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
        Latest Sports News
      </Typography>
      <Grid container spacing={3}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="news-card" style={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="150"
                image={article.urlToImage || 'https://via.placeholder.com/300'}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ margin: '10px 0' }}>
                  {article.description || 'No description available.'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SportsNews;
