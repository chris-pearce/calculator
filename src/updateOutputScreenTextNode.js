import {DOM} from './constants';


/**
 * @function updateOutputScreenTextNode
 * @description Update the text node of the output screen.
 * @param  {string|number} textNode - Text node.
 */
const updateOutputScreenTextNode = (textNode) => {
    DOM.outputScreen.textContent = textNode;
};


export default updateOutputScreenTextNode;
