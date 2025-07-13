// Redirect if already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "to-do.html";
  }
});

// Signup Form Handling
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "to-do.html";
    })
    .catch(error => {
      document.getElementById('signup-error').textContent = error.message;
    });
});
