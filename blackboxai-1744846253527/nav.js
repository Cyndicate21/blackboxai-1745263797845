document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log("Initializing navigation menu...");
        
        // Don't show menu on login or new user pages
        if (window.location.pathname.includes('index.html') || window.location.pathname.includes('new-user.html')) {
            return;
        }

        // Menu items configuration
        const menuItems = [
            { text: 'Dashboard', href: 'dashboard.html', icon: 'gauge' },
            { text: 'Admin Dashboard', href: 'admin-dashboard.html', icon: 'user-shield' },
            { text: 'Action Needed', href: 'action-needed.html', icon: 'exclamation-circle' },
            { text: 'Upload Documents', href: 'upload.html', icon: 'upload' },
            { text: 'Revise Documents', href: 'revise-document.html', icon: 'pen-to-square' },
            { text: 'Submitted Documents', href: 'submitted-documents.html', icon: 'file-lines' },
            { text: 'Settings', href: 'settings.html', icon: 'gear' },
            { text: 'Profile', href: 'profile.html', icon: 'user' },
            { text: 'Help', href: 'help.html', icon: 'question-circle' }
        ];

        // Create menu button
        const headerContainer = document.querySelector('header .container > div');
        const menuButton = document.createElement('button');
        menuButton.className = 'text-white focus:outline-none';
        menuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        headerContainer.appendChild(menuButton);

        // Create menu container
        const menuContainer = document.createElement('div');
        menuContainer.className = 'fixed top-[60px] right-0 bg-white shadow-lg w-64 transform translate-x-full transition-transform duration-300 z-50 rounded-bl-lg';
        document.body.appendChild(menuContainer);

        // Create menu list
        const menuList = document.createElement('ul');
        menuList.className = 'py-2';
        
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.className = 'flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200';
            
            // Add icon
            a.innerHTML = `
                <i class="fas fa-${item.icon} w-6"></i>
                <span class="ml-2">${item.text}</span>
            `;
            
            // Highlight active page
            if (window.location.pathname.includes(item.href.split('?')[0])) {
                a.className += ' bg-red-50 text-red-600';
            }
            
            li.appendChild(a);
            menuList.appendChild(li);

            // Add separator after certain sections
            if (item.text === 'Action Needed' || item.text === 'Submitted Documents') {
                const separator = document.createElement('li');
                separator.className = 'border-t border-gray-200 my-2';
                menuList.appendChild(separator);
            }
        });

        menuContainer.appendChild(menuList);

        // Toggle menu
        let isMenuOpen = false;
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            menuContainer.style.transform = isMenuOpen ? 'translateX(0)' : 'translateX(100%)';
            menuButton.innerHTML = isMenuOpen ? '<i class="fas fa-times text-2xl"></i>' : '<i class="fas fa-bars text-2xl"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (isMenuOpen && !menuButton.contains(event.target) && !menuContainer.contains(event.target)) {
                isMenuOpen = false;
                menuContainer.style.transform = 'translateX(100%)';
                menuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
        });

        // Prevent menu from closing when clicking inside
        menuContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        console.log("Menu elements found:", menuItems);

    } catch (error) {
        console.error("Error initializing navigation:", error);
        // Create error notification
        const errorNotification = document.createElement('div');
        errorNotification.className = 'fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg';
        errorNotification.innerHTML = `
            <div class="flex items-center">
                <div class="py-1"><i class="fas fa-exclamation-circle"></i></div>
                <div class="ml-3">
                    <p class="text-sm">Navigation menu could not be loaded.</p>
                </div>
            </div>
        `;
        document.body.appendChild(errorNotification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            errorNotification.remove();
        }, 5000);
    }
});
