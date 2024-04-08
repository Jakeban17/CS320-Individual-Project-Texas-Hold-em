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
    static currentBet = 0;
    static lastBet = 0;
    static totalBet = 0;
    static isFolded = false;
    
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
        this.currentBet = 0;
        this.lastBet = 0;
        this.isFolded = false;
        this.totalBet = 0;
        this.action = " ";
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

    static cardValues = {
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

    constructor(){
        this.cardWeight = [];
        this.handOptions = [];
    }
    static getLargestCardValue(cards) {
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
    
        let largestValue = 0;
        for (const card of cards) {
            const cardValue = cardValues[card.value];
            if (typeof cardValue === 'number' && cardValue > largestValue) {
                largestValue = cardValue;
            }
        }
    
        return largestValue;
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
        if (bestScore == 0){
            bestHand = combinedHand;
        }
        
        return [bestScore, bestHand];
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
        console.log("Hand", hand);
        var handValues = [];
        for (let i = 0; i < 5; i++) {
            const card = hand[i];
            console.log("Card:", card);
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


let roundCount = 1; //keeps track of current round number, for round logic
var gameCount = 1; //keeps track of current game number
var gamePot = 0; //total of all of the bets
let isFolded = false; //only for enabling/disabling buttons, Player has its own isFolded
var raiseAmount = 100; //100 being default, can be changed with user input
var previousBet = 0; //stores previous bet
var round = "Pre Flop";

//process call button ========================================================
let callClicked = false;
function handleCallClick() {
    gamePot = gamePot + previousBet;
    document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
    Player.deductFunds(previousBet);
    document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
    Player.currentBet += previousBet;
    document.getElementById("player-current-bet").textContent = Player.currentBet;
    console.log("UPDATE: Call button clicked");
    nextRoundClicked = true;
}
const callButton = document.getElementById("call-button");
callButton.addEventListener("click", handleCallClick);
//============================================================================
//process raise button =======================================================
let raiseClicked = false;
function handleRaiseClick() {
    gamePot = gamePot + raiseAmount;
    document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
    Player.deductFunds(raiseAmount);
    document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
    Player.currentBet += raiseAmount;
    document.getElementById("player-current-bet").textContent = Player.currentBet;
    console.log("UPDATE: Raise button clicked");
    raiseClicked = true;
    disableActions();
}
const raiseButton = document.getElementById("raise-button");
raiseButton.addEventListener("click", handleRaiseClick);
//===========================================================================
//process fold button =======================================================
let foldClicked = false;
function handleFoldClick() {
    console.log("UPDATE: Fold button clicked");
    foldClicked = true;
    Player.isFolded = true;
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
            Player.currentBet +=betAmount;
            previousBet = betAmount;
            disableActions();
        }
    
        document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
        document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
        document.getElementById('player-current-bet').textContent = Player.currentBet;
    
        betAmountInput.value = "";
    }
    else{

    }

   
});
//===========================================================================
// process set raise ========================================================
const setRaiseButton = document.getElementById("set-raise-button");
setRaiseButton.addEventListener("click", function() {
    if (roundCount == 1){
        const setRaiseInput = document.getElementById("set-raise");
        const setRaise = parseFloat(setRaiseInput.value);

        if (setRaise > 0 && !isNaN(setRaise)){
            raiseAmount = setRaise;
            document.getElementById('raise-amount').textContent = 'Raise Amount: ' + raiseAmount;
        }
        //change this to show new raise amount in the corner of the screen
        //document.getElementById("balance-display").textContent = "Balance: " + Player.balance;
    
        setRaiseInput.value = "";
        console.log("UPDATE: New raise amount ", raiseAmount);
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
function updateWinnerDisplay(winner) {
    const winnerDisplay = document.getElementById('winner-display');
    winnerDisplay.textContent = winner ? `Winner: ${winner}` : '';
}
function resetWinnerDisplay() {
    const winnerDisplay = document.getElementById('winner-display');
    winnerDisplay.textContent = '';
}
//processes CPU moves
function cpuNextMove(player, dealerHand, previousBet, name, random) {
    if (!player.isFolded){
        var currentHandWeight = Game.findBestHand(player.hand, dealerHand);
        if (currentHandWeight[0] >= 5 || roundCount == 1 || (random == 1 || random == 2)){ //if hand is flush or better OR is the first round
            //raise
            gamePot += raiseAmount;
            player.totalBet += raiseAmount;
            previousBet = raiseAmount;
            player.action = "Raise";
            console.log(name, "Raised");
            document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
        }
        else if ((currentHandWeight[0] < 1 || random == 3) && roundCount < 4){ //if hand is one pair or worse
            //fold
            player.isFolded = true;
            player.action = "Fold";
            console.log(name, "Folded");
        }
        else{ //if hand is between 2 pair and straight
            //call
            if (player.lastBet < previousBet){
                gamePot += (previousBet - player.lastBet);
                player.totalBet += (previousBet - player.lastBet);
                previousBet = (previousBet - player.lastBet);
                player.action = "Call";
                document.getElementById("gamepot-display").textContent = "Game Pot: " + gamePot;
                console.log(name,"Called");
            }
            else{

            }
        }
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function findHand(handVal){
    if (handVal == 9){
        return "Royal Flush";
    }
    else if (handVal == 8){
        return "Straight Flush";
    }
    else if (handVal == 7){
        return "Four of a Kind";
    }
    else if (handVal == 6){
        return "Full House";
    }
    else if (handVal == 5){
        return "Flush";
    }
    else if (handVal == 4){
        return "Straight";
    }
    else if (handVal == 3){
        return "Three of a Kind";
    }
    else if (handVal == 2){
        return "Two Pair";
    }
    else if (handVal == 1){
        return "One Pair";
    }
    else{
        return "High Card";
    }
}

async function main() {
    var dealerHand = [];

    addFundsButton.disabled = false; //enables add funds button
    nextRoundButton.disabled = false; //enables next round button
    newGameButton.disabled = false; //enable call, raise, fold
    newGameButton.disabled = true; //disables next round button
    
    enableActions();

    while(true){
        callButton.disabled = true; //disables call button
        document.getElementById('game-number').textContent = 'Game #: ' + gameCount;
        document.getElementById('raise-amount').textContent = 'Raise Amount: ' + raiseAmount;
        document.getElementById("round-name").textContent = "Round: Pre Flop";

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
        document.getElementById('player-current-bet').textContent = Player.currentBet;
        document.getElementById('cpu1-current-bet').textContent = CPU1.currentBet;
        document.getElementById('cpu2-current-bet').textContent = CPU2.currentBet;
        document.getElementById('cpu3-current-bet').textContent = CPU3.currentBet;
        document.getElementById('cpu4-current-bet').textContent = CPU4.currentBet;
            
        console.log("D:",dealerHand[0]);
        console.log("D:",dealerHand[1]);
        console.log("D:",dealerHand[2]);
        console.log("P:",Player.hand[0]);
        console.log("P:",Player.hand[1]);
        //round 0... initial betting, pre Flop ===========================================================

        //round 1... Flop shown =======================================================================
        await waitForNextRoundClick();
        cpuNextMove(CPU1, dealerHand, previousBet, "CPU1", getRandomInt(1, 3));
        cpuNextMove(CPU2, dealerHand, previousBet, "CPU2", getRandomInt(1, 3));
        cpuNextMove(CPU3, dealerHand, previousBet, "CPU3", getRandomInt(1, 3));
        cpuNextMove(CPU4, dealerHand, previousBet, "CPU4", getRandomInt(1, 3));
        document.getElementById("cpu1-move").textContent = CPU1.action;
        document.getElementById("cpu2-move").textContent = CPU2.action;
        document.getElementById("cpu3-move").textContent = CPU3.action;
        document.getElementById("cpu4-move").textContent = CPU4.action;
        document.getElementById("round-name").textContent = "Round: Flop";
        
        nextRoundClicked = false;
        if (!isFolded){
            enableActions(); //enable call, raise, fold
        }
        addFundsButton.disabled = true; //disables add funds button
        setRaiseButton.disabled = true; //disables set raise button
        roundCount++;
        document.getElementById('player-current-bet').textContent = Player.currentBet;
        document.getElementById('cpu1-current-bet').textContent = CPU1.totalBet;
        document.getElementById('cpu2-current-bet').textContent = CPU2.totalBet;
        document.getElementById('cpu3-current-bet').textContent = CPU3.totalBet;
        document.getElementById('cpu4-current-bet').textContent = CPU4.totalBet;

        const dimg1 = document.getElementById('dimg1');
        const dimg2 = document.getElementById('dimg2');
        const dimg3 = document.getElementById('dimg3');
        dimg1.src = DisplayCard.findFileName(dealerHand[0]);
        dimg2.src = DisplayCard.findFileName(dealerHand[1]);
        dimg3.src = DisplayCard.findFileName(dealerHand[2]);
    
        //round 2... draws Trun =====================================================================
        await waitForNextRoundClick();
        roundCount++;
        nextRoundClicked = false;
        cpuNextMove(CPU1, dealerHand, previousBet, "CPU1", getRandomInt(1, 6));
        cpuNextMove(CPU2, dealerHand, previousBet, "CPU2", getRandomInt(1, 6));
        cpuNextMove(CPU3, dealerHand, previousBet, "CPU3", getRandomInt(1, 6));
        cpuNextMove(CPU4, dealerHand, previousBet, "CPU4", getRandomInt(1, 6));
        document.getElementById("cpu1-move").textContent = CPU1.action;
        document.getElementById("cpu2-move").textContent = CPU2.action;
        document.getElementById("cpu3-move").textContent = CPU3.action;
        document.getElementById("cpu4-move").textContent = CPU4.action;
        document.getElementById('player-current-bet').textContent = Player.currentBet;
        document.getElementById('cpu1-current-bet').textContent = CPU1.totalBet;
        document.getElementById('cpu2-current-bet').textContent = CPU2.totalBet;
        document.getElementById('cpu3-current-bet').textContent = CPU3.totalBet;
        document.getElementById('cpu4-current-bet').textContent = CPU4.totalBet;
        document.getElementById("round-name").textContent = "Round: Turn";

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
        cpuNextMove(CPU1, dealerHand, previousBet, "CPU1", getRandomInt(1, 9));
        cpuNextMove(CPU2, dealerHand, previousBet, "CPU2", getRandomInt(1, 9));
        cpuNextMove(CPU3, dealerHand, previousBet, "CPU3", getRandomInt(1, 9));
        cpuNextMove(CPU4, dealerHand, previousBet, "CPU4", getRandomInt(1, 9));
        document.getElementById("cpu1-move").textContent = CPU1.action;
        document.getElementById("cpu2-move").textContent = CPU2.action;
        document.getElementById("cpu3-move").textContent = CPU3.action;
        document.getElementById("cpu4-move").textContent = CPU4.action;
        document.getElementById('player-current-bet').textContent = Player.currentBet;
        document.getElementById('cpu1-current-bet').textContent = CPU1.totalBet;
        document.getElementById('cpu2-current-bet').textContent = CPU2.totalBet;
        document.getElementById('cpu3-current-bet').textContent = CPU3.totalBet;
        document.getElementById('cpu4-current-bet').textContent = CPU4.totalBet;
        document.getElementById("round-name").textContent = "Round:  River";
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
        console.log("ROUND NUMBER", roundCount);
        cpuNextMove(CPU1, dealerHand, previousBet, "CPU1", getRandomInt(1, 12));
        cpuNextMove(CPU2, dealerHand, previousBet, "CPU2", getRandomInt(1, 12));
        cpuNextMove(CPU3, dealerHand, previousBet, "CPU3", getRandomInt(1, 12));
        cpuNextMove(CPU4, dealerHand, previousBet, "CPU4", getRandomInt(1, 12));
        document.getElementById("cpu1-move").textContent = CPU1.action;
        document.getElementById("cpu2-move").textContent = CPU2.action;
        document.getElementById("cpu3-move").textContent = CPU3.action;
        document.getElementById("cpu4-move").textContent = CPU4.action;
        document.getElementById("round-name").textContent = "Round: Winner";
        disableActions(); //diable call, raise, fold
        nextRoundButton.disabled = true; //disables next round button
        newGameButton.disabled = false; //enables next round button

        
        const playerHandWeight = Game.findBestHand(Player.hand, dealerHand);
        const cpu1HandWeight = Game.findBestHand(CPU1.hand, dealerHand);
        const cpu2HandWeight = Game.findBestHand(CPU2.hand, dealerHand);
        const cpu3HandWeight = Game.findBestHand(CPU3.hand, dealerHand);
        const cpu4HandWeight = Game.findBestHand(CPU4.hand, dealerHand);
        console.log(playerHandWeight, cpu1HandWeight, cpu2HandWeight, cpu3HandWeight, cpu4HandWeight)
        playerHandWeight[2] = Game.getLargestCardValue(playerHandWeight[1]);
        cpu1HandWeight[2] = Game.getLargestCardValue(cpu1HandWeight[1]);
        cpu2HandWeight[2] = Game.getLargestCardValue(cpu2HandWeight[1]);
        cpu3HandWeight[2] = Game.getLargestCardValue(cpu3HandWeight[1]);
        cpu4HandWeight[2] = Game.getLargestCardValue(cpu4HandWeight[1]);
        console.log(playerHandWeight[0], cpu1HandWeight[0], cpu2HandWeight[0], cpu3HandWeight[0], cpu4HandWeight[0]);
        console.log(playerHandWeight[2], cpu1HandWeight[2], cpu2HandWeight[2], cpu3HandWeight[2], cpu4HandWeight[2]);
        console.log(Player.isFolded);

        // Determine the winner
        if (
            playerHandWeight !== undefined &&
            cpu1HandWeight !== undefined &&
            cpu2HandWeight !== undefined &&
            cpu3HandWeight !== undefined &&
            cpu4HandWeight !== undefined
        ) {
            // Filter out folded players
            const unfoldedPlayers = [
                ["Player", playerHandWeight, Player.isFolded],
                ["Sephen (CPU)", cpu1HandWeight, CPU1.isFolded],
                ["Trisha (CPU)", cpu2HandWeight, CPU2.isFolded],
                ["Oden (CPU)", cpu3HandWeight, CPU3.isFolded],
                ["Penelope (CPU)", cpu4HandWeight, CPU4.isFolded]
            ].filter(player => !player[2]);

            if (unfoldedPlayers.length > 0) {
                // Find the maximum hand weight among all unfolded players
                const maxHandWeight = Math.max(
                    ...unfoldedPlayers.map(player => player[1][0])
                );

                let winner;
                let winningHandType;

                // Check if there's a single winner based on hand weight
                const potentialWinners = unfoldedPlayers.filter(
                    player => player[1][0] === maxHandWeight
                );

                if (potentialWinners.length === 1) {
                    winner = potentialWinners[0][0];
                    winningHandType = findHand(potentialWinners[0][1][0]);
                } else if (potentialWinners.length > 1) {
                    // Compare largest values if there are multiple potential winners
                    let maxLargestValue = -Infinity;
                    let winningPlayer = null;

                    for (const [playerName, handWeight] of potentialWinners) {
                        if (handWeight[2] > maxLargestValue) {
                            maxLargestValue = handWeight[2];
                            winningPlayer = playerName;
                            winningHandType = findHand(handWeight[0]);
                        } else if (handWeight[2] === maxLargestValue) {
                            // Handle tie by comparing second largest value
                            if (
                                handWeight[1] >
                                potentialWinners.find(player => player[0] === winningPlayer)[1][1]
                            ) {
                                winningPlayer = playerName;
                                winningHandType = findHand(handWeight[0]);
                            }
                        }
                    }

                    winner = winningPlayer;
                }

                if (winner === "Player") {
                    Player.addFunds(gamePot);
                    gamePot = 0;
                    console.log("ADDED PLAYER FUNDS");
                }
                console.log("Winner:", winner, " with ", winningHandType);
                winner = winner + " with " + winningHandType;
                const winnerDisplay = document.getElementById('winner-display');
                updateWinnerDisplay(winner);
            } else {
                console.log("No active players remaining.");
            }
        } else {
            console.log("Error: One or more hand weights are undefined.");
        }


        Player.currentBet = 0;
        CPU1.currentBet = 0;
        CPU2.currentBet = 0;
        CPU3.currentBet = 0;
        CPU4.currentBet = 0;
        
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
        Player.totalBet = 0;
        CPU1.totalBet = 0;
        CPU2.totalBet = 0;
        CPU3.totalBet = 0;
        CPU4.totalBet = 0;
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
        setRaiseButton.disabled = false; //enables set raise button
        nextRoundButton.disabled = false; //enables next round button
        newGameButton.disabled = true; //disables next round button
        enableActions(); //enable call, raise, fold
        resetWinnerDisplay(); //resets winner
        Player.isFolded = false;
        CPU1.isFolded = false;
        CPU2.isFolded = false;
        CPU3.isFolded = false;
        CPU4.isFolded = false;
        CPU1.action = " ";
        CPU2.action = " ";
        CPU3.action = " ";
        CPU4.action = " ";
        document.getElementById("cpu1-move").textContent = CPU1.action;
        document.getElementById("cpu2-move").textContent = CPU2.action;
        document.getElementById("cpu3-move").textContent = CPU3.action;
        document.getElementById("cpu4-move").textContent = CPU4.action;
        document.getElementById("round-name").textContent = "Round: Pre Flop";
        roundCount = 1;
        gameCount++;
    }
}

main();