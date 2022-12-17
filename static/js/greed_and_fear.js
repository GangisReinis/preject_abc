
  
  async function displayIndexOne() {
    let joke = await getGreedIndex();
    let target = document.getElementById('fng');
    target.innerText = fng.value;
  }

  async function displayIndex(){
    let response = await fetch("https://api.alternative.me/fng/");
    let data = await response.json();
    let target = document.getElementById('fng');
    target.innerText = data.data[0].value;
    return data.data[0].value;
  }

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 28,
      title: { text: "Fear and Greed Index" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: 40 },
      gauge: { axis: { range: [null, 100] } }
    }
  ];
  
  //console.log(data)
  angular.element(document).ready(function () {
    var layout = { width: 700, height: 400 };
    Plotly.newPlot('fng', data, layout);
});
