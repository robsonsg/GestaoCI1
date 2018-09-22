biView = function(){
    this.iniciar = function(){
        if(window.location.href.indexOf("bi") > -1){
        bi.instanciaElementos();
        setTimeout(function(){
            bi.carregaDropDownColunas();
            bi.carregaColunasCadastradas();
        },500)
        bi.formularioCamposObrigatorios();
        }
    };

    // var arra = ["tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Familia",
    // "tab_Cidadao_Familia",
    // "tab_Cidadao_Familia",
    // "tab_Cidadao_Familia",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Documentos",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao",
    // "tab_Cidadao",
    // "tab_Cidadao_Mobilidade",
    // "tab_Cidadao",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao",
    // "tab_Cidadao_Saude",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Cidadao_Domicilio",
    // "tab_Auditoria",
    // "tab_Auditoria",
    // "tab_Auditoria",
    // "tab_Auditoria",
    // "tab_Auditoria",
    // "tab_Auditoria",
    // "tab_Auditoria"];



    this.carregaDropDownColunas = function(){
        $.ajax({
            async:false,
            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/tabela?tabela=gciSmartPoint",
            success:function(response){
                var w_colunas = response.data[0].COLUNAS;
                var str = "<option value=''>Selecione</option>";
                for (w_coluna in w_colunas){
                    str = str + "<option data-bi-titulo='"+w_colunas[w_coluna].TITULO+"' value='"+w_colunas[w_coluna].COL_NOME+"'>"+w_colunas[w_coluna].DESCRICAO+"</option>";
                };
                $("#slctCarregaColunas").append(str);
            }
        });
    };

    this.carregaColunasCadastradas = function(){
        $("#bi-render-table tbody").empty();
        $.ajax({
            async:false,
            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=dmobjetotp=7",
            success:function(responsePai){
                
                if(responsePai.data.length == 0){
                    
                };

                for(i in responsePai.data){
                    var bostatus = responsePai.data[i].boativo == "True" ? "Ativo" : "Ativo";
                    var boStatusLinha = responsePai.data[i].boativo == "False" ? "tr-bi-desabilitar" : "";
                    str = "<tr class='"+boStatusLinha+"'>\
                        <td data-id='"+responsePai.data[i].id+"'>"+responsePai.data[i].caobjeto+"</td>\
                        <td>"+responsePai.data[i].anobjeto+"</td>\
                        <td>"+responsePai.data[i].anobj1+"</td>\
                        <td class='bi-render-table-coluna-"+i+"'></td>\
                        <td class='text-center'>"+bostatus+"</td>\
                        <td class='text-center'>\
                            <a data-bi-id='"+responsePai.data[i].id+"' data-ca-obj='"+responsePai.data[i].caobjeto+"' class='btn btn-sm btn-light btn-edit-consulta'><i class='fa fa-edit'></i> Editar Relat&oacute;rio</a>\
                            <a data-ca-obj='"+responsePai.data[i].caobjeto+"' class='text-light btn-ver-report btn btn-sm btn-dark'><i class='fa fa-eye'></i> Ver Consulta</a>\
                        </td>\
                    </tr>";
                    

                    $("#bi-render-table tbody").append(str);

                    //FILHOS
                    $.ajax({
                        async:false,
                        method:"get",
                        url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=dmobjetotp=3 and id_ref="+responsePai.data[i].id,
                        success:function(responseFilhos){
                            if(responseFilhos.anErro == null || responseFilhos.anErro == "null"){
                                for(j in responseFilhos.data){
                                    if(responseFilhos.data[j].boativo == 0 || responseFilhos.data[j].boativo == "0"){
                                        var strStyle = " bg-danger text-light ";
                                    }else{
                                        var strStyle = " bg-success text-light ";
                                    }
                                    if($.trim(responseFilhos.data[j].caobjeto) != "Selecione"){
                                        var strColunas = "<span style='"+strStyle+"' data-bi-coluna-id='"+ responseFilhos.data[j].caobjeto +"' class='badge " +  strStyle + " m-1 p-1'>"+ responseFilhos.data[j].anobjeto +"</span>";
                                        $(".bi-render-table-coluna-"+i+"").append(strColunas);
                                    }
                                    if(j == responseFilhos.data.length - 1){
                                        
                                    }
                                }   
                            }else{
                                $(".bi-render-table-coluna-"+i+"").append(responseFilhos.anErro);
                            }
                        }
                    });
                }
            }
        })      
    };

    this.instanciaElementos = function(){
        $(document).on({
            change:function(){
                var $this = $(this).val();
                if($this != ""){
                    $(this).closest("tr").find(".slctCarregaColunas option").hide();
                    // $(this).closest("tr").find(".slctCarregaColunas option[data-tabela='"+$this+"']").show();
                }else{
                    $(this).closest("tr").find(".slctCarregaColunas option").show();
                }
            }
        },".bi-tabelas")

        $(document).on({
            click:function(){
                $.ajax({
                    url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=caobjeto=\"" + $(this).attr("data-ca-obj") + "\"",
                    method:"get",
                    success:function(response){
                        w_table= "<div class='ml-5 mr-5' style='width:90%' id='table-result'><h4 class='pt-3 pb-3 mt-4 border-bottom'>" + response.data[0].anobj1 + " - " + response.data[0].anobjeto + "</h4>";
                        $("#table-result").remove();
                        $.ajax({
                            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=id_ref=\"" + response.data[0].id + "\"",
                            method:"get",
                            success:function(res_colunas){
                                var w_colunas = [];
                                var w_colunas_str = "";
                                var w_colunas_nome = [];
                                for(var i = 0;i < res_colunas.data.length;i++){
                                    w_colunas.push(res_colunas.data[i].caobjeto);
                                    w_colunas_str += res_colunas.data[i].caobjeto + ",";
                                    w_colunas_nome.push(res_colunas.data[i].anobjeto);
                                }
                                w_colunas_str = w_colunas_str.substr(0, w_colunas_str.length-1);

                                $.ajax({
                                    url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=gciSmartPoint&colunas="+w_colunas_str,
                                    method:"get",
                                    success:function(res){
                                        w_table += "<table class='table table-striped table-bordered'>";
                                        w_table += "<thead class='table-dark'>";
                                        w_table += "<tr>";
                                        for(w_th in w_colunas_nome){
                                            w_table += "<th>" + w_colunas_nome[w_th] + "</th>";
                                        }
                                        w_table += "</tr>";
                                        w_table += "<tbody>";
                                        for(w_tr in res.data){
                                            w_table += "<tr>" 
                                                for(w_td in res.data[w_tr]){
                                                    w_table += "<td>" + res.data[w_tr][w_td] + "</td>"
                                                }
                                            w_table += "</tr>";
                                        }
                                        w_table += "</tbody>";
                                        w_table += "</table></div>";
                                        
                                        $("body").append(w_table)
                                    }

                                })
                                
                            }
                        })
                    }
                })
            }
        },".btn-ver-report")

        //CLICK EM REMOVER
        $(document).on({
            click:function(){
                bi.removerConsulta($(this).attr("data-bi-id"));
            }
        },"#btnExcluirConsultas")

        //CLICK EM EDITAR
        $(document).on({
            click:function(){
                $("#table-result").remove()
                bi.editarConsulta(this, $(this).attr("data-bi-id"), $(this).attr("data-ca-obj"))
            }
        },".btn-edit-consulta");

        //CLICK NO BOTAO DE REMOVER COLUNAS
        $(document).on({
            click:function(){
                window.idItem = $(this).attr("data-id");
                var $this =  $(this);
                if($(this).attr("editar") == "true"){
                    var response = confirm("Deseja remover o item!");
                    if (response == true){
                        $.ajax({
                            url:'http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=id='+window.idItem,
                            method:"delete",
                            success:function(response){
                                alert("Consulta removida com sucesso!")
                                $this.closest("tr").remove();
                            }
                        })
                    }
                }else{
                    $(this).closest("tr").remove();
                }
                
            }
        },".btn-remove-bi-coluna");

        //SELECIONA O OPTION E PREENCHE O TITULO
        $(document).on({
            change:function(){
                $(this).closest("tr").find("[data-bi='anobjeto']").val($(this).find("option:selected").attr("data-bi-titulo"))
            }
        },".slctCarregaColunas")

        //CLICK NO BOTAO DE ADICIONAR COLUNAS
        $(document).on({
            click:function(){
                bi.geraColuna();
            }
        },"#btn-add-bi-coluna");

        //ENVIA FORMULARIO
        $("#btnEnviadDados").on({
            click:function(){
            // if($("#form-bi-crud").valid()){
                bi.formularioEnvia();   
            // }
            }
        });

        //CADASTRAR NOVA CONSULTA
        $("#btnCadastraConsulta").on({
            click:function(){
                $("#table-result").remove()
                $("#block-form-bi-lista").fadeOut(function(){
                    setTimeout(function(){
                    $("#block-bi-crud").fadeIn()
                    },100)
                })
            }
        });

        //CADASTRAR NOVA CONSULTA
        $("#btnListaConsultas").on({
            click:function(){
                $("#block-bi-crud").fadeOut(function(){
                    setTimeout(function(){
                    $("#block-form-bi-lista").fadeIn()
                    },100)
                })
            }
        });
    };

    this.limpaFormulario = function(){
        $("#block-form-bi-consulta-tabela tbody tr:not(#block-form-bi-consulta-tabela tbody tr:eq(0))").remove();
        $("#block-form-bi-consulta-tabela tbody input[type='text']").val("").change();
        $("#block-form-bi-consulta-tabela tbody select option:first").attr("selected","selected").change();

        $("#block-form-bi-consulta input[type='text']").val("").change();
        $("#block-form-bi-consulta select option:first").attr("selected","selected").change();
        $("[editar='true']").removeAttr("editar");
        $("[data-bi='id']").val("");

    };

    this.geraColuna = function(){
        $("#block-form-bi-consulta-tabela tbody tr:eq(0)").clone().appendTo("#block-form-bi-consulta-tabela tbody");
        $("#block-form-bi-consulta-tabela tbody tr:last input[type='hidden']").val("");
        $("#block-form-bi-consulta-tabela tbody tr:last input[type='text']").val("");
        $("#block-form-bi-consulta-tabela tbody tr:last select option:eq(0)").attr("selected","selected").change();
    };

    this.removerConsulta = function(p_caobjeto){

        window.$p_caobjeto = p_caobjeto;

        $.ajax({
            url:'http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&id='+$p_caobjeto,
            method:"delete",
            success:function(response){
                alert("Consulta removida com sucesso!")
                location.reload();
            }
        })
        
    }
    this.editarConsulta = function(el, bi_id, p_caobjeto){
        $.ajax({
            url:'http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=id='+bi_id,
            method:"get",
            success:function(responsePai){
                $("#btnExcluirConsultas").attr("data-bi-id",$(el).attr("data-bi-id")).removeClass("hide");
                $("#block-form-bi-lista").fadeOut(function(){
                    setTimeout(function(){

                        $("#block-bi-crud").fadeIn();

                        //CARREGA OBJETOS
                        window.idConsulta = responsePai.data[0].Id;
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='caobjeto']").val(responsePai.data[0].caobjeto);
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='anobjeto']").val(responsePai.data[0].anobjeto);
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='anobj1']").val(responsePai.data[0].anobj1);
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='nmobjeto']").val(responsePai.data[0].nmobjeto);
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='nmobj1']").val(responsePai.data[0].nmobj1).change();
                        $("#block-form-bi-consulta .row:eq(0) [data-bi='nmordem']").val(responsePai.data[0].nmordem); //nmOrdem
                        //boAtivo = responsePai.data[0].boAtivo.toLowerCase() == "false"?"0":"1";
                        //$("#block-form-bi-consulta .row:eq(0) [data-bi='boAtivo']").val(boAtivo).change();

                        //CARREGA FILHOS
                        $.ajax({
                            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=id_ref="+bi_id,
                            method:"get",
                            success:function(responseFilhos){
                                var $responseFilhos = responseFilhos.data;
                                if($responseFilhos.length != 0){
                                    for(var i = 1; i < $responseFilhos.length;i++){
                                        $("#btn-add-bi-coluna").trigger("click");
                                    }

                                    for(var j in $responseFilhos){
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") .btn").attr("editar","true").attr("data-id",$responseFilhos[j].id);
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='id']").val($responseFilhos[j].id);
                                        
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='caobjeto']").val($responseFilhos[j].caobjeto).change();
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") .bi-tabelas").val($("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='caobjeto'] option:checked").attr("data-tabela"));//.change();

                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='anobjeto']").val($responseFilhos[j].anobjeto)
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='nmobetoj']").val($responseFilhos[j].nmobjeto)
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='nmordem']").val($responseFilhos[j].nmordem)
                                        $("#block-form-bi-consulta-tabela tbody tr:eq("+j+") [data-bi='boativo']").val($responseFilhos[j].boativo).change();
                                    }
                                }
                            }
                        })

                    },100);
                })

            }
        })
    }

    this.formularioCamposObrigatorios =function(){
        // $("#form-bi-crud").validate({
        //     rules: {
        //         cdConsulta:{required:true},
        //         descConsulta:{required:true},
        //         titConsulta:{required:true}
        //     }
        // })
    };

    this.formularioMostraErros = function (e, validator) {
    };

    this.formularioAtualiza = function(){
        window.data = {
            "Id":idConsulta,
            "dmobjetotp":"7",
            "caobjeto":$("#block-form-bi-consulta [data-bi='caobjeto']").val(),
            "anobjeto":$("#block-form-bi-consulta [data-bi='anobjeto']").val(),
            "anobj1":$("#block-form-bi-consulta [data-bi='anobj1']").val(),
            "nmobjeto":$("#block-form-bi-consulta [data-bi='nmobjeto']").val(),
            "nmobj1":$("#block-form-bi-consulta [data-bi='nmobj1']").val(),
            "nmordem":$("#block-form-bi-consulta [data-bi='nmordem']").val(),
            "boativo":$("#block-form-bi-consulta [data-bi='boativo']").val()
        };
        
        $.ajax({
            method:"put",
            async:false,
            data:JSON.stringify(data),
            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function(response){
                //window.id_ref = response.data[0].Id;
                window.dataArray = [];
                for(var i = 0 ;i < $("#block-form-bi-consulta-tabela tbody tr").length;i++){
                    if($("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='id']").val() != ""){
                        dataArray[i] = {
                            "id":parseInt($("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='id']").val()),
                            "dmobjetotp":"3",
                            "id_ref":idConsulta,
                            "caobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='caobjeto']").val(),
                            "anobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='anobjeto']").val(),
                            "nmobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmobjeto']").val(),
                            "nmordem":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmordem']").val(),
                            "boativo":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='boativo']").val()
                        }

                        $.ajax({
                            method:"put",
                            async:false,
                            data:JSON.stringify(dataArray[i]),
                            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success:function(response){ 
                                if(response.anErro){
                                    //ARRUMAR TRATATIVA DE ERRO
                                }
                            }
                        });
                    }else{
                        dataArray[i] = {
                            "dmobjetotp":"3",
                            "id_ref":idConsulta,
                            "caobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='caobjeto']").val(),
                            "anobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='anobjeto']").val(),
                            "nmobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmobjeto']").val(),
                            "nmordem":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmordem']").val(),
                            "boativo":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='boativo']").val()
                        }

                        $.ajax({
                            method:"post",
                            async:false,
                            data:JSON.stringify(dataArray[i]),
                            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success:function(response){ 
                                if(response.anErro){
                                    //ARRUMAR TRATATIVA DE ERRO
                                }
                            }
                        });
                    }

                }
                
                alert("Consulta Cadastrada com Sucesso!")
                bi.limpaFormulario();
                $("#block-bi-crud").fadeOut(function(){
                    setTimeout(function(){
                    $("#block-form-bi-lista").fadeIn()
                    },100)
                })
                bi.carregaColunasCadastradas();
            }
        });
    }

    this.formularioSalva = function(){
        window.data = {
            "dmobjetotp":"7",
            "caobjeto":$("#block-form-bi-consulta [data-bi='caobjeto']").val(),
            "anobjeto":$("#block-form-bi-consulta [data-bi='anobjeto']").val(),
            "anobj1":$("#block-form-bi-consulta [data-bi='anobj1']").val(),
            "nmobjeto":$("#block-form-bi-consulta [data-bi='nmobjeto']").val(),
            "nmobj1":$("#block-form-bi-consulta [data-bi='nmobj1']").val(),
            "nmordem":$("#block-form-bi-consulta [data-bi='nmordem']").val(),
            "boativo":$("#block-form-bi-consulta [data-bi='boativo']").val()
        }

        $.ajax({
            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj",
            async:false,
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            method:"post",
            success:function(response){

                $.ajax({
                    url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj&where=caobjeto=\"" + $("#block-form-bi-consulta [data-bi='caobjeto']").val() +"\"",
                    async:false,
                    method:"get",
                    success:function(response_filho){
                        window.id_ref = response_filho.data[0].id;
                    }
                });

                window.dataArray = [];

                for(var i = 0 ;i < $("#block-form-bi-consulta-tabela tbody tr").length;i++){
                    if(
                        $("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='caobjeto']").val() != "" &&
                        $("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='anobj']").val() != "" 
                    ){
                        dataArray[i] = {
                            "id_ref":"" + window.id_ref + "",
                            "dmobjetotp":"3",
                            "caobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='caobjeto']").val(),
                            "anobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='anobjeto']").val(),
                            "nmobjeto":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmobjeto']").val(),
                            "nmordem":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='nmordem']").val(),
                            "boativo":$("#block-form-bi-consulta-tabela tbody tr:eq("+i+") [data-bi='boativo']").val()
                        }


                        $.ajax({
                            method:"post",
                            async:false,
                            url:"http://local.2tti.com.br:8075/Syscarerest/api/CCASE/?tabela=bi_obj",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data:JSON.stringify(dataArray[i]),
                            success:function(response){ 
                                if(response.anErro){
                                    //ARRUMAR TRATATIVA DE ERRO
                                }
                            }
                        });
                    }
                }
                
                alert("Consulta Cadastrada com Sucesso!")
                bi.limpaFormulario();
                $("#block-bi-crud").fadeOut(function(){
                    setTimeout(function(){
                    $("#block-form-bi-lista").fadeIn()
                    },100)
                })
                bi.carregaColunasCadastradas();
            }
        });
    }
    this.formularioEnvia = function(){
        if($('[editar="true"]').length > 0){
            bi.formularioAtualiza();
        }else{
            bi.formularioSalva();
        }
    }
}


var bi = new biView();

$(document).ready(function(){
    bi.iniciar();
});



                

                