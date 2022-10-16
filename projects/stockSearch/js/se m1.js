
const SE_CS_URL = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=";
const button = document.getElementById("submit");
const apiAddonEnd = "&limit=10&exchange=NASDAQ";
const input = document.getElementById("inputL");
const output = document.getElementById("output");
const spinnerOn2 = document.getElementById("spinner2");
const linkAddon = "/projects/stockSearch/html/company.html?symbol="

button.addEventListener("click", (inputValue));

function inputValue() {
  let a = input.value
 
     outToServer()
      function outToServer() {
         async function fetchData() {
         let clear = document.getElementById("output");
         clear.innerHTML = "";
         spinnerOn2.classList.remove('d-none')
         const response = await fetch(`${SE_CS_URL}${a}${apiAddonEnd}`);
         const items = await response.json();
          return items;
        };
        
         fetchData().then(items => {
            const symbols = items.map(function (index) {
            return index.symbol;
            })
                
 fetchLoop()
                   
         async function fetchLoop() {
          for (let i = 0; i < 10; i++) {
              let arrayOfInfo = [];
              let x = 0;
              x = fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbols[i]}`)
                 .then(response => response.json())
                 .then(data => {  
                  const d = data.profile;
              
                  let img = new Image();
                  img.src = d.image;
              
                  let companyName = d.companyName
                  let profileChangesPercent = Number(d.changesPercentage);
                  let changeP = profileChangesPercent.toFixed(2);
                  let PricePChange = document.getElementById("inputL");
                  let desiredLink = linkAddon + data.symbol;
                         if (changeP >= 0) {
                         color2 = "green";
                         } else if (changeP < 0) {
                         color2 = "red";
                        }
           
                  let desiredText = `<a style = "flex-direction:"; href="${desiredLink}"><img src="${d.image}"alt="${companyName} Logo" width="40" height="40"></img><text style="margin-left:1rem;">${companyName}</text><a  style = "color:black; font-size:17px; margin-left:7px; margin-left:1rem;">(${data.symbol})<a id="changeP"style= " font-size:17px;margin-left:5px;color:${color2};">(${changeP}%)</a></a></a>`;
             
          
                 let elm = document.createElement("div");
                 const linked = document.getElementsByTagName('a')[0].innerHTML += '<div style="border-bottom: 1px solid black" href=" ' + desiredLink + '">' + desiredText + '</div>';
   })}
        }spinnerOn2.classList.add('d-none')
              })
  }
}
   

  

      
    
    



    

  

       
         
      
