let  array_ingredients = []; 

function readSymbol(symbol){
    array_ingredients = [];
    document.getElementById('cards').innerHTML = " ";

    // создаём объкт который умеет отправлять запросы
    let requestObj = new XMLHttpRequest();

    // собираем ссылку для запроса
    let link = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
    link = link + symbol;

    //конфигурируем объект
    requestObj.open('GET', link, false);

    // отправляем запрос
    requestObj.send();

    // преобразуем джейсон в массив чтобы удобнее доставать данные
    let array = JSON.parse(requestObj.responseText);
    if (array['meals'] == null || array['meals'] == "") {
        document.getElementById('cards').innerHTML = "<h3 class='text'>No recipes found for the selected letter</h3>";
        document.getElementById('cards').style.height = "60vh";
    }
    else {
        // считаем количество полученных блюд
        let count_meals = array['meals'].length;

        // записываем в переменную массив блюд
        let meals = array['meals'];

        // вытаскиваем параметр из массива блюд, записыывая их в карточки
        for (let number_meal = 0; number_meal < count_meals; number_meal++) {
            // открытие дива карточки
            let card = "<div class='card'>"

            // запись параметров рецепта в массив
            let parametrs_meals = meals[number_meal];

            // добавление картинки в карточку
            card = card + "<img src='" + parametrs_meals["strMealThumb"] + "'>";
            card = card + "<div class='ingredient'><button class='btn_ingredient' onclick='showIngredients(" + number_meal + ")'>Ingredients</button></div>"
            console.log(number_meal);
            // добавление название рецепта в карточку
            card = card + "<h3>" + parametrs_meals['strMeal'] + "</h3></div>";

            // добавляем собранную карточку на фронт
            document.getElementById('cards').innerHTML += card;

            // собираем ключи ингридиента и пропорции
            let Ingredient = "strIngredient";
            let Measure = "strMeasure";
            let number = 1;
            ingredient = Ingredient + number;
            measure = Measure + number;
            let ingredients = "";
            
            //собираем ингридиенты и пропорции до тех пор пока они не равны null или их количество не превышает 15
            while (parametrs_meals[ingredient] != "" && parametrs_meals[ingredient] != null) {
                ingredients = ingredients + "<p>" + parametrs_meals[ingredient] + " / " + parametrs_meals[measure] + "</p>";
                number++;
                ingredient = Ingredient + number;
                measure = Measure + number;
            }
            array_ingredients.push([parametrs_meals['strMeal'], ingredients, number]);
        }
    
        let cards_style = Math.ceil(count_meals / 3) * 466;
        document.getElementById("cards").style.height = cards_style + 'px'; 
        let card_style = ".card {background-color: #05386b; width: 300px; text-align: center; margin: 40px; display: inline-block;";
        card_style = card_style + "color: #edf5e1; border: 3px solid #379683; box-sizing: border-box; font-family: 'Open Sans'; border-radius: 20px;}";
        let card_img_style = ".card img { border-radius: 20px 20px 0px 0px; display: block; width: 100%; border-radius: 20px 20px 0px 0px;}";
        let img_style = ".img { background-size: cover; }";
        let style = "<style>" + card_style + card_img_style + img_style + "</style>";
        // изменяю внешний вид карточки
        document.getElementById('cards').innerHTML += style;
    }
}

function showData(number_meal) {
    document.getElementById('data').innerHTML = "";
    arrayData = array_ingredients[number_meal];
    document.getElementById('data').innerHTML += "<div class='RecipeName'><h2>Recipe: " + arrayData[0] + "</h2></div><div id='RecipeData'>" + arrayData[1] + "</div>";
    let a = 33.7 * arrayData[2] + 150 + "px";
    document.getElementById("Recipe").style.height = a;
    document.getElementById('RecipeData').style.fontSize = "14px";
    if (arrayData[2] > 14) {
        document.getElementById('RecipeData').style.fontSize = "12px";
        a = 24.7 * arrayData[2] + 150 + "px";
        document.getElementById("Recipe").style.height = a;
    }
}

function showIngredients(number_meal) {
    document.getElementById("Recipe").style.display = "block";
    document.getElementById("curtain").style.display = "block";
    document.getElementById("curtain").style.opacity = "0.4";
    let size = document.documentElement.scrollHeight + "px";
    document.getElementById("curtain").style.height = size; 
    document.getElementById("Recipe").scrollBy(0,100);
    showData(number_meal);
}

function hideIngredients() {
    document.getElementById("Recipe").style.display = "none";
    document.getElementById("curtain").style.display = "none";
    document.getElementById("curtain").style.opacity = "1";
}