let BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdown=document.querySelectorAll(".select");
let btn=document.querySelector(".btn");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
for(let select of dropdown) {
    for(let countryCode in countryList) {
    let newOption=document.createElement("option");
    newOption.innerText=countryCode;
    newOption.value=countryCode;
    select.append(newOption);
    if(select.name==="from" && newOption.value==="USD") {
      newOption.selected="selected";  
    }
    if(select.name==="to" && newOption.value==="INR") {
      newOption.selected="selected";  
    }
    select.addEventListener("change",(ele)=> {
       updateFlag(ele.target);
    });
}
}
let updateFlag= (element) => {
  let countryCode=element.value;
  let currCode=countryList[countryCode];
  let newSrc=`https://flagsapi.com/${currCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
};
btn.addEventListener("click",(e)=> {
    e.preventDefault();
    updateExchangeRate();
});
const updateExchangeRate = async ()=> {
let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if(amtVal<1 || amtVal==="") {
    amtVal=1;
    amount.value="1";
}
let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json()`;
let response=await fetch(URL);
let data=await response.json();
let rate=data[toCurr.value.toLoweCase()];
let msg=document.querySelector(".data");
msg.innerText=`${amtVal} ${fromCurr.value} = ${amtVal*rate} ${toCurr.value}`;
}