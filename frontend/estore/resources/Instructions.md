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

## 4. UI State Out of Sync due to Provider Shadowing

**Issue:** API calls were successful and the store was updating, but the `Products` component UI remained static and did not show filtered results.

- **Root Cause:** **Redundant Providers.** The `ProductsStore` was listed in the `providers` array of both the `Home` (parent) and `Products` (child) components. This caused Angular to instantiate two separate store objects. The parent was updating one instance, while the child was rendering data from the other.
- **Fix:** Removed `ProductsStore` and `ProductsService` from the child component's `providers` list. This allowed the child to "inherit" the singleton instance from the parent via Angular's hierarchical Dependency Injection.

## 5. Implicit Object Literal vs. Explicit Interface Type

**Issue:** The `output.emit()` call failed to register correctly in the parent component, even though the data structure appeared correct.

- **Root Cause:** **Structural Type Validation.** While the emitted object `{ categoryId: ..., keyword: ... }` looked like a `SearchKeyword`, Angular's strict template checking sometimes fails to implicitly cast a raw object literal to a custom interface when passed through an event binding. This often results in the parent component's handler receiving a generic `Event` or `any` instead of the specific type.
- **Fix:** Explicitly ensured the emitted data was treated as a `SearchKeyword` type. This provided the "type safety" necessary for the `Home` component to recognize the properties `categoryId` and `keyword` without throwing a compilation error.

## 6. SSR ReferenceError: sessionStorage in signalStore

**Issue:** `ReferenceError: sessionStorage is not defined` at `CartStore.loadFromSession` during server-side pre-rendering.

- **Root Cause:** **Server-Side Execution Context.** Angular SignalStores (or services) provided in 'root' are instantiated on the Node.js server during the SSR phase. Because `sessionStorage` is a browser-only API, any direct calls to it during the instantiation or `onInit` phase will crash the server-side process.
- **Fix:** Injected `PLATFORM_ID` into the store and wrapped the storage access logic in an `isPlatformBrowser()` check. This ensures the cart data is only retrieved once the application has hydrated in the user's browser.

# Dependencies

## Installed Fontawesome libraries:

```bash
 npm i @fortawesome/angular-fontawesome --save
 npm i @fortawesome/free-solid-svg-icons --save
 npm i @fortawesome/free-regular-svg-icons --save
```
