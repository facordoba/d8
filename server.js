import express  from "express";
import API from "./API.js";
const app = express()
const api = express.Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/api/productos', api)
const apiClass = new API()
api.get('/',(req, res)=>{
    res.send(apiClass.getAll())
})
api.get('/:id',(req, res)=>{
    res.send(apiClass.getById(req.params.id))
})
api.post('/',(req, res)=>{
    apiClass.add(req.body)
    res.redirect('../../index.html')
})
api.put('/:id',(req, res)=>{
    res.send(apiClass.update(req.params.id, req.body))
})
api.delete('/:id',(req, res)=>{
    res.send(apiClass.delete(parseInt(req.params.id)))
})
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{console.log(`listening on port: ${PORT}`)})
server.on('error', error => console.log(`Error en el servidor ${error}`))