/**
 * @function insertOutputScreenData
 * @description Insert data into the output screen by updating the text node of that element.
 * @param  {string|number} data - The data passed in.
 */
const insertOutputScreenData = (data) => {
    outputScreen.textContent = data;
};


export default insertOutputScreenData;
