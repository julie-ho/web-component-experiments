import {YwPrimaryButtonWrapper} from "./components/yw-primary-button-wrapper";
import {YwFancyInput} from "./components/yw-fancy-input";
import {YwCounter} from "./components/yw-counter";

export const ywInit = () => {
    try {
        customElements.define('yw-primary-button-wrapper', YwPrimaryButtonWrapper);
        customElements.define('yw-fancy-input', YwFancyInput);
        customElements.define('yw-counter', YwCounter);
    } catch(e) {}
};

ywInit();