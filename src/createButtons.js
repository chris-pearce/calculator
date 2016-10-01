import buttonsInOrder from './buttonsInOrder';
import createButton from './createButton';


/**
 * @function createButtons
 * @description Create a batch of buttons from an object of button text nodes and append the
 *              buttons to a document fragment.
 * @param  {Object} textNodes - Object of button text nodes.
 * @return {Node} - Document fragment of `<button>` elements.
 */
const createButtons = textNodes => {
    const container = document.createDocumentFragment();

    const buttonTextNodes = buttonsInOrder(textNodes);

    for (let i = 0; i < buttonTextNodes.length; i++) {
        const currentButton = createButton(buttonTextNodes[i]);

        container.appendChild(currentButton);
    }

    return container;
};


export default createButtons;
