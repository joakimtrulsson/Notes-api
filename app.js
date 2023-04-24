const express = require('express');
const morgan = require('morgan');

// const { AppError } = require('./utils');
// const globalErrorHandler = require('./controllers/errorController');
// const productRouter = require('./routes/productRoutes');
// const userRouter = require('./routes/userRoutes');
// const orderRouter = require('./routes/orderRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const orderController = require('./controllers/orderController');

const app = express();

// Globala Middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
// app.use('/api/product', productRouter);
// app.use('/api/user', userRouter);
// app.use('/api/reviews', reviewRouter);
// app.use('/api/orders', orderRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
