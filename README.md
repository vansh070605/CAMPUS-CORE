# 🚀 CAMPUS CORE

> **Your all-in-one campus productivity suite!**
> <img width="1920" height="958" alt="Screenshot (193)" src="https://github.com/user-attachments/assets/4cdf76eb-bffd-4add-bf7f-73c581108486" />


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

---

## 🖥️ Live Demo

Visit:  
**[https://campus-core-one.vercel.app/login](https://campus-core-one.vercel.app/login)**  
Or use other clean URLs (see below).

---

## 🎬 Preview

Below are screenshots showcasing the core features of CAMPUS CORE, each labeled for clarity:

**1. To-Do List**  
<img width="1920" height="957" alt="Screenshot (194)" src="https://github.com/user-attachments/assets/5a0ed5a8-e72e-4d83-a749-69a36c300fe9" />  
*This screenshot displays the To-Do List interface, where users can organize and manage their tasks efficiently.*

---

**2. Calendar**  
<img width="1920" height="956" alt="Screenshot (195)" src="https://github.com/user-attachments/assets/ce499158-72f8-4581-a8f6-5063f6ab30e7" />  
*This screenshot highlights the Calendar feature, helping users keep track of important dates and events.*

---

**3. Notes**  
<img width="1920" height="956" alt="Screenshot (196)" src="https://github.com/user-attachments/assets/b4bb0a59-b88a-4982-908c-afcc2c6491b1" />  
*This screenshot showcases the Notes section, designed for easy note-taking and organization.*

---

**4. Dashboard**  
<img width="1920" height="951" alt="Screenshot (197)" src="https://github.com/user-attachments/assets/ebef661a-75a5-48da-9050-2dbaaf21d4b9" />  
*This screenshot presents the main Dashboard, providing a comprehensive overview of your campus productivity suite.*

---

**5. Clock Suite**  
<img width="1920" height="961" alt="Screenshot (198)" src="https://github.com/user-attachments/assets/c16baf39-c406-4e87-8231-ad545e841994" />  
*This screenshot features the Clock Suite, offering time management tools such as clocks and timers.*

---

## 🚦 Quick Start

1. **Clone this repo**
    ```
    git clone https://github.com/vansh070605/CAMPUS-CORE.git
    cd CAMPUS-CORE
    ```

2. **Customize your pages**
    - Edit HTML files in `/pages`
    - Update styles in `/assets/styles.css` and animations in `/assets/animations.css`

3. **Configure Vercel for Clean URLs**
    - Your `vercel.json` should look like:
      ```
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

---

## 🌈 Animations & UI

- Animated icons and transitions powered by CSS and [LottieFiles](https://lottiefiles.com/).
- Add GIFs or SVGs for a lively campus experience!
- Example (add to your HTML):
    ```
    <img src="https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif" alt="Animated Banner" />
    ```
- For custom CSS animations, use `assets/animations.css`:
    ```
    .fade-in {
      animation: fadeIn 1s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    ```

---

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

---

## 💡 Pro Tips

- Use [Shields.io](https://shields.io/) for custom badges.
- Use [LottieFiles](https://lottiefiles.com/) for animated SVGs.
- Add [AOS](https://michalsnik.github.io/aos/) for scroll animations.
- Add screenshots or GIFs to showcase your UI and features.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📬 Contact

**Vansh**  
[GitHub](https://github.com/vansh070605)

_Made with ❤️ for campus productivity!_
