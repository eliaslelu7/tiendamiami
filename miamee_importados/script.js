// Inicializar carrito vacío
const carrito = [];
const carritoBarra = document.getElementById('carritoBarra');
const carritoIcono = document.getElementById('carritoIcono');
const carritoLista = document.getElementById('carritoLista');
const carritoTotal = document.getElementById('carritoTotal');
const cerrarCarrito = document.getElementById('cerrarCarrito');

// Mostrar/Ocultar carrito
carritoIcono.addEventListener('click', () => {
    carritoBarra.style.display = carritoBarra.style.display === 'block' ? 'none' : 'block';
});

cerrarCarrito.addEventListener('click', () => {
    carritoBarra.style.display = 'none';
});

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualizar carrito visualmente
function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span>${producto.nombre} (x${producto.cantidad})</span>
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            <button onclick="eliminarProducto(${index})">X</button>
        `;
        carritoLista.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
    carritoIcono.textContent = `🛒 Carrito (${carrito.length})`;
}

// Eliminar producto del carrito
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Prueba: agregando productos a los botones de cada producto en la tienda
document.querySelectorAll('.producto').forEach((producto, index) => {
    const nombre = producto.querySelector('h3').innerText;
    const precio = parseFloat(producto.querySelector('p').innerText.replace('Precio: $', ''));
    
    producto.querySelector('button').addEventListener('click', () => {
        agregarAlCarrito(nombre, precio);
    });
});
