'use strict'

import Buy from './buy.model.js'
import Product from '../product/product.model.js'

export const save = async(req, res)=>{  
    try{
        let{ products, amount} = req.body
        let product = await Product.findById(products);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        let buy = new Buy(req.body)
        buy.items.push({ products: product._id, amount: amount});
        await buy.save()
        return res.send({message: `Registered successfully,`})
        
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering buy', err: err})
    }

}






export const deleteU = async(req,res)=>{
    try{

    }catch(err){
    console.error(err)
    return res.status(500).send({message: 'Error deleting buy'})
    }
}

/*
export const agregarAlCarrito = async (req, res) => {
    try {
        // Obtener el ID del producto y la cantidad del cuerpo de la solicitud
        let { productId, quantity } = req.body;

        //Obtener token
        let token = req.headers.authorization
        //Decodificar el token y obtener el id
        let decodeToken = jwt.verify(token, process.env.SECRET_KEY)
        let id = decodeToken.id
        console.log(id)

        // Verificar si el usuario ya tiene un carrito
        let carrito = await Cart.findOne({ user: id });

        // Si el usuario no tiene un carrito, crear uno nuevo
        if (!carrito) {
            carrito = new Cart({ user: id, items: [] });
        }

        //Verificar stock y actualizarlo en producto
        let producto = await Producto.findById(productId)
        if(!producto){
            return res.status(404).send({message: 'Producto no encontrado'})
        }
        if(parseInt(producto.stock) < parseInt(quantity)){return res.status(400).send({ message: 'No hay suficientes productos disponibles en stock' });}
        //Actualizar stock del producto
        producto.stock = parseInt(producto.stock) - parseInt(quantity);
        await producto.save()

        // Verificar si el producto ya está en el carrito
        let itemExistenteIndex = carrito.items.findIndex(item => item.product.toString() === productId.toString());

        if (itemExistenteIndex !== -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            carrito.items[itemExistenteIndex].quantity += parseInt(quantity);
        } else {
            // Si el producto no está en el carrito, agregarlo
            carrito.items.push({ product: productId, quantity });
        }

        // Guardar los cambios en el carrito
        await carrito.save();
        

        return res.status(200).send({ message: 'Producto agregado al carrito correctamente' });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error al agregar producto al carrito' });
    }
};


*/