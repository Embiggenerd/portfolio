const templateDoors = document.createElement('template');

templateDoors.innerHTML = `
    <style>
    .sides {
        display: grid;
        grid-template-columns: 50vw 50vw;
    }
    
    html,
    body {
        height: 100%;
        margin: 0;
        font-family: "Arial Black", sans-serif;
    }
    
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    
    .intro {
        position: absolute;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        z-index: 3;

    }
    
    .sides {
        position: relative;
    }
    
    .side {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 6vw;
        background-color: #8B4513;
        border: dotted 9px silver;
        color: #dbd8c7;
        background-image: url("https://www.transparenttextures.com/patterns/dark-leather.png");
    }
    .left {
        border-right: none;
        box-shadow: inset -7px 5px 5px -9px black;
    }
    
    .right {
        flex-direction: column-reverse;
        border-left: none;
        box-shadow: inset 7px 5px 5px -9px black;
    }
    
    .name {
        margin: 0.3em;
    }
    
    .emoji {
        font-size: 3em;
    }
    .open {
        position: absolute;
        width: 12vw;
        height: 12vw;
        border-radius: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3.2vw;
        font-weight: bold;
        color: #dbd8c7;
        background: #52361b;
        background: #634a31;
        box-shadow: inset 0 0 10px #2b1d0e;
        background-image: url("https://www.transparenttextures.com/patterns/purty-wood.png");
        background-image: url("https://www.transparenttextures.com/patterns/retina-wood.png");
    }
    .shadow-div {
        position: absolute;
        width: 12vw;
        height: 12vw;
        border-radius: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        z-index: 3;
        box-shadow: 0 10px 6px -6px #202020;
    }
    
    
    .open span {
        transform: rotate(-45deg);
    }
    </style>

    <div class="intro">
    
        <div class="sides">
            <div class="side left">
                <!--<h2 class="name">Monkey</h2>
                <div class="emoji">🐒</div>-->
                <h3 class="name">FrontEnd</h3>
                <div class="emoji">🎨</div>
            </div>
            <div class="shadow-div"></div>
            <div class="open">
                <span>Open</span>
            </div>
            <div class="side right">
                <h3 class="name">BackEnd</h3>
                <div class="emoji">🖧</div>
            </div>
        </div>
    </div>
    
`;

class Doors extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(templateDoors.content.cloneNode(true));
        this.$open = this._shadowRoot.querySelector('.open')
        this.$left = this._shadowRoot.querySelector('.left')
        this.$right = this._shadowRoot.querySelector('.right')
        this.$intro = this._shadowRoot.querySelector('.intro')
        this.$shadow = this._shadowRoot.querySelector('.shadow-div')

        this.tl = gsap.timeline({ paused: true })
        this.tl.to(this.$open, { duration: 2, rotate: 135, delay: .5 });
        this.tl.to(this.$left, { duration: 3, x: "-50vw", delay: .5 })
        this.tl.to(this.$right, { duration: 3.92, x: "60vw", delay: -3 })
        this.tl.to([this.$open, this.$shadow], { duration: 3.92, x: "60vw", delay: -3.92 })
        this.tl.to(this.$intro, { display: "none", delay: -1 })

        this.$open.addEventListener('mouseover', () => {
            this.tl.play();
        })
    }
}

window.customElements.define('doors-component', Doors)