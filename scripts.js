var body = d3.select("body");
var topScrolly = body.select("#top-scrolly");
var topScrollDiv = topScrolly.select(".g-scrolly-sticky");
var topTextDiv = topScrolly.select(".g-scrolly-scroll-text");

var mapScrolly = body.select("#map-scrolly");
var mapScrollDiv = mapScrolly.select(".g-scrolly-sticky");
var mapTextDiv = mapScrolly.select(".g-scrolly-scroll-text");

var topStep = topTextDiv.selectAll(".g-scrolly-text");
var topSlide = topScrollDiv.selectAll(".g-scrolly-image");

var mapStep = mapTextDiv.selectAll(".g-scrolly-text");
var mapSlide = mapScrollDiv.selectAll(".g-scrolly-image");

var topScroller = scrollama();
var mapScroller = scrollama();

function handleTopStepEnter(response) {
    topStep.classed("active", function (d, i) {
        return i === response.index;
    });

    topSlide.classed("active", function (d, i) {
        return i === response.index;
    });
}

function handleMapStepEnter(response) {
    mapStep.classed("active", function (d, i) {
        return i === response.index;
    });

    mapSlide.classed("active", function (d, i) {
        return i === response.index;
    });
}

function init() {
    topScroller
        .setup({
            step: "#top-scrolly .g-scrolly-scroll-text .g-scrolly-caption",
            offset: .95,
            debug: false
        })
        .onStepEnter(handleTopStepEnter);

    mapScroller
        .setup({
            step: "#map-scrolly .g-scrolly-scroll-text .g-scrolly-caption",
            offset: .95,
            debug: false
        })
        .onStepEnter(handleMapStepEnter);
}

window.onload = function() {
    topStep.classed("active", function (d, i) {
        return i === 0;
    });
    topSlide.classed("active", function (d, i) {
        return i === 0;
    });

    mapStep.classed("active", function (d, i) {
        return i === 0;
    });
    mapSlide.classed("active", function (d, i) {
        return i === 0;
    });

    init();
};
function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("hello");
            entry.target.classList.add('trigger-animation');
            // Stop observing once animation is triggered
            observer.unobserve(entry.target); 
            
            // If the entry has the 'squawk' class, play the audio
            if (entry.target.classList.contains('squawk')) {
                const squawkAudio = document.getElementById('squawk');
                squawkAudio.play();
            }
        }
    });
}

// Create an intersection observer instance
const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.5 });

// Select the elements to animate
const animatedElements = document.querySelectorAll('.animated-title');

// Observe each animated element
animatedElements.forEach(element => {
    observer.observe(element);
});
