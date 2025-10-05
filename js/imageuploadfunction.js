// Image Upload Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const coverPhotoInput = document.getElementById('coverPhotoInput');
            const editCoverBtn = document.getElementById('editCoverBtn');
            const removeCoverBtn = document.getElementById('removeCoverBtn');
            const coverPreview = document.getElementById('coverPreview');
            const coverPlaceholder = document.getElementById('coverPlaceholder');
            const coverPhotoContainer = document.getElementById('coverPhotoContainer');

            // Open file dialog when Edit Cover Photo is clicked
            editCoverBtn.addEventListener('click', function() {
                coverPhotoInput.click();
            });

            // Handle file selection
            coverPhotoInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                
                if (file) {
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                        alert('Please select a valid image file.');
                        return;
                    }
                    
                    // Validate file size (max 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                        alert('Image size should be less than 5MB.');
                        return;
                    }
                    
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // Show the preview image
                        coverPreview.src = e.target.result;
                        coverPreview.classList.remove('hidden');
                        coverPlaceholder.classList.add('hidden');
                        
                        // Show remove button
                        removeCoverBtn.classList.remove('hidden');
                        
                        // uploadToServer(file);
                    };
                    
                    reader.readAsDataURL(file);
                }
            });

            // Handle remove cover photo
            removeCoverBtn.addEventListener('click', function() {
                // Reset the file input
                coverPhotoInput.value = '';
                
                // Hide preview and show placeholder
                coverPreview.classList.add('hidden');
                coverPlaceholder.classList.remove('hidden');
                
                // Hide remove button
                removeCoverBtn.classList.add('hidden');
                
                // removeFromServer();
            });

            // Drag and drop functionality
            coverPhotoContainer.addEventListener('dragover', function(e) {
                e.preventDefault();
                coverPhotoContainer.classList.add('border-2', 'border-blue-500', 'border-dashed');
            });

            coverPhotoContainer.addEventListener('dragleave', function(e) {
                e.preventDefault();
                coverPhotoContainer.classList.remove('border-2', 'border-blue-500', 'border-dashed');
            });

            coverPhotoContainer.addEventListener('drop', function(e) {
                e.preventDefault();
                coverPhotoContainer.classList.remove('border-2', 'border-blue-500', 'border-dashed');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    coverPhotoInput.files = files;
                    coverPhotoInput.dispatchEvent(new Event('change'));
                }
            });
        });