const answers = {};

function storeAnswer(page, value) {
    let answers = JSON.parse(localStorage.getItem('answers')) || {};
    answers[page] = value;
    localStorage.setItem('answers', JSON.stringify(answers));
    console.log(`Stored answer for ${page}: ${value}`);
}

async function fetchShoes() {
    try {
        const response = await fetch('/climbing_shoes');
        return await response.json();
    } catch (error) {
        console.error('Error fetching shoes:', error);
        return [];
    }
}

function filterMatchingShoes(shoes, answers) {
    return shoes.filter(shoe => {
        const matchesSize = shoe.sizes.split(',').map(s => s.trim()).includes(answers.shoeguide01);
        const matchesWidth = shoe.fit === answers.shoeguide02;
        const matchesShape = shoe.shape.split(',').map(s => s.trim()).includes(answers.shoeguide03);
        const matchesBrand = shoe.brand === answers.shoeguide04;
        const matchesExperience = shoe.climbinglevel === answers.shoeguide05;

        return matchesSize && matchesWidth && matchesShape && matchesBrand && matchesExperience;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    //this is to store the answer from shoeguide01
    const shoeSizeForm = document.querySelector('.shoe-size-form');
    if (shoeSizeForm) {
        shoeSizeForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const shoeSize = document.getElementById('shoe-size').value.trim();
            const errorMessage = document.getElementById('error-message');
            if (shoeSize === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                storeAnswer('shoeguide01', shoeSize);
                window.location.href = 'shoeguide02.html';
            }
        });
    }

    //for shoeguide02
    if (window.location.pathname.includes('shoeguide02.html')) {
        document.querySelectorAll('.shoe-guide-buttons a').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                storeAnswer('shoeguide02', value);
            });
        });
    }

    //for shoeguide03
    if (window.location.pathname.includes('shoeguide03.html')) {
        document.querySelectorAll('.shoe-guide-buttons a').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                storeAnswer('shoeguide03', value);
            });
        });
    }

    //for shoeguide04
    if (window.location.pathname.includes('shoeguide04.html')) {
        document.querySelectorAll('.shoe-guide-buttons a').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                storeAnswer('shoeguide04', value);
            });
        });
    }

    //and for shoeguide05
    if (window.location.pathname.includes('shoeguide05.html')) {
        document.querySelectorAll('.shoe-guide-buttons a').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                storeAnswer('shoeguide05', value);
            });
        });
    }

    //displays image and name of recommended shoes
    if (window.location.pathname.includes('recommend.html')) {
        const answers = JSON.parse(localStorage.getItem('answers')) || {};
        console.log('Collected answers:', answers);

        const shoes = await fetchShoes();
        const matchingShoes = filterMatchingShoes(shoes, answers);

        const shoeRecommendSection = document.getElementById('recommended-shoe-container');
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');

        if (matchingShoes.length > 0) {
            shoeRecommendSection.innerHTML = matchingShoes.map((shoe, index) => `
                <div class="recommended-shoe-item ${index === 0 ? 'active' : ''}" data-shoe='${JSON.stringify(shoe)}'>
                    <img src="${shoe.image}">
                    <h1>${shoe.name}</h1>
                    <p>${shoe.brand}</p>
                </div>
            `).join('');

            let currentIndex = 0;

            // this is to rotate through the shoes if there are more than one
            function updateShoeDisplay(index) {
                const items = document.querySelectorAll('.recommended-shoe-item');
                items.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
            }

            leftArrow.style.display = matchingShoes.length > 1 ? 'block' : 'none';
            rightArrow.style.display = matchingShoes.length > 1 ? 'block' : 'none';

            leftArrow.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + matchingShoes.length) % matchingShoes.length;
                updateShoeDisplay(currentIndex);
            });

            rightArrow.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % matchingShoes.length;
                updateShoeDisplay(currentIndex);
            });
            // redirect to shoepage html
            document.querySelectorAll('.recommended-shoe-item').forEach(item => {
                item.addEventListener('click', () => {
                    const shoe = JSON.parse(item.getAttribute('data-shoe'));
                    localStorage.setItem('selectedShoe', JSON.stringify(shoe));
                    window.location.href = 'shoepage.html';
                });
            });
        } else {
            shoeRecommendSection.innerHTML = '<p>No matching shoes found.</p>';
        }
    }
});
