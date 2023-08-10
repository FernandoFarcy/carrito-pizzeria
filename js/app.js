const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito")




/*** carrito es lo que esta en el localStorage, o array vacio */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
  const response =  await fetch ("data.json");
  const data = await response.json();


  /* mostramos todas las pizzas */
  data.forEach((product) => {
    let content = document.createElement("div")
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="face back">${product.descripcion}</p>
    <p class="price">${product.precio} $</p>
    
    `;
    
    shopContent.append(content);
  
    let comprar = document.createElement("button")
    comprar.innerText = "Comprar";
    comprar.className = "comprar";
    
    content.append(comprar);
  
    comprar.addEventListener("click", ()=>{
  
      const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);
  
      if(repeat === true) {
        
        carrito.map((prod) => {
          if(prod.id === product.id){
            prod.cantidad++
          }
        })

      }else {

        Toastify({
          text: "Sumo al carrito una piza",
          duration: 3000,
          position: 'center',
           style: {
             background: 'linear-gradient(to right, #0a0101, #970707)'
         }
        }).showToast();


        carrito.push({
          id : product.id,
          img: product.img,
          nombre:product.nombre,
          precio: product.precio,
          cantidad: product.cantidad,
        });
    }
      // console.log(carrito);

      /*** cuento los productos */
      carritoCounter();

      /*** lo meto en el localstorage  */
      saveLocal();

    });
  



  });
  


};

getProducts();




//set item
const saveLocal = () => {

  /***** guardo el carrito en el localstorage y le mando el string con JSON.stringify */
  localStorage.setItem("carrito", JSON.stringify(carrito));
};


//get item
/*** recuperaos con parse la info que esta en el storage en carrito*/
JSON.parse(localStorage.getItem("carrito"));




