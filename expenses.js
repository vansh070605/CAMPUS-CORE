if (document.getElementById('addExpenseBtn')) {
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
}

function loadExpenses() {
  const user = firebase.auth().currentUser;
  const expenseList = document.getElementById('expenseList');
  if (!expenseList) return;
  expenseList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('expenses').orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const d = doc.data();
        const li = document.createElement('li');
        let dateStr = d.date && d.date.seconds
          ? new Date(d.date.seconds * 1000).toLocaleDateString()
          : '';
        li.textContent = `${d.category}: ₹${d.amount} (${dateStr})${d.note ? ' - ' + d.note : ''}`;
        expenseList.appendChild(li);
      });
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  const expenseList = document.getElementById('expenseList');
  if (!expenseList) return;
  if (user) {
    loadExpenses();
  } else {
    expenseList.innerHTML = "";
  }
});
