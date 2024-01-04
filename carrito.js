class Carrito {
    constructor(productos) {
    }

    actualizarUnidades(sku, unidades) {
      // Actualiza el número de unidades que se quieren comprar de un producto
    }

    obtenerInformacionProducto(sku) {
      // Devuelve los datos de un producto además de las unidades seleccionadas
      // Por ejemplo
      // {
      //   "sku": "0K3QOSOV4V",
      //   "quantity": 3
      // } 
    }

    obtenerCarrito() {
        fetch('http://jsonblob.com/api/jsonBlob/1184215894598737920')
        .then(response => response.json())
        .then(products => {console.log(products)});
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