document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Initialize slider position
    updateSliderPosition();

    // Add click event listeners to buttons
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
        }
        updateSliderPosition();
    });

    // Touch events for mobile swipe
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    function touchStart(event) {
        isDragging = true;
        startPos = event.touches[0].clientX;
        prevTranslate = currentTranslate;
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = event.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // If moved enough negative
        if (movedBy < -100 && currentSlide < totalSlides - 1) {
            currentSlide++;
        }
        // If moved enough positive
        if (movedBy > 100 && currentSlide > 0) {
            currentSlide--;
        }

        updateSliderPosition();
    }

    function updateSliderPosition() {
        currentTranslate = currentSlide * -33.333;
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }
});