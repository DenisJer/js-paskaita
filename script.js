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

// let heading1tags = document.getElementsByTagName('h1');

// for(let i = 0; i < heading1tags.length; i++) {
//     // console.log(heading1tags[i])
//     if(i === 0) {
//         heading1tags[i].innerText = i;
//         // background-color: blue;
//         heading1tags[i].style.backgroundColor = 'yellow';
//     }

//     if(i === 1) {
//         heading1tags[i].innerHTML = '<span>' + i + '</span>';
//         heading1tags[i].innerHTML = `<span>${i}</span>`
//     }
// }

// let apieManeParagrafas = document.getElementById('apie-mane');
// apieManeParagrafas.innerText = 'Tekstas apie mane';

// let divElementas = document.createElement('div');

// divElementas.innerText = 'Deniso div elementas';
// divElementas.classList.add('deniso-divas')

// document.body.appendChild(divElementas)

// const pridetiMygtukas = document.getElementById('prideti-mygtukas');
// const atimtiMygtukas = document.getElementById('atimti-mygtukas');

// let count = 0;
// const manoSkaicius = document.getElementById('mano-skaicius');
// manoSkaicius.innerText = count

// function prideti(event) {
//     console.log(event)
//     count++
//     manoSkaicius.innerText = count;
// }

// function atimti() {
//     count--
//     manoSkaicius.innerText = count;
// }

// pridetiMygtukas.addEventListener('click', prideti)
// atimtiMygtukas.addEventListener('click', atimti)


// const burgerBtn = document.getElementById('burger-btn');

// burgerBtn.addEventListener('click', function () {
//     manoForma.classList.toggle('show')
// })



document.addEventListener('DOMContentLoaded', () => { 
    const manoForma = document.getElementById('mano-forma');

    async function loadUsers() {
        const users = await fetch('http://localhost:3000/users').then(users => users.json())
        return users;
    }

    // FUNCKCIJA KURI NURODO KAIP ATVAIZDUOTI USERIUS
    async function displayUsers() {
        const users = await loadUsers();
        const usersListElement = document.getElementById('users-list');
        const ulElement = document.createElement('ul');
      
        users.forEach(user => {
            console.log(user)
            const li = document.createElement('li');
            // li.innerText = JSON.stringify(user);
            let message = `${user.vardas} ${user.pavarde}`
            if(user.amzius) {
                message += `, ${user.amzius} m.`
            } else {
                message += `, amzius nezinomas!`
            }
            li.innerHTML = message;
            ulElement.appendChild(li)
        })
        usersListElement.appendChild(ulElement)
    }
    // USERIU ATVAIZDAVIMO FUNKCIJA ISKVIECIAMA
    displayUsers();

    manoForma.addEventListener('submit', function (event) {
        event.preventDefault();
        const formosDuomenys = new FormData(manoForma);
        const payload = Object.fromEntries(formosDuomenys);

        const vardasReiksme = payload.vardas;
        const pavardeReiksme = payload.pavarde;
        const vardoDiv = document.getElementById('vardo-div');
        const pavardeDiv = document.getElementById('pavardes-div');

        // formos error nuresetinimas
        vardoDiv.classList.remove('error');
        pavardeDiv.classList.remove('error');

        // ar vardo laukas netuscias
        if (!vardasReiksme.trim()) {
            alert('Vardas laukas yra tuscias');
            vardoDiv.classList.add('error');
            return;
        }
        // ar vardo laukas netuscias
        if (!pavardeReiksme.trim()) {
            alert('Pavardes laukas yra tuscias');
            pavardeDiv.classList.add('error');
            return;
        }
        // patikrinam ar ivesta yra tik raides
        if (!/^[A-Za-z]+$/.test(vardasReiksme) || !/^[A-Za-z]+$/.test(pavardeReiksme)) {
            alert('Leidziama ivesti tik raides');
            if (!/^[A-Za-z]+$/.test(vardasReiksme)) {
                vardoDiv.classList.add('error');
            }
            if (!/^[A-Za-z]+$/.test(pavardeReiksme)) {
                pavardeDiv.classList.add('error');
            }
            return;
        }

        fetch(
            'http://localhost:3000/users',
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        )
    })
})
