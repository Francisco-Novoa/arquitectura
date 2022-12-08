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

const makeItem = (target, item) => {
  const children = document.createElement("div")
  children.innerHTML= `
    <div class="item">
      <img class="descriptionPhoto" src="./assets/images/products/${item.FOTO}" alt="">
      <div class="itemDescription">
          <div class="description-button">
              <div class="description">
                  <p class="nombre-producto">${item.NOMBRE}</p>
                  <p class="valor-producto">${item.PRECIO}</p>
              </div>
              <div class="addItem">
                  <a href="#">
                      <i class="fa-solid fa-plus"></i>
                  </a>
              </div>    
          </div>
      </div>              
    </div>
  `
  target.appendChild(children)
}

const getProducts = async () => {
  const target = document.getElementById("item-box")
  const productos = (await axios.get("http://localhost:3000/api/productos/of/1")).data.productos
  console.log(productos)
  productos.map((item)=>makeItem(target, item))
  console.log(productos.data)
}

getProducts()