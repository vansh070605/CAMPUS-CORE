// Redirect if already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "to-do.html";
  }
});

// Login Form Handling
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "to-do.html";
    })
    .catch(error => {
      document.getElementById('login-error').textContent = error.message;
    });
});
