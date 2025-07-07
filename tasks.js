if (document.getElementById('addTaskBtn')) {
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
        loadTasks();
      })
      .catch(error => {
        document.getElementById('taskStatus').textContent = error.message;
      });
    } else {
      document.getElementById('taskStatus').textContent = "You must be logged in and enter a task.";
    }
  };
}

function loadTasks() {
  const user = firebase.auth().currentUser;
  const taskList = document.getElementById('taskList');
  if (!taskList) return;
  taskList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('tasks').orderBy('createdAt')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const li = document.createElement('li');
        li.textContent = doc.data().task;
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

firebase.auth().onAuthStateChanged(function(user) {
  const taskList = document.getElementById('taskList');
  if (!taskList) return;
  if (user) {
    loadTasks();
  } else {
    taskList.innerHTML = "";
  }
});
