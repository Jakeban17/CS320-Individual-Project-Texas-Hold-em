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
    findBestHand(hand, dealer){
        //let bestHand = 0; // default highcard
        let combinedHand = [...hand, ...dealer]; //combined player hand and dealer hand
        const n = combinedHand.length;

        var bestHand = [];
        var combinations = [];
        var currentValue = 0;

        //set combinations[] with all possible combos
        for (let i = 0; i < n - 4; i++) {
            for (let j = i + 1; j < n - 3; j++) {
                for (let k = j + 1; k < n - 2; k++) {
                    for (let l = k + 1; l < n - 1; l++) {
                        for (let m = l + 1; m < n; m++) {
                            combinations.push([combinedHand[i], combinedHand[j], combinedHand[k], combinedHand[l], combinedHand[m]]);
                        }
                    }
                }
            }
        }
        
        //goes through all combos to determine best hand
        for (const combination of combinations) {
            console.log(combination);
            console.log(combination[0]);
            console.log(combination[1]);
            console.log(combination[2]);
            console.log(combination[3]);
            console.log(combination[4]);

            
        }
        var bestHand;
        var bestScore;
        var currentScore;
        for (const combination of combinations) {
            if (this.isRF(combination) === true) {
                console.log(this.isRF(combination));
                currentScore = 9;
            }
            else if (this.isSF(combination) == true) {
                currentScore = 8;
            }
            else if (this.is4OK(combination) == true) {
                currentScore = 7;
            }
            else if (this.isFH(combination) == true) {
                currentScore = 6;
            }
            else if (this.isF(combination) == true) {
                currentScore = 5;
            }
            else if (this.isS(combination) == true) {
                
                currentScore = 4;
            }
            else if (this.is3OK(combination) == true) {
                currentScore = 3;
            }
            else if (this.is2P(combination) == true) {
                currentScore = 2;
            }
            else if (this.is41P(combination) == true) {
                currentScore = 1;
            }
            else{

            }

            if (currentScore > bestScore){
                bestScore = currentScore;
                bestHand = combination;
            }
            
        }

        return currentScore;
    }

    ///returns true if hand contains royal flush
    isRF(hand){
        const allSameSuit = hand.every(card => card.suit === hand[0].suit);
        if (!allSameSuit) {
            return false; 
        }
        const sortedHand = hand.sort((a, b) => {   //sorts hand
            const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
            return ranks.indexOf(a.value) - ranks.indexOf(b.value);
        });
        const expectedValues = ['10', 'Jack', 'Queen', 'King', 'Ace'];
        for (let i = 0; i < 5; i++) {
            if (sortedHand[i].value !== expectedValues[i]) {
                return false; 
            }
        }

        return true; 
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
    isFH(hand){
        return this.is3OK(hand) && this.is1P(hand);   //calls 3OK and 1P, if it has both then true
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
        const sortedHand = this.sortCards(hand);
        for (let i = 0; i < 4; i++) {
            if (this.cardValues[sortedHand[i + 1].value] - this.cardValues[sortedHand[i].value] !== 1) {
                return false;
            }
        }
        return true;
    }
    
    //returns true if hand contains 3 of a kind
    is3OK(hand){
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
    is2P(hand){
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
    is1P(hand){
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
    isHC(hand){
        const cardValues = this.getHandWeights(hand);
        return Math.max(...cardValues);
    }

    //if two players happen to have the same hand, the hand with the highest input values will win
    ifHandSame(){

    }

    //aid hand finding logic, returns array of the values of the hand (for comparison)
    getHandWeights(hand){
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
    sortCards(cards) {
        return cards.sort((a, b) => this.cardValues[a.value] - this.cardValues[b.value]);
    }

}




function testGame(){
    const game = new Game();
    //test isRF ===============================================
    console.log("\nTESTING isRF");
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Clubs', value: 'King' }, { suit: 'Clubs', value: 'Queen' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Clubs', value: '10' }]; //should be true
    rTF=game.isRF(hand);
    console.log(rTF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }]; //should be true
    rTF=game.isRF(hand);
    console.log(rTF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Diamonds', value: 'King' }, { suit: 'Diamonds', value: 'Queen' }, { suit: 'Diamonds', value: 'Jack' }, { suit: 'Diamonds', value: '10' }]; //should be true
    rTF=game.isRF(hand);
    console.log(rTF);
    hand = [{ suit: 'Hearts', value: 'Ace' }, { suit: 'Hearts', value: 'King' }, { suit: 'Hearts', value: 'Queen' }, { suit: 'Hearts', value: 'Jack' }, { suit: 'Hearts', value: '10' }]; //should be true
    rTF=game.isRF(hand);
    console.log(rTF);
    hand = [{ suit: 'Hearts', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '10' }]; //shoukd be false
    rTF=game.isRF(hand);
    console.log(rTF);
    hand = [{ suit: 'Hearts', value: '4' }, { suit: 'Spades', value: '3' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '10' }]; //should be false
    rTF=game.isRF(hand);
    console.log(rTF);
    //==========================================================

    //test isSF =================================================
    console.log("\nTESTING isSF");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rSF=game.isF(hand);
    console.log(rSF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }] //should be true
    rSF=game.isF(hand);
    console.log(rSF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rSF=game.isF(hand);
    console.log(rSF);
    //==========================================================

    //test is4OK =================================================
    console.log("\nTESTING is4OK");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Hearts', value: '6' }, { suit: 'Spades', value: '6' }, { suit: 'Diamonds', value: '6' }, { suit: 'Diamonds', value: '2' }]; //should be true
    r4OK=game.is4OK(hand);
    console.log(r4OK);
    hand = [{ suit: 'Spades', value: '6' }, { suit: 'Hearts', value: 'Ace' }, { suit: 'Diamonds', value: 'Ace' }, { suit: 'Diamonds', value: 'Ace' }, { suit: 'Spades', value: 'Ace' }]; //should be true
    r4OK=game.is4OK(hand);
    console.log(r4OK);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    r4OK=game.is4OK(hand);
    console.log(r4OK);
    //==========================================================

    //test isFH =================================================
    console.log("\nTESTING isFH");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Spades', value: '6' }, { suit: 'Hearts', value: '6' }, { suit: 'Diamonds', value: '5' }, { suit: 'Clubs', value: '5' }]; //should be true
    rFH=game.isFH(hand);
    console.log(rFH);
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Hearts', value: 'Ace' }, { suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: 'King' }]; //should be true
    rFH=game.isFH(hand);
    console.log(rFH);
    hand = [{ suit: 'Clubs', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Hearts', value: 'Jack' }, { suit: 'Diamonds', value: '10' }, { suit: 'Clubs', value: '9S' }]; //should be true
    rFH=game.isFH(hand);
    console.log(rFH);
    //==========================================================

    //test isF =================================================
    console.log("\nTESTING isF");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rF=game.isF(hand);
    console.log(rF);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }] //should be true
    rF=game.isF(hand);
    console.log(rF);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rF=game.isF(hand);
    console.log(rF);
    //==========================================================

    //test isS =================================================
    console.log("\nTESTING isS");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }]; //should be true
    rS=game.isS(hand);
    console.log(rS);
    hand = [{ suit: 'Spades', value: 'Ace' }, { suit: 'Spades', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Spades', value: '10' }]; //should be true
    rS=game.isS(hand);
    console.log(rS);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    rS=game.isS(hand);
    console.log(rS);
    //==========================================================

    //test is3OK =================================================
    console.log("\nTESTING is3OK");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Hearts', value: '6' }, { suit: 'Spades', value: '6' }, { suit: 'Hearts', value: '3' }, { suit: 'Diamonds', value: '2' }]; //should be true
    r3OK=game.is3OK(hand);
    console.log(r3OK);
    hand = [{ suit: 'Spades', value: '6' }, { suit: 'Hearts', value: 'Ace' }, { suit: 'Hearts', value: '4' }, { suit: 'Diamonds', value: 'Ace' }, { suit: 'Spades', value: 'Ace' }]; //should be true
    r3OK=game.is3OK(hand);
    console.log(r3OK);
    hand = [{ suit: 'Diamonds', value: 'Ace' }, { suit: 'Clubs', value: '4' }, { suit: 'Hearts', value: '7' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Spades', value: 'Ace' }]; //should be false
    r3OK=game.is3OK(hand);
    console.log(r3OK);
    //==========================================================

    //test is2P =================================================
    console.log("\nTESTING is2P");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '6' }, { suit: 'Spades', value: '5' }, { suit: 'Spades', value: '5' }, { suit: 'Diamonds', value: '4' }]; //should be true
    r2P=game.is2P(hand);
    console.log(r2P);
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Hearts', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'King' }, { suit: 'Hearts', value: 'Ace' }]; //should be true
    r2P=game.is2P(hand);
    console.log(r2P);
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Spades', value: '5' }, { suit: 'Spades', value: '4' }, { suit: 'Hearts', value: '3' }, { suit: 'Diamonds', value: '2' }]; //should be false
    r2P=game.is2P(hand);
    console.log(r2P);
    //==========================================================

    //test is1P =================================================
    console.log("\nTESTING is1P");
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Hearts', value: 'Jack' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'King' }, { suit: 'Hearts', value: 'Ace' }]; //should be true
    r1P=game.is1P(hand);
    console.log(r1P);
    hand = [{ suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '3' }, { suit: 'Spades', value: '4' }, { suit: 'Hearts', value: '4' }, { suit: 'Hearts', value: '5' }]; //should be true
    r1P=game.is1P(hand);
    console.log(r1P);
    hand = [{ suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '3' }, { suit: 'Spades', value: '4' }, { suit: 'Hearts', value: '5' }, { suit: 'Hearts', value: '6' }]; //should be true
    r1P=game.is1P(hand);
    console.log(r1P);
    //==========================================================

    //test isHC =================================================
    console.log("\nTESTING isHC");
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Hearts', value: 'King' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Spades', value: 'Jack' }, { suit: 'Hearts', value: '10' }]; //should be 14
    rHC=game.isHC(hand);
    console.log(rHC);
    hand = [{ suit: 'Clubs', value: '2' }, { suit: 'Hearts', value: '3' }, { suit: 'Spades', value: '4' }, { suit: 'Spades', value: '5' }, { suit: 'Hearts', value: '6' }]; //should be 6
    rHC=game.isHC(hand);
    console.log(rHC);
    hand = [{ suit: 'Clubs', value: '5' }, { suit: 'Hearts', value: '3' }, { suit: 'Spades', value: '7' }, { suit: 'Spades', value: 'Queen' }, { suit: 'Hearts', value: '2' }]; //should be 12
    rHC=game.isHC(hand);
    console.log(rHC);
    //==========================================================

    //test setHandWeights ======================================
    console.log("\nTESTING setHandWeights");
    hand = [{ suit: 'Clubs', value: '6' }, { suit: 'Clubs', value: '5' }, { suit: 'Clubs', value: '4' }, { suit: 'Clubs', value: '3' }, { suit: 'Clubs', value: '2' }];
    console.log(game.getHandWeights(hand));
    hand = [{ suit: 'Clubs', value: 'Ace' }, { suit: 'Clubs', value: 'King' }, { suit: 'Clubs', value: 'Queen' }, { suit: 'Clubs', value: 'Jack' }, { suit: 'Clubs', value: '10' }];
    console.log(game.getHandWeights(hand));
    //==========================================================

    //test findBestHand ========================================
    console.log("\nTESTING setHandWeights");
    var h = [{suit: 'Clubs', value: '2'}, {suit: 'Clubs', value: '3'}]
    var d = [{suit: 'Clubs', value: '4'}, {suit: 'Clubs', value: '5'}, {suit: 'Clubs', value: '6'}, {suit: 'Clubs', value: '7'}, {suit: 'Clubs', value: '8'}]
    var bH = game.findBestHand(h, d);
    console.log(bH)
    var h = [{suit: 'Clubs', value: 'Ace'}, {suit: 'Clubs', value: '3'}]
    var d = [{suit: 'Clubs', value: 'Queen'}, {suit: 'Clubs', value: '10'}, {suit: 'Clubs', value: 'King'}, {suit: 'Clubs', value: 'Jack'}, {suit: 'Clubs', value: '8'}]
    var bH = game.findBestHand(h, d);
    console.log(bH)
    //==========================================================
}

testGame();