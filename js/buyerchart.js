// Get all DOM elements
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const mainSidebar = document.getElementById('mainSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

const toggleChatListBtn = document.getElementById('toggleChatListBtn');
const closeChatListBtn = document.getElementById('closeChatListBtn');
const chatList = document.getElementById('chatList');
const chatOverlay = document.getElementById('chatOverlay');

const fileInput = document.getElementById('fileInput');
const attachFileBtn = document.getElementById('attachFileBtn');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messageInput = document.getElementById('messageInput');
const messagesArea = document.getElementById('messagesArea');

// Sidebar toggle functions
function openSidebar() {
    mainSidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
    mainSidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
}

function toggleSidebar() {
    if (mainSidebar.classList.contains('-translate-x-full')) {
        openSidebar();
    } else {
        closeSidebar();
    }
}

// Chat list toggle functions
function toggleChatList() {
    chatList.classList.toggle('-translate-x-full');
    chatOverlay.classList.toggle('hidden');
}

function closeChatListFunc() {
    chatList.classList.add('-translate-x-full');
    chatOverlay.classList.add('hidden');
}

// File upload handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex flex-col items-end max-w-2xl ml-auto';

        const isImage = file.type.startsWith('image/');
        const currentTime = new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });

        if (isImage) {
            messageDiv.innerHTML = `
                <div class="bg-green-600 rounded-2xl rounded-tr-sm p-2 shadow-sm max-w-md">
                    <img src="${e.target.result}" alt="${file.name}" class="rounded-lg max-w-full h-auto">
                    <p class="text-xs text-white mt-2 px-2">${file.name}</p>
                </div>
                <div class="flex items-center gap-2 mt-1 mr-2">
                    <span class="text-xs text-gray-400">${currentTime}</span>
                    <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <span class="text-xs text-green-600 mt-1 mr-2 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Sent
                </span>
            `;
        } else {
            const fileIcon = getFileIcon(file.type);
            const fileSize = (file.size / 1024).toFixed(2);

            messageDiv.innerHTML = `
                <div class="bg-green-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm">
                    <div class="flex items-center gap-3">
                        ${fileIcon}
                        <div>
                            <p class="text-sm font-medium">${file.name}</p>
                            <p class="text-xs text-green-100">${fileSize} KB</p>
                        </div>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-1 mr-2">
                    <span class="text-xs text-gray-400">${currentTime}</span>
                    <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <span class="text-xs text-green-600 mt-1 mr-2 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Sent
                </span>
            `;
        }

        messagesArea.appendChild(messageDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
    } else {
        reader.readAsDataURL(file);
    }

    event.target.value = '';
}

// Get file icon based on file type
function getFileIcon(fileType) {
    if (fileType.includes('pdf')) {
        return `<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
        </svg>`;
    } else if (fileType.includes('word') || fileType.includes('document')) {
        return `<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
        </svg>`;
    } else {
        return `<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path>
        </svg>`;
    }
}

// Send message function
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex flex-col items-end max-w-2xl ml-auto';

    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });

    messageDiv.innerHTML = `
        <div class="bg-green-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-sm">
            <p class="text-sm">${messageText}</p>
        </div>
        <div class="flex items-center gap-2 mt-1 mr-2">
            <span class="text-xs text-gray-400">${currentTime}</span>
            <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
        </div>
        <span class="text-xs text-green-600 mt-1 mr-2 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            Sent
        </span>
    `;

    messagesArea.appendChild(messageDiv);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    messageInput.value = '';
}

// Event Listeners
// Sidebar events
toggleSidebarBtn.addEventListener('click', toggleSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Chat list events
toggleChatListBtn.addEventListener('click', toggleChatList);
closeChatListBtn.addEventListener('click', closeChatListFunc);
chatOverlay.addEventListener('click', closeChatListFunc);

// File upload events
attachFileBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileUpload);

// Send message events
sendMessageBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Close sidebar when clicking on sidebar menu items on mobile
const sidebarLinks = document.querySelectorAll('#mainSidebar a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    });
});

// Close chat list when clicking on chat items on mobile
const chatItems = document.querySelectorAll('#chatList > div:last-child > div');
chatItems.forEach(item => {
    item.addEventListener('click', function () {
        if (window.innerWidth < 768) {
            closeChatListFunc();
        }
    });
});

// Handle window resize
window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) {
        mainSidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    } else {
        closeSidebar();
    }
    
    if (window.innerWidth >= 768) {
        chatList.classList.remove('-translate-x-full');
        chatOverlay.classList.add('hidden');
    }
});