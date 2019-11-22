const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const User = require('./models/users.model');

const router = express.Router();
const PORT = 3000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const basketRouter = require('./routes/basket');
const apiRoutes = require('./routes/api');
const uploadRouter = require('./routes/upload');
const payRouter = require('./routes/pay');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, DELETE, OPTIONS, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// favicon
// app.use(favicon(path.join(__dirname, '..', 'webshop-express', 'public', 'favicon.ico')));

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/3d-printing', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(bodyParser.json()); // add body parser

app.use(router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (!req.cookies.uuid) {
    return false;
  }
  User.find({
    cookie: req.cookies.uuid,
  }, (err, user) => {
    if (user) {
      req.user = user;
      next();
    }
  });
});

app.use('/', indexRouter);
app.use('/api', apiRoutes);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/upload', uploadRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/basket', basketRouter);
app.use('/upload', uploadRouter);
app.use('/pay', payRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});

module.exports = app;
