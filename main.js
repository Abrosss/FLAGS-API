let countries = []



    
    fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      countries = data
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
  
      countries.forEach(country => {
        htmlFlags(country)})})

        
        function htmlFlags(country) {
          document.body.height='100%'
          const flags = document.querySelector('#flags')
          const flagContainer = document.createElement('section')
          const flagImageContainer = document.createElement('div')
          const countryContainer = document.createElement('div')
          const countryName = document.createElement('h4')
          const detailsContainer = document.createElement('div')
          const population = document.createElement('span')
          const region = document.createElement('span')
          const capital = document.createElement('span')
          flagImageContainer.dataset.name = country.name.official
          let nameId = country.name.common.replace(/\s+/g, '');
          flagContainer.id= nameId
          countryName.innerText = country.name.common
          population.innerHTML = `Population: <span class="smallDetail">${country.population}</span>`
          region.innerHTML = `Region: <span class="smallDetail">${country.region}</span>`
          capital.innerHTML = `Capital: <span class="smallDetail">${country.capital}</span>`
          flagContainer.classList.add('flagContainer')
          flagImageContainer.classList.add('flag')
          countryContainer.classList.add('country')
          flagImageContainer.style.backgroundImage=`url(${country.flags.svg})`
          countryContainer.appendChild(countryName)
          countryContainer.appendChild(detailsContainer)
          detailsContainer.appendChild(population)
          detailsContainer.appendChild(region)
          detailsContainer.appendChild(capital)
          flagContainer.appendChild(flagImageContainer)
          flagContainer.appendChild(countryContainer)
          flags.appendChild(flagContainer)

          flagContainer.addEventListener('click', openCountry)
        }
        function openCountry(e) {
          window.location.href= '#' + e.target.dataset.name
          document.querySelector('#borders').innerHTML=''
          const flags = document.querySelector('#flags')
          const searchContainer = document.querySelector('.searchContainer')
          const flagDetails = document.querySelector('#flagDetails')
          const name = e.target.dataset.name
          const countryName = document.querySelector('.countryName')
          const countryDetails = document.querySelector('.countryDetails')
          
      fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => response.json())
      .then(data => {
       
       let country = data[0]
       console.log(country)
       document.querySelector('#flagCountry').style.backgroundImage=`url(${country.flags.svg})`
      
       flags.style.display='none'
      searchContainer.style.display='none'
      flagDetails.style.display='flex'
      
      countryName.innerText = country.name.common
      let native = country.name.nativeName
      const nativeName = native[Object.keys(native)[0]].common
      
      countryDetails.innerHTML = `<div><span>Native Name: <span class="smallDetail">${nativeName || country.name.nativeName}</span></span><span>Population: <span class="smallDetail">${country.population}</span></span><span>Region: <span class="smallDetail">${country.region}</span> </span><span>Sub Region: <span class="smallDetail">${country.subregion}</span></span><span>Capital: <span class="smallDetail">${country.capital[0]}</span></span></div><div><span>Top Level Domain: <span class="smallDetail">${country.tld[0]}</span></span><span>Currencies: <span class="smallDetail">${country.currencies[Object.keys(country.currencies)].name}</span></span><span>Languages: <span class="smallDetail">${Object.values(country.languages).join(',')}</span></span></div>`
      const span = document.createElement('span')
      
      document.querySelector('#borders').appendChild(span)
      country.borders.forEach(elem => {
        if(elem)
        {
          span.innerText='Border countries:'
        countries.forEach(country => {
          if(country.fifa==elem) {
         
           
            const border = document.createElement('a')
            border.classList.add('border')
            border.dataset.name = country.name.common 
            border.innerText=country.name.common 
            border.addEventListener('click', openCountry)
            document.querySelector('#borders').appendChild(border)
          
          }
         
          
        })
      }
      else span.innerText=''
       
        
       
       
      })
      document.querySelector('#backButton').addEventListener('click', () => {
        document.querySelector('#backButton').href = '#' + country.name.common
        flags.style.display='grid'
      searchContainer.style.display='flex'
      flagDetails.style.display='none'
      document.body.style.height='100%'
      })
        })
      
      .catch(err => {if(err) console.log(err)})
        }

        //filter
        (function() {
          const options = document.querySelectorAll('.option')
          const menudropdown = document.querySelector('#dropdownMenu')
          const dropdown = document.querySelector('#dropdown')
          menudropdown.addEventListener('click', () => dropdown.classList.toggle('show'))
  
      options.forEach(option => option.addEventListener('click', filterCountries
))

  function filterCountries(e) {
  document.querySelector('#dropdownMenu span').innerText = e.target.innerText
  const flags = document.querySelector('#flags')
  fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
      countries = data
      flags.innerHTML=''
      const filtered = countries.filter(country => country.region==e.target.innerText);
      filtered.forEach(country => htmlFlags(country) )
     
    

  
  
  })
  }
  //close dropdown on outside
  window.onclick = function(event) {
    if (!event.target.matches('.dropdownButton')) {
      var dropdowns = document.getElementsByClassName("dropdownList");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
        })();




//search
  (function() {
    document.querySelector('#search').addEventListener('input', (e) => {
 
      let names = document.querySelectorAll(('[data-name]'))
      fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        let countries = data
        names.forEach(name => {
          if(name.dataset.name.toLowerCase().includes(e.target.value.toLowerCase())){
            name.parentNode.style.display='block'
          }
          else name.parentNode.style.display='none'
        })
        
       
      })
    } )
  })();
//clear input

  (function() {
    document.querySelector('#clearButton').addEventListener('click', () => {
      if(  document.querySelector('#search').value !=='') {
      document.querySelector('#search').value=''
      document.querySelector('#flags').innerHTML=''
      countries.forEach(country => {
        htmlFlags(country)
      })
    }
    })
  })();
  //darkmode
(function() {
  var darkModeToggle = document.querySelector('#darkmode')
  darkModeToggle.addEventListener('click', function () {
    darkMode = localStorage.getItem('darkMode');

    if (darkMode !== 'enabled') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

  });
  var enableDarkMode = function enableDarkMode() {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
  };

  var disableDarkMode = function disableDarkMode() {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
  };
})()







 
