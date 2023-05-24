/* ======= GET HTML ELEMENTS ========= */
const inputs = document.getElementsByClassName("inputs")[0]
const search = document.querySelector(".app__search")
const appContainer = document.querySelector(".app__container")
const footer = document.querySelector('footer')



/* ========= VARIABLES ============= */
const URL = 'https://pokeapi.co/api/v2/pokemon'
let nextData = ''
let prevData = ''

/* ========= FUNCTIONS ============= */
async function getData(url){
  const res = await window.fetch(url)
  const data = await res.json() //Lo convertimos a objeto

  nextData = data.next
  prevData = data.previous

  printPokemons(data.results)
}

function printPokemons(pokemons){
  let html = ''
  for(let pokemon of pokemons){
    window.fetch(pokemon.url)
      .then((res)=> res.json())
      .then((data)=> {
        html += `
          <div class="app__item">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="app__item--img">
            <h2 class="app__item-name">${data.name}<h2/>
          </div>
        `
        
        appContainer.innerHTML = html
       
      })
  }
}

async function printPokemon(text){
  let html = ''
  try{
    const res = await window.fetch(`${URL}/${text}`)
    const data = await res.json()
      html += `
        <div class="app__only-card">
          <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="app__item--img">
          <h2 class="app__item-name">${data.name}<h2/>
        </div>
      `
          
      appContainer.innerHTML = html
      console.log(appContainer.children.length);
  }catch(e){
    window.alert('Este pokemon no existe')
    getData(URL)
  }
}

const btnPrev = () => {
  if(!prevData){
    window.alert('Estas en la primera página')
    return
  }
  getData(prevData)
}
const btnNext = () => {
  if(!nextData){
    window.alert('No hay más pokemones')
    return 
  }
  getData(nextData)
}

getData(URL)


/* ========= LISTENERS ============= */
inputs.addEventListener('click', (e) => {
  if(e.target.classList.contains('button--prev')){
    btnPrev()
  }
  if(e.target.classList.contains('button--next')){
    btnNext()
  }
  if(e.target.classList.contains('button--initial')){
    getData(URL)
  }
})

search.addEventListener('change', () => {
  const text = search.value.toLowerCase().trim()
  
  if(appContainer)
  if(text !== ''){
    printPokemon(text)
    
  }else{
    getData(URL)
  }
})