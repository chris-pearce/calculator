/**
 * All the CSS classes.
 * @type {Object}
 */
export const STYLE_CLASSES = Object.freeze({
    outputScreen: 'calculator__output-screen',
    keypad: 'calculator__keypad',
    keypadNumbers: 'calculator__keypad--numbers',
    keypadOperators: 'calculator__keypad--operators'
});


/**
 * Everything related to the DOM.
 * @type {Object}
 */
import createOutputScreen from './createOutputScreen';

export const DOM = {
    root: document.getElementById('calculator'),
    outputScreen: createOutputScreen()
};


/**
 * All the operator button text nodes.
 * @type {Object}
 */
export const OPERATOR_BUTTON_TEXT_NODES = Object.freeze({
    divide: {
        order: 0,
        display: '/'
    },
    multiply: {
        order: 1,
        display: '*'
    },
    subtract: {
        order: 2,
        display: '-'
    },
    add: {
        order: 3,
        display: '+'
    },
    equals: {
        order: 4,
        display: '='
    },
    clear: {
        order: 5,
        display: 'C'
    }
});


/**
 * All the number button text nodes.
 * @type {Object}
 */
export const NUMBER_BUTTON_TEXT_NODES = Object.freeze({
    one: {
        order: 6,
        display: 1
    },
    two: {
        order: 7,
        display: 2
    },
    three: {
        order: 8,
        display: 3
    },
    four: {
        order: 3,
        display: 4
    },
    five: {
        order: 4,
        display: 5
    },
    six: {
        order: 5,
        display: 6
    },
    seven: {
        order: 0,
        display: 7
    },
    eight: {
        order: 1,
        display: 8
    },
    nine: {
        order: 2,
        display: 9
    },
    zero: {
        order: 9,
        display: 0
    },
    decimal: {
        order: 10,
        display: '.'
    }
});
