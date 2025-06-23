# 📚 Library Management API

A RESTfull API to manage a library management system built using **Express**, **Typescript**, **Mongodb** ,**Mongoose** this project coverd all assignment requiredments.

---

## 🚀 Features

✅ Create, update, delete and fetch books

✅ Borrow books with business rules

✅ Filter & sort books by genre, date, etc

✅ Aggregated summary of borrowed books  
✅ Error handling with structured response  
✅ Mongoose static methods & middleware used  
✅ Clean and scalable project structure  

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Postman** for testing

## 🔗 API Endpoints

### 📚 Book APIs

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/books`          | Create a new book       |
| GET    | `/api/books`          | Get all books (with filter, sort, limit) |
| GET    | `/api/books/:bookId`  | Get a book by ID        |
| PUT    | `/api/books/:bookId`  | Update book info        |
| DELETE | `/api/books/:bookId`  | Delete a book           |

### 📖 Borrow APIs

| Method | Endpoint     | Description                        |
|--------|--------------|------------------------------------|
| POST   | `/api/borrow`| Borrow a book                      |
| GET    | `/api/borrow`| Get summary of borrowed books      |


## 🔗 Importants Links

Github Link : https://github.com/sujoncoder/Library-Management-API

Live Link : https://github.com/sujoncoder/Library-Management-API

Video Link : https://github.com/sujoncoder/Library-Management-API

---


## ⚙️ How to Run Locally


1. **Clone the repository**
   ```bash
   git clone https://github.com/sujoncoder/library-management-api.git

2. **Install dependensis**
   ```bash
   npm install

3. **Create .env file**
   ```bash
   MONGODB_URI = YOUR_MONGODB_URI_STRING

4. **Run the project**
   ```bash
   npm run dev

---

## Happy codding...😎🧑‍💻


![alt text](image.png)
