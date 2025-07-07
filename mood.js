if (document.getElementById('addMoodBtn')) {
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
}

function loadMoods() {
  const user = firebase.auth().currentUser;
  const moodList = document.getElementById('moodList');
  if (!moodList) return;
  moodList.innerHTML = "";
  if (!user) return;
  db.collection('users').doc(user.uid).collection('moodEntries').orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const d = doc.data();
        const li = document.createElement('li');
        let dateStr = d.date && d.date.seconds
          ? new Date(d.date.seconds * 1000).toLocaleDateString()
          : '';
        li.textContent = `${d.mood} – ${dateStr}`;
        moodList.appendChild(li);
      });
    });
}

firebase.auth().onAuthStateChanged(function(user) {
  const moodList = document.getElementById('moodList');
  if (!moodList) return;
  if (user) {
    loadMoods();
  } else {
    moodList.innerHTML = "";
  }
});
