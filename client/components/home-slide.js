const homeTemplate = document.createElement('template');

homeTemplate.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css" />

    <style>
    
    .swiper-slide {
        background-color: #0A2463;
        background-image:
          radial-gradient(
            #CECECE,
            #0A2463
          );
        text-align: center;
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        margin-right: 0;
      }
  
      .content {
        display: flex;
        flex-direction: row;
        background: #ccc5b9;
        height: 100%;
        width: 100%;
      }
  
      @media screen and (max-width: 820px) {
        .content {
          flex-direction: column-reverse;
        }
      }
  
      .slider_text {
        box-sizing: border-box;
        border: solid thick steelblue;
        padding: 20px;
        padding-top: 0px;
        padding-bottom: 0px;
        display: flex;
        flex-direction: column;
        height: AUTO;
        width: 100%;
        max-width: 90%;
        flex: 1;
        margin: 30px;
        margin-right: 15px;
        text-align: left;
        background: #f4f1de;
        overflow: auto;
        font-size: 1.1rem;
      }
  
      @media screen and (max-width: 820px) {
        .slider_text {
          margin: 15px;
          margin-top: 7.5px;
        }
      }
  
      .slider_image {
        box-sizing: border-box;
        border: solid thick #ff5700;
        height: auto;
        width: 100%;
        max-width: 90%;
        flex: 1;
        margin: 30px;
        margin-left: 15px;
        padding: 30px;
        padding-left: 15px;
        background: #f4f1de;
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        justify-content: space-around;
      }
  
      @media screen and (max-width: 820px) {
        .slider_image {
          margin: 15px;
          margin-bottom: 7.5px;
        }
      }
  
      .slider_text>ul {
        line-height: 1.5;
      }
  
      .image_name {
        margin-top: 30px;
        margin-bottom: 20px;
      }
  
      @media screen and (max-width: 820px) {
        .image_name {
          margin: 10px;
          margin-bottom: 5px;
        }
      }
  
      h3 {
        line-height: 0.1;
      }
  
      .portfolio_header {
        font-size: 3rem;
      }
  
      .img_anchor {
        max-height: 100%;
        width: 100%;
        height: 100%;
        margin-bottom: 40px;
      }
  
      img {
        width: 90%;
        height: 90%;
        max-height: 100%;
        object-fit: contain;
      }
      .swiper-container {
          height: 100vh;
      }
      a {
        max-height: 100%;
        object-fit: contain;
      }

      :host {
          width: 100%;
          heoght: 100%;
      }
      .home-container {
        padding: 20px;
        margin: 10px;
        width: 90%;
        height: 80%;
        background: #d2b48c;
        color: #fff;
        font-size: 21px;
        font-weight: bold;
        line-height: 1.3em;
        border: 2px dashed #0A2463;
        border-radius: 10px;
        box-shadow: 0 0 0 4px #d2b48c, 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
        text-shadow: -1px -1px #aa3030;
        font-weight: normal;
      }
    </style>
        
            
    <div class="home-container">
        <h1>home-slide</h1>
    </div>
        
`;
class HomeSlide extends HTMLElement {
    constructor() {
        super();
        console.log('home-slide mounted')
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(homeTemplate.content.cloneNode(true));
    }
}

window.customElements.define('home-slide', HomeSlide)