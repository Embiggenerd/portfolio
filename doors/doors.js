// const open = document.querySelector('.opem')
const open = document.querySelector('.open')

const tl = gsap.timeline({ paused: true })
tl.to(".open", { duration: 2, rotate: 135 });
tl.to(".left", {duration: 3, x:"-50vw"})
tl.to(".right", {duration: 3.92, x:"60vw", delay: -3})
tl.to(".open", {duration: 3.92, x:"60vw", delay: -3.92})

open.addEventListener('mouseover', () => {
    tl.play();
})