class Deck {

    constructor(){
        this.cards = [];
        this.createDeck();
    }

    //creates the deck
    static createDeck() {
        //52 cards, full deck
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        //inputs cards into cards
        for (const suit of suits) {
            for (const value of values) {
                this.cards.push({ suit, value });
            }
        }
        console.log("UPDATE: Deck created")
    }

    //shuffle the deck
    static shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        console.log("UPDATE: Deck has been shuffled")
    }

    //deals the first card in cards[], use suffle before calling
    static dealCard(numCards) {
        if (numCards > this.cards.length) {
            console.log('ERROR: Not enough cards in the deck');
            return null;
        }
        console.log("UPDATE: Card has been dealt")
        return this.cards.splice(0, numCards);
    }
}



//TEST BELOW: run this file to just run deck tests


function testDeck() {
    const deck = new Deck();
    console.log(deck.cards);
    for (let i = 0; i < 52; i++){
        console.log(deck.cards[i]);
    }
    deck.shuffle();
    console.log(deck.cards);


    const hand = deck.dealCard(5);
    console.log(hand); 
    console.log(deck.cards.length); 

    for (let i = 0; i < 52; i++){
        console.log(deck.cards[i]);
    }
}

//testDeck();
