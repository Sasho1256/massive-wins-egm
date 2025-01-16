# Massive Wins Electronic Game Machine

A simple slot machine game built with Node.js and TypeScript. This game simulates a slot machine spin and calculates payouts based on predefined configurations.

## Features
- Written in TypeScript
- Object-Oriented Design
- Configurable reels, symbols, and payout lines
- Outputs spin results and payouts to the console

---

## Setup Guide

### Requirements
- Node.js (version 14 or higher)
- npm (Node Package Manager)

---

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Sasho1256/massive-wins-egm
cd massive-wins-egm
```

2. **Install dependencies**:
```bash
npm install
```

---

### Running the game

- **Run the following command to start the game**:
```bash
npx ts-node src/index.ts
```

- **Game modes**:
    - Normal mode - Just press Enter on your keyboard, without typing anything in the console and the game will output the spin results (reels and symbols), line payouts and the total payout to the console.
    - Simulation mode - Type 'sim' in the console and press Enter on your keyboard to make the program run multiple spins and output useful information and statistics about the games that played out (Total wins, Win rate, Execution time etc.).
    - Exit - To exit the game just type 'x' in the console and press Enter.

### Testing the project

- **Run the following command to execute the unit tests**
```bash
npx jest
```