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
                        let price = 0;
                        const HTML = cart.courses
                            .map(c => {
                                price += +c.price * +c.current;
                                return `
                                        <tbody>
                                        <tr>
                                            <th>${c.title}</th>
                                            <th>${c.current}</th>
                                            <th>${c.price}</th>
                                            <th>
                                                <button class="btn btn-danger remove" data-id="${c._id}">Удалить</button>
                                            </th>
                                        </tr>
                                        </tbody>
                                        `;
                            })
                            .join("");

                        console.log(price);
                        document.querySelector("tbody").innerHTML = HTML;
                        document.querySelector(
                            "#price"
                        ).innerText = `${toCurrency(price)}`;
                    } else {
                        $cart.innerHTML = "<p>Корзина пуста</p>";
                    }
                });
        }
    });
} else {
}
