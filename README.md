# Task Manager REST API

A simple RESTful API for managing tasks, built with Express.js.

## Features

- Create, read, update, and delete tasks
- Filter tasks by completion status and priority
- Sort tasks by fields and order

## Endpoints

### Get all tasks

```
GET /tasks
```

**Query Parameters:**
- `completed` (optional): `true` or `false`
- `sort` (optional): Field to sort by (e.g., `id`, `priority`)
- `order` (optional): `asc` or `desc`

---

### Get a task by ID

```
GET /tasks/:id
```

---

### Get tasks by priority

```
GET /tasks/priority/:level
```
- `:level` can be `low`, `medium`, or `high`

---

### Create a new task

```
POST /tasks
```
**Body:**  
```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "low|medium|high",
  "completed": false
}
```

---

### Update a task

```
PUT /tasks/:id
```
**Body:**  
```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "low|medium|high",
  "completed": false
}
```

---

### Delete a task

```
DELETE /tasks/:id
```

---

## Running the API

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm run dev
   ```
3. Test the app.
   ```
   npm run test
   ```

## License
