import express  from "express";
import API from "./API.js";
import Carrito from "./carrito.js";
const app = express()
const productos = express.Router()
const carrito = express.Router()
const admin = true
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', productos, )
app.use('/api/carrito', carrito)
productos.use((req, res, next)=>{
    if(admin){
        next()
    }else return {error: -1, descripcion: `ruta ${req.url} metodo ${req.method} no autorizada`}
})
const apiClass = new API()
const carritoClass = new Carrito()
productos.get('/',(req, res)=>{
    res.send(apiClass.getAll())
})
productos.get('/:id',(req, res)=>{
    res.send(apiClass.getById(req.params.id))
})
productos.post('/',(req, res)=>{
    res.send(apiClass.add(req.body))
})
productos.put('/:id',(req, res)=>{
    res.send(apiClass.update(req.params.id, req.body))
})
productos.delete('/:id',(req, res)=>{
    res.send(apiClass.delete(parseInt(req.params.id)))
})
carrito.post('/', (req, res)=>{
    res.send(carritoClass.createCart())
})
carrito.delete('/:id', (req, res)=>{
    res.send(carritoClass.deleteCart(req.params.id))
})
carrito.get('/:id/productos', (req, res)=>{
    res.send(carritoClass.getProducts(req.params.id))
})
carrito.post('/:id/productos', (req, res)=>{
    res.send(carritoClass.addProducts(req.params.id, req.body))
})
carrito.delete('/:id/productos/:id_prod', (req, res)=>{
    res.send(carritoClass.deleteProducts(req.params.id, req.params.id_prod))
})
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{console.log(`listening on port: ${PORT}`)})
server.on('error', error => console.log(`Error en el servidor ${error}`))