(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `
  <style>
    .swiper-slide {
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

    }

    .home-icon {
      width: 30px;
    }

    .project-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .summary-container {
      display: flex;
      flex-direction: column;
      width: 40%;
    }

    .image-container {
      width: 60%;
    }


  
  <style>
  
  </style>
  <div class="swiper-slide">
    <a href="/"> 
      <img class="home-icon" src="design/sharkbeak.svg" />
    </a>

    <h1 class="name"></h1>

    <div class="project-container">
      <div class="summary-container">
        
        <h2>
          Desription
        </h2>
        <p class="description" ></p>
        
        <h2>
          Challenges
        </h2>
        <ul class="challenges"></ul>

        <h2>Sources</h2>
        <ul class="sources"></ul>
      </div>


      <div class="image-container">
        <a class="gif-link" >
          <img class="gif-preview" /> 
        </a>
      </div>
    </div>
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
      this.$description.textContent = this.jsonData.description

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
      this.$gifLink.href = this.jsonData.imgHref
      this.$gifPreview.src = this.jsonData.imgSrc
    }
  });
})()