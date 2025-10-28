// carrito.js

const carrito = [];
const barra = document.getElementById("barraCarrito");
const modal = document.getElementById("modalCarrito");
const lista = document.getElementById("listaCarrito");
const totalTxt = document.getElementById("total");

// Agregar productos al carrito
document.querySelectorAll(".producto button").forEach(btn => {
  btn.addEventListener("click", e => {
    if (e.target.classList.contains("btnVerTalles")) return; // Ignorar botón "Ver talles"

    const prod = e.target.closest(".producto");
    const nombre = prod.dataset.nombre;
    const precio = parseInt(prod.dataset.precio);
    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  if (carrito.length > 0) {
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    barra.style.display = "block";
    barra.textContent = `${carrito.length} producto(s) - Total $${total}`;
  }
}

// Abrir modal del carrito
barra.addEventListener("click", () => {
  modal.style.display = "flex";
  lista.innerHTML = "";
  carrito.forEach(p => lista.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`);
  totalTxt.textContent = "Total: $" + carrito.reduce((a, b) => a + b.precio, 0);
});

// Cerrar modal
document.getElementById("btnCerrar").onclick = () => modal.style.display = "none";

// Enviar pedido por WhatsApp
document.getElementById("btnEnviar").onclick = () => {
  const mensaje = carrito.map(p => `• ${p.nombre} - $${p.precio}`).join("%0A");
  const total = carrito.reduce((a, b) => a + b.precio, 0);
  window.open(`https://wa.me/3518583166?text=Hola!%20Quiero%20encargar:%0A${mensaje}%0ATotal:%20$${total}`);
};
