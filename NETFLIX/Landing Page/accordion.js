const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    const content = accordion.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
      accordion.textContent = accordion.textContent.replace("[-]", "[+]");
    } else {
      content.style.display = "block";
      accordion.textContent = accordion.textContent.replace("[+]", "[-]");
    }
  });
});
