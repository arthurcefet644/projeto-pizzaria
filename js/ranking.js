// ===== Ranking.js =====
// Ranking de pizzas mais e menos vendidas (usa uma matriz [código, total vendido])

// Controla o ranking: monta a matriz, ordena e mostra ("mais" ou "menos" vendidas)
function exibirRanking(opcao) {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let vendas = JSON.parse(localStorage.getItem('vendas'))
    let cabecalho = document.getElementById("cabecalhoDono")
    let corpo = document.querySelector('#tabelaDono tbody')
    let matriz = []
    cabecalho.innerHTML = ""
    corpo.innerHTML = ""
    if (pizzas.length == 0) {
        exibirMensagem("Nenhuma pizza cadastrada!", "aviso")
    } else if (vendas.length == 0) {
        exibirMensagem("Nenhuma venda foi efetuada ainda!", "aviso")
    } else {
        montarRanking(matriz, pizzas, vendas)
        ordenarRanking(matriz)
        mostrarTabelaRanking(matriz, pizzas, opcao)
    }
}

// Preenche a matriz recebida: uma linha por pizza com [código, total vendido]
function montarRanking(matriz, pizzas, vendas) {
    for (let posicao = 0; posicao < pizzas.length; posicao++) {
        let somaQuantidades = 0
        let codigoPizza = pizzas[posicao].codigo
        for (let i = 0; i < vendas.length; i++) {
            if (codigoPizza == vendas[i].codigoPizza) {
                somaQuantidades = somaQuantidades + vendas[i].quantidade
            }
        }
        matriz[posicao] = [codigoPizza, somaQuantidades]
    }
}

// Ordena as linhas da matriz pelo total vendido (crescente, bolha)
function ordenarRanking(matriz) {
    let aux = 0
    for (let j = 0; j < matriz.length; j++) {
        for (let i = 0; i < (matriz.length - 1); i++) {
            if (matriz[i][1] > matriz[i + 1][1]) {
                aux = matriz[i][1]
                matriz[i][1] = matriz[i + 1][1]
                matriz[i + 1][1] = aux
                aux = matriz[i][0]
                matriz[i][0] = matriz[i + 1][0]
                matriz[i + 1][0] = aux
            }
        }
    }
}

// Mostra as primeiras linhas da matriz ordenada ("menos" lê do começo, "mais" lê do fim)
function mostrarTabelaRanking(matriz, pizzas, opcao) {
    let cabecalho = document.getElementById("cabecalhoDono")
    let corpo = document.querySelector('#tabelaDono tbody')
    let limite = 4
    let indice = 0
    let posicao = 0
    if (matriz.length < limite) {
        limite = matriz.length
    }
    cabecalho.innerHTML = "<tr><th>Código</th><th>Nome</th><th>Unidades</th></tr>"
    cabecalho.style.display = "table-header-group"
    for (let i = 0; i < limite; i++) {
        if (opcao == "menos") {
            indice = i
        } else {
            indice = matriz.length - 1 - i
        }
        posicao = buscarPosicaoPizza(pizzas, matriz[indice][0])
        let novaLinha = corpo.insertRow()
        novaLinha.insertCell(0).innerText = matriz[indice][0]
        novaLinha.insertCell(1).innerText = pizzas[posicao].nome
        novaLinha.insertCell(2).innerText = matriz[indice][1]
    }
}