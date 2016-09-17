import {OPERATOR_BUTTON_TEXT_NODES} from 'constants';
import {add, subtract, multiply, divide} from 'arithmeticOperations';
import buttonsInOrder from 'buttonsInOrder';
import insertOutputScreenData from 'insertOutputScreenData';


/**
 * @function handleInput
 * @description A wrapper function that creates the internal state object and it's reset
 *              counterpart, the `const` that stores all of the operators, and the all important
 *              closure function (see its @description).
 * @return {Function}
 */
const handleInput = () => {

    /**
     * Store all of the operators.
     * @type {Array}
     */
    const operators = buttonsInOrder(OPERATOR_BUTTON_TEXT_NODES);

    /**
     * Store the clear button.
     * @type {string}
     */
    const isClearButton = OPERATOR_BUTTON_TEXT_NODES.clear.display;


    /**
     * An internal state object to keep track of inputs for each calculation.
     * @type {Object}
     */
    let state = {
        firstNumber: '',
        operator: '',
        secondNumber: ''
    };


    /**
     * @function resetState
     * @description Reset the internal state object ready for a new calculation.
     * @return {Object} - The state object reset.
     */
    const resetState = () => {
        return {
            firstNumber: '',
            operator: '',
            secondNumber: ''
        };
    };


    /**
     * @function handleInputInner
     * @description Using a series of conditional statements this closure function sends the
     *              number inputs to the relevant arithmetic operation function and passes the
     *              number inputs and calculation result to the output screen function. It also
     *              handles resetting the inputs when the 'C' button is pressed.
     * @param  {Object} e - The click event set on the calculator container element.
     */
    const handleInputInner = e => {

        /**
         * Check if an input is an operator.
         * @type {Boolean}
         */
        const isOperator = operators.indexOf(e.target.value) > -1;


        /**
         *
         */
        if (!isOperator && state.operator === '') {
            state.firstNumber += e.target.value;
            insertOutputScreenData(state.firstNumber);
        } else if (isOperator && state.firstNumber !== '' && state.secondNumber === '') {
            state.operator = e.target.value;
            insertOutputScreenData(state.firstNumber);
        } else if (!isOperator && state.operator !== '') {
            state.secondNumber += e.target.value;
            insertOutputScreenData(state.secondNumber);
        } else if (state.secondNumber !== '' && isOperator) {

            let result;

            // Pass the relevant operator to its matching function
            switch (state.operator) {
                case OPERATOR_BUTTON_TEXT_NODES.divide.display:
                    result = divide(state.firstNumber, state.secondNumber);
                    break;
                case OPERATOR_BUTTON_TEXT_NODES.multiply.display:
                    result = multiply(state.firstNumber, state.secondNumber);
                    break;
                case OPERATOR_BUTTON_TEXT_NODES.subtract.display:
                    result = subtract(state.firstNumber, state.secondNumber);
                    break;
                case OPERATOR_BUTTON_TEXT_NODES.add.display:
                    result = add(state.firstNumber, state.secondNumber);
                    break;
            }

            insertOutputScreenData(result);

            // Running total
            state.firstNumber = String(result);

            // Grab the new operator
            state.operator = e.target.value;

            // Reset to allow for further calculations
            state.secondNumber = '';
        }

        // Reset state via the 'Clear' operator
        if (e.target.value === isClearButton) {
            state = resetState();
            insertOutputScreenData(0);
        }
    };

    return handleInputInner;
};


export default handleInput;
