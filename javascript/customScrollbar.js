/* COPYRIGHT (C) EAMON MOONEY 2024  https://github.com/eamonmooney */

/* CUSTOM SCROLLBAR FOR FOLLOWING ICONS */

/* THIS FILE PERTAINS TOWARDS THE MAIN FUNCTIONALITY OF THE SCROLLBAR, INVOLVING ICON MOVEMENT AND IMAGE SWAPPING */

document.addEventListener('DOMContentLoaded', function() {
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const scrollIcon = document.querySelector('.scroll-icon');
    const content = document.querySelector('.content');
    const gallery = document.querySelector('#gallery');

    const debouncedSwapImages = debounce(swapImages, 25); // delay (ms)

    customScrollbar.addEventListener('scroll', function() {
        const scrollPercentage = (customScrollbar.scrollTop / (content.scrollHeight - customScrollbar.clientHeight)) * 100;
        const maxScrollPosition = gallery.clientHeight - scrollIcon.clientHeight - 10;
        const scrollPosition = (maxScrollPosition * scrollPercentage) / 100;

        if (scrollPosition > maxScrollPosition) {
            scrollPosition = maxScrollPosition;
        }

        scrollIcon.style.transform = `translateY(${scrollPosition}px)`;
        debouncedSwapImages(); // Call debounced function instead of swapImages directly
    });
});


function swapImages() {
    // Get references to the images by their IDs
    var image1 = document.getElementById('catTemp');
    var image2 = document.getElementById('catActive');

    // Store the current src values
    var tempSrc = image1.src;

    // Swap the src attributes
    image1.src = image2.src;
    image2.src = tempSrc;
}

// Debounce function to limit the frequency of calling swapImages
function debounce(func, delay) {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}

