# 🌱 mahg_GoGreen

A personal fork of **goGreen** — originally inspired by the project and concept shared by the original creator.

This version includes small structural adjustments and refinements, but the core idea belongs to the original author.

---

## 📌 About This Project

**mahg_GoGreen** is a Node.js script that programmatically creates Git commits with custom timestamps.

It allows you to generate commits in the past (or future) to influence your GitHub contribution graph.

> ⚠️ This is purely experimental and educational.
> It is not intended to misrepresent real work.

---

## 🙌 Original Author & Credits

This project is based on the work and idea popularized by:

**Akshay Saini**
GitHub: [https://github.com/akshaymarch7](https://github.com/akshaymarch7)

The original concept and implementation inspired this fork.
This repository simply adapts and slightly modifies the approach for learning and experimentation purposes.

---

## 🚀 What This Fork Changes

* Minor code adjustments
* Small structural improvements
* Cleaner execution flow
* Maintains original idea and behavior

The core logic remains aligned with the original concept.

---

## 🛠 How It Works

The script:

1. Generates random week/day offsets
2. Calculates a past date using `moment`
3. Writes the date to a JSON file
4. Commits that file with a custom `--date`
5. Repeats the process recursively

---

## ⚙️ Setup

### 1️⃣ Clone the original repository (recommended for reference)

```bash
git clone https://github.com/fenrir2608/goGreen.git
cd goGreen
```

Or clone this fork:

```bash
git clone https://github.com/<your-username>/mahg_GoGreen.git
cd mahg_GoGreen
```

---

### 2️⃣ Initialize Node project

```bash
npm init -y
```

---

### 3️⃣ Install dependencies

```bash
npm install moment simple-git random jsonfile
```

---

### 4️⃣ Run the script

```bash
node index.js
```

(The script will generate a random number of commits between 50 and 250 by default.)

---

## 📦 Dependencies

* `moment` — Date manipulation
* `simple-git` — Git command automation
* `random` — Random integer generation
* `jsonfile` — File writing utility

---

## 🎨 Ideas for Improvement

* Custom patterns (draw letters or shapes)
* Density control per day
* CLI parameters
* Visual grid preview before execution
* GitHub Actions automation

---

## 📜 License

This project follows the same license as the original repository.

MIT License

Copyright (c) 2026 Manuel Alejandro Hernández Giuliani

Original concept and implementation credit belongs to the original author.

---

## 🤝 Transparency Note

This repository is a fork and modification for learning purposes.

If you are interested in the original work and full credit, please visit:

👉 [https://github.com/akshaymarch7](https://github.com/akshaymarch7)

Support the original creator.