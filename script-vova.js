document.addEventListener('DOMContentLoaded', function () {
  const uploadBtn = document.getElementById('uploadBtn');
  const imageInput = document.getElementById('imageInput');
  const preview = document.getElementById('preview');

  uploadBtn.addEventListener('click', () => {
    imageInput.click();
  });

  imageInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Зображення" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;" />`;
        preview.dataset.image = e.target.result; 
      };
      reader.readAsDataURL(file);
    } else {
      preview.innerText = "Зображення не вибрано";
      delete preview.dataset.image;
    }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener('click', function () {
    const title = document.querySelector('.recept-input').value.trim();
    const about = document.querySelectorAll('.recept-text')[0].value.trim();
    const description = document.querySelectorAll('.recept-text')[1].value.trim();
    const ingredients = document.querySelectorAll('.recept-text')[2].value.trim();
    const image = document.getElementById('preview').dataset.image || "Немає зображення";

    if (!title || !about || !description || !ingredients) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }

    const recipe = {
      title,
      about,
      description,
      ingredients,
      image
    };

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

  });
});


document.addEventListener('DOMContentLoaded', function () {
  const submitBtn = document.getElementById('submit');

  submitBtn.addEventListener('click', function () {
    const title = document.querySelector('.recept-input').value.trim();

    if (title) {
      sessionStorage.setItem('lastRecipeName', title);
      console.log("📌 Збережено в sessionStorage:", title);
    }
  });
});
