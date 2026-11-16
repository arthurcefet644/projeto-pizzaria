// ===== Biblioteca.js =====
// Funções de uso geral, chamadas por mais de uma área do sistema

// Roda ao abrir a página: cria os vetores no localStorage (se ainda não existirem) e mostra a primeira tela
function iniciar() {
    if (!localStorage.pizzas) {
        let pizzas = []
        localStorage.setItem('pizzas', JSON.stringify(pizzas))
    }
    if (!localStorage.vendas) {
        let vendas = []
        localStorage.setItem('vendas', JSON.stringify(vendas))
    }
    mostrarSecao('secCadastro')
    atualizarSelectPizzas()
}

// Mostra a seção pedida, esconde as outras, marca a aba ativa e limpa o aviso
function mostrarSecao(secao) {
    let ids = ["secCadastro", "secVenda", "secEstoque", "secDono"]
    let abas = ["abaCadastro", "abaVenda", "abaEstoque", "abaDono"]
    let i = 0
    while (i < ids.length) {
        if (ids[i] == secao) {
            document.getElementById(ids[i]).style.display = "block"
            document.getElementById(abas[i]).className = "aba ativa"
        } else {
            document.getElementById(ids[i]).style.display = "none"
            document.getElementById(abas[i]).className = "aba"
        }
        i++
    }
    exibirMensagem("", "")
}

// Procura uma pizza pelo código e devolve a posição no vetor (-1 se não achar)
function buscarPosicaoPizza(pizzas, codigo) {
    let i = 0
    let posicao = -1
    let achou = false
    while ((i < pizzas.length) && (achou == false)) {
        if (pizzas[i].codigo == codigo) {
            posicao = i
            achou = true
        }
        i++
    }
    return posicao
}

// Recebe um CPF digitado (com ou sem pontuação) e devolve só os dígitos
function limparCpf(cpf) {
    let cpfLimpo = ""
    for (let i = 0; i < cpf.length; i++) {
        if ((cpf[i] >= "0") && (cpf[i] <= "9")) {
            cpfLimpo = cpfLimpo + cpf[i]
        }
    }
    return cpfLimpo
}

// Recarrega a lista de pizzas do formulário de venda (só as que têm estoque)
function atualizarSelectPizzas() {
    let select = document.getElementById("venPizza")
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    select.options.length = 1
    for (let i = 0; i < pizzas.length; i++) {
        if (pizzas[i].quantidade > 0) {
            select.add(new Option(pizzas[i].nome + " (estoque: " + pizzas[i].quantidade + ")", pizzas[i].codigo))
        }
    }
}

// Mostra um aviso no topo da página ("sucesso", "erro" ou "aviso"); texto vazio limpa o aviso
function exibirMensagem(texto, tipo) {
    let caixa = document.getElementById("mensagem")
    caixa.innerText = texto
    if (texto.length == 0) {
        caixa.className = ""
    } else if (tipo == "erro") {
        caixa.className = "aviso aviso-erro"
    } else if (tipo == "aviso") {
        caixa.className = "aviso aviso-alerta"
    } else {
        caixa.className = "aviso aviso-sucesso"
    }
}