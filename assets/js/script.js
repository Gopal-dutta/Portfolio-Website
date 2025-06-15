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
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code for header and clock...

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 300, // Default duration for AOS animations
            offset: 80,    // Offset (in px) from the original trigger point
            once: true     // Whether animation should happen only once - while scrolling down
        });
    }

    // PDF Modal Functionality
    const modal = document.getElementById('pdf-modal');
    const pdfViewer = document.getElementById('pdf-viewer');
    const closeButton = document.querySelector('.modal .close-button');
    const certificateLinks = document.querySelectorAll('.certificate-preview-link');

    if (modal && pdfViewer && closeButton) { // Check if modal elements exist on the page
        certificateLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default anchor behavior
                const pdfSrc = link.getAttribute('data-pdf-src');
                if (pdfSrc) {
                    // Attempt to hide toolbar. Browser support varies.
                    // For some viewers, this might help discourage direct download buttons.
                    pdfViewer.src = pdfSrc + '#toolbar=0&navpanes=0&scrollbar=0'; 
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            pdfViewer.src = ''; // Clear src to stop PDF loading
            document.body.style.overflow = 'auto'; // Restore background scrolling
        });

        // Close modal if user clicks outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                pdfViewer.src = '';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                pdfViewer.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
