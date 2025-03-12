// DOCUMENTUI PRISKIRIAME VEIKSMA KURIS INICIJUOJAMAS KAI SVETAINES TURINYS YRA UZKRAUNAMAS
document.addEventListener('DOMContentLoaded', () => {
    // SUKURIAME KINTAMUOSIUS IR JIEMS PRISKIRIAM REIKSMES
    // SITIE KINTAMIEJI BUS PASIEKIAMI VISOSE VIETOSE
    const manoForma = document.getElementById('mano-forma');
    const userModal = document.getElementById('edit-modal');
    const editForma = document.getElementById('edit-form');
    const editVardasInput = document.getElementById('edit-vardas');
    const editPavardeInput = document.getElementById('edit-pavarde');
    const editAmziusInput = document.getElementById('edit-amzius');
    const usersListElement = document.getElementById('users-list');
    // KITAMASIS SKIRTAS ISTRAUKTI USER ID
    // JAM REIKSME YRA PRISKIRIAMA KAI PASPAUDZIAMAS "PATEIKTI" MYGTUKAS
    let userIdToEdit = null;

    // FUNCKCIJA KURI KREIPIASI I SERVERI IR GAUNA DUOMENIS APIE USERIUS
    async function loadUsers() {
        const users = await fetch('http://localhost:3000/users').then(users => users.json())
        return users;
    }

    // FUNKCIJA KURI ISTRINA USERI PAGAL JO ID
    async function deleteUser(id) {
        await fetch(
            'http://localhost:3000/users/' + id,
            {
                method: 'DELETE',
            }
        )
        displayUsers()
    }

    // HIGHER ORDER FUNKCIJA, JI SKIRTA PADUODI USER ID DELETE MYGTUKO PASPAUDIMO METU
    function handleDeleteUser(userId) {
        return () => deleteUser(userId)
    }

    // FUNKCIJA KURI ATIDARO MODALA, KURIAME BUS DUOMENU KEITIMO FORMA
    function openEditUserModal(user) {
       return () => {
           // ATIDAROM MODALA
           userModal.style.display = 'flex';
           // GLOBALIAM KITAMAJAM PRISKIRIAM ID KAD POTO JI GALETUME PASIEKTI 
           // ATIDARYTOS FORMOS SUBMIT VEIKSME
           userIdToEdit = user.id;
           // SUSTATMOS I INPUT ELEMENTUS PASPAUSTO USER DUOMENIS
           editVardasInput.value = user.vardas
           editPavardeInput.value = user.pavarde
           editAmziusInput.value = user.amzius
       }
    }

    // FUNKCIJA SKIRTA ATVAIZDUOTI USERS SARASA
    // SITA FUNKCIJA PRIIMA "users" PARAMETRA ATKELIAUJANTI IS DUOMBAZES
    function renderUsers(users){
        usersListElement.innerHTML = '';
        const ulElement = document.createElement('ul');

        // VYKDOMA ARRAY ITERACIJA
        // KIEKVIENOS ITERACIJOS METU SUKURIAMAS <li></li>
        // JO VIDUJE PRISKIRIAMA TEKSTINE REIKME IR DU MYGTUKAI "pateikti" ir "istrynti"
        users.forEach(user => {
            // KURIAME <li></li>
            const li = document.createElement('li');
            // KURIAME MYGTUKA
            const deleteUserButton = document.createElement('button');
            // MYGTUKUI PRISKIRIAME TEKSTA "Istrinti"
            deleteUserButton.innerText = 'Istrinti';
            // MYGTUKUI PASPAUDIMO "click" VEIKSMA IR PADUODAME USER ID IR PAGAL KURI ISTRINSIME DUOMENY IS DUOMBAZES
            deleteUserButton.addEventListener('click', handleDeleteUser(user.id))

            // KURIAME MYGTUKA
            const editUserButton = document.createElement('button');
            // MYGTUKUI PRISKIRIAME TEKSTA "Pakeisti"
            editUserButton.innerText = 'Pakeisti'
            // MYGTUKUI PASPAUDIMO "click" VEIKSMA IR PADUODAME USER OBJEKTA
            // PAGAL KURI ATLIKSIME VEIKSMUS APRASYTUS openEditUserModal FUNKCIJOJE
            editUserButton.addEventListener('click', openEditUserModal(user))
            // li.innerText = JSON.stringify(user);
            //KURIAME DEFAULT ZINUTES KITAMAJI
            let message = `${user.vardas} ${user.pavarde}`
            // TIKRINAM AR AMZIUS YRA UZSER OBJECTE
            // JEI YRA PRIDEDAM PRIE ZINUTES <<${amzius} m.>> TEKSTA 
            // JEI NERA PRIDEDA <<, amzius nezinomas!>> TEKSTA
            if (user.amzius) {
                message += `, ${user.amzius} m.`
            } else {
                message += `, amzius nezinomas!`
            }
            // I <li></li> ELEMENTA ISTATOM ZINUTE
            li.innerHTML = message;
            // I <li></li> ELEMENTA "Pakeisti" mygtuka
            li.appendChild(editUserButton)
            // I <li></li> ELEMENTA "Istrinti" mygtuka
            li.appendChild(deleteUserButton)

            // I <ul></ul> ISTATOME VISA NAUJAI SUKURTA <li></li> ELEMENTA
            // SU JO VIDUJE ISTATYTU TEKSTU IR MYGTUKAIS "Pakeisti" ir "Istrinti"
            ulElement.appendChild(li)
        })
        usersListElement.appendChild(ulElement)
    }

    // FUNCKCIJA KURI NURODO KAIP ATVAIZDUOTI USERIUS
    async function displayUsers() {
        const users = await loadUsers();
        renderUsers(users)
    }
    // USERIU ATVAIZDAVIMO FUNKCIJA ISKVIECIAMA
    displayUsers();

    // PRIDEDAME PRADINEI FORMAI "submit" VEIKSMA
    manoForma.addEventListener('submit',  function (event) {
        // SUSTABDOM DEFAULT "submit" MYGTUKO VEIKIMA
        // KURIS PERKRAUNA PUSLAPI
        event.preventDefault();
        // VIENAS IS BUDU KAIP GAUTI DUOMENIS IS FORMOS
        // PANAUDOJAMA JAVASCRIPT CLASS OBJECTAS FormData
        // JIS TAM TIKRA STRUKTURA SUDELIOJA DUOMEIS
        // KAZKAS TOKIO [['vardas', 'Vardenis'], ['pavarde', 'Pavardenis']]
        const formosDuomenys = new FormData(manoForma);
        // Object.fromEntries JAVSCRIPT OBJECTO METODAS KURIS IS AUKSCIAU NURODYTOS STUKRUROS PADARO OBJEKTA
        // { vardas: 'Vardenis', pavarde: 'Pavardenis' }
        const payload = Object.fromEntries(formosDuomenys);
    
        // SUKURIAM KINTAMUOSIUS KURIUOS POTO PANAUDOSIME VALIDACIJOJE FORMOS ELEMENTU
        const vardasReiksme = payload.vardas;
        const pavardeReiksme = payload.pavarde;
        const vardoDiv = document.getElementById('vardo-div');
        const pavardeDiv = document.getElementById('pavardes-div');

        // FORMOS ERROR NURESETINIMAS (NUNULINIMAS)
        vardoDiv.classList.remove('error');
        pavardeDiv.classList.remove('error');

        // TIKRINAM AR VARDO LAUKAS NETUSCIAS
        // JEI TUSCIAS LAUKAS PADAROM ALERT IR PRIDEDAM KLASES "error"
        // "error" KLASE APRASYTA STILIUOSE UZDEDA RAUDONA REMELI ANT NEVALIDAUS LAUKO
        if (!vardasReiksme.trim()) {
            alert('Vardas laukas yra tuscias');
            vardoDiv.classList.add('error');
        }
        // TIKRINAM AR PARADE LAUKAS NETUSCIAS
        // JEI TUSCIAS LAUKAS PADAROM ALERT IR PRIDEDAM KLASES "error"
        // "error" KLASE APRASYTA STILIUOSE UZDEDA RAUDONA REMELI ANT NEVALIDAUS LAUKO
        if (!pavardeReiksme.trim()) {
            alert('Pavardes laukas yra tuscias');
            pavardeDiv.classList.add('error');
        }
        // SUKURIAM DU KINTAMUOSIUS KURIUOSE TIKRINAM AR REIKSMES IVESTO YRA TIK RAIDES
        // CIA YRA NAUDOJAMA REGEX IMPLEMENTACIJA
        // AR ZODIS ATITINKA TAM TIKRAS TAISYKLES APRASYTAS TARP /.../ ZENKLU
        const vardasTuriTikRaides = /^[A-Za-z]+$/.test(vardasReiksme)
        const pavardeTuriTikRaides = /^[A-Za-z]+$/.test(pavardeReiksme)
        // TIKRINAM AR BENT VIENAS IS AUKSCIAU SUKURTU KITAMUJU NEATITINKA VALIDACIJOS APRASYTU TARP / / ZENKLU
        // JEI TAIP PADAROM ALERT KAD LEIDZIAM VESTI TIK RAIDES]
        if (!vardasTuriTikRaides || !pavardeTuriTikRaides) {
            alert('Leidziama ivesti tik raides');
            // TOLIAU DAROM VIDINI PATIKRINIMA KURIS IS LAUKU NEATITIKO VALIDACIJOS APRASYTOS TARP / / ZENKLU
            // JEI KAZKURIS IS LAUKU NEATITIKO VALIDACIJOS UZDEDA TAM TIKRAM <div></div> ELEMENTUI "error" KLASE
            if (!vardasTuriTikRaides) {
                vardoDiv.classList.add('error');
            }
            if (!pavardeTuriTikRaides) {
                pavardeDiv.classList.add('error');
            }
        }

        // CIA TIKRINAM AR BENT VIENAS IS ESAMU FORMOS VALIDACIJU TURETO ERROR
        // JEI TAIP SUSTABDOM FUNKCIJA IR NEBELEIDZIAM VYKDYTI KODO TOLIAU
        // TIKSLAS YRA KAD NESIUSTI DUOMENU I SERVERI
        // ARBA NEDARYTI TOLIMESNIU VEIKSMU SU NETIKSLIAI VALIDACIJOS NEATITINKANCIAIS DUOMENIMIS
        if (!vardasReiksme.trim() || !pavardeReiksme.trim() || !vardasTuriTikRaides || !pavardeTuriTikRaides){
            return;
        }

        // JEI VISI LAUKI YRA VALIDUS DAROME KREIPIMASI I SERVERI
        // IR LAUKIAME SEKMYNGO ISSAUGOJIMO SU "POST" METODO
         fetch(
            'http://localhost:3000/userss',
            {
                method: 'POST',
                body: JSON.stringify(payload)
            }
        )
        .then(response => {
            // DAR GALIMA SUGAUDYTI ERROR JEIGU IVYKO SAUGOJIMO  METU
            // KIEKVIENAS RESPONSE ATKELIAVES IS SERVERIO TURI SAVYJE "ok" IPATYBE
            // JI GRAZINA true/false]
            // SITAS TIKRINIMAS ZIURI AR RESPONSE YRA ok === fasle,
            // JEIGU TAIP TAI REISKIA IVYKO KLAIDA DARANT HTTP KVIETIMA I SERVERI
            if (!response.ok) {
                // JEI IVYKO KLAIDA MES DARO throw new EROR(..)
                // KURIS PROMISE VIDUJE NUKELIAUJA I .catch BLOKA IR TEN ATVAIZDUOJA ZINUTE
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }
            // JEIGU "ok" IPATYBE YRA true VADINASI BUVO SEKMINGAS HTTP KREIPIMASIS
            // IR GAUTUS RESPONSE DUOMENIS GRAZINA KAIP JSON OBJEKTA
            return response.json();
        })
        .catch(error => alert(`Ivyko error - ${error}`))
        
        // PO SEKMIGO DUOMENS SUKURIMO ATNAUJINAM FORMA I JOS PRADINE REIKSME
        manoForma.reset();

        // ATVAIZDUOAJAME IS NAUJO DUOMENIS KREIPDAMEISI I SERVERI
        displayUsers()
    })

    // PAKEITIMO FORMAI PRIDEDAM "submit" VEIKSMA
    // VISA KITA VYKSTA PANASIAI KAIP IR PRADINES FORMOS "submit" VEIKSMO VIDUJE
    // CIA KO TRUKSTA TAI TOKIOS PACIOS VALIDACIJOS KAD TIKRINTU TA PATI KA IR PRADINEJE FORMOJE
    editForma.addEventListener('submit', async function (event){
        event.preventDefault()
        const payload = {
            vardas: editVardasInput.value,
            pavarde: editPavardeInput.value,
            amzius: editAmziusInput.value,
        }

        await fetch(
            'http://localhost:3000/users/' + userIdToEdit,
            {
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        )
        displayUsers();

        // UZDAROME ATIDARYTA PAKEITIMO FORMOS MODAL ELEMENTA
        userModal.style.display = 'none'
        // ATSTATOME KITAMOJO REIKSME I PRADINE null
        // KAI MODAL UZSIDARO MUM NEBETURI RUPETI SITO KITAMOJO REIKSME
        // KAD KO NORS NEPRIDARYTUME NETYCIA SU SITO KINTAMOJO REIKSME UZDARIUS MODALA
        userIdToEdit = null;
    })

    // PAKEITIMO FORMOS 'x' MYGTUKUI PRISKIRIAMAS "click" VEIKSMAS
    // KURIS UZDARO ATIDARYTA FORMA IR ATNAUJIMA GLBOALAUS "userIdToEdit" KINTAMOJO REIKSME
    document.getElementById('close-btn').addEventListener('click', () => {
        userModal.style.display = 'none'
        userIdToEdit = null;
    })

})
