# TagAlong

**TagAlong**, an NFC system for Android, helps neurodivergent individuals and anyone prone to forgetfulness track essentials. Scan items or use future doorframe scanners for stress-free organization.

---

## Table of Contents

1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [Installation](#installation)  
4. [Usage](#usage)   
5. [Firebase Integration](#firebase-integration)   
6. [Contact](#contact)

---

## Overview

TagAlong is built with **Vue.js** and **Firebase**  designed to assist neurodivergent individuals, such as those with ADHD and autism, in keeping track of essential items like keys and wallets. By using an Android phone to scan tagged items before leaving, users receive alerts if any item is missing, reducing stress and enhancing daily routines.
**Live Site:** [https://tag-along.web.app/](https://tag-along.co/)

---

## Key Features

1. **RFID Tag Management** 🏷️  
   - Add, rename, delete, and reset tags with minimal effort.  
   - Get notified when you leave a tag behind.

2. **User Authentication** 🔐  
   - Secure login and signup with **Email/Password** login.  
   - Managed with **Firebase Authentication** for reliability and security.

3. **Dark Mode** 🌑  
   - Toggle dark mode sitewide for accessible viewing in low-light environments.  
   - Automatically persists user preference across sessions.  
   - Dynamic logo switching between light (blue) and dark (yellow) modes.

4. **Comprehensive Dashboard** 🖥️  
   - Displays a table of all tags and their status.  
   - Edit, delete, or reset the status of all tags directly from the dashboard.  
   - Responsive design ensures seamless interaction on mobile devices with horizontal scrolling for tables.

5. **Guide Page** 📖  
   - A dedicated page providing step-by-step user instructions, enhanced with emojis for better visual engagement.  
   - Ensures a smooth onboarding experience.

6. **Responsive Design** 📱💻  
   - Built with **Bootstrap** for improved aesthetics via CSS.  
   - Adapts seamlessly to different screen sizes.  

7. **Smooth Animations** ✨  
   - Hover effects and transitions enhance user experience.  
   - Modern card interactions across the site.

8. **Firebase Hosting Deployment** 🚀  
   - Easily deploy to Firebase Hosting via the provided configuration.

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)  
- [Vue CLI](https://cli.vuejs.org/)  
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)

### Steps

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/vivaanjhaveri/tag-along.git
   cd tag-along
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Configure Firebase**  
   - Create a new project in [Firebase Console](https://console.firebase.google.com/).  
   - Enable **Email/Password** and **Email Link** sign-in methods under **Authentication**.  
   - Update the `src/services/firebase.js` file with your Firebase credentials.

4. **Build the App**  
   ```bash
   npm run build
   ```

5. **Serve Locally (Optional)**  
   ```bash
   npm run serve
   ```
   Navigate to [http://localhost:8080](http://localhost:8080) to see the app.

6. **Deploy to Firebase**  
   ```bash
   firebase init
   firebase deploy
   ```
   Replace `public` with your build folder (e.g., `dist`) in `firebase.json` if prompted.
---

## Firebase Integration

- **Authentication**  
  Handled by **Firebase Authentication API** for secure user sign-ups and logins.

- **Database**  
  Uses **Firestore Database** to store tags and user data, enabling create/read/update/delete operations via the dashboard.

- **Hosting**  
  Deploy easily with `firebase deploy`. The `firebase.json` file rewrites unknown routes to `index.html` for smooth SPA navigation.

---

## Devpost

Check out our [Devpost](https://devpost.com/software/tagalong-t2lx75).

Thank you for using **TagAlong** – happy tagging!