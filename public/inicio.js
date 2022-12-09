const target = document.getElementById("restaurants-box")

const createRestaurante = (restaurantes) => {
    restaurantes.map((restaurante)=>{
        const rest = document.createElement("div")
        console.log(restaurante)
        rest.innerHTML = `
        <div class="restaurant-box">
            <a href="restaurante.html?id=${restaurante.id}">
                <img src="${restaurante.logo}" alt="" class="product-img">
                <h2 class="product-title">${restaurante.nombre}</h2>
                <div class="restaurant-info">
                    <p class="envio">Direccion: ${restaurante.direccion} </p>
                </div>
                <i class="add-cart"></i>
            </a>
            
        </div>
    ` 
    target.appendChild(rest)
    })
}
const getRestaurantes = async () => {
    const rest = (await axios.get("http://localhost:3000/api/local")).data.data.local
    createRestaurante(rest)
}

getRestaurantes()
console.log(target)