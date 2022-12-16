 var layout = { width: 600, height: 400 };
  Plotly.newPlot('greed', data, layout);


  async function displayIndex() {
    let joke = await getGreedIndex();
    let target = document.getElementById('fng');
    target.innerHTML = fng.value;
  }
  displayIndex();

  async function displayIndex(){
    let response = await fetch("https://api.alternative.me/fng/");
    let data = await response.json();
    console.log(data);
    
  }
  
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: [],
      title: { text: "Fear and Greed Index" },
      type: "indicator",
      mode: "gauge+number",
      delta: { reference: [] },
      gauge: { axis: { range: [null, 100] } }
    }
  ];
  