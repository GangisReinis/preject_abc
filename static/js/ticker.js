
async function displayIndexOne() {
  let joke = await getGreedIndex();
  let target = document.getElementById('ticker');
  target.innerText = ticker.value;
}

function showTicker(pay) {
  const content = JSON.parse(pay)

  var trace1 = {
    x: content.x,
    close: content.close,
    high: content.high,
    increasing: { line: { color: '#008000' } },
    line: { color: 'rgba(31,119,180,1)' },
    low: content.low,
    open: content.open,
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
  }
  var data = [trace1];

  var layout = {
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: [content.x[0], content.x[content.x.length - 1]],
      title: 'Date',
      type: 'date'
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: [Math.max(...content.high), Math.min(...content.low)],
      type: 'linear'
    }
  };

  var layout = { width: 700, height: 400 };
  Plotly.newPlot('ticker', data, layout);

};

