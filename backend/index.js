const express = require('express')
const app = express()
const port = 5050
const connection = require("./config/db")
const cors = require('cors');

const NumRoute = require('./routes/num.routes')

app.use(cors())
app.use(express.json());
app.use(cors());

app.use('/api/num',NumRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))