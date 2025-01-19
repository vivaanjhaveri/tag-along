# TagAlong

**TagAlong** is a powerful RFID tag management system that simplifies the process of tracking and organizing your RFID-tagged items. Designed with a user-friendly interface, dark mode support, and straightforward navigation, TagAlong ensures a seamless experience from setup to daily usage.

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

TagAlong is built with **Vue.js** and **Firebase** to deliver a responsive, secure, and easily deployable web application. Whether you're scanning items in a warehouse or organizing personal belongings, TagAlong provides quick tag calibration, object description, and status management at your fingertips.

**Live Site:** [https://tag-along.web.app/](https://tag-along.web.app/)

---

## Key Features

1. **RFID Tag Management** 🏷️  
   - Add, rename, and delete tags with minimal effort.  
   - Quickly generate unique RFID tokens and calibrate tags.

2. **User Authentication** 🔐  
   - Secure login and signup with **Email/Password** login.  
   - Managed with **Firebase Authentication** for reliability and security.

3. **Dark Mode** 🌑  
   - Toggle dark mode sitewide for comfortable reading in low-light environments.  
   - Automatically persists user preference across sessions.

4. **Comprehensive Dashboard** 🖥️  
   - Displays a table of all tags, including status and timestamps.  
   - Edit or remove tags directly from the dashboard.

5. **Guide Page** 📖  
   - A dedicated page providing step-by-step usage instructions.  
   - Ensures a smooth onboarding experience.

6. **Responsive Design** 📱💻  
   - Built with **Bootstrap** for mobile-friendly layouts.  
   - Adapts seamlessly to different screen sizes.

7. **Firebase Hosting Deployment** 🚀  
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

## Usage

1. **Sign Up or Log In**  
   - Create an account using Email/Password or **Passwordless** login.  
   - Access your RFID tags on the dashboard upon successful authentication.

2. **Add Tags**  
   - Click **Add New Tag** on the dashboard.  
   - Calibrate tags (generate an RFID token) before finalizing.

3. **Manage Tags**  
   - **Rename**: Update an existing tag’s object name.  
   - **Delete**: Remove tags no longer in use.  
   - **Status Updates**: Each new tag defaults to `Not Scanned`; scanning changes it to `Scanned`.

4. **Dark Mode**  
   - Toggle the dark mode switch in the navbar for improved visibility in low-light conditions.  
   - Preferences are automatically saved and restored.

5. **Guide Page**  
   - Read the **Guide** for detailed step-by-step instructions.  
   - Perfect for first-time users.

---

## Firebase Integration

- **Authentication**  
  Handled by **Firebase Authentication** for secure user sign-ups and logins.

- **Database**  
  Uses **Firestore** to store tags and user data, enabling create/read/update/delete operations.

- **Hosting**  
  Deploy easily with `firebase deploy`. The `firebase.json` file rewrites unknown routes to `index.html` for smooth SPA navigation.

---

## Contact

For questions, feedback, or suggestions, feel free to reach out via:

- **Gmail**: vivaan.jhaveri@gmail.com

Thank you for using **TagAlong** – happy tagging!
