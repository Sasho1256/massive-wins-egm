import Slot from '../src/Slot';
import config from '../src/config';

jest.mock('../src/config', () => ({
    reelsCount: 5,
    rowsCount: 3,
    symbols: {
        1: [0, 0, 10, 20, 50],
        2: [0, 0, 20, 40, 100],
        3: [0, 0, 30, 60, 150],
        4: [0, 0, 40, 80, 200],
        5: [0, 0, 50, 100, 250],
        6: [0, 0, 100, 200, 500],
        7: [0, 0, 150, 300, 800],
        8: [0, 0, 200, 400, 1000],
        9: [0, 0, 300, 600, 2000],
    },
    lines: [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [0, 1, 0, 1, 0],
        [1, 2, 1, 2, 1],
    ],
    reels: [
        [
            1, 1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1,
            4, 4, 2, 2, 3, 3, 4, 4, 9, 9, 3, 3, 2, 2, 1, 1, 9, 9, 1, 1, 4, 4, 8, 8, 2, 2, 5, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6,
            6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 7, 7, 5, 5, 5, 1, 1, 6, 6, 4, 4, 3, 3, 4, 4, 5, 5, 3, 3, 2, 2, 1, 1, 1,
            1, 2, 2, 9, 9, 3, 3, 1, 1, 8, 8, 8, 3, 3, 6, 6, 1, 1, 7, 7, 2, 2, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4, 4, 1, 1, 4,
            4, 2, 2,
        ],
        [
            1, 1, 5, 5, 3, 3, 1, 1, 7, 7, 7, 4, 4, 9, 9, 5, 5, 1, 1, 4, 4, 9, 9, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 2, 2, 2, 3,
            3, 4, 4, 8, 8, 8, 3, 3, 2, 2, 1, 1, 4, 4, 1, 1, 8, 8, 2, 2, 5, 5, 1, 1, 5, 5, 9, 9, 3, 3, 1, 1, 7, 7, 4, 4, 5, 5,
            1, 1, 4, 4, 4, 4, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5, 6,
            6, 2, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 8, 8, 2, 2, 5, 5,
        ],
        [
            1, 1, 9, 9, 2, 2, 2, 5, 5, 8, 8, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 4, 4,
            4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 2, 2, 9, 9, 1, 1, 1, 1, 2, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 7, 7,
            2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 9, 9, 2, 2, 1, 1, 6, 6, 6,
            1, 1, 8, 8, 2, 2, 5, 5, 7, 7, 4, 4, 5, 5, 1, 1, 4, 4, 3, 3, 4, 4, 3, 3, 9, 9, 2, 2, 1, 1,
        ],
        [
            1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 9, 9, 9, 2, 2, 2, 5, 5, 7, 7, 2, 2, 5, 5, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 6, 1, 1,
            4, 4, 4, 5, 5, 5, 1, 1, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 9, 9, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 2, 2, 2, 5, 5, 5,
            7, 7, 2, 2, 9, 9, 3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1, 9, 9,
            3, 3, 1, 1, 7, 7, 3, 3, 6, 6, 1, 1, 7, 7, 5, 5, 1, 1, 4, 4, 3, 3, 8, 8, 6, 6, 2, 2, 1, 1,
        ],
        [
            1, 1, 5, 5, 7, 7, 3, 3, 9, 9, 9, 1, 1, 3, 3, 2, 2, 2, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 2, 2, 4, 4, 3, 3, 4, 4, 4,
            5, 5, 1, 1, 6, 6, 4, 4, 8, 8, 3, 3, 6, 6, 2, 2, 1, 1, 8, 8, 1, 1, 5, 5, 3, 3, 9, 9, 1, 1, 7, 7, 3, 3, 2, 2, 2, 5,
            5, 1, 1, 7, 7, 7, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 9, 9, 9, 6, 6, 2, 2, 1,
            1, 2, 2, 6, 6, 6, 1, 1, 8, 8, 8, 2, 2, 4, 4, 3, 3, 5, 5, 1, 1, 4, 4, 3, 3, 9, 9, 9, 6, 6, 2, 2, 1, 1,
        ],
    ],
}));

describe('Slot Machine', () => {
    let slot: Slot;

    beforeEach(() => {
        slot = new Slot();
    });

    test('Slot class initializes correctly', () => {
        const reels = (slot as any).reels;
        const lines = (slot as any).lines;

        expect(reels.length).toBe(5);
        expect(lines.length).toBe(5);
    });

    test('Generates the correct amount of rows per reel (as by configuration)', () => {
        for (let i = 0; i < config.reelsCount; i++) {
            const reel = (slot as any).getRandomReel(i);
            expect(reel.length).toBe(3);
        }
    });

    test('Generates the correct amount of rows per reel (modified configuration)', () => {
        config.rowsCount = 6;

        for (let i = 0; i < config.reelsCount; i++) {
            const reel = (slot as any).getRandomReel(i);
            expect(reel.length).toBe(6);
        }
    });

    test('Calculates the correct payouts for winning lines 1 and 4', () => {
        const mockResult = [
            [1, 3, 8],
            [1, 5, 6],
            [1, 8, 3],
            [1, 7, 9],
            [1, 4, 1],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        expect(payouts[0].amount).toBe(50);
        expect(payouts[1].amount).toBe(0);
        expect(payouts[2].amount).toBe(0);
        expect(payouts[3].amount).toBe(10);
        expect(payouts[4].amount).toBe(0);
        expect(totalPayout).toBe(50 + 10);
    });
    test('Calculates the correct payouts for winning lines 2 and 5', () => {
        const mockResult = [
            [3, 2, 8],
            [5, 2, 6],
            [8, 2, 3],
            [7, 2, 9],
            [4, 2, 1],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        expect(payouts[0].amount).toBe(0);
        expect(payouts[1].amount).toBe(100);
        expect(payouts[2].amount).toBe(0);
        expect(payouts[3].amount).toBe(0);
        expect(payouts[4].amount).toBe(20);
        expect(totalPayout).toBe(100 + 20);
    });
    test('Calculates the correct payouts for winning line 3', () => {
        const mockResult = [
            [3, 8, 5],
            [5, 6, 5],
            [8, 3, 5],
            [7, 9, 5],
            [4, 1, 5],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        expect(payouts[0].amount).toBe(0);
        expect(payouts[1].amount).toBe(0);
        expect(payouts[2].amount).toBe(250);
        expect(payouts[3].amount).toBe(0);
        expect(payouts[4].amount).toBe(0);
        expect(totalPayout).toBe(250);
    });

    test('Returns 0 payout amounts for non-winning spin', () => {
        const mockResult = [
            [8, 2, 2],
            [1, 1, 7],
            [6, 6, 1],
            [2, 2, 4],
            [1, 5, 5],
        ];
        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        expect(payouts[0].amount).toBe(0);
        expect(payouts[1].amount).toBe(0);
        expect(payouts[2].amount).toBe(0);
        expect(payouts[3].amount).toBe(0);
        expect(payouts[4].amount).toBe(0);
        expect(totalPayout).toBe(0);
    });

    test('Calculates the correct payouts for a full line of 5 matching symbols', () => {
        const mockResult = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        expect(payouts[0].amount).toBe(50);
        expect(payouts[1].amount).toBe(50);
        expect(payouts[2].amount).toBe(50);
        expect(payouts[3].amount).toBe(50);
        expect(payouts[4].amount).toBe(50);
        expect(totalPayout).toBe(50 * 5);
    });

    test('Handles changes to config symbols (different payouts)', () => {
        config.symbols[1] = [0, 0, 100, 200, 500];

        const mockResult = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);

        config.symbols[1] = [0, 0, 10, 20, 50];

        expect(payouts[0].amount).toBe(500);
        expect(payouts[1].amount).toBe(500);
        expect(payouts[2].amount).toBe(500);
        expect(payouts[3].amount).toBe(500);
        expect(payouts[4].amount).toBe(500);
        expect(totalPayout).toBe(500 * 5);
    });


    test('Spin produces valid result and payouts', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        slot.spin();

        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Spin Result:'));
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Line payouts:'));

        logSpy.mockRestore();
    });

    test('printPayouts prints correct amount of rows in the console', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        const mockResult = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ];

        const payouts = (slot as any).calculateLinePayouts(mockResult);

        (slot as any).printPayouts(payouts);

        expect(logSpy).toHaveBeenCalledTimes(9);

        logSpy.mockRestore();
    });    

    test('Handles very large payout amounts', () => {
        config.symbols[9] = [0, 0, 10000, 20000, 50000];
        const mockResult = [
            [9, 9, 9],
            [9, 9, 9],
            [9, 9, 9],
            [9, 9, 9],
            [9, 9, 9],
        ];
    
        const payouts = (slot as any).calculateLinePayouts(mockResult);
        const totalPayout = (slot as any).getTotalPayout(payouts);
    
        expect(totalPayout).toBe(50000 * 5); // Check if the total payout calculation handles large values
    });
    
});
