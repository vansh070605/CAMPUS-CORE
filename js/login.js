// =====================
// Firebase Initialization (if not already present in HTML)
// =====================
// Only include this block if you haven't already initialized Firebase in your HTML
const firebaseConfig = {
  apiKey: "AIzaSyDqpT2QDgI3HH7cC1su3OM02qvPapprM1E",
  authDomain: "campus-core.firebaseapp.com",
  projectId: "campus-core",
  storageBucket: "campus-core.firebasestorage.app",
  messagingSenderId: "173053955985",
  appId: "1:173053955985:web:ba34f5f9004ccf2dc7d430",
  measurementId: "G-2JGX1VJELL"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// =====================
// Redirect if already logged in
// =====================
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "to-do.html";
  }
});

// =====================
// Login Form Handling
// =====================
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
