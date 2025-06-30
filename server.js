const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const issuersFile = path.join(__dirname, 'issuers.json');
app.post('/issuers', (req, res) => {
  let list = [];
  try { list = JSON.parse(fs.readFileSync(issuersFile)); } catch {}
  list.push(req.body);
  fs.writeFileSync(issuersFile, JSON.stringify(list, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));