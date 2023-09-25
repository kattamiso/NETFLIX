const carousel = document.querySelector(".carousel");
document.addEventListener("click", (e) => {
  let handle;
  if (e.target.matches(".handle")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".handle");
  }
  if (handle != null) onHandleClick(handle);
});

const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);
}, 250);
window.addEventListener("resize", throttleProgressBar);

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar);

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = "";
  const slider = progressBar.closest(".row").querySelector(".slider");
  const itemCount = slider.children.length;
  const itemsPerScreen = parseInt(
    getComputedStyle(slider).getPropertyValue("--items-per-screen")
  );
  let sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen);

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1);
    sliderIndex = progressBarItemCount - 1;
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("progress-item");
    if (i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressBar.append(barItem);
  }
}

function onHandleClick(handle) {
  const progressBar = handle.closest(".row").querySelector(".progress-bar");
  const slider = handle.closest(".container").querySelector(".slider");
  const sliderIndex = parseInt(
    getComputedStyle(slider).getPropertyValue("--slider-index")
  );
  const progressBarItemCount = progressBar.children.length;
  if (handle.classList.contains("left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[progressBarItemCount - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex - 1].classList.add("active");
    }
  }

  if (handle.classList.contains("right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
      progressBar.children[sliderIndex].classList.remove("active");
      progressBar.children[sliderIndex + 1].classList.add("active");
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

// // images

// const imageUrls = [
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABeqfT2_-pIeAnhkqj0GpudyhvXhx94AqyF9tkpneVdXu-3OATs6WlyyJJGhDCI9f8aYJJShAluJXN888F2NuB1cdlle-7Ky89bq8VkR-ilzL8yy5sT_4nUedoHC5jun8INFE.jpg?r=a07",
//     alt: "image 1 ",
//   },
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZbkTF5fuolZmuOwMBoTH-d0uYWXjGVW3Ex54IuVMRHhcnb8CFj4FiO2JxYPGtlLSYP9gH5ryYwn-ULEYmpaPMC1uhShgbQU8DjeIld5tkmdF2P9vrB2EC8yBhrMGKQVtMU6dirydDwuFrgzZz5ThEeVyuNazz_lxD4IUdaOE1QtFYq09rw_5g__aTXCo6vJXH6_iY28W-JiSk_SgsyQXXKOKrvh5LW3GkZRepwKWlYuhkcQgmOB8DK-7sJKhfUr3E6iQ6ESwoiyNs2HA5of-lzcYjYFuWfpjEbofEe13LzkWPIZ-bV7mpUK.jpg?r=6ab",
//     alt: "Image 2",
//   },
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbzBukwj-wl3qePSdFwS-Nwy6BGO7tIdqQ0oFSWYKqpdhrmIcLeD0CYnBd81oVLyS7eu5sROjfsOCmJmxso3w8xcqDcCdNitNN6nUpm2nLIKIbB7PUAsftFJnfhUpQk0tEi0.jpg?r=8a4",
//     alt: "Image 4",
//   },
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABQLR0E8qnu8XDDvboruw_pgFKHJ9ucfPiAeB6sdVnz2mUmoc816_lM4smI9NPQM5ePtXDJLPiclp6jv1oR3ai9SsMUfs_ERg_U2oeU__hRCWpMeKLkeGoEt8dg05pj78lCKI.jpg?r=6f9",
//     alt: "Image 5",
//   },
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABduvScqoCQX6JdcofjGnloW1OJg-RNoh3_1T3tYW6pHNy9MnLqMSrbH_RHL7h2G02WLUkXj5gZXc9W3bsyEWaiLablDxAh6YJHY-JF6qxiHFODAGhSCEt8Jqi1YZJf8l5E0R.jpg?r=390",
//     alt: "Image 6",
//   },
//   {
//     url: "https://occ-0-5515-1489.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABV51hRDdUpUAyRG8BoOZTxT7SjSkMzK30aAf79WR1bp5x2JhOU96Xjoqw3KB6i-LG4Oc90BLytLfIqLRscwitn83YqacKVavQUYuhiDZDEsPKKNpIiYsJ4u8bYwnv5gY4Hl0.jpg?r=a6e",
//     alt: "Image 7",
//   },
// ];
