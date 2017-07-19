const SwaggerExpress = require('swagger-express-mw');
const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

const config = {
  appRoot: __dirname // required config
};

app.use(bodyParser.json())

app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

// app.listen(7555, () => {
//   console.log('Server running on http://localhost:7555')
// })

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
  })

});