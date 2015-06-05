String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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
    history: [],
    attributes: {
        strength: roll(2),
        dexterity: roll(2),
        endurance: roll(2),
        intelligence: roll(2),
        education: roll(2),
        social: roll(2),
    },
    setAttributes: function () {
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
    setService: function () {
        // In which service should we try to enlist?
        var serviceScores = {
            navy: 0,
            marines: 0,
            arm: 0,
            scouts: 0,
            merchants: 0,
            other: 2
        };
        if (this.attributes.strength > 6) {
            serviceScores.marines += 2;
            serviceScores.scouts += 2;
            serviceScores.merchants += 1;
        }
        if (this.attributes.dexterity > 5) {
            serviceScores.army += 1;
        }
        if (this.attributes.endurance > 4) {
            serviceScores.army += 2;
        }
        if (this.attributes.intelligence > 5) {
            serviceScores.navy += 1;
            serviceScores.marines += 1;
            serviceScores.scouts += 1;
            serviceScores.merchants += 2;
        }
        if (this.attributes.education > 8) {
            serviceScores.navy += 2;
        }
        var highestScore = 0;
        var preferredService = 'other';
        for (var s in serviceScores) {
            if (serviceScores[s] > highestScore) {
                preferredService = s;
                highestScore = serviceScores[s];
            }
            if ((serviceScores[s] == highestScore) && (roll(1) > 4)) {
                preferredService = s;
            }
        }
        // Attempt to enlist.
        this.service = preferredService;
        var enlistmentThrows = {
            navy: 8,
            marines: 9,
            army: 5,
            scouts: 7,
            merchants: 7,
            other: 3
        };
        this.history.push('Attempted to enlist in the '
            + preferredService.cap() + '.');
        if ((roll(2) + serviceScores[preferredService]) >= enlistmentThrows[preferredService]) {
            this.history.push('Enlisted accepted.');
        } else {
            this.history.push('Enlistment denied.');
            this.service = function () {
                switch(roll(1)) {
                    case(1):
                        return 'navy';
                    case(2):
                        return 'marines';
                    case(3):
                        return 'army';
                    case(4):
                        return 'scouts';
                    case(5):
                        return 'merchants';
                    case(6):
                        return 'other';
                }
            }();
            this.history.push('Drafted into the ' + this.service.cap() + '.')
        }
    },
    toString: function () {
        return this.service.cap() + ' ' + this.rank + ' ' + this.name + '    ' 
            + this.getAttrString() + '    Age '
            + this.age + "\n" + this.terms + ' terms                Cr'
            + numCommaSep(this.credits);
    }
};

var t = Object.create(traveller);

function test() {
    t.setAttributes();
    t.setService();
    console.log(t.toString());
    for (var i = 0; i < t.history.length; i++) {
        console.log(t.history[i]);
    }
}

test();
