const sec1 = document.querySelector("#section1");
const sec2 = document.querySelector("#section2");
const sec3 = document.querySelector("#section3");
const sec4 = document.querySelector("#section4");

const sec1top = getElementOffset(sec1);
const sec2top = getElementOffset(sec2);
const sec3top = getElementOffset(sec3);
const sec4top = getElementOffset(sec4);

const secLink1 = document.querySelector("#sect1");
const secLink2 = document.querySelector("#sect2");
const secLink3 = document.querySelector("#sect3");
const secLink4 = document.querySelector("#sect4");

window.onscroll = () => {
    let winBot = Math.floor(window.pageYOffset + window.innerHeight);


    if (winBot > sec4top) {
        removeActive("sect4");
        secLink4.classList.add("active");
    }
    if (winBot > sec3top && winBot <= sec4top) {
        removeActive("sect3");
        secLink3.classList.add("active");

    }
    if (winBot > sec2top && winBot <= sec3top) {
        removeActive("sect2");
        secLink2.classList.add("active");
    }
    if (winBot > sec1top && winBot <= sec2top) {
        removeActive("sect1");
        secLink1.classList.add("active");
    }
    if (window.pageYOffset === 0) {
        removeActive("sect1");
        secLink1.classList.add("active");
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

function removeActive(linkId) {
    document.querySelectorAll(".navlink").forEach(link => {
        if (link.classList.contains('active') && link.id !== linkId) {
            link.classList.remove('active');
        }
    });
}

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

if (curYear != 2020) {
    fyear.innerText = `2020 - ${curYear}`;
} else {
    fyear.innerText = "2020";
}

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