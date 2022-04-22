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
/* 
console.log(new Carrito().createCart())
console.log(new Carrito().createCart())
console.log(new Carrito().createCart())
console.log(new Carrito().deleteProducts(1, 1))
console.log(new Carrito().addProducts(1, {id:1, nombre:'facundo'}))
console.log(new Carrito().addProducts(1, {id:2, nombre:'roman'}))
console.log(new Carrito().addProducts(1, {id:3, nombre:'roman'}))
console.log(new Carrito().addProducts(1, {id:4, nombre:'roman'}))
console.log(new Carrito().addProducts(1, {id:5, nombre:'roman'}))
console.log(new Carrito().getProducts(1))
console.log(new Carrito().getProducts(2))
console.log(new Carrito().deleteProducts(1, 1))
console.log(new Carrito().deleteCart(3))
console.log(new Carrito().deleteProducts(1, 5))
console.log(new Carrito().getProducts(1))
console.log(new Carrito().getAllCarts()) */
export default Carrito