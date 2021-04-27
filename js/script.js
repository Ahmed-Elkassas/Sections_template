
// Setting-Box ---------------------------------------------
let mainColors = localStorage.getItem('color_option');

if (mainColors !== null) {
    // console.log(`the local is not empty`);
    // console.log(localStorage.getItem('color_option'));
    document.documentElement.style.setProperty('--main-color', mainColors);

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove('active');

        if (element.dataset.color === mainColors) {
            element.classList.add('active');
        }
    });
}

//  Random Background Option ------------ Landing Page[localStorage] -----
let backOption = true;
//  var to control the background Interval
let backInterval;

// Check if local storage is not empty
let backLocalSt = localStorage.getItem('background_option');

if (backLocalSt !== null) {
    if (backLocalSt === 'true') {
        backOption = true;
    } else {
        backOption = false;
    }
}

// Remove active class from all spans
document.querySelectorAll('.background-random span').forEach(ele => {

    ele.classList.remove('active');
});

if (backLocalSt === 'true') {
    document.querySelector('.background-random .yes').classList.add('active');
} else {
    document.querySelector('.background-random .no').classList.add('active');

}


// Toggle Icon to Open Setting and close it ----------------------------------
document.querySelector('.setting-icon i').onclick = function() {
    this.classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open');
}

// --------------- Color Options ----------------------------
document.querySelectorAll('.colors-list li').forEach(li => {
    // console.log(li);
    li.addEventListener('click', (e) => {
        // console.log(e.target.dataset.color);

        // to get the HTML Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        localStorage.setItem('color_option', e.target.dataset.color);

        //  to add the active class
        handleActive(e);  
    });
});


// ---------------------  Random Background Options ----------------------
document.querySelectorAll('.background-random span').forEach(span => {

    span.addEventListener('click', (e) => {

        handleActive(e);

        if (e.target.dataset.background === "yes") {           
            backOption = true;
            randomImg();
            localStorage.setItem('background_option', true); // Now there is a value in the localStorage 

        } else {
            backOption = false;
            clearInterval(backInterval);
            localStorage.setItem('background_option', false);
        }
    });
});


// --------- landing page ---------------------------------
let landingPage = document.querySelector('.landing-page')

let imgArray = ["header1.jpg", "header2.jpg", "header3.jpg", "header4.jpg", "header5.jpg", "header6.jpg" ];

function randomImg() {

    if (backOption === true) {

        backInterval = setInterval(() => {

            let randomNumber = Math.floor(Math.random() * imgArray.length);
            console.log(randomNumber);
            landingPage.style.backgroundImage = 'url("images/' + imgArray[randomNumber] +'")';
        
        }, 20000);
    }
}
randomImg();


// Popup images --------------------------------------------------- 

let imagesGallary = document.querySelectorAll(".gallary img");

imagesGallary.forEach(img => {
    
    img.addEventListener("click", (e) => {

        let overDiv = document.createElement("div");

        overDiv.className = 'popup-overlay';

        document.body.appendChild(overDiv);

        // create image & image Store[Div]
        let popupDiv = document.createElement('div');

        popupDiv.className = 'popup-box';

        // Create the heading to the images && put it here because the appendChild always put the element at last
        if (img.alt !== null) {

            let imgHeading = document.createElement('h3');

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupDiv.appendChild(imgHeading);
        }

        // =================================
        let popupImage = document.createElement('img');

        popupImage.src = img.src;

        popupDiv.appendChild(popupImage);

        document.body.appendChild(popupDiv);

        //  Add the Close span  --------------------------
        let btnSpan = document.createElement('span');

        let btnClose = document.createTextNode('x');
        
        btnSpan.appendChild(btnClose);

        btnSpan.className = 'close-btn';

        //  Add span to popup div
        popupDiv.appendChild(btnSpan);
    });
});

//  Remove the popup with the span x 
document.addEventListener('click', function (e) {

    if (e.target.className == 'close-btn') {

        e.target.parentNode.remove();

        document.querySelector('.popup-overlay').remove();
    };
});

//  Swiper Effect --------------------------------------
var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    loop: true 
  });

// Nav-bullets 
const bullets = document.querySelectorAll('.nav-bullets .bullet');
// console.log(bullets);

const links = document.querySelectorAll('.links a');

// function scroll to sections ---------------
function scrollSection(elements) {
    
    elements.forEach(ele => {

        ele.addEventListener('click', (e) => {

            e.preventDefault();
    
            //  this feature Not Supported at all browsers [x]
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    });
}

scrollSection(bullets);
scrollSection(links);

// function to handle active class ---------------------
function handleActive(e) {
    e.target.parentElement.querySelectorAll('.active').forEach(ele => {

        ele.classList.remove('active');
    });
    e.target.classList.add('active');
}

//  Show bullets -----------------------------------
let bulletsOption = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector('.nav-bullets');

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
    // console.log(`not empty`);
    bulletsOption.forEach(span => {

        span.classList.remove('active');

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add('active');

    } else {
        
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add('active');
}
}

// 
bulletsOption.forEach(span => {

    span.addEventListener('click', (e) => {

        if (span.dataset.display === "show") {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');

        } else {

            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }

        handleActive(e);
    });
});


// Reset  All Option -----------------------------------
document.querySelector('.rest-options').onclick = () => {
    localStorage.clear();

    window.location.reload();
}


// Toggle menu ------------------------------------------
let toggleBtn = document.querySelector('.toggle-menu');
let menuLinks = document.querySelector('.header .links');

toggleBtn.onclick = function (e) {

    // to stop make comparison
    e.stopPropagation();

    this.classList.toggle('menu-active');

    menuLinks.classList.toggle('open');
};

// Click anywhere to close the toggle menu ----------------
document.addEventListener('click', (e) => {

    // check if i click to the menu and the btn
    if (e.target !== toggleBtn && e.target !== menuLinks) {
        // console.log(`this is the wronge button you want to click on it`);

        // check if the menu is open
        if (menuLinks.classList.contains('open')) {
            
            toggleBtn.classList.toggle('menu-active');

            menuLinks.classList.toggle('open');   
        }
    }
});

// stop the propagation on menu
menuLinks.onclick = (e) => {

    e.stopPropagation();

}