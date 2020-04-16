const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const UserModul = require('./moduls/user.modul');
const BasketModul = require('./moduls/basket.modul');
const NotificationModul = require('./moduls/notification.modul');
const Notification = require('./models/notification.model');

const userModul = new UserModul();
const basketModul = new BasketModul();
const notificationModul = new NotificationModul();

const router = express.Router();
const PORT = 3000;
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const productsRouter = require('./routes/products');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const basketRouter = require('./routes/basket');
const ordersRouter = require('./routes/orders');
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
// app.use(express.static('D:/Projects/3Dprinting/express-print3D/public/img/users'));

app.use(async (req, res, next) => {
  const user = await userModul.checkLogin(req);
  if (user) {
    let notifications = await notificationModul.checkNotifications(user) || [];
    if (notifications[0]) {
      notifications[0].reverse();
    }
    req.user = user;
    req.basket = await basketModul.checkBasket(req.user._id) || 0;
    req.notifications = notifications[0] || [];
    req.notificationNum = notifications[1] || 0;
  }
  next();
});


app.use('/notifications/update/:user', (req, res, next) => {
  console.log('put');
  Notification.updateMany({
    to: req.params.user
  }, {
    new: false
  }, (err, notifications) => {
    if (err) next(err);
    res.send(notifications)
  })
})

app.use('/logout', (req, res, next) => {
  res.clearCookie('uuid');
  res.redirect('/products');
});

app.use('/', indexRouter);
app.use('/api', apiRoutes);
app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/upload', uploadRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/basket', basketRouter);
app.use('/orders', ordersRouter);
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
  console.error(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});

module.exports = app;