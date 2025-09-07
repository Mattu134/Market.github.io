const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validación básica de prototipo
  if (username === 'admin' && password === '1234') {
    // Redirigir al dashboard o página principal del backoffice
    window.location.href = 'usuarios.html';
  } else {
    errorMsg.style.display = 'block';
  }
});
