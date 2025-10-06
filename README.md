# 📌 Task Manager (Spring Boot + Angular)

A **full-stack Task Manager MVP** that demonstrates modern web application development using **Spring Boot** for the backend and **Angular** for the frontend.
The app allows users to manage tasks efficiently through a clean interface backed by secure REST APIs.

---

## 🧩 Tech Stack

* **Backend:** Spring Boot 3 (Java 21, Maven, Spring Security, JPA, H2, JWT)
* **Frontend:** Angular 18 (TypeScript, SCSS, Routing)
* **Database:** H2 (in-memory)
* **Build Tools:** Maven + Node.js/npm

---

## 📁 Project Structure

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

## ▶️ Running the App

The Angular frontend is bundled and served directly by the Spring Boot backend.
Once built, you only need to run the backend — it will automatically serve the Angular app on **port 8080**.

### 1️⃣ Build and Run the Application

From the project root:

```bash
mvn clean compile
mvn spring-boot:run
```

The backend will:

* Launch the Spring Boot API at **[http://localhost:8080](http://localhost:8080)**
* Serve the Angular frontend from the same port
* Expose the H2 in-memory database console at **[http://localhost:8080/h2-console](http://localhost:8080/h2-console)**

---

### 2️⃣ Access the Application

* Web App: [http://localhost:8080](http://localhost:8080)
* H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

---

### 3️⃣ Frontend Development Workflow

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
