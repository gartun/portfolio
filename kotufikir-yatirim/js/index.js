const navBtn = document.querySelector(".menu-btn-wrapper");
const nav = document.querySelector("nav");
let opened = false;
navBtn.addEventListener("click", openMenu);

function openMenu() {
    if (!opened) {
        this.classList.add("open");
        setTimeout(() => {
            document.querySelector(".logo").style.color = "#fff";
            document.querySelector(".logo-name").style.opacity = "0";
            document.querySelector(".logo-name").style.visibility = "hidden";

        }, 500);
        opened = true;
    } else {
        this.classList.remove("open");
        document.querySelector(".logo").style.color = "#00808f";
        document.querySelector(".logo-name").style.opacity = "1";
        document.querySelector(".logo-name").style.visibility = "visible";
        opened = false;
    }

}

let stockText = ``;
stocks.forEach(el => {
    stockText += `<span class="stock"><span class="stock-name">${el.name} </span><span class="stock-price" style="color: ${el.color}">${el.price}</span></span>`;
});
document.querySelector(".stock-prices").innerHTML = stockText;

const footerYear = document.getElementById("year");
const year = new Date();
if (year.getFullYear() == 2020) {
    footerYear.innerText = year.getFullYear();
} else {
    footerYear.innerText = `2020 - ${year.getFullYear()}`;
}