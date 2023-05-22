const express  = require('express')
const cors = require('cors')
const app = express()

const despesasRoutes = require('./routes/despesasRoutes')
// const ganhosRoutes = require('./routes/ganhosRoutes')
// const relatoriosRoutes = require('./routes/relatoriosRoutes')

const host = '127.0.0.1'
const port = 3333

app.use(cors("http://localhost:3333/listar"))
app.use(express.json())
app.use('/despesas', despesasRoutes)

app.listen(port, host,()=>{
    console.log(`Server running at http://${host}:${port}`)
})