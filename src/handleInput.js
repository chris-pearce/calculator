import {OPERATOR_BUTTON_TEXT_NODES} from 'constants';
import {
    add,
    subtract,
    multiply,
    divide
} from 'arithmeticOperations';
import buttonsInOrder from 'buttonsInOrder';
import insertOutputScreenData from 'insertOutputScreenData';


/**
 * @function handleInput
 * @description All of the logic for the calculator input handled by the nested closure function
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
     * @description Using a series of conditional statements against the internal state object and
     *              the `isOperator` check, this closure function sends each number input to the
     *              relevant arithmetic operation function using operator precedence where
     *              required i.e. 'order of operations'. Every input is initially read in as a
     *              string but is converted to a number when passed to the arithmetic operation
     *              function. Each number input and calculation result is passed to the
     *              `insertOutputScreenData` function to be printed out to the output screen. When
     *              the clear button is pressed all inputs are reset ready for a new calculation.
     * @param  {Object} e - The click event set on the calculator container element.
     */
    const handleInputInner = e => {

        /**
         * Check if an input is an operator.
         * @type {Boolean}
         */
        const isOperator = operators.indexOf(e.target.value) > -1;


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
         *    element and send the button value to the `insertOutputScreenData` function where
         *    it'll be printed out for the user to see.
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

            state.firstNumber = String(result);

            state.operator = e.target.value;

            state.secondNumber = '';
        }


        if (e.target.value === isClearButton) {
            state = resetState();
            insertOutputScreenData(0);
        }
    };

    return handleInputInner;
};


export default handleInput;
