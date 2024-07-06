// CORRER ARCHIVO CON "node index.js"

function minSubstring(strArr) {
    // Obtenemos los dos strings
    const N = strArr[0];
    const K = strArr[1];

    const lengN = N.length;

    // Creamos un objeto donde vamos a almacenar las letras y cantidades de K
    const chartCountK = {};

    // Obtenemos las letras y cantidades necesarias
    for (const chart of K) {
        // Si no existe en el objeto la letra, lo creamos y le damos como valor inicial 0
        chartCountK[chart] = (chartCountK[chart] || 0) + 1;
    }

    // Obtenemos la cantidad de caracteres unicos que necesitamos
    const requiredChars = Object.keys(chartCountK).length;

    // Aca vamos a ir guardando los caracteres y sus cantidades que existan dentro de la cadena que estamos evaluando
    const windowCharCount = {};

    // Usamos esta variable para contar cuantos caracteres existen dentro del rango que estamos evaluando y que tenga la cantidad necesaria
    let formed = 0;

    // Declaramos dos punteros 
    let left = 0, right = 0;

    // Declaramos el tamaño de la longitud minima donde contiene los caracteres (inicia en infinito ya que no sabemos, al principio, cual es la minima)
    let minLen = Infinity;

    // Declaramos la variable donde se va a almacenar el string con la cadena minima
    let minWindow = "";


    while( right < lengN ) {
        const charRight = N[right];
        // Agregamos cada letra a un objeto y contamos cuantas veces se encuentra dentro del rango que evaluamos
        windowCharCount[charRight] = (windowCharCount[charRight] || 0) + 1;

        // Verificamos que el caracter exista dentro de los caracteres a buscar y ademas evaluamos si hay la misma cantidad de caracteres requeridos. 
        if(charRight in chartCountK && windowCharCount[charRight] === chartCountK[charRight]) {
            formed += 1;
        }

        // En el momento que se encuentren los caracteres requeridos dentro de la cadena que estamos evaluando, empezamos a mover el puntero de la izquierda para buscar la cadena mas chica
        while (left <= right && formed === requiredChars) {
            const charLeft = N[left];

            // Ahora evaluamos si ya existe una cadena mas chica previamente y en caso que no la haya, agregamos esta.

            // Esta cuenta se hace para determinar la longitud de la cadena
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                // Le sumamos 1 porque substring no toma  el ultimo valor
                minWindow = N.substring(left, right + 1);
            }

            // Ahora le restamos 1 a la cantidad del caracter que estamos evaluando para verificar si deja de existir K dentro de este
            windowCharCount[charLeft] -= 1;
            // Primero verificamos que exista dentro de los caracteres que buscamos y luego si es menor a la cantidad requerida
            if (charLeft in chartCountK && windowCharCount[charLeft] < chartCountK[charLeft]) {
                // Si esto se cumple decrementamos formed para indicar que ya no existen los caracteres requeridos dentro de esta cadena
                formed -= 1;
            }
            // Corremos el puntero
            left += 1;
        }
        right += 1;
    }

    return minWindow;
}

console.log(minSubstring(["aabdccdbcacd", "aad"])); // Output: "aabd"
console.log(minSubstring(["aaabaaddae", "aed"]));  // Output: "dae"
console.log(minSubstring(["aabdcfjgadadcdbcacd", "aadf"])); // Output: "aabdcf"