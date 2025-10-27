// Datos de talles
const talles = [
    { talle: 'S', ancho: 45, largo: 68 },
    { talle: 'M', ancho: 48, largo: 70 },
    { talle: 'L', ancho: 51, largo: 72 },
    { talle: 'XL', ancho: 54, largo: 74 },
    { talle: 'XXL', ancho: 57, largo: 76 }
];

let carrito = [];

// Selección de talles con botón
document.querySelectorAll('.talle').forEach(div => {
    div.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            div.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
});

// Agregar productos al carrito
document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', e => {
        const producto = e.target.closest('.producto');
        const color = producto.dataset.color;
        const talle = producto.querySelector('.talle button.selected')?.textContent;
        if (!talle) {
            alert('Selecciona un talle primero.');
            return;
        }
        agregarAlCarrito(color, talle);
        actualizarMiniCarrito();
    });
});

// Funciones
function agregarAlCarrito(color, talle) {
    const existente = carrito.find(item => item.color === color && item.talle === talle);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ color, talle, cantidad: 1 });
    }
}

function calcularTotal() {
    const subtotal = carrito.reduce((sum, item) => sum + (15000 * item.cantidad), 0);
    return subtotal;
}

// Barra inferior
const miniCarrito = document.getElementById('mini-carrito');
const miniCarritoText = document.getElementById('mini-carrito-text');

function actualizarMiniCarrito() {
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = calcularTotal();
    miniCarritoText.textContent = `${totalProductos} productos - $${totalPrecio.toLocaleString()}`;
}

// Al clickear la barra, se abre el carrito
miniCarrito.addEventListener('click', () => {
    mostrarCarrito();
});

// Carrito completo
const carritoDiv = document.getElementById('carrito');
const listaCarrito = document.getElementById('lista-carrito');

function mostrarCarrito() {
    carritoDiv.classList.add('active');
    actualizarCarrito();
}

function ocultarCarrito() {
    carritoDiv.classList.remove('active');
}

function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>Tu carrito está vacío</p>';
    } else {
        carrito.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-carrito';
            div.textContent = `Remera ${item.color}, talle ${item.talle} x${item.cantidad}`;
            listaCarrito.appendChild(div);
        });
    }
    document.getElementById('total').textContent = `Total: $${calcularTotal().toLocaleString()}`;
}

// WhatsApp
document.getElementById('enviar-whatsapp').addEventListener('click', () => {
    if (carrito.length === 0) return;
    const envioSelect = document.getElementById('tipo-envio');
    const envio = envioSelect.options[envioSelect.selectedIndex].text;
    let mensaje = 'Hola! Quiero hacer este pedido:\n';
    carrito.forEach(item => {
        mensaje += `- Remera ${item.color}, talle ${item.talle} x${item.cantidad}\n`;
    });
    mensaje += `Envío: ${envio}\nTotal: $${calcularTotal().toLocaleString()}`;
    const url = `https://wa.me/3518583166?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Cerrar carrito
document.getElementById('cerrar-carrito').addEventListener('click', () => {
    ocultarCarrito();
});
