const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log requests
app.use(morgan('dev'));

// Custom middleware to check if it's working hours (Monday to Friday, 9am to 5pm)
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = date.getHours();

    // Log the request method and URL to use the req object
    console.log(`Request method: ${req.method}, Request URL: ${req.url}`);

    // Check if the current time is outside working hours
    if (dayOfWeek === 0 || dayOfWeek === 6 || hour < 9 || hour >= 17) {
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9am to 5pm).');
    } else {
        next();
    }
};

// Middleware to apply checkWorkingHours to all routes
app.use(checkWorkingHours);

// Static files middleware for CSS
app.use(express.static('src/public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
