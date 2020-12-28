var dog, dogHappy, dogSad;
var db, foodS, foodStock;
var fedTime, lastFed, feed, addFood, foodObj;

function preload(){
    dogImg = loadImage("images/Dog.png");
    dogImg2 = loadImage("images/happydog.png");
}
function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();
  
  db = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED THE DOG,MAX");
  feed.position(550, 30);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,30);
  addFood.mousePressed(addFoods);

foodStock = db.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background(140, 210, 144);
foodObj.display();

fedTime = db.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed >=12){
  text("LAST FEED :" + lastFed%12 + 'PM', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 AM", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'AM', 350, 30);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}

  //function to add food in stock
function addFoods(){
  foodS++
  database.ref('/').update({
    jsFood : foodS
  })
}
