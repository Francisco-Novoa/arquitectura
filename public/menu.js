
const makeItem  = (target, producto) => {
    const row = document.createElement("tr")
    row.innerHTML=`
        <td>
            <img class="productImg" src="${producto.foto}" alt="">
        </td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.descripcion}</td>

    `
    target.appendChild(row)
}

const getProducts = async () => {
    const target = document.getElementById("productBody")
    const currentRestaurant = 1
    const productos = (await axios.get(`http://localhost:3000/api/producto/of/${currentRestaurant}`)).data.data.producto
    productos.map((item)=>makeItem(target, item))
  }



window.addEventListener("load", () => {
    getProducts()
})