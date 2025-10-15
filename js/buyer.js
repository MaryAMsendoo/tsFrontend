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

            if (!isClickInsideSidebar && !isClickOnToggle && !sidebar.classList.contains('-translate-x-full')) {
                closeSidebar();
            }
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
                // Only close sidebar on mobile screens
                if (window.innerWidth < 1024) {
                    closeSidebar();
                }
            });
        });

        // Mobile search toggle (optional)
        function toggleMobileSearch() {
            // Add mobile search functionality here if needed
        }
