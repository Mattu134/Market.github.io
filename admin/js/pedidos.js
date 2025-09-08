// js/pedidos.js

const formPedido = document.getElementById('formPedido');
const tablaPedidos = document.querySelector('table tbody');
const pedidoModal = new bootstrap.Modal(document.getElementById('pedidoModal'));

let idContador = 3; // empieza en 3 porque ya hay 2 pedidos
let filaEditando = null;

function crearActualizarFilaPedido(id, cliente, producto, cantidad, estado, fecha) {
  let tr;
  if (filaEditando) {
    tr = filaEditando;
    tr.cells[1].textContent = cliente;
    tr.cells[2].textContent = producto;
    tr.cells[3].textContent = cantidad;
    tr.cells[4].textContent = estado;
    tr.cells[5].textContent = fecha;
    filaEditando = null;
  } else {
    tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${cliente}</td>
      <td>${producto}</td>
      <td>${cantidad}</td>
      <td>${estado}</td>
      <td>${fecha}</td>
      <td>
        <button class="btn btn-sm btn-warning editar">Editar</button>
        <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
      </td>
    `;

    tr.querySelector('.eliminar').addEventListener('click', () => {
      if (confirm(`¿Eliminar pedido de ${producto} a ${cliente}?`)) tr.remove();
    });

    tr.querySelector('.editar').addEventListener('click', () => {
      document.getElementById('clientePedido').value = tr.cells[1].textContent;
      document.getElementById('productoPedido').value = tr.cells[2].textContent;
      document.getElementById('cantidadPedido').value = tr.cells[3].textContent;
      document.getElementById('estadoPedido').value = tr.cells[4].textContent;
      document.getElementById('fechaPedido').value = tr.cells[5].textContent;
      filaEditando = tr;
      pedidoModal.show();
    });

    tablaPedidos.appendChild(tr);
  }
}

formPedido.addEventListener('submit', (e) => {
  e.preventDefault();
  const cliente = document.getElementById('clientePedido').value.trim();
  const producto = document.getElementById('productoPedido').value.trim();
  const cantidad = document.getElementById('cantidadPedido').value;
  const estado = document.getElementById('estadoPedido').value;
  const fecha = document.getElementById('fechaPedido').value;

  if(cliente && producto && cantidad && estado && fecha) {
    crearActualizarFilaPedido(idContador++, cliente, producto, cantidad, estado, fecha);
    formPedido.reset();
    pedidoModal.hide();
  } else {
    alert('Por favor completa todos los campos.');
  }
});
