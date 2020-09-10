const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/meme', async (_, res) => {
  try {
    const randomMeme = await axios('https://imgflip.com/ajax_img_flip?current_iid=100923471');
    const memePage = await axios(`https://imgflip.com${randomMeme.data}`);
    const $ = cheerio.load(memePage.data);
    const src = $('#im').attr('src');
    const url = `https://${src.substring(2, src.length)}`;
    res.status(200).send(url);
  } catch (err) {
    console.log(err);
    res.status(200).send('https://sayingimages.com/wp-content/uploads/try-again-fail-meme.png');
  }
});

module.exports = router;
