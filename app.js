var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { authAdmin } = require("./middlewares/authAdmin");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout')
const loginRouter = require('./routes/login');
const carritoRouter = require('./routes/carrito');
const productoRouter = require('./routes/producto');  
const buyRouter = require('./routes/buy');


//ADMIN
const adminCategoriasRouter = require('./routes/admin/categorias');
const adminProductosRouter = require('./routes/admin/productos');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: null },
    resave: true,
    saveUninitialized: false,
  })
);



app.use('/', indexRouter);
app.use('/logout',logoutRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/carrito',carritoRouter);
app.use('/producto',productoRouter);
app.use('/buy',buyRouter);

//ADMIN
app.use('/admin/categorias',authAdmin, adminCategoriasRouter);
app.use('/admin/productos',authAdmin, adminProductosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
