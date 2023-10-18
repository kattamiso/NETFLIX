const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".arrow-left");
const nextButton = document.querySelector(".arrow-right");
const indicatorsContainer = document.querySelector(".indicators");

let currentIndex = 0; // Initialize the current index
let movies = []; // Store fetched movies in a global variable

// Function to fetch popular movies from the API
async function fetchPopularMovies() {
  try {
    console.log("Fetching popular movies...");
    const response = await fetch(API_URL);
    console.log("Response status:", response.status); // Log response status
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    // Log fetched data
    movies = data.results;
    // Store fetched movies globally
    return movies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

// Function to populate the slider with movie posters from the API
async function populateSlider() {
  console.log("here 0");
  await fetchPopularMovies(); // Fetch movies and store them in the global variable

  slider.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  movies.forEach((movie, index) => {
    const moviePoster = document.createElement("div");
    moviePoster.classList.add("movie-poster");
    const posterImg = document.createElement("img");
    posterImg.src = `${IMG_PATH}${movie.poster_path}`;
    posterImg.alt = movie.title;
    moviePoster.appendChild(posterImg);
    slider.appendChild(moviePoster);

    // Create an indicator dot for each movie
    const indicatorDot = document.createElement("div");
    indicatorDot.classList.add("indicator-dot");
    indicatorDot.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicatorDot);
  });

  // Show the first movie by default
  showSlide(currentIndex);
}

// Function to show a specific slide
function showSlide(index) {
  const moviePosters = document.querySelectorAll(".movie-poster");
  const indicatorDots = document.querySelectorAll(".indicator-dot");

  moviePosters.forEach((poster) => poster.classList.remove("active"));
  indicatorDots.forEach((dot) => dot.classList.remove("active"));

  moviePosters?.[index]?.classList.add("active");
  indicatorDots?.[index]?.classList.add("active");
  currentIndex = index;
}

// Function to go to a specific slide
const slideWidth = 20;
const numImagesPerLoop = 3;

// Function to move the slider left or right
function moveSlider(direction) {
  const slides = document.querySelectorAll(".slider img");
  if (direction === "left") {
    currentIndex -= numImagesPerLoop;
    if (currentIndex < 0) {
      currentIndex = slideWidth - numImagesPerLoop;
    }
  } else if (direction === "right") {
    currentIndex += numImagesPerLoop;
    if (currentIndex >= slideWidth) {
      currentIndex = 0;
    }
  }

  const translateValue = -currentIndex * (100 / slideWidth);

  slider.style.transform = `translateX(${translateValue}%)`;
}

populateSlider();

slider.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    const data = {
      title: "Movie Title",
      overview: "Movie Overview",
      release_date: "Release Date",
      vote_average: "Vote Average",
    };
    console.log("Hello!");
    // Redirect to film-details.html
    window.location.href = "film-details.html";
  }
});



// Populate the slider with movie posters from the API
async function populateSlider() {
  try {
    console.log("Fetching popular movies...");
    const data = await fetchPopularMovies(); // Fetch movies and store them in the global variable

    slider.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    data.forEach((movie, index) => {
      const moviePoster = document.createElement("div");
      moviePoster.classList.add("movie-poster");
      const posterImg = document.createElement("img");
      posterImg.src = `${IMG_PATH}${movie.poster_path}`;
      posterImg.alt = movie.title;
      moviePoster.appendChild(posterImg);
      slider.appendChild(moviePoster);

      // Create an indicator dot for each movie
      const indicatorDot = document.createElement("div");
      indicatorDot.classList.add("indicator-dot");
      indicatorDot.addEventListener("click", () => goToSlide(index));
      indicatorsContainer.appendChild(indicatorDot);
    });

    // Show the first movie by default
    showSlide(currentIndex);
  } catch (error) {
    console.error("Error populating slider:", error);
  }
}

// ...

slider.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    // Retrieve the clicked movie data
    const clickedMovieIndex = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
    const clickedMovie = movies[clickedMovieIndex];

    // You can now use the 'clickedMovie' object to display details
    console.log("Clicked movie data:", clickedMovie);

    // Redirect to film-details.html and pass data if needed
    // window.location.href = "film-details.html";
  }
});

