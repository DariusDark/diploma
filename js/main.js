const animItems = document.querySelectorAll("._anim-items");

const empty = document.getElementById("empty");
const navbar = document.getElementById("navbar");
const topPanel = document.querySelector(".header__top-panel");
empty.style.setProperty("--height", navbar.offsetHeight + "px");

const bars = document.getElementById("bars");
const times = document.getElementById("times");

bars.addEventListener("click", function () {
  this.classList.add("active");
});

times.addEventListener("click", () => {
  bars.classList.remove("active");
});
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    navbar.classList.toggle(
      "header__middle--fixed",
      this.pageYOffset >= topPanel.offsetHeight
    );
    empty.classList.toggle(
      "header__middle-empty--active",
      navbar.classList.contains("header__middle--fixed")
    );
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - animItemHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 400);
}

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = contactForm.elements.fullName.value;
  const phoneValue = contactForm.elements?.phoneNumber?.value;
  const emailValue = contactForm.elements?.email?.value;
  const messageValue = contactForm.elements?.message?.value;
  const token = "5446802131:AAHbPo9ZBoVJxGuJFfkWWV4HWAjLxp35StU";
  const chatId = "-1001723254140";
  let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Истифодабарандаи ${nameValue} мехоҳад ба шумо тамос гирад. Рақами мобили: ${phoneValue}`;
  if (emailValue) {
    url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=Истифодабарандаи ${nameValue} ба шумо паём фиристод. Паёми ӯ: ${messageValue}. Почтаи электронӣ: ${emailValue}`;
  }

  contactForm.elements.fullName.value = "";
  if (emailValue) {
    contactForm.elements.message.value = "";
    contactForm.elements.email.value = "";
  } else {
    contactForm.elements.phoneNumber.value = "";
  }

  alert("Маълумоти шумо равон шуд!");
  try {
    fetch(url);
  } catch (error) {
    console.log(error);
  }
});
