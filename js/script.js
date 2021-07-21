// DADOS

var itensArmazenados = JSON.parse(localStorage.getItem('armazenamentoItens'))  || Array()

function adicionarItem (item) {
    itensArmazenados.push(item)
    localStorage.setItem('armazenamentoItens', JSON.stringify(itensArmazenados))
}

function inserirItemHtml (item) {
    var elementoListaFilmes = document.getElementById('filmes_lista')
    var elementoListaSeries = document.getElementById('series_lista')

    var itemNode = document.createElement('li')
    var labelNode = document.createElement('label')
    var inputNode = document.createElement('input')
    var spanNode = document.createElement('span')

    spanNode.innerText = item.nome
    inputNode.type = 'checkbox'
    labelNode.appendChild(inputNode)
    labelNode.appendChild(spanNode)
    itemNode.appendChild(labelNode)
    
    if (item.categoria === 'filme') {
        elementoListaFilmes.appendChild(itemNode)
    } else {
        elementoListaSeries.appendChild(itemNode)
    }
}

function inserirItensArmazenadosNoHtml () {
    itensArmazenados.forEach(function(itemAtual) {
        inserirItemHtml(itemAtual)
    })
}


// FORMULARIO
var form = document.getElementById("formulario_informacoes")

function EnviarFormulario(evento) {
    evento.preventDefault()

    var nome = document.getElementById('cabecalho_campo_texto').value
    var categoria = document.querySelector('input[name=categoria]:checked').value

    var itemDoFormulario = {
        nome: nome,
        categoria: categoria
    }

    adicionarItem(itemDoFormulario)
    inserirItemHtml(itemDoFormulario)

    document.getElementById('cabecalho_campo_texto').value = ''
}

form.addEventListener("submit", EnviarFormulario)

inserirItensArmazenadosNoHtml()