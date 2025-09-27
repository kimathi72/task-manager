# 📌 Task Manager (Spring Boot + Angular)

A **full-stack Task Manager MVP** built with:

- **Backend**: Spring Boot 3 (Java 21, Maven, Spring Security, JPA, H2, JWT)  
- **Frontend**: Angular 18 (TypeScript, SCSS, Routing)  
- **Database**: H2 (in-memory)  
- **Build Tools**: Maven + Node.js/npm  

---

## 📂 Project Structure
taskmanager/
│── taskmanager-backend/ # Spring Boot backend
│ ├── src/ # Java source code
│ ├── pom.xml # Maven dependencies
│ └── target/ # Compiled backend (ignored by git)
│
│── client/ # Angular frontend
│ ├── src/ # Angular source code
│ ├── angular.json # Angular config
│ └── dist/ # Build output (ignored by git)
│
├── .gitignore
├── .gitattributes
└── README.md

yaml
Copy code

---

## ▶️ Running the App

### 1️⃣ Start Backend (Spring Boot)
```bash
cd taskmanager-backend
./mvnw spring-boot:run
Backend runs on: 👉 http://localhost:8080

H2 Console: 👉 http://localhost:8080/h2-console

2️⃣ Start Frontend (Angular)
bash
Copy code
cd client
npm install
ng serve
Frontend runs on: 👉 http://localhost:4200

🔄 Proxy Setup (Avoid CORS in Dev)
To forward Angular API requests to Spring Boot:

Create client/proxy.conf.json:

json
Copy code
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
Update package.json scripts:

json
Copy code
"scripts": {
  "start": "ng serve --proxy-config proxy.conf.json"
}
Now run:

bash
Copy code
npm start
Requests to /api/... go to Spring Boot automatically.

🔑 Authentication
Spring Security is enabled by default.

Visiting http://localhost:8080 shows a login page.

You’ll configure JWT + custom users later for real authentication.

For now, backend auto-generates a default login:

Username: user

Password: (shown in backend logs on startup)

🛠️ Development Commands
Backend
Run app: ./mvnw spring-boot:run

Run tests: ./mvnw test

Package JAR: ./mvnw clean package

Frontend
Start dev server: ng serve

Build for production: ng build

Run unit tests: ng test

🌱 Initial Git Setup
.gitignore
gitignore
Copy code
# Maven
target/
*.log

# Node
node_modules/
dist/
.cache/

# IDEs
.idea/
.vscode/
*.iml

# OS files
.DS_Store
Thumbs.db
.gitattributes
gitattributes
Copy code
# Normalize line endings
* text=auto

# Java source
*.java text diff=java

# TypeScript/HTML/SCSS
*.ts text
*.html text
*.scss text
🚀 Next Steps
✅ Implement JWT Authentication (Spring Security + Angular Interceptor)

✅ Add Task CRUD (backend REST + Angular services + components)

✅ Connect Angular Auth Guard → backend JWT

🚀 Deploy fullstack app (Heroku / Render / Railway / Docker)

👨‍💻 Author
Built with ❤️ by Roy Kimathi

pgsql
Copy code

---
