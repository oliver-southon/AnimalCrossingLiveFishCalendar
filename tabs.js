// JavaScript to handle tab functionality
    
// Get all tab buttons
var tabBtns = document.querySelectorAll('#nav-tab .nav-link');

// Add event listener to each tab button
tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the current tab button and tab content
        var currentTabBtn = e.target;
        var currentTabContent = document.getElementById(currentTabBtn.getAttribute('href').slice(1));

        // Remove active class from all tab buttons and tab contents
        tabBtns.forEach(function(btn) {
            btn.classList.remove('active');
        });
        var tabContents = document.querySelectorAll('.tab-pane');
        tabContents.forEach(function(tab) {
            tab.classList.remove('active', 'show');
        });

        // Add active class to current tab button and tab content
        currentTabBtn.classList.add('active');
        currentTabContent.classList.add('active', 'show');
    });
});