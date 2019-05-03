const template = document.createElement('template');
template.innerHTML = `
  <style>
    button, p {
      display: inline-block;
    }
  </style>
  <button aria-label="decrement">-</button>
  <p>0</p>
  <button aria-label="increment">+</button>
`;

(window as any).ShadyCSS && (window as any).ShadyCSS.prepareTemplate(template, 'yw-counter');

export class XCounter extends HTMLElement {
    private _value: number;

    private root: ShadowRoot;
    private valueElement: HTMLElement;
    private incrementButton: HTMLElement;
    private decrementButton: HTMLElement;

    // Attributes we care about getting values from.
    static get observedAttributes() {
        return ['value'];
    }

    set value(value) {
        this._value = value;
        this.valueElement.innerText = String(this._value);
        this.dispatchEvent(new CustomEvent('value-change', {
            detail: this._value
        }));
    }

    get value() {
        return this._value;
    }

    constructor() {
        super();
        this._value = 0;
        (window as any).ShadyCSS && (window as any).ShadyCSS.styleElement(this);
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));

        this.valueElement = this.root.querySelector('p');
        this.incrementButton = this.root.querySelectorAll('button')[1];
        this.decrementButton = this.root.querySelectorAll('button')[0];

        this.incrementButton.addEventListener(
            'click',
            (e) => this.value++
        );

        this.decrementButton.addEventListener(
            'click',
            (e) => this.value--
        );
    }

    // Lifecycle hook called when a observed attribute changes
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'value') {
            this.value = parseInt(newValue, 10);
        }
    }
}
