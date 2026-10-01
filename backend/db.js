import mysql from 'mysql2'
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'demoVita'
})

db.connect((err)=>{
    if(err){
        console.error(err);
        return
    }

    console.log('Подключена');
})

export default db 


