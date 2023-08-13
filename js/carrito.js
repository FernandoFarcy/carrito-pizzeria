


/*** refresco en la pantalla el carrito   */
const pintarCarrito = () =>{
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">CARRITO PIZZERO.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "X";
  modalbutton.className = "modal-header-button";


  modalbutton.addEventListener("click", () =>{
    modalContainer.style.display = "none";
  });


  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent =document.createElement("div");
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
                      <img src="${product.img}">
                      <h3>${product.nombre}</h3>
                      <p>${product.precio} $</p>
                      <span class="restar"> ➖ </span>
                      <p>Cantidad: ${product.cantidad}</p>
                      <span class="sumar"> ➕ </span>
                      <p>Total: ${product.cantidad * product.precio}</p>
                      <span class="delete-product"> ❌ </span>
                    `;  
    modalContainer.append(carritoContent)
    let restar = carritoContent.querySelector(".restar")
    restar.addEventListener("click", () =>{
      
      
      if(product.cantidad !==1){
        product.cantidad--;
        saveLocal();
        pintarCarrito()
        
        Toastify({
            text: "Desconto una pizza:   ",
            duration: 3000,
            position: 'left',
            style: {
              background: 'linear-gradient(to right, #0a0101, #970707)'
          }
          }).showToast();
        
      }else {
        Toastify({
          text: "Ya no puede descontar, pues solo queda una pizza.",
          duration: 3000,
          position: 'left',
          style: {
              background: 'linear-gradient(to right, #0a0101, #970707)'
          }
      }).showToast();

      }
      

    })

    let sumar = carritoContent.querySelector(".sumar")
    sumar.addEventListener("click", () =>{

        product.cantidad++;
        Toastify({
          text: "Sumo una pizza",
          duration: 3000,
          position: 'right',
          style: {
            background: 'linear-gradient(to left, #0a0101,#970707 )'
        }
        }).showToast();
      

        /*** guado el carrito en el storage */
        saveLocal();


        pintarCarrito()

    })

    let eliminar = carritoContent.querySelector(".delete-product");
    eliminar.addEventListener("click", ()=>{

      Swal.fire({
        title: 'Está seguro de eliminar esta pizza',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí si',
        cancelButtonText: 'No no'
      }).then((result) => {
  
      if (result.isConfirmed) {
          eliminarProducto(product.id);
          Toastify({
            className: "toastPizaBorrada",
            text: "Pizza borrada",
            duration: 2000,
            position: 'center',
             style: {
              background: "#e30808",
              fontWeight: "bold",
              
              marginTop: "15rem",
              height: "8rem",
              borderRadius: "100%",
              
          }
          }).showToast();
        }
      })
    })

  });


  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `TOTAL A PAGAR: ${total} $`;
  modalContainer.append(totalBuying);

};

verCarrito.addEventListener("click",pintarCarrito)



const eliminarProducto = (id) => {

  const foundId = carrito.find((Element) => Element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter();
  saveLocal();
  pintarCarrito();

};



/*** cuento carrito, guardo en el localStorage */
const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))

}
carritoCounter();


