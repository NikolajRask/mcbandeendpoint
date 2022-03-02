const express = require('express')

const app = express()

const port = 3000

app.get('/bande', (req, res) => {
    res.send({message: "Hello World"})
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))