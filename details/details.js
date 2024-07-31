const url = 'https://pokeapi.co/api/v2/pokemon/';
const displayElement = document.getElementById('display-section-details');
const searchedPokemon = document.getElementById('poke-search-details');
const hiddenSpinner = document.getElementById('poke-search-bttn-loading');
const searchBttn = document.getElementById('poke-search-bttn');
hiddenSpinner.style.display = 'none';
const moveList = [];


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
    displayElement.innerHTML = `
      <div id="display-container" class="container-fluid-center p-4 m-2 rounded">

        <div class="text-center" id="results-title-container">

          <h2>Results</h2>

        </div>

        <div class="container-fluid-center" id="card-container">

          <div class="card container-fluid mb-4 shadow w-75 p-3" id="card">

            <div class="row g-1" id=" card-pics-container">

              <img src="${searchData.sprites.front_default}" style="width: 50%; height:auto;" class="img-fluid bg-dark rounded-start col-md-6 col-lg-6 p-lg-5 p-md-5" alt="Picture of ${searchData.name}">

              <img src="${searchData.sprites.front_shiny}" style="width: 50%; height:auto;" class="img-fluid bg-dark rounded-end col-md-6 col-lg-6 p-lg-5 p-md-5" alt="Picture of ${searchData.name}">

            </div>

            <div class="card-body" id="card-body">
              <h4 id="poke-name" class="text-center text-capitalize">${searchData.name}</h4>
              <div class="row g-5 rounded">

                <div id="base-xp" class="col-md-4 col-lg-4 mb-2 container-fluid-center shadow rounded object-fit-contain">

                  <h5>Base Xp:</h5>
                  <p>${searchData.base_experience}</p>
  
                </div>
  
                <div id="height" class="col-md-4 col-lg-4 mb-2 container-fluid-center shadow rounded object-fit-contain">
  
                  <h5>Height:</h5>
                  <p>${searchData.height/10} meters tall</p>
  
                </div>
  
                <div id="weight" class="col-md-4 col-lg-4 mb-2 container-fluid-center shadow rounded object-fit-contain">
  
                  <h5>Weight:</h5>
                  <p>${searchData.weight/10} KG</p>
  
                </div>

              </div>

            </div>

          </div>

        </div>

        <div class="row g-3 container-fluid-center">

          <section id="ability-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="ability-container">

              <div id="ability-title-container">

                <h3>Abilities:</h3>

              </div>

              <div id="ability-display-container">

                <ul class="text-capitalize">
                  ${searchData.abilities.map(ability => `<li id="ability-item">${ability.ability.name}</li>`).join('')}
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

                <ul class="text-capitalize">
                  ${searchData.types.map(type => `<li id="type-item">${type.type.name} ${typeDisplay(type.type.name)}</li>`).join('')}
                </ul>

              </div>

            </div>

          </section>

          <section id="stats-section" class="col-md-4 col-lg-4 container-fluid-center shadow rounded">

            <div id="stats-container">

              <div id="stats-title-container">

                <h3>Stats:</h3>

              </div>

              <div id="stats-display-container" class="text-capitalize">

                ${searchData.stats.map(stat =>`<li id="stat-item">${stat.stat.name}: ${stat.base_stat} ${statDisplay(stat.stat.name)}</li>`).join('')}

              </div>

            </div>

          </section>

          <section id="moves-section" class="col-12 container-fluid-center">

            <div class="accordion accordion-flush p-0" id="accordionFlushExample">

              <div class="accordion-item rounded">

                <h2 class="accordion-header">

                <button class="accordion-button collapsed rounded" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" id="moves-bttn">
                Moves:
                </button>
                </h2>

                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

                  <div class="accordion-body rounded-bottom" id=moves-body-container>

                    <div id="moves-container">

                      <div id="moves-display-container" class="text-capitalize row g-3">

                        ${moveList.map((move) =>`<li class="col-lg-2 col-md-4 rounded" id="moves-item">
                                                    <strong>${move.Move}:</strong>
                                                    <ul>
                                                    <li>Power: ${move.Info.Power}</li> 
                                                    <li>Accuracy: ${move.Info.Accuracy}</li> 
                                                    <li>Power Points: ${move.Info.PP}</li> 
                                                    <li>Type: ${move.Info.Type} ${typeDisplay(move.Info.Type)}</li>
                                                    </ul>
                                                  </li>`).join('')}

                      </div>

                    </div>

                  </div>
                
                </div>

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

function typeDisplay(type){
  if(type=='fire'){
    return '<i class="bi bi-fire"></i>'
  } else if(type=='flying'){
    return '<i class="bi bi-feather"></i>'
  } else if(type == 'water'){
    return '<i class="bi bi-droplet"></i>'
  } else if(type == 'dragon'){
    return '<i class="fa fa-dragon"></i>'
  }  else if(type == 'dark'){
    return '<i class="bi bi-cloud-moon"></i></i>'
  }  else if(type == 'electric'){
    return '<i class="bi bi-lightning"></i>'
  }  else if(type == 'fighting'){
    return '<i class="fas fa-fist-raised"></i>'
  }  else if(type == 'grass'){
    return '<i class="fa fa-seedling"></i>'
  }  else if(type == 'ghost'){
    return '<i class="bi bi-snapchat"></i>'
  }  else if(type == 'ground'){
    return '<i class="fas fa-mountain"></i>'
  } else if(type == 'normal'){
    return '<i class="fa fa-circle-o"></i>'
  } else if(type == 'ice'){
    return '<i class="bi bi-snow2"></i>'
  } else if(type == 'poison'){
    return '<i class="bi bi-radioactive"></i>'
  } else if(type == 'psychic'){
    return '<i class="fa fa-eye"></i>'
  } else if(type == 'rock'){
    return '<i class="fas fa-gem"></i>'
  } else if(type == 'steel'){
    return '<i class="bi bi-gear"></i>'
  } else if(type == 'fairy'){
    return '<i class="fas fa-hat-sparkles"></i>'
  } else if(type == 'bug'){
    return '<i class="fas fa-bug"></i>'
  }              

}

function statDisplay(stat){
  if(stat == 'hp'){
    return '<i class="bi bi-suit-heart"></i>'
  } else if (stat == 'attack'){
    return '<i class="bi bi-fullscreen-exit"></i>'
  } else if (stat == 'defense'){
    return '<i class="fas fa-shield"></i>'
  } else if (stat == 'special-attack'){
    return '<i class="fa fa-bullseye"></i>'
  } else if (stat == 'special-defense'){
    return '<i class="fas fa-shield-alt"></i>'
  } else if (stat == 'speed'){
    return '<i class="bi bi-speedometer"></i>'
  }
}

// getting info from api
async function apiFetch(search){
  try{
    const response1 = await fetch(url+search);
    const responseData1 = await response1.json();

// moves loop
    for(let i = 0; i < responseData1.moves.length; i++){
      const url1 = responseData1.moves[i].move.url;
      const response2 = await fetch(url1);
      const responseData2 = await response2.json();
      const moveInfo = {
        'Move': responseData1.moves[i].move.name,
        'Info':{
          'Power': responseData2.power,
          'Accuracy': responseData2.accuracy,
          'PP':responseData2.pp,
          'Type': responseData2.type.name
        }
      }
      moveList.push(moveInfo)
    }

    if (response1){
      searchForm.classList.remove('was-validated');
      loaded()
      return responseData1
    }
  } catch(error){
    loaded()
    document.getElementById('invalid-feedback').innerHTML=`
    <div id="display-container" class="container-fluid-center p-4 m-2 rounded">

      <div id=error-message>

        <p>
          <strong>We could not find '${search}' please try again!</strong>
        </p>
    
      </div>

    </div>`
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