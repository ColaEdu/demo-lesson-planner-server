const keyMap = {
  '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': 0,
  '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': 0,
  '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': 0
};

class OpenAIKey {
  constructor(key) {
    this.key = key;
    this.isReleased = false;
  }

  toString () {
    if (this.isReleased) {
      return;
    }
    return this.key;
  }

  release () {
    this.isReleased = true;
    keyMap[this.key] = 0;
  }

  popKey () {
    if (this.isReleased) {
      return;
    }
    delete keyMap[this.key];
  }
}


function getKey () {
  for (let key in keyMap) {
    if (keyMap[key] === 0) {
      keyMap[key] = 1;
      return new OpenAIKey(key);
    }
  }
}

module.exports = getKey;

// // 获取key
// const key = getKey();

// // 使用key
// console.log(key + '')

// // 释放key
// key.release();

// // 废弃key
// key.popKey();