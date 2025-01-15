import Slot from './Slot';
import * as readline from 'readline';


const slotGame = new Slot();
console.log('Welcome to the Massive Wins Electronic Gaming Machine!');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const play = () => {
    rl.question("Let's play! [<Enter> = spin / 'x' = exit] ", (answer) => {
        // console.clear();
        switch (answer.toLowerCase()) {
            case '':
                slotGame.spin();
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