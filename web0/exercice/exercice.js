const selectOption = document.getElementById("mySelect");
const result = document.getElementById("result");
const buttonCurrency = document.getElementById("buttonCurrencyy");
fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(Countries =>{
        Countries.sort((a, b) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
          });
        
        for(let i=0;i<Countries.length;i++)
        {
            var option=document.createElement('option');
            option.innerHTML= Countries[i].name.common;
            document.getElementById('mySelect').appendChild(option);
        } 
    });
    selectOption.addEventListener("change",()=> {
      const selectedCountry = selectOption.value;
      buttonCurrency.innerHTML="";
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries =>
        {
        const currencies = Object.keys(countries.find(country => country.name.common === selectedCountry).currencies);
        currencies.forEach(currency=>{
          const optionCurrency = document.createElement('button');
          optionCurrency.innerHTML = currency;
          buttonCurrency.appendChild(optionCurrency);
          result.innerHTML = "";
          optionCurrency.onclick=function()
          {
            var URL='https:api.fastforex.io/fetch-multi?from=' +currency+ '&to=USD&api_key=f0b864bca5-8238c9ac75-rqf5n3';
            fetch(URL)
              .then(response => response.json())
              .then(response =>
              {
                exchangeRate=response.results.USD;
                let res = document.getElementById('result')
                res.innerHTML = '1 ' + currency + ' = ' + exchangeRate + ' USD';
                result.appendChild(res);
              })
    
          }
        })
        
         })
    
    })

        

   

      