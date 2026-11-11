const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const slots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5'];
let bookings = [], id = 1;

app.get('/', (req, res) => {
    res.render('index', { slots, bookings, message: '' });
});

app.post('/book', (req, res) => {
    const { name, vehicle, slot, date } = req.body;

    if (bookings.some(b => b.slot === slot))
        return res.render('index', { slots, bookings, message: 'Slot Already Booked!' });

    bookings.push({ id: id++, name, vehicle, slot, date });
    res.redirect('/');
});

app.post('/cancel/:id', (req, res) => {
    bookings = bookings.filter(b => b.id !== Number(req.params.id));
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

// const express = require('express');

// const app = express();
// const PORT = 3000;

// // Set EJS as template engine
// app.set('view engine', 'ejs');

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// // Parking slots
// const slots = [
//     'Slot 1',
//     'Slot 2',
//     'Slot 3',
//     'Slot 4',
//     'Slot 5'
// ];

// // Store bookings
// let bookings = [];
// let bookingId = 1;

// // Display parking page
// app.get('/', (req, res) => {

//     res.render('index', {
//         slots: slots,
//         bookings: bookings,
//         message: ''
//     });

// });

// // Book parking slot
// app.post('/book', (req, res) => {

//     const { name, vehicle, slot, date } = req.body;

//     // Check slot availability
//     const alreadyBooked = bookings.some(
//         booking => booking.slot === slot
//     );

//     if (alreadyBooked) {

//         return res.render('index', {
//             slots: slots,
//             bookings: bookings,
//             message: 'Slot Already Booked!'
//         });

//     }

//     // Create booking
//     const newBooking = {
//         id: bookingId++,
//         name: name,
//         vehicle: vehicle,
//         slot: slot,
//         date: date
//     };

//     bookings.push(newBooking);

//     res.redirect('/');

// });

// // Cancel booking
// app.post('/cancel/:id', (req, res) => {

//     const id = Number(req.params.id);

//     bookings = bookings.filter(
//         booking => booking.id !== id
//     );

//     res.redirect('/');

// });

// // Start server
// app.listen(PORT, () => {

//     console.log(
//         `Server running at http://localhost:${PORT}`
//     );

// });
