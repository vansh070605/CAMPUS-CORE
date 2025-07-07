# 🚀 CampusCore

**CampusCore** is a student productivity web app built with **HTML**, **CSS**, **JavaScript**, and **Firebase**.  
It helps students manage tasks, track moods, and monitor expenses—all with secure authentication and cloud storage.  
Stay organized, motivated, and in control of your student life! 🎓✨

## 🌟 Features

- 🔐 **User Authentication**  
  Email/password signup and login using Firebase Auth

- 🗓️ **Task Planner**  
  Add, view, and delete personal tasks

- 📈 **Mood & Motivation Tracker**  
  Log daily mood entries and view mood history

- 💸 **Expense Tracker**  
  Record expenses by category, add notes, and view expense history

- ☁️ **Data Storage**  
  All user data is securely stored in Firestore under each user's unique account

- 📱 **Responsive Design**  
  Works on both desktop and mobile browsers

## 📁 Project Structure

```
CampusCore/
│
├── index.html
├── style.css
├── app.js
├── README.md
```

## 🛠️ Getting Started

### 1️⃣ Prerequisites

- [Node.js & npm](https://nodejs.org/) (for Firebase CLI and deployment)
- [VS Code](https://code.visualstudio.com/) or any code editor
- A Firebase project (already set up)

### 2️⃣ Clone or Download the Project

```bash
git clone https://github.com/vansh070605/CAMPUS-CORE.git
```

### 3️⃣ Set Up Firebase

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Register your web app and copy the Firebase config object.
- Replace the config in `app.js` with your own.

### 4️⃣ Enable Firebase Services

- **Authentication:** Enable Email/Password in the Firebase Console.
- **Firestore:** Create a Firestore database (start in test mode for development).

### 5️⃣ Run Locally

- Open `index.html` in your browser.
- For best results, use a local server (e.g., Live Server extension in VS Code).

## 🎯 Usage

1. ✉️ **Sign up or log in** with your email and password.
2. 📝 **Add tasks** to your personal planner.
3. 😀 **Log your mood** daily and view your mood history.
4. 💰 **Record expenses** with categories and notes.
5. 🔒 **All your data** is private and stored securely in Firestore.

## 🗄️ Firestore Data Structure

```
users (collection)
  └── {userId} (document)
        ├── tasks (subcollection)
        │     └── {taskId} (document)
        ├── moodEntries (subcollection)
        │     └── {entryId} (document)
        ├── expenses (subcollection)
        │     └── {expenseId} (document)
```

## 🚢 Deployment

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```
2. **Login to Firebase:**
   ```bash
   firebase login
   ```
3. **Initialize Hosting:**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set `public` as the directory
   - Configure as a single-page app: Yes
4. **Deploy:**
   ```bash
   firebase deploy
   ```
5. 🌍 **Share your public URL!**

## 🛡️ Security Notes

- For development, Firestore rules may allow open access.  
  **Before launching, update your rules to:**
  ```plaintext
  match /users/{userId}/{subcollection}/{docId} {
    allow read, write: if request.auth != null && request.auth.uid == userId;
  }
  ```
- 🚨 **Never leave your database open in production!**

## 🎨 Customization & Extending

- 📊 Add charts using [Chart.js](https://www.chartjs.org/) for mood and expense visualization.
- 💡 Add monthly budget and warnings.
- 🎨 Polish the UI with custom CSS.
- 🚀 Add more features as needed.

## 🙌 Credits

- Built with [Firebase](https://firebase.google.com/) and [Chart.js](https://www.chartjs.org/).
- Inspired by student productivity needs.

## 📄 License

MIT License

✨ **Happy building! If you have questions or want to add new features, feel free to ask.** 😊
