'use strict';

// const { response } = require('express'); 
const express = require('express'); //This line of code is how we import express into the server.
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
    response.send('You are doing it Qadree!');
});
app.listen(PORT, () => console.log(`seerver is listening on port ${PORT}`));
// const cors = require('cors';

// const superagent = require('superagent');

// const app = express();

// const corsOptions = {
//     origin: function (origin, callback) {
//         callback(null, true);
//     }
// };