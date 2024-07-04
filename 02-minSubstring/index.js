// CORRER ARCHIVO CON "node index.js"

const arr = ["aabdccdbcacd", "aad"];

minSubstring(arr);

function minSubstring( strArr ) {
    // Obtenemos el string N a evaluar
    const N = strArr[0];
    const nSeparado = N.split("");
    // Obtenemos el string K
    const K = strArr[1];

    // Obtenemos un arreglo con [[letras], [cantidades]]
    const letrasCantidades = conocerCaracteres(K);

    // Necesitamos 2 punteros
    // Posicion inicial del string N
    let punteroInicio = 0;
    // Posicion final del string N
    let punteroFin = nSeparado.length - 1;

    // Tenemos dos cortes, el primero cuando el puntero del inicio se mueve y ya no encuentra la cadena K dentro de N y el segundo cuando el puntero del final ya no encuentra la cadena K dentro de N
    let corteDeBusqueda = 0;

    // Mientras K exista dentro de N vamos a ir corriendo el puntero del inicio
    while(corteDeBusqueda !== 1) {
        // A puntero fin le agregamos 1 porque .slice() no incluye el fin
        const existe = existeLetrasDentroString(letrasCantidades, nSeparado.slice(punteroInicio, punteroFin + 1));
        // Corta el bucle cuando ya no se pude mover el puntero, sino lo movemos una posicion
        if(existe) punteroInicio++;
        else corteDeBusqueda = 1;
    }
    

    // Mientras K exista dentro de N vamos a ir corriendo el puntero del final
    while(corteDeBusqueda !== 2) {
        const existe = existeLetrasDentroString(letrasCantidades, nSeparado.slice(punteroInicio, punteroFin + 1));
        
        // Corta el bucle cuando ya no se pude mover el puntero, sino lo movemos una posicion
        if(existe) punteroFin--;
        else corteDeBusqueda = 2;
    }

    // console.log(punteroInicio, punteroFin)
}

// Evaluar si existe una cantidad de letras en un string y devuelve true o false
function existeLetrasDentroString( letrasCantidades, arrStringEvaluar ) {
    // Devuelve true o false si existe o no
    let existe = true;

    
    const letras = letrasCantidades[0];
    const cantidades = letrasCantidades[1];

    console.log(letras, cantidades)
    
    // Empezamos a recorrer por cada letra a evaluar
    for( let i = 0; i < letras.length; i++ ) {
        // Si ya no existe cortamos el bucle
        if(!existe) break;

        let countCantidad = 0;

        // Tomando esa letras, recorremos el arreglo a evaluar y contamos cuantas veces existe esa letra
        for ( let count = 0; count < arrStringEvaluar.length; count++ ) {
            //Si la letra es la misma, sumamos 1 a cantidad
            if(letras[i] === arrStringEvaluar[count]) countCantidad++;

            // Si las cantidades son iguales cortamos el bucle porque ya coincide
            if (countCantidad === cantidades[i]) break;

            // Si no coinciden las cantidades y ya es la ultima vuelta entonces cortamos la funcion y devolvemos false
            if (countCantidad < cantidades[i] && count === arrStringEvaluar.length - 1) {
                existe = false;
            }
        }
    }
    return existe;
}

// Usamos esta funcion para obtener las letras del string K y cuantas veces estan repetidas
function conocerCaracteres( str ) {
    // Agarramos el string y lo separamos por caracteres obteniendo un nuevo arreglo con cada letra
    const arregloCaracteres = str.split("");

    // Creamos un arreglo vacio donde vamos a almacenar las letras y cantidades
    const letras = [];
    const cantidades = [];
    
    // Por cada posicion del arreglo con los caracteres hacemos:
    for(let i = 0; i < arregloCaracteres.length; i++) {
        // Evaluamos primero que esa letra no exista en donde lo vamos a almacenar
        if (!evaluarExisteLetra(arregloCaracteres[i], letras)) {

            // Guardamos esa letra en una variable temporal
            let caracter = arregloCaracteres[i];
            // Guardamos la cantidad de veces que existe esa letra dentro de los caracteres
            let contadorCantidad = 0;

            // Empezamos a recorrer cada posicion de caracter buscando coincidencias, si existe sumamos 1 a la cantidad
            for(let count = i; count < arregloCaracteres.length; count++) {
                if (caracter === arregloCaracteres[count]) contadorCantidad++;
            }

            // Añadimos la letra y la cantidad
            letras.push(caracter);
            cantidades.push(contadorCantidad);
        }
    }
    // Retornamos las letras y cantidades
    return [letras, cantidades];
}

// Devuelve true o false si la letra esta dentro del arreglo
function evaluarExisteLetra( letra, arrLetras ) {
    let existe = false;

    for(let i = 0; i < arrLetras.length; i++) {
        if (letra === arrLetras[i]) existe = true;
    }  

    return existe;
}