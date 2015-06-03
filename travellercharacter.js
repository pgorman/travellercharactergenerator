function roll(rolls) {
    // Return total of six-sided dice rolls.
    var total = 0;
    for (var i = 0; i < rolls; i++) {
        total += Math.floor(Math.random() * 6 + 1);
    }
    return total;
}

function decToHex(n) {
    // Convert decimal number to hexadecimal.
    return n.toString(16).toUpperCase();
}

function hexToDec(n) {
    // Convert hexadecimal to decimal.
    return parseInt(n, 16);
}

function numCommaSep(n) {
    // Format numbers like 1,000,000.
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var traveller = {
    name: 'Alexander Jamison',
    service: 'Merchant',
    rank: 'Captain',
    age: 18,
    terms: 5,
    credits: 31200,
    attributes: {
        strength: roll(2),
        dexterity: roll(2),
        endurance: roll(2),
        intelligence: roll(2),
        education: roll(2),
        social: roll(2),
    },
    rollAttributes: function () {
        this.attributes.strength = roll(2);
        this.attributes.dexterity = roll(2);
        this.attributes.endurance = roll(2);
        this.attributes.intelligence = roll(2);
        this.attributes.education = roll(2);
        this.attributes.social = roll(2);
    },
    getAttrString: function () {
        return decToHex(this.attributes.strength)
            + decToHex(this.attributes.dexterity)
            + decToHex(this.attributes.endurance)
            + decToHex(this.attributes.intelligence)
            + decToHex(this.attributes.education)
            + decToHex(this.attributes.social);
    },
    toString: function () {
        return this.name + '    ' + this.getAttrString() + '    Age '
            + this.age + "\n" + this.terms + ' terms                Cr'
            + numCommaSep(this.credits);
    }
};

var t = Object.create(traveller);

function test() {
    t.rollAttributes();
    console.log(t.toString());
}

test();
