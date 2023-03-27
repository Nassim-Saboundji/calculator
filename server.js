const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.post('/signup', (req, res) => {
    res.send({
        username: req.body.username,
        password: req.body.password
    })
})

app.post('/login', (req, res) => {

})

app.post('/currentUser', (req, res) => {

})

app.listen(port, () => {
    console.log(`App available at  http://localhost:${port}`)
})