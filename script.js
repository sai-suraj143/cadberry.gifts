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

    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSliderPosition();
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = totalSlides - 1;
        }
        updateSliderPosition();
    }

    // Add click event listeners to buttons
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile swipe
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);

    function touchStart(event) {
        clearInterval(autoSlideInterval);
        isDragging = true;
        startPos = event.touches[0].clientX;
        prevTranslate = currentTranslate;
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = event.touches[0].clientX;
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            
            // Limit the drag
            const maxDrag = -(totalSlides - 1) * 33.333;
            currentTranslate = Math.max(maxDrag, Math.min(0, currentTranslate));
            
            slider.style.transform = `translateX(${currentTranslate}%)`;
        }
    }

    function touchEnd() {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // Determine direction and threshold for slide change
        if (Math.abs(movedBy) > 50) {
            if (movedBy < 0 && currentSlide < totalSlides - 1) {
                currentSlide++;
            } else if (movedBy > 0 && currentSlide > 0) {
                currentSlide--;
            }
        }

        updateSliderPosition();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function updateSliderPosition() {
        currentTranslate = currentSlide * -33.333;
        slider.style.transform = `translateX(${currentTranslate}%)`;
    }
});