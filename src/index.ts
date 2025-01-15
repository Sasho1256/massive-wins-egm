import Slot from './Slot';
import * as readline from 'readline';


const slotGame = new Slot();
console.log('Welcome to the Massive Wins Electronic Gaming Machine!');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const play = () => {
    rl.question("Let's play! [<Enter> = spin / 'sim' = simulation script / 'x' = exit] ", (answer) => {
        console.clear();
        switch (answer.toLowerCase()) {
            case '':
                slotGame.spin();
                play();
                break;
            case 'sim':
                const iterations = 500
                const startTime = performance.now();
                for (let i = 0; i < iterations; i++) {
                    slotGame.spin()
                    console.clear();
                }
                const endTime = performance.now();
                console.log('Simulations count: ' + iterations);
                console.log('Times won: ' + slotGame.getWinsCount());
                console.log('Total payout: ' + slotGame.getTotalWinAmount());
                console.log('Win rate: ' + Math.round(slotGame.getWinsCount() / iterations * 100) + '%');
                console.log('Execution time: ' + (endTime - startTime) + ' ms');
                play();
                break;
            case 'x':
                console.log('Thanks for playing! See you next time for more Massive Wins! 🤑 🎰 🍀');
                rl.close();
                break;
            default:
                console.log('Invalid input! Please try again.');
                play();
        }
    });
}

play();