//
// Initialize game
//
function init() {
  getListPokemon();
}

//
// Get the Pokemon list
//
function getListPokemon() {
  try {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150&offset=1")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        for (const pokemon of myJson.results) {
          getPokemonInfo(pokemon.url);
        }
      });
  } catch (error) {
    console.error(error);
  }
}

//
// Get information about a pokemon
//
function getPokemonInfo(url) {
  try {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log(info);

        const pokemonInfo = {
          name: info.name,
          img: info.sprites.other["official-artwork"].front_default,
          height: info.height,
          weight: info.weight,
          hp: info.stats[0].base_stat,
          attack: info.stats[1].base_stat,
          defense: info.stats[2].base_stat,
          speed: info.stats[4].base_stat,
        };

        createPokemonCard(pokemonInfo);
      });
  } catch (error) {
    console.error(error);
  }
}

//
// Create a Pokemon card
//
function createPokemonCard(info) {
  const $$gallery = window.document.querySelector("#gallery");

  const $$item = document.createElement("div");
  $$item.className = "gallery__item";

  const $$title = document.createElement("div");
  $$title.className = "gallery__title";

  const $$name = document.createElement("div");
  $$name.className = "gallery__name";
  $$name.textContent = info.name.toUpperCase();

  const $$hp = document.createElement("div");
  $$hp.className = "gallery__hp";
  $$hp.textContent = info.hp + " HP";

  $$title.appendChild($$name);
  $$title.appendChild($$hp);
  $$item.appendChild($$title);

  const $$cell = document.createElement("div");
  $$cell.className = "gallery__cell";

  const $$img = document.createElement("img");
  $$img.className = "gallery__img";
  $$img.src = info.img;

  $$cell.appendChild($$img);
  $$item.appendChild($$cell);

  const $$footer = document.createElement("div");
  $$footer.className = "gallery__footer";

  const $$info1 = document.createElement("div");
  $$info1.className = "gallery__info";
  $$info1.innerHTML =
    "<span><b>Attack</b></span><span class='gallery__attack'>" +
    info.attack +
    "</span>";

  const $$info2 = document.createElement("div");
  $$info2.className = "gallery__info";
  $$info2.innerHTML =
    "<span><b>Defense</b></span><span class='gallery__defense'>" +
    info.defense +
    "</span>";

  const $$info3 = document.createElement("div");
  $$info3.className = "gallery__info";
  $$info3.innerHTML =
    "<span><b>Speed</b></span><span class='gallery__speed'>" +
    info.speed +
    "</span>";

  $$footer.appendChild($$info1);
  $$footer.appendChild($$info2);
  $$footer.appendChild($$info3);
  $$item.appendChild($$footer);
  $$gallery.appendChild($$item);
}

//
// Capitalize a string
//
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = () => {
  console.log("Onload");
  init();
};
