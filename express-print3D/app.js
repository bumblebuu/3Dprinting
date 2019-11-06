const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const instantMongoCrud = require('express-mongo-crud');
const bodyParser = require('body-parser');

const router = express.Router();
const PORT = 3000;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/3d-printing', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const options = {
  host: `localhost:${PORT}`,
};
app.use(instantMongoCrud(options));

app.use(bodyParser.json()); // add body parser

router.get('/myapi', (req, res) => {
  res.send('works well');
});

app.use(router);

app.listen(PORT, () => {
  console.log(`started at ${PORT}`);
});
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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
