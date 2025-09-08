// js/productos.js

const formProducto = document.getElementById('formProducto');
const tablaProductos = document.querySelector('table tbody');
const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));

let idContador = 3; // empieza en 3 porque ya hay 2 productos
let filaEditando = null;

function crearActualizarFilaProducto(id, nombre, categoria, precio, stock) {
  let tr;
  if (filaEditando) {
    tr = filaEditando;
    tr.cells[1].textContent = nombre;
    tr.cells[2].textContent = categoria;
    tr.cells[3].textContent = `$${precio}`;
    tr.cells[4].textContent = stock;
    filaEditando = null;
  } else {
    tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${categoria}</td>
      <td>$${precio}</td>
      <td>${stock}</td>
      <td>
        <button class="btn btn-sm btn-warning editar">Editar</button>
        <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
      </td>
    `;

    tr.querySelector('.eliminar').addEventListener('click', () => {
      if (confirm(`¿Eliminar producto ${nombre}?`)) tr.remove();
    });

    tr.querySelector('.editar').addEventListener('click', () => {
      document.getElementById('nombreProducto').value = tr.cells[1].textContent;
      document.getElementById('categoriaProducto').value = tr.cells[2].textContent;
      document.getElementById('precioProducto').value = parseFloat(tr.cells[3].textContent.replace('$',''));
      document.getElementById('stockProducto').value = tr.cells[4].textContent;
      filaEditando = tr;
      productoModal.show();
    });

    tablaProductos.appendChild(tr);
  }
}

formProducto.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreProducto').value.trim();
  const categoria = document.getElementById('categoriaProducto').value.trim();
  const precio = document.getElementById('precioProducto').value;
  const stock = document.getElementById('stockProducto').value;

  if(nombre && categoria && precio && stock) {
    crearActualizarFilaProducto(idContador++, nombre, categoria, precio, stock);
    formProducto.reset();
    productoModal.hide();
  } else {
    alert('Por favor completa todos los campos.');
  }
});
