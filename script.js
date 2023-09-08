var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim(){
    //Creating a new timeline object
 var tl=gsap.timeline(); //gsap is a js library
 tl.from("#nav",{
    y:'-10',
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut
 })
 .to(".boxh",{
    y:'0',
    duration: 2,
    ease: Expo.easeInOut,
    stagger: 0.2,
    delay: -1
 })
 .from("#herofooter",{
    y:'-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
    delay: -1
 })
}

function circleSqueeze(){
    //default scale value
    var xscale=1;
    var yscale=1;

    var xprevious=0;
    var yprevious=0;
    window.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);
        xscale=gsap.utils.clamp(0.8,1.2,dets.clientX - xprevious);
        yscale=gsap.utils.clamp(0.8,1.2,dets.clientY - yprevious);

        xprevious=dets.clientX;
        yprevious=dets.clientY;
        circlemousefollower(xscale,yscale);
        timeout=setTimeout(function(){
            document.querySelector("#mousecircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        },100)
    })
}

function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#mousecircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
}

circlemousefollower();
circleSqueeze();
firstPageAnim();

    document.querySelectorAll(".innerdiv").forEach(function(elem) {
        var rotate=0;
        var diffrot=0;

        elem.addEventListener("mouseleave", function(dets) {
            gsap.to(elem.querySelector("img"), {
                opacity: 0,
                ease: "Power3.easeInOut",
                duration: 0.5,
            });
        });

        elem.addEventListener("mousemove", function(dets) {
            var diff=dets.clientY-elem.getBoundingClientRect().top;
            diffrot=dets.clientX-rotate;
            rotate=dets.clientX;
            
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                ease: "Power3.easeInOut",
                top: diff,
                left: dets.clientX,
                rotate: gsap.utils.clamp(-20,20,diffrot*0.8)
            });
        });
    });

/* document.querySelectorAll(".innerdiv").forEach(function(elem){
    elem.addEventListener("mousemove",function(dets){
        gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: "Power1.easeInOut",
        }); 
    });
}); */

