import axios from 'axios';


const NEWS_API_KEY = '1c494ced28ed4500882c4ea3dd196fad';
const CRICKET_API_KEY = '65a384b9-2206-422f-afc5-c22f8f25f00f';


const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const CRICKET_API_URL = 'https://api.cricapi.com/v1/currentMatches';


export const fetchSportsNews = async () => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        category: 'sports',
        country: 'us',
        apiKey: NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching sports news:', error);
    return [];
  }
};


export const fetchCricketScores = async () => {
  try {
    const response = await axios.get(CRICKET_API_URL, {
      params: {
        apikey: CRICKET_API_KEY,
      },
    });
    return response.data.data; // Adjust based on API response structure
  } catch (error) {
    console.error('Error fetching cricket scores:', error);
    return [];
  }
};
