// js/usuarios.js

const formUsuario = document.getElementById('formUsuario');
const tablaUsuarios = document.querySelector('table tbody');
const usuarioModal = new bootstrap.Modal(document.getElementById('usuarioModal'));

// Contador de IDs para nuevos usuarios
let idContador = 3; // empieza en 3 porque ya hay 2 usuarios de ejemplo
let filaEditando = null; // referencia a la fila que estamos editando

// Función para crear o actualizar una fila de usuario
function crearActualizarFilaUsuario(id, nombre, email, rol) {
  let tr;
  if (filaEditando) {
    // Actualizar fila existente
    tr = filaEditando;
    tr.cells[1].textContent = nombre;
    tr.cells[2].textContent = email;
    tr.cells[3].textContent = rol;
    filaEditando = null;
  } else {
    // Crear fila nueva
    tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${email}</td>
      <td>${rol}</td>
      <td>
        <button class="btn btn-sm btn-warning editar">Editar</button>
        <button class="btn btn-sm btn-danger eliminar">Eliminar</button>
      </td>
    `;

    // Botón eliminar
    tr.querySelector('.eliminar').addEventListener('click', () => {
      if (confirm(`¿Eliminar usuario ${nombre}?`)) {
        tr.remove();
      }
    });

    // Botón editar
    tr.querySelector('.editar').addEventListener('click', () => {
      document.getElementById('nombre').value = tr.cells[1].textContent;
      document.getElementById('email').value = tr.cells[2].textContent;
      document.getElementById('rol').value = tr.cells[3].textContent;
      filaEditando = tr; // guardamos referencia para actualizar
      usuarioModal.show();
    });

    tablaUsuarios.appendChild(tr);
  }
}

// Evento submit del formulario
formUsuario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const rol = document.getElementById('rol').value;

  if (nombre && email) {
    crearActualizarFilaUsuario(idContador++, nombre, email, rol);
    formUsuario.reset();
    usuarioModal.hide();
  } else {
    alert('Por favor completa todos los campos.');
  }
});
