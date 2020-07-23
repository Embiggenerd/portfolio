(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    :host {
      height: 100%;
    }

    .swiper-slide {
      display:flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    .home-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
    }

    .home-icon {
      width: 50px;
    }

    .name {
      margin: 0;
    }

    .project-container {
      display: flex;
      justify-content: center;
      align-items: start;
      min-height: 65%
    }

    .summary-container {
      display:flex;
      justify-content:flex-end;
      width: 45%;
      padding-right: 5%;
    }

    .summary-wrapper {
      width: 60%;
      margin-right: 10%;
      min-width: 400px;
      text-align: left;
    }

    .image-container {
      display: flex;
      justify-content:start;
      align-items: center;
      width: 55%;
      height: 100%;
    }

    .image-wrapper {
      width: 585px;
    }

    .gif-link {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
    }

    .gif-preview {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }

    .slide-down-container {
      height: 10%;
      width: 100%
    }

    * {
      color: rgb(54, 57, 69);
    }

    p, 
    li {
      color: rgb(91, 107, 127);
      font-size: 18px;
      font-weight: 400;
      line-height: 21px;
    }

    a {  
      color: rgb(6, 145, 242);
      text-decoration: none;
    }
  
  </style>

  <style>
  @media only screen and (max-width: 1080px) {
    .image-wrapper {
      width: 100% ;
    }
  }

  @media only screen and (max-width: 730px) {
    .project-container {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .image-wrapper {
      width: 400px;
    }
    .summar-wrapper, .summary-container {
      width: 100%;
    }
    p,a,li {
      font-size: 12px;
      line-height: 1;
    }
    h3 {
      font-size: 20px;
    }
  }
  </style>

  <div class="swiper-slide">
    <div class="home-icon-wrapper">
      <a href="/"> 
        <img class="home-icon" src="manbunorange.svg" />
      </a>
    </div>

    <h2 class="name"></h2>

    <div class="project-container">

      <div class="summary-container">
        <div class="summary-wrapper">
          <h3>
            Desription
          </h3>
          <p class="description" ></p>
          
          <h3>
            Challenges
          </h3>
          <ul class="challenges"></ul>

          <h3>Sources</h3>
          <ul class="sources"></ul>
        </div>
      </div>
      
      <div class="image-container">
        <div class="image-wrapper">
          <a target="_blank" class="gif-link" >
            <img class="gif-preview" /> 
          </a>
        </div>
      </div>
    </div>

    <div class="slide-down-container swiper-button-next">
    </div
  </div>
`;
  customElements.define('slide-component', class extends HTMLElement {
    constructor() {
      super();

      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(tmpl.content.cloneNode(true));

      this.$name = shadowRoot.querySelector('.name')
      this.$description = shadowRoot.querySelector('.description')
      this.$challenges = shadowRoot.querySelector('.challenges')
      this.$sources = shadowRoot.querySelector('.sources')
      this.$gifLink = shadowRoot.querySelector('.gif-link')
      this.$gifPreview = shadowRoot.querySelector('.gif-preview')
      this.$imageContainer = shadowRoot.querySelector(".image-container")
      this.$projectContainer = shadowRoot.querySelector('.project-container')

      // this.$imageWrapper = shadowRoot.querySelector(".i-wrapper")
    }

    get data() {
      return this.getAttribute('data')
    }

    set data(newValue) {
      this.setAttribute('data', newValue)
    }

    connectedCallback() {
      this.jsonData = JSON.parse(this.data)
      this.$name.innerHTML = this.jsonData.name
      this.$description.innerHTML = this.jsonData.description

      // Create list of challenges
      this.jsonData.challenges.forEach(ch => {
        const li = document.createElement('li')
        li.innerText = ch
        this.$challenges.appendChild(li)
      })

      // Create list of sources
      this.jsonData.sources.forEach(ch => {
        const li = document.createElement('li')
        li.innerHTML = ch
        this.$sources.appendChild(li)
      })

      if(this.jsonData.app) {
        const div = document.createElement('div')
        const jsDiv = document.createElement('div')
        this.$imageContainer.style.display = "none"
        jsDiv.innerHTML = this.jsonData.js
        div.innerHTML = this.jsonData.app
        console.log(this.jsonData.js)

        this.$projectContainer.appendChild(div)
        this.$projectContainer.appendChild(jsDiv)


      } else {
        this.$gifLink.href = this.jsonData.imgHref
        this.$gifLink.title = this.jsonData.title
        this.$gifPreview.src = this.jsonData.imgSrc
      }

    }
  });
})()