const express = require('express');
const { readMailData, generateMailtoLink } = require('./utils');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/generate', async (req, res) => {
  const directory = req.query.directory;
  if (!directory) {
    return res.status(400).send('No directory specified');
  }

  try {
    const mailData = await readMailData(directory);
    const mailtoLink = generateMailtoLink(mailData);
    console.log(mailtoLink);

    res.send(`<a href="${mailtoLink}">mailto</a>`);
  } catch (error) {
    res.status(500).send(`error.message: ${error.message}, directory: ${directory}`);
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/generate?directory=2025/0630`);
});
