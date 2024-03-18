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
                            this.sortCards(combination); // Ensure the combination is sorted
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
    isRF(hand){
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
    var h = [{suit: 'Clubs', value: '10'}, {suit: 'Clubs', value: 'Jack'}]
    var d = [{suit: 'Clubs', value: 'Queen'}, {suit: 'Clubs', value: 'King'}, {suit: 'Clubs', value: 'Ace'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 9
    var h = [{suit: 'Hearts', value: '6'}, {suit: 'Hearts', value: '7'}]
    var d = [{suit: 'Hearts', value: '8'}, {suit: 'Hearts', value: '9'}, {suit: 'Hearts', value: '10'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 8
    var h = [{suit: 'Diamonds', value: 'King'}, {suit: 'Hearts', value: 'King'}]
    var d = [{suit: 'Clubs', value: 'King'}, {suit: 'Spades', value: 'King'}, {suit: 'Hearts', value: '8'}, {suit: 'Diamonds', value: 'Ace'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 7
    var h = [{suit: 'Clubs', value: '7'}, {suit: 'Hearts', value: '7'}]
    var d = [{suit: 'Spades', value: '7'}, {suit: 'Hearts', value: '8'}, {suit: 'Diamonds', value: '8'}, {suit: 'Clubs', value: '8'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 6
    var h = [{suit: 'Spades', value: '2'}, {suit: 'Spades', value: '7'}]
    var d = [{suit: 'Spades', value: '10'}, {suit: 'Spades', value: 'Jack'}, {suit: 'Spades', value: 'Queen'}, {suit: 'Spades', value: 'Ace'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 5
    var h = [{suit: 'Hearts', value: '5'}, {suit: 'Clubs', value: '6'}]
    var d = [{suit: 'Diamonds', value: '7'}, {suit: 'Spades', value: '8'}, {suit: 'Hearts', value: '9'}, {suit: 'Clubs', value: '10'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 4
    var h = [{suit: 'Diamonds', value: '2'}, {suit: 'Hearts', value: '2'}]
    var d = [{suit: 'Spades', value: '2'}, {suit: 'Hearts', value: '5'}, {suit: 'Clubs', value: '3'}, {suit: 'Diamonds', value: '4'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 3
    var h = [{suit: 'Clubs', value: '3'}, {suit: 'Hearts', value: '3'}]
    var d = [{suit: 'Spades', value: '4'}, {suit: 'Hearts', value: '4'}, {suit: 'Diamonds', value: '5'}, {suit: 'Clubs', value: '5'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 2
    var h = [{suit: 'Clubs', value: 'Ace'}, {suit: 'Hearts', value: 'Ace'}]
    var d = [{suit: 'Spades', value: 'King'}, {suit: 'Hearts', value: '4'}, {suit: 'Diamonds', value: 'Queen'}, {suit: 'Clubs', value: '7'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 1
    var h = [{suit: 'Clubs', value: 'Ace'}, {suit: 'Hearts', value: '2'}]
    var d = [{suit: 'Spades', value: '3'}, {suit: 'Hearts', value: '4'}, {suit: 'Diamonds', value: '5'}, {suit: 'Clubs', value: '7'}]
    var bH = game.findBestHand(h, d);
    console.log(bH); // should be 0
    //==========================================================
}

testGame();