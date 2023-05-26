const keyMap = {
  [process.env.OPENAI_API_KEY1]: 0,
  [process.env.OPENAI_API_KEY2]: 0,
  [process.env.OPENAI_API_KEY3]: 0,
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