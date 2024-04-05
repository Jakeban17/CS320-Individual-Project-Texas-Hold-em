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
    static handWeight =[];
    
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
        this.handWeight = [];
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

class Game{
    static h
    andOpts = {
        0: "High Card",
        1: "One Pair",
        2: "Two Pair",
        3: "Three of a Kind",
        4: "Straight",
        5: "Flush",
        6: "Full House",
        7: "Four of a Kind",
        8: "Straight Flush",
        9: "Royal Flush"
    };

    constructor(){
        this.cardWeight = [];
        this.handOptions = [];
        this.cardValues = {
            '2': 2, 
            '3': 3, 
            '4': 4, 
            '5': 5, 
            '6': 6, 
            '7': 7, 
            '8': 8, 
            '9': 9, 
            '10': 10, 
            'Jack': 11, 
            'Queen': 12, 
            'King': 13, 
            'Ace': 14
        }
    }

    //compares hands to determine round winner
    compareHands(hand1, hand2, hand3, hand4){

    }

    //will determine best hand
    static findBestHand(hand, dealer){
        let combinedHand = [...hand, ...dealer]; //combined player hand and dealer hand
        const n = combinedHand.length;
        var combinations = [];
    
        // Generate all possible combinations
        for (let i = 0; i < n - 4; i++) {
            for (let j = i + 1; j < n - 3; j++) {
                for (let k = j + 1; k < n - 2; k++) {
                    for (let l = k + 1; l < n - 1; l++) {
                        for (let m = l + 1; m < n; m++) {
                            const combination = [combinedHand[i], combinedHand[j], combinedHand[k], combinedHand[l], combinedHand[m]];
                            Game.sortCards(combination);
                            combinations.push(combination);
                        }
                    }
                }
            }
        }
    
        var bestHand = [];
        var bestScore = 0; 
    
        // Iterate through combinations to determine best hand
        for (const combination of combinations) {
            let currentScore = 0;
            if (this.isRF(combination)) {
                currentScore = 9;
            } else if (this.isSF(combination)) {
                currentScore = 8;
            } else if (this.is4OK(combination)) {
                currentScore = 7;
            } else if (this.isFH(combination)) {
                currentScore = 6;
            } else if (this.isF(combination)) {
                currentScore = 5;
            } else if (this.isS(combination)) {
                currentScore = 4;
            } else if (this.is3OK(combination)) {
                currentScore = 3;
            } else if (this.is2P(combination)) {
                currentScore = 2;
            } else if (this.is1P(combination)) {
                currentScore = 1;
            }
    
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestHand = combination;
            }
        }
    
        return bestScore;
    }


    ///returns true if hand contains royal flush
    static isRF(hand){
        const sortedHand = this.sortCards(hand);
        const isSequentialRank = sortedHand[0].value === 'Ace' &&
            sortedHand[1].value === '10' &&
            sortedHand[2].value === 'Jack' &&
            sortedHand[3].value === 'Queen' &&
            sortedHand[4].value === 'King';
    
        const isSequentialAltRank = sortedHand[0].value === '10' &&
            sortedHand[1].value === 'Jack' &&
            sortedHand[2].value === 'Queen' &&
            sortedHand[3].value === 'King' &&
            sortedHand[4].value === 'Ace';
    
        return (isSequentialRank || isSequentialAltRank) && this.isF(hand); // Also check for flush
    }
    //returns true if hand contains straight flush
    static isSF(hand){
        if (this.isS(hand) && this.isF(hand)){
            return true;
        }
        else{
            return false;
        }
    }
    //returns true if hand contains 4 of a kind
    static is4OK(hand){
        const cardCounts = {};
        for (const card of hand) {
            const rank = card.value; 
            cardCounts[rank] = (cardCounts[rank] || 0) + 1;   //counts occurance of each rank, assigns to cardCounts[rank]
        }
        for (const rank of Object.keys(cardCounts)) {
            if (cardCounts[rank] === 4) {   //checks for 4 of the same rank
                return true;
            }
        }
        return false;
    }
    //returns true if hand contains full house
    static isFH(hand){
        return this.is3OK(hand) && this.is1P(hand);   //calls 3OK and 1P, if it has both then true
    }
    //returns true if hand contains flush
    static isF(hand){
        const firstSuit = hand[0].suit;
        for (let i = 0; i < 5; i++) {
            if (hand[i].suit != firstSuit) {
                return false;
            }
        }
        return true;
    }
    //returns true if hand contains straight
    static isS(hand){
        const sortedHand = this.sortCards(hand);
        for (let i = 0; i < 4; i++) {
            if (sortedHand[i + 1].value - sortedHand[i].value !== 1) {
                return false;
            }
        }
        return true;
    }
    
    //returns true if hand contains 3 of a kind
    static is3OK(hand){
        const cardCounts = {};
        for (const card of hand) {
            const rank = card.value; 
            cardCounts[rank] = (cardCounts[rank] || 0) + 1;   //counts occurance of each rank, assigns to cardCounts[rank]
        }
        for (const rank of Object.keys(cardCounts)) {
            if (cardCounts[rank] === 3) {   //checks for 3 of the same rank
                return true;
            }
        }
        return false;
    }


    //returns true if hand contains 2 pair
    static is2P(hand){
        const cardCounts = {};
        for (const card of hand) {
            const rank = card.value;
            cardCounts[rank] = (cardCounts[rank] || 0) + 1; //counts occurance of each rank, assigns to cardCounts[rank]
        }
        let pairCount = 0;
        for (const rank of Object.keys(cardCounts)) {
            if (cardCounts[rank] === 2) {   //checks for 2 of the same rank
                pairCount++;
            }
        }
        return pairCount === 2;   //if pairCount = 2, return true, else false
    }

    //returns true if hand contains 1 pair
    static is1P(hand){
        const cardCounts = {};
        for (const card of hand) {
            const rank = card.value;
            cardCounts[rank] = (cardCounts[rank] || 0) + 1; //counts occurance of each rank, assigns to cardCounts[rank]
        }
        for (const rank of Object.keys(cardCounts)) {
            if (cardCounts[rank] === 2) {    //checks for 2 of the same rank
                return true;
            }
        }
        return false; 
    }
    //returns high card value
    static isHC(hand){
        const cardValues = this.getHandWeights(hand);
        return Math.max(...cardValues);
    }

    //if two players happen to have the same hand, the hand with the highest input values will win
    static ifHandSame(){

    }

    //aid hand finding logic, returns array of the values of the hand (for comparison)
    static getHandWeights(hand){
        var handValues = [];
        for (const card of hand) {
            const valueIndex = this.cardValues[card.value];
            if (valueIndex !== undefined) {
                handValues.push(valueIndex);
            }
            else{
                console.log(`Value "${card.value}" not found in dictionary.`);
            }
        }
        return handValues;
    }

    //add other methods, sorts cards
    static sortCards(cards) {
        return cards.sort((a, b) => {
            const cardValues = {
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
                '10': 10,
                'Jack': 11,
                'Queen': 12,
                'King': 13,
                'Ace': 14
            };
            return cardValues[a.value] - cardValues[b.value];
        });
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

        
        const playerHandWeight = Game.findBestHand(Player.hand, dealerHand);
        const cpu1HandWeight = Game.findBestHand(CPU1.hand, dealerHand);
        const cpu2HandWeight = Game.findBestHand(CPU2.hand, dealerHand);
        const cpu3HandWeight = Game.findBestHand(CPU3.hand, dealerHand);
        const cpu4HandWeight = Game.findBestHand(CPU4.hand, dealerHand);
        console.log(playerHandWeight, cpu1HandWeight, cpu2HandWeight, cpu3HandWeight, cpu4HandWeight)

        // Check if any of the hand weights are undefined
        if (
            playerHandWeight !== undefined &&
            cpu1HandWeight !== undefined &&
            cpu2HandWeight !== undefined &&
            cpu3HandWeight !== undefined &&
            cpu4HandWeight !== undefined
        ) {
            const maxHandWeight = Math.max(playerHandWeight, cpu1HandWeight, cpu2HandWeight, cpu3HandWeight, cpu4HandWeight);
            
            let winner;
            if (playerHandWeight === maxHandWeight) {
                winner = "Player";
            } else if (cpu1HandWeight === maxHandWeight) {
                winner = "CPU 1";
            } else if (cpu2HandWeight === maxHandWeight) {
                winner = "CPU 2";
            } else if (cpu3HandWeight === maxHandWeight) {
                winner = "CPU 3";
            } else {
                winner = "CPU 4";
            }
            console.log("Winner:", winner);
        } else {
            console.log("Error: One or more hand weights are undefined.");
        }
        
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