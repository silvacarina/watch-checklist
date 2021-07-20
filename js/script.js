// DADOS

var itens = JSON.parse(localStorage.getItem('armazenamentoItens'))  || Array()

function adicionarItem (item) {
    itens.push(item)
    localStorage.setItem('armazenamentoItens', JSON.stringify(itens))
}

function inserirItensHtml () {
    var todosFilmesHtml = ''
    var todasSeriesHtml = ''

    itens.forEach(function(itemAtual) {
        var itemHtml = `<li>
                            <label>
                                <input type="checkbox">
                                <span>${itemAtual.nome}</span>
                            </label>
                        </li>`
        
        if (itemAtual.categoria === 'filme') {
            todosFilmesHtml = todosFilmesHtml + itemHtml
        } else {
            todasSeriesHtml = todasSeriesHtml + itemHtml
        }
    })

    document.getElementById('filmes_lista').innerHTML = todosFilmesHtml
    document.getElementById('series_lista').innerHTML = todasSeriesHtml
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
    document.getElementById('cabecalho_campo_texto').value = ''
    inserirItensHtml()
}

form.addEventListener("submit", EnviarFormulario)

inserirItensHtml()