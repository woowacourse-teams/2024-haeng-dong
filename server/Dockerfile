FROM gradle:7.6.1-jdk17 AS build

WORKDIR /app

COPY . /app

RUN gradle clean build -x test

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar /app/haengdong-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENTRYPOINT ["java"]
CMD ["-jar", "haengdong-0.0.1-SNAPSHOT.jar"]
