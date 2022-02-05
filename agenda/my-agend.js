var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var divMensagemErro = document.getElementById('mensagemErro');

function mostrarNovoEvento() {
	novoEvento.classList.remove('d-none');
}

function ocultarNovoEvento() {
	
	novoEvento.classList.add('d-none');
}

function novoEventoValido(nomeEvento, dataEvento) {
	var validacaoOk = true;
	var erro = '';
	if (nomeEvento.trim().length === 0) {
		erro = 'O nome do evento é obrigatório!';
		inputNomeEvento.classList.add('is-invalid');
		validacaoOk = false;
	} else {
		inputNomeEvento.classList.remove('is-invalid');
	}
	var timestampEvento = Date.parse(dataEvento);
	var timestampAtual = (new Date()).getTime();
	if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
		if (erro.length > 0) {
			erro += '<br>'
		}
		erro += 'A data do evento é obrigatória e deve estar no futuro!';
		inputDataEvento.classList.add('is-invalid');
		validacaoOk = false;
	} else {
		inputDataEvento.classList.remove('is-invalid');
	}

	if (!validacaoOk) {
		divMensagemErro.innerHTML = erro;
		divMensagemErro.classList.remove('d-none');
	} else {
		divMensagemErro.classList.add('d-none');
	}

	return validacaoOk;
}

function addEvent(nomeEvento, dataEvento) {
	var tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];

	var newRow   = tableRef.insertRow(tableRef.rows.length);

	var newCell  = newRow.insertCell(0);

	var newText  = document.createTextNode(dataEvento);

	newCell.appendChild(newText);

	var newCell  = newRow.insertCell(1);

	var newText  = document.createTextNode(nomeEvento);

	newCell.appendChild(newText);
}

function salvarNovoEvento(event) {
	event.preventDefault();
	var nomeEvento = inputNomeEvento.value;
	var dataEvento = inputDataEvento.value;
	if (novoEventoValido(nomeEvento, dataEvento)) {
		console.log('Evento é válido!');
		addEvent(nomeEvento, dataEvento);
	} else {
		console.log('Evento é inválido!');
	}
}


buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);