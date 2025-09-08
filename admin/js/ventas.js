// js/ventas.js

const formVenta = document.getElementById('formVenta');
const tablaVentas = document.querySelector('table tbody');
const ventaModal = new bootstrap.Modal(document.getElementById('ventaModal'));

let idContador = 3; // empieza en 3 porque ya hay 2 ventas
let filaEditando = null;

function crearActualizarFilaVenta(id, cliente, producto, cantidad, precio, fecha) {
  let tr;
  if (filaEditando) {
    tr = filaEditando;
    tr.cells[1].textContent = cliente;
    tr.cells[2].textContent = producto;
    tr.cells[3].textContent = cantidad;
    tr.cells[4].textContent = `$${precio}`;
    tr.cells[5].textContent = fecha;
    filaEditando = null;
  } else {
    tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${cliente}</td>
      <td>${producto}</td>
      <td>${cantidad}</td>
      <td>$${precio}</td>
      <td>${fecha}</td>
      <td>
        <button class="btn btn-sm btn-warning editar">Editar</button>
        <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
      </td>
    `;

    tr.querySelector('.eliminar').addEventListener('click', () => {
      if (confirm(`¿Eliminar venta de ${producto} a ${cliente}?`)) tr.remove();
    });

    tr.querySelector('.editar').addEventListener('click', () => {
      document.getElementById('clienteVenta').value = tr.cells[1].textContent;
      document.getElementById('productoVenta').value = tr.cells[2].textContent;
      document.getElementById('cantidadVenta').value = tr.cells[3].textContent;
      document.getElementById('precioVenta').value = parseFloat(tr.cells[4].textContent.replace('$',''));
      document.getElementById('fechaVenta').value = tr.cells[5].textContent;
      filaEditando = tr;
      ventaModal.show();
    });

    tablaVentas.appendChild(tr);
  }
}

formVenta.addEventListener('submit', (e) => {
  e.preventDefault();
  const cliente = document.getElementById('clienteVenta').value.trim();
  const producto = document.getElementById('productoVenta').value.trim();
  const cantidad = document.getElementById('cantidadVenta').value;
  const precio = document.getElementById('precioVenta').value;
  const fecha = document.getElementById('fechaVenta').value;

  if(cliente && producto && cantidad && precio && fecha) {
    crearActualizarFilaVenta(idContador++, cliente, producto, cantidad, precio, fecha);
    formVenta.reset();
    ventaModal.hide();
  } else {
    alert('Por favor completa todos los campos.');
  }
});
