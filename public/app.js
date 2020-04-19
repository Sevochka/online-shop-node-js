const toCurrency = (price) => {
    return new Intl.NumberFormat("ru-RU", {
        currency: "rub",
        style: "currency",
    }).format(price);
};

document.querySelectorAll("#price").forEach((node) => {
    node.textContent = toCurrency(node.textContent);
});

////

////

//stackoverflow
const toDate = (date) => {
    return new Intl.DateTimeFormat("ri-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(new Date(date));
};

document.querySelectorAll(".date").forEach((node) => {
    node.textContent = toDate(node.textContent);
});

const $cart = document.querySelector("#cart");
if ($cart) {
    $cart.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove")) {
            const id = event.target.dataset.id;
            const csrfToken = event.target.dataset.csrf;
            fetch("/cart/remove/" + id, {
                method: "delete",
                headers: {
                    "X-XSRF-TOKEN": csrfToken,
                },
            })
                .then((res) => res.json())
                .then((cart) => {
                    if (cart.courses.length) {
                        let price = 0;
                        const HTML = cart.courses
                            .map((c) => {
                                price += +c.price * +c.current;
                                return `
                                        <tbody>
                                        <tr>
                                            <th>${c.title}</th>
                                            <th>${c.current}</th>
                                            <th>${c.price}</th>
                                            <th>
                                                <button class="button is-danger remove remove" data-id="${c._id}" data-csrf="${csrfToken}">
                                                    Удалить
                                                </button>
                                                <button class="button is-primary add" type="submit" data-id="${c._id}" data-csrf="${csrfToken}">
                                                    Добавить
                                                </button>
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
                        $cart.innerHTML =
                            "<h1 class='container mt-3'>Корзина пуста</h1>";
                    }
                });
        }
    });

    $cart.addEventListener("click", (event) => {
        if (event.target.classList.contains("add")) {
            const id = event.target.dataset.id;
            const csrfToken = event.target.dataset.csrf;
            fetch("/cart/add/" + id, {
                method: "post",
                headers: {
                    "X-XSRF-TOKEN": csrfToken,
                },
            })
                .then((res) => res.json())
                .then((cart) => {
                    if (cart.courses.length) {
                        let price = 0;
                        const HTML = cart.courses
                            .map((c) => {
                                price += +c.price * +c.current;
                                return `
                                        <tbody>
                                        <tr>
                                            <th>${c.title}</th>
                                            <th>${c.current}</th>
                                            <th>${c.price}</th>
                                            <th>
                                                <button class="button is-danger remove remove" data-id="${c._id}" data-csrf="${csrfToken}">
                                                    Удалить
                                                </button>
                                                <button class="button is-primary add" type="submit" data-id="${c._id}" data-csrf="${csrfToken}">
                                                    Добавить
                                                </button>
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
                        $cart.innerHTML =
                            "<h1 class='container mt-3'>Корзина пуста</h1>";
                    }
                });
        }
    });
} else {
}

document.querySelector('.file-input').addEventListener('change', (event) => {
    console.log(event.target.files[0].name);
    document.querySelector('.file-name').innerText = event.target.files[0].name;
})