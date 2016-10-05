/**
 * @function createButton
 * @description Create a button element that accepts a text node.
 * @param  {string} textNode - Button text node.
 * @return {Node} - `<button>` element.
 */
const createButton = textNode => {
    const elem = document.createElement('button');

    const elemTextNode = document.createTextNode(textNode);

    elem.appendChild(elemTextNode);

    elem.setAttribute('type', 'button');

    elem.setAttribute('value', textNode);

    return elem;
};


export default createButton;
