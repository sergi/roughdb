const test = require("tape");
const lib = require("../lib.js");

test("keyPath test", function(t) {
  t.plan(2);
  let tests = {
    hello: "/5d/41/aGVsbG8=",
    helloworld: "/fc/5e/aGVsbG93b3JsZA=="
  };

  for (let [k, v] of Object.entries(tests)) {
    let ret = lib.key2path(k);
    t.equal(ret, v, `'${k}' encodes to '${v}'`);
  }
});

test("keyVolume test", function(t) {
  t.plan(4);
  let volumes = ["larry", "moe", "curly"];
  let tests = {
    hello: "larry",
    helloworld: "curly",
    world: "moe",
    blah: "curly"
  };
  for (let [k, v] of Object.entries(tests)) {
    let ret = lib.key2volume(k, volumes);
    t.equal(ret, v, `'${ret}' encodes to '${v}'`);
  }
});
