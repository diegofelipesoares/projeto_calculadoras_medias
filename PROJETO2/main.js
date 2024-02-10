// recuperando informação do formulário
const form = document.getElementById('form-atividade');

//constantes para conter os emojis
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';

//Criando arrays para calcular a média
const atividades = [];
const notas = [];

// constantes para incluir no HTML um span que será utilizado na function atualizarMediaFinal ( )
// o span incluído usa as duas classes CSS .resultado e .aprovado
const spanAprovado = '<span class="resultado aprovado"> Aprovado </span>';
const spanReprovado = '<span class="resultado reprovado"> Reprovado </span>';


//variável iniciada para agrupar cada linha criada
//ela não pode ficar dentro da função, pois resetaria o conteúdo concatenado,...
//... sempre que apertasse o botão submit
let linhas = "";


//e retirar a padronização defaut de limpar tela
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    //puxando as funções para executar no evento de submit
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){
    //capturando os campos do formulário
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    //verificando se a atividade a ser incluída existe no array
    //para fazer essa verificação usamos a função includes()
    if(atividades.includes(inputNomeAtividade.value)){
       alert(`A atividade: ${inputNomeAtividade.value} já foi cadastrada`);
    } else {
        //incluindo informações capturadas nos arrays
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        //Criando uma variável para linha na tabela
            //Vamos adicionar o código da tabela dentro da linha
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value} </td>`;
        linha += `<td>${inputNotaAtividade.value} </td>`;
            //conter um if, true representado com ? e else representado :
        linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado} </td>`;
        linha += '</tr>';

        //concatenção (o que tem em linhas + o que tem na linha)
        linhas += linha;
    }

    //Limpando campos ao submeter (clicar no botão)
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela( ){
    // vamos adicionar essa tabela dentro do HTML
    //selecionamos a tag que o conteúdo será adicionado dentro;
    const corpoTabela = document.querySelector('tbody');
    //agora vamos adicionar o conteúdo de linha dentro do tbody
    corpoTabela.innerHTML = linhas;
}


//função para realizar a calculo da média
function calculaMediaFinal(){

    //criando variável para ter a soma das notas
    let somaDasNotas = 0;

    //for para percorrer o array e somar as notas existentes.
    for (let i=0; i < notas.length; i++) {
    //Array notas tem 3 elementos, indice 0, 1, 2
    //pergunta 0 > 3 então soma 0 ao valor do array[0]
    somaDasNotas += notas[i]; 
    //notas[i] determina o nr do indice do dado que está no array
    }
    
    //calcular média (soma/quantidade)
    return somaDasNotas / notas.length;
}

// Função de atualização da média no HTML
function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();
 
    //recupera a tag e altera o seu valor.
    document.getElementById("media-final-valor").innerHTML = mediaFinal;
    // utilizando no ternário as constantes com os spans
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= 7 ? spanAprovado : spanReprovado;
 
 }