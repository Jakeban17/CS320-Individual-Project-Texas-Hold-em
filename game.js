class Game{
    static handOpts = {
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
    }

    //compares hands to determine round winner
    compareHands(hand1, hand2, hand3, hand4){

    }

    //will determine best hand
    findBestHand(hand, dealer){
        let bestHand = 0; // default highcard
        let combinedHand = [...hand, ...dealer]; //combined player hand and dealer hand
        n = combinedHand.length;

        bestHand = [];
        combinations = [];
        currentValue = 0;

        //set combinations[] with all possible combos
        for (let i = 0; i < n - 4; i++) {
            for (let j = i + 1; j < n - 3; j++) {
                for (let k = j + 1; k < n - 2; k++) {
                    for (let l = k + 1; l < n - 1; l++) {
                        for (let m = l + 1; m < n; m++) {
                            combinations.push([cards[i], cards[j], cards[k], cards[l], cards[m]]);
                        }
                    }
                }
            }
        }

        //goes through all combos to determine best hand
        for (const combination of combinations) {
            console.log(combination); //for testing purposes

            
        }

        return bestHand;
    }

    ///returns true if hand contains royal flush
    isRF(hand){
        const clubRF = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Clubs', value: 'King' }, { suit: 'Clubs', value: 'Queen' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Clubs', value: '10' }];
        const spadeRF = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }];
        const diamondRF = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Diamonds', value: 'King' }, { suit: 'Diamonds', value: 'Queen' }, { suit: 'Diamonds', value: 'Jack' }, { suit: 'Diamonds', value: '10' }];
        const heartRF = [{ suit: 'Hearts', value: 'Ace' }, { suit: 'Hearts', value: 'King' }, { suit: 'Hearts', value: 'Queen' }, { suit: 'Hearts', value: 'Jack' }, { suit: 'Hearts', value: '10' }];
        
        var isTrue = false;

        for (let i = 0; i < 5; i++) {
            //checks hand against clubRF
            if (hand[i].suit === clubRF[i].suit || hand[i].value === clubRF[i].value) {
                //console.log(hand[i], clubRF[i]);
                isTrue = true;
            } else{
                isTrue = false;
                //console.log("Break")
                break;
            }
        }
        if (isTrue === true){
            return true;
        }


        for (let i = 0; i < 5; i++) {
            //checks hand against spadeRF
            if (hand[i].suit === spadeRF[i].suit || hand[i].value === spadeRF[i].value) {
                isTrue = true;
            }
            else{
                isTrue = false;
                break;
            }
        }
        if (isTrue === true){
            return true;
        }

        for (let i = 0; i < 5; i++) {
            //checks hand against diamondRF
            if (hand[i].suit === diamondRF[i].suit || hand[i].value === diamondRF[i].value) {
                isTrue = true;
            }
            else{
                isTrue = false;
                break;
            }
        }
        if (isTrue === true){
            return true;
        }


        for (let i = 0; i < 5; i++) {
            //checks hand against heartRF
            if (hand[i].suit === heartRF[i].suit || hand[i].value === heartRF[i].value) {
                isTrue = true;
            }
            else{
                isTrue = false;
                break;
            }
        }
        if (isTrue === true){
            return true;
        }
        

        
        return false;
    }
    //returns true if hand contains straight flush
    isSF(hand){
        if (this.isS(hand) && this.isF(hand)){
            return true;
        }
        return false;
    }
    //returns true if hand contains 4 of a kind
    is4OK(hand){

        return "Four of a Kind";
    }
    //returns true if hand contains full house
    isFH(hand){

        return "Full House";
    }
    //returns true if hand contains flush
    isF(hand){
        const firstSuit = hand[0].suit;
        for (let i = 0; i < 5; i++) {
            if (hand[i].suit != firstSuit) {
                return false;
            }
        }
        return true;
    }
    //returns true if hand contains straight
    isS(hand){
        const handVals = this.getHandWeights(hand);
        for (let i = 0; i < 5 - 1; i++) {
            if (handVals[i] - handVals[i + 1] != 1) {
                return false;
            }
        }
        return true;
    }
    //returns true if hand contains 3 of a kind
    is3OK(hand){

        return "Three of a Kind";
    }
    //returns true if hand contains 2 pair
    is2P(hand){

        return "Two Pair";
    }
    //returns true if hand contains 1 pair
    is1P(hand){

        return "One Pair";
    }
    //returns true if hand contains high card
    isHC(){

        return "High Card";
    }

    //if two players happen to have the same hand, the hand with the highest input values will win
    ifHandSame(){

    }

    //aid hand finding logic, returns array of the values of the hand (for comparison)
    getHandWeights(hand){
        var handValues = [];
        const cardValues = {
            0: "2",
            1: "3",
            2: "4",
            3: "5",
            4: "6",
            5: "7",
            6: "8",
            7: "9",
            8: "10",
            9: "Jack",
            10: "Queen",
            11: "King",
            12: "Ace"
        };

        for (const card of hand) {
            const valueIndex = Object.values(cardValues).indexOf(card.value);
            if (valueIndex !== -1) {
                handValues.push(valueIndex);
            } else {
                console.log(`Value "${card.value}" not found in dictionary.`);
            }
        }

        return handValues;
    }


}

function testGame(){
    const game = new Game();
    //test isRF ===============================================
    console.log("TESTING isRF");
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Clubs', value: 'King' }, { suit: 'Clubs', value: 'Queen' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Clubs', value: '10' }]; //should be true
    rfTF=game.isRF(hand);
    console.log(rfTF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }]; //should be true
    rfTF=game.isRF(hand);
    console.log(rfTF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Diamonds', value: 'King' }, { suit: 'Diamonds', value: 'Queen' }, { suit: 'Diamonds', value: 'Jack' }, { suit: 'Diamonds', value: '10' }]; //should be true
    rfTF=game.isRF(hand);
    console.log(rfTF);
    hand = [{ suit: 'Hearts', value: 'Ace' }, { suit: 'Hearts', value: 'King' }, { suit: 'Hearts', value: 'Queen' }, { suit: 'Hearts', value: 'Jack' }, { suit: 'Hearts', value: '10' }]; //should be true
    rfTF=game.isRF(hand);
    console.log(rfTF);
    hand = [{ suit: 'Hearts', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '10' }]; //shoukd be false
    rfTF=game.isRF(hand);
    console.log(rfTF);
    hand = [{ suit: 'Hearts', value: '4' }, { suit: 'Spades', value: '3' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '10' }]; //should be false
    rfTF=game.isRF(hand);
    console.log(rfTF);
    //==========================================================

    //test isSF =================================================
    console.log("TESTING isSF");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rfSF=game.isF(hand);
    console.log(rfSF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }] //should be true
    rfSF=game.isF(hand);
    console.log(rfSF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rfSF=game.isF(hand);
    console.log(rfSF);
    //==========================================================

    //test is4OK =================================================
    console.log("TESTING is4OK");

    //==========================================================

    //test isFH =================================================
    console.log("TESTING isFH");

    //==========================================================

    //test isF =================================================
    console.log("TESTING isF");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rfF=game.isF(hand);
    console.log(rfF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }] //should be true
    rfF=game.isF(hand);
    console.log(rfF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rfF=game.isF(hand);
    console.log(rfF);
    //==========================================================

    //test isS =================================================
    console.log("TESTING isS");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rfS=game.isS(hand);
    console.log(rfS);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }]; //should be true
    rfS=game.isS(hand);
    console.log(rfS);
    hand = [{ suit: 'Disamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rfS=game.isS(hand);
    console.log(rfS);
    //==========================================================

    //test is3OK =================================================
    console.log("TESTING is3OK");

    //==========================================================

    //test is2P =================================================
    console.log("TESTING is2P");

    //==========================================================

    //test is1P =================================================
    console.log("TESTING is1P");

    //==========================================================

    //test isHC =================================================
    console.log("TESTING isHC");

    //==========================================================

    //test setHandWeights ======================================
    console.log("TESTING setHandWeights");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }];
    console.log(game.getHandWeights(hand));
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Clubs', value: 'King' }, { suit: 'Clubs', value: 'Queen' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Clubs', value: '10' }];
    console.log(game.getHandWeights(hand));
    //==========================================================
}

testGame();