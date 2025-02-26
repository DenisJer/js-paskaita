// console.log("Denisas is js failo");
// // type String
// let vardas = "Denisas";
// console.log(vardas);

// let vardas2 = "Denisas";
// console.log(vardas2)
// console.log(vardas === vardas2);
// console.log(typeof vardas);
// // Type number
// let amzius = 35;
// console.log(amzius);
// console.log(typeof amzius);

// // Type boolean true/false
// let arSuages = true;
// console.log(arSuages);
// console.log(typeof arSuages);

// // Type empty
// let tuscias = null;
// console.log(tuscias);
// console.log(typeof tuscias);

// // Type undefined
// let neapibreztas;
// console.log(neapibreztas);
// console.log(typeof neapibreztas);

// // Referenciniai kintamuju tipai
// let masyvas = [1, 2, 3, 4];
// let masyvas2 = [1,2,3];
// console.log(masyvas === masyvas2);
// console.log(masyvas.length); // 4
// console.log(masyvas[0]);
// console.log(masyvas[1]);
// console.log(masyvas[4]); // undefined
// masyvas.push("DENISAS"); // [1, 2, 3, 4, "DENISAS"]
// console.log(masyvas.length); // 5

// let zmogus = {
//     vardas: 'Denisas',
//     pavarde: 'Jersovas',
//     amzius: 19,
//     'pilnas vardas': 'Denisas Jersovas',
// };

// console.log(zmogus); // {}
// console.log(zmogus.vardas); // Denisas
// console.log(zmogus['pavarde']) // Jersovas
// console.log(zmogus["pilnas vardas"]) // Denisas Jersovas

// zmogus.arPilnametis = true;
// // 18 > 18 - ? false
// if (zmogus.amzius === 18) {
//     console.log('Sveiki atvyke i pilnametyste');
// } else if (zmogus.amzius < 18) {
//     console.log('Dziaukis kol gali!!!');
// } else {
//     console.log('Tu jau kuri laika esi suauges');
// }
//  1===1 // true
//  1!==1 // false

// if(1 > 2 || 2 < 3) {
//     console.log('Tiesa')
// } else {
//     console.log('Netiesa')
// }

// if (1 === 1 && 2!==2) {
//     console.log('Tiesa')
// } else {
//     console.log('Netiesa')
// }

// let cart = [
//     {}, {}, {}, {}, {}, {}
// ];

// if (cart.length) {
//     console.log('netuscias array')
// } else {
//     console.log('tuscias array')
// }

// let skaicius = 2;
// if (skaicius % 2 === 0) {
//     console.log('Lyginis')
// } else {
//     console.log('Nelyginis')
// }

// let vardai = ['Denisas', 'Auste', 'Emile', 'asd', 'ded', 'nauja'];

// for (let i = 0; i < vardai.length; i++) {
//     console.log(people[i].validResidence);
// if(people[i].validResidence){
//  canVote.push(people[i])
// } else{cantVote.push(people[i]) }
// }


// ['denisas', 'auste'].forEach((vardas) => {
//     console.log(vardas)
// });

// console.log('Denisas naujas');

let heading1tags = document.getElementsByTagName('h1');

for(let i = 0; i < heading1tags.length; i++) {
    // console.log(heading1tags[i])
    if(i === 0) {
        heading1tags[i].innerText = i;
        // background-color: blue;
        heading1tags[i].style.backgroundColor = 'yellow';
    }

    if(i === 1) {
        heading1tags[i].innerHTML = '<span>' + i + '</span>';
        heading1tags[i].innerHTML = `<span>${i}</span>`
    }
}

let apieManeParagrafas = document.getElementById('apie-mane');
apieManeParagrafas.innerText = 'Tekstas apie mane';

let divElementas = document.createElement('div');

divElementas.innerText = 'Deniso div elementas';
divElementas.classList.add('deniso-divas')

document.body.appendChild(divElementas)
