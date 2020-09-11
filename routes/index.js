const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/meme', async (_, res) => {
  let url = '';
  try {
    const randomMeme = await axios('https://imgflip.com/ajax_img_flip?current_iid=100923471');
    const memePage = await axios(`https://imgflip.com${randomMeme.data}`);
    const $ = cheerio.load(memePage.data);
    const src = $('#im').attr('src');
    url = `https://${src.substring(2, src.length)}`;

    res.status(200).send(url);
  } catch (err) {
    console.log(err);
    url = 'https://sayingimages.com/wp-content/uploads/try-again-fail-meme.png';
    res.status(200).send('error');
  }

  axios.get('https://slack.com/api/chat.postMessage', {
    params: {
      token: 'xoxb-68729767794-1368981853265-10eelhZs7XzUZPVc6M2vFj3p',
      channel: 'memes',
      text: url,
    },
  }).catch(console.log);
});

router.post('/meme', async (_, res) => {
  let url = '';
  try {
    const randomMeme = await axios('https://imgflip.com/ajax_img_flip?current_iid=100923471');
    const memePage = await axios(`https://imgflip.com${randomMeme.data}`);
    const $ = cheerio.load(memePage.data);
    const src = $('#im').attr('src');
    url = `https://${src.substring(2, src.length)}`;

    res.status(200).send(url);
  } catch (err) {
    console.log(err);
    url = 'https://sayingimages.com/wp-content/uploads/try-again-fail-meme.png';
    res.status(200).send('error');
  }

  axios.get('https://slack.com/api/chat.postMessage', {
    params: {
      token: 'xoxb-68729767794-1368981853265-10eelhZs7XzUZPVc6M2vFj3p',
      channel: 'memes',
      text: url,
    },
  }).catch(console.log);
});

module.exports = router;
