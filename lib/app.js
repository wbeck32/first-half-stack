const parseUrl = require('./utils/parse-url');
const bodyParser = require('./utils/body-parser');
const people = require('./routes/people');

const routes = {
  people
};

function app(req, res) {
  res.setHeader('Content-Type', 'application/json');
  req.url = parseUrl(req.url);

  bodyParser(req)
    .then(body => req.body = body)
    .then(() => {
      const route = routes[req.url.route] || '';
      route(req, res);
    })
    .catch(console.log);
}

module.exports = app;
