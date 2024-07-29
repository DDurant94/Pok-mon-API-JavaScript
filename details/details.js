const url = 'https://pokeapi.co/api/v2/pokemon/';
const displayElement = document.getElementById('display-section-details');
const searchedPokemon = document.getElementById('poke-search-details');
const hiddenSpinner = document.getElementById('poke-search-bttn-loading');
const searchBttn = document.getElementById('poke-search-bttn');
hiddenSpinner.style.display = 'none';
const movesObject = [];

// getting input
const searchForm = document.getElementById('poke-search-form-details');
searchForm.addEventListener('submit', function(event){
  event.preventDefault();
  Loading()
  if (searchedPokemon.value == ''){
    loaded()
    searchForm.reset();
    
  } else{
    contentLoader(searchedPokemon.value)
    searchForm.reset();
  }
})

// content loader/ middle man
function contentLoader(search){
  document.addEventListener('DOMContentLoaded',displayContent(search))
}

// displaying content
async function displayContent(search){
  try{
    const searchData = await apiFetch(search);
    const movesUrl = await searchData.moves.map(move => this.deeperDive(move.move.url)).join('');
    console.log(movesObject.forEach(power))
    // const typeUrl = await searchData.abilities.map(ability => deeperDive(ability.ability.url));
    // const unpackingTypeUrl = await typeUrl[0];
    // const abilityUrl = await searchData.abilities.map(ability => deeperDive(ability.ability.url));
    // const unpackingAbility = await abilityUrl;
    // const statsUrl = await searchData.stats.map(stat => deeperDive(stat.stat.url));
    // const unpackStats = await statsUrl;

    
  
    console.log(searchData);
    displayElement.innerHTML = `
      <div id="display-container" class="container-fluid-center p-4 m-2 rounded">

        <div class="text-center" id="results-title-container">

          <h2>Results</h2>

        </div>

        <div id="display-content" class="container-fluid-center row g-3">

          <section id="poke-img-section" class=" col-12 container-fluid-center">

            <div id="img-container" class="row g-5">

              <div id="poke-img-container1" class="col-6">

                <img src="${searchData.sprites.front_default}" class="img-fluid" alt="Picture of ${searchData.name}">

              </div>

              <div id="poke-img-container2" class="col-6">

                <img src="${searchData.sprites.front_shiny}" class="img-fluid" alt="Picture of ${searchData.name}">

              </div>
            
            </div>

          </section>

          <section id="poke-name-section" class="col-12 text-center">

            <div id="poke-name-container" class="row g-3">

              <h4 id="poke-name">${searchData.name}</h4>

              <div id="base-xp" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

                <h5>Base Experience:</h5>
                <p>${searchData.base_experience}</p>

              </div>

              <div id="height" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

                <h5>Height:</h5>
                <p>${searchData.height/10} meters tall</p>

              </div>

              <div id="weight" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

                <h5>Weight:</h5>
                <p>${searchData.weight/10} KG</p>

              </div>

            </div>

          </section>

          <section id="ability-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="ability-container">

              <div id="ability-title-container">

                <h3>Abilities:</h3>

              </div>

              <div id="ability-display-container">

                <ul>
                  ${searchData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                </ul>

              </div>

            </div>

          </section>

          <section id="type-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="type-container">

              <div id="type-title-container">

                <h3>Type:</h3>

              </div>

              <div id="type-display-container">

                <ul>
                  ${searchData.types.map(type => `<li>${type.type.name}</li>`).join('')}
                </ul>

              </div>

            </div>

          </section>

          <section id="stats-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="stats-container">

              <div id="stats-title-container">

                <h3>Stats:</h3>

              </div>

              <div id="stats-display-container">

                ${searchData.stats.map(stat =>`<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}

              </div>

            </div>

          </section>

          <section id="moves-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="moves-container">

              <div id="moves-title-container">

                <h3>Moves:</h3>

              </div>

              <div id="moves-display-container">

                ${searchData.moves.map((move) =>`<li>${move.move.name}:</li>`).join('')}

              </div>

            </div>

          </section>

        </div>
        
      </div> 
      `;

  } catch(err){
    console.log(err)
  }
}

// getting info from api
async function apiFetch(search){
  try{
    const response = await fetch(url+search);
    const responseData = await response.json();
    if (response){
      loaded()
      return responseData
    }
    loaded()
  } catch(err){
    console.log(err)
  }
}

// Loading API spinner
function Loading() {
  searchBttn.style.display = 'none';
  hiddenSpinner.style.display = 'block';
}

// Loaded API spinner
function loaded(){
  searchBttn.style.display = 'block';
  hiddenSpinner.style.display = 'none';
}

async function deeperDive(urlSearch){
  try{
    const apiResponse = await fetch(urlSearch);
    const apiResponseData = await apiResponse.json();
    movesObject.push(apiResponseData);
  } catch(err) {
    console.log(err)
  }
}