window.addEventListener("load", function(event) {
  window.localStorage.removeItem("carrito")
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openNav() {
  document.getElementById("miCarrito").style.width = "25%";
  document.getElementById("cart").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("miCarrito").style.width = "0";
  document.getElementById("cart").style.marginLeft= "0";
}

const getParams = () => {
  return new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
}

const saveStuff = (item, counter, operation) => () => {
  let newCounter;
  if (operation === "+") {
    newCounter = parseInt(counter.innerHTML) + 1
    counter.innerHTML = parseInt(counter.innerHTML) + 1
  } else if (parseInt(counter.innerHTML) > 0) {
    newCounter = parseInt(counter.innerHTML) - 1
    counter.innerHTML = parseInt(counter.innerHTML) - 1
  }
  const carrito = JSON.parse(window.localStorage.getItem("carrito")) || {}
  const newCarrito = { ...carrito, [item.id]: { ...item, cantidad: newCounter }}
  window.localStorage.setItem("carrito", JSON.stringify(newCarrito))
}

const makeItem = (target, item) => {
  const children = document.createElement("div")
  const outer = document.createElement("div")
  outer.classList.add("item")
  const img = document.createElement("img")
  img.classList.add("descriptionPhoto")
  img.src = item.foto
  outer.appendChild(img)
  const itemDescription = document.createElement("div")
  itemDescription.classList.add("itemDescription")
  const descriptionButton = document.createElement("div")
  descriptionButton.classList.add("description-button")
  const description = document.createElement("div")
  description.classList.add("description")
  description.innerHTML=`
      <p class="nombre-producto">${item.nombre}</p>
      <p class="valor-producto">$${item.precio}</p>
  `
  itemDescription.appendChild(descriptionButton)
  descriptionButton.appendChild(description)

  const removeItem = document.createElement("button")
  const minus =  document.createElement("i")
  minus.innerHTML='<i class="fa-solid fa-minus"></i>'
  removeItem.appendChild(minus)
  removeItem.classList.add("addItem")
  descriptionButton.appendChild(removeItem)
  
  const counter = document.createElement("span")
  counter.innerHTML="0"
  descriptionButton.appendChild(counter)
  removeItem.addEventListener("click",saveStuff(item,counter, "-"))

  const addItem = document.createElement("button")
  const plus =  document.createElement("i")
  plus.innerHTML='<i class="fa-solid fa-plus"></i>'
  addItem.appendChild(plus)
  addItem.classList.add("addItem")
  addItem.addEventListener("click",saveStuff(item,counter,"+"))
  descriptionButton.appendChild(addItem)
  outer.appendChild(itemDescription)
  children.appendChild(outer)
  target.appendChild(children)
}

const getProducts = async () => {
  const target = document.getElementById("item-box")
  const currentRestaurant = getParams()
  const productos = (await axios.get(`http://localhost:3000/api/producto/of/${currentRestaurant.id}`)).data.data.producto
  productos.map((item)=>makeItem(target, item))
}

const getLogo = async ( ) => {
  const banner = document.getElementById("banner")
  const currentRestaurant = getParams()
  const rest = (await axios.get(`http://localhost:3000/api/local/${currentRestaurant.id}`)).data.data.local
  banner.innerHTML = `
    <img src="${rest.logo}" alt="" >

  ` 
}

getLogo()
getProducts()
getParams()