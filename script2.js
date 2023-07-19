const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  //www.exchangerate-api.com/docs/supported-currencies
  https: fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
  .then((res) => res.json())
  .then((data) => {
      //  console.log(data);
      const rate = data.rates[currency_two];
      console.log(rate);
      
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      setItemInLocalStorage(currency_one, currency_two, amountEl_one.value);
    });
}//end of function
//set Items in local storage
const setItemInLocalStorage =(currOne,currTwo,amountOne)=>{
  localStorage.setItem('currencyOne',currOne);
   localStorage.setItem('currencyTwo',currTwo);
   localStorage.setItem('amountOne',amountOne);
};
const getItemInLocalStorage =()=>{
   const currOne = localStorage.getItem('currencyOne');
    const currTwo = localStorage.getItem('currencyTwo');
    const amountOne = localStorage.getItem('amountOne');
currencyEl_one.value=currOne;
currencyEl_two.value=currTwo;
amountEl_one.value=amountOne;
caclulate();
}

// Event listeners
currencyEl_one.addEventListener("change", caclulate);
amountEl_one.addEventListener("input", caclulate);
currencyEl_two.addEventListener("change", caclulate);
amountEl_two.addEventListener("input", caclulate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});
caclulate();
getItemInLocalStorage()
