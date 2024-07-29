// const url = 'https://pokeapi.co/api/v2/pokemon/';
// const displayElement = document.getElementById('display-section');
// const searchedPokemon = document.getElementById('poke-search');
// const hiddenSpinner = document.getElementById('poke-search-bttn-loading');
// const searchBttn = document.getElementById('poke-search-bttn');
// hiddenSpinner.style.display = 'none';

// // getting input
// const searchForm = document.getElementById('poke-search-form-search');
// searchForm.addEventListener('submit', function(event){
//   event.preventDefault();
//   Loading()
//   if (searchedPokemon.value == ''){
//     loaded()
//     searchForm.reset();
    
//   } else{
//     contentLoader(searchedPokemon.value)
//     searchForm.reset();
//   }
// })

// // content loader/ middle man
// function contentLoader(search){
//   document.addEventListener('DOMContentLoaded',displayContent(search))
// }

// // displaying content
// async function displayContent(search){
//   try{
//     const searchData = await apiFetch(search);
//     displayElement.innerHTML = ``;

//   } catch(err){
//     console.log(err)
//   }
// }
// // <img src="${searchData.sprites.front_default}">
// // getting info from api
// async function apiFetch(search){
//   try{
//     const response = await fetch(url+search);
//     const responseData = await response.json();
//     if (response){
//       loaded()
//       return responseData
//     }
//     loaded()
//   } catch(err){
//     console.log(err)
//   }
// }

// // Loading API spinner
// function Loading() {
//   searchBttn.style.display = 'none';
//   hiddenSpinner.style.display = 'block';
// }

// // Loaded API spinner
// function loaded(){
//   searchBttn.style.display = 'block';
//   hiddenSpinner.style.display = 'none';
// }
// validation Script
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
