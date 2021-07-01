const sec1 = document.querySelector("#section1");
const sec2 = document.querySelector("#section2");
const sec3 = document.querySelector("#section3");
const sec4 = document.querySelector("#section4");
const sections = [].slice.call(document.getElementsByTagName("section"));

const sec1top = getElementOffset(sec1);
const sec2top = getElementOffset(sec2);
const sec3top = getElementOffset(sec3);
const sec4top = getElementOffset(sec4);

const secLink1 = document.querySelector("#sect1");
const secLink2 = document.querySelector("#sect2");
const secLink3 = document.querySelector("#sect3");
const secLink4 = document.querySelector("#sect4");
const navLinks = [].slice.call(document.getElementsByClassName("navlink"));

// link activation animation starts
function activateIt(secId) {
    navLinks.forEach(link => {
        if(link.dataset.sectionid === secId){
            link.classList.add("active");
        } else {
            link.classList.remove("active")
        }
    })
}

// use IntersectionObserver API for 
// modern browsers
if("IntersectionObserver" in window) {
    const secObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting &&
               entry.intersectionRatio >= 0.5) {
                activateIt(entry.target.id);
            }
        })
      }, {
        // call the cb function at this
        // threshold
        threshold: 0.75
    })

    sections.forEach(sec => {
        secObserver.observe(sec);
    })
} else {

    window.onscroll = () => {
        // take the bottom of the window
        let winBot = Math.floor(window.pageYOffset + window.innerHeight);
        
        if (winBot > sec4top) {
            activateIt("section4");
        }
        if (winBot > sec3top && winBot <= sec4top) {
            activateIt("section3");
        }
        if (winBot > sec2top && winBot <= sec3top) {
            activateIt("section2");
        }
        if (winBot > sec1top && winBot <= sec2top) {
            activateIt("section1");
        }
        if (window.pageYOffset === 0) {
            activateIt("section1");
        }
    }
}

function getElementOffset(el) {
    let top = 0;

    do {
        top += el.offsetTop || 0;
        el = el.offsetParent;
    } while (el);

    return top;
}
// link activation animation ends

//open answers
const questions = document.querySelectorAll(".question");

questions.forEach(function(question) {
    const btn = question.querySelector(".btn");

    btn.addEventListener("click", () => {

        questions.forEach((item) => {
            if (item !== question) item.classList.remove("open");
        });
        question.classList.toggle("open");
    });
});

// footer year
const fyear = document.getElementById("year");
const curYear = new Date().getFullYear();

fyear.innerText = curYear != 2020 ? `2020 - ${curYear}` : '2020'


// slide
const srcs = [
    { url: "./img/veterinary-4940425_640-min.jpg" },
    { url: "./img/dog-1912874_640-min.jpg" },
    { url: "./img/health-4385852_1280-min.jpg" },
];

let i = 0;

function changeImg() {
    document.querySelector(".slide-img-wrapper img").src = srcs[i].url;

    if (i < srcs.length - 1) {
        i++;
    } else {
        i = 0;
    }

    setTimeout("changeImg()", 3000);
}

changeImg();