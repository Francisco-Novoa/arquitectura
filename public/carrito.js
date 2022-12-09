
const getParams = () => {
    return new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
}

const addElements = (product) => {
    const listItem = this.document.createElement("div")
            listItem.classList.add("list-item")
            listItem.innerHTML=`
                <div>
                    <div>
                        <h3>${product.nombre}</h3>
                    </div>
                    <div>
                        <p>${product.descripcion}</p>
                    </div>
                    <div>
                        <span>cantidad</span>
                        <span>${product.cantidad}</span>
                    </div>
                    <div>
                        <span>precio</span>
                        <span>${product.precio}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>$ ${product.precio * product.cantidad}</h3>
                    </div>
                </div>
            `
    return  listItem
}

const subtotal = this.document.getElementById("subtotal")
const iva = this.document.getElementById("iva")
const totalDisplay = this.document.getElementById("total")
const container = this.document.getElementById("product-list")


window.addEventListener("load", async function(event) {
    if (getParams().id === null) {
        const carrito = JSON.parse(window.localStorage.getItem("carrito"))
        const total = Object.keys(carrito).reduce((acc, elem)=>{
            const product = carrito[elem]
            container.appendChild(addElements(product))
            return acc + product.precio * product.cantidad
        }, 0)
        subtotal.innerHTML="$"+total
        iva.innerHTML="$"+parseInt(total*0.19)
        totalDisplay.innerHTML="$"+(total+1500 + 500)
        const payButton = this.document.getElementById("paybutton")
            this.document.getElementById("payBox").classList.remove("hidden")
            payButton.addEventListener("click",async ()=>{
                const total = Object.keys(carrito).reduce((acc, id)=>{
                    elem = carrito[id]
                    return (
                acc + elem.precio * elem.cantidad
                )}, 0)
                const { pedido } = (await axios.post("http://localhost:3000/api/pedido",{
                    total: total+1500+500,
                    precioEnvio: 1500,
                    iva: parseInt(total*0.19),
                    comision: 500,
                    propina: 0,
                    subtotal: total,
                    usuarioId: 1,
                    estadoPedidoNombre: "confirmacion"
                })).data.data
        

                await Promise.all(Object.keys(carrito).map(async (elem)=> {
                    const producto = carrito[elem]
                    await axios.post("http://localhost:3000/api/item_pedido", {
                        montoAhorrado: 0,
                        cantidad: producto.cantidad,
                        pedidoId: pedido.id,
                        productoId: producto.id
                    })
                }))
                console.log(pedido.id)
                this.document.getElementById("seg").classList.remove("hidden")
                this.document.getElementById("msg").classList.remove("hidden")
                this.document.getElementById("seguimiento").innerHTML="#"+pedido.id

                
            })
    
    0} else {
        this.document.getElementById("title").innerHTML=`Pedido numero #${getParams().id}`
        this.document.getElementById("pedido_estado_container").classList.remove("hidden")
        const { pedido } = (await axios.get(`http://localhost:3000/api/pedido/${getParams().id}`)).data.data
        this.document.getElementById("estado_pedido").innerHTML=pedido.estadoPedidoNombre === "confirmacion" ? "En Espera de Confirmacion" : "Aceptado"
        subtotal.innerHTML="$"+pedido.subtotal
        iva.innerHTML="$"+pedido.iva
        totalDisplay.innerHTML="$"+pedido.total
        pedido.item_pedidos.map(({ cantidad, producto }) => {
            container.appendChild(addElements({ ...producto, cantidad}))
        })
        console.log(pedido)
    }
})
