import {
    DOM,
    NUMBER_BUTTON_TEXT_NODES,
    OPERATOR_BUTTON_TEXT_NODES,
    STYLE_CLASSES
} from './constants';
import handleInput from './handleInput';


/**
 * @function initialise
 * @description Initialise the calculator program.
 */
const initialise = () => {
    /**
     * Add a click event to the calculator container element.
     * @type {Function}
     */
    const clickEvent = handleInput();

    DOM.root.addEventListener('click', clickEvent);

    /**
     * Append the output screen to the calculator container.
     */
    DOM.root.appendChild(DOM.outputScreen);

    /**
     * Initialise the creation of the keypads.
     */
    createKeypad(STYLE_CLASSES.keypadNumbers, NUMBER_BUTTON_TEXT_NODES);

    createKeypad(STYLE_CLASSES.keypadOperators, OPERATOR_BUTTON_TEXT_NODES);
};


export default initialise;
