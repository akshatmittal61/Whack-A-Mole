let score = 0;
function getOutInterval() {
    return Date.now() + 1000;
}
function getGoneInterval() {
    return Date.now() + Math.floor((Math.random() * 8000) + 2000);
}
function getStayInterval() {
    return Date.now() + Math.floor(Math.random() * 1000) + 500;
}
let minutes = (document.querySelector(".min"));
let seconds = (document.querySelector(".sec"));
let sec, min;
setInterval(() => {
    sec = parseInt(seconds.innerHTML);
    min = parseInt(minutes.innerHTML);
    if ((sec !== 0) && (min >= 0)) {
        seconds.innerHTML = --sec;
    }
    if ((sec == 0) && (min > 0)) {
        seconds.innerHTML = 59;
        minutes.innerHTML = --min;
    }
}, 1000);
let moles = [
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-0")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-1")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-2")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-3")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-4")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-5")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-6")
    },
    {
        status: "out",
        next: getStayInterval(),
        node: document.querySelector("#mole-7")
    }
];
function getNextStatus(mole) {
    switch (mole.status) {
        case "out":
        case "hit":
            mole.next = getGoneInterval();
            mole.status = "left";
            mole.node.src = "images/dirt.png";
            mole.node.classList.remove("out");
            mole.node.classList.add("left");
            break;
        case "left":
            mole.next = getStayInterval();
            mole.status = "out";
            mole.node.src = "images/mole-happy.png";
            mole.node.classList.remove("left");
            mole.node.classList.add("out");
            break;
        default:
            break;
    }
}
function hit(event) {
    if ((event.target.tagName !== "IMG" || !event.target.classList.contains("out")) && (event.target.tagName !== "IMG" || !event.target.classList.contains("hit"))) {
        return;
    }
    let mole = moles[parseInt(event.target.dataset.index)];
    mole.status = "hit";
    mole.next = getOutInterval();
    mole.node.src = "images/mole-hit.png";
    mole.node.classList.remove("left");
    mole.node.classList.remove("out");
    sec = parseInt(document.querySelector(".sec").innerHTML);
    min = parseInt(document.querySelector(".min").innerHTML);
    ++score;
    document.querySelector(".score").innerHTML = score;
}
function end() {
    document.querySelector(".wrapper").classList.add("dispn");
    document.querySelector("#final-score").innerHTML = score;
    document.querySelector(".end").classList.remove("dispn");
}
let runAgainAt = Date.now() + 1000;
function nextFrame() {
    let now = Date.now();
    if (runAgainAt <= now) {
        for (let i = 0; i < moles.length; ++i) {
            if (moles[i].next <= now) {
                getNextStatus(moles[i]);
            }
    if ((sec === 0) && (min === 0)) {
        end();
    }
        }
        runAgainAt = now + 1000;
    }
    requestAnimationFrame(nextFrame);
}
document.querySelector(".wrapper").addEventListener("click", hit);
nextFrame();
document.querySelector(".return").addEventListener("click", () => {
    location.reload();
});
