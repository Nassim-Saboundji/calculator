const express = require('express')
const session = require('express-session')
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session
    ({ 
        secret: 'KmVL8$32JKLA@vi-sKmHn', // in prod use an env variable
        cookie: { maxAge: 900000 }, // cookie should expire after 15 min
        resave: false,
        saveUninitialized: false
    })
)
app.use(express.static('public'))

app.post('/signup', (req, res) => {
       
    const db = new sqlite3.Database('data.db')
    
    let passwordHash = bcrypt.hashSync(req.body.password, 10)

    db.serialize(async () => {
        try {
            const statement = db.prepare(`
            INSERT INTO users (username, password_hash) VALUES (?, ?);
            `)

            await new Promise((resolve, reject) => {
                statement.run(req.body.username, passwordHash, 
                (error) => {
                    if (error) {
                        reject('Username already in use.')
                    }
                    resolve()
                })
                statement.finalize()
            })
            res.send({status: 'success'})
        } catch (error) {
            res.send({status: 'failed', error})
        }   
    })

    db.close()
})

app.post('/login', (req, res) => {

    const db = new sqlite3.Database('data.db')

    db.serialize(async () => {
        try {
            await new Promise((resolve, reject) => {
                db.all(
                    'SELECT password_hash FROM users WHERE username = ? LIMIT 1', 
                    [req.body.username], 
                    (error, rows) => {
                        if (error) {
                            reject('An error occured.')
                            return
                        }
                        
                        if (rows.length === 0) {
                            reject('Account does not exist.')
                            return
                        }
                        
                        const isUser = bcrypt.compareSync(req.body.password, rows[0].password_hash)
                        if (!isUser) {
                            reject('Wrong password.')
                            return
                        }
                       
                        if (!req.session.username) {
                            req.session.username = req.body.username
                        }
                        
                        resolve()
                    }
                )
            })
            res.send({status: 'success'})
        } catch (error) {
            res.send({status: 'failed', error})
        }
    })

    db.close()
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send({status: 'success'})
})

app.get('/currentUser', (req, res) => {
    res.send({username: req.session.username})
})

app.listen(port, () => {
    console.log(`App available at  http://localhost:${port}`)
})