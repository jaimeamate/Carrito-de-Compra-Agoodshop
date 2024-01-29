class Carrito {
  constructor(info_basica_productos, moneda) {
    this.productosCarrito = info_basica_productos;
    this.moneda = moneda;
    this.decimales = 2;
  }

  actualizarUnidades(sku, unidades) {
    //comprobamos si existe el sku dado por parametro y almacenamos true o false en una variable
    const productoEncontrado = this.productosCarrito.find((p) => p.sku === sku);
    // si existe modifica la cantidad del producto del carrito
    if (productoEncontrado) {
      this.productosCarrito = this.productosCarrito.map((p) => {
        if (p.sku === sku) {
          p.cantidad = unidades;
          return p;
        } else {
          return p;
        }
      });
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
      return productoEncontrado[0];
    }
  }

  calcular_total(listaPreciosTotales) {
    const total = listaPreciosTotales.reduce((acc,pre)=>{
      return acc + pre
    })
    return total
  }

  calcular_total_producto(sku, price) {
    //comprobamos que el producto existe
    const productoEncontrado = this.productosCarrito.filter((p) => p.sku === sku);
    if (productoEncontrado.length > 0) {
      // calculamos el precio total del producto
      const totalProducto = price * productoEncontrado[0].cantidad;
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
    return data;
  }
}
