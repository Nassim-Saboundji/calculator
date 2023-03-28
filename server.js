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
        secret: 'keyboard cat',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    })
)
app.use(express.static('public'))

app.post('/signup', (req, res) => {
       
    const db = new sqlite3.Database('data.db')
    
    let passwordHash
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        passwordHash = hash
    })

    try {
        db.serialize(() => {
            const statement = db.prepare(`
            INSERT INTO users (username, password_hash) VALUES (?, ?);
            `, [req.body.username, passwordHash])

            statement.run()
            statement.finalize()
        })

        db.close()
    } catch (error) {
        console.log(error)
        res.send(`<h1>An error occured. Please try again.</h1>`)
    }

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
                
                let isUser
                bcrypt.compare(
                    req.body.password,
                    rows[0],
                    (_, result) => {
                        isUser = result
                    }
                )

                if (isUser && !req.session.username) {
                    req.session.username = req.body.username
                }
            }
        )
    })

    db.close();
})

app.get('/logout', (req, res) => {
    req.session.destroy()
})

app.get('/currentUser', (req, res) => {
    res.send({username: req.session.username})
})

app.listen(port, () => {
    console.log(`App available at  http://localhost:${port}`)
})