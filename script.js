let url='https://www.themealdb.com/api/json/v1/1/search.php?s=';

async function getData(url){
    try{
        const response= await axios.get(url);
        const data= response.data;
        return data;
    }
    catch(error){
        console.error(error);
    }
}
const boton=document.querySelector("#button");
const menu =document.querySelector("#menu");
const text=document.querySelector("#textbox");
const error=document.querySelector(".container >p");
boton.addEventListener(
    "click",
    ()=>{
        const request=text.value;
        option=menu.value;
        switch(option){
            case "1":
                url='https://www.themealdb.com/api/json/v1/1/search.php?s='+request;
                break;
            case "2":
                url='https://www.themealdb.com/api/json/v1/1/filter.php?i='+request;
                break;
            case "3":
                url='https://www.themealdb.com/api/json/v1/1/filter.php?c='+request;
                break;
            case "4":
                url='https://www.themealdb.com/api/json/v1/1/filter.php?a='+request;
                break;
        }
        (async() => {
            try{
                const data = await getData(url);
                const datos=data.meals;
                if(datos != null){
                    error.style.display="none";
                    if(datos.length > 1){
                        let cont=document.querySelector(".container2");
                        cont.remove();
                        const cards=document.querySelector(".tarjetas");
                        cont=document.createElement("div");
                        cont.setAttribute("class","container2");
                        cards.appendChild(cont);
                        let i=0;
                        while(i< datos.length && i<18){
                            nombre_plato=datos[i].strMeal;
                            imagen=datos[i].strMealThumb;
                            i++;
                            const item=document.createElement("div");
                            const img=document.createElement("img");
                            const plato=document.createElement("p");
                            img.setAttribute("src",imagen);
                            plato.textContent=nombre_plato;
                            item.appendChild(img);
                            item.appendChild(plato);
                            cont.appendChild(item);
                            item.setAttribute("class","item");
                        }
                        const tarjeta=document.getElementsByClassName("item");
                        for(let i=0; i<tarjeta.length;i++){
                            tarjeta[i].addEventListener(
                                "click", 
                                ()=>{
                                    plato=tarjeta[i].querySelector("p");
                                    url='https://www.themealdb.com/api/json/v1/1/search.php?s='+plato.textContent;
                                    (async() => {
                                        try{
                                            const data = await getData(url);
                                            const datos=data.meals;
                                            showplato(datos[0]);
                                        }
                                        catch(error){
                                            console.error(error);
                                        }
                                    })();
                                }
                            );
                        }
                    }
                    else{
                        showplato(datos[0]);
                    }
                }
                else{
                    error.style.display="block";
                    cont=document.querySelector(".container2");
                    cont.setAttribute("style","display: none");
                }
            }
            catch(error){
                console.error(error)
            }
        })();
    }
);
const textbox= document.querySelector("#textbox");
menu.addEventListener(
    "change",
    () => {
        option=menu.value;
        switch(option){
            case "1":
                textbox.placeholder="Buscar plato";
                break;
            case "2":
                textbox.placeholder="Ingrediente principal";
                break;
            case "3":
                textbox.placeholder="Categoria";
                break;
            case "4": 
                textbox.placeholder="Area";
                break;
        }
    }
)
function showplato(datos){
    valores=Object.values(datos);
    nombre_plato=valores[1];
    imagen=valores[6];
    ingredientes=valores.slice(9,29);
    let i=0;
    while(i<=19){
        if(ingredientes[i]=="" || ingredientes[i]==null){
            break;
        }
        i++;
    }
    ingredientes=ingredientes.slice(0,i);
    reseta=valores[5];
    const cont=document.querySelector(".tarjetas")
    const container=document.querySelector(".container2");
    container.style.display="none";
    const newcont=document.createElement("div");
    const back=document.createElement("img");
    back.setAttribute("src","imagenes/back.png");
    back.setAttribute("class","regresar");
    const name=document.createElement("p");
    name.textContent=nombre_plato;
    const contimg=document.createElement("div");
    const img=document.createElement("img");
    const ingredients=document.createElement("ul");
    ingredients.textContent="Ingredientes:"
    for(i in ingredientes){
        const item=document.createElement("li");
        item.textContent=ingredientes[i];
        ingredients.appendChild(item);
    }
    const preparation=document.createElement("p");
    preparation.textContent=reseta;
    newcont.setAttribute("class","container3");
    img.setAttribute("src",imagen);
    name.setAttribute("id","nameplato");
    ingredients.setAttribute("class","info");
    preparation.setAttribute("class","info");
    newcont.appendChild(back);
    newcont.appendChild(name);
    contimg.appendChild(img);
    newcont.appendChild(contimg);
    newcont.appendChild(ingredients);
    newcont.appendChild(preparation);
    cont.appendChild(newcont);
    back.addEventListener(
        "click",
        ()=>{
            newcont.remove();
            container.style.display="flex";
        }
    )
}