# 📌 User Authentication & Post Management API

## 🚀 Overview
This API provides user authentication, post management, and KYC verification functionalities. Users can register, log in, create posts, and submit KYC details. The API uses **JWT authentication** for secure access to protected routes.

---

## ⚙️ Features
- **User Management:** Register, log in, update profile, and delete account.
- **Post Management:** Create, update, delete, and fetch posts.
- **KYC Verification:** Users can submit KYC details for identity verification.
- **JWT Authentication:** Secure access to protected endpoints.
- **MongoDB Database:** Data persistence using Mongoose.

---

## 🏗️ Technologies Used
- **Node.js** (Express.js)
- **MongoDB** (Mongoose)
- **JWT** (JSON Web Tokens for authentication)
- **Bcrypt.js** (Password hashing)

---

## 📌 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Server**
```sh
npm start
```

---

## 🛠 API Endpoints

### **🔹 User Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login and get JWT token |
| `GET` | `/api/users/me` | Get user details (protected) |
| `PUT` | `/api/users/update` | Update user details (protected) |
| `DELETE` | `/api/users/delete` | Delete user & related data (protected) |

### **🔹 Post Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/posts` | Create a new post (protected) |
| `GET` | `/api/posts` | Get all posts |
| `GET` | `/api/posts/:id` | Get a single post |
| `PUT` | `/api/posts/:id` | Update a post (protected) |
| `DELETE` | `/api/posts/:id` | Delete a post (protected) |

### **🔹 KYC Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/kyc` | Submit KYC details (protected) |
| `GET` | `/api/kyc/:id` | Get KYC details |

---

## 🛡 Authentication & Authorization
- **JWT-based Authentication** is used for protecting routes.
- Include the JWT **token** in the request headers:
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```

---

## 📝 Contribution Guide
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b new-feature`
3. **Commit changes**: `git commit -m "Added a new feature"`
4. **Push to GitHub**: `git push origin new-feature`
5. **Submit a pull request** 🎉

---

## 📄 License
This project is licensed under the **ISC License**.

---

## 📧 Contact
For any issues, reach out via email: `igwed93@gmail.com`
