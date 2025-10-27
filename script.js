// =======================
// Datos de talles
// =======================
const talles = [
    { talle: 'S', ancho: 45, largo: 68 },
    { talle: 'M', ancho: 48, largo: 70 },
    { talle: 'L', ancho: 51, largo: 72 },
    { talle: 'XL', ancho: 54, largo: 74 },
    { talle: 'XXL', ancho: 57, largo: 76 }
];

// =======================
// Carrito
// =======================
let carrito = [];

// =======================
// Eventos de navegación
// =======================
document.getElementById('ver-carrito').addEventListener('click', mostrarCarrito);
document.getElementById('cerrar-carrito').addEventListener('click', ocultarCarrito);

// =======================
// Agregar productos al carrito
// =======================
document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const color = producto.dataset.color;
        const talle = producto.querySelector('.talle').value;
        agregarAlCarrito(color, talle);

        // Abrir automáticamente el carrito al agregar un producto
        mostrarCarrito();
    });
});

// =======================
// Función agregar al carrito
// =======================
function agregarAlCarrito(color, talle) {
    const existente = carrito.find(item => item.color === color && item.talle === talle);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ color, talle, cantidad: 1 });
    }
    actualizarCarrito();
}

// =======================
// Actualizar carrito en pantalla y total en tiempo real
// =======================
function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';

    if (carrito.length === 0) {
        lista.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-carrito';
            div.innerHTML = `<p>Remera ${item.color}, talle ${item.talle} x${item.cantidad}</p>`;
            lista.appendChild(div);
        });
    }

    // Actualizar el total en tiempo real
    calcularTotal();
}

// =======================
// Calcular total con envío
// =======================
function calcularTotal() {
    const envioSelect = document.getElementById('tipo-envio');
    const envio = envioSelect.value;
    let costoEnvio = 0;

    if (envio.startsWith('domicilio-')) {
        costoEnvio = parseInt(envio.split('-')[1]);
    }

    const subtotal = carrito.reduce((sum, item) => sum + (15000 * item.cantidad), 0);
    const total = subtotal + costoEnvio;

    document.getElementById('total').textContent = `Total: $${total.toLocaleString()}`;
}

// =======================
// Mostrar / ocultar carrito
// =======================
function mostrarCarrito() {
    document.getElementById('carrito').classList.add('active');
    actualizarCarrito();
}

function ocultarCarrito() {
    document.getElementById('carrito').classList.remove('active');
}

// =======================
// Enviar pedido por WhatsApp
// =======================
document.getElementById('enviar-whatsapp').addEventListener('click', () => {
    if (carrito.length === 0) return;

    const envioSelect = document.getElementById('tipo-envio');
    const envio = envioSelect.options[envioSelect.selectedIndex].text;

    let mensaje = 'Hola! Quiero hacer este pedido:\n';
    carrito.forEach(item => {
        mensaje += `- Remera ${item.color}, talle ${item.talle} x${item.cantidad}\n`;
    });
    mensaje += `Envío: ${envio}\n`;

    const total = document.getElementById('total').textContent.split(': ')[1];
    mensaje += `Total: ${total}`;

    const url = `https://wa.me/3518583166?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// =======================
// Calculadora de talles
// =======================
document.getElementById('calcular-talle').addEventListener('click', () => {
    const ancho = parseInt(document.getElementById('ancho').value);
    const largo = parseInt(document.getElementById('largo').value);

    if (isNaN(ancho) || isNaN(largo)) {
        document.getElementById('resultado-talle').textContent = 'Ingresa valores válidos.';
        return;
    }

    let talleRecomendado = 'No recomendado';
    let minDiff = Infinity;

    talles.forEach(t => {
        const diff = Math.abs(t.ancho - ancho) + Math.abs(t.largo - largo);
        if (diff < minDiff) {
            minDiff = diff;
            talleRecomendado = t.talle;
        }
    });

    document.getElementById('resultado-talle').textContent = `Talle recomendado: ${talleRecomendado}`;
});

// =======================
// Inicializar catálogo activo
// =======================
document.getElementById('catalogo').classList.add('active');
