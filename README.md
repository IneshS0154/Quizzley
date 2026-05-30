# quizleyy — Technical Architecture Specification

---

## System Directory Structure

```text
quizleyy/
├── quizleyy-frontend/      <-- React 19 SPA Application (Vite Build Tool)
├── quizleyy-backend/       <-- Spring Boot 3.x Application (Maven)
└── quizleyy-database/      <-- Relational Schema Scripts & Migrations
```

---

## 1. Frontend Architecture (React 19 & Tailwind CSS v4.0)

### Core Configuration Files

#### quizleyy-frontend/vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

#### quizleyy-frontend/src/index.css
```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #1e3a8a;
  --color-brand-secondary: #0d9488;
  --color-ui-dark: #0f172a;
}
```

### Key Modules and Global State Requirements
* State Management: Redux Toolkit manages active quiz sessions, capturing selected answers per question index to protect user data against accidental browser reloads.
* Network Layer: Axios or React Query interfaces with backend APIs. During Phases 1 and 2, endpoints tap into local mock interceptors or JSON payloads.

---

## 2. Backend Architecture (Spring Boot 3.x & Java 17/21)

### Core Build Dependencies (Maven pom.xml Fragments)
* spring-boot-starter-web: Exposes RESTful endpoints.
* spring-boot-starter-data-jpa: Object-Relational Mapping (Hibernate implementation).
* spring-boot-starter-security: Configures stateless request filtering.
* java-jwt: Library to process JSON Web Tokens.
* lombok: Eliminates model boilerplate.

### Target Package Architecture (src/main/java/com/quizleyy/backend/)
* .config: Security configurations, CORS allowances, and JWT interceptors.
* .controller: REST API endpoints handling inputs from student and admin portals.
* .dto: Request/Response Data Transfer Objects to keep the data exchange lean.
* .model: JPA Entities mapping code structures to database tables.
* .repository: Interfaces extending JpaRepository for execution of CRUD queries.
* .service: Houses business logic (specifically the grade computation matrix).

### Configuration Adjustments

#### quizleyy-backend/src/main/resources/application.properties
*(Temporary configuration for Phase 1 and 2 isolated development)*
```properties
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

#### quizleyy-backend/src/main/resources/application.properties
*(Production configuration for Phase 3 integration)*
```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=quizleyy_db;encrypt=true;trustServerCertificate=true;
spring.datasource.username=db_user
spring.datasource.password=db_secure_password
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

---

## 3. Database Architecture (Microsoft SQL Server / PostgreSQL)

### Schema Version Control Structure
```text
quizleyy-database/
├── 01-schema/       <-- Table layouts and DDL definitions
├── 02-constraints/  <-- Constraints, Primary/Foreign keys, and Indices
└── 03-seeding/      <-- Mock data entry execution sequences
```

### Relational Schema Requirements (3NF/BCNF Targets)
* Users Table: Stores identity baselines and passwords using robust cryptographic hashes. Explicitly separates student authorizations from administrative privileges.
* Quizzes Table: Maps individual quiz metadata, assigning modules, exact time allowances, and maximum achievable weights.
* Questions Table: Connects multiple question strings hierarchically to parent quiz definitions, tracking weighted credit attributes per item.
* Options Table: Holds potential structural response blocks tied back to individual questions, validating accuracy assertions with boolean tags.
* Student_Attempts Table: Records performance variables, capturing references to users, quizzes, exact point yields, start metrics, and termination timers.

### Database Query Optimization Strategy
* Indices: Compulsory indexing applied to operational lookup chains (quiz_id inside the Questions table, user_id inside the Student_Attempts table).
* Constraints: Strong Foreign Key cascades across the quiz-to-question paths to enforce referential integrity throughout transactional cycles.