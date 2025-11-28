// *** VARIABLES GLOBALS ***

// Guardem si cada camp és correcte o no
let nomValid = false;
let edatValida = false;
let cpValid = false;
let emailValid = false;
let passValida = false;
let confirmacioValida = false;
let privacitatAcceptada = false;

// Per desar la informació (el que demana l'enunciat)
let dadesFormulari = {}; // 

// Referències als elements del DOM
let campNom = document.getElementById("nom");
let campEdat = document.getElementById("edat");
let campCP = document.getElementById("cp");
let campEmail = document.getElementById("email");
let campPass = document.getElementById("pass");
let campPass2 = document.getElementById("pass2");
let chkMostrarPass = document.getElementById("mostrar-pass");
let chkMostrarPass2 = document.getElementById("mostrar-pass2");
let chkPrivacitat = document.getElementById("privacitat");
let btnEsborrar = document.getElementById("btn-esborrar");
let btnEnviar = document.getElementById("btn-enviar");

// Missatges d'error
let errorNom = document.getElementById("error-nom");
let errorEdat = document.getElementById("error-edat");
let errorCP = document.getElementById("error-cp");
let errorEmail = document.getElementById("error-email");
let errorPass = document.getElementById("error-pass");
let errorPass2 = document.getElementById("error-pass2");
let errorPrivacitat = document.getElementById("error-privacitat");

// Div on mostrarem el resultat final
let divResultat = document.getElementById("resultat");

// Posa en majúscula la primera lletra de cada paraula
function posarMajusculesInicials(text) {
  let resultat = "";
  let novaParaula = true;

  for (let i = 0; i < text.length; i++) {
    let c = text[i];

    if (c === " ") {
      // Si hi ha un espai, la següent lletra serà l'inici d'una paraula
      resultat = resultat + c;
      novaParaula = true;
    } else {
      if (novaParaula) {
        resultat = resultat + c.toUpperCase();
        novaParaula = false;
      } else {
        resultat = resultat + c.toLowerCase();
      }
    }
  }
  return resultat;
}

function validarNom() {
  let valor = campNom.value;

  // Passem a majúscules inicials
  valor = posarMajusculesInicials(valor);
  campNom.value = valor;

  if (valor.length === 0) {
    errorNom.textContent = "Has d'introduir el nom i cognoms.";
    nomValid = false;
  } else {
    errorNom.textContent = "";
    nomValid = true;
  }

  actualitzarEstat();
}

campNom.onblur = validarNom;

function validarEdat() {
  let valor = campEdat.value;

  if (valor === "") {
    errorEdat.textContent = "Has de triar un rang d'edat.";
    edatValida = false;
  } else {
    errorEdat.textContent = "";
    edatValida = true;
  }

  actualitzarEstat();
}

campEdat.onchange = validarEdat;

function esNomésDigits(text) {
  // Comprova que tots els caràcters són dígits
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c < "0" || c > "9") {
      return false;
    }
  }
  return true;
}

function validarCP() {
  let valor = campCP.value;

  if (valor.length !== 5) {
    errorCP.textContent = "El codi postal ha de tenir exactament 5 dígits.";
    cpValid = false;
  } else if (!esNomésDigits(valor)) {
    errorCP.textContent = "El codi postal només pot contenir dígits.";
    cpValid = false;
  } else {
    errorCP.textContent = "";
    cpValid = true;
  }

  actualitzarEstat();
}

campCP.onblur = validarCP;

function validarEmail() {
  let valor = campEmail.value;
  let comptaArroba = 0;
  let posicioArroba = -1;

  // Comptem quantes @ hi ha i on
  for (let i = 0; i < valor.length; i++) {
    if (valor[i] === "@") {
      comptaArroba = comptaArroba + 1;
      posicioArroba = i;
    }
  }

  let puntDespres = false;
  if (posicioArroba !== -1) {
    // Busquem un punt després de l'arrova
    for (let j = posicioArroba + 1; j < valor.length; j++) {
      if (valor[j] === ".") {
        puntDespres = true;
      }
    }
  }

  if (comptaArroba !== 1 || !puntDespres) {
    errorEmail.textContent = "El correu ha de tenir 1 @ i un punt després.";
    emailValid = false;
  } else {
    errorEmail.textContent = "";
    emailValid = true;
  }

  actualitzarEstat();
}

campEmail.onblur = validarEmail;

function comprovarContrasenya(text) {
  let majuscules = 0;
  let minuscules = 0;
  let digits = 0;
  let especials = 0;

  let lletresEspecials = "!@#$%^&*()_+[]-={};:\\|,.<>/?";

  for (let i = 0; i < text.length; i++) {
    let c = text[i];

    if (c >= "A" && c <= "Z") {
      majuscules = majuscules + 1;
    } else if (c >= "a" && c <= "z") {
      minuscules = minuscules + 1;
    } else if (c >= "0" && c <= "9") {
      digits = digits + 1;
    } else if (lletresEspecials.indexOf(c) !== -1) {
      especials = especials + 1;
    }
  }

  // Retornem un objecte amb els comptadors
  return {
    majuscules: majuscules,
    minuscules: minuscules,
    digits: digits,
    especials: especials
  };
}

function validarPass() {
  let valor = campPass.value;

  if (valor.length < 8) {
    errorPass.textContent = "Mínim 8 caràcters.";
    passValida = false;
  } else {
    let info = comprovarContrasenya(valor);

    if (info.majuscules < 1) {
      errorPass.textContent = "Cal, com a mínim, 1 majúscula.";
      passValida = false;
    } else if (info.minuscules < 1) {
      errorPass.textContent = "Cal, com a mínim, 1 minúscula.";
      passValida = false;
    } else if (info.digits < 2) {
      errorPass.textContent = "Calen, com a mínim, 2 dígits.";
      passValida = false;
    } else if (info.especials < 1) {
      errorPass.textContent = "Cal, com a mínim, 1 caràcter especial.";
      passValida = false;
    } else {
      errorPass.textContent = "";
      passValida = true;
    }
  }

  actualitzarEstat();
}

campPass.onblur = validarPass;

chkMostrarPass.onchange = function() {
  if (chkMostrarPass.checked) {
    campPass.type = "text";
  } else {
    campPass.type = "password";
  }
};

function validarConfirmacio() {
  let valor1 = campPass.value;
  let valor2 = campPass2.value;

  if (valor2.length === 0) {
    errorPass2.textContent = "Has de repetir la contrasenya.";
    confirmacioValida = false;
  } else if (valor1 !== valor2) {
    errorPass2.textContent = "Les contrasenyes no coincideixen.";
    confirmacioValida = false;
  } else {
    errorPass2.textContent = "";
    confirmacioValida = true;
  }

  actualitzarEstat();
}

campPass2.onblur = validarConfirmacio;

chkMostrarPass2.onchange = function() {
  if (chkMostrarPass2.checked) {
    campPass2.type = "text";
  } else {
    campPass2.type = "password";
  }
};

function validarPrivacitat() {
  if (chkPrivacitat.checked) {
    errorPrivacitat.textContent = "";
    privacitatAcceptada = true;
  } else {
    errorPrivacitat.textContent = "Has d'acceptar la política de privacitat.";
    privacitatAcceptada = false;
  }

  actualitzarEstat();
}

chkPrivacitat.onchange = validarPrivacitat;

function actualitzarEstat() {
  // Activem/desactivem camps en cadena

  // Nom correcte -> podem omplir edat
  campEdat.disabled = !nomValid;

  // Edat correcta -> podem omplir codi postal
  campCP.disabled = !edatValida;

  // CP correcte -> podem omplir email
  campEmail.disabled = !cpValid;

  // Email correcte -> podem omplir contrasenya
  campPass.disabled = !emailValid;
  chkMostrarPass.disabled = !emailValid;

  // Contrasenya correcta -> podem omplir confirmació
  campPass2.disabled = !passValida;
  chkMostrarPass2.disabled = !passValida;

  // Confirmació correcta -> podem clicar privacitat
  chkPrivacitat.disabled = !confirmacioValida;

  // Privacitat acceptada + tot correcte -> Enviar activat
  let totCorrecte = nomValid && edatValida && cpValid && emailValid &&
                    passValida && confirmacioValida && privacitatAcceptada;

  btnEnviar.disabled = !totCorrecte;

  // Esborrar el podem activar quan hi ha com a mínim el nom posat
  btnEsborrar.disabled = !nomValid;
}

function esborrarFormulari() {
  // Buidem camps
  campNom.value = "";
  campEdat.value = "";
  campCP.value = "";
  campEmail.value = "";
  campPass.value = "";
  campPass2.value = "";
  chkMostrarPass.checked = false;
  chkMostrarPass2.checked = false;
  chkPrivacitat.checked = false;

  campPass.type = "password";
  campPass2.type = "password";

  // Buidem missatges d'error
  errorNom.textContent = "";
  errorEdat.textContent = "";
  errorCP.textContent = "";
  errorEmail.textContent = "";
  errorPass.textContent = "";
  errorPass2.textContent = "";
  errorPrivacitat.textContent = "";

  // Buidem resultat
  divResultat.textContent = "";

  // Tots els camps tornen a ser invàlids
  nomValid = false;
  edatValida = false;
  cpValid = false;
  emailValid = false;
  passValida = false;
  confirmacioValida = false;
  privacitatAcceptada = false;

  actualitzarEstat();
}

btnEsborrar.onclick = esborrarFormulari;

function enviarFormulari() {
  // Per assegurar-nos que tot està validat, tornem a cridar
  validarNom();
  validarEdat();
  validarCP();
  validarEmail();
  validarPass();
  validarConfirmacio();
  validarPrivacitat();

  let totCorrecte = nomValid && edatValida && cpValid && emailValid &&
                    passValida && confirmacioValida && privacitatAcceptada;

  if (!totCorrecte) {
    divResultat.textContent = "Hi ha errors al formulari. Revisa els camps en vermell.";
    return;
  }

  // Guardem la informació a l'objecte dadesFormulari (tal com demana l'enunciat)
  dadesFormulari = {
    nom: campNom.value,
    edat: campEdat.value,
    codiPostal: campCP.value,
    email: campEmail.value
    // No acostuma a mostrar-se la contrasenya real, la podem ometre o posar "****"
  };

  // Mostrem un text amb el contingut introduït
  let text = "";
  text = text + "Formulari emplenat correctament!<br><br>";
  text = text + "Nom i cognoms: " + dadesFormulari.nom + "<br>";
  text = text + "Rang d'edat: " + dadesFormulari.edat + "<br>";
  text = text + "Codi postal: " + dadesFormulari.codiPostal + "<br>";
  text = text + "Correu electrònic: " + dadesFormulari.email + "<br>";

  divResultat.innerHTML = text;
}

btnEnviar.onclick = enviarFormulari;

