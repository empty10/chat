function hexToArr (str) {
  // return str.split(' ').map(item => parseInt(item, 16))

  str = str.replace(/(\r|\n)/g, ' ').replace(/\s{2,}/g, ' ')
  return str.split(' ').map(item => parseInt(item, 16))
}

function decode (ENCODED, MASK) {
  ENCODED = hexToArr(ENCODED)
  MASK = hexToArr(MASK)
  console.log('MASK==', MASK)
  var DECODED = []
  for (var i = 0; i < ENCODED.length; i++) {
    DECODED[i] = (ENCODED[i] ^ MASK[i % 4])
  }
  console.log('DECODED==', utf8(DECODED))
}

function utf8 (arr) {
  var buf = Buffer.from(arr)
  console.log(buf)
  return buf.toString()
}

console.log(111)

decode(`1b a8 85 b7 43 f5 b9 
fc 41 b8 f2 ee 0d ef ad f0 5d f4 bf f8 4a b8 e4
b7 1e ab fc e8 72`, '2f 9a de 95')
