(function () {
  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      :host {
        overflow: hidden;
        background-color: white;
        width: 100%;
        height: 80px;
        // position:absolute;
      }
      
      .navbar {
        position: absolute;
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
        // margin-bottom: 80px;
        position: fixed;
        top: 0;
        width: 100%;
        box-shadow: 1px 2px 18px rgba(0,0,0,.1);
      }
      
      .home-icon {
        width: 28px;
      }
    </style>

    <div class="navbar">
      <a class="home-anchor" href="/">
        <img class="home-icon" src="manbunorange.svg" />
      </a>
      <a href="portfolio.html">Portfolio</a>
      <a class="articles-contact" href="contact.html">Contact</a>
      <a href="index.html#learn">Learn</a>
      <a class="articles-anchor" href="articles.html">Articles</a>
    </div>`

  customElements.define('navbar-component', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.$nav = shadowRoot.querySelector('.navbar')
      this.homeAnchor = shadowRoot.querySelector('.home-anchor')
      this.articlesAnchor = shadowRoot.querySelector('.articles-anchor')
      this.contactAnchor = shadowRoot.querySelector('.articles-contact')

      if (!this.showHome) (
        this.homeAnchor.style.display = "none"
      )
      if (!this.showArticles) {
        this.articlesAnchor.style.display = "none"
      }
      if (!this.showContact) {
        this.contactAnchor.style.display = "none"
      }
    }

    get showHome() {
      return this.getAttribute('showHome')
    }

    get showContact() {
      return this.getAttribute('showContact')
    }
    
    get showArticles() {
      return this.getAttribute('showArticles')
    }

    set showHome(newValue) {
      this.setAttribute('showHome', newValue)
    }

    set showContact(newValue) {
      this.setAttribute('showContact', newValue)
    }

    set showArticles(newValue) {
      this.setAttribute('showArticles', newValue)
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