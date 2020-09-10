const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).send({ response: 'I am alive' });
});

router.get('/meme', async (_, res) => {
  const randomMeme = await axios('https://imgflip.com/ajax_img_flip?current_iid=100923471');
  const memePage = await axios(`https://imgflip.com${randomMeme.data}`);
  const $ = cheerio.load(memePage.data);
  const src = $('#im').attr('src');
  res.status(200).send(src.substring(2, src.length));
});

module.exports = router;
