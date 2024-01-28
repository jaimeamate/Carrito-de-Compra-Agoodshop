class Carrito {
  constructor(info_basica_productos, moneda) {
    this.productosCarrito = info_basica_productos;
    this.moneda = moneda;
    // this.formato = 10;
    this.decimales = 2;
  }

  actualizarUnidades(sku, unidades) {
    //comprobamos si existe el sku dado por parametro y almacenamos true o false en una variable
    const productoEncontrado = this.productosCarrito.find((p) => p.sku === sku);
    // si existe modifica la cantidad del producto del carrito
    if (productoEncontrado) {
      // productoEncontrado[0].quantity = unidades;
      this.productosCarrito = this.productosCarrito.map((p) => {
        if (p.sku === sku) {
          p.cantidad = unidades;
          return p;
        } else {
          return p;
        }
      });
      // console.log(
      //   `Producto con sku "${sku}" actualizado, unidades actuales: ${unidades}`
      // );
    }
    //si no, no hace nada
    else {
      // console.log(`Producto con sku "${sku}" no se ha encontrado`);
    }
    // Actualiza el número de unidades que se quieren comprar de un producto
  }

  obtenerInformacionProducto(sku) {
    // comprobamos si existe filtrando el array de productos del carrito
    const productoEncontrado = this.productosCarrito.filter(
      (p) => p.sku === sku
    );
    //si nos devuelve un array con productos es que existe por tanto devolvemos su informacion
    if (productoEncontrado.length > 0) {
      // console.log(`Producto con sku "${sku}" encontrado`);
      return productoEncontrado[0];
    }
    // si no existe pues nada
    else {
      // console.log(`Producto con sku "${sku}" no se ha encontrado`);
    }
  }

  calcular_total(listaPreciosTotales) {
    // const listaPreciosTotales = productos.map((p)=>{
    //   return parseFloat(this.calcular_total_producto(p.sku))
    // })
    // console.log(listaPreciosTotales)
    const total = listaPreciosTotales.reduce((acc,pre)=>{
      return acc + pre
    })
    return total
  }

  calcular_total_producto(sku, price) {
    //comprobamos que el producto existe
    const productoEncontrado = this.productosCarrito.filter((p) => p.sku === sku);
    // console.log(productoEncontrado)
    if (productoEncontrado.length > 0) {
      // sacamos el precio del producto del array de Productos
      //const precioProductoEncontrado = productos.filter((p) => p.sku === sku)[0].precio;
      // calculamos el precio total del producto
      const totalProducto = price * productoEncontrado[0].cantidad;
      // console.log(totalProducto + ' $(moneda)')
      return totalProducto.toFixed(this.decimales);
    }
  }

  obtenerCarrito() {
    //creamos el objeto con la informacion a mostrar
    const data = {
      total: this.calcular_total(),
      currency: this.moneda,
      products: this.productosCarrito,
    };
    // console.log(data)
    return data;
  }
}
