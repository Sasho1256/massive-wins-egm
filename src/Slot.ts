import config from './config';
import { LinePayout } from './interfaces/LinePayout';

class Slot {
    private reels: number[][];
    private lines: number[][];
    private winsCount: number;
    private totalWinAmount: number;

    constructor() {
        this.reels = config.reels;
        this.lines = config.lines;
        this.winsCount = 0;
        this.totalWinAmount = 0;
    }

    public getWinsCount(): number {
        return this.winsCount;
    }
    public getTotalWinAmount(): number {
        return this.totalWinAmount;
    }

    private getRandomReel(reelIndex: number): number[] {
        const reel = this.reels[reelIndex];
        const startIndex = Math.floor(Math.random() * reel.length);
        const reelArray = [];

        for (let i = 0; i < config.rowsCount; i++) {
            reelArray.push(reel[(startIndex + i) % reel.length]);
        }

        return reelArray;
    }

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

    private printResult(result: number[][]): void {
        console.log();

        console.log('Spin Result:');
        console.table(result);
    }

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
