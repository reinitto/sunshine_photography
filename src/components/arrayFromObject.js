export let arrayFromObject = (obj) => {
  let arr = [];
  if (Object.keys(obj).length === 0) {
    return arr;
  }
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      let val = Object.assign({}, obj[key]);
      arr.push(val);
    } else {
      arr.push(obj[key]);
    }
  });
  return arr;
};

export default arrayFromObject;
