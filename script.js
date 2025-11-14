// Simular stock (usa Firebase para real)
let stock = { 'mascarilla-coco': 40, /* etc. */ };
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar productos (ejemplo para Skincare)
function mostrarSub(sub) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    // Ejemplo: Agrega productos dinámicamente
    const productos = [
        { id: 'mascarilla-coco', nombre: 'Mascarilla de Coco', precio: 500, stock: stock['mascarilla-coco'] },
        // Agrega más
    ];
    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = p.stock > 0 ? 'producto' : 'producto agotado';
        div.innerHTML = `
            <img src="placeholder.jpg" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            ${p.stock > 0 ? `<button onclick="agregarCarrito('${p.id}')">Agregar</button>` : '<p>AGOTADO</p><button onclick="interesado()">Estoy Interesado</button>'}
        `;
        productosDiv.appendChild(div);
    });
}

// Agregar al carrito
function agregarCarrito(id) {
    if (stock[id] > 0) {
        carrito.push(id);
        stock[id]--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
    } else {
        alert('Producto agotado mientras navegabas.');
        // Remover del carrito si estaba
    }
}

// Actualizar carrito
function actualizarCarrito() {
    document.getElementById('carrito-count').textContent = carrito.length;
    // Lógica para modal
}

// Checkout con envío
function checkout() {
    // Calcular envío (ejemplo)
    let envio = 0;
    if (/* Correo Argentino */) envio = 800;
    // Integrar MercadoPago aquí
    alert('Integrar MercadoPago para pagos.');
}

// Reclamo
function enviarReclamo(e) {
    e.preventDefault();
    // Enviar a email (usa backend)
    alert('Gracias por tu aporte, nos comunicaremos pronto.');
}

// Interesado en agotado
function interesado() {
    // Enviar email
    alert('Registrado tu interés.');
}

// Inicializar
mostrarSub('nuevo');
