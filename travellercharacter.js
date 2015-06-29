function travellerCharacterGenerator(output) {
// output is 'text', 'html', or 'JSON'.
// testmode is true or false.

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
    var given = ['Adam', 'Ahmed', 'Ali', 'An', 'Ananya', 'Andrew', 'Antonio', 'Aarav', 'Bartholomew', 'Ben', 'Bo', 'Brom', 'Charles', 'Cheng', 'Daniel', 'David', 'Diego', 'Emily', 'Emma', 'Esperanza', 'Fang', 'Fatima', 'Feng', 'Finn', 'Gabriel', 'George', 'Hamza', 'Haruto', 'Hiroto', 'Isidora', 'Jack', 'Jacob', 'James', 'John', 'Juan', 'Judas', 'Lena', 'Leo', 'Logan', 'Luis', 'Luke', 'Malika', 'Mark', 'Mariam', 'Mary', 'Martha', 'Mehmet', 'Mohamed', 'Nadia', 'Nicolas', 'Noam', 'Oliver', 'Olivia', 'Omar', 'Paul', 'Philip', 'Rachid', 'Ren', 'Rin', 'Said', 'Santino', 'Sara', 'Shu', 'Simon', 'Sophia', 'Stefan', 'Thaddaeus', 'Thomas', 'Victor', 'Victoria', 'William', 'Wei', 'Wen', 'Yan', 'Yi', 'Youssef', 'Zoe'];
    var family = ['Abe', 'Anderson', 'Becker', 'Bauer', 'Brown', 'Chang', 'Chen', 'Chu', 'Cohen', 'Colombo', 'Cruz', 'Das', 'Davies', 'Díaz', 'Dubois', 'Esposito', 'Evans', 'Fernandes', 'Fontana', 'Fujii', 'García', 'Green', 'Gruber', 'Hall', 'Hernández', 'Hoffmann', 'Hon', 'Itō', 'Ivanov', 'Jensen', 'Jones', 'Kask', 'Katz', 'Kelly', 'Khan', 'Kim', 'Klein', 'Kowalski', 'Larsen', 'Lee', 'Li', 'Lin', 'Ma', 'Martin', 'Mirza', 'Moreau', 'Murphy', 'Novák', 'Ota', 'Papadopoulos', 'Pérez', 'Petrov', 'Pavlov', 'Popov', 'Quinn', 'Reyes', 'Rizzo', 'Robinson', 'Rodríguez', 'Rossi', 'Saar', 'Santos', 'Satō', 'Schmidt', 'Silva', 'Sokolov', 'Sullivan', 'Sun', 'Suzuki', 'Singh', 'Smith', 'Tamm', 'Tanaka', 'Taylor', 'Varga', 'Wagner', 'Wang', 'Watanabe', 'Weber', 'Wen', 'White', 'Williams', 'Wilson', 'Wood', 'Wu', 'Yang', 'Zhang'];
    return arnd(given) + ' ' + arnd(family);
}

function intToOrdinal(i) {
    switch (i) {
        case 1: return 'first';
        case 2: return 'second';
        case 3: return 'third';
        case 4: return 'fourth';
        case 5: return 'fifth';
        case 6: return 'sixth';
        case 7: return 'seventh';
        case 8: return 'eighth';
        case 9: return 'ninth';
        case 10: return 'tenth';
        default: return i + 'th';
    }
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
        reenlistThrow: 6,
        ranks: {
            0: 'Starman',
            1: 'Ensign',
            2: 'Lieutenant',
            3: 'Lt Cmdr',
            4: 'Commander',
            5: 'Captain',
            6: 'Admiral'
        },
        checkPromotion: function (attributes) {
            var dm = 0;
            if (attributes.education >= 8) { dm += 1; }
            if ((roll(2) + dm) >= 8) {
                return true;
            } else {
                return false;
            }
        },
        checkCommission: function(attributes) {
            var dm = 0;
            if (attributes.social >= 9) { dm += 1; }
            if ((roll(2) + dm) >= 10) {
                return true;
            } else {
                return false;
            }
        },
        musterCash: {
            1: 1000,
            2: 5000,
            3: 5000,
            4: 10000,
            5: 20000,
            6: 50000,
            7: 50000
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
        reenlistThrow: 6,
        ranks: {
            0: '',
            1: 'Lieutenant',
            2: 'Captain',
            3: 'Force Comdr',
            4: 'Lt Colonel',
            5: 'Colonel',
            6: 'Brigadier'
        },
        checkPromotion: function (attributes) {
            var dm = 0;
            if (attributes.social >= 8) { dm += 1; }
            if ((roll(2) + dm) >= 9) {
                return true;
            } else {
                return false;
            }
        },
        checkCommission: function(attributes) {
            var dm = 0;
            if (attributes.education >= 7) { dm += 1; }
            if ((roll(2) + dm) >= 9) {
                return true;
            } else {
                return false;
            }
        },
        musterCash: {
            1: 2000,
            2: 5000,
            3: 5000,
            4: 10000,
            5: 20000,
            6: 30000,
            7: 40000
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
        reenlistThrow: 7,
        ranks: {
            0: 'Trooper',
            1: 'Lieutenant',
            2: 'Captain',
            3: 'Major',
            4: 'Lt Colonel',
            5: 'Colonel',
            6: 'General'
        },
        checkPromotion: function (attributes) {
            var dm = 0;
            if (attributes.education >= 7) { dm += 1; }
            if ((roll(2) + dm) >= 6) {
                return true;
            } else {
                return false;
            }
        },
        checkCommission: function(attributes) {
            var dm = 0;
            if (attributes.endurance >= 7) { dm += 1; }
            if ((roll(2) + dm) >= 5) {
                return true;
            } else {
                return false;
            }
        },
        musterCash: {
            1: 2000,
            2: 5000,
            3: 10000,
            4: 10000,
            5: 10000,
            6: 20000,
            7: 30000
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
        reenlistThrow: 3,
        ranks: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
        checkPromotion: function (attributes) {
            return false;
        },
        checkCommission: function(attributes) {
            return false;
        },
        musterCash: {
            1: 20000,
            2: 20000,
            3: 30000,
            4: 30000,
            5: 50000,
            6: 50000,
            7: 50000
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
        reenlistThrow: 4,
        ranks: {
            1: '4th Officer',
            2: '3rd Officer',
            3: '2nd Officer',
            4: '1st Officer',
            5: 'Captain',
            6: 'Captain'
        },
        checkPromotion: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 9) { dm += 1; }
            if ((roll(2) + dm) >= 10) {
                return true;
            } else {
                return false;
            }
        },
        checkCommission: function (attributes) {
            var dm = 0;
            if (attributes.intelligence >= 6) { dm += 1; }
            if ((roll(2) + dm) >= 4) {
                return true;
            } else {
                return false;
            }
        },
        musterCash: {
            1: 1000,
            2: 5000,
            3: 10000,
            4: 20000,
            5: 20000,
            6: 40000,
            7: 40000
        }
    },
    other: {
        serviceName: 'other service', // like "in the Navy"
        memberName: '', // like "Navy Admiral Nelson"
        adjName: 'other', // like "the Naval service"
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
        reenlistThrow: 5,
        ranks: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
        checkPromotion: function (attributes) {
            return false;
        },
        checkCommission: function (attributes) {
            return false;
        },
        musterCash: {
            1: 1000,
            2: 5000,
            3: 10000,
            4: 10000,
            5: 10000,
            6: 50000,
            7: 100000
        }
    },
};

var traveller = {
    name: generateName(),
    service: 'Other',
    age: 18,
    terms: 0,
    credits: 0,
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
        var preferredService = arnd(service.services);
        var preferredServiceDM = 1;
        var thisService;
        var thisServiceDM;
        for (var i = 0, limit = service.services.length; i < limit; i++) {
            thisService = service.services[i];
            thisServiceDM = service[thisService].enlistmentDM(this.attributes);
            if (thisServiceDM > preferredServiceDM) {
                preferredService = thisService;
                preferredServiceDM = thisServiceDM;
            } else if (thisServiceDM == preferredServiceDM) {
                if (roll(2) > 7) {
                    preferredService = thisService;
                    preferredServiceDM = thisServiceDM;
                }
            }
        }
        // Attempt to enlist
        this.history.push('Attempted to enlist in '
            + service[preferredService].serviceName + '.');
        if ((roll(2) + preferredServiceDM) >= service[preferredService].enlistmentThrow) {
            this.history.push('Enlistment accepted.');
            this.service = preferredService;
        } else {
            this.history.push('Enlistment denied.');
            this.service = service.draft();
            this.history.push('Drafted into ' + service[this.service].serviceName + '.')
        }
    },
    deceased: false,
    commissioned: false,
    rank: 0,
    activeDuty: true,
    retired: false,
    doServiceTerm: function () {
        this.terms += 1;
        this.age += 4;
        // Check commission:
        if (! this.commissioned) {
            if (service[this.service].checkCommission(this.attributes)) {
                this.commissioned = true;
                this.rank += 1;
                this.history.push('Commissioned during '
                    + intToOrdinal(this.terms) + ' term of service.');
            }
        }
        // Try for promotion:
        if (this.commissioned && (this.rank < 6)) {
            if (service[this.service].checkPromotion(this.attributes)) {
                this.rank += 1;
                this.history.push('Promoted to '
                    + service[this.service].ranks[this.rank] + '.');
            }
        }
        // Check survival:
        if (! service[this.service].checkSurvival(this.attributes)) {
            this.history.push('Death in service.');
            this.deceased = true;
        }
    },
    musterOut: function () {
        var musterDM = 0;
        var musterRolls = this.terms + (function () {
            if ( this.ranks < 1) { return 0;
            } else if ((this.rank == 1) || (this.rank == 2)) { return 1;
            } else if ((this.rank == 3) || (this.rank == 4)) { return 2;
            } else if (this.rank >= 5) {
                musterDM += 1;
                return 3;
            } else {
                return 0;
            }
        }).call(this);
        debug += 'Muster rolls: ' + musterRolls + ' ' + this.terms + "\n";
        for (var i = 0, limit = musterRolls; i <= limit; i++) {
            this.credits += service[this.service].musterCash[roll(1) + musterDM];
        }
    },
    doReenlistment: function () {
        var reenlistRoll = roll(2);
        if (reenlistRoll == 12) {
            this.history.push('Manditory reenlistment for '
                + intToOrdinal(this.terms + 1) + ' term.');
        } else if (this.terms >= 7) {
            this.activeDuty = false;
            this.history.push('Mandatory retirement after '
                + intToOrdinal(this.terms) + ' term.');
        } else if (reenlistRoll < service[this.service].reenlistThrow) {
            this.activeDuty = false;
            this.history.push('Denied reenlistment after '
                + intToOrdinal(this.terms) + ' term.');
        } else if (reenlistRoll >= service[this.service].reenlistThrow) {
            if (roll(2) >= 10) {
                if (this.terms < 5) {
                    this.activeDuty = false;
                    this.history.push('Chose not to reenlist after ' 
                        + intToOrdinal(this.terms) + ' term.');
                } else {
                    this.activeDuty = false;
                    this.retired = true;
                    this.history.push('Retired after ' 
                        + intToOrdinal(this.terms) + ' term.');
                }
            } else {
                this.history.push('Voluntarily reenlisted for '
                    + intToOrdinal(this.terms + 1) + ' term.');
            }
        }
    },
    doAging: function () {
        // Age-related attribute loss?
        if (this.age < 34) {
            return;
        } else if (this.age <= 46) {
            if (roll(2) <= 8) { this.attributes['strength'] -= 1; }
            if (roll(2) <= 7) { this.attributes['dexterity'] -= 1; }
            if (roll(2) <= 8) { this.attributes['endurance'] -= 1; }
        } else if (this.age <= 62) {
            if (roll(2) <= 9) { this.attributes['strength'] -= 1; }
            if (roll(2) <= 8) { this.attributes['dexterity'] -= 1; }
            if (roll(2) <= 9) { this.attributes['endurance'] -= 1; }
        } else {
            if (roll(2) <= 9) { this.attributes['strength'] -= 1; }
            if (roll(2) <= 9) { this.attributes['dexterity'] -= 1; }
            if (roll(2) <= 9) { this.attributes['endurance'] -= 1; }
            if (roll(2) <= 9) { this.attributes['intelligence'] -= 1; }
        }
        // Aging crisis?
        for (var a in this.attributes) {
            if (this.attributes[a] < 1) {
                if (roll(2) <= 8) {
                    this.history.push("Died of illness.");
                    this.deceased = true;
                } else {
                    this.attributes[a] = 1;
                }
            }
        }
    },
    toString: function () {
        return (function() {
                if (this.deceased) {
                    return '† ';
                } else {
                    return '';
                }
            }).call(this)
            + (function () {
                if (this.service == 'other') { return ''; }
                return service[this.service].memberName + ' ';
            }).call(this)
            + (function () {
                if (service[this.service].ranks[this.rank] != '') {
                    return service[this.service].ranks[this.rank] + ' ';
                } else {
                    return '';
                }
            }).call(this)
            + this.name
            + '    ' + this.getAttrString() + '    Age '
            + this.age + "\n" 
            + (function () {
                if (this.terms == 1) {
                    return this.terms + ' term';
                } else {
                    return this.terms + ' terms';
                }
            }).call(this)
            + '                            Cr' + numCommaSep(this.credits)
            + "\n\n"
            + (function () {
                var history = "Service History:\n";
                for (var i = 0, limit = this.history.length; i < limit; i++) {
                    history = history + this.history[i] + "\n";
                }
                return history;
            }).call(this) + debug;
    }
};

function newTraveller() {
    var t = Object.create(traveller);
    t.setAttributes();
    t.setService();
    while (t.activeDuty && (! t.deceased)) {
        t.doServiceTerm();
        t.doAging();
        if (! t.deceased) {
            t.doReenlistment();
        }
    }
    t.musterOut();
    return t;
}

var debug = "\nDEBUG\n";
var TEST = true;
var t = newTraveller();
console.log(t.toString());
return t.toString();

} // End wrapper function travellerCharacterGenerator()

travellerCharacterGenerator('text');
