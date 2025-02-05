# Environment Variables Configuration

The `.env` file is used to store sensitive configuration required for this project. Below is a list of environment variables used:

## Environment Variables

### 1. `MONSTER_API`
Used for Monster API authentication.
- **Type:** String (JWT Token)
- **Example:** `MONSTER_API=your-monster-api-key`

### 2. `GEMINI`
Used for the Gemini API key.
- **Type:** String (API Key)
- **Example:** `GEMINI=your-gemini-api-key`

### 3. `AUTHOR`
Identification number or contact of the project author/owner.
- **Type:** String (Phone number or other ID)
- **Example:** `AUTHOR=your-author-id`

## How to Use
1. Create a `.env` file in the project root.
2. Add the above variables with appropriate values.
3. Ensure the `.env` file is not committed to the repository by adding it to `.gitignore`.

```gitignore
.env
```

## Notes
- Do not share the `.env` file publicly.
- Use these variables according to the project needs.
- If any issues arise, ensure the entered values are correct and match the documentation of each service.


