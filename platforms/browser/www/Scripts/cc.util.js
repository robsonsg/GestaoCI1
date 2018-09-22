/* GLOBAL VARIAVEIS THREAD AJAX */
var w_ajax_thread = [];
var w_ajax_thread_index = 0;

var _ccaseUtilidades = function(){

  /* ABORT AJAX */
  this.ajaxAbort = function(){
    for(var w_thread in w_ajax_thread){
      try{
        w_ajax_thread[w_thread].abort();
        w_ajax_thread.splice(w_thread,1);
      }catch(error){
        _cc.error(error);
      }
    }
  };

  /* FUNCAO AJAX */
  this.ajax = function(p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno){
    w_ajax_thread_index ++;
    try{
      /* VARIAVEIS */
      var w_url = p_url,
      w_method = "",
      w_content_type = "",
      w_cache = "",
      w_data = "",
      w_info = _cc.string.retorna(p_info),
      w_origem = _cc.string.retorna(p_origem),
      w_deferred = $.Deferred(),
      w_dese_trace_htm = "";

      /* TRACE */
      if(_cc.string.retorna(p_data) != ""){
        w_data = p_data;
      };

      /* URL DO AJAX */
      if(w_url == "" || w_url == null){
        _cc.msg("Parâmetro: URL está faltando, na chamada do AJAX","danger", 10);
        return false;
      };

      /* VERIFICA SE HA CACHE */
      try{
        w_cache = _cc.url.parametros(w_url);
        w_cache = _cc.string.retorna(w_cache[6],1);
      }catch(error){
        _cc.error(error);
      };

      if(_cc.string.retorna(p_content_type) != ""){
        w_content_type = p_content_type;
      };

      /* METODO DO AJAX */
      if(_cc.string.retorna(p_method) == ""){
        w_method = "get";
      }else{
        w_method = p_method;
      };

      w_dese_trace_htm = "<tr>";
      /* INDEX */  w_dese_trace_htm += "<td class='text-center cc-dev-trace-line-count'></td>";
      /* BUTTN */  w_dese_trace_htm += "<td><button class='btn-xs cc-btn-verde cc-btn-trace-json'>JSON</button></td>";
      /* TIME */ w_dese_trace_htm += "<td><small>" + _cc.converteData(new Date(), "HH:mm:ss") + "</small></td>";
      /* OBJ ORIGEM */ w_dese_trace_htm += "<td>" + w_origem + "</td>";
      /* URL REST */ w_dese_trace_htm += "<td class='cc-trace-url'>" + _cc.string.replace.extraEspacos(p_url) + "</td>";
      /* METHOD */ w_dese_trace_htm += "<td>" + w_method + "</td>";
      /* INFO */ w_dese_trace_htm += "<td>" + w_info + "</td>";
      /* RETURN */ w_dese_trace_htm += "<td class='text-center text-uppercase'><small>-</small></td>";
      w_dese_trace_htm += "</tr>";

      /* VERIFICA SE A VARIAVEL DE CACHE ESTA PREENCHIDA */
      if(window[w_cache] != undefined){
        w_deferred.resolve(window[w_cache]);
      }else{
        /* AJAX */
        
        w_ajax_thread[w_ajax_thread_index] = $.ajax({
          url: w_url,
          method: w_method,
          data:w_data,
          contentType: w_content_type, 
          success: function(json_resp){
            /* TRACE */
            if(window.w_dese_bo_trace == true){
              if($("[name='cc-dev-trace-grid'] tbody tr").length == 0){
                $(w_dese_trace_htm).appendTo($("[name='cc-dev-trace-grid'] tbody"));
              }else{
                $(w_dese_trace_htm).insertBefore($("[name='cc-dev-trace-grid'] tbody tr:first"));
              };

              $(".cc-dev-trace-line-count").each(function(){
                $(this).html("<small>" + parseInt(parseInt($(this).closest("tr").index()) + 1) + "</small>");
              });
            };

            /* RETORNO POSITIVO */
            if(json_resp.cnRetorno == 0){
              if(w_cache != ""){
                window[w_cache] = json_resp;
              };
            };

            /* RESOLVE SE TRUE */
            w_deferred.resolve(json_resp);
          },
          error: function(error){
            /* TRACE */
            w_dese_trace_htm += "</tr>";
            if(window.w_dese_bo_trace == true){
              if($("[name='cc-dev-trace-grid'] tbody tr").length == 0){
                $(w_dese_trace_htm).appendTo($("[name='cc-dev-trace-grid'] tbody"));
              }else{
                $(w_dese_trace_htm).insertBefore($("[name='cc-dev-trace-grid'] tbody tr:first"));
              }
            };

            /* ERRO */
            w_deferred.reject(error);
          }
        });
      };
      return w_deferred.promise();
    }catch(error){
      _cc.error(error);
    }
  };

  this.error = function(error){
    console.log(error);
    _cc.loading.hide();
  };

  /* CRIA PROPRIEDADES  */
  this.criaPropriedade = function(p_obj_nome, p_prop, p_prop_val, p_obj_lote){

    var w_json_insert = "{\"obj_nome\" : \"" + p_obj_nome + 
    "\",\"prp_nome\" : \"" + p_prop.toUpperCase() + 
    "\",\"obj_prp_vlr\" : \"" + p_prop_val + 
    "\",\"obj_lote\" : \"" + _cc.string.retorna(p_obj_lote) + 
    "\"}";
 
    if(!_cc.retornaPropriedade(p_obj_nome, "OBJ_NOME") != ""){
      $.ajax({
        url:ccase.url.tabela + "TABELA=ccase_obj_prp",
        method:"post",
        contentType: "application/json",
        data:JSON.stringify(w_json_insert),
        success:function(p_json){
          _cc.validaResponseAjax(p_json, ccase.url.tabela + "TABELA=ccase_obj_prp");

          if(p_json.anErro == null && p_json.cnRetorno == 0){
            _cc.msg(p_json.anMensagem,"success",5);
          }else{
            _cc.msg(p_json.anMensagem,"error",15);
          };
        },
        error:function(error){
          _cc.error(error);
        }
      });
    }
  };

  /* RETORNA PROPRIEDADES */
  this.retornaPropriedade = function(p_obj_nome, p_prop){
    var w_resultado = "";
    
    $.ajax({
      url:ccase.url.consulta.propriedade + p_obj_nome,
      method:"get",
      async:false,
      success:function(json_resp){
        _cc.validaResponseAjax(json_resp, ccase.url.consulta.propriedade + p_obj_nome);

        for(var w_propridade in json_resp.data){
          if(json_resp.data[w_propridade].prp_nome.toLowerCase() == p_prop.toLowerCase()){
            w_resultado = json_resp.data[w_propridade].obj_prp_vlr;
          }
        };
      }
    });
    return w_resultado;
  };

  this.comboDB = function(p_header, p_tab, p_cols, p_titulo, p_where, p_orderby, p_return_objetos){

    /* VARIAVEIS */
    var w_array_objetos = [],
    w_header = p_header,
    w_tabela = p_tab,
    w_colunas = p_cols,
    w_th_list = w_colunas.toLowerCase().split("#"),
    w_titulo = p_titulo,
    w_titulo_list = w_titulo.split("#"),
    w_where = p_where,
    w_where_aux = "",
    w_orderby = p_orderby,
    w_return_objetos = p_return_objetos,
    w_return_objetos = w_return_objetos.split("#");

    /* FECHA MODAL PARA INICIAR OUTRO MODAL */
    _cc.modal.close()
    
    for(var w_obj in w_return_objetos){
      w_array_objetos.push(w_return_objetos[w_obj].toString().replace(/(\r\n\t|\n|\r\t)/gm,""));
    };

    if(w_where == ""){
      w_where = "boinativo <> 1";
    }else{
      w_where = w_where + " and boinativo <> 1";
    };

    $.ajax({
      url:ccase.url.tabela + "TABELA="+w_tabela+"&WHERE="+w_where+"&ORDERBY="+w_orderby,
      async:false,
      success:function(json_resp){
        _cc.validaResponseAjax(json_resp, ccase.url.tabela + "TABELA="+w_tabela+"&WHERE="+w_where+"&ORDERBY="+w_orderby)
        // $(".cc-tabela-combo-db").DataTable().destroy();

        if($("#modal-combodb").length > 0){
          $("#modal-combodb").remove();
        };

        $("<div class='p-3 d-none' id='modal-combodb' name='modal-combodb'></div>").appendTo($("body"));

        var w_table = "<h2 class='mb-3 pt-2 pb-2 border-bottom mt-3'>" + w_header + "</h2>";
        w_table += "<table class='cc-tabela-combo-db table table-sm table-hover cc-bg-branco table-striped table-bordered'>";
        w_table += "<thead class='thead-dark'>";
        w_table += "<tr>";
        for(var w_th in w_th_list){
          w_table += "<th class='text-uppercase text-center' data-th-col-nome='" + w_th_list[w_th] + "'>" + w_titulo_list[w_th] + "</th>";  
        };
        w_table += "</tr>";
        w_table += "</thead>";
        w_table += "<tbody>";

        var w_td_list = json_resp.data
        for(var w_td in w_td_list){
          w_table += "<tr>"
            var w_td_item = w_td_list[w_td];
            for(var w_index = 0; w_index < w_th_list.length;w_index++){
              w_table += "<td data-tab='"+ w_tabela + "' data-id='" + w_td_item["id"] + "' class='text-center'><a onmouseup='_cc.comboDBAttrib(this, \"" + w_array_objetos.toString() + "\")'>" + w_td_item[w_th_list[w_index]] + "</a></td>"
            }
          w_table += "</tr>"
        };

        w_table += "</tbody>";
        w_table += "</table>";

        $("#modal-combodb").html(w_table);

        _cc.modal.show("modal-combodb");
        $(".cc-tabela-combo-db").DataTable();

        var p_grd_json_datatable = {
          "iDisplayLength": -1,
          "pageLength": -1,
          "aaSorting": [],
          "ordering": true,
          "destroy":true,
          "info":false,
          "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "searchPlaceholder": "Buscar",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ <span class='cc-float-left cc-datatable-length'>resultados por página</span>",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Carregando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar A-Z",
                "sSortDescending": ": Ordenar Z-A"
            }
          }
        };

          // grid_pesquisa
        $(".cc-tabela-combo-db").DataTable(p_grd_json_datatable);

      }
    });
  };

  this.comboDBAttrib = function(p_item, p_return_objetos){
    var w_item_tabela = $(p_item).closest("td").attr("data-tab");
    var w_item_id = $(p_item).closest("td").attr("data-id");

    $.ajax({
      url:ccase.url.tabela + "TABELA="+w_item_tabela+"&WHERE=id="+w_item_id + "",
      method:"get",
      success:function(json_resp){
        var w_dados = json_resp.data[0];

        var w_objs = p_return_objetos.split(",");
        for(var w_obj in w_objs){
          var w_split_objetos = w_objs[w_obj].split(":");
          var w_obj_nome = w_split_objetos[0];
          var w_valor = w_dados[w_split_objetos[1].toLowerCase()];
          $("[name='" +  w_obj_nome.toLowerCase() + "']").val(w_valor);
        }
      }
    })
    _cc.modal.close()
  };

  this.replaceParametros = function(p_str){  
    var w_str_replace = p_str;

    if(p_str.toLowerCase().indexOf("/*[ignora]*/") == -1){
      var w_arr_str_replace_brackets_open = [];
      var w_arr_str_replace_brackets_close = [];
      var w_arr_str_replace_prop = [];

      if(_cc.string.retorna(w_str_replace).indexOf("[") == -1){
        return w_str_replace;
      };

      for(var w_char_brackets in p_str){
        if(p_str[w_char_brackets].indexOf("[") >= 0){
          w_arr_str_replace_brackets_open.push(w_char_brackets)
        };
        if(p_str[w_char_brackets].indexOf("]") >= 0){
          w_arr_str_replace_brackets_close.push(w_char_brackets)
        };
      };

      for(var w_char_bracket in w_arr_str_replace_brackets_open){
        var w_arr_str_replace_brackets_open_aux = parseInt(w_arr_str_replace_brackets_open[w_char_bracket]);
        var w_arr_str_replace_brackets_close_aux = parseInt(w_arr_str_replace_brackets_close[w_char_bracket]) - parseInt(w_arr_str_replace_brackets_open[w_char_bracket]);
        w_arr_str_replace_prop.push(p_str.substr(w_arr_str_replace_brackets_open_aux+1,w_arr_str_replace_brackets_close_aux-1));
      };

      for(var w_arr_prop in w_arr_str_replace_prop){
        if(w_arr_str_replace_prop[w_arr_prop].indexOf(".") == -1){
          // if(ccase.matriz.url_params != undefined){
          if(ccase.global.param != undefined){
            w_str_replace = w_str_replace.replace("[" + w_arr_str_replace_prop[w_arr_prop] + "]", ccase.global.param["" + w_arr_str_replace_prop[w_arr_prop] + ""])
          }else{
             w_str_replace = w_str_replace.replace("[" + w_arr_str_replace_prop[w_arr_prop] + "]", "")
          };
        }else{
          var w_val = $.trim($("[name='" + w_arr_str_replace_prop[w_arr_prop].toLowerCase() + "']:last").val());
          if(w_val == ""){w_val = "''";};
          w_str_replace = w_str_replace.replace("[" + w_arr_str_replace_prop[w_arr_prop] + "]", w_val)
        };
      };

      if(w_str_replace.indexOf("undefined") >= 0){
        w_str_replace = p_str;
      }
    }else{
      w_str_replace = p_str
    };
    return w_str_replace;
  };

  /* SE TEM APENAS UM PARAMETRO, ELE DEVOLVE QUAL E */
  this.retornaParametro = function(p_str, p_lower){
    var p_str = p_str;
    var p_str_aux = p_str;

    p_str_aux = p_str_aux.substr(p_str_aux.indexOf("[") + 1);
    p_str_aux = p_str_aux.substr(0, p_str_aux.indexOf("]"));
    if(p_lower == true){
      p_str_aux = p_str_aux.toLowerCase();
    };
    return p_str_aux;
  };

  /* REPLACE DE PARAMETROS [PARAM] PELOS VALORES */
  this.replaceConteudo = function(p_obj_nome){
    $(p_obj_nome).html(_cc.replaceParametros($(p_obj_nome).html()))
  };

  /* REPLACE POR TRACOS */
  this.replacePontosPorTracos = function(p_str){
    return p_str.split('.').join('-');
  };

  this.replaceHTMLentidades = function(p_str){
    /* VARIAVEIS */
    var w_str = p_str;
    w_str = w_str.replace(/&amp;/gi, '&');
    w_str = w_str.replace(/&lt;/gi, '<');
    w_str = w_str.replace(/&gt;/gi, '>');

    return w_str;
  };

  this.replaceAspas = function(p_str, p_tp){
    /* VARIAVEIS */
    var w_str = _cc.string.retorna(p_str);
    /* RETURN = 1 */
    /* SEND = 2 */
    if($.trim(w_str) != ""){
      if(p_tp == 1){
        if(w_str.toString().indexOf("\`") >= 0){
          w_str = w_str.replace(/\`/g, "\'");
        };
        if(w_str.toString().indexOf("\´") >= 0){
          w_str = w_str.replace(/\´/g, "\"");
        };
      }else if(p_tp == 2){
        if(w_str.toString().indexOf("\'") >= 0){w_str = w_str.replace(/'/g, "`");};
        if(w_str.toString().indexOf("\"") >= 0){w_str = w_str.replace(/\"/g, "´");};
      };
    };
    return w_str;
  };

  /* LISTENERS PARA ELEMENTOS - MONITORA */
  this.listen = function(p_event, p_el, p_eval){
    /* VARIAVEIS */
    var w_el = "",
    w_eval = "";

    if(p_el.indexOf(".") == 0){
      w_el = p_el;
    }else if(p_el.indexOf("#") == 0){
      w_el = p_el;
    }else if(p_el.indexOf("$") == 0){
      w_el = p_el.substr(1);
    }else{
      w_el = "[name='" + p_el + "']";
    };

    /* OFF BEFORE ON */
    $(document).off("" + p_event + "", "" + w_el + "");

    /* ON LISTENER */
    $(document).on("" + p_event + "", "" + w_el + "", function() {
      try{
        eval(_cc.replaceParametros(_cc.replaceAspas(p_eval, 1)));
      }
      catch(error){
        _cc.msg("<p style='color:white'>OBJETO: " + w_el + "<br>" + error.message + "</p>","danger",10)
      }
    });
  };

  /* CEP FUNCTIONS */
  this.cep = {
    listen:function(){
      /* SELECIONE ENDERECO */
      $(document).on("mouseup", ".btn-seleciona-cep", function(){
        var w_grd = _cc.string.retorna($("[name='cc-cep-resultado-tabela']").attr("data-grd-search"),1);

        var w_resp_cep = JSON.parse($(this).closest("tr").attr("data-json-cep"));
        var w_cep_cep = w_resp_cep.caCEP;
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='caendcep']").val(w_cep_cep);

        var w_cep_tp = w_resp_cep.dsLogradouroTP;
        w_cep_tp = $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='dmlogradourotp'] [data-option-text='" + _cc.string.retorna(w_cep_tp, 1) + "']").val();
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='dmlogradourotp']").val(w_cep_tp).change();

        var w_cep_logradouro = w_resp_cep.dsLogradouro;
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendlogradouro']").val(w_cep_logradouro);

        var w_cep_bairro = w_resp_cep.dsBairro;
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendbairro']").val(w_cep_bairro);

        var w_cep_cidade = w_resp_cep.dsCidade;
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendcidade']").val(w_cep_cidade);

        var w_cep_uf = w_resp_cep.caUF;
        $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anenduf']").val(w_cep_uf);
        
        _cc.modal.close()
      });

      /* BTN BUSCA CEP */
      $(document).on("mouseup","[name='cc-btn-busca-cep']",function(){  

        $("[name='cc-cep-resultado-tabela'] tbody").html();
        $("[name='modal-ccase-cep-resultados']").addClass("d-none");

        var w_an_end_logradouro = _cc.string.replace.extraEspacos($("[name='modal-ccase-cep'] [name='anendlogradouro']").val());
        var w_an_end_bairro = _cc.string.replace.extraEspacos($("[name='modal-ccase-cep'] [name='anendbairro']").val());
        var w_an_end_cidade = _cc.string.replace.extraEspacos($("[name='modal-ccase-cep'] [name='anendcidade']").val());
        var w_an_end_uf = $("[name='modal-ccase-cep'] [name='anenduf']").val();

        var w_an_end_logradouro_query = "dsLogradouro like '" + $.trim(w_an_end_logradouro) + "%' ";
        // var w_an_end_bairro_query = "dsBairro like '" + $.trim(w_an_end_bairro) + "%' ";
        var w_an_end_cidade_query = "dsCidade like '" + $.trim(w_an_end_cidade) + "%' ";
        var w_an_end_uf_query = "caUF = '" + $.trim(w_an_end_uf) + "'";
      
        var w_cep_search = "";
        if($.trim(w_an_end_logradouro) == ""){
          _cc.msg("Preencha o campo de Logradouro", "danger", 10);
          $("[name='modal-ccase-cep'] [name='anendlogradouro']").addClass("border-danger");
          return false;
        }else if($.trim(w_an_end_logradouro).length < 3){
          _cc.msg("O campo de Logradouro precisa de no mínimo 3 letras para fazer a busca", "danger", 10);
          $("[name='modal-ccase-cep'] [name='anendlogradouro']").addClass("border-danger");
          return false;
        };

        // if(w_an_end_bairro != ''){w_an_end_bairro_query = " and " + w_an_end_bairro_query;}else{w_an_end_bairro_query = ""};
        if(w_an_end_cidade != ''){w_an_end_cidade_query = " and " + w_an_end_cidade_query;}else{w_an_end_cidade_query = ""};
        if(w_an_end_uf != ''){w_an_end_uf_query = " and " + w_an_end_uf_query;}else{w_an_end_uf_query = ""};

        // w_cep_search = w_an_end_logradouro_query + w_an_end_bairro_query + w_an_end_cidade_query + w_an_end_uf_query;
        w_cep_search = w_an_end_logradouro_query + w_an_end_cidade_query + w_an_end_uf_query;

        w_cep_search = w_cep_search.toUpperCase();
        w_cep_search = w_cep_search.replace("RUA ","");
        w_cep_search = w_cep_search.replace("PARQUE ","");
        w_cep_search = w_cep_search.replace("TRAVESSA ","");
        w_cep_search = w_cep_search.replace("AVENIDA ","");
        w_cep_search = w_cep_search.replace("ALAMEDA ","");
        w_cep_search = w_cep_search.replace("PRAÇA ","");
        w_cep_search = w_cep_search.replace("ESTRADA ","");
        w_cep_search = w_cep_search.replace("LARGO ","");
        w_cep_search = w_cep_search.replace("VIA ","");
        w_cep_search = w_cep_search.replace("RODOVIA ","");

        var w_cep_url = ccase.url.root + "TABELA=TICEP\
          &COLUNAS=cnCEP, caCEP, dsLogradouroTP, dsLogradouro, dsBairro, dsCidade, caUF\
          &WHERE=" + w_cep_search;

        window.w_dese_trace_info = "<strong class='text-primary'>FILE:</strong><br>cc.<br>";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        var w_cep_ajax = _cc.ajax(w_cep_url,"GET","","","REST: CEP",window.w_dese_trace_info,"");

        $.when(w_cep_ajax).then(
          function(json_resp){
            _cc.validaResponseAjax(json_resp, w_cep_url);
            var w_str_cep = "";
            var w_cep_list = json_resp.data;

            _ccPlugin.DataTable.destroi("cc-cep-resultado-tabela");
            $("[name='modal-ccase-cep-resultados']").removeClass("d-none");
            $("[name='modal-ccase-cep'] [name='anendlogradouro']").removeClass("border-danger");
            if(json_resp.data.length > 0){
              $("[name='modal-ccase-cep-qtde']").html(json_resp.data.length)
              
              for(var w_item in w_cep_list){
                w_str_cep += "<tr data-json-cep='" + JSON.stringify(w_cep_list[w_item]) +"'>"
                w_str_cep += "<td class='text-center'>" + w_cep_list[w_item].caCEP + "</td>"
                w_str_cep += "<td>" + w_cep_list[w_item].dsLogradouroTP + " " + w_cep_list[w_item].dsLogradouro + "</td>"
                w_str_cep += "<td>" + w_cep_list[w_item].dsBairro + "</td>"
                w_str_cep += "<td>" + w_cep_list[w_item].dsCidade + "</td>"
                w_str_cep += "<td class='text-center'>" + w_cep_list[w_item].caUF + "</td>"
                w_str_cep += "<td><button class='btn btn-sm btn-seleciona-cep cc-btn-verde'>Selecionar</button></td>"
                w_str_cep += "</tr>"
              };

              $("[name='cc-cep-resultado-tabela'] tbody").html(w_str_cep);
            }else{
              $("[name='modal-ccase-cep-qtde']").html(0)
              $("[name='cc-cep-resultado-tabela'] tbody").html("");
            };
            _ccPlugin.DataTable.cria("cc-cep-resultado-tabela");
          },
          function(error){
            _cc.error(error);
          }
        );
      });
    },
    busca:function(p_el, p_tp, p_objs_retorno){
      /* VARIAVEIS */
      var w_cep = "",
      w_tp = _cc.string.retorna(p_tp),
      w_cep_ajax,
      w_cep_url = "",
      w_obj_nome = $(p_el).attr("name").toLowerCase(),
      w_grd = _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID").toLowerCase();

      if(w_tp == "" || w_tp == "0"){

        w_cep = $("[name='" + w_obj_nome + "']").val();

        if($.trim(w_cep) == ""){
          return false;
        }else{
          w_cep = w_cep.replace("-","");
        };
      
        /* AJAX CEP */    
        w_cep_url = ccase.url.root + "TABELA=TICEP&COLUNAS=cnCEP,caCEP,dsLogradouroTP,dsLogradouro,dsBairro,dsCidade,caUF&WHERE=cnCEP=" + w_cep

        /* ATTR */
        w_cep_ajax = _cc.ajax(w_cep_url);

        $.when(w_cep_ajax).then(
          function(json_resp){
            _cc.validaResponseAjax(json_resp, w_cep_url);
            
            if(json_resp.data.length > 0){
              
              /* RESPONSE CEP */
              var w_resp_cep = json_resp.data[0];

              /* LOGRADOURO TP */
              var w_cep_logradouro_tp = w_resp_cep.dsLogradouroTP;
              if(w_cep_logradouro_tp != ""){
                w_cep_logradouro_tp = w_cep_logradouro_tp.toLowerCase();
                $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='dmlogradourotp']").val($("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='dmlogradourotp'] option[data-option-text='" + w_cep_logradouro_tp + "']").val());
              };

              /* LOGRADOURO */
              var w_cep_logradouro = w_resp_cep.dsLogradouro;
              $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendlogradouro']").val(w_cep_logradouro);

              /* BAIRRO */
              // var w_cep_bairro = w_resp_cep.dsBairro;
              // $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendbairro']").val(w_cep_bairro);

              /* CIDADE */
              var w_cep_cidade = w_resp_cep.dsCidade;
              $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendcidade']").val(w_cep_cidade);

              /* BAIRRO */
              var w_cep_uf = w_resp_cep.caUF;
              $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anenduf']").val(w_cep_uf);

              /* SHOW LOADING */
            }else{
              _cc.msg("Não encontrado","danger",3);
              /* SHOW LOADING */
            };
          },
          function(error){
            _cc.error(error);
          }
        );
      }else{
        /*ABRE MODAL DE BUSCA */
        _cc.modal.show("modal-ccase-cep");
        _cc.focus("anenduf",500);
        $("[name='cc-cep-resultado-tabela']").attr("data-grd-search",w_grd);
        $("[name='modal-ccase-cep-resultados']").addClass("d-none");

        var w_cep_cidade =  $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendcidade']").val()
        var w_cep_end = $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendlogradouro']").val()
        var w_cep_bairro = $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anendbairro']").val()
        var w_cep_uf = $("[data-inp-obj-referencia-datagrid='" + w_grd +"'][data-inp-col-nome='anenduf']").val()

        $("[name='modal-ccase-cep'] [name='anendcidade']").val(w_cep_cidade)
        $("[name='modal-ccase-cep'] [name='anendlogradouro']").val(w_cep_end)
        $("[name='modal-ccase-cep'] [name='anendbairro']").val(w_cep_bairro)
        $("[name='modal-ccase-cep'] [name='anenduf']").val(w_cep_uf);

        if(w_cep_end != "" && w_cep_cidade != ""){
            $("[name='cc-btn-busca-cep']").trigger("mouseup");
        };
      };
    },
    html:function(){
      /* VARIAVEIS */
      var w_htm_obj_url = "/Content/Modal/cc-modal-cep.html?v=" + Math.random(),
      w_htm_obj_ajax = "";

      /* AJAX */
      if($("[name='cc-modal-cep']").length == 0){

        window.w_dese_trace_info = "cc.oauth";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"GET","text/html","-","<strong class='cc-bg-preto cc-text-verde'>AJAX MODAL HTML:</strong><br>CEP");
      }else{
        w_htm_obj_ajax = true;
      };

      $.when(w_htm_obj_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-cep']").length == 0){
            $(w_htm).appendTo("body");
          };

          _cc.modal.show("cc-modal-cep");
        },
        function(error){
          _cc.error(error);
        }
      );
      _cc.cep.listen();
    }
  };

  this.trigger = function(p_obj_nome, p_event){
    /* VARIAVEIS */
    var w_obj_nome = _cc.string.retorna(p_obj_nome, 1);
    
    if(p_obj_nome.indexOf("data-") >=0){
      $("["+p_obj_nome).trigger("" + p_event + "");
    }else{
      $("[name='" + w_obj_nome + "']").trigger("" + p_event + "");
    }
  };

  this.focus = function(p_obj_nome, p_tp){
    try{
      p_obj_nome = _cc.string.retorna(p_obj_nome,1);
      
      if(p_obj_nome != ""){
        if(_ccPrp.consulta(p_obj_nome,"INPUT_TP") == 7){
          $("[name='" + p_obj_nome + "']").select2("focus");
        }else{
          $(function(){
            document.getElementById(p_obj_nome).focus();
            if(p_tp == 1){
              setTimeout(function(){
                document.getElementById(p_obj_nome).select()
              },50)
            };
          });
        };
      };
    }catch(error){
      _cc.error(error)
    };
  };

  /* CONVERTE IMAGEM PARA BASE64 */
  this.converteFileToBase64 = function(p_obj_nome){
    var w_obj_nome = p_obj_nome;
    var w_obj_nome_file = p_obj_nome+"-file";
    var w_obj_nome_img = p_obj_nome+"-img";
    
    var w_file_upload = $("[name='"+ w_obj_nome_file + "']")[0].files[0]
    var w_file_reader = new FileReader();
    w_file_reader.readAsDataURL(w_file_upload);

    w_file_reader.onload = function(){
      $("[name='" + w_obj_nome + "']").val(w_file_reader.result);
      $("[name='" + w_obj_nome_img + "']").attr("src",w_file_reader.result);
    };
    w_file_reader.onerror = function(error){
      _cc.error(error)
    };
  };
  
  /* REGEX CHAR  */
  this.regExpChar = function(p_obj_nome){
    var p_str = $("[name='" + p_obj_nome + "']").val();
    var w_str = "";
    
    w_str = p_str.replace(/[ÀÁÂÃÄÅ]/,"A");
    w_str = p_str.replace(/[àáâãäå]/,"a");
    w_str = p_str.replace(/[ÈÉÊË]/,"E");
    w_str = p_str.replace(/[Ç]/,"C");
    w_str = p_str.replace(/[ç]/,"c");

    if(p_str != w_str){
      _cc.msg("Caracteres não permitidos no campo:<br><strong>" + p_obj_nome + "</strong>","danger", 10);
    };
  };

  /* ALERTIFY STATUS */
  this.msg = function(p_msg, p_msg_tp, p_delay, p_dismiss, p_pos){

    if(p_pos != ""){
      alertify.set("notifier","position","top-right");
    }else{
      alertify.set("notifier","position",p_pos);
    };

    if(p_delay == ""){
      p_delay = 5
    };

    alertify.notify("<p style='color:white;font-size:16px;'>" + p_msg + "</p>", p_msg_tp, p_delay);
  };

  /* TRATAMENTO DE OBJETO PARA NAO RETORNAR UNDEFINED */
  this.efeito = {
    centraliza:function(p_obj){
      /* VARIAVEIS */
      var w_obj = _cc.string.retorna(p_obj,1);
      
      /* CENTRALIZA */
      var w_height = (($(window).height() - $("[name='" + w_obj + "']").outerHeight()) / 2),
      w_width = (($(window).width() - $("[name='" + w_obj + "']").outerWidth()) / 2);

      $("[name='" + w_obj + "']").css("position", "absolute");
      $("[name='" + w_obj + "']").css("top", Math.max(0, w_height + $(window).scrollTop()) + "px");
      $("[name='" + w_obj + "']").css("left", Math.max(0, w_width + $(window).scrollLeft()) + "px");
    },
    bloqueiaRolagem:function(p_obj, p_tp){
      /* VARIAVEIS */
      var w_obj = _cc.string.retorna(p_obj, 1),
      w_tp = _cc.string.retorna(p_tp);
      
      if(w_obj != ""){
        if(w_tp == 1){
          $("[name='" + p_obj + "']").addClass("cc-remove-rolagem");
        }else if(w_tp == 0 || w_tp == ""){
          $("[name='" + p_obj + "']").removeClass("cc-remove-rolagem");
        };
      };
    },
    blur:function(p_obj, p_tp){
      /* VARIAVEIS */
      var w_obj = _cc.string.retorna(p_obj, 1),
      w_tp = _cc.string.retorna(p_tp);
      
      if(w_obj != ""){
        if(w_tp == 1){
          $("[name='" + p_obj + "']").addClass("cc-blur");
        }else if(w_tp == 0 || w_tp == ""){
          $("[name='" + p_obj + "']").removeClass("cc-blur");
        };
      };
    }
  };

  this.string = {
    substr:function(p_string, p_regras){
      /* VARIAVEIS */
      var w_str = _cc.string.retorna(p_string),
      w_str_regras = _cc.string.retorna(p_regras),
      w_str_return = "",
      w_substr_pos1 = "",
      w_substr_pos2 = "";

      try{
        if(w_str_regras.indexOf("#") >= 0){
          w_str_regras = w_str_regras.split("#");
          for(var w_str_regra in w_str_regras){
            w_substr_pos1 = w_str_regras[w_str_regra].split(",")[0] - 1;
            w_substr_pos2 = w_str_regras[w_str_regra].split(",")[1];
            w_str_return += w_str.substr(w_substr_pos1, w_substr_pos2);
          }
        }else{
          w_substr_pos1 = w_str_regras.split(",")[0] - 1;
          w_substr_pos2 = w_str_regras.split(",")[1]
          w_str_return = w_str.substr(w_substr_pos1, w_substr_pos2);
        };

        return w_str_return;
      }catch(error){
        _cc.error(error);
      };
    },
    retorna:function(p_str, p_convert_case){
      /* VARIAVEIS */
      var w_str = "";

      if(p_str != undefined && p_str != "undefined"){
        w_str = p_str.toString();
        
        if(p_convert_case == "true" || p_convert_case == "1"){
          w_str = w_str.toLowerCase();
        };

        if(p_convert_case == "2"){
          w_str = w_str.toUpperCase();
        };
      };
      return w_str;
    },
    adicionaZeros(p_str, p_qtd){
      /* VARIAVEIS*/
      var w_str = _cc.string.retorna(p_str),
      w_qtde = _cc.string.retornap_qtd;
      
      /* VALIDACOES*/
      if(_cc.string.retorna(p_qtd) == "" || _cc.string.retorna(p_str) == ""){
        return w_str;
      };

      if(parseInt(p_qtd) > 0 && w_str.length > 0){
        var w_count = parseInt(p_qtd) - w_str.length;
        if(w_count > 0){
          for(var w_index = 0;w_index < w_count;w_index++){
            w_str = "0" + w_str;
          };
        };
      };
      
      return w_str;
    },
    mascaraASCII(p_str, p_int){
      /* VARIAVEIS */
      var w_str = _cc.string.retorna(p_str),
      w_int = _cc.string.retorna(p_int) == "" ? 0 : parseInt(p_int),
      w_str_char_pos = "",
      w_str_replace = "",
      w_str_return = "",
      w_return = "";

      if(w_str == ""){
        w_return = w_str;
      }else{
        for(var w_char in w_str){
          w_str_char_pos = w_str[w_char].charCodeAt();
          w_str_replace = String.fromCharCode(w_str_char_pos + w_int);
          w_str_return += w_str_replace; 
        };
        w_return = w_str_return;
      };

      return w_return;
    },
    replace:{
      extraEspacos:function(p_str){
        /* VARIAVEIS */
        var w_str = _cc.string.retorna(p_str);
        
        if(w_str != ""){
          w_str = w_str.replace(/\s+/g,' ').trim();
        };

        return w_str;
      },
      quebraDeLinha:function(p_str,){
        /* VARIAVEIS */
        var w_str = _cc.string.retorna(p_str);

        w_str = w_str.replace(/\n/g," ");

        return w_str;
      },
      caracteresEspeciais:function(p_str, p_tp){
        /* VARIAVEIS */
        var w_str = _cc.string.retorna(p_str);

        /* RETRIVE = 1, SEND = 2 */
        if($.trim(w_str) != ""){
          if(p_tp == 1){

            if(w_str.indexOf("\`") >= 0){
              w_str = w_str.replace(/\`/g, "\'");
            };

            if(w_str.indexOf("\´") >= 0){
              w_str = w_str.replace(/\´/g, "\"");
            };
          }else if(p_tp == 2){
            if(w_str.indexOf("\'") >= 0){w_str = w_str.replace(/\'/g, "`");};
            if(w_str.indexOf("\"") >= 0){w_str = w_str.replace(/\"/g, "´");};
          };

          w_str = w_str.replace(/&amp;/g,"&");
        };

        return w_str;
      }
    },
    remove:{
      nonNumericos:function(p_string){
        /* VARIAVEIS */
        var w_string = _cc.string.retorna(p_string);
        return w_string.replace(/[^\d]/g, '');
      }
    }
  };

  /* TRATAMENTO DAS MENSAGENS DE ERRO */
  this.validaResponseAjax = function(p_rest, p_url, p_tp){
    try{
      /* VARIAVEIS */
      var w_return = [],
      w_cn_retorno = "",
      w_an_erro = "",
      w_an_query = "",
      w_an_mensagem = "",
      w_msg_sys = "";

      /* TRANSFORMA A STRING EM JSON */
      if(typeof p_rest == "string"){
        p_rest = JSON.parse(p_rest);
      };

      /* ATRIBUICOES */
      w_cn_retorno = p_rest.cnRetorno;
      w_an_mensagem = p_rest.anMensagem;
      w_an_erro = p_rest.anErro;
      w_an_query = p_rest.anQuerys;

      /* RETORNO */
      if(w_cn_retorno == 0){
        w_return = [true, -1, w_an_mensagem];
      }else{
        if(w_cn_retorno == 900){
          /* NAO LOGADO */
          w_return = [false, w_cn_retorno, w_an_mensagem];
        };

        if(w_cn_retorno > 900){
          if(w_cn_retorno == 905 || w_cn_retorno == 907){
            _ccOath.modal.reautenticar(); 
          };
          if(w_cn_retorno == 930){
            _ccOath.modal.novaSenha();
            p_tp = 1;
          }else{
            if($("[name='cc-modal-login']").is(":visible") == false){
              _ccOath.modal.reautenticar();
            };
          }
          w_return = [false, w_cn_retorno, w_an_mensagem];
        };
      };
      
      /* MENSAGEM */
      if(p_rest.cnRetorno > 0){
        w_msg_sys += "<div class='cc-msg-sys p-4 cc-bg-vermelho mb-2 cc-msg-error cc-text-branco'>";
        w_msg_sys +=    "<small class='cc-bg-preto cc-text-branco p-2 mb-3 d-inline-block'>" + _cc.converteData(new Date(), "HH:mm:ss")  + "</small>";
        w_msg_sys +=    "<p class='mb-2'><strong>URL DO REST: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + p_url + "</span></p>";
        w_msg_sys +=    "<p class='mb-2'><strong>JSON DO REST: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + JSON.stringify(p_rest) + "</span></p>";
        w_msg_sys +=    "<p class='mb-2'><strong>MENSAGEM: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + w_an_mensagem + "</span></p>";
        w_msg_sys +=    "<p class='mb-2'><strong>ERRO: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + w_an_erro + "</span></p>";
        w_msg_sys +=    "<p class='mb-2'><strong>QUERY: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + w_an_query + "</span></p>";
        w_msg_sys +=    "<p class='mb-2'><strong>RETORNO: </strong>";
        w_msg_sys +=    "<span class='text-monospace text-monospaced'>" + w_cn_retorno + "</span></p>";
        w_msg_sys += "</div>";
        /* abre o modal de erros*/

        if($("[name='cc-dev-error-log'] .cc-msg-sys").length == 0){
          $("[name='cc-dev-error-log']").append(w_msg_sys);
        }else{
          $(w_msg_sys).insertBefore($("[name='cc-dev-error-log'] .w_msg_sys:first"));
        };
        if(_cc.string.retorna(p_tp) == "" || _cc.string.retorna(p_tp) == "0"){
          _cc.msg(p_rest.anMensagem,"danger",10);
        };
      };      

      return w_return;
    }catch(error){
      _cc.error(error);
    }
  };

  /* LOADING */
  this.loading = {
    show:function(p_str, p_tp, p_loading_name){
      /* VARIAVEIS */
      var w_tp = _cc.string.retorna(p_tp),
      w_loading_html = "",
      w_loading_name = _cc.string.retorna(p_loading_name),
      w_str = _cc.string.retorna(p_str);

      /* VERIFICA SE JA ESTA ABERTO E PREVINE REABRIR O MESMO LOADING*/
      if($("[data-loading-name='" + w_loading_name + "']").length > 0){
        return false;
      };

      /* LOADING THEME 1*/
      if(w_tp == 0 || w_tp == ""){
        w_loading_html += "<div class='cc-loading-lite' data-loading-name='" + w_loading_name + "'>";
        w_loading_html +=   "<div class='cc-loading-spinner' name='cc-loading-spinner-lite' id='cc-loading-spinner-lite'>";
        w_loading_html +=     "<img src='/Content/Img/Resources/black-loader.gif'>";
        w_loading_html +=     "<strong class='cc-loading-title'>";
        w_loading_html +=     w_str;
        w_loading_html +=     "</strong>";
        w_loading_html +=   "</div>";
        w_loading_html +=   "<div class='cc-loading-fade'>";
        w_loading_html +=   "</div>";
        w_loading_html += "</div>";
      }else{
        /* LOADING THEME 2*/
        w_loading_html += "<div class='cc-loading-full' data-loading-name='" + w_loading_name + "'>";
        w_loading_html +=   "<div class='cc-loading-spinner' name='cc-loading-spinner-full' id='cc-loading-spinner-full'>";
        w_loading_html +=     "<img src='/Content/Img/Resources/black-loader.gif'>";
        w_loading_html +=     "<strong class='cc-loading-title'>";
        w_loading_html +=     w_str;
        w_loading_html +=     "</strong>";
        w_loading_html +=   "</div>";
        w_loading_html +=   "<div class='cc-loading-fade'>";
        w_loading_html +=   "</div>";
        w_loading_html += "</div>";
      };

      /* APPEND */
      $("body").append(w_loading_html);

      /* START ANIMATION */
      if(w_tp == 0 || w_tp == ""){
        $("[data-loading-name='" + p_loading_name + "'] .cc-loading-spinner").css({right:0});
      }else if(w_tp == "1"){
        _cc.efeito.centraliza("cc-loading-spinner-full");
        $("[data-loading-name='" + p_loading_name + "']").show();
      };
    },
    hide:function(p_loading_name){
      /* VARIAVEIS */
      var w_loading_name = _cc.string.retorna(p_loading_name);

      if(w_loading_name != ""){
        $("[data-loading-name='" + p_loading_name + "']").fadeOut(function(){
          $("[data-loading-name='" + p_loading_name + "']").remove();
        });
      }else{
        $("[data-loading-name]").each(function(w_index, w_el){
          $(this).remove();
        });
      }
    }
  };

  this.url = {
    parametros:function(p_url){
      /* VARIAVEIS */
      p_url = _cc.string.retorna(p_url);
      var w_url_sys = "",
      w_url_cli = "",
      w_url_seg = "",
      w_url_user = "",
      w_url_obj = "",
      w_url_param = "",
      w_url_cache = "";

      /* URL QUERY STRING */
      if(window.location.search != ""){
        var w_url_query_str = decodeURIComponent(window.location.search);
        var w_url = decodeURIComponent(window.location.search);

        if(_cc.string.retorna(p_url) != ""){
          w_url_query_str = decodeURIComponent(p_url);
          w_url = decodeURIComponent(p_url);
        };
        
        /* TRANSFORMACAO DA URL EM MATRIZ */
        w_url_query_str = w_url_query_str.substr(1);
        w_url_query_str = w_url_query_str.split("&");

        /* VARIAVEIS DO ARRAY */
        for(var w_url_query_param in w_url_query_str){

          /* SYS */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("sys") == 0){
            w_url_sys = w_url_query_str[w_url_query_param].split("=");
            w_url_sys = w_url_sys[1];
          };

           /* CLI */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("cli") == 0){
            w_url_cli = w_url_query_str[w_url_query_param].split("=");
            w_url_cli = w_url_cli[1];
          };

          /* SEG */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("seg") == 0){
            w_url_seg = w_url_query_str[w_url_query_param].split("=");
            w_url_seg = w_url_seg[1];
          };

          /* SEG */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("user") == 0){
            w_url_user = w_url_query_str[w_url_query_param].split("=");
            w_url_user = w_url_user[1];
          };

          /* PAGINA */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("obj") == 0){
            w_url_obj = w_url_query_str[w_url_query_param].split("=");
            w_url_obj = w_url_obj[1];
          };

          /* PARAM */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("param") == 0){
            w_url_param = w_url_query_str[w_url_query_param].split("=");
            w_url_param = w_url_param[1];
          };

          /* CACHE */
          if(w_url_query_str[w_url_query_param].toLowerCase().indexOf("cache") == 0){
            w_url_cache = w_url_query_str[w_url_query_param].split("=");
            w_url_cache = w_url_cache[1];
          };
        };
      };

      return [w_url_sys, w_url_cli, w_url_seg, w_url_user, w_url_obj, w_url_param, w_url_cache]
    }
  };

  this.modal = {
    show:function(p_obj,  p_tp){

      /* VARIAVEIS*/
      var w_show_close = true,
      w_escape_close = true;

      /* TIPO */
      if(p_tp == 1){
        w_show_close = false;
        w_escape_close = false;
      };

      /* MODAL */
      var w_modal_active = $.modal.getCurrent();

      /* JQUERY MODAL */    
      $("[name='" + p_obj +"']").modal({
        closeExisting: false,
        clickClose: false,
        escapeClose: w_escape_close,
        blockerClass: "cc-modal-blocker",
        modalClass: "cc-modal",  
        showClose: w_show_close
      });

      /* REGRA AFTER SHOW */
      if($("[name='" + p_obj + "']").attr("data-regra-pos-show") == "true"){
        $("[name='" + p_obj + "']").trigger("show");
      };

      /*  REMOVE MODAL */
      $("[name='" + p_obj + "']").on($.modal.AFTER_CLOSE, function(event, modal){
        if($(".cc-modal").is(":visible") == false){
          $(".cc-modal-blocker").remove();
        };
      });

      /* ATTRIBUICAO DO LOGO */
      $("[name='cc-logo']").each(function(){
        if($(this).attr("src") == undefined || $(this).attr("src") == ""){
          $(this).attr("src",ccase.global.logo);
        };
      })
    },
    close:function(){
      /* VARIAVEIS */
      if($.modal.getCurrent() != null){

        var w_modal = $.modal.getCurrent().$elm[0].id;
        $.modal.close();
        
        /* VERIFICA SE O MODAL ATIVO ESTA FECHADO */
        setTimeout(function(){
          if($("[name='" + w_modal + "']").is(":visible") == false && $(".cc-modal-blocker").is(":visible") == false && $.modal.isActive() == true){
            $.modal.close();
          };
        },500)
      };
    }
  };

  this.datetime = function(p_datetime){  
    /* VARIAVEIS */
    var w_datetime = new Date(p_datetime);
    w_datetime = w_datetime.setSeconds(w_datetime.getSeconds() + 1);

    var w_token_datetime = _cc.converteData(w_datetime, "DDHHmm");
    ccase.global.token = ccase.global.system_token + _cc.string.mascaraASCII(w_token_datetime,6);
    
    window.w_cc_timeout = setTimeout(function(){
      _cc.datetime(w_datetime);
      _ccConf.attrib.variaveis();
    },1000);
  };

  this.converteData = function(p_data, p_formato, p_method){
    var w_data = p_data;
    
    if(p_method == "post"){
      var w_dia = w_data.substr(0,2);
      var w_mes = w_data.substr(3,2);
      var w_ano = w_data.substr(6,4);
      var w_hora = "";
      if(w_data.indexOf(":") >= 0){
        w_hora = w_data.substr(11,8); 
      }
      
      var w_data_format = new Date(""+w_mes+"/"+w_dia+"/"+w_ano+"/"+" "+w_hora+"");

      //DD MM YYYY HH MM SS
      w_data = new Date(w_data_format);
    };

    var w_moment = moment(w_data).format(p_formato);
    if(w_moment == "Invalid date"){
      w_moment = "";
    };
    
    return w_moment;
  };

};

var _cc = new _ccaseUtilidades();
