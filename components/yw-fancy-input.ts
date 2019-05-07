import {LitElement, html, css, property, PropertyValues, unsafeCSS} from "lit-element";

import * as styles from './yw-fancy-input.scss';

export class YwFancyInput extends LitElement {
    static get styles() {
        return unsafeCSS(styles);
    }

    @property( { type: Boolean, reflect: true }  )
    isError: number = 0;

    @property( { type: String, reflect: true } )
    errorMessage: string = '';

    private errorMessageElement: HTMLElement;

    render() {
        return html`
            <slot></slot>
            <p>${this.errorMessage}</p>
        `
    }

    updated(changes: PropertyValues) {
        this.setErrorMessageElement();
        this.setIsErrorState();
        this.setErrorMessageState();
    }

    private setErrorMessageElement() {
        if (!this.errorMessageElement) {
            this.errorMessageElement = this.shadowRoot.querySelector('p');
        }
    }

    private setIsErrorState() {
        if (this.isError) {
            this.classList.add('error');
        } else {
            this.classList.remove('error');
        }
    }

    private setErrorMessageState() {
        if (!this.errorMessageElement) {
            return;
        }
        if (this.errorMessage) {
            this.errorMessageElement.style.display = 'block';
        } else {
            this.errorMessageElement.style.display = 'none';
        }
    }
}
