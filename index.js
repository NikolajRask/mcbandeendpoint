const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var bander = {}
var APIKEY = "ECJneBBEnjeNCEYHbsmuEC"

app.get('/', (req, res) => res.send({message: "Kom ind og spil"}));

app.post('/bande', (req,res) => {
  if (req.body.key) {
    if (req.body.key == APIKEY) {
        if (!req.body.bande) {res.status(400).send("Bande navn mangler")}
        if (!req.body.ejer) {res.status(400).send("Bande ejer mangler")}
        if (!req.body.level) {res.status(400).send("Bande level mangler")}
        bander[req.body.bande] = {bande: req.body.bande,ejer: req.body.ejer, level: req.body.level}
        console.log('Bande created')
        res.status(201).send("Bande oprettet")
    } else {
        res.status(401).send({status: 401, message: "Authentacation failed"})
    }
  } else {
    res.status(401).send({status: 401, message: "Authentacation failed"})
}
})

app.get('/bande/:name', (req,res) => {
    if (req.body.key) {
        if (req.body.key == APIKEY) {
            const { name } = req.params
            if (bander[name]) {
                res.status(200).send(bander[name])
            } else {
                res.status(404).send({status: 404, message: "Banden eksisterer ikke"})
            }
        } else {
            res.status(401).send({status: 401, message: "Authentacation failed"})
        }
    } else {
        res.status(401).send({status: 401, message: "Authentacation failed"})
    }

})

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));

