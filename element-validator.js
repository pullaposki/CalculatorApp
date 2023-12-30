export class ElementValidator {
    static validateElements(...elements) {
        // Check if any element is undefined or null
        if (elements.some(element => !element)) {
            throw new Error("All elements are required");
        }

        // Check if all elements are instances of HTMLElement
        if (!elements.every(element => element instanceof HTMLElement)) {
            throw new Error("All parameters should be instances of HTMLElement");
        }
    }

    static getElementsByIds(selectors) {
        if (!selectors) {
            throw new Error('Selectors object cannot be null or undefined');
        }
        let elements = Object.values(selectors).map(selector => {
            let element = document.getElementById(selector);
            if(!element) {
                throw new Error(`No element found with id ${selector}`);
            }
            return element;
        });
        
        ElementValidator.validateElements(...elements);
        
        return elements;
    }
}