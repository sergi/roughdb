const crypto = require("crypto");

function key2path(key) {
  let hash = crypto
    .createHash("md5")
    .update(key)
    .digest("hex");
  let buff = new Buffer(key);
  let base64data = buff.toString("base64");
  // fmt.Sprintf("/%02x/%02x/%s", mkey[0], mkey[1], b64key)
  return `/${hash.substring(0, 2)}/${hash.substring(2, 4)}/${base64data}`;
}

function key2volume(key, volumes) {
  let bestScore = Buffer.from("");
  let ret = "";
  for (var i = 0; i < volumes.length; i++) {
    const v = volumes[i];
    const hash = crypto.createHash("md5");
    hash.update(key);
    hash.update(v);
    score = hash.digest();
    if (bestScore.length === 0 || bestScore.compare(score) === -1) {
      bestScore = score;
      ret = v;
    }
  }
  return ret;
}

// func key2volume(key []byte, volumes []string) string {
//   // this is an intelligent way to pick the volume server for a file
//   // stable in the volume server name (not position!)
//   // and if more are added the correct portion will move (yay md5!)
//   var best_score []byte = nil
//   var ret string = ""
//   for _, v := range volumes {
//     hash := md5.New()
//     hash.Write(key)
//     hash.Write([]byte(v))
//     score := hash.Sum(nil)
//     if best_score == nil || bytes.Compare(best_score, score) == -1 {
//       best_score = score
//       ret = v
//     }
//   }
//   //fmt.Println(string(key), ret, best_score)
//   return ret
// }

module.exports = {
  key2path,
  key2volume
};
