module.exports = function check(str, bracketsConfig = [['(', ')'], ['[', ']'], ['{', '}']]) {
  debugger;
  let openBrackets = [];
  let equalBrackets = [];
  let pairs = {};
  if (bracketsConfig.length) {
    bracketsConfig.map(item => {
        openBrackets.push(item[0]);
        let closed = item[1];
        pairs[closed] = item[0];
        if (item[0] == item[1]) {
          equalBrackets.push(item[0]);
        }
    })
  } else {
    openBrackets = ['(', '{', '['];
    pairs = {
      ')': '(',
      '}': '{',
      ']': '['
    };
  }

  let stack = [];
  const arr = str.split('').filter(element => {
    if (openBrackets.includes(element) || pairs[element]) {
      return element;
    }
  });

  for (let i = 0; i < arr.length; i++) {
    if (openBrackets.includes(arr[i])) {
      stack.push(arr[i]);
    } else {
      if (stack.length) {
        let lastItem = stack.pop();
        while (equalBrackets.includes(lastItem)) {
          let first = lastItem;
          let second = stack.pop();
          if (first == second);
          lastItem = stack.pop();
        }
        if (pairs[arr[i]] !== lastItem) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  while(stack.length && (stack.length%2 === 0)) {
    let first = stack.pop();
    let second = stack.pop();
    if (first !== second) {
      return false;
    }
  }

  return stack.length === 0;
}
