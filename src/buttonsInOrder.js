/**
 * @function buttonsInOrder
 * @description Create an array of button text nodes from the `order` and `display` keys of a
 *              button text node object in the order specified by the `order` key.
 * @param  {Object} textNodes - Object of button text nodes.
 * @return {Array} - Array of button text nodes in their correct order e.g.
 *                   `[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.']`.
 */
const buttonsInOrder = (textNodes) => {
    let textNodesInOrder = [];

    for (let key in textNodes) {
        textNodesInOrder[textNodes[key].order] = textNodes[key].display;
    }

    return textNodesInOrder;
};


export default buttonsInOrder;
