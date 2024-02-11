const URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns)
{
  for(let currcode in countryList)
  {

    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    select.append(newOption);

    if(select.name=="from" && currcode=="USD")
    {
      newOption.selected ="selected";
    }
    else if(select.name=="to" && currcode=="INR")
   {
     newOption.selected ="selected";
  }
  }

  select.addEventListener("change",(e)=>{
    console.log(e.target);
     updateFlag(e.target);
  });

}


function updateFlag(element)
{
  let currcode = element.value;

  // console.log(currcode);
  // console.log(element);

  let countrycode = countryList[currcode];

  // console.log(countrycode);

  let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`; 
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;

}


btn.addEventListener("click",async (e)=>{
  e.preventDefault();
   let amount = document.querySelector("input");
   let amtval = amount.value;
   if(amtval==""|| amtval<1)
   {
    amtval =1;
    amount.value="1";
   }

  //  console.log(amtval);
  //  console.log(fromcurr.value,tocurr.value);

   const newURL = `${URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
   let response = await fetch(newURL);
   console.log(response);
   let data = await response.json();
   console.log(data);
   let rate = data[tocurr.value.toLowerCase()];
   let finalamt = rate*amtval;

  //  console.log(finalamt);

   msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
});
