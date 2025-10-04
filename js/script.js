// sidebar
// Sidebar toggle functionality
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Profile dropdown functionality
const profileDropdown = document.getElementById('profileDropdown');
const profileMenu = document.getElementById('profileMenu');

function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
}

function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

function toggleProfileMenu() {
    profileMenu.classList.toggle('hidden');
}

// Event listeners
toggleSidebar.addEventListener('click', openSidebar);
overlay.addEventListener('click', closeSidebar);
profileDropdown.addEventListener('click', toggleProfileMenu);

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnToggle = toggleSidebar.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth < 1024 && !sidebar.classList.contains('-translate-x-full')) {
        closeSidebar();
    }
});

// Set active menu item
document.querySelectorAll('#sidebar a').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('#sidebar a').forEach(i => {
            i.classList.remove('active-menu-item');
        });
        this.classList.add('active-menu-item');
    });
});

// Close profile menu when clicking outside
document.addEventListener('click', function (event) {
    if (!profileDropdown.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.classList.add('hidden');
    }
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.add('hidden');
    } else {
        closeSidebar();
    }
});

// Close sidebar when clicking on sidebar menu items on mobile
const sidebarLinks = document.querySelectorAll('#sidebar a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    });
});


// Add new product
//         // Form state management
        let currentStep = 1;
        const totalSteps = 3;

        // DOM Elements
        const stepText = document.getElementById('stepText');
        const stepTitle = document.getElementById('stepTitle');
        const progressBar = document.getElementById('progressBar');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const stepContents = document.querySelectorAll('.step-content');
        const dragDropArea = document.getElementById('dragDropArea');
        const fileInput = document.getElementById('fileInput');
        const uploadedFiles = document.getElementById('uploadedFiles');

        // Step titles for each step
        const stepTitles = [
            "Basic Information",
            "Pricing & Quantity",
            "Product Media"
        ];

        // Initialize the form
        function initForm() {
            updateStepDisplay();

            // Event listeners
            prevBtn.addEventListener('click', goToPreviousStep);
            nextBtn.addEventListener('click', goToNextStep);
            submitBtn.addEventListener('click', submitForm);

            // Drag and drop functionality
            setupDragAndDrop();
        }

        // Update step display
        function updateStepDisplay() {
            // Update step text and title
            stepText.textContent = `Step ${currentStep} of ${totalSteps}`;
            stepTitle.textContent = stepTitles[currentStep - 1];

            // Update progress bar
            const progressPercentage = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Show/hide step content
            stepContents.forEach((step, index) => {
                step.classList.toggle('hidden', index !== currentStep - 1);
            });

            // Show/hide navigation buttons
            prevBtn.classList.toggle('hidden', currentStep === 1);
            nextBtn.classList.toggle('hidden', currentStep === totalSteps);
            submitBtn.classList.toggle('hidden', currentStep !== totalSteps);

            // Update next button text on last step
            if (currentStep === totalSteps) {
                nextBtn.classList.add('hidden');
            }
        }

        // Go to next step
        function goToNextStep() {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepDisplay();
            }
        }

        // Go to previous step
        function goToPreviousStep() {
            if (currentStep > 1) {
                currentStep--;
                updateStepDisplay();
            }
        }

        // Submit form
        function submitForm() {
            // Here you would typically submit the form data to a server
            alert('Product submitted successfully!');
            // Reset form or redirect
        }

        // Setup drag and drop functionality
        function setupDragAndDrop() {
            // Click to upload
            dragDropArea.addEventListener('click', () => {
                fileInput.click();
            });

            // Handle file selection
            fileInput.addEventListener('change', handleFileSelect);

            // Drag and drop events
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dragDropArea.addEventListener(eventName, preventDefaults, false);
            });

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            ['dragenter', 'dragover'].forEach(eventName => {
                dragDropArea.addEventListener(eventName, highlight, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dragDropArea.addEventListener(eventName, unhighlight, false);
            });

            function highlight() {
                dragDropArea.classList.add('dragover');
            }

            function unhighlight() {
                dragDropArea.classList.remove('dragover');
            }

            // Handle dropped files
            dragDropArea.addEventListener('drop', handleDrop, false);

            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                handleFiles(files);
            }
        }

        // Handle file selection from input
        function handleFileSelect(e) {
            const files = e.target.files;
            handleFiles(files);
        }

        // Process selected files
        function handleFiles(files) {
            if (files.length > 0) {
                uploadedFiles.classList.remove('hidden');
                uploadedFiles.innerHTML = '';

                // Limit to 5 files
                const fileCount = Math.min(files.length, 5);

                for (let i = 0; i < fileCount; i++) {
                    const file = files[i];

                    // Create preview for images
                    if (file.type.match('image.*')) {
                        const reader = new FileReader();

                        reader.onload = (function (theFile) {
                            return function (e) {
                                const preview = document.createElement('div');
                                preview.className = 'relative group';
                                preview.innerHTML = `
                                    <img src="${e.target.result}" class="w-full h-32 object-cover rounded-lg" alt="${theFile.name}">
                                    <button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                `;

                                // Add remove functionality
                                const removeBtn = preview.querySelector('button');
                                removeBtn.addEventListener('click', function () {
                                    preview.remove();
                                    if (uploadedFiles.children.length === 0) {
                                        uploadedFiles.classList.add('hidden');
                                    }
                                });

                                uploadedFiles.appendChild(preview);
                            };
                        })(file);

                        reader.readAsDataURL(file);
                    }
                }
            }
        }

        // Initialize the form when the page loads
        document.addEventListener('DOMContentLoaded', initForm);


        // my order

        let currentDate = new Date(2025, 7, 13); // August 13, 2025

        function getDaysInMonth(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = firstDay.getDay();
            
            const days = [];
            
            // Previous month's days
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                days.push({ day: prevMonthLastDay - i, disabled: true });
            }
            
            // Current month's days
            for (let i = 1; i <= daysInMonth; i++) {
                days.push({ 
                    day: i, 
                    disabled: false,
                    selected: i === currentDate.getDate() && 
                             month === currentDate.getMonth() && 
                             year === currentDate.getFullYear()
                });
            }
            
            // Next month's days
            const remainingDays = 42 - days.length; // 6 rows * 7 days
            for (let i = 1; i <= remainingDays; i++) {
                days.push({ day: i, disabled: true });
            }
            
            return days;
        }

        function renderCalendar() {
            const cal = document.getElementById('calendar');
            const monthYear = document.getElementById('monthYear');
            
            const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                               'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
            
            monthYear.innerHTML = `
                <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">${monthNames[currentDate.getMonth()]}</span>
                <span class="text-xl font-bold text-gray-900">${currentDate.getFullYear()}</span>
            `;
            
            const days = getDaysInMonth(currentDate);
            
            cal.innerHTML = days.slice(0, 35).map(d => `
                <div class="calendar-day text-center py-1 sm:py-2.5 rounded-md text-xs sm:text-sm font-medium cursor-pointer ${
                    d.selected ? 'selected' : 
                    d.disabled ? 'disabled' : 
                    ''
                }">
                    ${d.day}
                </div>
            `).join('');
        }

        function changeMonth(direction) {
            currentDate.setMonth(currentDate.getMonth() + direction);
            renderCalendar();
        }

        renderCalendar();
