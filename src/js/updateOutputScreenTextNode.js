import {DOM} from './constants';


/**
 * @function updateOutputScreenTextNode
 * @description Update the text node of the output screen.
 * @param  {string|number} textNode - Text node.
 */
const updateOutputScreenTextNode = textNode => {
    // let newTextNode = textNode;
    // const currentTextNode = DOM.outputScreen.textContent;
    DOM.outputScreen.insertBefore(textNode, DOM.outputScreen.textContent.nextSibling);

    // DOM.outputScreen.textContent = textNode;
};


export default updateOutputScreenTextNode;
