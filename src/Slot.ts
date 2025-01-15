import config from './config';
import { LinePayout } from './interfaces/LinePayout';

class Slot {
    private reels: number[][];
    private lines: number[][];
    private winsCount: number;
    private totalWinAmount: number;

    /**
     * Initializes a new instance of the Slot class.
     * Sets up the reels, lines, and tracks win counts and total winnings.
     */
    constructor() {
        this.reels = config.reels;
        this.lines = config.lines;
        this.winsCount = 0;
        this.totalWinAmount = 0;
    }

    /**
     * Retrieves the total number of wins.
     * @returns {number} The total number of wins recorded.
     */
    public getWinsCount(): number {
        return this.winsCount;
    }

    /**
     * Retrieves the total winnings amount.
     * @returns {number} The total amount won by the player.
     */
    public getTotalWinAmount(): number {
        return this.totalWinAmount;
    }

    /**
     * Generates a random sequence of symbols for a specific reel.
     * Wraps around the reel array when necessary.
     * @param {number} reelIndex - The index of the reel to randomize.
     * @returns {number[]} An array representing the randomly generated reel symbols.
     */
    private getRandomReel(reelIndex: number): number[] {
        const reel = this.reels[reelIndex];
        const startIndex = Math.floor(Math.random() * reel.length);
        const reelArray = [];

        for (let i = 0; i < config.rowsCount; i++) {
            reelArray.push(reel[(startIndex + i) % reel.length]);
        }

        return reelArray;
    }

    /**
     * Calculates payouts for each line based on the spin result.
     * Determines how many symbols align in each line and calculates their payout.
     * @param {number[][]} result - A 2D array representing the spin result by row and column.
     * @returns {LinePayout[]} An array of line payout objects containing symbols and payout amounts.
     */
    private calculateLinePayouts(result: number[][]): LinePayout[] {
        const linePayouts = [];

        for (const line of this.lines) {
            let payout = 0;
            const symbolsInLine = line.map((colIndex, rowIndex) => result[rowIndex][colIndex]);

            const countMap = new Map<number, number>();
            for (const symbol of symbolsInLine) {
                countMap.set(symbol, (countMap.get(symbol) || 0) + 1);
            }

            for (const [symbol, count] of countMap.entries()) {
                if (count >= 3) {
                    const symbolKey = symbol as keyof typeof config.symbols;
                    payout += config.symbols[symbolKey][count - 1] || 0;
                }
            }

            linePayouts.push({ symbolsInLine: symbolsInLine, amount: payout });
        }

        return linePayouts;
    }

    /**
     * Executes a spin on the slot machine.
     * Generates random symbols for each reel, calculates payouts, and displays the results.
     */
    public spin(): void {
        const resultReels: number[][] = [];

        for (let i = 0; i < config.reelsCount; i++) {
            resultReels.push(this.getRandomReel(i));
        }

        const resultRows: number[][] = resultReels[0].map((_, index) => resultReels.map(row => row[index]));

        const payouts = this.calculateLinePayouts(resultReels);
        this.printResult(resultRows);
        this.printPayouts(payouts);
    }

    /**
     * Prints the spin result as a table to the console.
     * @param {number[][]} result - A 2D array representing the spin result by row and column.
     */
    private printResult(result: number[][]): void {
        console.log();

        console.log('Spin Result:');
        console.table(result);
    }

    /**
     * Prints detailed payout information for each line and the total payout to the console.
     * @param {LinePayout[]} payouts - An array of line payout objects containing symbols and payout amounts.
     */
    private printPayouts(payouts: LinePayout[]): void {
        console.log('Line payouts:');
        payouts.forEach(payout => {
            console.log(payout.symbolsInLine.join(' ') + ' -> ' + payout.amount)
        });

        console.log();

        const totalPayout = this.getTotalPayout(payouts);
        let suffix = '';
        if (totalPayout > 0) {
            suffix = ' 💰 🤑 💰';
        }
        console.log('Total payout: %d' + suffix, totalPayout);

        console.log();
    }

    /**
     * Calculates the total payout from an array of line payouts.
     * Updates the total winnings and win count if the payout is greater than 0.
     * @param {LinePayout[]} payouts - An array of line payout objects containing symbols and payout amounts.
     * @returns {number} The total payout for the spin.
     */
    private getTotalPayout(payouts: LinePayout[]): number {
        let totalPayout = 0;

        payouts.forEach(payout => {
            totalPayout += payout.amount;
        });

        if (totalPayout > 0) {
            this.totalWinAmount += totalPayout;
            this.winsCount++;
        }

        return totalPayout;
    }
}

export default Slot;
