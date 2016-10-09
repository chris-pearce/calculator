import {STYLE_CLASSES, NUMBER_BUTTON_TEXT_NODES} from './constants';


/**
 * @function createOutputScreen
 * @description Create an output screen with zero set as the default text node.
 * @return {Node} - `<output>` element.
 */
const createOutputScreen = () => {
    const elem = document.createElement('output');

    const textNode = document.createTextNode(NUMBER_BUTTON_TEXT_NODES.zero.display);

    elem.classList.add(STYLE_CLASSES.outputScreen);

    elem.appendChild(textNode);

    return elem;
};


export default createOutputScreen;
