class Deck {
    static cards = []; 

    constructor() {
        
    }

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
}

class Player{
    constructor(balance = 0){
        this.balance = balance;
        this.hand = [];
    }

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

class DisplayCard {
    constructor(){
        this.cardValues = {
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
        this.cardSuits = {
            'Clubs': "C", 
            'Spades': "S", 
            'Hearts': "H", 
            'Diamonds': "D", 
        };
    }

    findFileName(card){
        var cardValue = card.value;
        var cardSuit = card.suit;

        if (cardValue in this.cardValues && cardSuit in this.cardSuits) {
            return "PlayingCards/" + this.cardValues[cardValue] + this.cardSuits[cardSuit] + ".png";
        } else {
            return "PlayingCards/Card.png";
        }
    }
}

function main() {
    Deck.createDeck();
    var roundCount = 1;
    var dealerHand = [];

    Deck.shuffle();

    dealerHand = Deck.dealCard(3);
    Player.addToHand(Deck.dealCard(2))
        
    console.log("D:",dealerHand[0]);
    console.log("D:",dealerHand[1]);
    console.log("D:",dealerHand[2]);
    console.log("P:",Player.hand[0]);
    console.log("P:",Player.hand[1]);
}

main();