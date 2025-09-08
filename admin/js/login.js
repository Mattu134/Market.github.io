const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'admin' && password === '1234') {
    window.location.href = 'dashboard.html';
  } else {
    errorMsg.style.display = 'block';
  }
});
