const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(method = true) {
    this.method = method;
    this.alph = 'abcdefghijklmnopqrstuvwxyz';
  }

  map(string) {
    return string.split('').map((el) => this.alph.includes(el) ? this.alph.indexOf(el) : el);
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let messageMap = this.map(message.toLowerCase());
    const keyMap = this.map(key.toLowerCase());
    let count = 0;

    messageMap.forEach((el, i, arr) => {
      if (typeof el === 'number') {
        const index = (el + keyMap[count]) % 26;
        arr[i] = this.alph[index];
        count++;
        if (count >= keyMap.length) count = 0;
      }
    });

    return this.method ? messageMap.join('').toUpperCase() : messageMap.reverse().join('').toUpperCase(); 
  }
  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let messageMap = this.map(message.toLowerCase());
    const keyMap = this.map(key.toLowerCase());
    let count = 0;

    messageMap.forEach((el, i, arr) => {
      if (typeof el === 'number') {
        let index = (el - keyMap[count]) % 26;
        if (index < 0) index = (index + 26) % 26;
        arr[i] = this.alph[index];
        count++;
        if (count >= keyMap.length) count = 0;
      }
    });

    return this.method ? messageMap.join('').toUpperCase() : messageMap.reverse().join('').toUpperCase(); 
  }
}

module.exports = {
  VigenereCipheringMachine
};
