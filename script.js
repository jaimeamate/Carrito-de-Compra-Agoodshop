document.addEventListener('DOMContentLoaded',() => {
    //recuperamos los datos del carrito de la api
    fetch('http://jsonblob.com/api/jsonBlob/1198618844863520768')
    // fetch('./data.json')
    .then(response => response.json()
    .then((data) => {
        //GENERAMOS NUESTRA LISTA DE PRODUCTOS
        productos = []
        data.products.forEach(p => {
            productos.push(new Producto(p.sku, p.title, p.price))
            // console.log(`producto ${p.title} con precio ${p.price}€ creado`)
        });
        console.log(`FIN PRODUCTOS`)

        //GENERAMOS CARRITO ENCAPSULANDO ESTE OBJETO DE TODO LO AJENO A EL
        datos_productos_carrito = data.products.map((p)=>{return {sku: p.sku,cantidad: p.quantity}})
        // console.log(datos_productos_carrito)
        carrito = new Carrito(datos_productos_carrito, data.currency)
        console.log(`FIN CARRITO`)
        console.log('CARRITO Y PRODUCTO FUNCIONA')
        // MODIFICACION DOM
        function pintarDOM() {
            //borramos el contenido antes de pintar
            document.getElementById('products-container').innerHTML = `
            <ul class="border-bottom">
                <li>Producto</li>
                <li class="center-text">Cantidad</li>
                <li>Unidad</li>
                <li>Total</li>
            </ul>
            `
            document.getElementById('amount-products-totals').innerHTML = ''
            //recorremos los productos y creamos elementos en el DOM en base a ellos
            productos.forEach(p => {
                //contenedores
                contenedorProductos = document.getElementById('products-container')
                contenedorProductosTotal = document.getElementById('amount-products-totals')
                contenedorPrecioTotal = document.getElementById('amount-container').getElementsByTagName('h3')[0]
                //productos front
                {
                //lista
                lista = document.createElement('ul')
                //item Producto
                itemProducto = document.createElement('li')
                itemProductoNombre = document.createElement('h4')
                itemProductoNombre.textContent = p.nombre
                itemProductoRef = document.createElement('span')
                itemProductoRef.classList.add('sku-css')
                itemProductoRef.textContent = 'Ref: ' + p.sku
                itemProducto.appendChild(itemProductoNombre)
                itemProducto.appendChild(itemProductoRef)
                //item Cantidad
                itemCantidad = document.createElement('li')
                itemCantidadQSelector = document.createElement('quantity-selector')
                itemCantidadQSelector._contador = carrito.obtenerInformacionProducto(p.sku).cantidad
                itemCantidadQSelector.actualizarContador()
                itemCantidad.appendChild(itemCantidadQSelector)
                //item precio unitario
                itemPrecioUnitario = document.createElement('li')
                itemPrecioUnitario_Precio = document.createElement('span')
                itemPrecioUnitario_Precio.textContent = p.precio+`${carrito.moneda}`
                itemPrecioUnitario.appendChild(itemPrecioUnitario_Precio)
                //item total producto
                itemTotalProducto = document.createElement('li')
                itemTotalProducto_Total = document.createElement('h4')
                // itemTotalProducto_Total.setAttribute('id',p.sku)
                itemTotalProducto_Total.setAttribute('class',p.sku)
                itemTotalProducto_Total.textContent = (p.precio * carrito.obtenerInformacionProducto(p.sku).cantidad).toFixed(2) + `${carrito.moneda}`
                // itemTotalProducto_Total.setAttribute('id','pID_'+productID)
                // console.log(itemTotalProducto_Total.getAttribute('id'))
                itemTotalProducto.appendChild(itemTotalProducto_Total)
                //append to lista
                lista.appendChild(itemProducto)
                lista.appendChild(itemCantidad)
                lista.appendChild(itemPrecioUnitario)
                lista.appendChild(itemTotalProducto)
                //append to contenerdor
                contenedorProductos.appendChild(lista)
                //listeners
                itemCantidadQSelector.addEventListener('click',(ev)=>{
                    // carrito.actualizarUnidades(p.sku,ev.target._contador)
                    //pintarDOM()
                })
                itemCantidadQSelector.inputValor.addEventListener('input', (ev) => {
                    // console.log('has cambiado el contenido del input')
                    // console.log(p.sku)
                    carrito.actualizarUnidades(p.sku,ev.target.value)
                    // document.getElementById(p.sku).textContent = carrito.calcular_total_producto(p.sku)+`${carrito.moneda}`
                    Array.from(document.getElementsByClassName(p.sku)).forEach(el => {
                        el.textContent = carrito.calcular_total_producto(p.sku)+`${carrito.moneda}`
                    })
                    contenedorPrecioTotal.textContent = carrito.calcular_total().toFixed(2)+`${carrito.moneda}`
                })
                }
                //total front
                {
                //listaTotal
                listaTotal = document.createElement('ul')
                //Elemento item
                itemProductoTotal = document.createElement('li')
                itemProductoTotal.classList.add('border-bottom_dashed')
                //nombre prod
                itemProductoNombreTotal = document.createElement('p')
                itemProductoNombreTotal.textContent = p.nombre
                //precio total prod
                itemProductoPrecioTotal = document.createElement('p')
                itemProductoPrecioTotal.setAttribute('class',p.sku)
                itemProductoPrecioTotal.textContent = itemTotalProducto_Total.textContent
                //appends
                itemProductoTotal.appendChild(itemProductoNombreTotal)                
                itemProductoTotal.appendChild(itemProductoPrecioTotal)                
                listaTotal.appendChild(itemProductoTotal)
                //append contenedor
                contenedorProductosTotal.appendChild(listaTotal)
                }
            })
            //total amount
            contenedorPrecioTotal.textContent = carrito.calcular_total().toFixed(2)+`${carrito.moneda}`
            // console.log(contenedorPrecioTotal.textContent)
        }
        //renderizamos front
        pintarDOM()
    }))
    //prueba de que no peta el script
    // console.log('funciona')
});


