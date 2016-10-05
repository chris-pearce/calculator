import {OPERATOR_BUTTON_TEXT_NODES, NUMBER_BUTTON_TEXT_NODES} from './constants';
import buttonsInOrder from './buttonsInOrder';
import updateOutputScreenTextNode from './updateOutputScreenTextNode';


/**
 * @function handleInput
 * @description All the logic for the calculator input handled by the nested closure function
 *              (see its @description).
 * @return {Function}
 */
const handleInput = () => {

    /**
     * All the operators in an array in the order specified by the `order` key of the button text
     * node object.
     * @type {Array}
     */
    const operators = buttonsInOrder(OPERATOR_BUTTON_TEXT_NODES);


    /**
     * An internal state object used to store and determine type of input (number and operator).
     * The inputs get pushed into the expression array e.g. `[12 + 3]` so they can be calculated
     * on.
     * @type {Object}
     */
    let state = {
        number: '',
        operator: '',
        expression: []
    };


    /**
     * @function resetState
     * @description Reset the internal state object ready for a new calculation.
     * @return {Object} - The state object reset.
     */
    const resetState = () => {
        return {
            number: '',
            operator: '',
            expression: []
        };
    };


    /**
     * @function handleInputInner
     * @description handle the two inputs: number and operator so the `eval` function can
     *              correctly perform a calculation when the equals button is pressed. See inline
     *              comments.
     * @param  {Object} e - The click event set on the calculator container element.
     */
    const handleInputInner = e => {

        /**
         * Check for operator button key press.
         * @type {Boolean}
         */
        const isOperatorKeyPress = operators.indexOf(e.target.value) > -1;


        /**
         * Check for decimal button key press.
         * @type {Boolean}
         */
        const isDecimalKeyPress = e.target.value === NUMBER_BUTTON_TEXT_NODES.decimal.display;


        /**
         * Check for zero button key press.
         * @type {Boolean}
         */
        const isZeroKeyPress = e.target.value === NUMBER_BUTTON_TEXT_NODES.zero.display;


        /**
         * If number input.
         */
        if (!isOperatorKeyPress) {

            /**
             * Check if a decimal character exists in the number key value of the internal state
             * object.
             * @type {Boolean}
             */
            const hasDecimal = state.number.indexOf(NUMBER_BUTTON_TEXT_NODES.decimal.display) > -1;

            /**
             * If illegal input of subsequent decimal's occurs exit `handleInputInner()`.
             */
            if (isDecimalKeyPress && hasDecimal) {
                return false;
            }


            /**
             * If illegal input of subsequent zero's with no other number input occurs exit
             * `handleInputInner()`.
             */
            if (isZeroKeyPress && state.number === NUMBER_BUTTON_TEXT_NODES.zero.display) {
                return false;
            }


            /**
             * If first input is a decimal prepend a zero e.g. `.2` = `0.2`.
             */
            if (isDecimalKeyPress && state.number.length === 0) {
                state.number = NUMBER_BUTTON_TEXT_NODES.zero.display;
            }


            /**
             * Store number input including subsequent number inputs.
             */
            state.number += e.target.value;


            /**
             * Print the number input to the output screen.
             */
            updateOutputScreenTextNode(state.number);


            /**
             * If anything exists in the operator key value of the internal state object push it
             * into the expression array then clear it ready for the next operator input.
             */
            if (state.operator) {
                state.expression.push(state.operator);
                state.operator = '';
            }


        /**
         * If operator input and either the expression array is not empty or the number key value
         * of the internal state object is not blank.
         */
        } else if (isOperatorKeyPress && (state.expression.length || state.number !== '')) {

            /**
             * If the number key value of the internal state object is not blank push it into the
             * expression array then clear it ready for the next number input.
             */
            if (state.number !== '') {
                state.expression.push(state.number);
                state.number = '';
            }


            /**
             * Store operator input.
             */
            state.operator = e.target.value;
        }


        /**
         * If equals input perform calculation by passing the expression array to the `eval`
         * function and printing the result to the output screen.
         */
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.equals.display) {
            let calculation = eval(state.expression.join(''));

            updateOutputScreenTextNode(calculation);
        }


        /**
         * Clear all inputs via the 'Clear' button.
         */
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.clear.display) {
            state = resetState();

            updateOutputScreenTextNode(NUMBER_BUTTON_TEXT_NODES.zero.display);
        }
    };

    return handleInputInner;
};


export default handleInput;
