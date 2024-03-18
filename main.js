class Deck {
    static cards = []; 

    //creates the deck
    static createDeck() {
        //52 cards, full deck
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        //inputs cards into cards
        for (const suit of suits) {
            for (const value of values) {
                Deck.cards.push({ suit, value });
            }
        }
        console.log("UPDATE: Deck created")
    }

    //shuffle the deck
    static shuffle() {
        for (let i = Deck.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [Deck.cards[i], Deck.cards[j]] = [Deck.cards[j], Deck.cards[i]];
        }
        console.log("UPDATE: Deck has been shuffled")
    }

    //deals the first card in cards[], use suffle before calling
    static dealCard(numCards) {
        if (numCards > Deck.cards.length) {
            console.log('ERROR: Not enough cards in the deck');
            return null;
        }
        console.log("UPDATE: Card has been dealt")
        return Deck.cards.splice(0, numCards);
    }

    //clears the deck
    static resetDeck() {
        this.cards = [];
    }
}

class Player{
    static balance = 0;
    static hand = [];
    
    //Player balance modifications
    static addFunds(amount) {
        this.balance += amount;
    }
    static deductFunds(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return false;
        }
        this.balance -= amount;
        return true;
    }

    //Player hand modifications
    static addToHand(cards) {
        this.hand = cards;
        return this.hand;
    }
    static resetHand() {
        this.hand = [];
    }
}
class CPU {
    constructor() {
        this.balance = 0;
        this.hand = [];
    }
    
    //CPU balance modifications
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

    //CPU hand modifications
    addToHand(cards) {
        this.hand = cards;
        return this.hand;
    }

    resetHand() {
        this.hand = [];
    }
}

class DisplayCard {
    
    static cardValues = {
        '2': "2", 
        '3': "3", 
        '4': "4", 
        '5': "5", 
        '6': "6", 
        '7': "7", 
        '8': "8", 
        '9': "9", 
        '10': "10", 
        'Jack': "J", 
        'Queen': "Q", 
        'King': "K", 
        'Ace': "A"
    };
    static cardSuits = {
        'Clubs': "C", 
        'Spades': "S", 
        'Hearts': "H", 
        'Diamonds': "D", 
    };

    static findFileName(card){
        var cardValue = card.value;
        var cardSuit = card.suit;

        if (cardValue in this.cardValues && cardSuit in this.cardSuits) {
            return "PlayingCards/" + this.cardValues[cardValue] + this.cardSuits[cardSuit] + ".png";
        } else {
            return "PlayingCards/card.png";
        }
    }
}

let roundCount = 1;
var gameCount = 1;
var gamePot = 0;
let isFolded = false;

//process call button ========================================================
let callClicked = false;
function handleCallClick() {
    console.log("UPDATE: Call button clicked");
    nextRoundClicked = true;
}
const callButton = document.getElementById("call-button");
callButton.addEventListener("click", handleCallClick);
//============================================================================
//process raise button =======================================================
let raiseClicked = false;
function handleRaiseClick() {
    console.log("UPDATE: Raise button clicked");
    raiseClicked = true;
}
const raiseButton = document.getElementById("raise-button");
raiseButton.addEventListener("click", handleRaiseClick);
//===========================================================================
//process fold button =======================================================
let foldClicked = false;
function handleFoldClick() {
    console.log("UPDATE: Fold button clicked");
    foldClicked = true;
    disableActions();
    isFolded = true;
}
const foldButton = document.getElementById("fold-button");
foldButton.addEventListener("click", handleFoldClick);
//===========================================================================
// process next round click =================================================
let nextRoundClicked = false;


function handleNextRoundClick() {
    console.log("UPDATE: Next Round button clicked");
    nextRoundClicked = true;
}
const nextRoundButton = document.getElementById("next-round-button");
nextRoundButton.addEventListener("click", handleNextRoundClick);

async function waitForNextRoundClick() {
    while (!nextRoundClicked) {
        // wait a little to try again
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

//===========================================================================
// process new game click ===================================================
let newGameClicked = false;

function handleNewGameClick() {
    console.log("UPDATE: New Game button clicked");
    newGameClicked = true;
}
const newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener("click", handleNewGameClick);

async function waitForNewGameClick() {
    while (!newGameClicked) {
        // wait a little to try again
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

//===========================================================================
// process add funds ========================================================
const addFundsButton = document.getElementById("add-funds-button");
addFundsButton.addEventListener("click", function() {
    if (roundCount == 1){
        const addFundsInput = document.getElementById("add-funds");
        const fundsToAdd = parseFloat(addFundsInput.value);

        if (fundsToAdd > 0 && !isNaN(fundsToAdd)){
            Player.addFunds(fundsToAdd);
        }
    
        document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
    
        addFundsInput.value = "";
    }
    else{

    }

   
});
//===========================================================================
// process bet ========================================================
const betButton = document.getElementById("bet-button");
betButton.addEventListener("click", function() {
    if (!isFolded){
        const betAmountInput = document.getElementById("bet-amount");
        const betAmount = parseFloat(betAmountInput.value);

        if (betAmount > 0  && !isNaN(betAmount)){
            gamePot += betAmount;
            Player.deductFunds(betAmount);
            disableActions();
        }
    
        document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
        document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
    
        betAmountInput.value = "";
    }
    else{

    }

   
});
//===========================================================================
function enableActions(){
    callButton.disabled = false; //enables call button
    raiseButton.disabled = false; //enables raise button
    foldButton.disabled = false; //enables fold button
    betButton.disabled = false; //enables fold button
    
}
function disableActions(){
    callButton.disabled = true; //disables call button
    raiseButton.disabled = true; //disables raise button
    foldButton.disabled = true; //disables fold button
    betButton.disabled = true; //disable fold button
}

async function main() {
    var dealerHand = [];

    addFundsButton.disabled = false; //enables add funds button
    nextRoundButton.disabled = false; //enables next round button
    newGameButton.disabled = false; //enable call, raise, fold
    enableActions();

    while(true){
        Deck.createDeck();
        Deck.shuffle();

        const CPU1 = new CPU();
        const CPU2 = new CPU();
        const CPU3 = new CPU();
        const CPU4 = new CPU();

    
        //deal cards to dealer and player hands
        dealerHand = Deck.dealCard(3);
        Player.addToHand(Deck.dealCard(2))
        CPU1.addToHand(Deck.dealCard(2));
        CPU2.addToHand(Deck.dealCard(2));
        CPU3.addToHand(Deck.dealCard(2));
        CPU4.addToHand(Deck.dealCard(2));
        //change card pngs by canching src
        const pimg1 = document.getElementById('pimg1');
        const pimg2 = document.getElementById('pimg2');
        pimg1.src = DisplayCard.findFileName(Player.hand[0]);
        pimg2.src = DisplayCard.findFileName(Player.hand[1]);

        document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
        document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
            
        console.log("D:",dealerHand[0]);
        console.log("D:",dealerHand[1]);
        console.log("D:",dealerHand[2]);
        console.log("P:",Player.hand[0]);
        console.log("P:",Player.hand[1]);
        //round 0... initial betting, pre Flop ===========================================================

        //round 1... Flop shown =======================================================================
        await waitForNextRoundClick();
        nextRoundClicked = false;
        if (!isFolded){
            enableActions(); //enable call, raise, fold
        }
        addFundsButton.disabled = true; //disables add funds button
        roundCount++;

        const dimg1 = document.getElementById('dimg1');
        const dimg2 = document.getElementById('dimg2');
        const dimg3 = document.getElementById('dimg3');
        dimg1.src = DisplayCard.findFileName(dealerHand[0]);
        dimg2.src = DisplayCard.findFileName(dealerHand[1]);
        dimg3.src = DisplayCard.findFileName(dealerHand[2]);
    
        //round 2... draws Trun =====================================================================
        await waitForNextRoundClick();
        nextRoundClicked = false;
        roundCount++;

        if (!isFolded){
            enableActions(); //enable call, raise, fold
        }
        
        dealerHand.push(...Deck.dealCard(1));
        const dimg4 = document.getElementById('dimg4');
        dimg4.src = DisplayCard.findFileName(dealerHand[3]);

    
        //round 3... draws River =======================================================================
        await waitForNextRoundClick();
        nextRoundClicked = false;
        roundCount++;
        if (!isFolded){
            enableActions(); //enable call, raise, fold
        }
    
        dealerHand.push(...Deck.dealCard(1));
        const dimg5 = document.getElementById('dimg5');
        dimg5.src = DisplayCard.findFileName(dealerHand[4]);

    
        //round 4... determines winner ===============================================================
        await waitForNextRoundClick();
        nextRoundClicked = false;
        roundCount++;
        disableActions(); //diable call, raise, fold
        nextRoundButton.disabled = true; //disables next round button
        newGameButton.disabled = false; //enables next round button

        //display opp cards
        const c1c1 = document.getElementById('c1c1');
        const c1c2 = document.getElementById('c1c2');
        c1c1.src = DisplayCard.findFileName(CPU1.hand[0]);
        c1c2.src = DisplayCard.findFileName(CPU1.hand[1]);
        const c2c1 = document.getElementById('c2c1');
        const c2c2 = document.getElementById('c2c2');
        c2c1.src = DisplayCard.findFileName(CPU2.hand[0]);
        c2c2.src = DisplayCard.findFileName(CPU2.hand[1]);
        const c3c1 = document.getElementById('c3c1');
        const c3c2 = document.getElementById('c3c2');
        c3c1.src = DisplayCard.findFileName(CPU3.hand[0]);
        c3c2.src = DisplayCard.findFileName(CPU3.hand[1]);
        const c4c1 = document.getElementById('c4c1');
        const c4c2 = document.getElementById('c4c2');
        c4c1.src = DisplayCard.findFileName(CPU4.hand[0]);
        c4c2.src = DisplayCard.findFileName(CPU4.hand[1]);
    
    
        //triggers next game... reset and move on to the next game====================================
        await waitForNewGameClick();
        newGameClicked = false;
        Deck.resetDeck();
        dealerHand = [];
        gamePot = 0;
        dimg1.src = "PlayingCards/card.png";
        dimg2.src = "PlayingCards/card.png";
        dimg3.src = "PlayingCards/card.png";
        dimg4.src = "PlayingCards/card.png";
        dimg5.src = "PlayingCards/card.png";
        c1c1.src = "PlayingCards/card.png";;
        c1c2.src = "PlayingCards/card.png";;
        c2c1.src = "PlayingCards/card.png";;
        c2c2.src = "PlayingCards/card.png";;
        c3c1.src = "PlayingCards/card.png";;
        c3c2.src = "PlayingCards/card.png";;
        c4c1.src = "PlayingCards/card.png";;
        c4c2.src = "PlayingCards/card.png";;
    
        addFundsButton.disabled = false; //enables add funds button
        nextRoundButton.disabled = false; //enables next round button
        enableActions(); //enable call, raise, fold
        newGameButton.disabled = true; //disables next round button
        roundCount = 1;
        gameCount++;
    }
}

main();