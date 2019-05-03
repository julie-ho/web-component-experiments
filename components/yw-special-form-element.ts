const template = document.createElement('template');
template.innerHTML = `
    <input type="text">
`;

enum ObservedAttributes {
    VALUE = 'value'
}

(window as any).ShadyCSS && (window as any).ShadyCSS.prepareTemplate(template, 'yw-special-form-element');

export class YwSpecialFormElement extends HTMLElement {
    private _value: string;

    private root: ShadowRoot;
    private inputElement: HTMLInputElement;
    private changeEvents = [
        'propertychange',
        'change',
        'click',
        'keyup',
        'input',
        'paste'
    ];

    static get observedAttributes() {
        return ['value'];
    }

    constructor() {
        super();
        (window as any).ShadyCSS && (window as any).ShadyCSS.styleElement(this);
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
        this.inputElement = this.root.querySelector('input');
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.changeEvents.forEach((e) => this.inputElement.addEventListener(e, this.handleInputValueChange));
    }

    set value(value) {
        this._value = value;
        this.setAttribute('value', value);
        this.inputElement.value = value;
    }

    get value() {
        return this._value;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'value' && this.value !== newValue) {
            this.value = newValue;
        }
    }

    private handleInputValueChange(event) {
        this.value = (event.target as HTMLInputElement).value
    }
}
