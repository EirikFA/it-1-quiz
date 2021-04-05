export const capitalise = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

// Yes, this is from Stack Overflow
// https://stackoverflow.com/a/2450976/6090379
export const shuffle = <T>(array: T[]) => {
  const out = array.slice();
  let currentIdx = out.length;
  let tempValue: T;
  let randomIdx: number;

  // While there remain elements to shuffle...
  while (currentIdx !== 0) {
    // Pick a remaining element...
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx -= 1;

    // And swap it with the current element.
    tempValue = out[currentIdx];
    out[currentIdx] = out[randomIdx];
    out[randomIdx] = tempValue;
  }

  return out;
};
