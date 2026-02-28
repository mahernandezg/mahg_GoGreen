# 🌱 MAHG GoGreen

An educational exploration of Git commit timestamp manipulation for learning purposes.

This repository evolves the original **GoGreen** concept into multiple structured implementations — ranging from a lightly refined version to a fully rewritten, parameterized advanced edition.

> ⚠️ Educational and experimental use only.
> Artificially modifying contribution graphs does not reflect real productivity.

---

# 📁 Project Structure

```bash
spot_date.js
spot_date_advanced.js
spot_date_advanced_param.js
```

---

# 🧩 1️⃣ spot_date.js

### Based on the Original Implementation

This file is directly based on the original GoGreen concept.

It includes:

* Small structural refinements
* Cleaner naming
* Improved inline comments
* Minor readability improvements

### Important

* The core logic remains aligned with the original.
* This is not a rewrite.
* This is a respectful refinement for clarity and maintainability.

This version preserves the recursive approach and original behavior.

---

# 🚀 2️⃣ spot_date_advanced.js

### Advanced Version – Written From Scratch

This implementation was written entirely from scratch.

It is **architecturally redesigned**, but conceptually inspired by the original idea.

### Improvements Over the Basic Version

* Async/Await (no callbacks)
* Modular structure
* Clear separation of responsibilities
* Structured logging
* Density control
* Pattern mode capability
* Cleaner execution flow
* Production-style error handling

This version reflects modern Node.js best practices and improved maintainability.

---

# ⚙️ 3️⃣ spot_date_advanced_param.js

### Advanced Version with Full CLI Parameter Support

This version extends the advanced architecture by allowing runtime configuration via execution parameters.

### Accepted Parameters

```bash
--yearsBack=2
--minCommits=50
--maxCommits=200
--density=2
--patternMode=true
```

### Example Execution

```bash
node spot_date_advanced_param.js \
  --yearsBack=3 \
  --minCommits=80 \
  --maxCommits=120 \
  --density=3 \
  --patternMode=false
```

### What This Enables

* Full control over commit distribution
* Controlled density (darker green intensity)
* Deterministic commit ranges
* Optional structured pattern rendering

This version is the most flexible and extensible edition in this repository.

---

# 🛠 Installation

```bash
git clone https://github.com/<your-username>/mahg_GoGreen.git
cd mahg_GoGreen
npm install moment simple-git random jsonfile
```

---

# ▶ Usage Summary

### Basic (Refined Original)

```bash
node spot_date.js
```

### Advanced (Clean Rewrite)

```bash
node spot_date_advanced.js
```

### Advanced + Parameters

```bash
node spot_date_advanced_param.js --yearsBack=3 --minCommits=100 --maxCommits=150 --density=2
```

---

# 📦 Dependencies

* `moment` – Date manipulation
* `simple-git` – Git automation
* `random` – Random generation
* `jsonfile` – JSON file writing

---

# 🙌 Credits & Inspiration

The original concept that inspired this project comes from:

**Akshay Saini**
GitHub: [https://github.com/akshaymarch7](https://github.com/akshaymarch7)

This repository contains:

* A refined version based on the original (`spot_date.js`)
* A full architectural rewrite inspired by the concept (`spot_date_advanced.js`)
* A parameterized advanced version (`spot_date_advanced_param.js`)

All conceptual credit for the initial idea belongs to the original creator.

---

# 📜 License

MIT License

Copyright (c) 2026 Manuel Alejandro Hernández Giuliani

This project respects and acknowledges the original inspiration.

---

# 🤝 Transparency Statement

This repository exists for:

* Learning Git internals
* Understanding commit metadata
* Exploring automation with Node.js
* Studying contribution graph behavior

It should not be used to misrepresent professional activity.