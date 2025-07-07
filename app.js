// Replace with your own Firebase config!
const firebaseConfig = {
  apiKey: "AIzaSyA7GnzJiXy5GdbNV90bE6XMaW2Ao_-9mRQ",
  authDomain: "campuscore-f5315.firebaseapp.com",
  projectId: "campuscore-f5315",
  storageBucket: "campuscore-f5315.appspot.com",
  messagingSenderId: "286570062416",
  appId: "1:286570062416:web:8aa8a639c4093e29c12755",
  measurementId: "G-WGVN6PJWVH"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

// --- Login/Signup (only runs on index.html) ---
if (document.getElementById('loginBtn')) {
  document.getElementById('loginBtn').onclick = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        document.getElementById('authStatus').textContent = error.message;
      });
  };

  document.getElementById('signupBtn').onclick = function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        document.getElementById('authStatus').textContent = error.message;
      });
  };
}

// --- Create user doc if not exists (for all pages) ---
function createUserDocIfNotExists(user) {
  const userRef = db.collection('users').doc(user.uid);
  userRef.get().then((doc) => {
    if (!doc.exists) {
      userRef.set({
        email: user.email,
        createdAt: new Date()
      });
    }
  });
}

// --- Auth state change (for all pages) ---
firebase.auth().onAuthStateChanged(function(user) {
  const isLoginPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "";
  if (document.getElementById('authStatus')) {
    if (user) {
      document.getElementById('authStatus').textContent = "Logged in as " + user.email;
      createUserDocIfNotExists(user);
    } else {
      document.getElementById('authStatus').textContent = "Not logged in";
    }
  }
  // On feature pages, redirect to login if not logged in
  if (!user && !isLoginPage) {
    window.location.href = "index.html";
  }
  // On feature pages, create user doc if needed
  if (user && !isLoginPage) {
    createUserDocIfNotExists(user);
  }
});

// --- Logout (for feature pages) ---
if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').onclick = function(e) {
    e.preventDefault();
    firebase.auth().signOut().then(() => {
      if (!window.location.pathname.endsWith("index.html")) {
        window.location.href = "index.html";
      }
    });
  };
}
