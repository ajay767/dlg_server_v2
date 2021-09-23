const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const mongoSanitize = require('express-mongo-sanitize');
const globarErrorHandler = require('./controllers/globalErrorHandler');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const askQueryRouter = require('./routes/askQueryRoute');
const eventBookingRoute = require('./routes/eventBookingRoute');
const eventRouter = require('./routes/eventRoute');
const authRouter = require('./routes/authRoute');
const recruitmentRoute = require('./routes/recruitmentRoute');
const sendEmailNoticeRoute = require('./routes/sendEmailNoticeRoute');
const academicsRoute = require('./routes/academicsRoute');
const testRoute = require('./routes/testRoute');
const fileUploadRoute = require('./routes/fileUploadRoute');
const blogRouter = require('./routes/blogRoutes');
const quizRoute = require('./routes/quizRoutes');

const app = express();

app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

//implement cors
app.use(cors());

//implementing cors for all routes
app.options('*', cors());

// Development logging
app.use(morgan('dev'));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//routes
app.use('/api/v1/user', authRouter);
app.use('/api/v1/recruitment', recruitmentRoute);
app.use('/api/v1/query', askQueryRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/academics', academicsRoute);
app.use('/api/v1/send-notice', sendEmailNoticeRoute);
app.use('/api/v1/event-booking', eventBookingRoute);
app.use('/api/v2/upload', fileUploadRoute);
app.use('/api/v2/blog', blogRouter);
app.use('/api/v1/test', testRoute);
app.use('/api/v2/quiz', quizRoute);

app.all('*', (req, res, next) => {
  next(new AppError('this route is not yet defined', 500));
});

app.use(globarErrorHandler);
module.exports = app;
