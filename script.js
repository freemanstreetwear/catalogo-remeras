// Datos de talles
const talles = [
    { talle: 'S', ancho: 45, largo: 68 },
    { talle: 'M', ancho: 48, largo: 70 },
    { talle: 'L', ancho: 51, largo: 72 },
    { talle: 'XL', ancho: 54, largo: 74 },
    { talle: 'XXL', ancho: 57, largo: 76 }
];

// Carrito
let carrito = [];

// Navegación
document.getElementById('ver-carrito').addEventListener('click', mostrarCarrito);
document.getElementById('cerrar-carrito').addEventListener('click', ocultarCarrito);

// Selección de talles con botón
document.querySelectorAll('.talle').forEach(div => {
    div.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            div.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
});

// Agregar al carrito
document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const color = producto.dataset.color;
        const talle = producto.querySelector('.talle button.selected')?.textContent;
        if (!talle) {
            alert('Selecciona un talle primero.');
            return;
        }
        agregarAlCarrito(color, talle);
        mostrarCarrito(); // abrir al agregar
    });
});

// Funciones del carrito
function agregarAlCarrito(color, talle) {
    const existente = carrito.find(item => item.color === color && item.talle === talle);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ color, talle, cantidad: 1 });
    }
    actualizarCarrito();
}

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
    calcularTotal();
}

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

function mostrarCarrito() {
    document.getElementById('carrito').classList.add('active');
    actualizarCarrito();
}

function ocultarCarrito() {
    document.getElementById('carrito').classList.remove('active');
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
    mensaje += `Envío: ${envio}\n`;
    const total = document.getElementById('total').textContent.split(': ')[1];
    mensaje += `Total: ${total}`;
    const url = `https://wa.me/3518583166?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Calculadora de talles
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

// Inicializar
document.getElementById('catalogo').classList.add('active');
