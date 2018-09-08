const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

// this servers all assest from public directory
app.use(express.static(publicPath));

// to make sure that for example /create works I need server index.html for every route
// it is basically like when we set up historyfallback: true in webpack but we need to do this also with server
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
