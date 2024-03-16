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

function testDisplayCard(){
    const card = {
        value: '4',
        suit: 'Hearts'
    };
    const displayCard = new DisplayCard(); 
    const fileName = displayCard.findFileName(card);
    console.log(fileName);
}

testDisplayCard(); 