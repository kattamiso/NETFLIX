const container = document.querySelector(".container");
container.style.marginTop = "200px";

function signIn() {
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (email.endsWith("@gmail.com")) {
        alert("Authorization successful! Redirecting to the movie page...");
        window.location.href = "../movies.html";
      } else {
        alert("Invalid email. Please use a valid Gmail address.");
        document.getElementById("email").focus();
      }
    });
}

signIn();
