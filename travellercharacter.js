function travellerCharacterGenerator(output) {
// output is 'text', 'html', or 'JSON'.

String.prototype.capitalize = function() {
    // Accept "word" and return "Word".
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

function generateName(gender) {
    if (gender == 'female') { // Female names
        var given = ['Alice', 'Ananya', 'Cai', 'Chloe', 'Emily', 'Emma', 'Esperanza', 'Fang', 'Fatima', 'Freja', 'Harper', 'Isidora', 'Kayla', 'Khadija', 'Lena', 'Malika', 'Mariam', 'Mary', 'Martha', 'Milagrosa', 'Nadia', 'Nina', 'Olivia', 'Petra', 'Rin', 'Sara', 'Shu', 'Sophia', 'Trisha', 'Valentina', 'Victoria', 'Xia', 'Yan', 'Zhen', 'Zoe'];
    } else {
        var given = ['Adam', 'Ahmed', 'Ali', 'An', 'Andrew', 'Antonio', 'Aarav', 'Aziz', 'Bartholomew', 'Ben', 'Bo', 'Brom', 'Bruno', 'Charles', 'Cheng', 'Daniel', 'David', 'Diego', 'Feng', 'Finn', 'Gabriel', 'George', 'Hamza', 'Haruto', 'Hiroto', 'Jack', 'Jacob', 'James', 'John', 'Juan', 'Judas', 'Leo', 'Logan', 'Luis', 'Luke', 'Mark', 'Mehmet', 'Mohamed', 'Nicolas', 'Noam', 'Oliver', 'Omar', 'Paul', 'Peng', 'Philip', 'Rachid', 'Ren', 'Said', 'Santino', 'Simon', 'Stefan', 'Thaddaeus', 'Thomas', 'Victor', 'William', 'Wei', 'Wen', 'Yi', 'Youssef'];
    }
    var family = ['Abe', 'Anderson', 'Becker', 'Bauer', 'Brown', 'Chang', 'Chen', 'Chu', 'Cohen', 'Colombo', 'Cruz', 'Das', 'Davies', 'Díaz', 'Dubois', 'Esposito', 'Evans', 'Fernandes', 'Fontana', 'Fujii', 'García', 'Green', 'Gruber', 'Hall', 'Hernández', 'Hoffmann', 'Hon', 'Itō', 'Ivanov', 'Jensen', 'Jones', 'Kask', 'Katz', 'Kelly', 'Khan', 'Kim', 'Klein', 'Kowalski', 'Larsen', 'Lee', 'Li', 'Lin', 'Ma', 'Martin', 'Mirza', 'Moreau', 'Murphy', 'Novák', 'Ota', 'Papadopoulos', 'Pérez', 'Petrov', 'Pavlov', 'Popov', 'Quinn', 'Reyes', 'Rizzo', 'Robinson', 'Rodríguez', 'Rossi', 'Saar', 'Santos', 'Satō', 'Schmidt', 'Silva', 'Sokolov', 'Sullivan', 'Sun', 'Suzuki', 'Singh', 'Smith', 'Tamm', 'Tanaka', 'Taylor', 'Varga', 'Wagner', 'Wang', 'Watanabe', 'Weber', 'Wen', 'White', 'Williams', 'Wilson', 'Wood', 'Wu', 'Yang', 'Zhang'];
    return arnd(given) + ' ' + arnd(family);
}

function amatch(a1, a2) {
    // Return first element in array a1 also present in array a2.
    for (var i = 0, limit = a1.length; i < limit; i++) {
        if (a2.indexOf(a1[i]) > -1) {
            return ai[i];
        } else {
            return false;
        }
    }
}

//-------- "skill" holds service-independent skill definitions --------//
var skills = {};
skills.getBlade = function () {
    var blades = ['Dagger', 'Foil', 'Sword', 'Cutlass', 'Broadsword', 'Bayonet', 'Spear', 'Halberd', 'Pike', 'Cudgel'];
    // Call with skills.getBlade.call(t)
    if (this.service == 'marine') {
        return 'Cutlass';
    } else if (amatch()) {
////////////////////////////////////-----------------------------------
    }
}

//---------------- "s" object holds service definitions ----------------//
var s = {};
s.services = ['navy', 'marines', 'army', 'scouts', 'merchants', 'other'];
s.draft = function () {
    return arnd(this.services);
};
//---------------- Define "Navy" service ----------------//
s.navy = {
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
    getServiceSkills: function () { return []; },
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
    doPromotion: function() {
        if (this.rank == 5 || 6) {
            this.attributes.social += 1;
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
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 1;
                break;
            case 3:
                this.attributes.education += 1;
                break;
            case 4:
                this.addSkill('Blade');
                break;
            case 5:
                if (this.benefits.indexOf("Travellers' Aide Society") > -1) {
                    break;
                }
                this.benefits.push("Travellers' Aid Society");
                break
            case 6:
                this.benefits.push('High Passage');
                break;
            default:
                this.attributes.social += 2;
        }
    },
    acquireSkill: function () {
        // Skills acquired during a term of service.
        switch(rndInt(1, 3) + (this.attributes.education >= 8 ? 1 : 0)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.attributes.strength += 1; break;
                    case 2: this.attributes.dexterity += 1; break;
                    case 3: this.attributes.endurance += 1; break;
                    case 4: this.attributes.intelligence += 1; break;
                    case 5: this.attributes.education += 1; break;
                    default: this.attributes.social += 1;
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: this.addSkill('Ships_Boat'); break;
                    case 2: this.addSkill('Vacc_Suit'); break;
                    case 3: this.addSkill('Fwd_Obsvr'); break;
                    case 4: this.addSkill('Gunnery'); break;
                    case 5: this.addSkill('Blade'); break;
                    default: this.addSkill('Gun'); break;
                }
        }
    }
};
//---------------- Define "Marines" service ----------------//
s.marines = {
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
    getServiceSkills: function () { return ['Cutlass']; },
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
    doPromotion: function() {
        if (this.rank == 1) {
            this.addSkill('Revolver');
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
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 1;
                break;
            case 3:
                this.attributes.education += 1;
                break;
            case 4:
                this.addSkill('Blade');
                break;
            case 5:
                if (this.benefits.indexOf("Travellers' Aide Society") > -1) {
                    break;
                }
                this.benefits.push("Travellers' Aid Society");
                break
            case 6:
                this.benefits.push('High Passage');
                break;
            default:
                this.attributes.social += 2;
        }
    }
};
//---------------- Define "Army" service ----------------//
s.army = {
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
    getServiceSkills: function () { return ['Rifle']; },
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
    doPromotion: function() {
        if (this.rank == 1) {
            this.addSkill('SMG');
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
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 1;
                break;
            case 3:
                this.attributes.education += 1;
                break;
            case 4:
                this.addSkill('Gun');
                break;
            case 5:
                this.benefits.push('High Passage');
                break
            case 6:
                this.benefits.push('Middle Passage');
                break;
            default:
                this.attributes.social += 1;
        }
    }
};
//---------------- Define "Scouts" service ----------------//
s.scouts = {
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
    getServiceSkills: function () { return ['Pilot']; },
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
    doPromotion: function() { return; },
    musterCash: {
        1: 20000,
        2: 20000,
        3: 30000,
        4: 30000,
        5: 50000,
        6: 50000,
        7: 50000
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 2;
                break;
            case 3:
                this.attributes.education += 2;
                break;
            case 4:
                this.addSkill('Blade');
                break;
            case 5:
                this.addSkill('Gun');
                break
            case 6:
                if (this.benefits.indexOf('Scout Ship') > -1) {
                    break;
                }
                this.benefits.push('Scout Ship');
                break;
            default:
                this.attributes.social += 1;
        }
    }
};
//---------------- Define "Merchant" service ----------------//
s.merchants = {
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
    getServiceSkills: function () { return []; },
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
    doPromotion: function() {
        if (this.rank == 1) {
            this.addSkill('Pilot');
        }
    },
    doPromotion: function() { return; },
    musterCash: {
        1: 1000,
        2: 5000,
        3: 10000,
        4: 20000,
        5: 20000,
        6: 40000,
        7: 40000
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 1;
                break;
            case 3:
                this.attributes.education += 1;
                break;
            case 4:
                this.addSkill('Gun');
                break;
            case 5:
                this.addSkill('Blade');
                break
            case 6:
                this.benefits.push('Low Passage');
                break;
            default:
                this.benefits.push('Free Trader');
        }
    }
};
//---------------- Define "Other" service ----------------//
s.other = {
    serviceName: 'other service', // like "in the Navy"
    memberName: '', // like "Navy Admiral Nelson"
    adjName: 'other', // like "the Naval service"
    enlistmentThrow: 3,
    enlistmentDM: function (attributes) {
        var dm = 0;
        return dm;
    },
    getServiceSkills: function () { return []; },
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
    doPromotion: function() { return; },
    musterCash: {
        1: 1000,
        2: 5000,
        3: 10000,
        4: 10000,
        5: 10000,
        6: 50000,
        7: 100000
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.benefits.push('Low Passage');
                break;
            case 2:
                this.attributes.intelligence += 1;
                break;
            case 3:
                this.attributes.education += 1;
                break;
            case 4:
                this.addSkill('Gun');
            case 5:
                this.benefits.push('High Passage');
                break;
            default:
                break;
        }
    }
};

//------------ "t" object holds Traveller character definitions ------------//
var t = {};
t.age = 18;
t.gender = function () {
    if (roll(1) <= 2) {
        return 'female';
    } else {
        return 'male';
    }
}();
t.name = generateName(t.gender);
t.terms = 0;
t.credits = 0;
t.history = [];
t.benefits = [];
t.attributes = {
    strength: roll(2),
    dexterity: roll(2),
    endurance: roll(2),
    intelligence: roll(2),
    education: roll(2),
    social: roll(2),
};
t.getAttrString = function () {
    return decToHex(t.attributes.strength)
        + decToHex(t.attributes.dexterity)
        + decToHex(t.attributes.endurance)
        + decToHex(t.attributes.intelligence)
        + decToHex(t.attributes.education)
        + decToHex(t.attributes.social);
};
t.skillPoints = 1;
t.skills = [];
t.checkSkill = function (skill) {
    var skillKnown = false;
    for (var i = 0, limit = t.skills.length; i < limit; i++) {
        if (t.skills[i][0] == skill) {
            skillKnown = true;
        }
    }
    return skillKnown;
}
t.addSkill = function (skill, skillLevel) {
    if (! skillLevel) {
        var skillLevel = 1;
    }
    if (t.skills.length == 0) {
        t.skills.push([skill, skillLevel]);
        return;
    }
    if (t.checkSkill(skill)) {
        for (var i = 0, limit = t.skills.length; i < limit; i++) {
            if (t.skills[i][0] == skill) {
                t.skills[i][1] += skillLevel;
            }
        }
    } else {
        t.skills.push([skill, skillLevel]);
    }
};
t.service = function() {
    // In which service should we try to enlist?
    var preferredService = arnd(s.services);
    var preferredServiceDM = 1;
    var thisService;
    var thisServiceDM;
    for (var i = 0, limit = s.services.length; i < limit; i++) {
        thisService = s.services[i];
        thisServiceDM = s[thisService].enlistmentDM(t.attributes);
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
    t.history.push('Attempted to enlist in '
        + s[preferredService].serviceName + '.');
    if ((roll(2) + preferredServiceDM) >= s[preferredService].enlistmentThrow) {
        t.history.push('Enlistment accepted.');
        var serviceSkills = s[preferredService].getServiceSkills();
        for (var i = 0, limit = serviceSkills.length; i < limit; i++) {
            t.addSkill(serviceSkills[i]);
        }
        return preferredService;
    } else {
        t.history.push('Enlistment denied.');
        var draftService = s.draft();
        t.history.push('Drafted into ' + draftService + '.')
        var serviceSkills = s[draftService].getServiceSkills();
        for (var i = 0, limit = serviceSkills.length; i < limit; i++) {
            t.addSkill(serviceSkills[i]);
        }
        return draftService;
    }
}();
t.deceased = false;
t.commissioned = false;
t.rank = 0;
t.activeDuty = true;
t.retired = false;
t.retirementPay = 0;
t.doServiceTerm = function () {
    t.terms += 1;
    t.age += 4;
    if (t.service == 'scouts') {
        t.skillPoints += 2;
    } else {
        t.skillPoints += 1;
    }
    // Check commission:
    if (! t.commissioned) {
        if (s[t.service].checkCommission(t.attributes)) {
            t.commissioned = true;
            t.rank += 1;
            t.skillPoints += 1;
            s[t.service].doPromotion.call(t);
            t.history.push('Commissioned during '
                + intToOrdinal(t.terms) + ' term of service.');
        }
    }
    // Try for promotion:
    if (t.commissioned && (t.rank < 6)) {
        if (s[t.service].checkPromotion(t.attributes)) {
            t.rank += 1;
            t.skillPoints += 1;
            t.history.push('Promoted to '
                + s[t.service].ranks[t.rank] + '.');
        }
    }
    // Check survival:
    if (! s[t.service].checkSurvival(t.attributes)) {
        t.history.push('Death in service.');
        t.deceased = true;
    }
};
t.musterOut = function () {
    // What cash and non-cash benefits do we get when mustering out?
    var cashDM = 0;
    var benefitsDM = 0;
    var musterRolls = t.terms;
    if ((t.rank == 1) || (t.rank == 2)) {
        musterRolls += 1;
    } else if ((t.rank == 3) || (t.rank == 4)) {
        musterRolls += 2;
    } else if (t.rank >= 5) {
        benefitsDM += 1;
        musterRolls += 3;
    }
    if (t.checkSkill('Gambling')) {
        benefitsDM += 1;
    }
    for (var i = 0, limit = musterRolls; i <= limit; i++) {
        if (i <= 3) {
            t.credits += s[t.service].musterCash[roll(1) + benefitsDM];
        } else {
            s[t.service].musterBenefits.call(t, benefitsDM)
        }
    }
    // Figure annual retirement pay:
    if (t.terms >= 5) {
        switch(t.terms) {
            case 5:
                t.retirementPay = 4000;
                break;
            case 6:
                t.retirementPay = 6000;
                break;
            case 7:
                t.retirementPay = 8000;
                break;
            case 8:
                t.retirementPay = 10000;
                break;
            case 9:
                t.retirementPay = 12000;
                break;
            default:
                t.retirementPay = ((t.terms - 9) * 2000) + 12000;
        }
        t.benefits.push(numCommaSep(t.retirementPay)
            + '/yr Retirement Pay');
    }
};
t.doReenlistment = function () {
    var reenlistRoll = roll(2);
    if (reenlistRoll == 12) {
        t.history.push('Manditory reenlistment for '
            + intToOrdinal(t.terms + 1) + ' term.');
    } else if (t.terms >= 7) {
        t.activeDuty = false;
        t.history.push('Mandatory retirement after '
            + intToOrdinal(t.terms) + ' term.');
    } else if (reenlistRoll < s[t.service].reenlistThrow) {
        t.activeDuty = false;
        t.history.push('Denied reenlistment after '
            + intToOrdinal(t.terms) + ' term.');
    } else if (reenlistRoll >= s[t.service].reenlistThrow) {
        if (roll(2) >= 10) {
            if (t.terms < 5) {
                t.activeDuty = false;
                t.history.push('Chose not to reenlist after ' 
                    + intToOrdinal(t.terms) + ' term.');
            } else {
                t.activeDuty = false;
                t.retired = true;
                t.history.push('Retired after ' 
                    + intToOrdinal(t.terms) + ' term.');
            }
        } else {
            t.history.push('Voluntarily reenlisted for '
                + intToOrdinal(t.terms + 1) + ' term.');
        }
    }
};
t.doAging = function () {
    // Age-related attribute loss?
    if (t.age < 34) {
        return;
    } else if (t.age <= 46) {
        if (roll(2) <= 8) { t.attributes['strength'] -= 1; }
        if (roll(2) <= 7) { t.attributes['dexterity'] -= 1; }
        if (roll(2) <= 8) { t.attributes['endurance'] -= 1; }
    } else if (t.age <= 62) {
        if (roll(2) <= 9) { t.attributes['strength'] -= 1; }
        if (roll(2) <= 8) { t.attributes['dexterity'] -= 1; }
        if (roll(2) <= 9) { t.attributes['endurance'] -= 1; }
    } else {
        if (roll(2) <= 9) { t.attributes['strength'] -= 1; }
        if (roll(2) <= 9) { t.attributes['dexterity'] -= 1; }
        if (roll(2) <= 9) { t.attributes['endurance'] -= 1; }
        if (roll(2) <= 9) { t.attributes['intelligence'] -= 1; }
    }
    // Aging crisis?
    for (var a in t.attributes) {
        if (t.attributes[a] < 1) {
            if (roll(2) <= 8) {
                t.history.push("Died of illness.");
                t.deceased = true;
            } else {
                t.attributes[a] = 1;
            }
        }
    }
};
t.getNobleTitle = function () {
    switch (t.attributes.social) {
        case 11:
            if (t.gender == 'female') {
                return 'Dame';
            } else {
                return 'Sir';
            }
            break;
        case 12:
            if (t.gender == 'female') {
                return 'Baroness';
            } else {
                return 'Baron';
            }
            break;
        case 13:
            if (t.gender == 'female') {
                return 'Marchioness';
            } else {
                return 'Marquis';
            }
            break;
        case 14:
            if (t.gender == 'female') {
                return 'Countess';
            } else {
                return 'Count';
            }
            break;
        case 15:
            if (t.gender == 'female') {
                return 'Duchess';
            } else {
                return 'Duke';
            }
            break;
        default:
            return '';
    }
};
t.toString = function () {
    return (function() {
            if (this.deceased) {
                return '† ';
            } else {
                return '';
            }
        }).call(this)
        + (function () {
            if (this.service == 'other') { return ''; }
            return s[this.service].memberName + ' ';
        }).call(this)
        + (function () {
            if (s[this.service].ranks[this.rank] != '') {
                return s[this.service].ranks[this.rank] + ' ';
            } else {
                return '';
            }
        }).call(this)
        + (function () {
            if (this.attributes.social > 10) {
                return this.getNobleTitle() + ' ';
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
        + (function () {
            if (! this.deceased) {
                return "\t\t\t\tCr" + numCommaSep(this.credits);
            } else {
                return '';
            }
        }).call(this)
        + "\n\n"
        + (function () {
            var history = "Service History:\n";
            for (var i = 0, limit = this.history.length; i < limit; i++) {
                history = history + this.history[i] + "\n";
            }
            return history;
        }).call(this)
        + (function () {
            if (this.benefits.length > 0) {
                this.benefits.sort();
                var benefits = "\nBenefits: ";
                for (var i = 0, limit = this.benefits.length; i < limit; i++) {
                    if (i < limit - 1) {
                        benefits += this.benefits[i] + ', ';
                    } else {
                        benefits += this.benefits[i] + "\n";
                    }
                }
                return benefits;
            } else { return '' }
        }).call(this)
        + (function () {
            var skillList = '';
            if ((t.skills.length < 1) || (t.deceased)) { return ''; }
            var skillString = "\nSkills: ";
            for (var i = 0, limit = t.skills.length; i < limit; i++) {
                skillString += t.skills[i][0] + '-' + t.skills[i][1] + ' ';
            }
            return skillString;
        }).call(this);
};

while (t.activeDuty && (! t.deceased)) {
    t.doServiceTerm();
    t.doAging();
    if (! t.deceased) {
        t.doReenlistment();
    }
}
if (! t.deceased) {
    t.musterOut();
}

console.log(t.toString());
return t.toString();

} // End wrapper function travellerCharacterGenerator()

travellerCharacterGenerator('text');
