/*
  AUTO_INCREMENT         = readonly(INSERT/UPDATE) SEMPRE;
 
  SEQUENCE               = read/write(INSERT) AND readonly(UPDATE);
  PRIMARY_KEY            = read/write(INSERT) AND readonly(UPDATE) requerido;
  UNIQUE_KEY             = read/write(INSERT) AND readonly(UPDATE) requerido;
  UNIQUE_KEY + SEQUENCE  = read/write(INSERT) AND readonly(UPDATE) NAO requerido;
 
  FOREIGN_KEY            = readonly = requerido
  KEY                    = read/write(INSERT/UPDATE);
*/

var _ccaseButton = function(){

  /* INPUT */
  this.cria = function(p_btn){

    /* MATRIZ */
    var w_btn = _cc.string.retorna(p_btn, 1);

    /* VARIAVEIS */
    var w_btn_htm = "",
    w_btn_acao_padrao_class = "",
    w_btn_css_class = "",
    w_btn_css_class_inativo = "",
    w_btn_prop = "";

    /* PROPRIEDADES > PRINCIPAIS */
    var w_btn_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_btn,"OBJ_NOME"), 1);
    var w_btn_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_btn,"OBJ_REFERENCIA"), 1);
    var w_btn_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_btn,"OBJ_REFERENCIA_DATAGRID"), 1);
    
    /* PROPRIEDADES > LAYOUT */
    var w_btn_extra_class = _cc.string.retorna(_ccPrp.consulta(w_btn,"EXTRA_CLASS"), 1);
    var w_btn_colspan = _ccPrp.colspan(_ccPrp.consulta(w_btn,"COLSPAN"), w_btn_obj_nome);
    var w_btn_rowspan = _ccPrp.rowspan(_ccPrp.consulta(w_btn,"ROWSPAN"), 1);
    var w_btn_quebra_linha = _ccPrp.quebraLinha(_ccPrp.consulta(w_btn,"QUEBRA_LINHA"));
    var w_btn_alinhamento_h = _ccPrp.alinhamento(_ccPrp.consulta(w_btn,"ALINHAMENTO_H"));
    var w_btn_hidden = _ccPrp.hidden(_ccPrp.consulta(w_btn,"HIDDEN"));
    var w_btn_inativo = _ccPrp.consulta(w_btn,"INATIVO");
    var w_btn_disable = _ccPrp.disable(_ccPrp.consulta(w_btn,"DISABLE"));
    var w_btn_icone = _cc.string.retorna(_ccPrp.consulta(w_btn,"ICONE"), 1);
    var w_btn_imagem = _cc.string.retorna(_ccPrp.consulta(w_btn,"IMAGEM"), 1);
    var w_btn_titulo = _cc.string.retorna(_cc.replaceParametros(_ccPrp.consulta(w_btn,"TITULO")));
    
    /* PROPRIEDADES > ACTION */
    var w_btn_acao_padrao = _cc.string.retorna(_ccPrp.consulta(w_btn,"BOTAO_ACAO_PADRAO"), 1);

    /* ACAO: NULL */
    if(w_btn_acao_padrao == 0){
      w_btn_acao_padrao_class = "cc-btn-preto ";
    };
    
    /* ACAO: NOVO */
    if(w_btn_acao_padrao == 1){
      w_btn_acao_padrao_class = "cc-btn-azul-escuro ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-plus";};
    };

    /* ACAO: SALVAR | UPDATE */
    if(w_btn_acao_padrao == 2){
      w_btn_acao_padrao_class = "cc-btn-verde ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-check";};
    };

    /* ACAO: EXCLUIR */
    if(w_btn_acao_padrao == 3){
      w_btn_acao_padrao_class = "cc-btn-vermelho ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-trash";};
    };

    /* ACAO: IMPRIMIR */
    if(w_btn_acao_padrao == 4){
      w_btn_acao_padrao_class = "cc-btn-preto ";
    };

    /* ACAO: FILTRAR */
    if(w_btn_acao_padrao == 5){
      w_btn_acao_padrao_class = "cc-btn-preto ";
    };

    if(w_btn_acao_padrao == 6){
      w_btn_acao_padrao_class = "cc-btn-azul-escuro ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-print";};
    };

    if(w_btn_acao_padrao == 99){
      w_btn_acao_padrao_class = "cc-btn-azul-escuro ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-print";};
    };

    if(w_btn_acao_padrao == 7){
      w_btn_acao_padrao_class = "cc-btn-azul-escuro ";
      if(w_btn_icone == ""){w_btn_icone = "fas fa-print";};
    };

    /* INATIVO | DESABILITADO */
    if(w_btn_inativo == 1){
      w_btn_css_class_inativo = " disabled ";
    };

    /* ACTION */
    var w_btn_action = _cc.string.retorna(_ccPrp.consulta(w_btn,"ACTION"));
    var w_btn_regra_pre = _ccPrp.consulta(w_btn,"REGRA_PRE");
    var w_btn_regra_pos = _ccPrp.consulta(w_btn,"REGRA_POS");

    var w_btn_regra_class = "";
    if(w_btn_action != "" || w_btn_regra_pre  != "" || w_btn_regra_pos  != ""){
      w_btn_regra_class = " cc-btn-regra ";
    };
    
    if(_cc.string.retorna(w_btn_regra_pos) != ""){
      _cc.listen("click", w_btn, _cc.replaceParametros(_cc.replaceAspas(w_btn_regra_pos,1)));
    };

    if(_cc.string.retorna(w_btn_action) != ""){
      _cc.listen("click", w_btn, _cc.replaceParametros(_cc.replaceAspas(w_btn_action,1)));
    };

    if(_cc.string.retorna(w_btn_regra_pre) != ""){
      _cc.listen("mousedown", w_btn, _cc.replaceParametros(_cc.replaceAspas(w_btn_regra_pre,1)));
    };

    /* PROPRIEDADES */
    w_btn_prop += "id='" + w_btn_obj_nome + "' " ;
    w_btn_prop += "name='" + w_btn_obj_nome + "' " ;
    w_btn_prop += "data-btn='true' ";
    w_btn_prop += "data-obj-seq='" + _ccPrp.objSeq(w_btn_obj_nome) + "' ";
    w_btn_prop += "data-obj-tp='btn' ";
    w_btn_prop += "data-obj-referencia='" + w_btn_obj_referencia + "' ";
    w_btn_prop += "data-btn-grd='" + w_btn_obj_referencia_datagrid + "' ";
    w_btn_prop += "data-btn-acao-padrao='" + w_btn_acao_padrao + "' ";

    /* CLASSES */
    w_btn_css_class = "cc-btn btn btn-block "; 
    w_btn_css_class += w_btn_css_class_inativo + " ";
    w_btn_css_class += w_btn_acao_padrao_class + " ";
    w_btn_css_class += w_btn_extra_class + " ";

    /* HTML BTN */
    w_btn_htm = w_btn_quebra_linha;
    w_btn_htm += "<div data-btn-obj-nome='" + w_btn_obj_nome + "' class='" + w_btn_regra_class + " cc-btn-col " + w_btn_colspan + " " + w_btn_alinhamento_h + "'>"
    w_btn_htm += "<button " + w_btn_prop + " class='" + w_btn_css_class + " " + w_btn_hidden + "'>"
    w_btn_htm += "<i class='" + w_btn_icone + "'></i> " 
    w_btn_htm += w_btn_titulo; 
    w_btn_htm += "</button>"
    w_btn_htm += "</div>"

    /* APPEND  */
    $("[name='" + w_btn_obj_referencia + "']").append(w_btn_htm)
  };

  this.filtro = {
    abre:function(p_btn){
      /* VARIAVEIS */
      var w_grd = $(p_btn).attr("data-btn-grd-filtro"),
      w_fme_filtro = w_grd + "_filtro",
      w_fme_filtro_modal = _ccPrp.consulta(w_fme_filtro,"MODAL"),
      w_inp_pos = _ccObj.busca.binaria("wMObjetoReferenciaDatagrid",w_grd,5),
      w_inp_m = [];

      /* PEGA OS INPUTS DESSE GRID */
      for(var w_index = w_inp_pos;w_index < wMObjetoReferenciaDatagrid.length;w_index++){
        if(wMObjetoReferenciaDatagrid[w_index][5] != w_grd){
          break;
        };
        var w_inp_obj_nome = wMObjetoReferenciaDatagrid[w_index][0];
        if(_ccPrp.consulta(w_inp_obj_nome, "COL_FILTRO") != ""){
          if($("[name='" + w_fme_filtro + "'] [name='" + w_inp_obj_nome + "']").length == 0){
            _ccInp.cria(w_inp_obj_nome, w_fme_filtro);
          };
        };
      };

      /* APPEND O BOTAO DE BUSCA */
      var w_titulo_filtro = "<h4 class='w-100 mb-5 pt-2 border-bottom pb-2 float-left'>Filtrar</h4>";

      var w_btn_filtro = "<button class='w-100 mt-4 pt-3 border-top pb-3 float-left btn btn-block cc-btn-azul-escuro' data-btn-acao-padrao='4_executa' data-btn-grd-filtro='" + w_grd +"'><i class='fas fa-search'></i> Pesquisar</button>";

      if($("[name='" + w_fme_filtro + "'] [data-btn-acao-padrao='4_executa']").length == 0){
        $(w_titulo_filtro).insertBefore($("[name='" + w_fme_filtro + "'] *:first"));
        $("[name='" + w_fme_filtro + "']").append(w_btn_filtro);
      };

      /* ABRE O MODAL */
      if(w_fme_filtro_modal == 1){
        _cc.modal.show(w_fme_filtro);
      };
    },
    executa:function(p_btn){
      /* VARIAVEIS */
      var w_grd = $(p_btn).attr("data-btn-grd-filtro"),
      w_fme_filtro = w_grd + "_filtro",
      w_fme_filtro_modal = _ccPrp.consulta(w_fme_filtro,"MODAL"),
      w_inp_pos = _ccObj.busca.binaria("wMObjetoReferenciaDatagrid",w_grd,5),
      w_inp_m = [],
      w_inp_where_adicional_bo = 0,
      w_inp_where_and = "",
      w_grd_where_filtro = "";

      /* PEGA OS INPUTS DESSE GRID */
      for(var w_index = w_inp_pos;w_index < wMObjetoReferenciaDatagrid.length;w_index++){
        if(wMObjetoReferenciaDatagrid[w_index][5] != w_grd){
          break;
        };
        /* VARIAVEIS */
        var w_inp_obj_nome = wMObjetoReferenciaDatagrid[w_index][0];
        var w_inp_col_filtro_operador = _ccPrp.consulta(w_inp_obj_nome,"COL_FILTRO_OPERADOR");

        if(_ccPrp.consulta(w_inp_obj_nome, "COL_FILTRO") != ""){
          var w_inp_col_nome = _ccPrp.consulta(w_inp_obj_nome, "COL_NOME");
          var w_inp_val = "";
          if(w_inp_col_filtro_operador == 9){
            for(var w_index_9 = 0; w_index_9 < 2; w_index_9++){
              var w_posicao_9_bo = ":first";
              if(w_index_9 == 1){
                w_posicao_9_bo = ":last"
              };

              w_inp_val = $("[name='" + w_fme_filtro + "'] [data-inp-col-nome='" + w_inp_col_nome + "']" + w_posicao_9_bo + "").val();

              if(w_inp_val != ""){
                var w_inp_where_operador = " >= ";
                if(w_index_9 == 1){
                  w_inp_where_operador = " <= ";
                };

                var w_str_input_name_aux = $(this).attr("data-inp-obj-nome");
                if(w_inp_where_adicional_bo > 0){
                  w_inp_where_and = " and ";
                };

                w_inp_where_adicional_bo++;

                /* WHERE DO CAMPO */
                w_grd_where_filtro += w_inp_where_and + " " + w_inp_col_nome + " " + w_inp_where_operador + " \"" + w_inp_val + "\" ";
              };
            }
          }else{
            w_inp_val = $("[name='" + w_fme_filtro + "'] [data-inp-col-nome='" + w_inp_col_nome + "']").val();

            if($("[name='" + w_fme_filtro + "'] [data-inp-col-nome='" + w_inp_col_nome + "']").attr("data-inp-tp") == "checkbox"){
              if($("[name='" + w_fme_filtro + "'] [data-inp-col-nome='" + w_inp_col_nome + "']").is(":checked") == true){
                w_inp_val = 1;
              }
            };

            if(w_inp_val != ""){
              /* COL_FILTRO_OPERADOR */
              var w_inp_where_operador = "";
              var w_inp_where_operador_like_direita = "";
              var w_inp_where_operador_like_esquerda = "";
              if(w_inp_col_filtro_operador == ""){
                w_inp_col_filtro_operador = 1
              };

              /* OPERADORES */
              if(w_inp_col_filtro_operador == 1){w_inp_where_operador = " = ";};
              if(w_inp_col_filtro_operador == 2){w_inp_where_operador = " > ";};
              if(w_inp_col_filtro_operador == 3){w_inp_where_operador = " < ";};
              if(w_inp_col_filtro_operador == 4){w_inp_where_operador = " <= ";};
              if(w_inp_col_filtro_operador == 5){w_inp_where_operador = " >= ";};
              if(w_inp_col_filtro_operador == 6){w_inp_where_operador = " <> ";};
              if(w_inp_col_filtro_operador == 7){
                w_inp_where_operador = " like ";
                w_inp_where_operador_like_direita = "%";
              };
              if(w_inp_col_filtro_operador == 8){w_inp_where_operador_like_esquerda = "%";
                w_inp_where_operador = " like ";
                w_inp_where_operador_like_direita = "%";
              };
              if(w_inp_col_filtro_operador == 9){w_inp_where_operador = " = ";};
              if(w_inp_col_filtro_operador == ""){w_inp_where_operador = " = ";};

              var w_str_input_name_aux = $(this).attr("data-inp-obj-nome");
              if(w_inp_where_adicional_bo > 0){
                w_inp_where_and = " and ";
              };

              w_inp_where_adicional_bo++;

              /* WHERE DO CAMPO */
              w_grd_where_filtro += w_inp_where_and + " " + w_inp_col_nome + " " + w_inp_where_operador + " \"" + w_inp_where_operador_like_esquerda + w_inp_val + w_inp_where_operador_like_direita + "\" ";
            };
          };
        };
      };
      console.log("w_grd_where_filtro",w_grd_where_filtro);

      _ccGrd.cria(w_grd, w_grd_where_filtro);
      _cc.modal.close();
    }
  };

  this.novo = function(p_btn){
    /* VARIAVEIS */
    try{
      var w_grd = _cc.string.retorna($(p_btn).attr("data-btn-grd"),1);
      var w_grd_tab_nome = _ccPrp.consulta(w_grd,"TAB_NOME");
      var w_grd_edit = $("table[data-grd='" + w_grd + "']").attr("data-grd-obj-referencia-edit");
      var w_inp_obj_referencia_datagrid = w_grd;
      
      var w_log_url = ccase.url.log;
      w_log_url += "cnRegTP=3";
      w_log_url += "&cnMensagem=0";
      w_log_url += "&caTransacao=BTN 1 NOVO [" + w_grd_tab_nome + "]";
      w_log_url += "&boSucesso=1";
      w_log_url += "&anMensagem=-";
      _cc.ajax(w_log_url);

      /* LIMPA OS GRIDS RELACIONADOS */
      $("table[data-grd-obj-relacionamento-datagrid='" + w_grd + "']").each(function(){
        if($(this).attr("data-grd").toLowerCase() != w_grd){
          _ccGrd.limpa($(this).attr("data-grd"));
        };
      });

      /* LIMPA DADOS DE INPUT */
      _ccInp.limpa(w_grd);

      /* VERIFICA SE EH MODAL */
      if(w_grd_edit != ""){
        if(_ccPrp.consulta(w_grd_edit,"MODAL") == 1){
          _cc.modal.show(w_grd_edit);
        };
      };

      if($("[data-inp-foreign-key-bo='true']").length != 0){
        var w_inp_name = _cc.string.retorna($("[data-inp-foreign-key-bo='true']").attr("name"),true);
        // var w_inp = ccase.matriz.inp["" + w_inp_name + ""]._foreign_key.split(".");
        var w_inp_foreign_key = _ccPrp.consulta(w_inp_name, "FOREIGN_KEY");
        
        if(w_inp_foreign_key != ""){
          var w_inp = w_inp_foreign_key.split(".");  
        };
      
        var w_grd_relacionamento = $("table[data-grd-tab-nome='" + w_inp[0].toLowerCase() + "']").attr("data-grd-obj-nome");
        var w_inp_relacionamento = $("[data-inp-obj-referencia-datagrid='" + w_grd_relacionamento + "'][data-inp-col-nome='" + w_inp[1].toLowerCase() + "']").val();

        $("[data-inp-foreign-key-bo='true']").val(w_inp_relacionamento);
      };

      $("[data-inp-value]").each(function(){
        var w_val = $(this).attr("data-inp-value");
        $(this).val(w_val).change();
      });

      /* FOCUS */
      _cc.focus($("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-autofocus='autofocus']").attr("data-inp-obj-nome"));
    
    }catch(error){
      _cc.error(error);
    }
  };

  this.insere = function(p_btn){

    /* INFORMACOES BASICAS */
    var w_grd = _cc.string.retorna($(p_btn).attr("data-btn-grd"),1),
    w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd, "TAB_NOME"),1),
    w_grd_edit = _cc.string.retorna(_ccPrp.consulta(w_grd, "OBJ_REFERENCIA_EDIT"),1);
    
    console.log(w_grd);
    console.log(w_grd_tab_nome);
    console.log(w_grd_edit);

    /* VERIFICA OS REQUIRED */
    var w_valida = _ccBtn.valida(w_grd, 1);
    if(w_valida.length > 0){return false;};

    /* FOR NOS INPUTS */
    var w_json_insert = "{";

    $("[data-inp-obj-referencia-datagrid='" + w_grd + "']").each(function(){
      /* VARIAVEIS DO INPUT */
      var w_inp = $(this),
      w_inp_nome = w_inp.attr("data-inp-col-nome"),
      w_inp_obj_nome = w_inp.attr("data-inp-obj-nome"),
      w_inp_mascara = _cc.string.retorna(_ccPrp.consulta(w_inp_obj_nome,"MASCARA"),1),
      w_inp_val = $(this).val();

      if(w_inp.attr("data-inp-tp") == "combo" || w_inp.attr("data-inp-tp") == "combocod"){
        if(w_inp.attr("multiple") == "multiple"){
          w_inp_val = w_inp_val.toString().replace(/,/g,"#");
        };
      };

      if(w_inp_nome != "id"){

        /* DATA */
        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 3){
          if(w_inp_val != ""){
            w_inp_val = _cc.converteData(w_inp_val,"YYYY-MM-DD", "post")
          };
        };

        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 4){
          if(w_inp_val != ""){
            w_inp_val = _cc.converteData(w_inp_val,"YYYY-MM-DD[T]HH:mm:ss", "post")
          };
        };

        
        if(w_inp_mascara == "moeda"){
          if(w_inp_val != ""){
            w_inp_val = _ccPlugin.mask.retorna(w_inp_obj_nome);
          };
        };
        if(w_inp_mascara == "cpf" || w_inp_mascara == "cnpj"  || w_inp_mascara == "cpfcnpj" || w_inp_mascara == "cep" || w_inp_mascara == "milhar"){
          if(w_inp_val != ""){
            w_inp_val = _cc.string.remove.nonNumericos(w_inp_val);
          };
        };

        // if(w_inp.INPUT_TIPO == 11){
        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 11){
          w_inp_val = w_inp.is(":checked");
          if(w_inp_val == true){
            w_inp_val = "1";
          }else{
            w_inp_val = "0";
          };
        };

        if(_ccPrp.consulta(w_inp_obj_nome,"COL_VIRTUAL") != "1"){
          w_json_insert += "\"" + w_inp_nome + "\" : \"" + _cc.replaceAspas(_cc.string.retorna(w_inp_val)) + "\",";
        };
      };
    });

    /* REMOVE A ULTIMA VIRGULA E FECHA O JSON */
    w_json_insert = w_json_insert.substr(0, w_json_insert.length-1) + "}";
    w_json_insert = _cc.replaceParametros(w_json_insert);
    console.log("====================> INSERT - JSON");
    console.log(w_json_insert);

    /* ENVIA DADOS*/
    var w_insere_url = ccase.url.tabela + "tabela=" + w_grd_tab_nome;
    console.log(w_insere_url);

    /* TRACE LOG */
    window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.btn<br>"
    window.w_dese_trace_info += "<strong>FUNC</strong><br> _ccBtn.insere<br>";
    window.w_dese_trace_info += "<strong>OBJ:</strong><br> " + p_btn + "";
    var w_insere_ajax = _cc.ajax(w_insere_url, "post", "application/json", JSON.stringify(w_json_insert),"", window.w_dese_trace_info);
    

    $.when(w_insere_ajax).then(
      function(json_resp){
        console.log(json_resp)
        var w_rest_insert = _cc.validaResponseAjax(json_resp, w_insere_url);
        if(json_resp.cnRetorno == 0){

          var w_inp_id = json_resp.id;
          $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='id']").val(w_inp_id);
          _cc.msg(json_resp.anMensagem,"success",5);

          // if(_ccPrp.consulta(w_grd,"GRID_TREE") != 1){
            _ccGrd.load.dados(w_grd, "", w_inp_id)
          // };

          /* RESET WARNINGS */
          $(":input").removeClass("border-danger");

          if(json_resp.cnRetorno == 0){
            var w_log_url = ccase.url.log;
            w_log_url += "cnRegTP=3";
            w_log_url += "&cnMensagem=0";
            w_log_url += "&caTransacao=BTN 2 INSERT [" + w_grd_tab_nome + "][" + w_inp_id + "]";
            w_log_url += "&boSucesso=1";
            w_log_url += "&anMensagem=-";
            _cc.ajax(w_log_url);
          }else{
            var w_log_url = ccase.url.log;
            w_log_url += "cnRegTP=3";
            w_log_url += "&cnMensagem=0";
            w_log_url += "&caTransacao=BTN 2 INSERT [" + w_grd_tab_nome + "][" + w_inp_id + "]";
            w_log_url += "&boSucesso = 0";
            w_log_url += "&anMensagem=-";
            _cc.ajax(w_log_url);
          };

          /* CLOSE EXTRA MODAL */
          if($.modal.length > 1){
            _cc.modal.close()
          };

        };
      },
      function(error){
        _cc.error(error);
      }
    );
  };

  this.valida = function(p_grd, p_tipo){
    /* VARIAVEIS */
    var w_inp_bo_null = [],
    w_inp_str = "";

    /* VALIDA CAMPOS */
    $("[data-inp-obj-referencia-datagrid='" + p_grd + "'][required='required']").each(function(w_index, w_el){
      if($.trim($(w_el).val()) == ""){
        /* UPDATE */
        if(p_tipo == 2){
          if($(w_el).attr("data-inp-auto-increment") != 'true'){
            w_inp_bo_null.push($(w_el).attr("data-inp-name"));
            $(w_el).addClass("border border-danger");
            $(w_el).closest(".cc-inp").find("label").addClass("text-danger");
          };
        }else 
        /* INSERT */
        if(p_tipo == 1){
          if($(this).attr("data-inp-auto-increment") != "true"){
            if($(this).attr("data-inp-sequence") != "true"){
              if($(this).attr("data-inp-unique-key") != "true"){
                if($(this).attr("data-inp-primary-key") != "true"){
                  w_inp_bo_null.push($(w_el).attr("data-inp-name"));
                  $(w_el).addClass("border border-danger");
                  $(w_el).closest(".cc-inp").find("label").addClass("text-danger");
                };
              };
            };
          };
        };
      }else{
        $(w_el).closest(".cc-inp").find("label").removeClass("text-danger");
        $(w_el).removeClass("border");
        $(w_el).removeClass("border-danger");
      };
    });

    for(var w_inp in w_inp_bo_null){
      w_inp_str += "<br> - " + ccase.matriz.inp["" + w_inp_bo_null[w_inp] + ""].TITULO + "";
    };
    
    if(w_inp_bo_null.length > 0){
      _cc.msg("Há campos obrigatórios não preenchidos:" + w_inp_str,"danger", 4);
    };

    return w_inp_bo_null;
  };

  this.get = {
    dados:function(w_grd, w_tp){

    }
  }

  this.atualiza = function(p_btn){
    
    /* VARIAVEIS */
    var w_grd = _cc.string.retorna($(p_btn).attr("data-btn-grd"), 1),
    w_grd_tab_nome = _ccPrp.consulta(w_grd, "TAB_NOME"),
    w_grd_edit = "",
    w_inp_id = $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='id']").val(),
    w_inp_bo_null = "",
    w_inp_m = "";

    /* PROPRIEDADES PRINCIPAIS > GRD*/
    w_grd_tab_nome = _cc.string.retorna(ccase.matriz.grd["" + w_grd + ""].TAB_NOME, true);
    w_grd_edit = _cc.string.retorna(ccase.matriz.grd["" + w_grd+ ""].OBJ_REFERENCIA_EDIT,true);
    
    /* VERIFICA OS REQUIRED */
    var w_valida = _ccBtn.valida(w_grd, 2);
    if(w_valida.length > 0){
      return false;
    };

    /* FOR NOS INPUTS */
    var w_json_update = "{";

    $("[data-inp-obj-referencia-datagrid='" + w_grd + "']").each(function(){

      /* VARIAVEIS DO INPUT */
      var w_inp = $(this);
      var w_inp_nome = $(this).attr("data-inp-col-nome");
      var w_inp_obj_nome = $(this).attr("data-inp-obj-nome");
      var w_inp_val = $(this).val();
      var w_inp_mascara = _cc.string.retorna(_ccPrp.consulta(w_inp_obj_nome,"MASCARA"),1);

      if(w_inp.attr("data-inp-tp") == "combo" || w_inp.attr("data-inp-tp") == "combocod"){
        if(w_inp.attr("multiple") == "multiple"){
          w_inp_val = _cc.string.retorna(w_inp_val).toString().replace(/,/g,"#");
        };
      };

      if(w_inp_nome.toLowerCase() != "id" && _ccPrp.consulta(w_inp_obj_nome,"UNIQUE_KEY") != "1"){

        /* DATA */
        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 3){
          if(w_inp_val != ""){
            w_inp_val = _cc.converteData(w_inp_val,"YYYY-MM-DD","post")
          };
        };
        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 4){
          if(w_inp_val != ""){
            w_inp_val = _cc.converteData(w_inp_val,"YYYY-MM-DD[T]HH:mm:ss","post")
          };
        };
        if(_ccPrp.consulta(w_inp_obj_nome,"INPUT_TP") == 11){
          w_inp_val = w_inp.is(":checked")
          if(w_inp_val == true){
            w_inp_val = "1";
          }else{
            w_inp_val = "0";
          }
        };

        if(w_inp_mascara == "moeda"){
          w_inp_val = _ccPlugin.mask.retorna(w_inp_obj_nome);
        };

        if(w_inp_mascara == "cpf" || w_inp_mascara == "cnpj"  || w_inp_mascara == "cpfcnpj" || w_inp_mascara == "cep" || w_inp_mascara == "milhar"){
          if(w_inp_val != ""){
            w_inp_val = _cc.string.remove.nonNumericos(w_inp_val);
          };
        };

        var w_inp_ignora = "0";
        // $("[name='" + w_inp.OBJ_NOME.toLowerCase() + "']").attr("data-inp-sequence") == "true" - RETIRADO PELO CICERO)
        if(
          $("[name='" + w_inp_obj_nome + "']").attr("data-inp-auto-increment") == "true" ||
          $("[name='" + w_inp_obj_nome + "']").attr("data-inp-primary-key") == "true" ||
          $("[name='" + w_inp_obj_nome + "']").attr("data-inp-unique-key") == "true"
        ){
          w_inp_ignora = "1";  
        };

        if(_ccPrp.consulta(w_inp_obj_nome,"COL_VIRTUAL") != "1"){
          if(w_inp_ignora == "0"){
            w_json_update += "\"" + w_inp_nome + "\" : \"" + _cc.replaceAspas(_cc.string.retorna(w_inp_val)) + "\",";
          };
        };
      };
    })

    /* REMOVE A ULTIMA VIRGULA E FECHA O JSON */
    w_json_update = w_json_update.substr(0, w_json_update.length-1) + "}";
    w_json_update = _cc.replaceParametros(w_json_update);
    
    console.log("====================> UPDATE - JSON");
    console.log(w_json_update);

    var w_terminal_msg = "<strong>JSON DO UPDATE: </strong><br>"; 
    w_terminal_msg += w_json_update; 
    w_terminal_msg += "<BR><strong>URL DO UPDATE: </strong><br>"; 
    w_terminal_msg += ccase.url.tabela + "tabela=" + w_grd_tab_nome + "&id=" + w_inp_id; 
    w_terminal_msg += "<hr>"

    $("#terminal").html(w_terminal_msg + $("#terminal").html());

    /* ENVIA DADOS*/
    var w_update_url = ccase.url.tabela + "tabela=" + w_grd_tab_nome + "&id=" + w_inp_id + "";
    console.log(w_update_url)
    
    /* TRACE LOG */
    window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.btn<br>"
    window.w_dese_trace_info += "<strong>FUNC</strong><br> _ccBtn.atualiza<br>";
    window.w_dese_trace_info += "<strong>OBJ:</strong><br> " + p_btn + "";
    var w_update_ajax = _cc.ajax(w_update_url, "put", "application/json", JSON.stringify(w_json_update),"", window.w_dese_trace_info);

    $.when(w_update_ajax).then(
      function(json_resp){
        console.log(json_resp)
        var w_rest_update = _cc.validaResponseAjax(json_resp, w_update_url);
        
        _cc.msg(json_resp.anMensagem,"success",5);

        if(_ccPrp.consulta(w_grd,"GRID_TREE") != 1){
          _ccGrd.load.dados(w_grd, "", w_inp_id);
        };

        /* RESET WARNINGS */
        $(":input").removeClass("border-danger");

        /* LOG */
        if(json_resp.cnRetorno == 0){
          var w_log_url = ccase.url.log
          w_log_url += "cnRegTP=3";
          w_log_url += "&cnMensagem=0";
          w_log_url += "&caTransacao=BTN 2 UPDATE  [" + w_grd_tab_nome + "][" + w_inp_id + "]";
          w_log_url += "&boSucesso=1";
          w_log_url += "&anMensagem=-";
          _cc.ajax(w_log_url);
        }else{
          var w_log_url = ccase.url.log
          w_log_url += "cnRegTP=3";
          w_log_url += "&cnMensagem=0";
          w_log_url += "&caTransacao=BTN 2 UPDATE  [" + w_grd_tab_nome + "][" + w_inp_id + "]";
          w_log_url += "&boSucesso=1";
          w_log_url += "&anMensagem=-";
          _cc.ajax(w_log_url);
        } 

        /* CLOSE EXTRA MODAL */
        if($.modal.length > 1){
          _cc.modal.close()
        };
      },
      function(error){
        _cc.error(error);
      }
    );
  };

  /* DELETA */
  this.deleta = function(p_btn){
     /* INFORMACOES BASICAS */
    var w_grd = $(p_btn).attr("data-btn-grd");
    var w_grd_tab_nome = _cc.string.retorna(ccase.matriz.grd["" + w_grd + ""].TAB_NOME, 1);
    var w_inp_id = $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='id']").val();
    var w_inp_m = ccase.matriz.inp;

    /* CONFIRM */
    var w_confirm = confirm("Deseja realmente excluir este item?");
    if (w_confirm == true) {

      /* ENVIA DADOS*/
      var w_delete_url = ccase.url.tabela + "tabela=" + w_grd_tab_nome + "&id=" + w_inp_id + "";
      
      /* TRACE LOG */
      window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.btn<br>"
      window.w_dese_trace_info += "<strong>FUNC</strong><br> _ccBtn.deleta<br>";
      window.w_dese_trace_info += "<strong>OBJ:</strong><br> " + p_btn + "";
      var w_delete_ajax = _cc.ajax(w_delete_url, "delete", "application/json","","",window.w_dese_trace_info);

      $.when(w_delete_ajax).then(
        function(json_resp){
          var w_rest_delete = _cc.validaResponseAjax(json_resp, w_delete_url);
          _cc.msg(json_resp.anMensagem,"success",5);
          
          _ccGrd.load.dados(w_grd)
          // _ccObj.load.objeto(w_grd, ccase.matriz.grd["" + w_grd + ""].OBJ_TP);
          
          if(json_resp.cnRetorno == 0){
            var w_log_url = ccase.url.log
            w_log_url += "cnRegTP=3";
            w_log_url += "&cnMensagem=0";
            w_log_url += "&caTransacao=BTN 3 DELETE [" + w_grd_tab_nome + "][" + w_inp_id + "]";
            w_log_url += "&boSucesso=1";
            w_log_url += "&anMensagem=-";
            _cc.ajax(w_log_url);
          }else{
            var w_log_url = ccase.url.log
            w_log_url += "cnRegTP=3";
            w_log_url += "&cnMensagem=0";
            w_log_url += "&caTransacao=BTN 3 DELETE [" + w_grd_tab_nome + "][" + w_inp_id + "]";
            w_log_url += "&boSucesso = 0";
            w_log_url += "&anMensagem=-";
            _cc.ajax(w_log_url);
          };
          
          _cc.modal.close()
        },
        function(error){
          _cc.error(error);
        }
      );
    };
  };


  this.relatorio = {
    modal:function(){
      /* DEF */

      var w_deferred = $.Deferred();

      /* VARIAVEIS */
      var w_htm_prp_url = "/Content/Modal//cc-modal-report.html?v="+Math.random(),
      w_htm_prp_ajax = "";

      /* LOADING AJAX */
      _cc.loading.show("Gerando Relatório",1);
      
      /* AJAX */
      if($("[name='cc-modal-report']").length == 0){
        w_htm_prp_ajax = _cc.ajax(w_htm_prp_url,"get","text/html");
      }else{
        w_htm_prp_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_prp_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-report']").length == 0){
            $(w_htm).appendTo("body");
          };

          /* HIDE LOADING */
          $("[name='cc-modal-report'] [name='cc-modal-report-dados']").html("");
          $("[name='cc-modal-report'] [name='cc-titulo']").html("");
          w_deferred.resolve();
        },
        function(error){
          _cc.error(error);
        }
      );

      return w_deferred.promise();
    },
    imprimir:function(p_btn){
      /* VARIAVEIS  */
      var w_grd = $(p_btn).attr("data-btn-grd"),
      w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"), 1),
      w_grd_data_length = $("[data-grd='" + w_grd + "']").DataTable().data().length;

      /* CHAMADA DO MODAL*/
      var w_report_modal_html = _ccBtn.relatorio.modal();

      $.when(w_report_modal_html).then(
        function(){
          /* VERIFICA SE HA DADOS */
          if(w_grd_data_length > 0){
            $("[name='" + w_grd + "'] tbody tr").each(function(w_index){

              /* CHAMADA DE DADOS DOS INPUTS */
              var w_inp_dados_ajax = _ccInp.load.dados(w_grd, $(this).find("a:eq(0)"));

              $.when(w_inp_dados_ajax).then(
                function(json_resp){
                  var w_html = "<div class='cc-bg-cinza-claro rounded float-left mt-3 mb-3 p-3 cc-bg-branco p-4'>";
                  $("[data-inp-obj-referencia-datagrid='" + w_grd + "']").each(function(){
                    
                    /* VARIAVEIS DOS INPUTS */
                    var w_obj_nome = $(this).attr("data-inp-name"),
                    w_obj_hidden = _ccPrp.consulta(w_obj_nome,"HIDDEN"),
                    w_colspan = $(this).attr("data-colspan"),
                    w_val = _cc.string.retorna(json_resp.data[0][$(this).attr("data-inp-col-nome")]),
                    w_content = $(this).text(),
                    w_obj_tp = _ccPrp.consulta(w_obj_nome,"INPUT_TP"),
                    w_label = $(this).closest(".cc-inp").find(".cc-inp-label").text(),
                    w_carga = _cc.string.retorna(_ccPrp.consulta(w_obj_nome,"ROTINA_CARGA")),
                    w_carga_tab_nome = "",
                    w_val_m = "",
                    w_val_str = "";

                    /* VALIDACAO DA CARGA */
                    if(w_carga != ""){
                      if(w_carga.toLowerCase().indexOf("tabela") >= 0){
                        w_carga = decodeURI(w_carga);
                        w_carga_tab_nome = w_carga.substr(0, w_carga.indexOf("&"));
                        w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
                        w_val_m =  w_val.toString().split("#");
                        w_val_str = "";
                      };
                    };

                    /* VERIFICA SE Ã‰ INPUT */
                    if(w_obj_hidden != "1"){
                    
                      /* VERIFICA SE Ã‰ UM SEPARADOR */
                      if(w_obj_tp == "18"){
                        w_html += "<div class='mt-3 mb-1 cc-col cc-col-" + w_colspan + "'>"
                        w_html += "<h4 class='text-uppercase font-weight-bold mt-4 mb-2 pt-3 pb-3 text-primary'>";
                        w_html += w_content;
                        w_html += "</h4>";
                        w_html += "</div>";
                      }else{

                        /* VERIFICA SE Ã‰ DOMINIO */
                        if(w_carga != ""){
                          if(w_carga.toLowerCase().indexOf("tabela") >= 0){

                            /* ROTINA CARGA AJAX */
                            for(var w_val_item in w_val_m){
                              w_val_str += "<em class='font-style-normal' data-inp-dom='" + _cc.string.retorna(w_carga_tab_nome + "-" + w_val_m[w_val_item], 1) + "'></em>, ";
                            };
                            w_val_str = w_val_str.substr(0, w_val_str.length - 2);
                            w_val = w_val_str;
                            _ccDom.load.item.ajax(w_carga, w_carga_tab_nome);
                          }else{
                            w_val = _ccDom.load.item.matriz(w_carga,w_val);
                          };
                        };

                        /* VERIFICA SE Ã‰ CHECKBOX */
                        if(w_obj_tp == 11){
                          if(w_val == 0){
                            w_val = "NÃ£o"
                          }else{
                            w_val = "Sim";
                          };
                        };

                        /* SE FOR VAZIO */
                        if(w_val == ""){
                          w_val  = "-"
                        };

                        /* SE DATA */
                        if(w_obj_tp == "3"){
                          w_val = _cc.converteData(w_val,"DD/MM/YYYY");
                        }else if(w_obj_tp == "4"){
                          w_val = _cc.converteData(w_val,"DD/MM/YYYY HH:mm");
                        };

                        w_html += "<div style='min-height:35px' class='border-left mt-3 mb-1 pl-2 cc-col cc-col-" + w_colspan + "'>"
                        w_html += "<label class='pt-3 pb-1  border-bottom font-weight-bold mb-0 float-left font-weight-bold w-100'> " + w_label +  " </label>"
                        w_html += "<span class='float-left w-100'>" + w_val + "</span>"
                        w_html += "</div>";
                      }
                    };
                  });

                  w_html += "</div>";
                  $("[name='cc-modal-report'] [name='cc-modal-report-dados']").append(w_html)
                  $("[name='cc-modal-report'] [name='cc-titulo']").html($("[name='frmgci.relatorios.contratos.fme'] .cc-titulo:eq(0)").html());
                  $("[name='cc-logo-modal']").attr("src",$("[name='cc-logo']").attr("src"))
                  if((w_index) == ($("[name='" + w_grd + "'] tbody tr").length -1)){
                    _cc.modal.show("cc-modal-report");
                  }
                },
                function(error){
                  _cc.error(error)
                }
              );
            });

          };
        },
        function(error){
          _cc.error(error);
        }
      );
    }
  };
  
  /* MONITORA CAMPOS */
  this.listen = function(){

     //CLICK DO FILTRAR
    $(document).on("mouseup","[data-btn-acao-padrao='8']",function(){
      _ccRep.download(this);
    });

    //CLICK DO FILTRAR
    $(document).on("mouseup","[data-btn-acao-padrao='7']",function(){
      _ccRep.imprimir(this);
    });

    //CLICK DO FILTRAR
    $(document).on("mouseup","[data-btn-acao-padrao='6']",function(){
      _ccBtn.relatorio.imprimir(this);
    });

    //CLICK DO FILTRAR
    $(document).on("mouseup","[data-btn-acao-padrao='99']",function(){
      _ccRep.novo.relatorio(this);
    });

    //CLICK DO FILTRAR
    $(document).on("mouseup","[data-btn-acao-padrao='100']",function(){
      _ccRep.novo.report(this);
    });

    //CLICK DO FILTRAR
    $(document).on({
      mouseup:function(){
        _ccBtn.filtro.abre(this);
      }
    },"[data-btn-acao-padrao='4']");

    //CLICK DO FILTRAR
    $(document).on({
      mouseup:function(){
        _ccBtn.filtro.executa(this);
      }
    },"[data-btn-acao-padrao='4_executa']");

    //CLICK DO SALVAR
    $(document).on("mouseup","[data-btn-acao-padrao='2']",function(){
      var w_grd = $(this).attr("data-btn-grd").toLowerCase();
      var w_grd_edit = _cc.string.retorna(ccase.matriz.grd["" + w_grd+ ""].OBJ_REFERENCIA_EDIT,1);

      $("[data-inp-default]").each(function(){
        if($(this).val() == ""){
          var w_val = $(this).attr("data-inp-default");
          $(this).val(w_val).change();
        };  
      });

      $("[data-inp-value]").each(function(){
        var w_val = $(this).attr("data-inp-value");
        $(this).val(w_val).change();
      });

      if($("[data-inp-col-nome='id'][data-inp-obj-referencia-datagrid='" + w_grd + "']").val() != ""){
        _ccBtn.atualiza(this);
      }else{
        _ccBtn.insere(this);
      };
    });

    //INSERT OU   
    $(document).on({
      mouseup:function(){
        _ccBtn.deleta(this);
      }
    },"[data-btn-acao-padrao='3']");

    //INICIA UM NOVO
    $(document).on({
      mouseup:function(){
        _ccBtn.novo(this);
      }
    },"[data-btn-acao-padrao='1']");
  };
};

var _ccBtn = new _ccaseButton();

$(document).ready(function(){
  _ccBtn.listen();
});

$(document).on("click","#teste",function(){
  var w_filter_index = 0;
  var w_str_filtro_WHERE = "";
  $("[name='frmgci.entidade.fme.grd_filtro'] :input").each(function(){
    var w_inp_val = _cc.string.retorna($(this).val());
    var w_inp_obj_nome = _cc.string.retorna($(this).attr("name"),1);

    var w_operador = "";
    if(w_inp_val != ""){
      var w_str_operador = _ccPrp.consulta(w_inp_obj_nome, "COL_FILTRO_OPERADOR");
      var w_operador_like_esquerda = ""
      var w_operador_like_direita = ""
      var w_str_and = ""
      
      if(w_str_operador == 1){w_operador = " = ";};
      if(w_str_operador == 2){w_operador = " > ";};
      if(w_str_operador == 3){w_operador = " < ";};
      if(w_str_operador == 4){w_operador = " <= ";};
      if(w_str_operador == 5){w_operador = " >= ";};
      if(w_str_operador == 6){w_operador = " <> ";};
      if(w_str_operador == 7){
        w_operador = " like ";
        w_operador_like_direita = "%";
      };
      if(w_str_operador == 8){w_operador_like_esquerda = "%";
        w_operador = " like ";
        w_operador_like_direita = "%";
      };
      if(w_str_operador == 9){w_operador = " = ";};
      if(w_str_operador == ""){w_operador = " = ";};

      if(w_filter_index > 0){
        w_str_and = " and ";
      };

      w_filter_index++;

      w_str_filtro_WHERE += w_str_and + " " + _ccPrp.consulta(w_inp_obj_nome,"COL_NOME") + " " + w_operador + " '" + w_operador_like_esquerda + $(this).val() + w_operador_like_direita + "' ";
    };
  });
  _ccGrd.load.dados("frmgci.entidade.fme.grd",w_str_filtro_WHERE)
})