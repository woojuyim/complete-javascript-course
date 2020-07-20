// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Park {
    constructor(name, year, numofTrees, area) {
        this.name = name;
        this.year = year;
        this.numofTrees = numofTrees
        this.area = area;

    }
    calcDensity() {
        console.log(this.numofTrees / this.area)
    }
    getName() {
        return this.name
    }

}

class Street {
    constructor(name, year, length, size) {
        this.name = name;
        this.year = year;
        this.length = length;
        this.size = size;
    }
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.year}, is a ${classification.get(this.size)} street.`);
    }
}

const Parks = [
    new Park("Park1", 2011, 102, 20), new Park("Park2", 2001, 1200, 100),
    new Park("Park3", 2000, 12, 12)
]
const Streets = [
    new Street("Street1", 2011, 100), new Street("Street2", 2010, 120),
    new Street("Street3", 1900, 1230), new Street("Street4", 2001, 234)
]

function calc(arr) {

    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

    return [sum, sum / arr.length];

}


function reportParks(p) {

    console.log('-----PARKS REPORT-----');

    // Density
    p.forEach(el => el.calcDensity());

    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.year);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

    // Which park has more than 1000 trees
    const i = p.map(el => el.numofTrees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);

}


function reportStreets(s) {

    console.log('-----STREETS REPORT-----');

    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);

    // CLassify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(Parks);
reportStreets(Streets);