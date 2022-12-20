
  async function displayIndexOne() {
    let joke = await getGreedIndex();
    let target = document.getElementById('fng');
    target.innerText = fng.value;
  }
  
  function giveIndex(index){
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: index,
        title: { text: "Fear and Greed Index" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 40 },
        gauge: { axis: { range: [null, 100] } }
      }
    ];
    
    angular.element(document).ready(function () {
      var layout = { width: 700, height: 400 };
      Plotly.newPlot('fng', data, layout);
    });
    
  }

  function displayIndex() {
    fetch("https://api.alternative.me/fng/")
      .then(response => response.json())
      .then(responseData => giveIndex(responseData.data[0].value))
      .catch((error) => {
        console.log(error)
      })
  }
  displayIndex()