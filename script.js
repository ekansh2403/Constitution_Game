document.addEventListener('DOMContentLoaded', function() {
    // Fetch News from NewsAPI
    const apiKey = '859e925fa28841c282d48b8da5f2f192'; // Replace with your NewsAPI key
    const apiUrl = `https://newsapi.org/v2/everything?q=laws%20OR%20crimes&language=en&pageSize=4&apiKey=${apiKey}`;
    const newsCards = document.querySelectorAll('.news-card'); // Get all predefined news cards

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.articles;

            if (!Array.isArray(articles)) {
                throw new Error('Articles data is not an array');
            }

            // Update content of the predefined cards
            articles.forEach((article, index) => {
                if (index < newsCards.length) {
                    const newsCard = newsCards[index];

                    const newsImage = newsCard.querySelector('.news-image');
                    const newsTitle = newsCard.querySelector('.news-title');
                    const newsDescription = newsCard.querySelector('.news-description');

                    // Update the content
                    newsImage.src = article.urlToImage || 'indianconstitution.webp'; // Fallback image if necessary
                    newsImage.alt = article.title || 'No title available';
                    newsTitle.textContent = article.title || 'No title available';
                    newsDescription.textContent = article.description || 'No description available';
                }
            });

            // Initialize the carousel after news is loaded
            initializeCarousel();
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });

    // Carousel functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    // Function to show the current slide
    function showSlides() {
        if (slides.length === 0) return; // Exit if there are no slides
    
        // Loop back to the first slide if at the end
        if (slideIndex >= totalSlides) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = totalSlides - 1; }
    
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${-slideIndex * 100}%)`;
        });
    }
    
    // Function to change slides automatically
    function autoSlide() {
        slideIndex++;
        showSlides();
    }
    
    // Initialize the carousel
    showSlides();
    
    // Set up automatic slide change every 5 seconds
    setInterval(autoSlide, 5000);
    
    // Optional: Add event listeners for manual navigation
    document.querySelector('.prev').addEventListener('click', () => {
        slideIndex--;
        showSlides();
    });
    document.querySelector('.next').addEventListener('click', () => {
        slideIndex++;
        showSlides();
    });

    // Typing animation functionality
    const typedTextElement = document.getElementById('typing-text'); // Target the p tag
    const textsToType = [
        "Explore the Constitution with ease.",
        "Engage in educational games and learn."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100; // Typing speed in milliseconds
    let deletingSpeed = 50; // Deleting speed in milliseconds
    let delayBetweenTexts = 2000; // Delay between text switching in milliseconds

    function typeText() {
        if (charIndex < textsToType[textIndex].length) {
            typedTextElement.textContent += textsToType[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(deleteText, delayBetweenTexts);
        }
    }

    function deleteText() {
        if (charIndex > 0) {
            typedTextElement.textContent = textsToType[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteText, deletingSpeed);
        } else {
            textIndex++;
            if (textIndex >= textsToType.length) {
                textIndex = 0; // Loop back to the first text
            }
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start the typing effect
    typeText();
});
