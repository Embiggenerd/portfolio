(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>:host {
    color:red;
    text-align: center;
  
  <style>
  
  </style>
  <div class="swiper-slide"><h1 class="title"></h1></div>
  <slot></slot>
`;
  customElements.define('slide-component', class extends HTMLElement {
    constructor() {
      super(); // always call super() first in the constructor.

      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this.$title = shadowRoot.querySelector('.title')
      // console.log(this.data)
    }

    static get observedAttributes() {
      return ['titleText'];
    }


    get titleText() {
      return this.getAttribute('titleText');
    }

    get data() {
      return this.getAttribute('data')
    }

    set titleText(newValue) {
      this.setAttribute('titleText', newValue);
    }

    set data(newValue) {
      this.setAttribute('data', newValue)
    }

    // setAttribute(attr, data) {

    // }

    connectedCallback() {
      // this.$title.innerHTML = this.titleText
      // this.data = this.getAttribute("data")

      this.jsonData = JSON.parse(this.data)
      console.log('namesies', this.jsonData.name)
    }
  });
})()