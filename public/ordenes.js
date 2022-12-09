const target = document.getElementById("orderBody")

const makeItem  = (target, pedido) => {
    const row = document.createElement("tr")
    row.classList.add("rodeado")
    row.innerHTML=`
    <td>${pedido.id}</td>
    <td>${pedido.fecha}</td>
    <td>${pedido.iva}</td>
    <td>${pedido.comision}</td>
    <td>${pedido.propina}</td>
    <td>${pedido.subtotal}</td>
    <td>${pedido.total}</td>
    <td>${pedido.estadoPedidoNombre}</td>
    <td>
        <table class="fat">
            <thead> 
                <tr>
                    <th>Id</th>
                    <th>Foto</th>
                    <th>nombre</th>
                    <th>descripcion</th>
                    <th>monto ahorrado</th>
                    <th>precio</th>
                    <th>cantidad</th>
                </tr>
            </thead>
            <tbody>
            ${
                pedido.producto.map((producto)=> (
                    `
                    <tr>
                        <td>${producto.id}</td>
                        <td>
                            <img class="mini" src="${producto.foto}" alt="">
                        </td>
                        <td>${producto.nombre}</td>
                        <td>${producto.descripcion}</td>
                        <td>${producto.montoAhorrado}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                    </tr>
                    `

                )).join("")
            }
            </tbody>
        </table>
    </td>  

    `
    const last = document.createElement("td")
    const button = document.createElement("button")
    button.innerHTML="Aceptar"
    button.addEventListener("click",async ()=>{
        await axios.put(`http://localhost:3000/api/pedido/${pedido.id}`,{
            estadoPedidoNombre: "aceptado"
        })
        target.innerHTML=""
        await getOrdenes()
    })
    last.appendChild(button)
    row.appendChild(last)

    target.appendChild(row)
}

async function getOrdenes () {
    const currentRestaurant = 1
    const pedidos = (await axios.get(`http://localhost:3000/api/pedido/of/${currentRestaurant}`)).data.data.pedido
    pedidos[0].map((item)=>makeItem(target, item))
  }



window.addEventListener("load", () => {
    getOrdenes()
})