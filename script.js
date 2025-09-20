let form;

let txt1;
let txt2;
let txt3;
let txt4;
let sel;
let area;
let txtSenha;
let txtConfirmacao;

let val1;
let val2;
let val3;
let val4;
let valSel;
let valArea;
let valSenha;
let valConfirmacao;

let btnTestar;
let btnLimpar;

let camposValidacao;

function iniciar() {

    form = document.getElementById( "formulario" );

    txt1 = document.getElementById( "txt1" );
    txt2 = document.getElementById( "txt2" );
    txt3 = document.getElementById( "txt3" );
    txt4 = document.getElementById( "txt4" );
    sel = document.getElementById( "sel" );
    area = document.getElementById( "area" );
    txtSenha = document.getElementById( "txtSenha" );
    txtConfirmacao = document.getElementById( "txtConfirmacao" );

    val1 = document.getElementById( "val1" );
    val2 = document.getElementById( "val2" );
    val3 = document.getElementById( "val3" );
    val4 = document.getElementById( "val4" );
    valSel = document.getElementById( "valSel" );
    valArea = document.getElementById( "valArea" );
    valSenha = document.getElementById( "valSenha" );
    valConfirmacao = document.getElementById( "valConfirmacao" );

    btnTestar = document.getElementById( "btnTestar" );
    btnLimpar = document.getElementById( "btnLimpar" );

    camposValidacao = [
        { campo: txt1, div: val1, valueMissing: "preenche ai, pô!" },
        { campo: txt2, div: val2, typeMismatch: "é pra entrar com um e-mail..." },
        { campo: txt3, div: val3, patternMismatch: "o padrão tá errado...", valid: "ok!", valueMissing: "preenche ai!" },
        { campo: txt4, div: val4, valid: "valido ié ié :D" },
        { campo: sel, div: valSel },
        { campo: area, div: valArea },
        { campo: txtSenha, div: valSenha },
        { campo: txtConfirmacao, div: valConfirmacao, igualA: { campo: txtSenha, mensagem: "As senhas não coincidem!" } },
    ];

    btnTestar.addEventListener( "click", event => {
        if ( validarFormulario( form, camposValidacao ) ) {
            console.log( "ok!" );
        } else {
            console.log( "erro!" );
        }
    });

    btnLimpar.addEventListener( "click", event => {
        limparFormulario( form, camposValidacao );
    });

    configurarValidacaoCamposAoMudarEstado( camposValidacao );

}


/**
 * Configura as mensagens de validação dos campos de formulário a cada interação
 * do usuário.
 * 
 * @example
 * const campos = [
 *   { campo: emailInput, div: emailDiv, typeMismatch: "Email inválido" },
 *   { campo: nomeInput, div: nomeDiv, valueMissing: "Nome obrigatório" }
 * ];
 * configurarValidacaoCamposAoMudarEstado(campos);
 * 
 * @param {Array<{campo: HTMLElement, div: HTMLElement, valueMissing?: string, typeMismatch?: string, patternMismatch?: string, valid?: string, tooLong?: string, tooShort?: string, rangeOverflow?: string, rangeUnderflow?: string}>} camposValidacao
 * um array de itens de validação, compostos por um campo que é um componente de
 * formulário e uma div onde será configurada a mensagem de validação. Cada item
 * de validação pode também ser configurado com uma ou mais mensagens
 * personalizadas para serem usadas na exibição do status da validação daquele
 * componente, sendo elas:
 *     - patternMismatch: padrão inválido
 *     - tooLong: muito longo (maior que maxlength)
 *     - tooShort: muito curto (menor que minlength)
 *     - rangeOverflow: valor maior (maior que max)
 *     - rangeUnderflow: valor menor (menor que min)
 *     - typeMismatch: o tipo não bate (url, email etc)
 *     - valid: se o campo é válido
 *     - valueMissing: se o campo for obrigatório (required)
 */
export function configurarValidacaoCamposAoMudarEstado( camposValidacao ) {

    camposValidacao.forEach( item => {

        if ( !item.campo || !item.div ) {
            console.warn( "Campo ou div não encontrados:", item );
            return;
        }
        
        item.campo.addEventListener( "input", event => {
            configurarMensagemValidacao( item );
            configurarMensagemValidacaoCustomizada( item );
        });

        item.campo.addEventListener( "blur", event => {
            configurarMensagemValidacao( item );
            configurarMensagemValidacaoCustomizada( item );
        });

    });

}

/**
 * Executa a validação de um formulário. Primeiramente, limpa todas as mensagens
 * de erro e posteriormente executa a verificação usando a Constraint Validation API nativa.
 * 
 * @example
 * if ( validarFormulario( camposValidacao ) ) {
 *     // Formulário válido - pode enviar
 * } else {
 *     // Há erros - mensagens já foram exibidas
 * }
 * 
 * @param {Array<{campo: HTMLElement, div: HTMLElement, valueMissing?: string, typeMismatch?: string, patternMismatch?: string, valid?: string, tooLong?: string, tooShort?: string, rangeOverflow?: string, rangeUnderflow?: string}>} camposValidacao
 * um array de itens de validação, compostos por um campo que é um componente de
 * formulário e uma div onde será configurada a mensagem de validação. Cada item
 * de validação pode também ser configurado com uma ou mais mensagens
 * personalizadas para serem usadas na exibição do status da validação daquele
 * componente, sendo elas:
 *     - patternMismatch: padrão inválido
 *     - tooLong: muito longo (maior que maxlength)
 *     - tooShort: muito curto (menor que minlength)
 *     - rangeOverflow: valor maior (maior que max)
 *     - rangeUnderflow: valor menor (menor que min)
 *     - typeMismatch: o tipo não bate (url, email etc)
 *     - valid: se o campo é válido
 *     - valueMissing: se o campo for obrigatório (required)
 * 
 * @returns {boolean} Verdadeiro se o formulário for válido, falso caso contrário.
 */
export function validarFormulario( form, camposValidacao ) {

    limparMensagensValidacao( form, camposValidacao );
    configurarMensagensValidacaoCustomizada( camposValidacao );

    if ( !form.checkValidity() ) {
        form.classList.add( "was-validated" );
        configurarMensagensValidacao( camposValidacao );
        return false;
    }

    return true;

}

/**
 * Limpa o formulário, resetando todos os componentes e limpando as mensagens
 * de validação.
 * 
 * @param {*} form O formulário.
 * @param {*} camposValidacao Os campos de validação caso o formulário possua campos que precisam ser validados.
 */
export function limparFormulario( form, camposValidacao = null ) {
    if ( camposValidacao ) {
        limparMensagensValidacao( form, camposValidacao );
    }
    form.reset();
}

/**
 * Configura as mensagens de validação de campos de formulário.
 * É a versão antiga, não deve ser usada.
 * 
 * @param {*} camposValidacao Os campos que serão configurados.
 */
export function configurarMensagensValidacaoAntigo( camposValidacao ) {
    camposValidacao.forEach( item => {
        if ( !item.campo.valid ) {
            item.div.innerHTML = item.campo.dataset.mensagemAdicional ? item.campo.dataset.mensagemAdicional : item.campo.validationMessage;
        }
        item.campo.dataset.mensagemAdicional = "";
    });
}

/**
 * Configura as mensagens de validação de um conjunto de campos de formulário
 * em suas respectivas divs.
 * 
 * @param {Array<{campo: HTMLElement, div: HTMLElement, valueMissing?: string, typeMismatch?: string, patternMismatch?: string, valid?: string, tooLong?: string, tooShort?: string, rangeOverflow?: string, rangeUnderflow?: string}>} camposValidacao
 * um array de itens de validação, compostos por um campo que é um componente de
 * formulário e uma div onde será configurada a mensagem de validação. Cada item
 * de validação pode também ser configurado com uma ou mais mensagens
 * personalizadas para serem usadas na exibição do status da validação daquele
 * componente, sendo elas:
 *     - patternMismatch: padrão inválido
 *     - tooLong: muito longo (maior que maxlength)
 *     - tooShort: muito curto (menor que minlength)
 *     - rangeOverflow: valor maior (maior que max)
 *     - rangeUnderflow: valor menor (menor que min)
 *     - typeMismatch: o tipo não bate (url, email etc)
 *     - valid: se o campo é válido
 *     - valueMissing: se o campo for obrigatório (required)
 */
export function configurarMensagensValidacao( camposValidacao ) {
    camposValidacao.forEach( item => {
        configurarMensagemValidacao( item );
    });
}

/**
 * Configura as mensagens de validação customizadas para um conjunto de campos
 * de formulário.
 * 
 * @param {*} camposValidacao 
 */
export function configurarMensagensValidacaoCustomizada( camposValidacao ) {
    camposValidacao.forEach( item => {
        configurarMensagemValidacaoCustomizada( item );
    });
}

/**
 * Limpa as mensagens de validação de um conjunto de campos de formulário
 * de suas respectivas divs.
 * 
 * @param {Array<{campo: HTMLElement, div: HTMLElement, valueMissing?: string, typeMismatch?: string, patternMismatch?: string, valid?: string, tooLong?: string, tooShort?: string, rangeOverflow?: string, rangeUnderflow?: string}>} camposValidacao
 * um array de itens de validação, compostos por um campo que é um componente de
 * formulário e uma div onde será configurada a mensagem de validação. Cada item
 * de validação pode também ser configurado com uma ou mais mensagens
 * personalizadas para serem usadas na exibição do status da validação daquele
 * componente, sendo elas:
 *     - patternMismatch: padrão inválido
 *     - tooLong: muito longo (maior que maxlength)
 *     - tooShort: muito curto (menor que minlength)
 *     - rangeOverflow: valor maior (maior que max)
 *     - rangeUnderflow: valor menor (menor que min)
 *     - typeMismatch: o tipo não bate (url, email etc)
 *     - valid: se o campo é válido
 *     - valueMissing: se o campo for obrigatório (required)
 */
export function limparMensagensValidacao( form, camposValidacao ) {

    form.classList.remove( "was-validated" );

    try {
        camposValidacao.forEach( item => {
            if ( !item.campo || !item.div ) {
                console.warn( "Campo ou div não encontrados:", item );
                return;
            }
            item.campo.setCustomValidity( "" );
            item.campo.removeAttribute( "aria-invalid" );
            item.div.innerHTML = "";
        });
    } catch ( error ) {
        console.error( "Erro ao limpar mensagens de validação:", error );
    }

}

/**
 * Configura a mensagem de validação de um campo de formulário em uma div.
 * 
 * Se o campo for válido e houver mensagem de sucesso configurada (propriedade 'valid'),
 * ela será exibida. Caso contrário, a div ficará vazia.
 * 
 * Para campos inválidos, prioriza mensagens personalizadas sobre a mensagem
 * padrão do navegador (validationMessage).
 * 
 * Automaticamente gerencia atributos ARIA para acessibilidade:
 * - aria-invalid="true" para campos inválidos
 * - aria-describedby conecta o campo com a mensagem de erro
 * 
 * @param {{campo: HTMLElement, div: HTMLElement, valueMissing?: string, typeMismatch?: string, patternMismatch?: string, valid?: string, tooLong?: string, tooShort?: string, rangeOverflow?: string, rangeUnderflow?: string}} item
 * um item de validação, composto por um campo que é um componente de
 * formulário e uma div onde será configurada a mensagem de validação. Cada item
 * de validação pode também ser configurado com uma ou mais mensagens
 * personalizadas para serem usadas na exibição do status da validação daquele
 * componente, sendo elas:
 *     - patternMismatch: padrão inválido
 *     - tooLong: muito longo (maior que maxlength)
 *     - tooShort: muito curto (menor que minlength)
 *     - rangeOverflow: valor maior (maior que max)
 *     - rangeUnderflow: valor menor (menor que min)
 *     - typeMismatch: o tipo não bate (url, email etc)
 *     - valid: se o campo é válido
 *     - valueMissing: se o campo for obrigatório (required)
 */
function configurarMensagemValidacao( item ) {

    try {

        const campo = item.campo;
        const div = item.div;

        if ( !campo || !div ) {
            console.warn( "Campo ou div não encontrados:", item );
            return;
        }
        
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

            campo.setAttribute( "aria-invalid", "true" );
            campo.setAttribute( "aria-describedby", div.id );

        } else {
            campo.removeAttribute( "aria-invalid" );
            div.innerHTML = item.valid || "";
        }

    } catch ( error ) {
        console.error( "Erro ao configurar mensagem de validação:", error );
    }

}

/**
 * Configura validações customizadas para um campo de formulário.
 * 
 * Atualmente suporta:
 *  - igualA: verifica se o valor de um campo é igual ao valor de outro campo.
 * 
 * @param {Object} item Item de validação com propriedades customizadas
 */
function configurarMensagemValidacaoCustomizada( item ) {

    const campo = item.campo;
    const div = item.div;

    if ( !campo || !div ) {
        console.warn( "Campo ou div não encontrados:", item );
        return;
    }

    // validação customizada para campos com o mesmo valor
    if ( item.igualA ) {

        if ( campo.value !== item.igualA.campo.value ) {
            
            const mensagem = item.igualA.mensagem || "Os valores não coincidem.";
            
            campo.setCustomValidity( mensagem );

            campo.setAttribute( "aria-invalid", "true" );
            campo.setAttribute( "aria-describedby", div.id );

            div.innerHTML = mensagem;

        } else {
            campo.setCustomValidity( "" );
            campo.removeAttribute( "aria-invalid" );
            div.innerHTML = item.valid || "";
        }

    }

}

iniciar();