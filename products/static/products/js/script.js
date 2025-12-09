const btn = document.getElementById('hamburger');


btn.addEventListener('click', () => {
    let form = document.getElementById('myForm');
    if (form.style.display ==="none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});
