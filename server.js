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
        secret: 'KmVL8$32JKLA@vi-sKmHn', // in prod use env variable
        cookie: { maxAge: 900000 }, // cookie should expire after 15 min
        resave: false,
        saveUninitialized: false
    })
)
app.use(express.static('public'))

app.post('/signup', (req, res) => {
       
    const db = new sqlite3.Database('data.db')
    
    let passwordHash = bcrypt.hashSync(req.body.password, 10)

    db.serialize(() => {
        try {
            const statement = db.prepare(`
            INSERT INTO users (username, password_hash) VALUES (?, ?);
            `, [req.body.username, passwordHash])
            statement.run()
            statement.finalize()
        } catch (error) {
            res.send({error: 'Account already exists. Select a different name'})
        }
    })

    db.close()
    

    res.redirect('/login.html')
})

app.post('/login', (req, res) => {

    const db = new sqlite3.Database('data.db')

    db.serialize(() => {
        db.all(
            'SELECT password_hash FROM users WHERE username = ? LIMIT 1', 
            [req.body.username], 
            (error, rows) => {
                if (error) {
                    res.send({error: 'failed to login'})
                }
                
                const isUser = bcrypt.hashSync(req.body.password, rows[0].password_hash)

                if (isUser) {
                    if (!req.session.username) {
                        req.session.username = req.body.username
                    }
                    res.redirect('/')
                } else {
                    res.send({error: 'Login failed. Please try again.'})
                }
            }
        )
    })

    db.close();
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.get('/currentUser', (req, res) => {
    res.send({username: req.session.username})
})

app.listen(port, () => {
    console.log(`App available at  http://localhost:${port}`)
})