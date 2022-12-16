function loadChart(payload) {
    const content = eval(JSON.parse(payload))



 var trace1 = {
     x: [],
     close: [],
     high: [],
     increasing: { line: { color: '#008000' } },
     line: { color: 'rgba(31,119,180,1)' },
     low: [],
     open: [],
     type: 'candlestick',
     xaxis: 'x',
     yaxis: 'y'
 }
};

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
    range: ['', ''], 
    rangeslider: {range: ['', '']}, 
    title: 'Date', 
    type: 'date'
  }, 
  yaxis: {
    autorange: true, 
    domain: [0, 1], 
    range: [, ], 
    type: 'linear'
  }
};

Plotly.newPlot('ticker', data, layout);

