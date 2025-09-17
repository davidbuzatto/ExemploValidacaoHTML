let form;

let txt1;
let txt2;
let txt3;
let txt4;

let val1;
let val2;
let val3;
let val4;

let btnTestar;
let btnLimpar;

let campos;

function iniciar() {

    form = document.getElementById( "formulario" );

    txt1 = document.getElementById( "txt1" );
    txt2 = document.getElementById( "txt2" );
    txt3 = document.getElementById( "txt3" );
    txt4 = document.getElementById( "txt4" );

    val1 = document.getElementById( "val1" );
    val2 = document.getElementById( "val2" );
    val3 = document.getElementById( "val3" );
    val4 = document.getElementById( "val4" );

    btnTestar = document.getElementById( "btnTestar" );
    btnLimpar = document.getElementById( "btnLimpar" );

    /**
     * patternMismatch: padrão inválido
     * tooLong: muito longo (maior que maxlength)
     * tooShort: muito curto (menor que minlength)
     * rangeOverflow: valor maior (maior que max)
     * rangeUnderflow: valor menor (menor que min)
     * typeMismatch: o tipo não bate (url, email etc)
     * valid: se o campo é válido
     * valueMissing: se o campo for obrigatório (required)
     */

    campos = [
        { campo: txt1, div: val1, valueMissing: "preenche ai po!" },
        { campo: txt2, div: val2, typeMismatch: "é pra entrar com um e-mail..." },
        { campo: txt3, div: val3, patternMismatch: "o padrão tá errado...", valid: "ok!", valueMissing: "preenche ai aien!" },
        { campo: txt4, div: val4, valid: "valido ié ié" },
    ];

    btnTestar.addEventListener( "click", event => {
        if ( verificarCampos() ) {
            console.log( "ok!" );
        } else {
            console.log( "erro!" );
        }
    });

    btnLimpar.addEventListener( "click", event => {
        form.reset();
        limparMensagensErro();
    });

    configurarCampos();

}

function configurarCampos() {
    campos.forEach( item => {
        item.campo.addEventListener( "input", event => {
            configurarMensagemErro( item );
        });
    });
}

function verificarCampos() {

    limparMensagensErro();

    if ( !form.checkValidity() ) {
        configurarMensagensErro();
        return false;
    }

    return true;

}

function configurarMensagemErro( item ) {

    const campo = item.campo;
    const div = item.div;

    if ( !campo.valid ) {
        for ( const k in campo.validity ) {
            if ( campo.validity[k] ) {
                const mensagem = item[k];
                if ( mensagem ) {
                    div.innerHTML = mensagem;
                    return;
                }
            }
        }
        div.innerHTML = campo.validationMessage;
    } else {
        div.innerHTML = "";
    }

}

function configurarMensagensErro() {
    campos.forEach( item => {
        configurarMensagemErro( item );
    });
}

function limparMensagensErro() {
    campos.forEach( item => {
        item.div.innerHTML = "";
    });
}

iniciar();