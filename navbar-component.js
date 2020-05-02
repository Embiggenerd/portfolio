(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        overflow: hidden;
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center; 
      }

      .navbar {
        overflow: hidden;
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .nav-container {
        margin-top: 50px;
      }

      /* Navbar links */
      .navbar a {
        float: left;
        display: block;
        /* color: #f2f2f2; */
        color: #333;
        text-align: center;
        padding: 14px;
        text-decoration: none;
        font-size: 19px;
      }
      
      /* Page content */
      .content {
        padding: 16px;
      }
      
      /* The sticky class is added to the navbar with JS when it reaches its scroll position */
      .sticky {
        position: fixed;
        top: 0;
        width: 100%;
      }
      
      /* Add some top padding to the page content to prevent sudden quick movement (as the navigation bar gets a new position at the top of the page (position:fixed and top:0) */
      .sticky + .content {
        padding-top: 60px;
      }
      
      .home-icon {
        width: 30px;
      }
    </style>

    <div class="navbar">
      <a href="index.html">
        <img class="home-icon" src="design/sharkbeak.svg" />
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
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