"use strict";

const DOG_FORM = document.getElementById("dog-form");
const DOG_SELECT = document.getElementById("dog-select");
const DOG_BUTTON = document.getElementById("dog-button");
const DOG_IMG = document.getElementById("dog-img");

function fillSelect() {
  let listAllBreeds = "https://dog.ceo/api/breeds/list/all";

  fetch(listAllBreeds)
    .then((resp) => resp.json())
    .then((breedList) => {
      Object.keys(breedList.message).map((key) => {
        let option = document.createElement("option");
        let subBreedArr = breedList.message[key];
        if (subBreedArr.length === 0) {
          option.value = key;
          option.textContent =
            key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
          DOG_SELECT.append(option);
        } else {
          subBreedArr.map((breed) => {
            let mainBreed =
              key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
            let subBreed =
              breed.charAt(0).toUpperCase() + breed.slice(1).toLowerCase();
            option.value = `${key}/${breed}`;
            option.textContent = `${mainBreed} (${subBreed})`;
            DOG_SELECT.append(option);
          });
        }
      });
    });
}

fillSelect();

DOG_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  let imgObj = `https://dog.ceo/api/breed/${e.target.elements["dog-select"].value}/images/random`;
  fetch(imgObj)
      .then(resp => resp.json())
      .then(img => {
          DOG_IMG.setAttribute("src", `${img.message}`)
      })

});
