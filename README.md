# Taskwise
A clean, minimal todo list app built with React, Vite, and Tailwind CSS, featuring instant task tracking, an active/completed task split, live progress stats, and persistent local storage — no accounts, no backend.

## ⚡ Highlights
- ➕ **Quick Add** — One input, one button, zero friction
- ✅ **Instant Complete** — Click a checkbox, task moves to Completed
- 📊 **Live Progress** — A running "X of Y done" count, always current
- 👁️ **Focus Mode** — Hide completed tasks to see only what's left
- ✏️ **Inline Edit** — Pull a task back into the input to fix a typo
- 💾 **Just Works Offline** — Everything saves to `localStorage`, no sign-up
- 📱 **Responsive** — Sidebar + spread task grid on desktop, stacks cleanly on mobile

## ⚙️ Under the Hood
- Tasks are plain objects (`id`, `todo`, `isCompleted`) held in React state and mirrored to `localStorage` on every change
- The list is split into **Active** and **Completed** groups at render time, which is what lets the layout spread them into two real columns instead of one long scroll
- Every task gets a `uuid` on creation, so editing or deleting never depends on array position
- The "Show completed" switch doesn't filter a list — it toggles whether the entire Completed column renders at all

## 🎨 Design Notes
Dark background, one accent color (amber), no gradients competing for attention. The sidebar stays put while the task list scrolls, so your progress count and add-task field are never out of reach. Nothing here is decorative — every line, every spacing choice is there to keep the list readable at a glance.

## 🗂️ Project Structure
```plaintext
taskwise/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 🛠️ Built With
- **React 19** — UI and state
- **Vite** — dev server and bundler
- **Tailwind CSS 4** — styling
- **react-icons** — edit / delete / add icons
- **uuid** — unique task IDs

## 🏁 Getting Started
Requires [Node.js](https://nodejs.org/) 18+.
```bash
git clone https://github.com/ayanattaarbab/taskwise.git
cd taskwise
npm install
npm run dev
```
Then open the URL printed in your terminal (usually `http://localhost:5173`).
