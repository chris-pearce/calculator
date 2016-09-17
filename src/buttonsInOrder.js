/**
 * @function buttonsInOrder
 * @description Create an array of button display values (aka button text nodes) from the `order`
 *              and `display` keys of a button text node object in the order specified by the
 *              `order` key.
 * @param  {Object} obj - A button text node object.
 * @return {Array} - Array of button display values in their correct order e.g.
 *                   `[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."]`.
 */
const buttonsInOrder = (buttonTextNodeObject) => {
    let array = [];

    for (let key in buttonTextNodeObject) {
        array[buttonTextNodeObject[key].order] = buttonTextNodeObject[key].display;
    }

    return array;
};


export default buttonsInOrder;
