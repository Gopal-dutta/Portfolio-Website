// Auto-hiding header script
let lastScrollTop = 0;
const header = document.querySelector('header');
const headerHeight = header ? header.offsetHeight : 0; // Get header height

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) { // Check if header element exists
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scrolling Down and past the header height (or some offset)
            header.classList.add('header-hidden');
        } else {
            // Scrolling Up or at the top
            header.classList.remove('header-hidden');
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);


// Digital Clock and Date Logic
function updateDigitalDateTime() {
    const timeElement = document.getElementById('digital-time');
    const dateElement = document.getElementById('digital-date');

    if (timeElement && dateElement) {
        const now = new Date();

        // Time: HH:MM:SS AM/PM
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const hoursStr = hours.toString().padStart(2, '0'); // Ensure two digits for hour

        timeElement.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;

        // Date: DD MM, YYYY
        const day = now.getDate().toString().padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        dateElement.textContent = `${day} ${month}, ${year}`;
    }
}

// Check if clock/date elements exist on the page before starting the interval
if (document.getElementById('digital-time') && document.getElementById('digital-date')) {
    setInterval(updateDigitalDateTime, 1000); // Update every second
    updateDigitalDateTime(); // Initial call to display immediately without waiting for 1 second
}
