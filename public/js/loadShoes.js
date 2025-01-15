async function loadShoes() {
    try {
        const response = await fetch('/climbing_shoes');
        const shoes = await response.json();
        const filters = getFilterValues();
        const filteredShoes = filterShoes(shoes, filters);
        displayShoes(filteredShoes);
        return filteredShoes;
    } catch (error) {
        console.error('Error loading shoes:', error);
        throw error;
    }
}
// to display the shoes from the database
function displayShoes(shoes) {
    const container = document.getElementById('shoe-container');
    if (container) {
        container.innerHTML = ''; 
        shoes.forEach(shoe => {
            const tile = document.createElement('section');
            tile.classList.add('shoe-tile');
            tile.innerHTML = `
                <div class="experience-tile-${shoe.climbinglevel.toLowerCase()}" id="shoe_level">${shoe.climbinglevel}</div>
                <div class="img-prev"><img src="${shoe.image}" id="shoe_image"></div>
                <h1 id="shoe_name">${shoe.name}</h1>
                <h2 id="shoe_brand">${shoe.brand}</h2>
                <h3 id="shoe_price">€${shoe.price}</h3>
            `;
            tile.addEventListener('click', () => {
                localStorage.setItem('selectedShoe', JSON.stringify(shoe));
                window.location.href = 'shoepage.html';
            });
            container.appendChild(tile);
        });
    }
}
//this is to display the sizes from 4 to 49 without having to write them all out individually in index.html
function generateSizeBoxes() {
    const sizesFilter = document.querySelector('.sizes-filter');
    if (sizesFilter) {
        for (let size = 4; size <= 49; size++) {
            const sizeBox = document.createElement('div');
            sizeBox.classList.add('size-box');
            sizeBox.textContent = size;
            sizesFilter.appendChild(sizeBox);
        }
    }
}
//filtering system
function getFilterValues() {
    const filters = {
        aggressiveness: [],
        closure: [],
        rubber: [],
        vegan: [],
        footShape: [],
        brand: [],
        sizes: [],
        colors: []
    };

    if (document.getElementById('none').checked) filters.aggressiveness.push('none');
    if (document.getElementById('light').checked) filters.aggressiveness.push('light');
    if (document.getElementById('aggressive').checked) filters.aggressiveness.push('aggressive');

    if (document.getElementById('closure-velcro').checked) filters.closure.push('velcro');
    if (document.getElementById('slippers').checked) filters.closure.push('slippers');

    if (document.getElementById('vibramXsGrip2').checked) filters.rubber.push('Vibram XS Grip 2');
    if (document.getElementById('stealthC4Rubber').checked) filters.rubber.push('Stealth C4-Rubber');
    if (document.getElementById('realHonor').checked) filters.rubber.push('Real Honor');
    if (document.getElementById('realSupreme').checked) filters.rubber.push('Real Supreme');
    if (document.getElementById('scarpaVision').checked) filters.rubber.push('Scarpa Vision');
    if (document.getElementById('frixionBlack').checked) filters.rubber.push('FriXion Black');
    if (document.getElementById('zenithQuattro').checked) filters.rubber.push('Zenith Quattro');
    if (document.getElementById('vibramXsEdge').checked) filters.rubber.push('Vibram XS Edge');

    if (document.getElementById('yes').checked) filters.vegan.push('yes');
    if (document.getElementById('no').checked) filters.vegan.push('no');

    if (document.getElementById('narrow').checked) filters.footShape.push('narrow');
    if (document.getElementById('normal').checked) filters.footShape.push('normal');
    if (document.getElementById('wide').checked) filters.footShape.push('wide');

    if (document.getElementById('scarpa').checked) filters.brand.push('Scarpa');
    if (document.getElementById('laSportiva').checked) filters.brand.push('La Sportiva');
    if (document.getElementById('unparallel').checked) filters.brand.push('Unparallel');
    if (document.getElementById('fiveTen').checked) filters.brand.push('Five Ten');
    if (document.getElementById('boreal').checked) filters.brand.push('Boreal');

    document.querySelectorAll('.sizes-filter .size-box').forEach(sizeBox => {
        if (sizeBox.classList.contains('selected')) {
            filters.sizes.push(sizeBox.textContent);
        }
    });

    document.querySelectorAll('.color-options a').forEach(color => {
        if (color.classList.contains('selected')) {
            filters.colors.push(color.id);
        }
    });

    return filters;
}

function filterShoes(shoes, filters) {
    return shoes.filter(shoe => {
        const matchesAggressiveness = filters.aggressiveness.length === 0 || filters.aggressiveness.includes(shoe.aggressive);
        const matchesClosure = filters.closure.length === 0 || filters.closure.includes(shoe.closure);
        const matchesRubber = filters.rubber.length === 0 || filters.rubber.some(rubber => shoe.rubber.split(', ').includes(rubber));
        const matchesVegan = filters.vegan.length === 0 || filters.vegan.includes(shoe.vegan);
        const matchesFootShape = filters.footShape.length === 0 || filters.footShape.includes(shoe.fit);
        const matchesBrand = filters.brand.length === 0 || filters.brand.includes(shoe.brand);
        const matchesSizes = filters.sizes.length === 0 || filters.sizes.some(size => shoe.sizes.split(', ').includes(size));
        const matchesColors = filters.colors.length === 0 || filters.colors.some(color => shoe.color.split(', ').includes(color));

        return matchesAggressiveness && matchesClosure && matchesRubber && matchesVegan && matchesFootShape && matchesBrand && matchesSizes && matchesColors;
    });
}

//brings to specific shoe page
function displaySelectedShoe() {
    if (window.location.pathname.includes('shoepage.html')) {
        const shoe = JSON.parse(localStorage.getItem('selectedShoe'));
        if (shoe) {
            document.querySelector('.shoe-information-upper img').src = shoe.image;
            document.querySelector('.shoe-information-upper h1').textContent = shoe.name;
            document.querySelector('.shoe-information-upper h2').textContent = shoe.brand;
            document.querySelector('.shoe-information-upper h3').textContent = `€${shoe.price}`;
            // reusable description template
            document.querySelector('.shoe-information-text p').textContent = `${shoe.name} by ${shoe.brand} is designed for climbers who seek ${shoe.climbinglevel}-level 
            performance. This shoe is perfect for ${shoe.fit} feet and caters to ${shoe.shape} shape(s), providing a tailored and secure fit.
            
            The ${shoe.closure} ensures a customizable and snug fit, while the ${shoe.rubber} delivers exceptional grip and durability for reliable 
            performance on any surface.`;

            const sizesFilter = document.querySelector('.sizes-filter');
            if (sizesFilter) {
                sizesFilter.innerHTML = ''; // Clear existing sizes
                shoe.sizes.split(',').forEach(size => {
                    const sizeBox = document.createElement('div');
                    sizeBox.classList.add('size-box');
                    sizeBox.textContent = size.trim();
                    sizeBox.addEventListener('click', () => {
                        document.querySelectorAll('.sizes-filter .size-box').forEach(box => box.classList.remove('selected'));
                        sizeBox.classList.add('selected');
                    });
                    sizesFilter.appendChild(sizeBox);
                });
            }
        }
    }
}

//dropdown menu for the filters
function toggleDropdown(id, element) {
    const content = document.getElementById(id);
    const icon = element.querySelector('.dropdown-icon');
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        icon.classList.add('rotated');
    } else {
        content.style.display = "none";
        icon.classList.remove('rotated');
    }
}

document.querySelectorAll('.checkbox-layout input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', loadShoes);
});

document.addEventListener('DOMContentLoaded', () => {
    generateSizeBoxes();
    document.querySelectorAll('.sizes-filter .size-box').forEach(sizeBox => {
        sizeBox.addEventListener('click', () => {
            sizeBox.classList.toggle('selected');
            loadShoes();
        });
    });
    document.querySelectorAll('.color-options a').forEach(color => {
        color.addEventListener('click', (event) => {
            event.preventDefault();
            color.classList.toggle('selected');
            loadShoes();
        });
    });
    loadShoes();
    displaySelectedShoe();
});
