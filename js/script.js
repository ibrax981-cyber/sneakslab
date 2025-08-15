async function loadProducts() {
    const url = "https://script.google.com/macros/s/AKfycbyfyHXuHkAq2yTRkW5ZwzbHHPNvkl9VOZAsQg8WeARk387eehqztKK9JAurpqU8szXb/exec";
    try {
        const response = await fetch(url);
        const products = await response.json();
        const catalog = document.getElementById("catalog");
        products.forEach(p => {
            const item = document.createElement("div");
            item.className = "product";
            item.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>${p.price} ₽</p>
            `;
            catalog.appendChild(item);
        });
    } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
    }
}

loadProducts();
