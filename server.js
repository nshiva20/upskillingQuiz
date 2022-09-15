//Install express server
const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');

app.use(cors({
    origin: "*"
}))
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/upskilling-quiz'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/upskilling-quiz/index.html'));
});

// app.use(express.static('./dist/'));

// app.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: 'dist/' });
// });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);