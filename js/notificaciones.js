// notificaciones.js

const nombres = ["Lautaro","Julieta","Mateo","Camila","Agustín","Martina","Bruno","Sofía","Luciano","Valentina","Santiago","Mía","Facundo","Lucía","Tobías","Catalina","Franco","Juana","Thiago","Emma","Nicolás","Abril","Benjamín","Rocío","Lucas","Lara","Simón","Magalí","Tomás","Milagros","Dylan","Florencia","Ezequiel","Melina","Kevin","Nadia","Leandro","Paulina","Ramiro","Cecilia"];
const colores = ["Negra","Blanca","Gris Topo","Beige","Roja","Azul Oscuro"];
const talles = ["S","M","L","XL","XXL"];
const notif = document.getElementById("notificaciones");

function mostrarNotificacion() {
  const n = nombres[Math.floor(Math.random()*nombres.length)];
  const c = colores[Math.floor(Math.random()*colores.length)];
  const t = talles[Math.floor(Math.random()*talles.length)];
  notif.textContent = `${n} ha encargado 1 remera ${c} talle ${t}`;
  notif.style.opacity = 1;
  setTimeout(() => notif.style.opacity = 0, 4000);
}

setInterval(mostrarNotificacion, 15000);
