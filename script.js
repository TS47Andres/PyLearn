// --- Intersection Observer for Scroll Animations ---
// Detects when elements enter the viewport and adds/removes a 'show' class
// Used for fade-in/slide-in effects on elements with classes like .scroll-fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add class when element is visible
        } else {
            entry.target.classList.remove('show'); // Remove class when element is not visible
        }
    });
});

// Select all elements that should have scroll animations
const hiddenElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right');
// Observe each selected element
hiddenElements.forEach((el) => observer.observe(el));
// --- End Intersection Observer ---


// --- Dark Mode Toggle Script ---
// Manages toggling between light and dark themes and persists the choice in localStorage
(function () {
    const darkModeToggle = document.getElementById('darkModeToggle'); // The toggle button
    const body = document.body; // The main body element
    const THEME_KEY = 'themePreference'; // Key for localStorage
    const SUN_ICON = '<i class="ri-sun-fill"></i>'; // Icon for light mode (shown in dark mode)
    const MOON_ICON = '<i class="ri-moon-fill"></i>'; // Icon for dark mode (shown in light mode)

    // Function to apply the selected theme (dark/light) to the body and update the toggle button icon
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeToggle) { // Check if the button exists on the page
                darkModeToggle.innerHTML = SUN_ICON; // Show sun icon
            }
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) { // Check if the button exists on the page
                darkModeToggle.innerHTML = MOON_ICON; // Show moon icon
            }
        }
    };

    // Function to toggle the theme, save the preference, and apply the new theme
    const toggleTheme = () => {
        let currentTheme = localStorage.getItem(THEME_KEY);
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Switch theme
        localStorage.setItem(THEME_KEY, newTheme); // Save new theme preference
        applyTheme(newTheme); // Apply the new theme
    };

    // Add event listener to the dark mode toggle button if it exists
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleTheme);
    } else {
        console.error("Dark Mode Toggle button (#darkModeToggle) not found!");
    }

    // On page load, apply the saved theme or detect system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        applyTheme(savedTheme); // Apply saved theme
    } else {
        // If no theme is saved, check the user's system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light'); // Apply system preference
    }

})(); // Immediately Invoked Function Expression (IIFE) to avoid polluting global scope
// --- End Dark Mode Toggle Script ---


// --- Vertical Navigation Dropdown Script ---
// Handles the expand/collapse behavior of sub-navigation items in the vertical nav
document.addEventListener('DOMContentLoaded', function() {
    // Select all toggle buttons within the vertical navigation
    const navToggles = document.querySelectorAll('.vertical-nav .nav-toggle');

    navToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Find the next element, which should be the sub-navigation div
            const subNav = this.nextElementSibling;

            // Check if the clicked element has a valid sub-navigation sibling
            if (subNav && subNav.classList.contains('sub-nav')) {
                // Toggle the 'show' class to display/hide the sub-navigation
                subNav.classList.toggle('show');
                // Toggle the 'active' class on the button (e.g., for icon rotation)
                this.classList.toggle('active');
            }
        });
    });
});
// --- End Vertical Navigation Dropdown Script ---


// --- Mobile Navigation Toggle Script ---
// Handles showing/hiding the vertical navigation as a sidebar on mobile screens
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle'); // The hamburger button
    const verticalNav = document.querySelector('.vertical-nav'); // The navigation menu itself

    // Ensure both the toggle button and the navigation menu exist
    if (menuToggle && verticalNav) {

        // Function to close the sidebar and reset the toggle button state
        const closeSidebar = () => {
            if (verticalNav.classList.contains('sidebar-active')) {
                verticalNav.classList.remove('sidebar-active'); // Hide sidebar
            }
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active'); // Reset button appearance
                menuToggle.setAttribute('aria-expanded', 'false'); // Update accessibility attribute
            }
        };

        // Function to open the sidebar and set the toggle button state
         const openSidebar = () => {
            if (!verticalNav.classList.contains('sidebar-active')) {
                 verticalNav.classList.add('sidebar-active'); // Show sidebar
            }
            if (!menuToggle.classList.contains('active')) {
                menuToggle.classList.add('active'); // Set button to active appearance (e.g., show close icon)
                menuToggle.setAttribute('aria-expanded', 'true'); // Update accessibility attribute
            }
        };

        // Add click event listener to the hamburger menu button
        menuToggle.addEventListener('click', function() {
            // If the sidebar is currently active, close it; otherwise, open it.
            if (verticalNav.classList.contains('sidebar-active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

    } else {
        // Log errors if essential elements are missing
        if (!menuToggle) console.error("Menu toggle button (.menu-toggle) not found!");
        if (!verticalNav) console.error("Vertical nav sidebar (.vertical-nav) not found!");
    }
});
// --- End Mobile Navigation Toggle Script ---