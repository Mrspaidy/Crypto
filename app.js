const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const flags = JSON.parse(fs.readFileSync('./flags.json'));

app.post('/check', (req, res) => {
  const { flag, level } = req.body;
  const correct = flags[level]?.flag.toLowerCase();

  if (flag.trim().toLowerCase() === correct) {
    const nextLevel = parseInt(level) + 1;
    if (flags[nextLevel]) {
      return res.redirect(`/level${nextLevel}.html`);
    } else {
      return res.send("<h1>🎉 You completed all 10 levels!</h1>");
    }
  } else {
    return res.redirect(`/level${level}.html?error=true`);
  }
});

app.listen(PORT, () => {
  console.log(`CTF server running: http://localhost:${PORT}`);
});
