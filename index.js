const levelup = require("levelup");
const leveldown = require("leveldown");
const express = require("express");
const db = levelup(leveldown("./my-db"));
const app = express();
const port = 3000;

let volumes = [];

app.get("/:key", async (req, res) => {
  const key = req.params.key; //TODO: What if no param?
  let volume;
  try {
    volume = await db.get(key);
  } catch (err) {
    if (err.notFound) {
      return res.sendStatus(404);
    }
    console.error(err);
    return res.status(500).send("Unknown server error");
  }
  keyVolume = lib.key2volume(key, volumes);
  if (volume != keyVolume) {
    console.log("Key on wrong volume, needs rebalancing");
  }
  res.redirect(302, `http://${volume}${lib.key2path(key)}`);
});

app.put("/:key", async (req,res) => {
  /*
  // no empty values
    if r.ContentLength == 0 {
      w.WriteHeader(411)
      return
    }

    _, err := a.db.Get(key, nil)

    // check if we already have the key
    if err != leveldb.ErrNotFound {
      // Forbidden to overwrite with PUT
      w.WriteHeader(403)
      return
    }

    // we don't, compute the remote URL
    kvolume := key2volume(key, a.volumes)
    remote := fmt.Sprintf("http://%s%s", kvolume, key2path(key))

    if remote_put(remote, r.ContentLength, r.Body) != nil {
      // we assume the remote wrote nothing if it failed
      w.WriteHeader(500)
      return
    }

    // push to leveldb
    // note that the key is locked, so nobody wrote to the leveldb
    if err := a.db.Put(key, []byte(kvolume), nil); err != nil {
      // should we delete?
      w.WriteHeader(500)
      return
    }

    // 201, all good
    w.WriteHeader(201)
    */
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
