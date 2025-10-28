// productos.js

// Selecciona todos los botones de talle
document.querySelectorAll(".btnTalle").forEach(boton => {
  boton.addEventListener("click", (e) => {
    const prod = e.target.closest(".producto");
    const nombre = prod.dataset.nombre;
    const precio = parseInt(prod.dataset.precio);
    const talle = e.target.dataset.talle;

    carrito.push({ nombre: `${nombre} - Talle ${talle}`, precio });
    actualizarCarrito();
  });
});

