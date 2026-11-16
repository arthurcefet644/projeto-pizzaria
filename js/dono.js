// ===== Dono.js =====
// Relatórios do painel do dono: totais, reposição e histórico por CPF

// Mostra o faturamento total e a quantidade de pizzas vendidas
function exibirTotais() {
    let cabecalho = document.getElementById("cabecalhoDono")
    let corpo = document.querySelector('#tabelaDono tbody')
    let vendas = JSON.parse(localStorage.getItem('vendas'))
    let quantPizzas = 0
    let fatTotal = 0
    cabecalho.innerHTML = ""
    corpo.innerHTML = ""
    for (let i = 0; i < vendas.length; i++) {
        quantPizzas = quantPizzas + vendas[i].quantidade
        fatTotal = fatTotal + vendas[i].valorTotal
    }
    if (quantPizzas == 0) {
        exibirMensagem("Nenhuma pizza foi vendida até o momento!", "aviso")
    } else {
        cabecalho.innerHTML = "<tr><th>Faturamento total</th><th>Pizzas vendidas</th></tr>"
        cabecalho.style.display = "table-header-group"
        let novaLinha = corpo.insertRow()
        novaLinha.insertCell(0).innerText = "[ R$ " + fatTotal.toFixed(2) + " ]"
        novaLinha.insertCell(1).innerText = "[ " + quantPizzas + " ] Unidades"
    }
}

// Mostra as pizzas com estoque zerado (precisam de reposição)
function exibirReposicao() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let cabecalho = document.getElementById("cabecalhoDono")
    let corpo = document.querySelector('#tabelaDono tbody')
    let contador = 0
    cabecalho.innerHTML = ""
    corpo.innerHTML = ""
    for (let i = 0; i < pizzas.length; i++) {
        if (pizzas[i].quantidade == 0) {
            let novaLinha = corpo.insertRow()
            novaLinha.insertCell(0).innerText = pizzas[i].codigo
            novaLinha.insertCell(1).innerText = pizzas[i].nome
            novaLinha.insertCell(2).innerText = pizzas[i].quantidade
            contador++
        }
    }
    if (contador > 0) {
        cabecalho.innerHTML = "<tr><th>Código</th><th>Nome</th><th>Unidades</th></tr>"
        cabecalho.style.display = "table-header-group"
    } else {
        exibirMensagem("Nenhuma pizza necessita de reposição!", "aviso")
    }
}

// Mostra as compras de um CPF e o total gasto por ele
function exibirHistorico() {
    let vendas = JSON.parse(localStorage.getItem('vendas'))
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let cabecalho = document.getElementById("cabecalhoHistorico")
    let corpo = document.querySelector('#tabelaHistorico tbody')
    let cpf = limparCpf(document.getElementById("histCpf").value)
    let contador = 0
    let totalGasto = 0
    cabecalho.innerHTML = ""
    corpo.innerHTML = ""
    if (cpf.length != 11) {
        exibirMensagem("CPF inválido!", "erro")
    } else {
        for (let i = 0; i < vendas.length; i++) {
            if (cpf == vendas[i].cpf) {
                let posicao = buscarPosicaoPizza(pizzas, vendas[i].codigoPizza)
                let novaLinha = corpo.insertRow()
                novaLinha.insertCell(0).innerText = vendas[i].codigoPizza
                novaLinha.insertCell(1).innerText = pizzas[posicao].nome
                novaLinha.insertCell(2).innerText = vendas[i].quantidade
                contador++
                totalGasto = totalGasto + vendas[i].valorTotal
            }
        }
        if (contador > 0) {
            cabecalho.innerHTML = "<tr><th>Código</th><th>Nome</th><th>Quantidade</th></tr>"
            cabecalho.style.display = "table-header-group"
            let novaLinha = corpo.insertRow()
            let celula = novaLinha.insertCell(0)
            celula.colSpan = 3
            celula.innerText = "Total gasto: [ R$ " + totalGasto.toFixed(2) + " ]"
        } else {
            exibirMensagem("Nenhuma compra encontrada para este CPF!", "aviso")
        }
    }
}