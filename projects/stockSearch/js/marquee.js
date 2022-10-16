const URL_QUOTE = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quote";
const URL_assetList = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index"
class Marquee {
    constructor(marqueeTopPage) {
        this.marqueeTopPage = marqueeTopPage
    }
      
    cycle() {
         fetch(URL_assetList)
        .then(response => {
         response.json()
        .then((data) => {
  
          let array = [];
            let text2 = [];
            let color;
          for (let i = 0; i < data.length; i++) {
            let symbol = data[i]['symbol'];
            let percChange = data[i]['changesPercentage'];
            let stockPrice = data[i]['price'];
            let spercentToTwo = percChange.toFixed(2)
            if (spercentToTwo >= 0) {
              color = "green";
            } else if (spercentToTwo < 0) {
              color = "red";
            }
            array[i] = [symbol, percChange, stockPrice]
              text2[i] = `<text style="margin-left:8px;">${symbol}</text>
                        <text    style="color:black;    font-size:17px; margin-left:1px; ">${stockPrice}</text>
                        <text    style="color:${color}; font-size:17px; margin-right:15px">(${spercentToTwo}%)</text>`
            let str = text2.join(' ');
            const newDiv = document.createElement("li");
            this.marqueeTopPage.innerHTML = str;
          }
        }
        )
    })
    }
    }
