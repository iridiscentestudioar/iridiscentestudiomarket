// Simular stock (agrega más IDs)
let stock = {
    'mascarilla-coco': 40,
    'serum-vitc': 20,
    'esmaltes-rojo': 15,
    // Agrega stock para otros productos
};
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Productos por subapartado (agrega más aquí)
const productosData = {
    nuevo: [
        { id: 'nuevo-producto1', nombre: 'Nuevo Producto 1', precio: 600, stock: 10, img: 'https://via.placeholder.com/300x300?text=Nuevo+Producto' }
    ],
    skincare: [
        { id: 'mascarilla-coco', nombre: 'Mascarilla de Coco', precio: 500, stock: stock['mascarilla-coco'], img: 'https://via.placeholder.com/300x300?text=Mascarilla+Coco', sub: 'Mascarillas' },
        { id: 'serum-vitc', nombre: 'Serum Vitamina C', precio: 800, stock: stock['serum-vitc'], img: 'https://via.placeholder.com/300x300?text=Serum+VitC', sub: 'Serums' },
        // Agrega más: Cremas, Parches, etc.
    ],
    maquillaje: [
        { id: 'base-maquillaje', nombre: 'Base de Maquillaje', precio: 700, stock: 25, img: 'https://via.placeholder.com/300x300?text=Base+Maquillaje', sub: 'Bases' },
        // Agrega: Polvos, Rubores, etc.
    ],
    unas: [
        { id: 'esmaltes-rojo', nombre: 'Esmaltes Rojo', precio: 300, stock: stock['esmaltes-rojo'], img: 'https://via.placeholder.com/300x300?text=Esmaltes+Rojo', sub: 'Esmaltes' },
        // Agrega: Decoración, Instrumental, etc.
    ],
    'pestanas-cejas': [
        { id: 'pestanas-postizas', nombre: 'Pestañas Postizas', precio: 400, stock: 30, img: 'https://via.placeholder.com/300x300?text=Pestañas+Postizas', sub: 'Pestañas' },
        // Agrega: Arqueadores, etc.
    ],
    pelo: [
        { id: 'cepillo-pelo', nombre: 'Cepillo para Pelo', precio: 200, stock: 50, img: 'https://via.placeholder.com/300x300?text=Cepillo+Pelo', sub: 'Cepillos' },
        // Agrega: Rizos, etc.
    ],
    accesorios: [
        { id: 'bolso-maquillaje', nombre: 'Bolso para Maquillaje', precio: 1000, stock: 10, img: 'https://via.placeholder.com/300x300?text=Bolso+Maquillaje', sub: 'Bolsos' },
        // Agrega: Totbags, etc.
    ],
    deco: [
        { id: 'vaso-decorativo', nombre: 'Vaso Decorativo', precio: 250, stock: 20, img: 'https://via.placeholder.com/300x300?text=Vaso+Decorativo', sub: 'Vasos' },
        // Agrega: Botellas, etc.
    ]
};

// Mostrar subapartado
function mostrarSub(sub) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';
    const productos = productosData[sub] || [];
    productos.forEach(p => {
        const div = document.createElement('div');
        div.className = p.stock > 0 ? 'producto' : 'producto agotado';
        div.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>${p.sub ? 'Sub: ' + p.sub : ''}</p>
            <p>Precio: $${p.precio}</p>
            ${p.stock > 0 ? `<button onclick="agregarCarrito('${p.id}')">Agregar al Carrito</button>` : '<p>AGOTADO</p><button onclick="interesado()">Estoy Interesado</button>'}
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
        alert('Producto agotado.');
    }
}

// Actualizar carrito
function actualizarCarrito() {
    document.getElementById('carrito-count').textContent = carrito.length;
}
function abrirModal() {
    document.getElementById('carrito-modal').style.display = 'block';
    mostrarCarrito();
}
function cerrarModal() {
    document.getElementById('carrito-modal').style.display = 'none';
}
function mostrarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    itemsDiv.innerHTML = '';
    let total = 0;
    carrito.forEach(id => {
        const prod = Object.values(productosData).flat().find(p => p.id === id);
        if (prod) {
            itemsDiv.innerHTML += `<p>${prod.nombre} - $${prod.precio}</p>`;
            total += prod.precio;
        }
    });
    document.getElementById('total').textContent = total;
}
function checkout() {
    alert('Redirigiendo a pagos... (Integra MercadoPago aquí)');
    // Aquí integra MercadoPago o WhatsApp para envío
}

// Inicializar
actualizarCarrito();
mostrarSub('nuevo');  // Muestra "Nuevo" por defecto
