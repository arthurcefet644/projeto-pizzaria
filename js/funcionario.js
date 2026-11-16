// ===== Funcionario.js =====
// Tarefas do funcionário: cadastro, estoque e vendas

// Lê o formulário, valida e cadastra a pizza no vetor
function cadastrarPizza() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let pizza = {}
    pizza.codigo = parseFloat(document.getElementById("cadCodigo").value)
    pizza.nome = document.getElementById("cadNome").value
    pizza.preco = parseFloat(document.getElementById("cadPreco").value)
    pizza.quantidade = parseFloat(document.getElementById("cadQuantidade").value)

    let posicaoExistente = buscarPosicaoPizza(pizzas, pizza.codigo)
    if (pizza.nome == "") {
        exibirMensagem("Informe o nome da pizza!", "erro")
    } else if (!((pizza.codigo > 0) && (pizza.codigo % 1 == 0))) {
        exibirMensagem("O código deve ser um inteiro maior que zero!", "erro")
    } else if (!(pizza.preco > 0)) {
        exibirMensagem("O preço deve ser maior que zero!", "erro")
    } else if (!((pizza.quantidade >= 0) && (pizza.quantidade % 1 == 0))) {
        exibirMensagem("A quantidade deve ser um inteiro maior ou igual a zero!", "erro")
    } else if (posicaoExistente != -1) {
        exibirMensagem("Pizza já cadastrada!", "erro")
    } else {
        pizzas[pizzas.length] = pizza
        localStorage.setItem('pizzas', JSON.stringify(pizzas))

        exibirMensagem("Pizza cadastrada com sucesso!", "sucesso")

        document.getElementById("cadCodigo").value = ""
        document.getElementById("cadNome").value = ""
        document.getElementById("cadPreco").value = ""
        document.getElementById("cadQuantidade").value = ""
        atualizarSelectPizzas()
    }
}

// Mostra na tabela todas as pizzas cadastradas
function consultarEstoque() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let cabecalho = document.getElementById("cabecalho")
    let corpo = document.querySelector('#tabelaPizzas tbody')
    corpo.innerHTML = ""
    if (pizzas.length > 0) {
        cabecalho.style.display = "table-header-group"
        for (let i = 0; i < pizzas.length; i++) {
            let novaLinha = corpo.insertRow()
            novaLinha.insertCell(0).innerText = pizzas[i].codigo
            novaLinha.insertCell(1).innerText = pizzas[i].nome
            novaLinha.insertCell(2).innerText = pizzas[i].preco
            novaLinha.insertCell(3).innerText = pizzas[i].quantidade
        }
    } else {
        cabecalho.style.display = "none"
        exibirMensagem("Nenhuma pizza cadastrada ainda!", "aviso")
    }
}

// Mostra na tabela só as pizzas com estoque maior que zero
function listarDisponiveis() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let cabecalho = document.getElementById("cabecalho")
    let corpo = document.querySelector('#tabelaPizzas tbody')
    let contador = 0
    corpo.innerHTML = ""
    for (let i = 0; i < pizzas.length; i++) {
        if (pizzas[i].quantidade > 0) {
            let novaLinha = corpo.insertRow()
            novaLinha.insertCell(0).innerText = pizzas[i].codigo
            novaLinha.insertCell(1).innerText = pizzas[i].nome
            novaLinha.insertCell(2).innerText = pizzas[i].preco
            novaLinha.insertCell(3).innerText = pizzas[i].quantidade
            contador++
        }
    }
    if (contador > 0) {
        cabecalho.style.display = "table-header-group"
    } else {
        cabecalho.style.display = "none"
        exibirMensagem("Nenhuma pizza disponível!", "aviso")
    }
}

// Soma uma quantidade ao estoque de uma pizza já cadastrada
function reporEstoque() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let codigo = parseFloat(document.getElementById("repCodigo").value)
    let quantidade = parseFloat(document.getElementById("repQuantidade").value)
    let posicao = buscarPosicaoPizza(pizzas, codigo)

    if (posicao == -1) {
        exibirMensagem("Esta pizza não foi cadastrada!", "erro")
    } else if (!((quantidade > 0) && (quantidade % 1 == 0))) {
        exibirMensagem("A quantidade deve ser um inteiro maior que zero!", "erro")
    } else {
        pizzas[posicao].quantidade = pizzas[posicao].quantidade + quantidade
        localStorage.setItem('pizzas', JSON.stringify(pizzas))

        exibirMensagem("Estoque reposto com sucesso!", "sucesso")

        document.getElementById("repCodigo").value = ""
        document.getElementById("repQuantidade").value = ""
        atualizarSelectPizzas()
        consultarEstoque()
    }
}

// Valida a venda, baixa o estoque e grava a venda com o CPF do cliente
function registrarVenda() {
    let pizzas = JSON.parse(localStorage.getItem('pizzas'))
    let vendas = JSON.parse(localStorage.getItem('vendas'))
    let codigoPizza = parseFloat(document.getElementById("venPizza").value)
    let quantidade = parseFloat(document.getElementById("venQuantidade").value)
    let cpf = limparCpf(document.getElementById("venCpf").value)
    let posicao = buscarPosicaoPizza(pizzas, codigoPizza)

    if (posicao == -1) {
        exibirMensagem("Selecione uma pizza!", "erro")
    } else if (!((quantidade > 0) && (quantidade % 1 == 0))) {
        exibirMensagem("A quantidade deve ser um inteiro maior que zero!", "erro")
    } else if (quantidade > pizzas[posicao].quantidade) {
        exibirMensagem("Estoque insuficiente!", "erro")
    } else if (cpf.length != 11) {
        exibirMensagem("CPF inválido!", "erro")
    } else {
        let venda = {}
        venda.codigoPizza = codigoPizza
        venda.quantidade = quantidade
        venda.cpf = cpf
        venda.valorTotal = pizzas[posicao].preco * quantidade

        pizzas[posicao].quantidade = pizzas[posicao].quantidade - quantidade
        vendas[vendas.length] = venda

        localStorage.setItem('pizzas', JSON.stringify(pizzas))
        localStorage.setItem('vendas', JSON.stringify(vendas))

        exibirMensagem("Venda registrada com sucesso!", "sucesso")

        document.getElementById("venQuantidade").value = ""
        document.getElementById("venCpf").value = ""
        atualizarSelectPizzas()
        document.getElementById("venPizza").value = "0"
    }
}