import {STYLE_CLASSES} from './constants';


/**
 * @function createOutputScreen
 * @description Create an output screen element with '0' set the default text node.
 * @return {Node} - `<output>` element.
 */
const createOutputScreen = () => {
    const elem = document.createElement('output');

    const textNode = document.createTextNode('0');

    elem.classList.add(STYLE_CLASSES.outputScreen);

    elem.appendChild(textNode);

    return elem;
};


export default createOutputScreen;
