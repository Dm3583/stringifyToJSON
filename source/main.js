function parseToJSON(arg) {
  var res;
  function setValue(prop) {
    if (typeof prop === "string") {
      return '"' + prop + '"';
    } else if (typeof prop === "number") {
      return prop;
    } else if (
      typeof prop === "function" ||
      prop === undefined ||
      typeof prop === "symbol"
    ) {
      return null;
    } else {
      return prop;
    }
  }
  if (Array.isArray(arg)) {
    res = "[";
    for (var i = 0; i < arg.length; i++) {
      if (i > 0) {
        res += ",";
      }
      if (typeof arg[i] === "object") {
        res = res.concat(parseToJSON(arg[i]));
      } else {
        res += setValue(arg[i]);
      }
    }
    return (res += "]");
  }
  if (typeof arg === "object" && arg !== null) {
    res = "{";
    for (var key in arg) {
      if (res.length > 2) {
        res += ",";
      }
      if (typeof arg[key] !== "object") {
        res += '"' + key + '"' + ":" + setValue(arg[key]);
      } else {
        res += '"' + key + '"' + ":" + parseToJSON(arg[key]);
      }
    }
    return (res += "}");
  }
  if (typeof arg === "function" || typeof arg === "symbol") {
    return undefined;
  }
  if (typeof arg === "number") {
    return arg.toString();
  }
  if (arg === null) {
    return "null";
  }
  return arg;
}

var obj = {
  k: 1,
  g: "wert",
  df: [4, true, undefined, "sdfg", console.log("hello")],
  we: { t: "i", n: { z: "fh", l: 7 } },
};

var sym = Symbol("e");

var arr = [3, 9, -9, { h: "o", g: [2, 45, 7], j: { o: [[3]], j: "o" } }];

console.log(parseToJSON(obj));
console.log(JSON.stringify(obj));
console.log(parseToJSON(arr));
console.log(JSON.stringify(arr));

console.log(parseToJSON(7));
console.log(JSON.stringify(7));

console.log(parseToJSON(null));
console.log(JSON.stringify(null));

console.log(parseToJSON(undefined));
console.log(JSON.stringify(undefined));

console.log(parseToJSON(console.log));
console.log(JSON.stringify(console.log));

console.log(parseToJSON(sym));
console.log(JSON.stringify(sym));

var json = parseToJSON(obj);
var json2 = JSON.stringify(obj);

console.log(JSON.parse(json));
console.log(JSON.parse(json2));
