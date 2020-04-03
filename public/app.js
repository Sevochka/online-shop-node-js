const toCurrency = price => {
    return new Intl.NumberFormat("ru-RU", {
        currency: "rub",
        style: "currency"
    }).format(price);
};

document.querySelectorAll("#price").forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const $cart = document.querySelector("#cart");
if ($cart) {
    $cart.addEventListener("click", event => {
        if (event.target.classList.contains("remove")) {
            const id = event.target.dataset.id;
            fetch("/cart/remove/" + id, {
                method: "delete"
            })
                .then(res => res.json())
                .then(cart => {
                    if (cart.courses.length) {
                        const HTML = cart.courses
                            .map(c => {
                                console.log(c);
                                
                                return `
                                        <tbody>
                                        <tr>
                                            <th>${c.title}</th>
                                            <th>${c.current}</th>
                                            <th>${c.price}</th>
                                            <th>
                                                <button class="btn btn-danger remove" data-id="${c.id}">Удалить</button>
                                            </th>
                                        </tr>
                                        </tbody>
                                        `;
                            })
                            .join("");

                        document.querySelector("tbody").innerHTML = HTML;
                        document.querySelector(
                            "#price"
                        ).innerText = `${toCurrency(cart.price)}`;
                    } else {
                        $cart.innerHTML = "<p>Корзина пуста</p>";
                    }
                });
        }
    });
} else {
}
