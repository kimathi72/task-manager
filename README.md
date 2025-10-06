# 📌 Task Manager (Spring Boot + Angular)

A **full-stack Task Manager MVP** demonstrating modern web application development using **Spring Boot** for the backend and **Angular** for the frontend.
The app allows users to create, update, and manage tasks efficiently through a clean and responsive interface backed by secure REST APIs.

---

## ✨ Features

* 📝 **Task Management (CRUD)** — Create, read, update, and delete tasks
* 🔐 **User Authentication** — Basic login secured with Spring Security (JWT-ready)
* 🧭 **Responsive Dashboard** — Angular-based UI for seamless task navigation and updates
* ⚙️ **RESTful API Integration** — Backend and frontend communication via REST endpoints
* 💾 **In-Memory Database** — H2 database for easy setup and testing
* 🧱 **Modular Architecture** — Clean separation of backend and frontend for scalability
* 🚀 **Single Deployment** — Angular app bundled and served directly by Spring Boot on port **8080**

---

## 🧩 Tech Stack

* **Backend:** Spring Boot 3 (Java 21, Maven, Spring Security, JPA, H2, JWT)
* **Frontend:** Angular 18 (TypeScript, SCSS, Routing)
* **Database:** H2 (in-memory)
* **Build Tools:** Maven + Node.js/npm

---

## 📂 Project Structure

```
taskmanager/
│
├── taskmanager-backend/     # Spring Boot backend
│   ├── src/                 # Java source code
│   ├── pom.xml              # Maven dependencies
│   └── target/              # Compiled backend (ignored by git)
│
├── client/                  # Angular frontend
│   ├── src/                 # Angular source code
│   ├── angular.json         # Angular config
│   └── dist/                # Build output (ignored by git)
│
├── .gitignore
├── .gitattributes
└── README.md
```

---

## ⚡ Getting Started

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:kimathi72/task-manager.git
cd task-manager
```

### 2️⃣ Prerequisites

Ensure you have the following installed:

* **Java 21+**
* **Maven 3.6+**
* **Node.js 20+**
* **npm 10+**

### 3️⃣ Install Dependencies

Backend dependencies are managed by Maven, and frontend ones by npm.

```bash
cd client
npm install
cd ..
```

You’re now ready to build and run the full-stack application!

---

## ▶️ Running the App

The Angular frontend is bundled and served directly by the Spring Boot backend.
Once built, you only need to run the backend — it will automatically serve the Angular app on **port 8080**.

### Build and Run the Application

From the project root:

```bash
cd taskmanager-backend
mvn clean compile
mvn spring-boot:run
```

The backend will:

* Launch the Spring Boot API at **[http://localhost:8080](http://localhost:8080)**
* Serve the Angular frontend from the same port
* Expose the H2 in-memory database console at **[http://localhost:8080/h2-console](http://localhost:8080/h2-console)**

---

### Access the Application

* Web App: [http://localhost:8080](http://localhost:8080)
* H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

---

### Frontend Development Workflow

If you need to modify the Angular app for development:

```bash
cd client
npm install
ng serve
```

Once satisfied with your changes, rebuild the production bundle and redeploy it with Spring Boot:

```bash
ng build --configuration production
```

This will place the compiled files into the backend’s `resources/static` directory so they’re served automatically when Spring Boot runs.

---

## 🔑 Authentication

Spring Security is enabled by default.
By default, the backend generates credentials on startup:

```
Username: user
Password: (shown in backend logs)
```

JWT authentication and custom user management can be added later for production environments.

---

## 🧰 Useful Commands

**Backend**

```bash
mvn spring-boot:run     # Start app
mvn test                # Run tests
mvn clean package       # Build JAR
```

**Frontend (for dev)**

```bash
ng serve                # Start Angular dev server
ng build                # Build for production
ng test                 # Run Angular tests
```

---

## 👨‍💻 Author

Built with ❤️ by **Roy Kimathi**
For the **Full-Stack Developer Technical Assessment – Veri Group**
