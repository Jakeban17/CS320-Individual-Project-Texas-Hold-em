
class computerPlayer{
    constructor(balance = 0){
        this.balance = balance;
        this.hand = [];
    }

    //Player balance modification
    addFunds(amount) {
        this.balance += amount;
    }
    deductFunds(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return false;
        }
        this.balance -= amount;
        return true;
    }

    //Player hand modifications
    addToHand(cards) {
        this.hand.push(...cards);
    }
    resetHand() {
        this.hand = [];
    }
}

function testComputerPlayer(){
    const ComputerPlayer = new computerPlayer(100); 
    console.log(ComputerPlayer.balance); 
    console.log(ComputerPlayer.hand); 

    ComputerPlayer.addFunds(50); 
    console.log(ComputerPlayer.balance); 

    ComputerPlayer.deductFunds(70); 
    console.log(ComputerPlayer.balance); 

    ComputerPlayer.addToHand([{ suit: 'Hearts', value: 'Ace' }, { suit: 'Diamonds', value: 'King' }]); 
    console.log(ComputerPlayer.hand);

    ComputerPlayer.resetHand();
    console.log(ComputerPlayer.hand); 
}

testComputerPlayer();