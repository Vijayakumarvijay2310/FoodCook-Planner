let inputFood = document.getElementById('input-food')
let inputButton =document.getElementById('input-btn')
let foodContainer = document.getElementById('food-container')
const noListEl =  document.querySelector("#no-list")
const foodListStatistics = document.getElementById("food-list-statistics")

const localStorageKey = "foodItems";

document.addEventListener("DOMContentLoaded", ()=>{
    //localstorage fetch and Draw url.
    const fetchedFoodItems = [...JSON.parse(localStorage.getItem(localStorageKey))];

    fetchedFoodItems.forEach((item)=>{
    const li = document.createElement('li');

    const divItem = document.createElement('div');
    const divBtn = document.createElement('div');

    let inputValue = document.createTextNode(item.foodItem)

    li.className = "food-item";
    li.append(divItem,divBtn);

    divItem.append(inputValue)
    divBtn.innerHTML = '<i class="fa fa-xmark"></i>';
    divBtn.setAttribute("onclick","removeItem(event)")

    foodContainer.append(li);
    })
    refreshUi()
   
})
const handleAddingFoodItems = ()=>{
    const li = document.createElement('li');
    const divItem = document.createElement('div');
    const divBtn = document.createElement('div');
    let inputValue = document.createTextNode(inputFood.value)

    li.className = "food-item";
    li.append(divItem,divBtn);

    divItem.append(inputValue)
    divBtn.innerHTML = '<i class="fa fa-xmark"></i>';
    divBtn.setAttribute("onclick","removeItem(event)")

    foodContainer.append(li);
    

    localStorage.setItem(
     localStorageKey,
     JSON.stringify([...JSON.parse(localStorage.getItem(localStorageKey) || "[]"),{foodItem : inputFood.value}]) )

     inputFood.value = "";
    refreshUi()
}

inputButton.addEventListener('click',handleAddingFoodItems)

inputFood.addEventListener("keyup",(event)=>{

    if(event.key === "Enter"){
        handleAddingFoodItems();
    }else if(event.key === "KeyZ" && (event.ctrlKey || event.metaKey)){
        //Undo Operation
        inputFood.value = ""
    }
})

//remove food items from list
function removeItem(event){
    const removeList = event.target.parentNode.parentNode;
    removeList.remove();

  //remove from localstorage
  const fetchedFoodItems = [...JSON.parse(localStorage.getItem(localStorageKey))];

  fetchedFoodItems.forEach((item) => {
   if(item.foodItem === removeList.innerText){
    fetchedFoodItems.splice(fetchedFoodItems.indexOf(item),1);
  }
  })

  localStorage.setItem(localStorageKey,JSON.stringify(fetchedFoodItems))

    refreshUi()
}

function refreshUi(){
    foodListStatistics.innerText =`you have ${foodContainer.children.length} lists.`;

    foodContainer.children.length > 0 
    ? ((noListEl.hidden = true),(foodListStatistics.hidden = false) )
    : ((noListEl.hidden = false),(foodListStatistics.hidden = true));

}
