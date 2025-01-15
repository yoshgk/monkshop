fetch('/climbing_shoes')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#shoesTable tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));