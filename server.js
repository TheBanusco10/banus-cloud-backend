const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const fileRoutes = require('./src/routes/files');
const userRoutes = require('./src/routes/users');

require('./src/mongo/mongo');

console.log(path.join(__dirname, '/public'));

// Configuration
app.use(express.static('public'));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', fileRoutes);
app.use('/api', userRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})