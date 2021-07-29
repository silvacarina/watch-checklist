var elementoListaFilmes = document.getElementById('filmes_lista')
var elementoListaSeries = document.getElementById('series_lista')
var elementoListaFilmesAssistidos = document.getElementById('filmes_assistidos_lista')
var elementoListaSeriesAssistidos = document.getElementById('series_assistidos_lista')
var itensArmazenados = JSON.parse(localStorage.getItem('armazenamentoItens'))  || Array()

// Armazenamento 
function adicionarItemArmazenamento (item) {
    itensArmazenados.push(item)
    localStorage.setItem('armazenamentoItens', JSON.stringify(itensArmazenados))
}

function alternarItemAssistidoArmazenamento (item) {
    var itensArmazenadosAtual = JSON.parse(localStorage.getItem('armazenamentoItens'))
    itensArmazenadosAtual.find((itemAtual) => itemAtual.nome === item.nome).jaFoiAssistido = item.jaFoiAssistido
    localStorage.setItem('armazenamentoItens', JSON.stringify(itensArmazenadosAtual))
}

// DADOS HTML
function alternarItemAssistido (item, itemNode) {
    if (item.jaFoiAssistido === true) {
        item.jaFoiAssistido = false;
        if (item.categoria === 'filme') {
            elementoListaFilmesAssistidos.removeChild(itemNode)
            elementoListaFilmes.appendChild(itemNode)
        } else {
            elementoListaSeriesAssistidos.removeChild(itemNode)
            elementoListaSeries.appendChild(itemNode)
        }
    } else {
        item.jaFoiAssistido = true;
        if (item.categoria === 'filme') {
            elementoListaFilmes.removeChild(itemNode)
            elementoListaFilmesAssistidos.appendChild(itemNode)
        } else {
            elementoListaSeries.removeChild(itemNode)
            elementoListaSeriesAssistidos.appendChild(itemNode)
        }
    }

    alternarItemAssistidoArmazenamento(item)
}

function inserirItemHtml (item) {
    var itemNode = document.createElement('li')
    var checkboxNode = document.createElement('input')
    var spanNode = document.createElement('span')

    spanNode.innerText = item.nome
    checkboxNode.type = 'checkbox'
    checkboxNode.checked = item.jaFoiAssistido
    itemNode.appendChild(checkboxNode)
    itemNode.appendChild(spanNode)

    checkboxNode.addEventListener("change", alternarItemAssistido.bind(null, item, itemNode))
    
    if (item.categoria === 'filme') {
        if (item.jaFoiAssistido === true) {
            elementoListaFilmesAssistidos.appendChild(itemNode)
        } else {
            elementoListaFilmes.appendChild(itemNode)
        }
    } else {
        if (item.jaFoiAssistido === true) {
            elementoListaSeriesAssistidos.appendChild(itemNode)
        } else {
            elementoListaSeries.appendChild(itemNode)
        }
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

    if (nome === '') {
        return
    } 

    var itemDoFormulario = {
        nome: nome,
        categoria: categoria,
        jaFoiAssistido: false
    }

    adicionarItemArmazenamento(itemDoFormulario)
    inserirItemHtml(itemDoFormulario)

    document.getElementById('cabecalho_campo_texto').value = ''
}

form.addEventListener("submit", EnviarFormulario)

inserirItensArmazenadosNoHtml()