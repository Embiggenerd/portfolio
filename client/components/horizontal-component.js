const template = document.createElement('template');

template.innerHTML = `
    <style>
    
    </style>

    <div class="swiper-container swiper-container-h">
        <div class="swiper-wrapper">
        </div>
        <div class="swiper-pagination swiper-pagination-h"></div>
    </div>
`;

class Horizontal extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.swiperH = new Swiper('.swiper-container', {
            spaceBetween: 50,
            pagination: {
              el: '.swiper-pagination-h',
              clickable: true,
            },
          });
    }
}

window.customElements.define('horizontal-component', Horizontal)