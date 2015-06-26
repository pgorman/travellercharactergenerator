function travellerCharacterGenerator(output, count, testmode) {

String.prototype.capitalize = function() {
    // Accept "word" and return "Word".
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function arnd(a) {
    // Return random element of array a.
    var i = Math.floor(Math.random() * (a.length));
    if (typeof a[i] === 'function') {
        return a[i]();
    }
    return a[i];
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

function generateName() {
    return 'Alexander Jamison';
}

var service = {
    services: ['navy', 'marines', 'army', 'scouts', 'merchants', 'other'],
    draft: function () {
        return arnd(this.services);
    },
    navy: {
        serviceName: 'Navy', // like "in the Navy"
        memberName: 'Navy', // like "Navy Admiral Nelson"
        adjName: "Naval", // like "the Naval service"
        enlistmentThrow: 8,
        enlistmentDM: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 8) { dm += 1; }
            if (attributes.education >= 9) { dm += 2; }
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 7) { dm += 2; }
            if ((roll(2) + dm) >= 5) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: 'Ensign',
            2: 'Lieutenant',
            3: 'Lt Cmdr',
            4: 'Commander',
            5: 'Captain',
            6: 'Admiral'
        },
        checkCommission: function(attributes) {
            var dm = 0;
            if (attributes.social >= 9) { dm += 2; }
            if ((roll(2) + dm) >= 10) {
                return true;
            } else {
                return false;
            }
        }
    },
    marines: {
        serviceName: 'Marines', // like "in the Navy"
        memberName: 'Marine', // like "Navy Admiral Nelson"
        adjName: 'Marines', // like "the Naval service"
        enlistmentThrow: 9,
        enlistmentDM: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 8) { dm += 1; }
            if (attributes.strength >= 8) { dm += 2; }
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.endurance >= 8) { dm += 2; }
            if ((roll(2) + dm) >= 6) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: 'Lieutenant',
            2: 'Captain',
            3: 'Force Comdr',
            4: 'Lt Colonel',
            5: 'Colonel',
            6: 'Brigadier'
        }
    },
    army: {
        serviceName: 'Army', // like "in the Navy"
        memberName: 'Army', // like "Navy Admiral Nelson"
        adjName: 'Army', // like "the Naval service"
        enlistmentThrow: 5,
        enlistmentDM: function (attributes) {
            var dm = 0;
            if (attributes.dexterity >= 6) { dm += 1; }
            if (attributes.endurance >= 5) { dm += 2; }
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.education >= 5) { dm += 2; }
            if ((roll(2) + dm) >= 5) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: 'Lieutenant',
            2: 'Captain',
            3: 'Major',
            4: 'Lt Colonel',
            5: 'Colonel',
            6: 'General'
        }
    },
    scouts: {
        serviceName: 'Scouts', // like "in the Navy"
        memberName: 'Scout', // like "Navy Admiral Nelson"
        adjName: 'Scout', // like "the Naval service"
        enlistmentThrow: 7,
        enlistmentDM: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 6) { dm += 1; }
            if (attributes.strength >= 8) { dm += 2; }
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.endurance >= 9) { dm += 2; }
            if ((roll(2) + dm) >= 7) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: ''
        }
    },
    merchants: {
        serviceName: 'Merchants', // like "in the Navy"
        memberName: 'Merchant', // like "Navy Admiral Nelson"
        adjName: 'Merchant', // like "the Naval service"
        enlistmentThrow: 7,
        enlistmentDM: function (attributes) {
            var dm = 0;
            if (attributes.strength >= 7) { dm += 1; }
            if (attributes.intelligence >= 6) { dm += 2; }
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 7) { dm += 2; }
            if ((roll(2) + dm) >= 5) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: '4th Officer',
            2: '3rd Officer',
            3: '2nd Officer',
            4: '1st Officer',
            5: 'Captain',
            6: ''
        }
    },
    other: {
        serviceName: 'Other', // like "in the Navy"
        memberName: 'Other', // like "Navy Admiral Nelson"
        adjName: 'Other', // like "the Naval service"
        enlistmentThrow: 3,
        enlistmentDM: function (attributes) {
            var dm = 0;
            return dm;
        },
        checkSurvival: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 9) { dm += 2; }
            if ((roll(2) + dm) >= 5) {
                return true;
            } else {
                return false;
            }
        },
        ranks: {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: ''
        }
    },
};

var traveller = {
    name: generateName(),
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
    setService: function() {
        // In which service should we try to enlist?
        var preferredService = 'other';
        var preferredServiceDM = 1;
        var thisService;
        var thisServiceDM;
        for (var i = 0, limit = service.services.length; i < limit; i++) {
            thisService = service.services[i];
            thisServiceDM = service[thisService].enlistmentDM(this.attributes);
            if (thisServiceDM > preferredServiceDM) {
                preferredService = thisService;
                preferredServiceDM = thisServiceDM;
            }
        }
        // Attempt to enlist
        this.history.push('Attempted to enlist in the '
            + service[preferredService].serviceName + '.');
        if ((roll(2) + preferredServiceDM) >= service[preferredService].enlistmentThrow) {
            this.history.push('Enlisted accepted.');
            this.service = preferredService;
        } else {
            this.history.push('Enlistment denied.');
            this.service = service.draft();
            this.history.push('Drafted into the ' + service[this.service].serviceName + '.')
        }
    },
    deceased: false,
    doServiceTerm: function() {
        // Check survival:
        if (service[this.service].checkSurvival(this.attributes) !== true) {
            this.history.push('Died during service.');
            this.deceased = true;
        }
    },
    toString: function () {
        return this.service.capitalize() + ' ' + this.rank + ' ' + this.name 
            + '    ' + this.getAttrString() + '    Age '
            + this.age + "\n" + this.terms + ' terms                Cr'
            + numCommaSep(this.credits);
    }
};

var t = Object.create(traveller);

function test() {
    t.setAttributes();
    t.setService();
    t.doServiceTerm();
    console.log('Deceased: ' + t.deceased);
    console.log(t.toString());
    for (var i = 0; i < t.history.length; i++) {
        console.log(t.history[i]);
    }
}

if ((testmode == 'test') || (testmode == true)) {
    var TEST = true;
    test();
} else {
    var TEST = false;
}

} // End wrapper function travellerCharacterGenerator()

travellerCharacterGenerator('text', '1', 'test');
