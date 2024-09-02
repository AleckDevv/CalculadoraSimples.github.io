let botoes = document.querySelectorAll(".key");
let display = document.querySelector("#display");
/* 
Variáveis para salvar os números e saber qual operação vai ser feita
*/
let primeiroValor = '';
let segundoValor = '';
let operador = '';

/* 
Variável para saber o valor atual da operação.
Se é os processos do primeiro número ou do segundo
*/
let valorAtual = 1;

let atualizaDisplay = () => {
    if (primeiroValor === '') {
        /* verificando se o primeiro valor está vazio
        se estivert vazio, significa dizer que o usuário ainda não digitou um valor
        ou limpiu a operação */
        display.innerHTML = '0';
        /* 
        e se não tem nada, coloca um zero na tela
        */
    } else {
        /* 
        caso o primeiro valor esteja prenchido, exibe as informações
        */
        display.innerHTML = primeiroValor + operador + segundoValor;
    }
};

/* 
Função para resetar os valores
*/
let resetarCalculadora = () => {
    primeiroValor = '';
    segundoValor = '';
    operador = '';
    valorAtual = 0;
};


/* 
Função para calcular o resultado
*/
let calcular = (primeiro, operacao, segundo) => {
    primeiro = parseFloat(primeiro);
    segundo = parseFloat(segundo);

    switch (operacao) {
        case '÷':
            return primeiro / segundo
        case '×':
            return primeiro * segundo
        case '-':
            return primeiro - segundo
        case '+':
            return primeiro + segundo;
        default:
            return 0;
    };
};

/* 
Evento de loop para adicionar uma verificação em cada botão
e saber qual o número está sendo clicado e qual a operação está sendo feita
*/
botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        let valorBotao = botao.innerHTML;
        // console.log(botao.innerHTML);
        switch (valorBotao) {
            case 'c':
                resetarCalculadora();
                break;
            case '+':
            case '×':
            case '÷':
            case '-':
                operador = valorBotao;
                valorAtual = 2;
                break;

            case '.':
                /* 
                lógica para o ponto decimal usando a expressão de negação para inverter ao valor
                se é true passa a ser false
                se é false passa a ser true
                */
                if (valorAtual === 1 && primeiroValor !== '' && !primeiroValor.includes('.')) {
                    primeiroValor += '.';
                } else if (valorAtual === 2 && segundoValor !== '' && !segundoValor.includes('.')) {
                    segundoValor += '.';
                };
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (valorAtual === 1) {
                    primeiroValor += valorBotao;
                } else if (valorAtual === 2) {
                    segundoValor += valorBotao;
                };
                break;
            case '=':
                if (valorAtual === 2 && segundoValor != '') {
                    let resultado = calcular(primeiroValor, operador, segundoValor);
                    resetarCalculadora();
                    primeiroValor = resultado;
                };
                break;
        };

        atualizaDisplay();
    });
});