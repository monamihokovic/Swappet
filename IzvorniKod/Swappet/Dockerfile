FROM alpine/java:21-jre
COPY target/*.jar /app.jar

EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]