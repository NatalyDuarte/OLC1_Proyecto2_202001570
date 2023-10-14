var miVariable = "Menos";
var miVariable2 = 5;
var valor;
if (typeof miVariable2 === 'number' && Number.isInteger(miVariable2) && miVariable === "Menos") {
    valor = Number(miVariable) % Number(miVariable2)
    valor = parseInt(valor);
    console.log('Las dos variables son int.');
    console.log(valor);
} else if (typeof miVariable === 'number' && Number.isInteger(miVariable) && typeof miVariable2 === 'number') {
    valor = Number(miVariable) % Number(miVariable2)
    valor = parseFloat(valor);
    console.log('Las primera variable es int y la segunda float.');
    console.log(valor);
} else if (Number.isInteger(miVariable2) &&  typeof miVariable === 'number') {
    valor = Number(miVariable) % Number(miVariable2)
    valor = parseFloat(valor);
    console.log('Las primera variable es float y la segunda int.');
    console.log(valor);
} else if (typeof miVariable === 'number' &&  typeof miVariable2 === 'number') {
    valor = Number(miVariable) % Number(miVariable2)
    valor = parseFloat(valor);
    console.log('Las dos variables son float.');
    console.log(valor);
} else {
    console.log('Por el tipo de dato no se puede resolver la division');
}
