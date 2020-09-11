const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();


const token = process.env.TOKEN || '';
const channel = process.env.CHANNEL || 'memes';

const getRandomMemeUrl = async () => {
  try {
    const randomMeme = await axios('https://imgflip.com/ajax_img_flip?current_iid=100923471');
    const memePage = await axios(`https://imgflip.com${randomMeme.data}`);
    const $ = cheerio.load(memePage.data);
    const src = $('#im').attr('src');
    return `https://${src.substring(2, src.length)}`;
  } catch (err) {
    console.log(err);
    return 'https://sayingimages.com/wp-content/uploads/try-again-fail-meme.png';
  }
};

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/meme', async (_, res) => {
  const url = await getRandomMemeUrl();

  axios.get('https://slack.com/api/chat.postMessage', {
    params: {
      token,
      channel,
      text: url,
    },
  })
    .then(() => console.log('meme posted in channel'))
    .catch(console.log);

  res.status(200).send(url);
});

router.post('/meme', async (_, res) => {
  const url = await getRandomMemeUrl();

  axios.get('https://slack.com/api/chat.postMessage', {
    params: {
      token,
      channel,
      text: url,
    },

  })
    .then(() => console.log('meme posted in channel'))
    .catch(console.log);

  res.status(200).send(url);
});

module.exports = router;
