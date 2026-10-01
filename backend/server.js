import express from 'express'
import cors from "cors"
import db from "./db.js"


const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return
        }
        res.json({
            message: "Найден"
        })

    })
})

app.post('/login', (req, res) => {
    const {login, password, fullName, phone, email}= req.body
    const sql = `INSERT INTO users (login, password, fullName, phone, email) VALUES (?,?,?,?,?)`

    db.query(sql, [login, password, fullName, phone, email], (err, result)=>{
        if (err) {
            console.error(err);
            return
        }
        res.json({
            message: "Добавлена"
        })

    })
})

app.post('/loginUser', (req, res) => {
    const {login, password}= req.body
    const sql = `SELECT * FROM users WHERE login = ? AND password = ? `

    db.query(sql, [login, password], (err, result)=>{
        if (err) {
            console.error(err);
            return
        }

        if(result.length === 0){
            res.json({
                message: "Неверный логин или пароль"
            })
            return
        }
        res.json({
            message: "Найден"
        })

    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})