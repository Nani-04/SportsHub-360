import React, { useEffect, useState } from 'react';
import { fetchCricketScores } from '../utils/fetchNews';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CricketScores = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cricketData = await fetchCricketScores();
        console.log('Cricket Data:', cricketData);
        setMatches(cricketData || []);
      } catch (err) {
        console.error('Error fetching cricket data:', err);
        setError('Failed to load cricket scores.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6">Loading live cricket scores...</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>
        Live Cricket Scores
      </Typography>
      <Grid container spacing={3}>
        {matches.map((match, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ padding: '10px' }}>
              <CardContent>
                <Typography variant="h6">{match.name || 'Match Name'}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {match.status || 'Status unavailable'}
                </Typography>
                <Typography variant="body2">
                  <strong>{match.teamInfo?.[0]?.name || 'Team 1'}</strong> vs{' '}
                  <strong>{match.teamInfo?.[1]?.name || 'Team 2'}</strong>
                </Typography>
                {match.score && Array.isArray(match.score) ? (
                  match.score.map((score, i) => (
                    <Typography key={i} variant="body2" color="primary">
                      {`Inning ${i + 1}: ${score.r || 0}/${score.w || 0} in ${score.o || 0} overs`}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" color="primary">
                    No live score available
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CricketScores;
