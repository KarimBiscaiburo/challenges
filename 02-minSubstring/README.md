## CHALLENGE DE LOGICA

- Haz que la función mimSubstring(strArr) tome el array de strings almacenado en strArr, que contendrá solo dos strings, el primer parámetro siendo el string N y el segundo parámetro siendo un string K de algunos caracteres. 

- Tu objetivo es determinar la subcadena más pequeña de N que contenga todos los caracteres en K. 

Por ejemplo: si strArr es ["aaabaaddae", "aed"], entonces la subcadena más pequeña de N que contiene los caracteres a, e y d es "dae" ubicada al final del string. Así que para este ejemplo, tu programa debería devolver el string "dae".

Otro ejemplo: si strArr es ["aabdccdbcacd", "aad"], entonces la subcadena más pequeña de N que contiene todos los caracteres en K es "aabd", que se encuentra al comienzo del string. Ambos parámetros serán strings con una longitud que varía de 1 a 50 caracteres, y todos los caracteres de K existirán en algún lugar del string N. Ambos strings solo contendrán caracteres alfabéticos en minúsculas.

# NOTA:
- K siempre va a ser menor a N y siempre va a estar contenida en N por lo que pueden haber caracteres repetidos pero nunca van a haber caracteres que no esten en N, ni haya mas caracteres de un solo tipo en K que en N.

<!-- Logica propia, puede haber otras soluciones o formas de resolverlo -->

## Separamos la lógica

- Haz que la función mimSubstring(strArr) tome el array de strings almacenado en strArr. 

- El primer parámetro siendo el string N y el segundo parámetro siendo un string K de algunos caracteres.

- Determinar cuantos caracteres hay en K y cuantas veces se repiten.

- Utilizar dos punteros como indices dentro de la cadena N

- Determinar la subcadena más pequeña de N que contenga todos los caracteres en K.

> [NOTE]
> Estas son unas notas
