const template = document.createElement('template');
template.innerHTML = `
    <style>
        ::slotted(input) {
            border-bottom: 1px solid black;
        }
        
        p {
            display: none;
        }
        
        :host(.error) ::slotted(input) {
            border-bottom: 1px solid red;
        }
    </style>
    <slot></slot>
    <p></p>
`;

(window as any).ShadyCSS && (window as any).ShadyCSS.prepareTemplate(template, 'yw-fancy-input');

enum ObservedAttributes {
    ERROR_MESSAGE = 'error-message',
    IS_ERROR = 'is-error'
}

export class YwFancyInput extends HTMLElement {
    private _isError: boolean;
    private _errorMessage: string;

    private root: ShadowRoot;
    private errorMessageElement: HTMLElement;

    static get observedAttributes() {
        return [ObservedAttributes.IS_ERROR, ObservedAttributes.ERROR_MESSAGE];
    }

    constructor() {
        super();
        (window as any).ShadyCSS && (window as any).ShadyCSS.styleElement(this);
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
        this.errorMessageElement = this.root.querySelector('p');
    }

    set isError(value: boolean) {
        this._isError = value;
        this.setAttribute('is-error', String(value));
        this.dispatchEvent(new CustomEvent('isErrorChange', {
            detail: this._isError
        }));
    }

    get isError() {
        return this._isError;
    }

    set errorMessage(value: string) {
        this._errorMessage = value;
        this.setAttribute('error-message', value);
        this.dispatchEvent(new CustomEvent('errorMessageChange', {
            detail: this._errorMessage
        }));
    }

    get errorMessage() {
        return this._errorMessage;
    }

    attributeChangedCallback(attrName: ObservedAttributes, oldValue: string, newValue: string) {
        switch(attrName) {
            case ObservedAttributes.IS_ERROR: {
                this.handleIsErrorChange(newValue);
                break;
            }
            case ObservedAttributes.ERROR_MESSAGE: {
                this.handleErrorMessageChange(newValue);
                break;
            }
            default: {
                // no op
            }
        }
    }

    private handleIsErrorChange(newValue: string) {
        const isError = newValue === 'true';
        if (this.isError !== isError) {
            this.isError = isError;
        }
        if (this.isError) {
            this.classList.add('error');
        } else {
            this.classList.remove('error')
        }
    }

    private handleErrorMessageChange(newValue: string) {
        if (this.errorMessage !== newValue) {
            this.errorMessage = newValue;
        }
        if (this.errorMessage) {
            this.errorMessageElement.style.display = 'block';
        } else {
            this.errorMessageElement.style.display = 'none';
        }
        this.errorMessageElement.innerHTML = this.errorMessage;
    }
}
