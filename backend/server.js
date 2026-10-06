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

        console.log(result);
        res.json({
            message: "Найден"
        })

    })
})

app.post('/login', (req, res) => {
    const { login, password, fullName, phone, email } = req.body
    const sql = `INSERT INTO users (login, password, fullName, phone, email) VALUES (?,?,?,?,?)`

    db.query(sql, [login, password, fullName, phone, email], (err, result) => {
        if (err) {
            console.error(err);
            return
        }

        return res.json({
            message: "Добавлена"
        })

    })
})

app.post('/loginUser', (req, res) => {
    const { login, password } = req.body
    const sql = `SELECT * FROM users WHERE login = ? AND password = ? `

    db.query(sql, [login, password], (err, result) => {
        if (err) {
            console.error(err);
            return
        }

        if (result.length === 0) {
            return res.json({
                message: "Неверный логин или пароль"
            })
        }
        return res.json({
            message: "Найден",
            id: result[0].idusers
        })

    })
})


app.post('/applications', (req, res) => {
    const { id, platform, date, payment } = req.body
    const sql = `INSERT INTO applications (idusers, platform, date, payment) VALUES (?,?,?,?)`

    db.query(sql, [id, platform, date, payment], (err, result) => {
        if (err) {
            console.error(err);
            return
        }
        return res.json({
            message: "Добавлена"
        })

    })
})

app.get('/applications', (req, res) => {
    const sql = `SELECT a.*, r.rewiest FROM applications a 
    LEFT JOIN rewiest r ON a.idapplications = r.idapplications `

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            message: "Ошибка"
            return
        }

        console.log(result);
        res.json({
            message: "Найден",
            application: result

        })

    })
})


app.put('/applications/:id', (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const sql = ` UPDATE applications SET status = ? WHERE idapplications = ?`

    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error(err);
            return
        }

        console.log(result);
        res.json({
            message: "изменен"
        })
    })

})


app.post('/rewiest', (req, res) => {
    const { idapplications, rewiest } = req.body
    const sql = `INSERT INTO rewiest (idapplications, rewiest) VALUES (?,?)`

    db.query(sql, [idapplications, rewiest], (err, result) => {
        if (err) {
            console.error(err);
            return
        }
        return res.json({
            message: "Добавлен"
        })

    })
})

app.delete('/applications/:id', (req, res) => {
    const { id } = req.params

    const sql = `DELETE FROM applications WHERE idapplications = ?`

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return
        }

        if (result.length === 0) {
            message: "такой заявки нет"
            console.log(err);
            return
        }
        return res.json({
            message: "удалена"
        })

    })

})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})