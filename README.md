# 🎮 Unbeatable Tic-Tac-Toe AI

A sleek, responsive Tic-Tac-Toe web game powered by the **Minimax algorithm**. The AI evaluates every possible future move to ensure it never loses.

---

## ✨ Features

- **Unbeatable AI:** Implemented using the classic recursive Minimax decision algorithm.
- **Pure Vanilla Stack:** Built with lightweight HTML5, modern CSS3 (Grid & Flexbox), and Vanilla JavaScript — zero dependencies or frameworks.
- **Responsive & Clean UI:** Dark-mode interface optimized for desktop and mobile screens.
- **Zero Backend Required:** Runs 100% client-side directly in the browser.

---

## 🧠 How the AI Works

The AI uses the **Minimax algorithm**, which is a recursive backtracking algorithm used in decision-making and game theory:
- **Maximizing Player (AI / 'O'):** Aims to get the highest possible score (+1).
- **Minimizing Player (Human / 'X'):** Assumed to play optimally to achieve the lowest possible score (-1).
- **Tie State:** Evaluated as neutral (0).

Because it explores the entire game tree before every move, the AI guarantees either a win or a draw.

---

## 📁 Project Structure

```text
├── index.html       # Web structure and game board layout
├── style.css        # Styling, layout, and dark-theme colors
├── script.js        # Game logic, state handling, and Minimax AI
├── tictactoe.py     # Original CLI Python implementation
└── README.md        # Project documentation
