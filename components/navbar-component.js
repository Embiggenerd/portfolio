(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        overflow: hidden;
        background-color: white;
        width: 100%;
        position:absolute;
      }
      
      .navbar {
        background-color: white;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    
      /* Navbar links */
      .navbar a {
        margin: 0 15px;
        float: left;
        display: block;
        color: #333;
        text-align: center;
        text-decoration: none;
        font-size: 19px;
      }
      
      /* The sticky class is added to the navbar with JS when it reaches its scroll position */
      .sticky {
        margin-bottom: 80px;
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 1px 2px 18px rgba(0,0,0,.1);
      }
      
      .home-icon {
        width: 30px;
      }
    </style>

    <div class="navbar">
      <a href="/">
        <img class="home-icon" src="design/sharkbeak.svg" />
      </a>
      <a href="portfolio.html">Portfolio</a>
      <a href="mailto:igoratakhanov@gmail.com">Contact</a>
      <a href="#learn">Learn</a>
      <a href="articles.html">Articles</a>
    </div>`

  customElements.define('navbar-component', class extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root to the element.
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.$nav = shadowRoot.querySelector('.navbar')
    }

    connectedCallback() {
      this._onScroll()
    }

    disconnectedCallback() {
      this.removeEventListener('onscroll', this._onScroll);
    }

    _onScroll() {
      window.onscroll = () => {
        if (window.pageYOffset >= this.offsetTop) {
          this.$nav.classList.add("sticky")
        } else {
          this.$nav.classList.remove("sticky")
        }
      }
    }
  });
})();