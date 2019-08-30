function decodeWsFrame (data) {
  // 游标
  let start = 0
  // 定义帧字段格式
  let frame = {
    isFinal: (data[start] & 0x80) === 0x80,
    opcode: data[start++] & 0xF,
    masked: (data[start] & 0x80) === 0x80,
    payloadLen: data[start++] & 0x7F,
    maskingKey: '',
    payloadData: null
  }
  // 接下来的两字节对应的无符号整数作为负载长度
  if (frame.payloadLen === 126) {
    frame.payloadLen = (data[start++] << 8) + data[start++]
  } else if (frame.payloadLen === 127) { // 扩展的 8 字节对应的无符号整数作为负载长度
    frame.payloadLen = 0
    for (let i = 7; i >= 0; --i) {
      frame.payloadLen += (data[start++] << (i * 8))
    }
  }

  if (frame.payloadLen) {
    // 如果使用了掩码
    if (frame.masked) {
      // 掩码键
      const maskingKey = [
        data[start++],
        data[start++],
        data[start++],
        data[start++]
      ]

      frame.maskingKey = maskingKey
      // 负载数据与四字节的掩码键的每一个字节轮流进行按位抑或运算
      frame.payloadData = data
        .slice(start, start + frame.payloadLen)
        .map((byte, idx) => byte ^ maskingKey[idx % 4])
    } else {
      frame.payloadData = data.slice(start, start + frame.payloadLen)
    }
  }

  return frame
}

function hexToArr (str) {
  // return str.split(' ').map(item => parseInt(item, 16))

  str = str.replace(/(\r|\n)/g, ' ').replace(/\s{2,}/g, ' ')
  return str.split(' ').map(item => parseInt(item, 16))
}

let s = `c1 9f c6 8b 7c 69 f4 ba f6 3f 0c 42 33 a6 0a d8 ae c0 90 a1 51 27 eb 41 37 a5 8b de ce 3b 8c c7 28 c3 4b 8e 7c`
let data = Buffer.from(hexToArr(s))

console.log(data)

data = decodeWsFrame(data) // 数据帧解码

// data = Buffer.from(data) // 数据帧解码
console.log(data)  // 打印帧

console.log(String(data.payloadData))
