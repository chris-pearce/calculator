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

    let keyPress = '';

    /**
     * All the operators in an array in the order specified by the `order` key of the button text
     * node object.
     * @type {Array}
     */
    const operators = buttonsInOrder(OPERATOR_BUTTON_TEXT_NODES);


    /**
     * An internal state object used to store and determine type of input (number and operator).
     * The inputs get pushed into the expression array e.g. `[12 + 3]` to be calculated on.
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
         * If click event target is not a `<button>` element don't proceed.
         */
        if (e.target.tagName !== 'BUTTON') {
            return false;
        }


        /**
         * Store operator button key press.
         * @type {Boolean}
         */
        const isOperatorKeyPress = operators.indexOf(e.target.value) > -1;


        /**
         * Store decimal button key press.
         * @type {Boolean}
         */
        const isDecimalKeyPress = e.target.value === NUMBER_BUTTON_TEXT_NODES.decimal.display;


        /**
         * Store zero button key press.
         * @type {Boolean}
         */
        const isZeroKeyPress = e.target.value === NUMBER_BUTTON_TEXT_NODES.zero.display;


        /**
         * If number input.
         */
        if (!isOperatorKeyPress) {

            /**
             * Check if a decimal character exists in the number input.
             * @type {Boolean}
             */
            const hasDecimal = state.number.indexOf(NUMBER_BUTTON_TEXT_NODES.decimal.display) > -1;

            /**
             * Prevent this input: '..2', '2..4' i.e. two or more decimals in a row.
             */
            if (isDecimalKeyPress && hasDecimal) {
                return false;
            }


            /**
             * Prevent this input: '002' i.e. two or more zeros in a row before a number input.
             */
            if (isZeroKeyPress && state.number === NUMBER_BUTTON_TEXT_NODES.zero.display) {
                return false;
            }


            /**
             * Amend this input: '.2' to be '0.2' i.e. prepend a zero to a decimal when the
             * decimal is the first input.
             */
            if (isDecimalKeyPress && state.number.length === 0) {
                state.number = NUMBER_BUTTON_TEXT_NODES.zero.display;
            }


            /**
             * Store number inputs.
             */
            state.number += e.target.value;


            /**
             * Print number input to the output screen.
             */
            updateOutputScreenTextNode(e.target.value);


            /**
             * If operator exists in the internal state object push the operator into the
             * expression array then clear the operator ready for the next operator input.
             */
            if (state.operator) {
                state.expression.push(state.operator);
                state.operator = '';
            }


        /**
         * If operator key press and either the expression array is not empty or number exists in
         * the internal state object.
         */
        } else if (isOperatorKeyPress && (state.expression.length || state.number !== '')) {

            /**
             * If number exists in the internal state object push the number into the expression
             * array then clear the number ready for the next number input.
             */
            if (state.number) {
                state.expression.push(state.number);
                state.number = '';
            }


            /**
             * Store operator input.
             */
            state.operator = e.target.value;


            /**
             * Print operator input to the output screen.
             */
            if (!operators.indexOf(keyPress) > -1) {
                updateOutputScreenTextNode(` ${state.operator} `);
            }
        }


        keyPress = e.target.value;


        /**
         * If equals key press perform calculation by passing the expression array to the `eval`
         * function and printing the result to the output screen.
         */
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.equals.display) {
            let calculation = eval(state.expression.join(''));

            updateOutputScreenTextNode(calculation);
        }


        /**
         * If clear key press reset the internal state object ready for a new calculation and
         * print a zero to the output screen.
         */
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.clear.display) {
            state = resetState();

            updateOutputScreenTextNode(NUMBER_BUTTON_TEXT_NODES.zero.display);
        }
    };

    return handleInputInner;
};


export default handleInput;
