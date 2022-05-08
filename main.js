//Dividir el arreglo (objeto, teclado) en 5 filas q son las q tenemos en nuestro teclado (las caracteristicas de nuestro objeto en este caso, el teclado)
const keys = [
    [
        ["1","!"],//Si se presiona shift muestra el signo de exclamacion. muestra dos valores diferentes, por eso cada array(tecla en este caso) Tiene dos elementos.
        ["2","@"],
        ["3","#"],
        ["4","$"],
        ["5","%"],
        ["6","&"],
        ["7","/"],
        ["8","("],
        ["9",")"],
        ["0","="],
        ["'","?"],
        ["¿","¡"],
    ],//Primera fila
    [
        ["q","Q"],
        ["w","W"],
        ["e","E"],
        ["r","R"],
        ["t","T"],
        ["y","Y"],
        ["u","U"],
        ["i","I"],
        ["o","O"],
        ["p","P"],
        ["`","^"],
        ["+","*"],
    ],//Segunda fila
    [
        ["MAYUS","MAYUS"],
        ["a","A"],
        ["s","S"],
        ["d","D"],
        ["f","F"],
        ["g","G"],
        ["h","H"],
        ["j","J"],
        ["k","K"],
        ["l","L"],
        ["ñ","Ñ"],
        ["{","["],
        ["}","]"],
    ],//Tercer fila
    [
        ["SHIFT","SHIFT"],
        ["<",">"],
        ["z","Z"],
        ["x","X"],
        ["c","C"],
        ["v","V"],
        ["b","B"],
        ["n","N"],
        ["m","M"],
        [",",";"],
        [".",":"],
        ["-","_"],
    ],//Cuarta Fila
    [
        ["SPACE","SPACE"],
    ]//Quinta y ultima fila
];

let mayus = false;//Falso porque tienen dos caracteristicas diferentes
let shift = false;//mientras q mayus es apretada sigue activa y shift solo funciona cuando se la apreta nada mas
//Ahora hay q imprimir el teclado. Para eso...
let current = null;//input va a escribir mi teclado si no hay nada seleccionado

renderkeyboard();//llamo a la funcion para q se ejecute en chrom

function renderkeyboard(){
    //Creamos el contenedor del teclado:
    const keyboardContainer = document.querySelector("#keyboard-container");//El metodo queryselector()retora el primer elemento que cumpla con el criterio dado. En este caso el id del contenedor.
    //Para alinear las filas del teclado creamos un peqieño espacio(empty)
    let empty = `<div class="key-empty"></div>`;//Agregamos la clase key-empty sin ningun contenido

    const layers = keys.map((layer) => {//layer:"capa" q se trata como objeto documento distinto
        return layer.map(key =>{//Se hace una itracion por cada capa, fila(primer map) y despues se itera con map(segundo map)los dos elementos de cada array(tecla)
           if(key[0] === 'SHIFT'){//Hay que validar la tecla (key).key en posicion cero tal cosa, key[1] tal otra.Poniendo su comportamiento.
               return `<button class="key key-shift">${key[0]}</button>`;//key key-(tecla): Va a ser un atecla con una estructura base y luego c/tecla va a tener su color y su medida.
           } 
           if(key[0] === 'MAYUS'){ 
            return `<button class="key key-mayus">${key[0]}</button>`;
           }
           if(key[0] === 'SPACE'){
            return `<button class="key key-space"></button>`;
        } 
        /*Si nada de eso se cumple, se regresa la estructura de esa tecla, asi:
        key key-normal, porque va a ser del tamaño generico
        Si nuestra tecla "shift" esta activada se muestra key[1]. si la tecla"mayus" esta activada se imprime key[1] y si no, key[0].
        Pero solo si ese caracter es una letra del alfabeto, si no se muestra key[0]. Para eso...
        usamos el metodo toLowerCase()(devuelve el valor en minuscula) y luego charCodeAt() (devuelve un número indicando el valor Unicode del carácter en el índice proporcionado.)
        funciona si el valor 0 es mayor e igual a 97(letra "a" minuscula en el codigo de teclado ASCII q es el q usa la compu) y si el valor 0 menor e igual a 122 (letra "z") Cambia o no a mayuscula.
        */
        return`
            <button class="key key-normal"> 
            ${
            shift
                ? key[1] 
                : mayus && 
                key[0].toLowerCase().charCodeAt(0) >= 97 &&
                key[0].toLowerCase().charCodeAt(0) <= 122 
                ? key[1] 
                : key[0]
            }
            </button>
        `;
        }); 
    
    });

 //Hay que agregar los espacios (empty) manualmente para q quede bien equilibrado el teclado
    layers[0].push(empty);//layers en la primer fila metodo push()(agrega un espacio al final de la fila)
    layers[1].unshift(empty);//layers en la segunda fila metodo unshift() agrega un espacio al principio del array, fila)
 //yo sigo teniendo las filas como capas(leyers) para q se pueda ver como un string, las teclas, hacemos...
    const htmlLayers = layers.map((layer) => {//cada layer lo voy a recorrer con map 
        return layer.join("");//y voy a regresar con el metodo join(), unir todos los elementos por cada fila.
    });

    keyboardContainer.innerHTML = "";//La propiedad innerHTML se usa para asignarle un valor al contenido de un div

    htmlLayers.forEach(layer => { //forEach() recorrer estructuras que contienen varios elementos (como matrices, recursos u objetos) sin necesidad de preocuparse por el número de elementos.
        keyboardContainer.innerHTML += `<div class="layer">${layer}</div>` 
    });


 document.querySelectorAll('.key').forEach(key => {
     key.addEventListener('click', e => {
      if (current) {//si hay un input puesto en mi teclado ...
        if(key.textContent === 'SHIFT') {// si el contenido del texto(textContent) es SHIFT
            shift = !shift;//cambio le valor de shift a lo opuesto
            renderkeyboard();//renderizo y muestro el nuevo valor por pantalla
        }else if(key.textContent === "MAYUS") {
            mayus = !mayus;
            renderkeyboard();
        }else if(key.textContent === "") {
            current.value += " ";
        }else{
           current.value += key.textContent.trim();
           if(shift){
               shift = false;
               renderkeyboard();
               current.focus();
           } 
        }
      }
     })
 });
}

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focusin", (e) => {
        current = e.target;
    });
});

