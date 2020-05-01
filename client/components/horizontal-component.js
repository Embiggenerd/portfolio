const template = document.createElement('template');

template.innerHTML = `
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
    </style>

    <div class="swiper-container swiper-container-h">
        <div class="swiper-wrapper">
        <slot></slot>
        <!-- <div class="swiper-slide">
              <vertical-component></vertical-component>
            </div> 
            <home-slide class="swiper-slide"></home-slide>
          <div class="swiper-slide"><home-slide></home-slide></div>
            <div class="swiper-slide">Horizontal Slide 2</div>
            <div class="swiper-slide">Horizontal Slide 3</div>
            <div class="swiper-slide">Horizontal Slide 4</div> -->
        </div>
        <div class="swiper-pagination swiper-pagination-h"></div>

    </div>
`;
class Horizontal extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    const swiperContainer = this._shadowRoot.querySelector('.swiper-container-h')
    const pagination = this._shadowRoot.querySelector('.swiper-pagination-h')
    this.swiperH = new Swiper(swiperContainer, {
      spaceBetween: 50,
      mousewheel: true,
      direction: 'vertical',
      pagination: {
        el: pagination,
        clickable: true,
      },

    });
  }
}

window.customElements.define('horizontal-component', Horizontal)