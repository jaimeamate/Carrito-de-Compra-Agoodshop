class Carrito {
    constructor(productos) {
      this.productos = productos
    }

    actualizarUnidades(sku, unidades) {
      const productoEncontrado = this.productos.filter(producto => producto.sku === sku)
      if (productoEncontrado.length > 0) {
        productoEncontrado[0].quantity = unidades;  
        console.log('Producto con sku ${sku} actualizado, unidades actuales: $(productoEncontrado[0].quantity)')        
      } else {
        console.log('Producto con sku $(sku) no se ha encontrado')
      }
      // Actualiza el número de unidades que se quieren comprar de un producto
    }

    obtenerInformacionProducto(sku) {
      const productoEncontrado = this.productos.filter(producto => producto.sku === sku)
      console.log(productoEncontrado.length > 0
        ? "Producto encontrado: " + productoEncontrado[0]
        : "Producto no encontrado"
      );      
      // Devuelve los datos de un producto además de las unidades seleccionadas
      // Por ejemplo
      // {
      //   "sku": "0K3QOSOV4V",
      //   "quantity": 3
      // } 
    }

    obtenerCarrito() {
      // fetch('https://jsonblob.com/api/jsonBlob/1192490599940218880')
      fetch('data.json')
      .then(promise => promise.json().then(function(result) {
        console.log(result);
      }));      
      // Devuelve información de los productos añadidos al carrito
      // Además del total calculado de todos los productos
      // Por ejemplo:
      // {
      //   "total": "5820",
      //   "currency: "€",
      //   "products" : [
      //     {
      //       "sku": "0K3QOSOV4V"
      //       ..
      //     }
      //    ]}
      // }  
    }
  }