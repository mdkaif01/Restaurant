// Handle reservation form submission
document.getElementById('reservation-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const reservationData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value
    };

    // Set modal details for confirmation
    document.getElementById('modal-details').innerText = `
        Name: ${reservationData.name}
        Date: ${reservationData.date}
        Time: ${reservationData.time}
        People: ${reservationData.people}`;
    document.getElementById('modal').style.display = 'block';
});

// Confirm reservation
document.getElementById('confirm-button').onclick = async function() {
    const reservationData = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value
    };

    // Send reservation data to the server
    await fetch('https://restaurant-hrn9.onrender.com/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
    });

    // Reset the form and show success message
    document.getElementById('reservation-form').reset();
    alert('Reservation made successfully!');
    document.getElementById('modal').style.display = 'none';
};

// Cancel reservation
document.getElementById('cancel-button').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Close modal
document.getElementById('close-modal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
};

// Fetch menu items from the server and display them
async function fetchMenu() {
    const menuDiv = document.getElementById('menu-items');
    const spinner = document.getElementById('loading-spinner');

    spinner.style.display = 'block'; // Show spinner
    menuDiv.innerHTML = ''; // Clear any previous content

    try {
        const response = await fetch('https://restaurant-hrn9.onrender.com/api/menu');
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
        menuDiv.innerHTML = '<p>Error loading menu items. Please check your connection and try again later.</p>';
        console.error('Error fetching menu:', error); // Log error for debugging
    } finally {
        spinner.style.display = 'none'; // Hide spinner once done
    }
}

fetchMenu(); // Call the function to load menu items
