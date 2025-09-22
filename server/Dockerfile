# ------------------------
# Stage 1: Build with Maven and Java 23
# ------------------------
FROM maven:3.9.8-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and download dependencies first (caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build jar without tests
RUN mvn clean package -DskipTests

# ------------------------
# Stage 2: Run the app
# ------------------------
FROM eclipse-temurin:21-jdk-jammy AS runtime

WORKDIR /app

# Copy the built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port for Render
EXPOSE 8080

# Run jar with dynamic port support
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080}"]
