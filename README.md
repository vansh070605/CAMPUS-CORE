# 🚀 CAMPUS CORE

> **Your all-in-one campus productivity suite!**

## ✨ Features

- 📅 **Dashboard** – Personalized campus overview
- 📝 **Notes** – Take and manage your notes
- ✅ **To-Do** – Organize tasks and boost productivity
- ⏰ **Clock & Calculator** – Essential tools included
- 🔒 **Login/Signup** – Secure access to your workspace

## 📂 Project Structure

```
CAMPUS-CORE/
├── pages/
│   ├── cal.html
│   ├── clock.html
│   ├── dashboard.html
│   ├── login.html
│   ├── notes.html
│   ├── signup.html
│   └── to-do.html
├── assets/
│   ├── styles.css
│   └── animations.css
├── vercel.json
└── README.md
```

## 🖥️ Live Demo

Visit:  
**[https://campus-core-one.vercel.app/login](https://campus-core-one.vercel.app/login)**  
Or use other clean URLs (see below).

## 🎬 Preview

Add screenshots or GIFs of your UI here for a visual overview.

## 🚦 Quick Start

1. **Clone this repo**
    ```bash
    git clone https://github.com/vansh070605/CAMPUS-CORE.git
    cd CAMPUS-CORE
    ```

2. **Customize your pages**
    - Edit HTML files in `/pages`
    - Update styles in `/assets/styles.css` and animations in `/assets/animations.css`

3. **Configure Vercel for Clean URLs**
    - Your `vercel.json` should look like:
      ```json
      {
        "rewrites": [
          { "source": "/cal", "destination": "/pages/cal.html" },
          { "source": "/clock", "destination": "/pages/clock.html" },
          { "source": "/dashboard", "destination": "/pages/dashboard.html" },
          { "source": "/login", "destination": "/pages/login.html" },
          { "source": "/notes", "destination": "/pages/notes.html" },
          { "source": "/signup", "destination": "/pages/signup.html" },
          { "source": "/to-do", "destination": "/pages/to-do.html" }
        ]
      }
      ```

4. **Deploy to Vercel**
    - Push your code to GitHub.
    - Connect your repo to [Vercel](https://vercel.com/import/project).
    - Enjoy instant, zero-config deployment!

## 🌈 Animations & UI

- Animated icons and transitions powered by CSS and [LottieFiles](https://lottiefiles.com/).
- Add GIFs or SVGs for a lively campus experience!
- Example (add to your HTML):
    ```html
    
    ```
- For custom CSS animations, use `assets/animations.css`:
    ```css
    .fade-in {
      animation: fadeIn 1s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    ```

## 📚 Pages Overview

| Route         | File Path                | Description          |
| ------------- | ----------------------- | -------------------- |
| `/cal`        | `pages/cal.html`        | Calculator           |
| `/clock`      | `pages/clock.html`      | Clock                |
| `/dashboard`  | `pages/dashboard.html`  | Dashboard            |
| `/login`      | `pages/login.html`      | Login                |
| `/notes`      | `pages/notes.html`      | Notes                |
| `/signup`     | `pages/signup.html`     | Signup               |
| `/to-do`      | `pages/to-do.html`      | To-Do List           |

## 💡 Pro Tips

- Use [Shields.io](https://shields.io/) for custom badges.
- Use [LottieFiles](https://lottiefiles.com/) for animated SVGs.
- Add [AOS](https://michalsnik.github.io/aos/) for scroll animations.
- Add screenshots or GIFs to showcase your UI and features.

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

## 📬 Contact

**Vansh**  
[GitHub](https://github.com/vansh070605)

_Made with ❤️ for campus productivity!_

**Tip:**  
Personalize this README by adding more GIFs, custom badges, and screenshots of your actual UI!  
Let me know if you want even more enhancements or custom sections.
