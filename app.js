let ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');
let stockPriceElement = document.getElementById('stock-price');
let numberFormat = new Intl.NumberFormat('en-GB', {style: 'currency',currency: 'EUR', minimumFractionDigits: 2});
let lastPrice = null;

ws.onmessage = (event) => {
  let stockObject = JSON.parse(event.data);//Convert json string to js object
  //console.log(stockObject);
  let price = parseFloat(stockObject.p);//convert price string to float
  stockPriceElement.innerText = `${stockObject.s} ${numberFormat.format(price)}`;
  stockPriceElement.style.color = !lastPrice || price === lastPrice  ? 'black' : price > lastPrice ? 'green' : 'red';
  lastPrice = price;
}