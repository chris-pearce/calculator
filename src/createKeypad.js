import {DOM, STYLE_CLASSES} from './constants';
import createButtons from './createButtons';


/**
 * @function createKeypad
 * @description Create a keypad from an object of button text nodes, append a batch of buttons to
 *              the keypad then append the keypad to the calculator container.
 * @param  {string} CSSClass - CSS class.
 * @param  {Object} textNodes - Object of button text nodes.
 */
const createKeypad = (CSSClass, textNodes) => {
    const elem = document.createElement('div');

    elem.classList.add(STYLE_CLASSES.keypad, CSSClass);

    const buttons = createButtons(textNodes);

    elem.appendChild(buttons);

    DOM.root.appendChild(elem);
};


export default createKeypad;
