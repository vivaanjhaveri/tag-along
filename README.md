# **TagAlong**

TagAlong is a powerful RFID tag management platform that allows users to seamlessly track and manage their RFID-tagged items. With features like dark mode, passwordless login, and a user-friendly guide, TagAlong is built to make item tracking simple and efficient.

---

## **Table of Contents**

1. [Features](#features)
2. [Demo](#demo)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**

- 🔒 **Secure Authentication**: Users can sign up and log in using email and password or a passwordless email link.
- 🌑 **Dark Mode**: Toggle dark mode for a seamless user experience in low-light environments.
- 🏷️ **RFID Tag Management**: Add, edit, and delete RFID tags with detailed descriptions.
- 📚 **Comprehensive Guide**: A step-by-step guide to help users understand and use the platform effectively.
- 🎨 **Responsive Design**: Built with Bootstrap for a clean and responsive interface.

---

## **Demo**

Check out the live demo [here](#) (replace with your live demo link).

---

## **Installation**

To get a local copy of TagAlong up and running, follow these steps:

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Vue CLI](https://cli.vuejs.org/)

### **Setup**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vivaanjhaveri/tag-along.git
   cd tag-along

## **Install Dependencies**

```bash
npm install
```

---

## **Set Up Firebase**

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication and set up Email/Password and Email Link sign-in methods.
3. Replace the Firebase configuration in `src/services/firebase.js` with your project's credentials.

---

## **Run the Application**

```bash
npm run serve
```

---

## **Access the App**

Open your browser and navigate to: [http://localhost:8080](http://localhost:8080)

---

## **Usage**

### **Steps to Use**

1. **Sign Up or Log In**: Create an account or log in using an email and password or a passwordless email link.
2. **Add Tags**: Navigate to the dashboard and click "Add New Tag."
3. **Manage Tags**: View, edit, or delete your tags as needed.
4. **Dark Mode**: Toggle the dark mode switch in the navbar for a better experience in low-light environments.

---

## **Technologies Used**

- **Frontend**: [Vue.js](https://vuejs.org/), [Bootstrap](https://getbootstrap.com/)
- **Backend**: [Firebase Authentication](https://firebase.google.com/products/auth), [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- **State Management**: [Vuex](https://vuex.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)

---

## **Screenshots**

1. **Home Page**
   ![Home Page Screenshot](#) <!-- Replace # with your image link -->

2. **Login Page**
   ![Login Page Screenshot](#)

3. **Dashboard**
   ![Dashboard Screenshot](#)

4. **Dark Mode**
   ![Dark Mode Screenshot](#)

---
## **Acknowledgments**

- Special thanks to my hackathon team!
