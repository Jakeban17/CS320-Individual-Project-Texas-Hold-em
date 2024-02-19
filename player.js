class Player{
    constructor(balance = 0){
        this.balance = balance;
        this.hand = [];
    }

    //Player balance modifications
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



//TEST BELOW: run this file to just run player tests





function testPlayer(){
    const player = new Player(100); 
    console.log(player.balance); 
    console.log(player.hand); 

    player.addFunds(50); 
    console.log(player.balance); 

    player.deductFunds(70); 
    console.log(player.balance); 

    player.addToHand([{ suit: 'Hearts', value: 'Ace' }, { suit: 'Diamonds', value: 'King' }]); 
    console.log(player.hand);

    player.resetHand();
    console.log(player.hand); 
}

testPlayer();
