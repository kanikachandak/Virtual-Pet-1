//Create variables here
var dog, happyDog, foodS, foodStock, database, dogImg, happyDogImg;

function preload()
{
  //load images here
   dogImg = loadImage("images/dogImg.png");
   happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 250, 30, 30);
  dog.addImage("Dog", dogImg);
  dog.scale=0.5;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on('value', getStock);
  }

function draw() 
{  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW))
  {
    writeFoodStock(foodS);
    dog.addImage("Happy", happyDogImg);
  }
  drawSprites();
  //add styles here
  fill(255);
  textSize(30)
  text("Food Stock: "+foodS, 250, 50);
}
function getStock(data)
{ 
    foodS = data.val();
}
function writeFoodStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else
  {
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  });
}