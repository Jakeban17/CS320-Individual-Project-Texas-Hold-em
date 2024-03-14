class Deck {
    static cards = []; // Define cards as a static property

    constructor() {
        // No need for this.cards = []; here
    }

    //creates the deck
    static createDeck() {
        //52 cards, full deck
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        //inputs cards into cards
        for (const suit of suits) {
            for (const value of values) {
                Deck.cards.push({ suit, value }); // Access cards directly using Deck.cards
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

function main() {
    //const hostPlayer = new player(null, null);
    //const computertPlayer0 = new player(null, null);
    //const computertPlayer1 = new player(null, null);
    //const computertPlayer2 = new player(null, null);
    //const computertPlayer3 = new player(null, null);
    Deck.createDeck();
    var roundCount = 1;
    var dealerHand = [];

    Deck.shuffle();

    dealerHand = Deck.dealCard(3);
    roundCount++; 
        
    console.log(dealerHand);
    console.log(dealerHand[0]);
    console.log(dealerHand[1]);
    console.log(dealerHand[2]);
}

main();