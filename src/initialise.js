import {
    NUMBER_BUTTON_TEXT_NODES,
    OPERATOR_BUTTON_TEXT_NODES,
    ROOT,
    STYLE_CLASSES
} from 'constants';
import handleInput from 'handleInput';


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

    ROOT.addEventListener('click', clickEvent);

    /**
     * Initialise the creation of the output screen.
     */
    createOutputScreen();

    /**
     * Initialise the creation of the keypads.
     */
    createKeypad(STYLE_CLASSES.keypadNumbers, NUMBER_BUTTON_TEXT_NODES);

    createKeypad(STYLE_CLASSES.keypadOperators, OPERATOR_BUTTON_TEXT_NODES);
};


export default initialise;
