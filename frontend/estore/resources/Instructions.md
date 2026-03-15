# E-Cart Project: Troubleshooting & Issue Resolution Log

## 1. Spring Data REST `@Data` API Response Incomplete

**Issue:** The API response was returning a partial object, despite the database being correctly populated.

- **Root Cause:** The Spring Tool Suite (STS) internal compiler was failing to process **Project Lombok** annotations due to a missing agent in the IDE configuration. Since `@Data` generates getters and setters at compile-time, Jackson (Spring's JSON serializer) could not access the private fields to serialize them into the JSON response.
- **Fix:** 1. **IDE Patch:** Manually executed the `lombok.jar` installer and pointed it to the `STS.exe` location to append the `-javaagent` argument to the `sts.ini` file. 2. **Lifecycle Bypass:** Used the Maven Wrapper command `./mvnw spring-boot:run` in the terminal to ensure the standard Maven compiler (which correctly handles annotation processors) managed the build and execution.

## 2. API Data Rendering Failure in Angular UI

**Issue:** Frontend components failed to correctly identify or filter data based on the `parentCategoryId` property.

- **Root Cause:** A type mismatch existed between the backend and frontend. The Spring Boot API returned `null` for top-level entities, whereas the Angular TypeScript model initialized the property as `undefined`. In JavaScript/TypeScript, strict equality (`===`) evaluates `null === undefined` as `false`, breaking the comparison logic.
- **Fix:** Transitioned from strict equality to **loose equality** (`==`) for ID comparisons. Using `response.parentCategoryId == this.parentId` allows the JavaScript engine to treat `null` and `undefined` as equivalent "empty" values, ensuring correct logical branching for root-level nodes.

## 3. Java Runtime Version Mismatch (UnsupportedClassVersionError)

**Issue:** The application failed to start with a `java.lang.UnsupportedClassVersionError` (Class file version 61.0 vs 60.0).

- **Root Cause:** The project was compiled for **Java 17** (v61), but the IDE was attempting to execute it using a **Java 16** (v60) runtime environment.
- **Fix:** 1. Installed **JDK 21** to provide long-term support and backward compatibility. 2. Registered the new JDK in STS under `Window > Preferences > Java > Installed JREs`. 3. Updated the Windows `JAVA_HOME` environment variable and mapped the project **Execution Environment** to Java 21 to ensure alignment between Maven and the IDE.

# Dependencies

## Installed Fontawesome libraries:

```bash
 npm i @fortawesome/angular-fontawesome --save
 npm i @fortawesome/free-solid-svg-icons --save
 npm i @fortawesome/free-regular-svg-icons --save
```
