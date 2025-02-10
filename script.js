const apiKey = 'TU_API_KEY'; // Reemplaza con tu clave de API
const apiUrl = 'https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?category=aps&keyword=air+fryer&country=ES';

const productosContainer = document.getElementById('productos');

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'amazon-product-reviews-keywords.p.rapidapi.com'
            }
        });

        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    productosContainer.innerHTML = ''; // Limpiar contenedor

    products.slice(0, 10).forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p class="price">${product.price}</p>
            <p>${product.rating} ⭐</p>
            <a href="${product.url}" target="_blank">Ver en Amazon</a>
        `;

        productosContainer.appendChild(productElement);
    });
}

// Actualizar productos cada 5 minutos
fetchProducts();
setInterval(fetchProducts, 300000); // 300000 ms = 5 minutos