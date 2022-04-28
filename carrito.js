import fs from "fs"

class Carrito{
    static id = 0
    static carritos = [] 
    createCart(){
        Carrito.id++
        Carrito.carritos.push({
            id:Carrito.id,
            timestamp: Date.now(),
            productos: []
        })
        try {
            fs.writeFileSync(`./persistencia.txt`, JSON.stringify([]))
        } catch (error) {
            throw error
        }
        return Carrito.id.toString()
    }
    deleteCart(id){
        if(Carrito.id >= id){
            const nuevosCarritos = Carrito.carritos.filter(e=>e.id != id)
            if(nuevosCarritos.length < Carrito.carritos.length){
                Carrito.carritos = nuevosCarritos
                return 'Se a borrado el carrito correctamente'
            }else 'ha ocurrido un error al borrar el carrito'
        }else{
            return 'no existe carrito con el id buscado'
        }
        
    }
    getProducts(id){
        if(Carrito.id >= id){
            return Carrito.carritos.find(e=>e.id == id).productos
        }else{
            return 'no existe carrito con el id buscado'
        }
    }
    addProducts(id, product){
        if(Carrito.id >= id){
            Carrito.carritos.find(e=>e.id == id).productos.push(product)
            try {
                const data = fs.readFileSync(`./persistencia.txt`, 'utf-8')
                const arrayObject = JSON.parse(data)
                arrayObject.push(product)
                fs.writeFileSync(`./persistencia.txt`, JSON.stringify(arrayObject))
            } catch (error) {
                throw error
            }
            return 'hecho'
        }else{
            return 'no existe carrito con el id buscado'
        }
    }
    deleteProducts(idCard, idProduct){ //esto esta pal orto seguro que esto asiga al array carrito un objeto
        if(Carrito.id >= idCard){
           const objetoCarrito = Carrito.carritos.find(e=>e.id == idCard)
           const index = Carrito.carritos.indexOf(objetoCarrito)
           if(objetoCarrito.productos.find(e=>e.id == idProduct)){
               const arrayCarritoProductos = objetoCarrito.productos.filter(e=>e.id != idProduct);
               objetoCarrito.productos = arrayCarritoProductos
               Carrito.carritos[index] = objetoCarrito;
               return 'producto borrado del carrito correctamente'
           }else{
                return 'el producto no se encuentra en el carrito'
           }
        }else{
            return 'no existe carrito con el id buscado'
        }
    }
    getAllCarts(){
        return Carrito.carritos
    }
}

export default Carrito