import moment from "moment";
export function insertIntoArray(arr, valueFunc) {
  return arr.reduce((result, element, index, array) => {
    result.push(element);

    if (index < array.length - 1) {
      result.push(valueFunc(index));
    }

    return result;
  }, []);
}

export function shortDateFormat(timestamp) {
  return moment.unix(timestamp).format("MMM d, YYYY");
}

export function timeLeftFormat(timestamp) {
  return moment.unix(timestamp).toNow(true);
}
