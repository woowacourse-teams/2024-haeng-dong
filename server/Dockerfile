FROM openjdk:17-jdk-slim

WORKDIR /app

COPY /build/libs/*.jar /app/haengdong-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENTRYPOINT ["java"]
CMD ["-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Duser.timezone=Asia/Seoul",  "-jar", "haengdong-0.0.1-SNAPSHOT.jar"]
