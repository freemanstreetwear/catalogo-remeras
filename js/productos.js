// productos.js

// Abrir modal de talles al hacer clic en "Ver talles"
document.querySelectorAll(".btnVerTalles").forEach(boton => {
  boton.addEventListener("click", () => {
    const modalTalle = document.getElementById("modalTalle");
    modalTalle.style.display = "flex";
  });
});
