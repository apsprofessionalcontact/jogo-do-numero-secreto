/*let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Número Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número de 1 a 10';
*/
let listaDeNumerosSorteados = []; //cria uma lista
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //chama um script externo listado no html na linha 7
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Número Secreto');
    exibirTextoNaTela('p',`Escolha um número de 1 a ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute(){
    
    let chute = document.querySelector('input').value;
    console.log (numeroSecreto);

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O numero secreto é menor.');
        } else {
            exibirTextoNaTela('p','O numero secreto é maior');
        }
        tentativas++;   
        limparCampo('input');
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);//gera um novo numero aleatorio antes de testar
    let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;//guarda o tamanh atua da lista

    if (quantidadeDeNumerosEscolhidos == numeroLimite){ //se a qtd de numeros escolhidos for alcacada
        listaDeNumerosSorteados = [] // zera lista
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //se encontrar o numeroEsolhido na lista
        return gerarNumeroAleatorio(); //chama a funcao para gerar um novo numero aleatorio
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);//inclui o novo numero aleatorio escolhido na lista
        console.log(listaDeNumerosSorteados);//exibe o conteudo da lista no console
        return numeroEscolhido;
    }
}

function limparCampo(limpar){
    let campo = document.querySelector(limpar);
    campo.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo('input');
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}