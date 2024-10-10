// Handle reservation form submission
document.getElementById('reservation-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const reservationData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value
    };

    const confirmation = confirm(`Confirm Reservation:
    Name: ${reservationData.name}
    Date: ${reservationData.date}
    Time: ${reservationData.time}
    People: ${reservationData.people}`);

    if (!confirmation) return; // If user cancels, stop submission

    // Send reservation data to the server
    await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    });

    // Reset the form and show success message
    this.reset();
    alert('Reservation made successfully!');
});

// Fetch menu items from the server and display them
async function fetchMenu() {
    const menuDiv = document.getElementById('menu-items');
    const spinner = document.getElementById('loading-spinner');

    spinner.style.display = 'block'; // Show spinner
    menuDiv.innerHTML = ''; // Clear any previous content

    try {
        const response = await fetch('http://localhost:5000/api/menu');
        const menuItems = await response.json();

        menuItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <img src="${item.image}" alt="${item.name}" style="width:150px; height:auto;">
            `;
            menuDiv.appendChild(itemDiv);
        });
    } catch (error) {
        menuDiv.innerHTML = '<p>Error loading menu items. Please try again later.</p>';
    } finally {
        spinner.style.display = 'none'; // Hide spinner once done
    }
}

fetchMenu(); // Call the function to load menu items
