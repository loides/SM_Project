FROM openjdk:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ./target/project_test-0.0.1-SNAPSHOT.jar frontend.jar
ENTRYPOINT ["java","-jar","/frontend.jar"]