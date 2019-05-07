const template = document.createElement('template');
template.innerHTML = `
    <style>
        ::slotted(button) {
            border-radius: 2px; 
            background-color: #29ABE2;
            box-shadow: 0 0 2px 0 rgba(0,0,0,0.15);
            color: #FFFFFF;
            font-family: 'Proxima Nova', 'sans-serif';
            font-size: 14px;
        }
        
        ::slotted(button:hover), ::slotted(button:focus) {
            background-color: #1B83BD;
        }
        
        ::slotted(button:hover) {
            cursor: 'pointer';
        }
        
        ::slotted(button:active) {
            background-color: #0D5E8C;
        }
        
        ::slotted(button:disabled) {
            background-color: #F7F7F7;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);
        }
    </style>
    <slot></slot>
`;

(window as any).ShadyCSS && (window as any).ShadyCSS.prepareTemplate(template, 'yw-primary-button');

export class YwPrimaryButtonWrapper extends HTMLElement {
    private root: ShadowRoot;

    constructor() {
        super();
        (window as any).ShadyCSS && (window as any).ShadyCSS.styleElement(this);
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));
    }
}
