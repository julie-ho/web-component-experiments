import {LitElement, html, css, property, unsafeCSS} from 'lit-element';

import * as styles from './yw-counter.scss';

/**
 * Demonstrates: Lit Element with all the syntactic sugar.
 */
export class YwCounter extends LitElement {
    static get styles() {
        return unsafeCSS(styles);
    }

    @property( { type : Number, reflect: true }  )
    value: number = 0;

    render() {
        return html`
            <button 
                class="decrement-button" 
                aria-label="decrement"
                @click="${this.handleDecrement}">
                -
            </button>
            <p>${this.value}</p>
            <button 
                class="increment-button" 
                aria-label="increment"
                @click="${this.handleIncrement}">
                +
            </button>
        `;
    }

    private handleIncrement() {
        this.value++;
        this.handleValueChanged();
    }

    private handleDecrement() {
        this.value--;
        this.handleValueChanged();
    }

    private handleValueChanged() {
        let event = new CustomEvent('value-changed', {
            bubbles: true,
            cancelable: true,
            detail: {
                value: this.value
            }
        });
        this.dispatchEvent(event);
    }
}
