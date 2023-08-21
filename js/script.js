//================= About Page Slider -START =================//
window.onload = () => {
    const prev = document.querySelector('.left')
    const next = document.querySelector('.right')
    const container = document.querySelector('.avatars')
    const avatars = document.querySelectorAll('.avatars-container .avatar-item')
    let currentIndex = Math.floor(avatars.length / 2)
    const val = (avatars.length - 1 - Math.floor(avatars.length / 2)) * 195
    let translateVal = 0

    for (let i = 0; i < avatars.length; i++) {
        if (i === Math.floor(avatars.length / 2)) {
            avatars[i].classList.add('current')
        }
    }

    let defaultVal = 0
    if (avatars.length % 2 === 0) {
        defaultVal = 90
        translateVal -= 230
        container.style.transform = `translateX(${translateVal}px)`
    }


    prev.addEventListener('click', () => {
        if (currentIndex - 1 < 0) {
            avatars[currentIndex].classList.remove('current')
            avatars[avatars.length - 1].classList.add('current')
            currentIndex = avatars.length - 1
            translateVal = -val - 765
            container.style.transform = `translateX(${translateVal}px)`
        } else {
            avatars[currentIndex].classList.remove('current')
            avatars[currentIndex - 1].classList.add('current')
            currentIndex -= 1
            translateVal += 455
            container.style.transform = `translateX(${translateVal}px)`
        }
    })

    next.addEventListener('click', () => {
        if (currentIndex + 1 >= avatars.length) {
            avatars[currentIndex].classList.remove('current')
            avatars[0].classList.add('current')
            currentIndex = 0
            translateVal = val + 765
            container.style.transform = `translateX(${translateVal}px)`
            return
        }
        avatars[currentIndex].classList.remove('current')
        avatars[currentIndex + 1].classList.add('current')
        currentIndex += 1
        translateVal -= 455
        container.style.transform = `translateX(${translateVal}px)`
    })
}
//================= About Page Slider - END =================//

//================= IMAGE POPUP (ABOUT PAGE) - START =================//
const gallery_images = document.querySelectorAll('.avatar-item img');
const gallery_modal = document.getElementById('about_gallery');
const gallery_modalImg = document.getElementById('gallery_img');

gallery_images.forEach((image) => {
  image.addEventListener('click', () => {
    gallery_modal.style.display = 'block';
    gallery_modalImg.src = image.src;
    gallery_modal.classList.add("g_show");
  });
});

function closeModal() {
  gallery_modal.classList.remove("g_show");
  setTimeout(function() {
  gallery_modal.style.display = "none";
  }, 300);
}

window.onclick = function (event) {
  if (event.target == gallery_modal) {
    gallery_modal.classList.remove("g_show");
    setTimeout(function() {
      gallery_modal.style.display = "none";
    }, 300);
  }
};
//================= IMAGE POPUP (ABOUT PAGE) - END =================//


const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.popup-mobilemenu');
const menuBar = document.getElementById('bar');
const close = document.getElementById('close');

mobileMenu.addEventListener('click', (e) => {
    if (e.target.matches('.menu__item')) {
        // disable default behavior
        e.preventDefault();

        // close the side-bar menu
        closeSideMenu();

        // change the location
        window.location.href = e.target.href;
    }
});

function closeSideMenu() {
    const sideMenuToggle = document.querySelector('#close');
    sideMenuToggle.click();
}

window.onscroll = () => {
    if (document.documentElement.scrollTop > 120) {
        navbar.classList.add("scroll-on");
    } else {
        navbar.classList.remove("scroll-on");
    }
}

if (menuBar) {
    menuBar.addEventListener('click', () => {
        mobileMenu.classList.add('menu-open');
    })
}

if (close) {
    close.addEventListener('click', () => {
        mobileMenu.classList.remove('menu-open');
    })
}