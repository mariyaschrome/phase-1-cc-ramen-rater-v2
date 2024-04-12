// index.js
document.addEventListener("DOMContentLoaded", function () {
  main();
});
// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML = `
  <img src="${ramen.image}" alt="${ramen.name}" />
  <h2>${ramen.name}</h2>
  <p>${ramen.comment}</p>
  <p>Rating: ${ramen.rating}</p>
  `;
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('new-name').value;
    const image = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const ramen = { name, image, rating, comment };
    displayNewRamen(ramen);
  });
};

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = '';

    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  })
  .catch(error => {
    console.error('Error fetching  ramens:', error);
  });
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
