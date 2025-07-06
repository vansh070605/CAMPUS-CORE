// app.js

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7GnzJiXy5GdbNV90bE6XMaW2Ao_-9mRQ",
  authDomain: "campuscore-f5315.firebaseapp.com",
  projectId: "campuscore-f5315",
  storageBucket: "campuscore-f5315.appspot.com", // FIXED
  messagingSenderId: "286570062416",
  appId: "1:286570062416:web:8aa8a639c4093e29c12755",
  measurementId: "G-WGVN6PJWVH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

// Test Firestore write on button click
document.getElementById('testWrite').addEventListener('click', function() {
  db.collection("test").add({
    message: "Hello from CampusCore!",
    timestamp: new Date()
  })
  .then(() => {
    document.getElementById('result').textContent = "Test document written to Firestore!";
  })
  .catch((error) => {
    document.getElementById('result').textContent = "Error: " + error.message;
  });
});

// Login
document.getElementById('loginBtn').onclick = function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      document.getElementById('authStatus').textContent = error.message;
    });
};

// Signup
document.getElementById('signupBtn').onclick = function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      document.getElementById('authStatus').textContent = error.message;
    });
};

// Create user document if not exists
function createUserDocIfNotExists(user) {
  const userRef = db.collection('users').doc(user.uid);
  userRef.get().then((doc) => {
    if (!doc.exists) {
      userRef.set({
        email: user.email,
        createdAt: new Date()
      });
      console.log("User document created!");
    } else {
      console.log("User document already exists.");
    }
  });
}

// Auth state change handler
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('authStatus').textContent = "Logged in as " + user.email;
    createUserDocIfNotExists(user);
    // You can now show the main app UI here
  } else {
    document.getElementById('authStatus').textContent = "Not logged in";
    // Optionally hide main app UI here
  }
});


// Add a new task for the current user
document.getElementById('addTaskBtn').onclick = function() {
  const user = firebase.auth().currentUser;
  const task = document.getElementById('taskInput').value.trim();
  if (user && task) {
    db.collection('users').doc(user.uid).collection('tasks').add({
      task: task,
      createdAt: new Date()
    })
    .then(() => {
      document.getElementById('taskStatus').textContent = "Task added!";
      document.getElementById('taskInput').value = "";
      loadTasks(); // Refresh the list
    })
    .catch(error => {
      document.getElementById('taskStatus').textContent = error.message;
    });
  } else {
    document.getElementById('taskStatus').textContent = "You must be logged in and enter a task.";
  }
};

// Load and display all tasks for the current user
function loadTasks() {
  const user = firebase.auth().currentUser;
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('tasks').orderBy('createdAt')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.data().task;
        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.onclick = function() {
          db.collection('users').doc(user.uid).collection('tasks').doc(doc.id).delete()
            .then(loadTasks);
        };
        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    });
}

// Reload tasks when user logs in/out
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loadTasks();
  } else {
    document.getElementById('taskList').innerHTML = "";
  }
});


// Add mood entry for the current user
document.getElementById('addMoodBtn').onclick = function() {
  const user = firebase.auth().currentUser;
  const mood = document.getElementById('moodInput').value;
  if (user && mood) {
    db.collection('users').doc(user.uid).collection('moodEntries').add({
      mood: mood,
      date: new Date()
    })
    .then(() => {
      document.getElementById('moodStatus').textContent = "Mood saved!";
      loadMoods();
    })
    .catch(error => {
      document.getElementById('moodStatus').textContent = error.message;
    });
  } else {
    document.getElementById('moodStatus').textContent = "You must be logged in and select a mood.";
  }
};

// Load and display all mood entries for the current user
function loadMoods() {
  const user = firebase.auth().currentUser;
  const moodList = document.getElementById('moodList');
  moodList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('moodEntries').orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const li = document.createElement('li');
        const d = doc.data();
        li.textContent = `${d.mood} – ${new Date(d.date.seconds * 1000).toLocaleDateString()}`;
        moodList.appendChild(li);
      });
    });
}

// Reload moods when user logs in/out
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loadMoods();
  } else {
    document.getElementById('moodList').innerHTML = "";
  }
});


// Add an expense for the current user
document.getElementById('addExpenseBtn').onclick = function() {
  const user = firebase.auth().currentUser;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;
  const note = document.getElementById('expenseNote').value.trim();
  if (user && amount && category) {
    db.collection('users').doc(user.uid).collection('expenses').add({
      amount: amount,
      category: category,
      note: note,
      date: new Date()
    })
    .then(() => {
      document.getElementById('expenseStatus').textContent = "Expense added!";
      document.getElementById('expenseAmount').value = "";
      document.getElementById('expenseNote').value = "";
      loadExpenses();
    })
    .catch(error => {
      document.getElementById('expenseStatus').textContent = error.message;
    });
  } else {
    document.getElementById('expenseStatus').textContent = "You must be logged in and enter a valid amount.";
  }
};

// Load and display all expenses for the current user
function loadExpenses() {
  const user = firebase.auth().currentUser;
  const expenseList = document.getElementById('expenseList');
  expenseList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('expenses').orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const d = doc.data();
        const li = document.createElement('li');
        li.textContent = `${d.category}: ₹${d.amount} (${new Date(d.date.seconds * 1000).toLocaleDateString()})${d.note ? ' - ' + d.note : ''}`;
        expenseList.appendChild(li);
      });
    });
}

// Reload expenses when user logs in/out
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    loadExpenses();
  } else {
    document.getElementById('expenseList').innerHTML = "";
  }
});
