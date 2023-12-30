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
}