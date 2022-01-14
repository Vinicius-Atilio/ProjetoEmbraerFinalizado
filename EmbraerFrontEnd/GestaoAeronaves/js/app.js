// Criando a função foreach, caso o javascript do browser seja desatualizado
if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
        }
    };
}

$(function() {
    aviaoListar();
});

document.getElementById("botao-gravar").addEventListener("click", ()=>{
    aviaoInsere();
});

document.getElementById("buscar").addEventListener("keyup", ()=>{
    var textoBuscado = $("#buscar").val();
    if(textoBuscado == ""){
        aviaoListar();
    }else{
        aviaoBuscar(textoBuscado);
    }
});

function aviaoInsere(){
    var param_id = 0;
    var param_marca = $(".marca").val();
    var param_nome = $(".aeronave").val();
    var param_ano = $(".ano").val();
    var param_descricao = "";
    var param_vendido = $(".vendido").val();
    var param_created = formatarDataParaString(new Date());
    var param_updated = formatarDataParaString(new Date());

    var headers = { 
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }

    var aviao = {
        id: param_id,
        nome: param_nome,
        marca: param_marca,
        ano: param_ano,
        descricao: param_descricao,
        vendido: param_vendido,
        created: param_created,
        updated: param_updated
    }

    aviao = JSON.stringify(aviao);

    $.ajax(
        {
        headers: headers,
        url: "http://localhost:8080/aeronaves/",
        data: aviao,
        success: function(){
            aviaoListar();
        },
        type: "POST"
    }
    );
}

function aviaoListar(){
    limparDadosTabela();
    
    var contadoresDeMarca = {
        countAirbus: 0,
        countBoeing: 0,
        countEmbraer: 0
    }

    var contadoresDeDecada = {
        countDecada90: 0,
        countDecada00: 0,
    }

    var contadorDeSemana ={
        estaSemana: 0
    }

    var headers = { 
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }
    
    $.ajax({
        headers: headers,
        url: "http://localhost:8080/aeronaves/",
        success: function(response){
            response.forEach(function(aviao){
                var id = aviao["id"];
                var marca = aviao["marca"];
                var modelo = aviao["nome"];
                var ano = aviao["ano"];
                var vendido = aviao["vendido"];
                var dataCreated = formatarDataParaString(parseDateDoFormatoBanco(aviao["created"])).split(" ")[0];
                var created = parseDateDoFormatoBanco(aviao["created"]);

                aviaoRenderizarLinha(id, marca, modelo, ano, vendido, dataCreated);
                contarMarcas(contadoresDeMarca, marca);
                contarDecadas(contadoresDeDecada, ano);
                contarSemana(contadorDeSemana, created);
            });
            renderizarContadores(contadoresDeMarca, contadoresDeDecada, contadorDeSemana);
        },
        type: "GET"
    });
}

function contarMarcas(contadoresDeMarca, marca){
    if(marca == "Airbus"){
        contadoresDeMarca.countAirbus ++;
    }else if(marca == "Boeing"){
        contadoresDeMarca.countBoeing ++;
    }else if(marca == "Embraer"){
        contadoresDeMarca.countEmbraer ++;
    };

    return contadoresDeMarca;
}

function contarDecadas(contadoresDeDecada, ano){
    ano = parseInt(ano);
    if (ano >= 1990 && ano <= 1999){
        contadoresDeDecada.countDecada90 ++;
    }else if(ano >= 2000 && ano <= 2009){
        contadoresDeDecada.countDecada00 ++;
    }
    return contadoresDeDecada;
}

function contarSemana(contadorDeSemana, created){
    
    if (verificarSeEhDiaDessaSemana(created)){
        contadorDeSemana.estaSemana ++;
    }
    return contadorDeSemana;
}

function renderizarContadores(contadoresDeMarca, contadoresDeDecada, contadorDeSemana){
    $(".airbus").html(contadoresDeMarca.countAirbus);
    $(".boeing").html(contadoresDeMarca.countBoeing);
    $(".embraer").html(contadoresDeMarca.countEmbraer);
    $("#decada90").html(contadoresDeDecada.countDecada90);
    $("#decada00").html(contadoresDeDecada.countDecada00);
    $("#semana").html(contadorDeSemana.estaSemana);
}

function limparDadosTabela(){
    var aviaoTabela = $(".tabela").find("tbody");
    aviaoTabela.html("");
}

function aviaoBuscar(textoBuscado){
    limparDadosTabela();
    
    var contadoresDeMarca = {
        countAirbus: 0,
        countBoeing: 0,
        countEmbraer: 0
    }

    var contadoresDeDecada = {
        countDecada90: 0,
        countDecada00: 0,
    }

    var contadorDeSemana ={
        estaSemana: 0
    }

    var headers = { 
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*"
    }

    $.ajax({
        url: "http://localhost:8080/aeronaves/find/" + textoBuscado,
        headers: headers,
        success: function(response){
            response.forEach(function(aviao){
                var id = aviao["id"];
                var marca = aviao["marca"];
                var modelo = aviao["nome"];
                var ano = aviao["ano"];
                var vendido = aviao["vendido"];
                var dataCreated = formatarDataParaString(parseDateDoFormatoBanco(aviao["created"])).split(" ")[0];
                var created = parseDateDoFormatoBanco(aviao["created"]);

                aviaoRenderizarLinha(id, marca, modelo, ano, vendido, dataCreated);
                contarMarcas(contadoresDeMarca, marca);
                contarDecadas(contadoresDeDecada, ano);
                contarSemana(contadorDeSemana, created);
            });
            renderizarContadores(contadoresDeMarca, contadoresDeDecada, contadorDeSemana);
        },
        type: "GET"
    });
}

function aviaoRenderizarLinha(id, marca, modelo, ano, vendido, created) {
    var aviaoTabela = $(".tabela").find("tbody");
    var linha = $("<tr>");
    var colunaId = $("<td>").text(id);
    var colunaMarca = $("<td>").text(marca);
    var colunaModelo = $("<td>").text(modelo);
    var colunaAno = $("<td>").text(ano);

    vendido = vendido == true ? "Vendido" : "Disponível";

    var colunaVendido = $("<td>").text(vendido);
    var colunaCreated = $("<td>").text(created);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#").attr("id", id);
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaId);
    linha.append(colunaMarca);
    linha.append(colunaModelo);
    linha.append(colunaAno);
    linha.append(colunaVendido);
    linha.append(colunaCreated);
    linha.append(colunaRemover);

    aviaoTabela.append(linha);
}

$(document).on("click", ".botao-remover", function(){
    var id = $(this).attr("id");
    aviaoRemoveDadosTabela(id);
});

function aviaoRemoveDadosTabela(id){
    $.ajax({
        url: "http://localhost:8080/aeronaves/" + id,
        success: function(){
            aviaoListar()
        },
        type: "DELETE"
    });
}

function formatarDataParaString(data){
    var formatador = Intl.DateTimeFormat("pt-BR", {dateStyle:'short', timeStyle:'long'});
    data = formatador.format(data);
    return data;
}

function verificarSeEhDiaDessaSemana(data){
    var hoje = new Date();
    var diaSemanaAtual = hoje.getDay();
    var diaSemanaDomingo = diaSemanaAtual ;
    var diaSemanaSabado = 6 - diaSemanaAtual;
    var dataDomingo = subtrairDiasEmUmaData(diaSemanaDomingo, hoje);
    var dataSabado = adicionarDiasEmUmaData(diaSemanaSabado, hoje);
    var dateFrom = formatarDataParaString(dataDomingo).split(" ")[0];
    var dateTo = formatarDataParaString(dataSabado).split(" ")[0];
    var dateCheck = formatarDataParaString(data).split(" ")[0];

    var d1 = dateFrom.split("/");
    var d2 = dateTo.split("/");
    var c = dateCheck.split("/");

    var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]); 
    var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
    var check = new Date(c[2], parseInt(c[1])-1, c[0]);

    return check >= from && check <= to;
}

function adicionarDiasEmUmaData(dias, data){
    var dataCalculada = new Date();
    var diasEmMiliSegundos = data.getTime() + (1000 * 60 * 60 * 24 * (dias));

    dataCalculada.setTime(diasEmMiliSegundos);

    return dataCalculada;
}

function subtrairDiasEmUmaData(dias, data){
    var dataCalculada = new Date();
    var diasEmMiliSegundos = data.getTime() - (1000 * 60 * 60 * 24 * (dias));

    dataCalculada.setTime(diasEmMiliSegundos);

    return dataCalculada;
}

function parseDateDoFormatoBanco(dataString){
    var data = new Date(Date.parse(dataString))

    return data;
}