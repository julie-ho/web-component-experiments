import {YwPrimaryButton} from "./components/yw-primary-button";
import {YwFancyInput} from "./components/yw-fancy-input";
import {XCounter} from "./components/yw-counter";
import {YwSpecialFormElement} from "./components/yw-special-form-element";

export const ywInit = () => {
    try {
        customElements.define('yw-primary-button', YwPrimaryButton);
        customElements.define('yw-fancy-input', YwFancyInput);
        customElements.define('x-counter', XCounter);
        customElements.define('yw-special-form-element', YwSpecialFormElement)
    } catch(e) {}
};

ywInit();