document.addEventListener("DOMContentLoaded", main);

const ramens = [
    {
        name: "Shoyu Ramen",
        restaurant: "Ichiran",
        image: "Ramen/shoyu.jpeg",
        rating: 5,
        comment: "Best broth ever!"
    },
    {
        name: "Tonkotsu Ramen",
        restaurant: "Ippudo",
        image: "Ramen/tonkotsu.jpeg",
        rating: 4,
        comment: "Rich and creamy!"
    },
    {
        name: "Miso Ramen",
        restaurant: "Santouka",
        image: "Ramen/miso.jpg",
        rating: 5,
        comment: "Love the umami flavor!"
    }
];

function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = "";

    ramens.forEach((ramen, index) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.index = index;
        img.addEventListener("click", () => handleClick(ramen));
        ramenMenu.appendChild(img);
    });

    if (ramens.length > 0) {
        handleClick(ramens[0]);
    }
}

function handleClick(ramen) {
    document.getElementById("ramen-name").textContent = ramen.name;
    document.getElementById("ramen-restaurant").textContent = ramen.restaurant;
    document.getElementById("ramen-img").src = ramen.image;
    document.getElementById("rating").value = ramen.rating;
    document.getElementById("comment").value = ramen.comment;
}

function addSubmitListener() {
    document.getElementById("new-ramen-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const newRamen = {
            name: event.target.name.value,
            restaurant: event.target.restaurant.value,
            image: event.target.image.value,
            rating: event.target.rating.value,
            comment: event.target.comment.value
        };

        ramens.push(newRamen);
        displayRamens();
        event.target.reset();
    });
}

function addEditListener() {
    document.getElementById("update-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const updatedRating = document.getElementById("rating").value;
        const updatedComment = document.getElementById("comment").value;
        const currentImgSrc = document.getElementById("ramen-img").src;

        const selectedRamen = ramens.find(r => currentImgSrc.includes(r.image));

        if (selectedRamen) {
            selectedRamen.rating = updatedRating;
            selectedRamen.comment = updatedComment;
            displayRamens();
        }
    });
}

function addDeleteListener() {
    document.getElementById("delete-btn").addEventListener("click", () => {
        const currentImgSrc = document.getElementById("ramen-img").src;
        const index = ramens.findIndex(r => currentImgSrc.includes(r.image));

        if (index !== -1) {
            ramens.splice(index, 1);
            displayRamens();
        }
    });
}

function main() {
    displayRamens();
    addSubmitListener();
    addEditListener();
    addDeleteListener();
}
