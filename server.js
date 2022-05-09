const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const fileRoutes = require('./src/routes/files');

console.log(path.join(__dirname, '/public'));

app.use(express.static('public'));

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', fileRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})