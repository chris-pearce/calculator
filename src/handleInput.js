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
     * Store all of the operators.
     * @type {Array}
     */
    const operators = buttonsInOrder(OPERATOR_BUTTON_TEXT_NODES);


    /**
     * Store the clear button.
     * @type {string}
     */
    // const isClearButton = OPERATOR_BUTTON_TEXT_NODES.clear.display;


    /**
     * An internal state object to keep track of inputs for each calculation.
     * @type {Object}
     */
    let state = {
        number: '',
        operator: '',
        sum: []
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
            sum: []
        };
    };


    /**
     * @function handleInputInner
     * @description Using a series of conditional statements against the internal state object and
     *              the `isOperator` check, this closure function sends each number input to the
     *              relevant arithmetic operation function using operator precedence where
     *              required i.e. 'order of operations'. Every input is initially read in as a
     *              string but is converted to a number when passed to the arithmetic operation
     *              function. Each number input and calculation result is passed to the
     *              `updateOutputScreenTextNode` function to be printed out to the output screen. When
     *              the clear button is pressed all inputs are reset ready for a new calculation.
     * @param  {Object} e - The click event set on the calculator container element.
     */
    const handleInputInner = e => {

        /**
         * Check if an input is an operator.
         * @type {Boolean}
         */
        const isOperatorKeyPress = operators.indexOf(e.target.value) > -1;

        const isDecimalKeyPress = e.target.value === NUMBER_BUTTON_TEXT_NODES.decimal.display;

        const isZeroKeyPress = e.target.value === String(NUMBER_BUTTON_TEXT_NODES.zero.display);


        /**
         * There are three forms of compulsory input and five forms of optional input to perform a
         * calculation.
         *
         * There are three forms of input needed to perform a calculation: <first number>,
         * <operator>, and <second number>. Only <second number> is needed once <first number> is
         * inputted as calculations can keep running until the clear button is pressed, so once
         * the result is outputted <first number> is set to equal the result.
         *
         * The flow to get to the very first calculation result:
         *
         *     <first number> inputted
         *     first <operator> inputted
         *     <second number> inputted
         *     second <operator> inputted
         *     <result> printed
         *         if: first <operator> and second <operator> are the same, or <equals> is pressed
         *         else: if first <operator> equals [multiply] or [divide] and second <operator>
         *               equals [add] or [subtract] input third <number> then print <result> on
         *               press of third <operator> applying operator precedence only if third
         *               <operator> equals [add] or [subtract], if third <operator> equals
         *               [multiply] or [divide] <result> will be second and third <number>
         *               multiplied or divided, discarding first <number>.
         *
         * If 1st <operator> is [multiply] or [divide] return <result> when any second <operator>
         * or <equals> is pressed.
         * If 1st <operator> is [add] or [subtract] return <result> when second <operator> equals
         * [add] or [subtract] or if <equals> is pressed.
         *
         * As you can see above the equals isn't actually needed as once the 'second number' is
         * inputted any operator can perform the equals operation and trigger it being printed to
         * the output screen—it's there for familiarity. If an operator is inputted immediately
         * after a previous operator input e.g. <+> <÷> <×> the calculator will take the last one,
         * the <×> in this case, and discard the rest.
         *
         * The following conditional statements are explained in high detail:
         *
         * 1. Check input is NOT an operator AND 'first number' from the internal state object is
         *    blank. If true store the 'first number' in the internal state object using the button
         *    value (`e.target.value`) from the click event set on the calculator container
         *    element and send the button value to the `updateOutputScreenTextNode` function where
         *    it'll be printed out for the user to see.
         */
        if (!isOperatorKeyPress) {
            const hasDecimal = state.number.indexOf(NUMBER_BUTTON_TEXT_NODES.decimal.display) > -1;

            // If more than 1 decimal is pressed terminate
            if (hasDecimal && isDecimalKeyPress) {
                return false;
            }

            // If more than 1 zero is pressed when no other number is pressed terminate
            if (isZeroKeyPress && state.number === '0') {
                return false;
            }

            // When the first keypress is a decimal prepend a zero
            if (isDecimalKeyPress && state.number.length === 0) {
                state.number = '0';
            }

            state.number += e.target.value;
            updateOutputScreenTextNode(state.number);

            // First time program is run this will be skipped as `operator` is an
            // empty string. If an operator is pressed push operator into sum then
            // clear it
            if (state.operator) {
                state.sum.push(state.operator);
                state.operator = '';
            }
        } else if (isOperatorKeyPress && (state.sum.length || state.number !== '')) {
            // If the number is not empty push number into sum and then clear it
            if (state.number !== '') {
                state.sum.push(state.number);
                state.number = '';
            }

            // Store the operator
            state.operator = e.target.value;
        }

        // Handle result
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.equals.display) {
            let result = eval(state.sum.join(''));

            updateOutputScreenTextNode(result);
        }

        // Reset state via the 'Clear' button
        if (e.target.value === OPERATOR_BUTTON_TEXT_NODES.clear.display) {
            state = resetState();
            updateOutputScreenTextNode(NUMBER_BUTTON_TEXT_NODES.zero.display);
        }
    };

    return handleInputInner;
};


export default handleInput;
