var _ccaseReport = function(){
  this.report = {
    start:function(){
      console.log("REPORT ====> START");

      /* VALIDA SE PODE SER UM REPORT */
      var w_report_bo = _ccR.report.valida();
      if(w_report_bo == false){
        return false;
      };

      /* CARREGA O MODAL */
      var w_report_modal = _ccR.report.modal.load();

      /* LIMPA O CONTEUDO E A BASE */
      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").html("");
      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-base']").html("");

      /* BASE */
      $.when(w_report_modal).then(
        function(){
          /* BASE */
          var w_report_pai = _ccR.report.base.pai();
          console.log("REPORT ====> PAI", w_report_pai);
          var w_report_filhos = _ccR.report.base.filhos();
          console.log("REPORT ====> FILHO", w_report_filhos);
          
          /* LOAD MODAL */
          _ccR.report.modal.show();

          /* DADOS */
          _ccR.report.dados(w_report_pai, w_report_filhos);
        },
        function(error){
          _cc.error(error)
        }
      );
    },
    valida:function(){
      /* VARIAVEIS */
      var w_bo = true;

      /* VERIFICA SE TEM REPORT */
      if($("[data-report-page='1']").length == 0){
        _cc.msg("Página não possui a propriedade REPORT","danger",10);
        w_bo = false;
      }

      if($("[data-report-body='1']").length == 0){
        _cc.msg("REPORT não possui corpo","danger",10);
        w_bo = false;
      };

      return w_bo;
    },
    base:{
      pai:function(){
        
        /* VARIAVEIS PRINCIPAL */
        var w_report_pai_corpo = "",
        w_report_pai_corpo_html = "",
        w_report_pai_cabecalho = "",
        w_report_pai_cabecalho_html = "",
        w_report_pai_rodape_html = "",
        w_report_pai_rodape = "";

        /* VARIAVEIS DE CONTROLE */
        var w_obj_referencia_datagrid = "";

        /* PROCURA O CORPO REPORT PAI */
        $("[data-report-body='1']").each(function(){
          /* OBJ REFERENCIA DATAGRID */
          w_obj_referencia_datagrid = $(this).attr("data-obj-referencia-datagrid");
          if(w_obj_referencia_datagrid == ""){
            $("[data-report='1'] [data-grd-obj-relacionamento-datagrid='']").attr("data-grd");
          };
          
          if(_cc.string.retorna($("[data-grd='" + w_obj_referencia_datagrid + "']").attr("data-grd-obj-relacionamento-datagrid")) == ""){
            w_report_pai_corpo = $(this).attr("name");
            return false;
          };
        });

        w_report_pai_corpo_html = "<div class='row cc-row'><div name='" + w_report_pai_corpo + "' class='cc-col cc-col-36 cc-rep cc-rep-item'></div></div>";
        $("[name='cc-modal-relatorio-base']").append(w_report_pai_corpo_html);

        $("[name='" + w_report_pai_corpo + "'] *").each(function(){
          if(_cc.string.retorna($(this).attr("data-obj-tp")) != ""){
            if($(this).is(":visible") == true){
              
              /* VARIAVEIS DO CORPO */
              var w_obj_nome = _cc.string.retorna($(this).attr("name"),1),
              w_obj_tp = _cc.string.retorna($(this).attr("data-obj-tp"),1),
              w_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA"),1),
              w_inp_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1);


              /* INPUT */
              var w_obj_input_tp = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "INPUT_TP"),1),
              w_obj_col_nome = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COL_NOME"),1),
              w_obj_rotina_carga = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROTINA_CARGA")),
              w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
              w_obj_value = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "VALUE")),
              w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
              w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
              w_obj_alinhamento_h = _ccPrp.alinhamento(_ccPrp.consulta(w_obj_nome,"ALINHAMENTO_H")),
              w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

              /* PROPRIEDADES */
              var w_report_item_prop = "id='" + w_obj_nome + "' ";
              w_report_item_prop += "name='" + w_obj_nome + "' ";
              w_report_item_prop += "class='cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + " " + w_obj_alinhamento_h + "' ";

              /* HTML */
              var w_report_item_html = "<div " + w_report_item_prop + ">";
              
              /* TITULO OU LABEL */
              if(w_obj_titulo != ""){
                if(w_obj_tp == "inp"){
                  w_report_item_html += "<label class='cc-inp-label mb-0 font-weight-bold float-left w-100'>";
                  w_report_item_html += w_obj_titulo;
                  w_report_item_html += "</label>";
                }else{
                  w_report_item_html += "<h5 class='float-left w-100 border-bottom'>";
                  w_report_item_html += w_obj_titulo;
                  w_report_item_html += "</h5>";
                };
              };

              /* PROPRIEDADES */
              var w_inp_prop = "data-inp-col-nome='" + w_obj_col_nome + "' ";
              w_inp_prop +=  "data-inp-obj-nome='" + w_obj_nome + "' ";
              w_inp_prop +=  "data-inp-input-tp='" + w_obj_input_tp + "' ";
              w_inp_prop +=  "data-inp-rotina-carga='" + w_obj_rotina_carga + "' ";
              w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID") + "' ";
              w_inp_prop +=  "class='w-100 float-left mt-0 '";

              w_report_item_html += "<span " + w_inp_prop + ">"
              w_report_item_html += w_obj_value;
              w_report_item_html += "</span>";
              w_report_item_html += "</div>";

              /* PROPRIEDADES DO OBJETO */
              $("[name='cc-modal-relatorio-base'] [name='" + w_obj_referencia + "']").append(w_report_item_html)
            };
          };
        });

        /* PROCURA O CABECALHO DO REPORT PAI */
        if($("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").length > 0){
          w_report_pai_cabecalho = $("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").attr("name");
          if($("[name='" + w_report_pai_cabecalho + "']").length > 0){
            w_report_pai_cabecalho_html = $("[name='" + w_report_pai_cabecalho + "']")[0].outerHTML;
          };
        };

        /* PROCURA O RODAPE DO REPORT PAI */
        if($("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").length > 0){
          w_report_pai_rodape = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").attr("name");
          if($("[name='" + w_report_pai_rodape + "']").length > 0){
            w_report_pai_rodape_html = $("[name='" + w_report_pai_rodape + "']")[0].outerHTML;
          };
        };

        return [w_report_pai_corpo, w_report_pai_cabecalho, w_report_pai_rodape]
      },
      filhos:function(){
        /* VARIAVEIS PRINCIPAL */
        var w_report_filho_corpo = "",
        w_report_filho_corpo_html = "",
        w_report_filho_cabecalho = "",
        w_report_filho_cabecalho_html = "",
        w_report_filho_rodape_html = "",
        w_report_filho_rodape = "";

        /* VARIAVEIS DE CONTROLE */
        var w_obj_referencia_datagrid = "";

        /* PROCURA O CORPO REPORT PAI */
        $("[data-report-body='1']").each(function(){
          /* OBJ REFERENCIA DATAGRID */
          w_obj_referencia_datagrid = $(this).attr("data-obj-referencia-datagrid");
          
          if(_cc.string.retorna($("[data-grd='" + w_obj_referencia_datagrid + "']").attr("data-grd-obj-relacionamento-datagrid")) != ""){
            w_report_filho_corpo = $(this).attr("name");
            return false;
          };
        });

        w_report_filho_corpo_html = "<div class='row cc-row'><div name='" + w_report_filho_corpo + "' class='cc-col cc-col-36 cc-rep cc-rep-item'></div></div>";
        $("[name='cc-modal-relatorio-base']").append(w_report_filho_corpo_html);

        $("[name='" + w_report_filho_corpo + "'] *").each(function(){
          if(_cc.string.retorna($(this).attr("data-obj-tp")) != ""){
            if($(this).is(":visible") == true){
              
              /* VARIAVEIS DO CORPO */
              var w_obj_nome = _cc.string.retorna($(this).attr("name"),1),
              w_obj_tp = _cc.string.retorna($(this).attr("data-obj-tp"),1),
              w_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA"),1),
              w_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1),
              
              /* INPUT */
              w_obj_input_tp = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "INPUT_TP"),1),
              w_obj_col_nome = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COL_NOME"),1),
              w_obj_rotina_carga = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROTINA_CARGA")),
              w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
              w_obj_value = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "VALUE")),
              w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
              w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
              w_obj_alinhamento_h = _ccPrp.alinhamento(_ccPrp.consulta(w_obj_nome,"ALINHAMENTO_H")),
              w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

              /* PROPRIEDADES */
              var w_report_item_prop = "id='" + w_obj_nome + "' ";
              w_report_item_prop += "name='" + w_obj_nome + "' ";
              w_report_item_prop += "class='cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + " " + w_obj_alinhamento_h + "' ";

              /* HTML */
              var w_report_item_html = "<div " + w_report_item_prop + ">";
              /* TITULO OU LABEL */
              if(w_obj_titulo != ""){
                if(w_obj_tp == "inp"){
                  w_report_item_html += "<label class='cc-inp-label mb-0 font-weight-bold float-left w-100'>" + w_obj_titulo + "</label>";
                }else{
                  w_report_item_html += "<h5 class='float-left w-100 border-bottom'>" + w_obj_titulo + "</h5>";
                };
              };

              /* PROPRIEDADES */
              var w_inp_prop = "data-inp-col-nome='" + w_obj_col_nome + "' ";
              w_inp_prop +=  "data-inp-obj-nome='" + w_obj_nome + "' ";
              w_inp_prop +=  "data-inp-input-tp='" + w_obj_input_tp + "' ";
              w_inp_prop +=  "data-inp-rotina-carga='" + w_obj_rotina_carga + "' ";
              w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID") + "' ";
              w_inp_prop +=  "class='w-100 float-left mt-0 '";

              w_report_item_html += "<span " + w_inp_prop + ">"
              w_report_item_html += w_obj_value;
              w_report_item_html += "</span>";
              w_report_item_html += "</div>";

              /* PROPRIEDADES DO OBJETO */
              $("[name='cc-modal-relatorio-base'] [name='" + w_obj_referencia + "']").append(w_report_item_html)
            };
          };
        });

        /* PROCURA O CABECALHO DO REPORT PAI */
        if($("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").length > 0){
          w_report_filho_cabecalho = $("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").attr("name");
          if($("[name='" + w_report_filho_cabecalho + "']").length > 0){
            w_report_filho_cabecalho_html = $("[name='" + w_report_filho_cabecalho + "']")[0].outerHTML;
          };
        };

        /* PROCURA O RODAPE DO REPORT PAI */
        if($("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").length > 0){
          w_report_filho_rodape = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_obj_referencia_datagrid + "']").attr("name");
          if($("[name='" + w_report_filho_rodape + "']").length > 0){
            w_report_filho_rodape_html = $("[name='" + w_report_filho_rodape + "']")[0].outerHTML;
          };
        };

        return [w_report_filho_corpo, w_report_filho_cabecalho, w_report_filho_rodape]
      }
    },
    dados:function(p_report_pai, p_report_filhos){
      console.log("REPORT ====> DADOS", p_report_pai, p_report_filhos);
      var w_report_pai_corpo = p_report_pai[0],
      w_report_pai_cabecalho = p_report_pai[1],
      w_report_pai_rodape = p_report_pai[2],
      w_report_filho_corpo = p_report_filhos[0],
      w_report_filho_cabecalho = p_report_filhos[1],
      w_report_filho_rodape = p_report_filhos[2];

      /* LOAD DADOS DO GRID PRINCIPAL */
      var w_report_pai_grd = _cc.string.retorna(_ccPrp.consulta(w_report_pai_corpo,"OBJ_REFERENCIA_DATAGRID"),1);

      /* VARIAVEIS AJAX DO GRID PRINCIPAL */
      console.log("w_report_pai_grd",w_report_pai_grd)
      var w_report_pai_grd_restful = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"RESTFUL"), 1),
      w_report_pai_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"TAB_NOME"), 1),
      w_report_pai_grd_where = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"WHERE"), 1),
      w_report_pai_grd_groupby = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"GROUPBY"), 1),
      w_report_pai_grd_orderby = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"ORDERBY"), 1),
      w_report_pai_grd_complemento = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"COMPLEMENTO"), 1),
      w_report_pai_grd_where_adicional = _cc.replaceAspas($.trim($("[data-grd='" + w_report_pai_grd + "']").attr("data-grd-where-adicional")),1);

      /* VARIAVEIS DINAMICA */
      var w_report_pai_grd_dados_url = "TABELA=" + w_report_pai_grd_tab_nome;
      if($.trim(w_report_pai_grd_where) != "" && w_report_pai_grd_where_adicional != ""){
        w_report_pai_grd_where = w_report_pai_grd_where + " and " + w_report_pai_grd_where_adicional;
      }else if($.trim(w_report_pai_grd_where) == "" && w_report_pai_grd_where_adicional != ""){
        w_report_pai_grd_where = w_report_pai_grd_where_adicional
      };
      w_report_pai_grd_dados_url += "&WHERE=" + w_report_pai_grd_where;
      w_report_pai_grd_dados_url += "&ORDERBY=" + w_report_pai_grd_orderby;
      w_report_pai_grd_dados_url += "&GROUPBY=" + w_report_pai_grd_groupby;
      w_report_pai_grd_dados_url += "&COMPLEMENTO=" + w_report_pai_grd_complemento;

      console.log("w_report_pai_grd_restful",w_report_pai_grd_restful)

      /* AJAX DO REPORT */
      if(w_report_pai_grd_restful != ""){
        if($.trim(w_report_pai_grd_where_adicional) != ""){
          w_report_pai_grd_where_adicional = "&WHERE=" + w_report_pai_grd_where_adicional;
        };
        w_report_pai_grd_dados_url = ccase.url.tabela + w_report_pai_grd_restful + w_report_pai_grd_where_adicional
      }else{
        w_report_pai_grd_dados_url = ccase.url.tabela + w_report_pai_grd_dados_url + w_report_pai_grd_where_adicional; 
      };

      /* AJAX */
      console.log("w_report_pai_grd_dados_url",w_report_pai_grd_dados_url)
      w_report_pai_grd_dados_url = _cc.replaceAspas(_cc.replaceParametros(w_report_pai_grd_dados_url),1)
      var w_report_pai_grd_ajax = _cc.ajax(w_report_pai_grd_dados_url);

      $.when(w_report_pai_grd_ajax).then(
        function(json_resp){
          console.log(json_resp)
          if(json_resp.data.length > 0){
            /* REPORT ITEM */
            _ccR.report.item(p_report_pai, p_report_filhos, json_resp);
          };
        },
        function(error){
          _cc.error(error);
        }
      );
    },
    item:function(p_report_pai, p_report_filhos, p_json_resp){
      console.log(p_report_pai, p_report_filhos, p_json_resp)
      /* VARIAVEIS */
      var w_dados = p_json_resp.data,
      w_report_pai_corpo = p_report_pai[0],
      w_report_pai_cabecalho = p_report_pai[1],
      w_report_pai_rodape = p_report_pai[2],
      w_report_filho_corpo = p_report_filhos[0],
      w_report_filho_cabecalho = p_report_filhos[1],
      w_report_filho_rodape = p_report_filhos[2];
      /* VARIAVEIS GRIDS*/
      var w_report_pai_grd = _cc.string.retorna(_ccPrp.consulta(w_report_pai_corpo, "OBJ_REFERENCIA_DATAGRID"),1),
      w_report_filho_grd = _cc.string.retorna(_ccPrp.consulta(w_report_filho_corpo, "OBJ_REFERENCIA_DATAGRID"),1);

      /* CABECALHO E RODAPE */
      var w_report_pai_cabecalho_html = "",
      w_report_pai_rodape_html = "",
      w_report_filho_cabecalho_html = "",
      w_report_filho_rodape_html = "";

      /* COUNT */
      var w_report_pai_linhas_count = 0,
      w_report_filho_linhas_count = 0;

      if(w_report_pai_cabecalho != ""){
        w_report_pai_cabecalho_html = $("[name='" + w_report_pai_cabecalho + "']")[0].outerHTML;
      };

      if(w_report_pai_rodape != ""){
        w_report_pai_rodape_html = $("[name='" + w_report_pai_rodape + "']")[0].outerHTML;
      };

      if(w_report_filho_cabecalho != ""){
        w_report_filho_cabecalho_html = $("[name='" + w_report_filho_cabecalho + "']")[0].outerHTML;
      };

      if(w_report_filho_rodape != ""){
        w_report_filho_rodape_html = $("[name='" + w_report_filho_rodape + "']")[0].outerHTML;
      };

      /* VARIAVEIS DE CONTROLE */
      var w_qtd_linhas_pai = _ccPrp.consulta(w_report_pai_corpo,"QTD_LINHAS");
      if(w_qtd_linhas_pai == ""){w_qtd_linhas_pai = 0;};

      var w_qtd_linhas_filho = _ccPrp.consulta(w_report_filho_corpo,"QTD_LINHAS");
      if(w_qtd_linhas_filho == ""){w_qtd_linhas_filho = 0;};

      /* APPEND CABECALHO */
      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_pai_cabecalho_html);

      /* LOOP DOS DADOS */
      for(var w_linha in w_dados){

        /* CONTAGEM DE LINHAS*/
        if(w_report_pai_linhas_count == w_qtd_linhas_pai){
          w_report_pai_linhas_count = 0;
          $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_pai_rodape_html);
          $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_pai_cabecalho_html);
        };
        w_report_pai_linhas_count++;


        /* VARIAVEIS */
        var w_linha_dados = w_dados[w_linha];
        var w_item_pai_corpo = $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-base'] [name='" + w_report_pai_corpo + "']")[0].outerHTML;
        $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_item_pai_corpo)
        

        for(var w_item in w_linha_dados){

          /* ****************************************************** */
          /* ****************************************************** */
          /* ************************* PAI ************************ */
          /* ****************************************************** */
          /* ****************************************************** */

          /* VARIAVEIS */
          var w_item_col_nome = _cc.string.retorna(w_item, 1);
          var w_item_val = w_linha_dados[w_item];
          var w_item_tp = _cc.string.retorna($("span[data-inp-col-nome='" + w_item_col_nome + "']").attr("data-inp-input-tp"));
          var w_item_rotina_carga = _cc.string.retorna($("span[data-inp-col-nome='" + w_item_col_nome + "']").attr("data-inp-rotina-carga"));

          /* VERIFICA O TIPO */
          if(w_item_tp == 3){w_item_val = _cc.converteData(w_item_val,"DD/MM/YYYY");};
          if(w_item_tp == 4){w_item_val = _cc.converteData(w_item_val,"DD/MM/YYYY HH:mm:ss");};
          if(w_item_tp == 11){w_item_val = w_item_val == 0 ? "não" : "sim";};

          /* VERIFICA SE POSSUI CARGA */
          if(w_item_rotina_carga != ""){
            if(w_item_rotina_carga.toLowerCase().indexOf("tabela") >= 0){
              w_item_val = _ccDom.load.item.tag(w_item_rotina_carga, w_item_val);
            }else{
              if(_cc.string.retorna(w_item_val) != ""){
                w_item_val = _ccDom.load.item.matriz(w_item_rotina_carga, w_item_val);
              };
            };
          };

          /* VERIFICA VAZIO */
          if(w_item_val == ""){w_item_val = "-"};

          /* APPEND REPORT PAI */
          $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados'] span[data-inp-col-nome='" + w_item_col_nome + "'][data-inp-obj-referencia-datagrid='" + w_report_pai_grd + "']:last").html(w_item_val);
        };

        /* ****************************************************** */
        /* ****************************************************** */
        /* *********************** FILHOS *********************** */
        /* ****************************************************** */
        /* ****************************************************** */

        /* VERIFICA SE EXISTE FILHOS */
        if(w_report_filho_corpo != ""){

          /* VARIAVEIS DOS RELACIONADOS */
          var w_report_filho_grd = w_report_filho_grd,
          w_report_fme_filho = w_report_filho_corpo,
          w_report_filho_grd_fk_pos = _ccObj.busca.binaria("wMObjetoForeignKey", _cc.string.retorna(_ccPrp.consulta(w_report_filho_grd,"TAB_NOME"),1), 0),
          w_report_filho_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_report_filho_grd,"TAB_NOME"),1),
          w_report_filho_grd_obj_relacionamento_datagrid = _cc.string.retorna(_ccPrp.consulta(w_report_filho_grd,"OBJ_RELACIONAMENTO_DATAGRID"),1);

          var w_report_pai_grd = w_report_filho_grd_obj_relacionamento_datagrid,
          w_report_pai_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_report_pai_grd,"TAB_NOME"),1);

          var w_report_filho_grd_fk = "",
          w_report_filho_grd_fk_col = "",
          w_report_filho_grd_fk_val = "",
          w_report_filho_grd_url = '';
        
          /* VERIFICA AS FK */
          if(w_report_filho_grd_fk_pos != -1){
            for(var w_index = w_report_filho_grd_fk_pos;w_index < wMObjetoForeignKey.length;w_index++){
              try{
                if(w_report_filho_grd_tab_nome == wMObjetoForeignKey[w_index][0]){
                  if(wMObjetoForeignKey[w_index][2] == w_report_pai_grd_tab_nome){
                    w_report_filho_grd_fk_pos = w_index;
                    break;
                  };
                }else{
                  break;
                };
              }catch(error){
                _cc.error(error);
              };
            };

            w_report_filho_grd_fk = wMObjetoForeignKey[w_report_filho_grd_fk_pos][2]+"."+wMObjetoForeignKey[w_report_filho_grd_fk_pos][3];
            w_report_filho_grd_fk_col = wMObjetoForeignKey[w_report_filho_grd_fk_pos][3];
            w_report_filho_grd_fk_val = $.trim($("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados'] span[data-inp-col-nome='" + w_report_filho_grd_fk_col + "'][data-inp-obj-referencia-datagrid='" + w_report_pai_grd + "']:last").text());

            w_report_filho_grd_url = ccase.url.tabela + "&TABELA=" + w_report_filho_grd_tab_nome + "&WHERE=" + w_report_filho_grd_fk_col + "='" + w_report_filho_grd_fk_val + "'";
            
            /* AJAX */
            $.ajax({
              url:w_report_filho_grd_url,
              method:"get", 
              async:false,
              success:function(json_resp_relacionado){
                /* VARIAVEIS */
                w_report_filho_linhas_count = 0;
                var w_dados_filho = json_resp_relacionado.data;

                /* VERIFICA SE POSSUI DADOS */
                if(w_dados_filho.length > 0){
                  /* INSERE O CABECALHO DO FILHO */
                  $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_filho_cabecalho_html);

                  for(var w_linha_filho in w_dados_filho){
                    /* CONTAGEM DE LINHAS*/
                    if(w_report_filho_linhas_count == w_qtd_linhas_filho){
                      w_report_filho_linhas_count = 0;
                      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_filho_rodape_html);
                      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_report_filho_cabecalho_html);
                    };
                    w_report_filho_linhas_count++;

                    /* VARIAVEIS */
                    var w_linha_dados_filho = w_dados_filho[w_linha_filho];
                    var w_item_filho_corpo = $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-base'] [name='" + w_report_filho_corpo + "']")[0].outerHTML;
                    $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_item_filho_corpo);

                    for(var w_item_filho in w_linha_dados_filho){

                      /* VARIAVEIS */
                      var w_item_filho_col_nome = _cc.string.retorna(w_item_filho, 1);
                      var w_item_filho_val = w_linha_dados_filho[w_item_filho];
                      var w_item_filho_tp = _cc.string.retorna($("span[data-inp-col-nome='" + w_item_filho_col_nome + "']").attr("data-inp-input-tp"));
                      var w_item_filho_rotina_carga = _cc.string.retorna($("span[data-inp-col-nome='" + w_item_filho_col_nome + "']").attr("data-inp-rotina-carga"));

                      /* VERIFICA O TIPO */
                      if(w_item_filho_tp == 3){w_item_filho_val = _cc.converteData(w_item_filho_val,"DD/MM/YYYY");};
                      if(w_item_filho_tp == 4){w_item_filho_val = _cc.converteData(w_item_filho_val,"DD/MM/YYYY HH:mm:ss");};
                      if(w_item_filho_tp == 11){w_item_filho_val = w_item_filho_val == 0 ? "não" : "sim";};

                      /* VERIFICA SE POSSUI CARGA */
                      if(w_item_filho_rotina_carga != ""){
                        if(w_item_filho_rotina_carga.toLowerCase().indexOf("tabela") >= 0){
                          w_item_filho_val = _ccDom.load.item.tag(w_item_filho_rotina_carga, w_item_filho_val);
                        }else{
                          if(_cc.string.retorna(w_item_filho_val) != ""){
                            w_item_filho_val = _ccDom.load.item.matriz(w_item_filho_rotina_carga, w_item_filho_val);
                          };
                        };
                      };

                      /* VERIFICA VAZIO */
                      if(w_item_filho_val == ""){w_item_filho_val = "-"};

                      /* APPEND REPORT PAI */
                      $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados'] span[data-inp-col-nome='" + w_item_filho_col_nome + "'][data-inp-obj-referencia-datagrid='" + w_report_filho_grd + "']:last").html(w_item_filho_val);
                    };
                  };
                };
              }
            })

          };
        }
      };

    },
    modal:{
      load:function(){
        /* DEFERRED */
        var w_deferred = $.Deferred();

        /* VARIAVEIS */
        var w_htm_url = "/Content/Modal/cc-modal-relatorio.html?v=" + Math.random(),
        w_htm_ajax = "";

        /* AJAX */
        if($("[name='cc-modal-relatorio']").length == 0){
          w_htm_ajax = _cc.ajax(w_htm_url,"get","text/html");
        }else{
          w_htm_ajax = true;
        };

        /* WHEN */ 
        $.when(w_htm_ajax).then(
          function(w_resp_htm){
            var w_htm = w_resp_htm;

            /* APPEND DO MODAL */
            if($("[name='cc-modal-relatorio']").length == 0){
              $(w_htm).appendTo("body");
            };
            
            w_deferred.resolve();
          },
          function(error){
            _cc.error(error);
            _cc.loading.hide();
          }
        );

        return w_deferred.promise();
      },
      show:function(){
        _cc.modal.show("cc-modal-relatorio");
        _cc.loading.hide("novo-report");
      }
    }
  }
};  

var _ccR = new _ccaseReport();