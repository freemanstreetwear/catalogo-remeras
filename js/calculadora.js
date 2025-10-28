// calculadora.js

const modalTalle = document.getElementById("modalTalle");
const burbujaTalle = document.getElementById("burbujaTalle");
const btnCerrarTalle = document.getElementById("btnCerrarTalle");
const btnCalcularTalle = document.getElementById("btnCalcularTalle");
const resultadoTalle = document.getElementById("resultadoTalle");

// Mostrar modal al tocar la burbuja
burbujaTalle.onclick = () => {
  modalTalle.style.display = "flex";
};

// Cerrar modal
btnCerrarTalle.onclick = () => {
  modalTalle.style.display = "none";
  resultadoTalle.textContent = "";
};

// Calcular talle
btnCalcularTalle.onclick = () => {
  const ancho = parseFloat(document.getElementById("anchoInput").value);
  const largo = parseFloat(document.getElementById("largoInput").value);

  if (!ancho || !largo) {
    resultadoTalle.textContent = "Por favor ingresá tus medidas.";
    return;
  }

  const talles = [
    { nombre: "S", ancho: 45, largo: 68 },
    { nombre: "M", ancho: 48, largo: 70 },
    { nombre: "L", ancho: 52, largo: 72 },
    { nombre: "XL", ancho: 56, largo: 74 },
    { nombre: "XXL", ancho: 60, largo: 76 },
  ];

  // Encuentra el talle más cercano
  let talleIdeal = talles[0];
  let diferenciaMin = Infinity;

  talles.forEach(talle => {
    const dif = Math.abs(ancho - talle.ancho) + Math.abs(largo - talle.largo);
    if (dif < diferenciaMin) {
      diferenciaMin = dif;
      talleIdeal = talle;
    }
  });

  resultadoTalle.textContent = `Tu talle ideal es: ${talleIdeal.nombre}`;
};
