(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      /* The Modal (background) */
      <style>
      :host {
        height: 100%;
      }
      .wrapper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: gray;
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
        z-index: 1;
      }
      .visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
      }
      .modal {
        font-family: Helvetica;
        font-size: 14px;
        padding: 10px 10px 5px 10px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 2px;
        min-width: 300px;
      }
      .title {
        font-size: 18px;
      }
      .button-container {
        text-align: right;
      }
      button {
        min-width: 80px;
        background-color: #848e97;
        border-color: #848e97;
        border-style: solid;
        border-radius: 2px;
        padding: 3px;
        color:white;
        cursor: pointer;
      }
      button:hover {
        background-color: #6c757d;
        border-color: #6c757d;
      }
    </style>
    <div class='wrapper'>
      <div class='modal'>
        <span class='title'></span>
        <div class='content'>
          <slot></slot>
        </div>
        <div class='button-container'>
          <button class='cancel'>Cancel</button>
          <button class='ok'>Okay</button>
        </div>
      </div>
    </div>
     `

  customElements.define('modal-component', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.$title = this.shadowRoot.querySelector('.title')
      this.$wrapper = this.shadowRoot.querySelector('.wrapper')
      this.$cancelButton = this.shadowRoot.querySelector(".cancel");
      this.$okButton = this.shadowRoot.querySelector(".ok");

    }

    get title() {
      return this.getAttribute("title");
    }

    set title(value) {
      this.setAttribute("title", value);
    }

    get visible() {
      return this.hasAttribute("visible");
    }

    set visible(value) {
      if (value) {
        this.setAttribute("visible", "");
      } else {
        this.removeAttribute("visible");
      }
    }

    connectedCallback() {
      this._attachEventHandlers();
      this.$title.textContent = this.title
      if (this.visible) {
        this.$wrapper.classList.add("visible")
      } else {
        this.$wrapper.classList.remove("visible")
      }
    }

    static get observedAttributes() {
      return ["visible", "title"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "title" && this.shadowRoot) {
        this.$title.querySelector(".title").textContent = newValue;
      }
      if (name === "visible" && this.shadowRoot) {
        if (newValue === null) {
          this.$wrapper.classList.remove("visible");
        } else {
          this.$wrapper.classList.add("visible");
        }
      }
    }

    _attachEventHandlers() {
      this.$cancelButton.addEventListener('click', e => {
        this.dispatchEvent(new CustomEvent("cancel"))
        this.removeAttribute("visible");
      });
      this.$okButton.addEventListener('click', e => {
        this.dispatchEvent(new CustomEvent("ok"))
        this.removeAttribute("visible");
      });
      
    }
    // disconnectedCallback() {
    //   this.shadowRoot.querySelector("button").removeEventListener('click', this._showModal);
    //   this.shadowRoot.querySelector(".close").removeEventListener('click', this._hideModal);
    // }
    // _showModal() {
    //   this._modalVisible = true;
    //   this._modal.style.display = 'block';
    // }
    // _hideModal() {
    //   this._modalVisible = false;
    //   this._modal.style.display = 'none';
    // }

  });
})();
