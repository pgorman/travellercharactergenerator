function roll(rolls) {
    var total = 0;
    for (var i = 0; i < rolls; i++) {
        total += Math.floor(Math.random() * 6 + 1);
    }
    return total;
}

function intToHex(n) {
    // Accept integer 1-16, return hexadecimal 0-F character.
    switch(n) {
        case 1: return '0';
        case 2: return '1';
        case 3: return '2';
        case 4: return '3';
        case 5: return '4';
        case 6: return '5';
        case 7: return '6';
        case 8: return '7';
        case 9: return '8';
        case 10: return '9';
        case 11: return 'A';
        case 12: return 'B';
        case 13: return 'C';
        case 14: return 'D';
        case 15: return 'E';
        case 16: return 'F';
    }
}

var traveller = {
    name: 'Alexander jamison',
    service: 'Merchant',
    rank: 'Captain',
    age: '38',
    terms: 5,
    credits: 31200,
    attributes: {
        strength: '7',
        dexterity: '7',
        endurance: '9',
        intelligence: 'C',
        education: '9',
        social: '9',
    },
    rollAttributes: function () {
        this.attributes.strength = roll(2);
        this.attributes.dexterity = roll(2);
        this.attributes.endurance = roll(2);
        this.attributes.intelligence = roll(2);
        this.attributes.education = roll(2);
        this.attributes.social = roll(2);
    },
};

var t = Object.create(traveller);

function test() {
    t.rollAttributes();
    console.log(intToHex(11));
    console.log(t.attributes.strength);
}

test();
