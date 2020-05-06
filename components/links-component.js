(function () {
  let template = document.createElement('template')
  template.innerHTML = `
    <style>
    .links {
      margin-top:30px;
      display: flex;
      height: 40px;
      justify-content: center;
    }

    .link {
      margin: 0 35px;
    }

    img {
      height: 30px;
    }
    </style>

    <div class="links">
      <a class="link" target="_blank" href="https://www.linkedin.com/in/igor-atakhanov-70890942/"><img src="../link-images/LI-In-Bug.png"/></a>
      <a class="link" target="_blank" href="https://github.com/embiggenerd"><img src="../link-images/Octocat.png"/></a>
      <a class="link" target="_blank" href="https://www.youtube.com/channel/UCBgiIHFAmCIK3lN8KJcKu2w"><img src="../link-images/youtube_social_icon_red.png"/></a>

    </div>`

  customElements.define('links-component', class extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(template.content.cloneNode(true))
    }
  })
})()