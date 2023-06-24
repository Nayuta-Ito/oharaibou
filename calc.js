// This program is very kind to humans because it has many lines of comment.
// I write this in JS because I want to publish it in GitHub Pages.
/*
The elements of T are expressed in this way:
0 -> the Number 0
Yin and Yang symbol -> the String "O"
Else ->
{
  k: T,
  x: T,
  m: T[],
}
By doing this, every element of T can be exported/imported as a JSON which is very convenient.
*/

let useTouhoukyodaisuuVersion = false;

const literallyEquals = (a, b) => {
  const ta = typeof a;
  const tb = typeof b;

  // early return
  if (ta !== tb) {
    return false;
  }

  // null check
  if (a === null && b === null) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }

  // function equality? nope!
  // I don't use it in this program anyway
  if (ta === 'function') {
    return undefined;
  }

  // primitives can be compared directly
  if (ta !== 'object') {
    return a === b;
  }

  /*
    now objects or arrays
    I mean objects because arrays are objects
    but my implementation could cause an infinite loop
    so I treat arrays separately
    I am not making this rhyme because it is not supposed to be a poem
  */
  if (Array.isArray(a) && Array.isArray(b)) {
    const la = a.length;
    const lb = b.length;
    if (la !== lb) {
      return false;
    }
    if (la === lb && la === 0) {
      return true;
    }
    
    for (let i = 0; i < la; i++) {
      if (!literallyEquals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  // finally objects
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (!literallyEquals(ka, kb)) {
    return false;
  }
  for (let key of ka) {
    if(!literallyEquals(a[key], b[key])) {
      return false;
    }
  }
  return true;
};

const ltTouhou = (s, t) => {
  // console.log([30, s, t]);
  // 1.
  if (literallyEquals(t, 0)) {
    return false;
  }
  // console.log([31, s, t]);
  // 2.
  if (literallyEquals(t, 'O')) {
    return !literallyEquals(s, 'O');
  }
  // console.log([32, s, t]);
  // 3.
  const p = t.k;
  const xb = t.x;
  const mb = t.m;
  // 3.1.
  if (literallyEquals(s, 0)) {
    return true;
  }
  // 3.2.
  if (literallyEquals(s, "O")) {
    return false;
  }
  // 3.3.
  const k = s.k;
  const xa = s.x;
  const ma = s.m;
  // 3.3.1.
  // console.log([32.5, s, t, k, p, xa, ma, xb, mb]);
  // console.log([33, s, t]);
  if (literallyEquals(xa, xb)) {
    if (literallyEquals(k, p)) {
      // console.log([331, s, t, ma, mb]);
      return arrayLt(ma, mb);
    } else if (lt(k, p)) {
      return lt(star(k, xb), t);
    } else {
      return leq(s, star(p, xa));
    }
  }
  // console.log([34, s, t]);
  // 3.3.2.
  if (lt(xa, xb)) {
    // console.log("entered 332");
    // console.log([21, s, t, xb, star(s, xb), t, s, p]);
    return lt(star(s, xb), t) && lt(s, p);
  }
  // console.log([35, s, t]);
  // 3.3.3.
  // console.log([20, s, t, xa, k, s, star(t, xa), k, t]);
  return leq(s, star(t, xa)) || leq(k, t);
};

// maintainability? idk! RUNNING IS JUSTICE!!!
const ltNew = (s, t) => {
  // console.log([30, s, t]);
  // 1.
  if (literallyEquals(t, 0)) {
    return false;
  }
  // console.log([31, s, t]);
  // 2.
  if (literallyEquals(t, 'O')) {
    return !literallyEquals(s, 'O');
  }
  // console.log([32, s, t]);
  // 3.
  const p = t.k;
  const xb = t.x;
  const mb = t.m;
  // 3.1.
  if (literallyEquals(s, 0)) {
    return true;
  }
  // 3.2.
  if (literallyEquals(s, "O")) {
    return false;
  }
  // 3.3.
  const k = s.k;
  const xa = s.x;
  const ma = s.m;
  // 3.3.1.
  if (!ltNew(s, p)) {
    return false;
  }
  // 3.3.2.
  if (leq(xa, xb)) {
    // 3.3.2.1
    if (!triTriangle(k, t, xb)) {
      return false;
    }
    // 3.3.2.2.
    for (let alpha of ma) {
      if (!triTriangle(alpha, t, xb)) {
        return false;
      }
    }
  }
  // 3.3.3.
  // 3.3.3.1.
  if (ltNew(xa, xb)) {
    return true;
  }
  // 3.3.3.2.
  if (literallyEquals(xa, xb) && ltNew(k, p)) {
    return true;
  }
  // 3.3.3.3.
  if (literallyEquals(xa, xb) && literallyEquals(k, p) && arrayLt(ma, mb)) {
    return true;
  }
  // 3.3.3.4.
  if (leq(k, t)) {
    return true;
  }
  // 3.3.3.5.
  if (!triTriangle(p, s, xa)) {
    return true;
  }
  // 3.3.3.6.
  for (let beta of mb) {
    if (!triTriangle(beta, s, xa)) {
      return true;
    }
  }
  return false;
};

const lt = (s, t) => {
  if (useTouhoukyodaisuuVersion) {
    return ltTouhou(s, t);
  } else {
    return ltNew(s, t);
  }
};

const leq = (s, t) => {
  return literallyEquals(s, t) || lt(s, t);
};

const arrayLt = (a, b) => {
  // 1.
  if (a.length === 0) {
    return b.length !== 0;
  }
  // 2.
  if (b.length === 0) {
    return false;
  }
  // 3.
  const xa = a[0];
  const xb = b[0];
  const ma = a.slice(1);
  const mb = b.slice(1);
  return arrayLt(ma, mb) || (literallyEquals(ma, mb) && lt(xa, xb));
};

const star = (s, t) => {
  // console.log([40, s, t])
  // 2.
  if (literallyEquals(s, 0) || literallyEquals(s, 'O')) {
    return 0;
  }
  // 1.
  const k = s.k;
  const xa = s.x;
  const ma = s.m;
  // 1.1.
  if (lt(xa, t)) {
    // 1.1.1.
    if (leq(star(xa, t), star(k, t)) && leq(arrayStar(ma, t), star(k, t))) {
      return star(k, t);
    }
    // 1.1.2.
    if (lt(star(k, t), star(xa, t)) && leq(arrayStar(ma, t), star(xa, t))) {
      return star(xa, t);
    }
    // 1.1.3.
    if (lt(star(xa, t), arrayStar(ma, t)) && lt(star(k, t), arrayStar(ma, t))) {
      return arrayStar(ma, t);
    }
  // 1.2.
  } else {
    return s;
  }
};

const arrayStar = (a, t) => {
  // 1.
  if (a.length === 0) {
    return 0;
  }
  // 2.1.
  const xa = a[0];
  const ma = a.slice(1);
  if (leq(star(xa, t), arrayStar(ma, t))) {
    return arrayStar(ma, t);
  }
  // 2.2.
  return star(xa, t);
};

const triangle = (s, t) => {
  // 2.
  if (literallyEquals(t, 0) || literallyEquals(t, 'O')) {
    return false;
  }
  // 1.
  const p = t.k;
  const xb = t.x;
  // 1.2.
  if (literallyEquals(s, 0) || literallyEquals(s, 'O')) {
    return true;
  }
  // 1.1.
  const k = s.k;
  const a = [s.x].concat(s.m);
  const xa = s.x;
  // this is MATH, so "forall x in the empty set, something" is always true
  let theForallFlag = true;
  for (let alpha of a) {
    if (!triangle(alpha, t)) {
      theForallFlag = false;
      break;
    }
  }

  // console.log([10, s, t, k, t, xa, xb, s, t]);
  return triangle(k, t) && theForallFlag && (lt(xa, xb) || lt(s, t));
};

const triTriangle = (s, t, u) => {
  // 2.
  if (literallyEquals(s, 0) || literallyEquals(s, 'O')) {
    return true;
  }
  const k = s.k;
  const xa = s.x;
  const ma = s.m;
  const a = [xa].concat(ma);
  // 1.
  // 1.1.
  if (!triTriangle(k, t, u)) {
    return false;
  }
  // 1.2.
  for (let alpha of a) {
    if (!triTriangle(alpha, t, u)) {
      return false;
    }
  }
  // 1.3.
  if (lt(xa, u) || lt(s, t)) {
    return true;
  }
  return false;
};

const standard = (s) => {
  // 2.
  if (literallyEquals(s, 0) || literallyEquals(s, 'O')) {
    return true;
  }
  const k = s.k;
  const ma = s.m;
  const xa = s.x;
  const a = [xa].concat(ma);
  // 1.
  // 1.1.
  if (!standard(k)) {
    // console.log("1.1");
    return false;
  }
  // 1.2.
  for (let alpha of a) {
    if (!standard(alpha)) {
      // console.log("1.2");
      return false;
    }
  }
  if (useTouhoukyodaisuuVersion) {
    // 1.3.
    if (!triangle(k, s)) {
      // console.log("1.3a");
      return false;
    }
    // 1.4.
    for (let alpha of a) {
      if (!triangle(alpha, s)) {
        // console.log("1.4a");
        return false;
      }
    }
  } else {
    // 1.3.
    if (!triTriangle(k, k, xa)) {
      // console.log("1.3b");
      return false;
    }
    // 1.4.
    for (let alpha of a) {
      if (!triTriangle(alpha, k, xa)) {
        // console.log("1.4b");
        return false;
      }
    }
  }
  // 1.5.
  // not(P => Q) is equivalent to P and (not Q)
  if (ma.length !== 0 && literallyEquals(ma.slice(-1)[0], 0)) {
    // console.log("1.5");
    return false;
  }
  // 1.6.
  if (literallyEquals(k, 0)) {
    // console.log("1.6");
    return false;
  }
  // 1.7.
  if (literallyEquals(k, 0) || literallyEquals(k, 'O')) {
    return true;
  } else {
    // console.log("1.7");
    const mb = k.m;
    return arrayLt(ma, mb);
  }
};
/*
const zero = 0;
const O = 'O';

const one = { k: O, x: zero, m: [] };
const W1 = { k: O, x: zero, m: [O] };

const two = { k: W1, x: one, m: [] };
const three = { k: W1, x: two, m: [] };

const W0 = { k: W1, x: W1, m: [] };

const terms = [
  ['0', zero],
  ['O', O],
  ['1', one],
  ['W1', W1],
  ['2', two],
  ['3', three],
  ['W0', W0],
];

console.log(terms.sort((a, b) => {
  if (literallyEquals(a[1], b[1])) {
    console.log([a, b, 0]);
    return 0;
  } else if (lt(a[1], b[1])) {
    console.log([a, b, -1]);
    return -1;
  } else {
    console.log([a, b, 1]);
    return 1;
  }
}));
*/

// From here, listing all the standard expressions with N(s)<(some value)

// expressionCache[n] will have the sorted list of s's where N(s)=n
let expressionCacheTouhou = [null, [0, 'O']];
let expressionCacheNew = [null, [0, 'O']];

const partitions = (n, max = n) => {
  if (n == 0) {
    return [[]];
  }
  let result = [];
  for (let i = max; i >= 1; i--) {
    if (n - i >= 0) {
      const subpartitions = partitions(n - i, i);
      result = result.concat(subpartitions.map(array => [i].concat(array)));
    }
  }
  return result;
};

// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
const uniq = myArray => myArray.filter((value, index, array) =>
  array.findIndex(subvalue => literallyEquals(subvalue, value)) === index
);

// TODO: make it faster
// currently 200k permutations per second on my local computer
const arrayFactorial = array => {
  if (array.length === 0) {
    return [[]];
  } else {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      const rest = arrayFactorial(array.slice(0, i).concat(array.slice(i + 1)));
      result = result.concat(rest.map(subarray => [array[i]].concat(subarray)));
    }
    return result;
  }
}

// TODO: very slow
const uniqArrayFactorial = array => uniq(arrayFactorial(array));

const factorialPartitions = (n) => {
  const unorderedPartitions = partitions(n);
  let result = [];
  unorderedPartitions.forEach(unorderedPartition => {
    result = result.concat(uniqArrayFactorial(unorderedPartition));
  })
  return result;
}

// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
const times = (a, b) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
const cartesian = (a, b, ...c) => b ? cartesian(times(a, b), ...c) : a;

const nsEnumerate = (n) => {
  let cache;
  if(useTouhoukyodaisuuVersion) {
    cache = expressionCacheTouhou[n];
  } else {
    cache = expressionCacheNew[n];
  }

  if (cache !== undefined) {
    return cache;
  } else {
    const partitionList = factorialPartitions(n);
    const candidates = [];

    for (let partition of partitionList) {
      // console.log([2, partition]);
      if (partition.length === 1) {
        continue;
      }
      /* !!! EXPONENTIAL EXPLOSION BELOW !!! */
      const candidatesList = partition.map(num => nsEnumerate(num));
      const directProduct = cartesian(...candidatesList);
      for (let candidate of directProduct) {
        const term = {
          k: candidate[0],
          x: candidate[1],
          m: candidate.slice(2),
        };
        if (standard(term)) {
          candidates.push(term);
        }
      }
      /* !!! EXPONENTIAL EXPLOSION ABOVE !!! */
    }
    if(useTouhoukyodaisuuVersion) {
      expressionCacheTouhou[n] = candidates;
    } else {
      expressionCacheNew[n] = candidates;
    }
    return candidates;
  }
}

// leqSortedExpressionCache[n] will have the sorted list of s's where N(s)<=n
let leqSortedExpressionCacheTouhou = [null, [0, 'O']];
let leqSortedExpressionCacheNew = [null, [0, 'O']];

const nsLeqSortedEnumerate = (n) => {
  let cache;
  if(useTouhoukyodaisuuVersion) {
    cache = leqSortedExpressionCacheTouhou[n];
  } else {
    cache = leqSortedExpressionCacheNew[n];
  }

  if (cache !== undefined) {
    return cache;
  } else {
    let expressions = [];
    for (let i = 1; i <= n; i++) {
      expressions = expressions.concat(nsEnumerate(i));
    }
    console.log({expressions})
    const sortedExpressions = expressions.sort((a, b) => {
      if (literallyEquals(a, b)) {
        return 0;
      } else if (lt(a, b)) {
        return -1;
      } else {
        return 1;
      }
    });
    if(useTouhoukyodaisuuVersion) {
      leqSortedExpressionCacheTouhou[n] = sortedExpressions;
    } else {
      leqSortedExpressionCacheNew[n] = sortedExpressions;
    }
    return sortedExpressions;
  }
}

nsEnumerate(6);
// console.log(useTouhoukyodaisuuVersion ? expressionCacheTouhou : expressionCacheNew);

// const test1 = nsLeqSortedEnumerate(6);
/*
const a = 0;
const b = 20;
const test2 = test1.slice(a, b);
console.log(test1);
console.log(test2);


for (let i = 0; i < (b - a); i++) {
  for (let j = 0; j < (b - a); j++) {
    const x = lt(test2[i], test2[j]) === lt(test2[j], test2[i]) ? "!!!!!!" : "";
    const y = ((i < j) === lt(test2[i], test2[j])) ? "" : "WONDERHOY";
    console.log(a + i, a + j, lt(test2[i], test2[j]), lt(test2[j], test2[i]), x, y);
  }
}
*/

/*
const cycleA = 4;
const cycleB = 9;
const cycleC = 10;

console.log(test1[cycleA], test1[cycleB], test1[cycleC]);
console.log(standard(test1[cycleA]), standard(test1[cycleB]), standard(test1[cycleC]));
console.log(lt(test1[cycleA], test1[cycleB]));
console.log(lt(test1[cycleB], test1[cycleC]));
console.log(lt(test1[cycleC], test1[cycleA]));
*/

/*
console.log("-----------");
console.log(lt(test1[85], test1[80]));
*/
// console.log(test1[59], test1[60], lt(test1[59], test1[60]), lt(test1[60], test1[59]));

// console.log(nsenumerate(8));
// console.log(expressionCache);

/*
const temp1 = { k: 'O', x: 'O', m: ['O', 'O'] };
const temp2 = { k: temp1, x: { k: 'O', x: 'O', m: ['O'] }, m: [] };
lt(temp1, temp2);
*/
