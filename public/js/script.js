const dynamicWord = document.getElementById('dynamic-word');
        const navbarItems = document.querySelectorAll('.navbar-items li');

        navbarItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                dynamicWord.textContent = item.getAttribute('data-word');
            });
            item.addEventListener('mouseout', () => {
                dynamicWord.textContent = 'CLIMBING';
            });
        });