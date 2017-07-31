// Classic Traveller RPG character generator
// Paul Gorman 2015
// https://devilghost.com/software/travellercharacter/
// https://github.com/pgorman/travellercharactergenerator
//
// Additional Contributors
// Frank Filz
//
// URL Parameters ?param=value&param=value
//
// history=
//     verbose - show all the rolls
//     none    - don't show the history at all
//     any other value results in a simplified history
//
// service=
//     specify a preferred service instead of random
//
// minscore=
//     specify the minimum score for the preferred service (applies to the
//     random service if a preferred service is not specified). A minscore
//     of 9999 overrides the enlistment roll. A minscore of 8888 overrides
//     the draft with the preferred service (the character is still treated
//     as having been drafted, but the preferred service is chosen). These
//     special values allow generating characters that are a specific
//     service.
//
// muster=
//     ship - don't roll for cash until a ship is acquired if possible
//     TAS - don't roll for cash until Travellers' is acquired if possible
//     special - combination of above
//     split - alternate cash and material benefits rolls (until mmaximum
//             number of cash rolls have been taken).
//
// maxcash=
//     The maximum number of cash rolls to make, if not combined with
//     muster, any cash rolls will be taken first.
//
//
// hunt=
//     ship - keep rolling characters until a ship is acquired
//     TAS - keep rolling characters until Travellers' is acquired
//     special - keep rolling until ship or TAS is acquired
//     skill - keep rolling until skill is acquired
//
// level=
//     when used with hunt=skill, specifies the level of skill sought
//
//
// vehicles=
//     dole out vehicle skills as one of 1977, 1981, TTB, or ST
//     default is as TTB
function travellerCharacter(output) {
// output is 'text', 'html', or 'JSON'.

String.prototype.capitalize = function() {
    // Accept "word" and return "Word".
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
    var given = [];
    if (gender == 'female') { // Female names
        given = ['Alice', 'Ananya', 'Beatriz', 'Cai', 'Chloe', 'Darpana', 'Elena', 'Emily', 'Emma', 'Esperanza', 'Fang', 'Fatima', 'Freja', 'Harper', 'Ida', 'Isidora', 'Kana', 'Kayla', 'Khadija', 'Lena', 'Malika', 'Manon', 'Mariam', 'Marie', 'Mary', 'Martha', 'Milagrosa', 'Nadia', 'Nina', 'Olivia', 'Petra', 'Rin', 'Rosalie', 'Sara', 'Shu', 'Sophia', 'Trisha', 'Valentina', 'Victoria', 'Vivien', 'Xia', 'Yan', 'Zhen', 'Zoe'];
    } else {
        given = ['Adam', 'Ahmed', 'Ali', 'An', 'Andrew', 'Antonio', 'Aarav', 'Aziz', 'Bartholomew', 'Ben', 'Bo', 'Brom', 'Bruno', 'Charles', 'Cheng', 'Daniel', 'David', 'Diego', 'Feng', 'Finn', 'Gabriel', 'George', 'Hamza', 'Haruto', 'Hiroto', 'Hugo', 'Jack', 'Jacob', 'James', 'John', 'Juan', 'Judas', 'Leo', 'Logan', 'Luis', 'Luke', 'Magnus', 'Mark', 'Mehmet', 'Mohamed', 'Nicolas', 'Noam', 'Oliver', 'Omar', 'Paul', 'Peng', 'Philip', 'Quentin', 'Rachid', 'Ren', 'Said', 'Santino', 'Simon', 'Stanisław', 'Stefan', 'Thaddaeus', 'Thomas', 'Victor', 'William', 'Wei', 'Wen', 'Yi', 'Youssef'];
    }
    var family = ['Abe', 'Anderson', 'Bautista', 'Bauer', 'Becker', 'Brown', 'Chang', 'Chen', 'Chu', 'Cohen', 'Colombo', 'Cruz', 'Das', 'Das', 'Davies', 'Díaz', 'Dubois', 'Esposito', 'Evans', 'Fernandes', 'Fontana', 'Fujii', 'García', 'Gazi', 'Green', 'Gruber', 'Hall', 'Han', 'Hernández', 'Hoffmann', 'Hon', 'Hong', 'Itō', 'Ivanov', 'Jensen', 'Jones', 'Kask', 'Katz', 'Kelly', 'Khan', 'Kim', 'Klein', 'Kowalski', 'Larsen', 'Lee', 'Li', 'Lin', 'Ma', 'Martin', 'Mirza', 'Moreau', 'Murphy', 'Nakamura', 'Novák', 'Ota', 'Papadopoulos', 'Pérez', 'Petrov', 'Pavlov', 'Popov', 'Quinn', 'Reyes', 'Rizzo', 'Robinson', 'Rodríguez', 'Rossi', 'Saar', 'Santos', 'Satō', 'Schmidt', 'Shin', 'Silva', 'Sokolov', 'Sullivan', 'Sun', 'Suzuki', 'Singh', 'Smith', 'Tamm', 'Tanaka', 'Taylor', 'Varga', 'Wagner', 'Wang', 'Watanabe', 'Weber', 'Wen', 'White', 'Williams', 'Wilson', 'Wood', 'Wu', 'Yamamoto', 'Yamazaki', 'Yang', 'Zhang'];
    return arnd(given) + ' ' + arnd(family);
}

function generateGender() {
    if (roll(1) <= 2) {
        return 'female';
    } else {
        return 'male';
    }
}

//------------------------ Cascade Skills ------------------------//
function cascadeBlade() {
    // Call like cascadeBlade.call(t)
    var blades = ['Dagger', 'Foil', 'Sword', 'Cutlass', 'Broadsword', 'Bayonet', 'Spear', 'Halberd', 'Pike', 'Cudgel'];
    var knownBlades = [];
    if (this.urlParam('cascade') == 'skip') {
        return 'Blade';
    }
    for (var i = 0, limit = this.skills.length; i < limit; i++) {
        if (blades.indexOf(this.skills[i][0]) > -1) {
            knownBlades.push(this.skills[i][0]);
        }
    }
    if (knownBlades.length > 0) {
        return arnd(knownBlades);
    } else {
        return arnd(blades);
    }
}
function cascadeGun() {
    // Call like cascadeGun.call(t)
    var guns = ['Body Pistol', 'Auto Pistol', 'Revolver', 'Carbine', 'Rifle', 'Auto Rifle', 'Shotgun', 'SMG', 'Laser Carbine', 'Laser Rifle'];
    var knownGuns = [];
    if (this.urlParam('cascade') == 'skip') {
        return 'Gun';
    }
    for (var i = 0, limit = this.skills.length; i < limit; i++) {
        if (guns.indexOf(this.skills[i][0]) > -1) {
            knownGuns.push(this.skills[i][0]);
        }
    }
    if (knownGuns.length > 0) {
        return arnd(knownGuns);
    } else {
        return arnd(guns);
    }
}
function cascadeVehicle() {
    // Call like cascadeVehicle.call(t)
    var vehicles = ['Prop-Driven Aircraft', 'Jet-Driven Aircraft', 'Helicopter', 'Grav Vehicle', 'Tracked Vehicle', 'Wheeled Vehicle', 'Large Watercraft', 'Small Watercraft', 'Hovercraft', 'Submersible'];
    var knownVehicles = [];
    if (this.urlParam('cascade') == 'skip') {
        return 'Vehicle';
    }
    for (var i = 0, limit = this.skills.length; i < limit; i++) {
        if (vehicles.indexOf(this.skills[i][0]) > -1) {
            knownVehicles.push(this.skills[i][0]);
        }
    }
    if (knownVehicles.length > 0) {
        return arnd(knownVehicles);
    } else {
        return arnd(vehicles);
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
    survivalThrow: 5,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.intelligence >= 7) { dm += 2; }
        return dm;
    },
    commissionThrow: 10,
    commissionDM: function (attributes) {
        var dm = 0;
        if (attributes.social >= 9) { dm += 1; }
        return dm;
    },
    promotionThrow: 8,
    promotionDM: function (attributes) {
        var dm = 0;
        if (attributes.education >= 8) { dm += 1; }
        return dm;
    },
    getServiceSkills: function () { return []; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.intelligence >= 7) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 5);
        if ((sv + dm) >= 5) {
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
    checkPromotion: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.education >= 8) { dm += 1; }
        this.verboseHistory('Promotion roll ' + sv + ' + ' + dm + ' vs ' + 8);
        if ((sv + dm) >= 8) {
            return true;
        } else {
            return false;
        }
    },
    checkCommission: function() {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.social >= 9) { dm += 1; }
        this.verboseHistory('Commission roll ' + sv + ' + ' + dm + ' vs ' + 10);
        if ((sv + dm) >= 10) {
            return true;
        } else {
            return false;
        }
    },
    doPromotion: function() {
        if (this.rank == 5 || 6) {
            this.improveAttribute('social', 1);
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
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 1);
                break;
            case 3:
                this.improveAttribute('education', 1);
                break;
            case 4:
            	this.doBladeBenefit.call(t);
                break;
            case 5:
                if (this.benefits.indexOf("Travellers' Aide Society") > -1) {
                    break;
                }
                this.addBenefit.call(t, "Travellers' Aid Society");
                this.TAS = true;
                break;
            case 6:
                this.addBenefit.call(t, 'High Passage');
                break;
            default:
                this.improveAttribute('social', 2);
        }
    },
    canMuster: function (strategy) {
        return strategy == 'TAS' || strategy == 'special';
    },
    acquireSkill: function () {
        // Skills acquired during a term of service.
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.improveAttribute('intelligence', 1); break;
                    case 5: this.improveAttribute('education', 1); break;
                    default: this.improveAttribute('social', 1);
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: this.addSkill("Ship's Boat"); break;
                    case 2: this.addSkill('Vacc Suit'); break;
                    case 3: this.addSkill('Fwd Obsvr'); break;
                    case 4: this.addSkill('Gunnery'); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: this.addSkill('Vacc Suit'); break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Engineering'); break;
                    case 5: this.addSkill('Gunnery'); break;
                    default: this.addSkill('Jack-o-T');
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Navigation'); break;
                    case 3: this.addSkill('Engineering'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Pilot'); break;
                    default: this.addSkill('Admin');
                }
                break;
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
    survivalThrow: 6,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.endurance >= 8) { dm += 2; }
        return dm;
    },
    commissionThrow: 9,
    commissionDM: function (attributes) {
        var dm = 0;
        if (attributes.education >= 7) { dm += 1; }
        return dm;
    },
    promotionThrow: 9,
    promotionDM: function (attributes) {
        var dm = 0;
        if (attributes.social >= 8) { dm += 1; }
        return dm;
    },
    getServiceSkills: function () { return ['Cutlass']; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.endurance >= 8) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 6);
        if ((sv + dm) >= 6) {
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
    checkPromotion: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.social >= 8) { dm += 1; }
        this.verboseHistory('Promotion roll ' + sv + ' + ' + dm + ' vs ' + 9);
        if ((sv + dm) >= 9) {
            return true;
        } else {
            return false;
        }
    },
    checkCommission: function() {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.education >= 7) { dm += 1; }
        this.verboseHistory('Commission roll ' + sv + ' + ' + dm + ' vs ' + 9);
        if ((sv + dm) >= 9) {
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
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 1);
                break;
            case 3:
                this.improveAttribute('education', 1);
                break;
            case 4:
            	this.doBladeBenefit.call(t);
                break;
            case 5:
                if (this.benefits.indexOf("Travellers' Aide Society") > -1) {
                    break;
                }
                this.addBenefit.call(t, "Travellers' Aid Society");
                this.TAS = true;
                break;
            case 6:
                this.addBenefit.call(t, 'High Passage');
                break;
            default:
                this.improveAttribute('social', 2);
        }
    },
    canMuster: function (strategy) {
        return strategy == 'TAS' || strategy == 'special';
    },
    acquireSkill: function () {
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.addSkill('Gambling'); break;
                    case 5: this.addSkill('Brawling'); break;
                    default: this.addSkill(cascadeBlade.call(this));
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: if (this.vehicles != '1981') {
                            this.addSkill('ATV');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Vacc Suit'); break;
                    case 3: this.addSkill(cascadeBlade.call(this)); break;
                    case 4: this.addSkill(cascadeGun.call(this)); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: if (this.vehicles == '1977') {
                            this.addSkill('ATV');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Tactics'); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Tactics'); break;
                    case 3: this.addSkill('Tactics'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Leader'); break;
                    default: this.addSkill('Admin');
                }
                break;
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
    survivalThrow: 5,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.education >= 5) { dm += 2; }
        return dm;
    },
    commissionThrow: 5,
    commissionDM: function (attributes) {
        var dm = 0;
        if (attributes.endurance >= 7) { dm += 1; }
        return dm;
    },
    promotionThrow: 6,
    promotionDM: function (attributes) {
        var dm = 0;
        if (attributes.education >= 7) { dm += 1; }
        return dm;
    },
    getServiceSkills: function () { return ['Rifle']; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.education >= 5) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 5);
        if ((sv + dm) >= 5) {
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
    checkPromotion: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.education >= 7) { dm += 1; }
        this.verboseHistory('Promotion roll ' + sv + ' + ' + dm + ' vs ' + 6);
        if ((sv + dm) >= 6) {
            return true;
        } else {
            return false;
        }
    },
    checkCommission: function() {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.endurance >= 7) { dm += 1; }
        this.verboseHistory('Commission roll ' + sv + ' + ' + dm + ' vs ' + 5);
        if ((sv + dm) >= 5) {
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
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 1);
                break;
            case 3:
                this.improveAttribute('education', 1);
                break;
            case 4:
            	this.doGunBenefit.call(t);
                break;
            case 5:
                this.addBenefit.call(t, 'High Passage');
                break;
            case 6:
                this.addBenefit.call(t, 'Middle Passage');
                break;
            default:
                this.improveAttribute('social', 1);
        }
    },
    canMuster: function (strategy) {
        return false;
    },
    acquireSkill: function () {
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.addSkill('Gambling'); break;
                    case 5: this.improveAttribute('education', 1); break;
                    default: this.addSkill('Brawling');
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: if (this.vehicles != '1981') {
                            this.addSkill('ATV');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Air/Raft'); break;
                    case 3: this.addSkill(cascadeGun.call(this)); break;
                    case 4: this.addSkill('Fwd Obsvr'); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: if (this.vehicles == '1977') {
                            this.addSkill('ATV');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Tactics'); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Tactics'); break;
                    case 3: this.addSkill('Tactics'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Leader'); break;
                    default: this.addSkill('Admin');
                }
                break;
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
    survivalThrow: 7,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.endurance >= 9) { dm += 2; }
        return dm;
    },
    getServiceSkills: function () { return ['Pilot']; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.endurance >= 9) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 7);
        if ((sv + dm) >= 7) {
            return true;
        } else {
            return false;
        }
    },
    reenlistThrow: 3,
    ranks: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
    checkPromotion: function () {
        return false;
    },
    checkCommission: function() {
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
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 2);
                break;
            case 3:
                this.improveAttribute('education', 2);
                break;
            case 4:
            	this.doBladeBenefit.call(t);
                break;
            case 5:
            	this.doGunBenefit.call(t);
                break;
            case 6:
                if (this.benefits.indexOf('Scout Ship') > -1) {
                    this.debugHistory('No benefit');
                    break;
                }
                this.addBenefit.call(t, 'Scout Ship');
                this.ship = true;
                break;
            default:
                this.improveAttribute('social', 1);
        }
    },
    canMuster: function (strategy) {
        return strategy == 'ship' || strategy == 'special';
    },
    acquireSkill: function () {
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.improveAttribute('intelligence', 1); break;
                    case 5: this.improveAttribute('education', 1); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: this.addSkill('Air/Raft'); break;
                    case 2: this.addSkill('Vacc Suit'); break;
                    case 3: this.addSkill('Mechanical'); break;
                    case 4: this.addSkill('Navigation'); break;
                    case 5: this.addSkill('Electronics'); break;
                    default: this.addSkill('Jack-o-T');
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: if (this.vehicles == '1977') {
                            this.addSkill('Air/Raft');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Jack-o-T'); break;
                    case 5: this.addSkill('Gunnery'); break;
                    default: this.addSkill('Medical');
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Navigation'); break;
                    case 3: this.addSkill('Engineering'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Pilot'); break;
                    default: this.addSkill('Jack-o-T');
                }
                break;
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
    survivalThrow: 5,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.intelligence >= 7) { dm += 2; }
        return dm;
    },
    commissionThrow: 4,
    commissionDM: function (attributes) {
        var dm = 0;
        if (attributes.intelligence >= 6) { dm += 1; }
        return dm;
    },
    promotionThrow: 10,
    promotionDM: function (attributes) {
        var dm = 0;
        if (attributes.intelligence >= 9) { dm += 1; }
        return dm;
    },
    getServiceSkills: function () { return []; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.intelligence >= 7) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 5);
        if ((sv + dm) >= 5) {
            return true;
        } else {
            return false;
        }
    },
    reenlistThrow: 4,
    ranks: {
        0: '',
        1: '4th Officer',
        2: '3rd Officer',
        3: '2nd Officer',
        4: '1st Officer',
        5: 'Captain',
        6: 'Senior Captain'
    },
    checkPromotion: function() {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.intelligence >= 9) { dm += 1; }
        this.verboseHistory('Promotion roll ' + sv + ' + ' + dm + ' vs ' + 10);
        if ((sv + dm) >= 10) {
            return true;
        } else {
            return false;
        }
    },
    checkCommission: function() {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.intelligence >= 6) { dm += 1; }
        this.verboseHistory('Commission roll ' + sv + ' + ' + dm + ' vs ' + 4);
        if ((sv + dm) >= 4) {
            return true;
        } else {
            return false;
        }
    },
    doPromotion: function() {
        if (this.rank == 4) {
            this.addSkill('Pilot');
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
    },
    musterBenefits: function (dm) {
        switch(roll(1) + dm) {
            case 1:
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 1);
                break;
            case 3:
                this.improveAttribute('education', 1);
                break;
            case 4:
            	this.doGunBenefit.call(t);
                break;
            case 5:
            	this.doBladeBenefit.call(t);
                break;
            case 6:
                this.addBenefit.call(t, 'Low Passage');
                break;
            default:
                if (this.benefits.indexOf('Free Trader') > -1) {
                    this.mortgages += 1;
                    if (this.mortgage > 0) {
                        this.mortgage -= 10;
                        this.verboseHistory('10 years of mortgage paid off');
                    } else {
                        this.debugHistory('No benefit');
                    }
                } else {
                    this.addBenefit.call(t, 'Free Trader');
                    this.ship = true;
                }
        }
    },
    canMuster: function (strategy) {
        return strategy == 'ship' || strategy == 'special';
    },
    acquireSkill: function () {
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.improveAttribute('strength', 1); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill('Bribery');
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: if (this.vehicles == '1977') {
                            this.improveAttribute('strength', 1);
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Vacc Suit'); break;
                    case 3: this.addSkill('Jack-o-T'); break;
                    case 4: this.addSkill('Steward'); break;
                    case 5: this.addSkill('Electronics'); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: this.addSkill('Streetwise'); break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Navigation'); break;
                    case 5: this.addSkill('Gunnery'); break;
                    default: this.addSkill('Medical');
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Navigation'); break;
                    case 3: this.addSkill('Engineering'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Pilot'); break;
                    default: this.addSkill('Admin');
                }
                break;
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
    survivalThrow: 5,
    survivalDM: function (attributes) {
        var dm = 0;
        if (attributes.intelligence >= 9) { dm += 2; }
        return dm;
    },
    getServiceSkills: function () { return []; },
    checkSurvival: function () {
        var dm = 0;
        var sv = roll(2);
        if (this.attributes.intelligence >= 9) { dm += 2; }
        this.verboseHistory('Survival roll ' + sv + ' + ' + dm + ' vs ' + 5);
        if ((sv + dm) >= 5) {
            return true;
        } else {
            return false;
        }
    },
    reenlistThrow: 5,
    ranks: { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' },
    checkPromotion: function () {
        return false;
    },
    checkCommission: function () {
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
                this.addBenefit.call(t, 'Low Passage');
                break;
            case 2:
                this.improveAttribute('intelligence', 1);
                break;
            case 3:
                this.improveAttribute('education', 1);
                break;
            case 4:
            	this.doGunBenefit.call(t);
                break;
            case 5:
                this.addBenefit.call(t, 'High Passage');
                break;
            default:
                this.debugHistory('No benefit');
                break;
        }
    },
    canMuster: function (strategy) {
        return false;
    },
    acquireSkill: function () {
        switch(this.whichSkillTable.call(this)) {
            case 1:
                switch(roll(1)) {
                    case 1: this.improveAttribute('strength', 1); break;
                    case 2: this.improveAttribute('dexterity', 1); break;
                    case 3: this.improveAttribute('endurance', 1); break;
                    case 4: this.addSkill(cascadeBlade.call(this)); break;
                    case 5: this.addSkill('Brawling'); break;
                    default: this.improveAttribute('social', -1);
                }
                break;
            case 2:
                switch(roll(1)) {
                    case 1: if (this.vehicles == '1977') {
                            this.addSkill('Forgery');
                        } else {
                            this.addSkill(cascadeVehicle.call(this));
                        }
                        break;
                    case 2: this.addSkill('Gambling'); break;
                    case 3: this.addSkill('Brawling'); break;
                    case 4: this.addSkill('Bribery'); break;
                    case 5: this.addSkill(cascadeBlade.call(this)); break;
                    default: this.addSkill(cascadeGun.call(this));
                }
                break;
            case 3:
                switch(roll(1)) {
                    case 1: this.addSkill('Streetwise'); break;
                    case 2: this.addSkill('Mechanical'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Gambling'); break;
                    case 5: this.addSkill('Brawling'); break;
                    default: this.addSkill('Forgery');
                }
                break;
            case 4:
                switch(roll(1)) {
                    case 1: this.addSkill('Medical'); break;
                    case 2: this.addSkill('Forgery'); break;
                    case 3: this.addSkill('Electronics'); break;
                    case 4: this.addSkill('Computer'); break;
                    case 5: this.addSkill('Streetwise'); break;
                    default: this.addSkill('Jack-o-T');
                }
                break;
        }
    }
};

//------------ "t" object holds Traveller character definitions ------------//
var t = {};
t.cheat = false;
t.urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
t.urlParams = function(w){
    w = w || window;
    var rx = new RegExp('[\?]([^\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}
t.age = 18;
t.gender = generateGender();
t.name = generateName(t.gender);
t.showHistory = 'simple';
t.terms = 0;
t.credits = 0;
t.history = [];
t.benefits = [];
t.ship = false;
t.TAS = false;
t.mortgage = 40;
t.bladeBenefit = '';
t.gunBenefit = '';
t.vehicles = 'TTB';
t.doBladeBenefit = function () {
    if (t.bladeBenefit == '') {
        t.bladeBenefit = cascadeBlade.call(t);
        t.addBenefit(t.bladeBenefit);
    } else {
        t.addSkill(t.bladeBenefit);
    }
}
t.doGunBenefit = function () {
    if (t.gunBenefit == '') {
        t.gunBenefit = cascadeGun.call(t);
        t.addBenefit(t.gunBenefit);
    } else {
        t.addSkill(t.gunBenefit);
    }
}
t.attributes = {
    strength: roll(2),
    dexterity: roll(2),
    endurance: roll(2),
    intelligence: roll(2),
    education: roll(2),
    social: roll(2),
};
t.extendedHex = function (val) {
    var xhex = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'.split('');
    if (val < 34) {
        return xhex[val];
    } else {
        return '?';
    }
}     
t.getAttrString = function () {
    return t.extendedHex(t.attributes.strength) +
          t.extendedHex(t.attributes.dexterity) +
          t.extendedHex(t.attributes.endurance) +
          t.extendedHex(t.attributes.intelligence) +
          t.extendedHex(t.attributes.education) +
          t.extendedHex(t.attributes.social);
};
t.skillPoints = 0;
t.skills = [];
t.checkSkill = function (skill) {
    for (var i = 0, limit = t.skills.length; i < limit; i++) {
        if (t.skills[i][0] == skill) {
            return i;
        }
    }
    return -1;
};
t.checkSkillLevel = function (skill, level) {
    i = t.checkSkill(skill);
    if (i < 0) {
        return false;
    }
    return t.skills[i][1] >= level;
}
t.tables = ['personal development', 'service skills', 'advanced education',
            'advanced education 8+'];
t.whichSkillTable = function() {
    var table;
    if (this.urlParam('personal') == 'always') {
        table = rndInt(1, 3 + (this.attributes.education >= 8 ? 1 : 0));
    } else {
        table =  rndInt(1, 3) + (this.attributes.education >= 8 ? 1 : 0);
    }
    this.debugHistory('Skill from table ' + table + ' ' +
                      this.tables[table - 1]);
    return table;
}
t.addSkill = function (skill, skillLevel) {
    var i = t.checkSkill(skill);
    if (! skillLevel) {
        skillLevel = 1;
    }
    if (i >= 0) {
        t.skills[i][1] += skillLevel;
        t.verboseHistory('Improved ' + skill + '-' + t.skills[i][1]);
    } else {
        t.skills.push([skill, skillLevel]);
        t.verboseHistory('Learned ' + skill + '-' + skillLevel);
    }
};
t.improveAttribute = function (attrib, delta) {
    if (! delta) {
        delta = 1;
    }
    t.attributes[attrib] += delta;
    if (t.attributes[attrib] < 1 && attrib == 'social') {
        // Don't let other social reduction take below 1
        t.verboseHistory('Decreased ' + attrib +
                         ' below 1, keeping it at 1');
        t.attributes[attrib] = 1;
    } else {
        if (t.attributes[attrib] < 0) {
            // Don't let reduction take below 0.
            t.attributes[attrib] = 0;
        }
        t.verboseHistory((delta > 0 ? 'Increased ' : 'Decreased ') +
                     attrib + ' by ' + delta + ' to ' +
                     t.extendedHex(t.attributes[attrib]));
    }
}
t.addBenefit = function (benefit) {
    t.benefits.push(benefit);
    t.verboseHistory(benefit);
}
t.verboseHistory = function(text) {
    if (t.showHistory == 'verbose' || t.showHistory == 'debug') {
       t.history.push(text);
    }
}
t.debugHistory = function(text) {
    if (t.showHistory == 'debug') {
       t.history.push(text);
    }
}
t.drafted = false;
t.determineService = function() {
    if (t.urlParam('history') == 'verbose') {
        t.showHistory = 'verbose';
    } else if (t.urlParam('history') == 'debug') {
        t.showHistory = 'debug';
    } else if (t.urlParam('history') == 'none') {
        t.showHistory = 'none';
    }
    if (t.urlParam('vehicles') != '') {
        t.vehicles = t.urlParam('vehicles');
    }
    t.verboseHistory('Rolled attributes: ' + t.getAttrString());
    // In which service should we try to enlist?
    var preferredService;
    var preferredServiceScore;
    var thisService;
    var thisServiceScore;
    var minscore = +t.urlParam('minscore');
    if (minscore == 0) {
        minscore = 1;
    }
    if (t.urlParam('service') !== '') {
        // preferred service is given in the URL
        preferredService = t.urlParam('service');
    } else {
        // Initially pick a random service
        preferredService = arnd(s.services);
    }

    // Compute the initial service pick's DM, if it's less than minscore,
    // bump it to minscore to favor the chosen service.
    preferredServiceScore = s[preferredService].enlistmentDM(t.attributes);
    if (preferredServiceScore < minscore) {
    	preferredServiceScore = minscore;
    }

    t.debugHistory('Starting with ' + s[preferredService].serviceName +
                   ' score ' + preferredServiceScore);
    for (var i = 0, limit = s.services.length; i < limit; i++) {
        thisService = s.services[i];
        thisServiceScore = s[thisService].enlistmentDM(t.attributes);
        if (thisServiceScore > preferredServiceScore) {
            t.debugHistory('Switching to ' +
                           s[thisService].serviceName + ' because score ' +
                           thisServiceScore + ' > ' + preferredServiceScore);
            preferredService = thisService;
            preferredServiceScore = thisServiceScore;
        } else if (thisServiceScore == preferredServiceScore) {
            if (roll(2) > 7) {
                t.debugHistory('Switching to ' +
                               s[thisService].serviceName + ' because score ' +
                               thisServiceScore + ' == ' +
                               preferredServiceScore);
                preferredService = thisService;
                preferredServiceScore = thisServiceScore;
            }
        }
    }
    // Now we need to make sure we use the correct service DM
    preferredServiceDM = s[preferredService].enlistmentDM(t.attributes);
    // Attempt to enlist
    var serviceSkills = [];
    var en = roll(2);
    if (minscore == 9999) {
        t.cheat = true;
        t.history.push('Automatic enlistment in ' +
            s[preferredService].serviceName);
        serviceSkills = s[preferredService].getServiceSkills();
        for (var i = 0, limit = serviceSkills.length; i < limit; i++) {
            t.addSkill(serviceSkills[i]);
        }
        return preferredService;
    }
	t.history.push('Attempted to enlist in ' + s[preferredService].serviceName + '.');
	t.verboseHistory('Enlistment roll ' + en + ' + ' + preferredServiceDM + ' vs ' + s[preferredService].enlistmentThrow);
    if ((en + preferredServiceDM) >= s[preferredService].enlistmentThrow) {
        t.history.push('Enlistment accepted.');
        serviceSkills = s[preferredService].getServiceSkills();
        for (var i = 0, limit = serviceSkills.length; i < limit; i++) {
            t.addSkill(serviceSkills[i]);
        }
        return preferredService;
    } else {
        var draftService;
        t.drafted = true;
        t.history.push('Enlistment denied.');
        if (minscore == 8888) {
            t.cheat = true;
            draftService = preferredService;
        } else {
            draftService = s.draft();
        }
        t.history.push('Drafted into ' + draftService + '.');
        serviceSkills = s[draftService].getServiceSkills();
        for (var i = 0, limit = serviceSkills.length; i < limit; i++) {
            t.addSkill(serviceSkills[i]);
        }
        return draftService;
    }
};
t.service = t.determineService.call();
t.deceased = false;
t.commissioned = false;
t.rank = 0;
t.activeDuty = true;
t.retired = false;
t.retirementPay = 0;
t.doServiceTerm = function () {
    t.terms += 1;
    t.age += 4;
    t.verboseHistory('--------------------------------------------');
    t.verboseHistory('Term ' +
        t.terms + ' age ' + t.age);
    if (t.service == 'scouts') {
        t.skillPoints += 2;
    } else if (t.terms == 1) {
    	t.skillPoints += 2;
    } else {
        t.skillPoints += 1;
    }
    // Check commission:
    if (t.drafted && t.terms == 1) {
    	t.verboseHistory('Skipping commision because of draft.');
    } else if (! t.commissioned) {
        if (s[t.service].checkCommission.call(t)) {
            t.commissioned = true;
            t.rank += 1;
            t.skillPoints += 1;
            s[t.service].doPromotion.call(t);
            t.history.push('Commissioned during ' +
                intToOrdinal(t.terms) + ' term of service as ' +
                s[t.service].ranks[t.rank] + '.');
        }
    }
    // Try for promotion:
    if (t.commissioned && (t.rank < 6)) {
        if (s[t.service].checkPromotion.call(t)) {
            t.rank += 1;
            t.skillPoints += 1;
            s[t.service].doPromotion.call(t);
            t.history.push('Promoted to ' + s[t.service].ranks[t.rank] + '.');
        }
    }
    for (var i = 0, limit = t.skillPoints; i < limit; i++) {
        s[t.service].acquireSkill.call(t);
        t.skillPoints -= 1;
    }
    // Check survival:
    if (! s[t.service].checkSurvival.call(t)) {
        t.history.push('Death in service.');
        t.deceased = true;
        t.activeDuty = false;
    }
};
t.musterStrategy = '';
t.found = false;
t.musterOut = function () {
    // What cash and non-cash benefits do we get when mustering out?
    var cashDM = 0;
    var benefitsDM = 0;
    var musterRolls = t.terms;
    var maxCash = 3;
    var cashUsed = 0;
    var looking = false;
    var found = false;
    t.musterStrategy = t.urlParam('muster');
    if (t.urlParam('maxcash') !== '') {
        maxCash = t.urlParam('maxcash');
        if (maxCash > 3) {
            t.cheat |= true;
        }
    }
    t.verboseHistory('--------------------------------------------');
    t.verboseHistory('Mustered Out');
    if ((t.rank == 1) || (t.rank == 2)) {
        musterRolls += 1;
    } else if ((t.rank == 3) || (t.rank == 4)) {
        musterRolls += 2;
    } else if (t.rank >= 5) {
        benefitsDM += 1;
        musterRolls += 3;
    }
    if (t.checkSkill('Gambling') >= 0) {
        cashDM += 1;
    }
    if (t.musterStrategy != '') {
        looking = s[t.service].canMuster(t.musterStrategy) ||
                  t.musterStrategy == 'split';
    }
    for (var i = 1, limit = musterRolls; i <= limit; i++) {
        if (cashUsed < maxCash && (!looking || t.found || found ||
            (t.musterStrategy == 'split' && (i % 2) == 1))) {
            var cash = s[t.service].musterCash[roll(1) + cashDM]
            t.credits += cash;
            t.verboseHistory(numCommaSep(cash) + ' credits');
            cashUsed += 1;
        } else {
            s[t.service].musterBenefits.call(t, benefitsDM);
            if (t.hunt == 'special') {
                t.found = t.ship | t.TAS;
            } else if (t.hunt == 'ship') {
                t.found = t.ship;
            } else if (t.hunt == 'TAS') {
                t.found = t.TAS;
            }
            if (t.musterStrategy == 'special') {
                found = t.ship | t.TAS;
            } else if (t.musterStrategy == 'ship') {
                found = t.ship;
            } else if (t.musterStrategy == 'TAS') {
                found = t.TAS;
            }
        }
    }
    // Figure annual retirement pay:
    if (t.terms >= 5 && t.service !== 'scouts' && t.service !== 'other') {
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
        t.benefits.push(numCommaSep(t.retirementPay) + '/yr Retirement Pay');
    }
};
t.doReenlistment = function () {
    var reenlistRoll = roll(2);
    t.verboseHistory('Reenlistment roll ' + reenlistRoll + ' vs ' +
                   s[t.service].reenlistThrow);
    if (reenlistRoll == 12) {
        t.history.push('Manditory reenlistment for ' +
            intToOrdinal(t.terms + 1) + ' term.');
    } else if (t.terms >= 7) {
        t.activeDuty = false;
        t.history.push('Mandatory retirement after ' +
            intToOrdinal(t.terms) + ' term.');
    } else if (reenlistRoll < s[t.service].reenlistThrow) {
        t.activeDuty = false;
        t.history.push('Denied reenlistment after ' +
            intToOrdinal(t.terms) + ' term.');
    } else if (reenlistRoll >= s[t.service].reenlistThrow) {
        if (roll(2) >= 10 && (t.hunt !== 'skill' || t.found)) {
            if (t.terms < 5) {
                t.activeDuty = false;
                t.history.push('Chose not to reenlist after ' +
                    intToOrdinal(t.terms) + ' term.');
            } else {
                t.activeDuty = false;
                t.retired = true;
                t.history.push('Retired after ' +
                    intToOrdinal(t.terms) + ' term.');
            }
        } else {
            t.history.push('Voluntarily reenlisted for ' +
                intToOrdinal(t.terms + 1) + ' term.');
        }
    }
};
t.ageAttribute = function(attrib, req, reduction) {
    var agingRoll = roll(2);
    t.verboseHistory('Aging ' + attrib + ' throw ' + agingRoll + ' vs ' + req);
    if (agingRoll < req) {
        t.improveAttribute(attrib, reduction);
    }
}
t.doAging = function () {
    // Age-related attribute loss?
    if (t.age < 34) {
        return;
    } else if (t.age <= 46) {
        t.ageAttribute('strength', 8, -1);
        t.ageAttribute('dexterity', 7, -1);
        t.ageAttribute('endurance', 8, -1);
    } else if (t.age <= 62) {
        t.ageAttribute('strength', 9, -1);
        t.ageAttribute('dexterity', 8, -1);
        t.ageAttribute('endurance', 9, -1);
    } else {
       t.ageAttribute('strength', 9, -2);
       t.ageAttribute('dexterity', 9, -2);
       t.ageAttribute('endurance', 9, -2);
       t.ageAttribute('intelligence', 9, -1);
    }
    // Aging crisis?
    for (var a in t.attributes) {
        if (t.attributes[a] < 1) {
            var cr = roll(2);
            t.verboseHistory('Aging crisis due to ' + a +
                             ' dropping below 1 roll ' + cr + ' vs 8');
            if (cr < 8) {
                t.history.push("Died of illness.");
                t.deceased = true;
                t.activeDuty = false;
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
            var parms = t.urlParams();
            if (t.cheat || t.showHistory == 'debug') {
                return 'URL Parms: ' + parms + '\n\n';
            } else {
                return '';
            }
        }).call(this) +
        (function() {
            if (this.deceased) {
                return '† ';
            } else {
                return '';
            }
        }).call(this) +
        (function () {
            if (this.service == 'other') { return ''; }
            return s[this.service].memberName + ' ';
        }).call(this) +
        (function () {
            if (s[this.service].ranks[this.rank] !== '') {
                return s[this.service].ranks[this.rank] + ' ';
            } else {
                return '';
            }
        }).call(this) +
        (function () {
            if (this.attributes.social > 10) {
                return this.getNobleTitle() + ' ';
            } else {
                return '';
            }
        }).call(this) +
        this.name +
        '    ' + this.getAttrString() + '    Age ' + this.age + "\n" +
        (function () {
            if (this.terms == 1) {
                return this.terms + ' term';
            } else {
                return this.terms + ' terms';
            }
        }).call(this) +
        (function () {
            if (! this.deceased) {
                return "                        Cr" + numCommaSep(this.credits);
            } else {
                return '';
            }
        }).call(this) + "\n" +
        (function () {
            if ((t.skills.length < 1) || (t.deceased)) { return ''; }
            var skills = [];
            for (var i = 0, limit = t.skills.length; i < limit; i++) {
                skills.push(t.skills[i][0] + '-' + t.skills[i][1]);
            }
            skills.sort();
            var skillString = "\nSkills: ";
            for (var i = 0, limit = skills.length; i < limit; i++) {
                skillString += skills[i];
                if (i !== limit - 1) {
                    skillString += ', ';
                }
            }
            return skillString + "\n";
        }).call(this) +
        (function () {
            if (this.benefits.length > 0) {
                this.benefits.sort();
                var benefits = "\nBenefits: ";
                for (var i = 0, limit = this.benefits.length; i < limit; i++) {
                    benefits += this.benefits[i];
                    if (this.benefits[i] == 'Free Trader') {
                        if (this.mortgage == 0) {
                            benefits += ' (paid off - 40 years old)';
                        } else if (this.mortgage == 40) {
                            benefits += ' (new with a 40 year mortgage)';
                        } else {
                            benefits += ' (' + (40 - this.mortgage) +
                                        ' years old, ' + this.mortgage +
                                        ' years mortgage remaining)';
                        }
                    }
                    if (i < limit - 1) {
                        benefits += ', ';
                    } else {
                        benefits += "\n";
                    }
                }
                return benefits;
            } else { return ''; }
        }).call(this) +
        (function () {
            if (this.showHistory == 'none') {
                return "";
            }
            var history = "Service History:\n";
            for (var i = 0, limit = this.history.length; i < limit; i++) {
                history = history + this.history[i] + "\n";
            }
            return "\n" + history;
        }).call(this)
    ;
};
t.numresets = 0;
t.reset = function() {
    t.numresets += 1;
    t.history = [];
    if (t.ship) {
        t.ships2 += 1;
    }
    t.history.push('Number of resets ' + t.numresets);
    t.age = 18;
    t.gender = generateGender();
    t.name = generateName(t.gender);
    t.terms = 0;
    t.credits = 0;
    t.benefits = [];
    t.ship = false;
    t.TAS = false;
    t.mortgage = 40;
    t.bladeBenefit = '';
    t.gunBenefit = '';
    t.attributes.strength = roll(2);
    t.attributes.dexterity = roll(2);
    t.attributes.endurance = roll(2);
    t.attributes.intelligence = roll(2);
    t.attributes.education = roll(2);
    t.attributes.social = roll(2);
    t.skillPoints = 0;
    t.skills = [];
    t.drafted = false;
    t.service = t.determineService();
    t.deceased = false;
    t.commissioned = false;
    t.rank = 0;
    t.activeDuty = true;
    t.retired = false;
    t.retirementPay = 0;
}

t.hunt = t.urlParam('hunt');

while (t.activeDuty && (! t.deceased)) {
    t.doServiceTerm();
    t.doAging();
    if (! t.deceased) {
        t.doReenlistment();
    } else {
        t.found = false;
    }
    if (t.hunt == 'skill') {
        var level = 1;
        var skill = t.urlParam('skill');
        if (t.urlParam('level') !== '') {
           level = t.urlParam('level');
        }
        t.found = t.checkSkillLevel(skill, level); 
        t.debugHistory('Hunting for ' + skill + '-' + level +
                       (t.found ? '' : ' not') + ' found');
    }
    if (!t.activeDuty && !t.deceased) {
        t.musterOut();
    }
    if (!t.activeDuty) {
        if (t.numresets >= 10000) {
            break;
        }
        if (t.urlParam('hunt') !== '' && !t.found) {
            t.verboseHistory('Resetting');
            t.reset();
            t.cheat = true;
        }
    }
}

console.log(t.toString());
return t.toString();

} // End wrapper function travellerCharacterGenerator()
