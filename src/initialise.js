import {
    NUMBER_BUTTON_TEXT_NODES,
    OPERATOR_BUTTON_TEXT_NODES,
    ROOT,
    STYLE_CLASSES
} from 'constants';


/**
 * @function initialise
 * @description Initialise the calculator program.
 */
const initialise = () => {

    // Add a click event to the calculator container element
    const clickEvent = handleInput();

    ROOT.addEventListener('click', clickEvent);

    // Call the functions that create the two main UI sections of the calculator
    createOutputScreen();

    createKeypad(STYLE_CLASSES.keypadNumbers, NUMBER_BUTTON_TEXT_NODES);

    createKeypad(STYLE_CLASSES.keypadOperators, OPERATOR_BUTTON_TEXT_NODES);
};


export default initialise;
