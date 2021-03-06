var _ccaseReport = function(){
  this.relatorio = {
    dados:{
      principal:function(){
        /* DEFERRED */
        var w_deferred = $.Deferred();

        /* VARIAVEIS */
        var w_deferred_url = "",
        w_deferred_ajax = "";

        /* AJAX */
        w_deferred_ajax = _cc.ajax(w_deferred_url,"get","text/html");
        
        /* WHEN */ 
        $.when(w_deferred_ajax).then(
          function(w_deferred_resp){
            w_deferred.resolve();
          },
          function(error){
            _cc.error(error);
            _cc.loading.hide();
          }
        );

        return w_deferred.promise();
      },
      relacionados:function(){
      }
    }
  };

  this.novo = {
    report:function(){
      _ccR.report.start();
      return false;
      /* VARIAVEL PRINCIPAL */
      var w_report_page = $("[data-report-page='1']");

      /* LOADING */
      _cc.loading.show("Gerando Relatório",1,"novo-report");
      
      /* CARREGA JANELA MODAL */
      var w_modal_report = _ccRep.novo.modal();

      /* HTML MODAL ON PAGE */
      $.when(w_modal_report).then(
        function(w_modal_resp){
          /* CLEAR RESULT */
          $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").html("");

          /* VALIDACAO */
          if(w_report_page.length >= 0){

            /* VARIAVEIS */
            var w_m_report_body = [],
            w_m_report_cabecalho = [],
            w_m_report_rodape = [];

            /*CONSTRUCAO DAS VARIAVEIS */
            $("[data-report-body]").each(function(){
              if($(this).attr("data-report-body") != ""){

                /* VARIAVEIS CONSTRUCAO DOS BLOCOS */
                var w_obj_referencia_datagrid = $(this).attr("data-obj-referencia-datagrid"),
                w_obj_nivel = 0;

                if($("[data-grd='" + w_obj_referencia_datagrid + "']").attr("data-grd-obj-relacionamento-datagrid") != ""){
                  w_obj_nivel = 1;
                };

                /* BODYS DO REPORT */
                w_m_report_body.push([w_obj_nivel, $(this).attr("name"), $(this).attr("data-obj-referencia-datagrid")]);
              };
            });

            /* SORT */
            w_m_report_body.sort();

            /* VARIAVEIS */
            var w_report_pai = [],
            w_report_filho = [],
            w_report_cabecalho_pai = [],
            w_report_cabecalho_filho = [],
            w_report_rodape_pai = [],
            w_report_rodape_filho = [];
            
            for(var w_index = 0;w_index <= w_m_report_body.length - 1;w_index++){
              if(w_m_report_body[w_index][0] == 0){
                w_report_pai.push(w_m_report_body[w_index][1])
              }else{
                w_report_filho.push(w_m_report_body[w_index][1])
              };
            };

            if(w_report_pai.length == 0){
              _cc.msg("O Relatório não possui um Corpo definido","danger",10)
            }

            /* VERIFICA QUEM É TABELA PAI */
            for(var w_index_pai in w_report_pai){
              /* VARIAVEIS  */
              var w_fme = w_report_pai[w_index_pai],
              w_fme_grd= $("[name='" + w_report_pai[w_index_pai] + "']").attr("data-obj-referencia-datagrid"),
              w_fme_cabecalho = $("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_fme_grd  + "']"),
              w_fme_rodape = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_fme_grd  + "']");
              
              /* VALIDA CABECALHO */
              if(w_fme_cabecalho.length > 0){
                w_report_cabecalho_pai.push(w_fme_cabecalho.attr("name"));
              };

              if(w_report_cabecalho_pai.length == 0){
                _cc.msg("Relatório sem Cabeçalho","danger",10);
              };
              
              /* VALIDA RODAPE */
              if(w_fme_rodape.length > 0){
                w_report_rodape_pai.push(w_fme_rodape.attr("name"));
              };

              if(w_report_rodape_pai.length == 0){
                _cc.msg("Relatório sem Rodapé","danger",10);
              };
            };

            /* VERIFICA QUEM É TABELA FILHO */
            for(var w_index_filho in w_report_filho){
              /* VARIAVEIS  */
              var w_fme = w_report_filho[w_index_filho],
              w_fme_grd= $("[name='" + w_report_filho[w_index_filho] + "']").attr("data-obj-referencia-datagrid"),
              w_fme_cabecalho = $("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_fme_grd  + "']"),
              w_fme_rodape = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_fme_grd  + "']");
              
              /* VALIDA CABECALHO */
              if(w_fme_cabecalho.length > 0){
                w_report_cabecalho_filho.push(w_fme_cabecalho.attr("name"));
              };
           
              /* VALIDA RODAPE */
              if(w_fme_rodape.length > 0){
                w_report_rodape_filho.push(w_fme_rodape.attr("name"));
              };
            };

            /* CRIACAO DO CORPO DO PAI */
            for(var w_pai in w_report_pai){
              
              /* VARIAVEIS */
              var w_report_pai = w_report_pai[w_pai];

              /* START HTML REPORT */
              var w_html_report = "<div class='cc-report-item' name='cc-report-item' id='cc-report-item'>";
              w_html_report += "<div class='cc-fme-report cc-fme cc-row'>";

              var w_obj_nome = w_report_pai,
              w_obj_referencia_datagrid = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1),
              w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
              w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
              w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
              w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

              /* PROPRIEDADES */
              var w_report_item_props = "id='cc-report-" + w_obj_nome + "' ";
              w_report_item_props += "name='cc-report-" + w_obj_nome + "' ";
              w_report_item_props += "class='cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + "' ";
              
              /* REPORT PRINCIPAL */
              w_html_report += "<div " + w_report_item_props + ">";
              /* TITULO OU LABEL */
              if(w_obj_titulo != ""){
                w_html_report_item += "<h5 class='float-left w-100 border-bottom'>" + w_obj_titulo + "</h5>";
              };
              w_html_report += "</div>";

              w_html_report += "</div>";
              w_html_report += "</div>";

              /* REPORT PRINCIPAL */
              $("[name='" + w_report_principal + "'] *").each(function(){
                if(_cc.string.retorna($(this).attr("data-obj-tp")) != ""){
                  if($(this).is(":visible") == true){
                    
                    /* VARIAVEIS */
                    var w_obj_nome = _cc.string.retorna($(this).attr("name"),1),
                    w_obj_tp = _cc.string.retorna($(this).attr("data-obj-tp"),1),
                    w_obj_referencia = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA"),1),
                    w_obj_referencia_datagrid = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1),
                    w_obj_input_tp = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "INPUT_TP"),1),
                    w_obj_col_nome = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COL_NOME"),1),
                    w_obj_rotina_carga = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROTINA_CARGA")),
                    w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
                    w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
                    w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
                    w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

                    /* VERIFICA OBJETO DE REFERENCIA */
                    if($("[name='" + w_obj_referencia + "']").length == 0){
                      w_obj_referencia = "cc-report-body-item";
                    };

                    /* PROPRIEDADES */
                    var w_report_item_props = "id='cc-report-" + w_obj_nome + "' ";
                    w_report_item_props += "name='cc-report-" + w_obj_nome + "' ";
                    w_report_item_props += "class='cc-col-min-height cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + "' ";

                    var w_html_report_item = "<div " + w_report_item_props + ">";
                    /* TITULO OU LABEL */
                    if(w_obj_titulo != ""){
                      if(w_obj_tp == "inp"){
                        w_html_report_item += "<label class='cc-inp-label mb-0 font-weight-bold float-left w-100'>" + w_obj_titulo + "</label>";
                      }else{
                        w_html_report_item += "<h5 class='float-left w-100 border-bottom'>" + w_obj_titulo + "</h5>";
                      };
                    };

                    /* PROPRIEDADES */
                    var w_inp_prop = "data-inp-col-nome='" + w_obj_col_nome + "' ";
                    w_inp_prop +=  "data-inp-obj-nome='" + w_obj_nome + "' ";
                    w_inp_prop +=  "data-inp-input-tp='" + w_obj_input_tp + "' ";
                    w_inp_prop +=  "data-inp-rotina-carga='" + w_obj_rotina_carga + "' ";
                    w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID") + "' ";
                    w_inp_prop +=  "class='w-100 float-left mt-0 '";

                    w_html_report_item += "<span " + w_inp_prop + "></span>";
                    w_html_report_item += "</div>";
                    
                    $("[name='" + w_obj_referencia + "']").append(w_html_report_item);
                  };
                };
              });
            };


            /* MONTA HTML DO PAI */
            return false;


            /* VERIFICA SE TEM REPORT_BODY */
            if(w_m_report_body.length > 0){
              
              /* RELATORIOS FILHOS */
              for(var w_report in w_m_report_body){
                if(w_m_report_body[w_report][0] == 1){

                  /* VARIAVEL FME/GRD PRINCIPAL */
                  var w_report_filho = "";
                  w_report_filho = w_m_report_body[w_report][1];

                  /* START HTML REPORT */
                  var w_obj_nome = w_report_filho,
                  w_obj_referencia = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA"),1),
                  w_obj_referencia_datagrid = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1),
                  w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
                  w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
                  w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
                  w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

                  var w_report_item_props = "id='cc-report-" + w_obj_nome + "' ";
                  w_report_item_props += "name='cc-report-" + w_obj_nome + "' ";
                  w_report_item_props += "class='cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + "' ";
                  
                  /* REPORT PRINCIPAL */
                  var w_html_report = "<div " + w_report_item_props + ">";
                  
                  /* TITULO OU LABEL */
                  if(w_obj_titulo != ""){
                    w_html_report_item += "<h5 class='float-left w-100 border-bottom'>" + w_obj_titulo + "</h5>";
                  };
                  w_html_report += "</div>";

                  if($("[name='" + w_obj_referencia + "']").length == 0){
                    w_obj_referencia = "[name='cc-report-item'] .cc-fme-report";
                  }else{
                    w_obj_referencia = "[name='" + w_obj_referencia + "']";
                  };

                  $(w_obj_referencia).append(w_html_report);

                  /* REPORT PRINCIPAL */
                  $("[name='" + w_report_filho + "'] *").each(function(){
                    if(_cc.string.retorna($(this).attr("data-obj-tp")) != ""){
                      if($(this).is(":visible") == true){
                        if(_cc.string.retorna($(this).attr("data-report-cabecalho")) == ""){
                          /* VARIAVEIS */
                          var w_obj_nome = _cc.string.retorna($(this).attr("name"),1),
                          w_obj_tp = _cc.string.retorna($(this).attr("data-obj-tp"),1),
                          w_obj_referencia = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA"),1),
                          w_obj_referencia_datagrid = _cc.string.retorna("cc-report-" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID"),1),
                          w_obj_input_tp = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "INPUT_TP"),1),
                          w_obj_col_nome = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COL_NOME"),1),
                          w_obj_rotina_carga = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROTINA_CARGA")),
                          w_obj_colspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "COLSPAN"),1),
                          w_obj_rowspan = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "ROWSPAN"),1),
                          w_obj_extra_class = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "EXTRA_CLASS"),1),
                          w_obj_titulo  = _cc.string.retorna(_ccPrp.consulta(w_obj_nome, "TITULO"));

                          /* VERIFICA OBJETO DE REFERENCIA */
                          if($("[name='" + w_obj_referencia + "']").length == 0){
                            w_obj_referencia = "cc-report-body-item";
                          };

                          /* PROPRIEDADES */
                          var w_report_item_props = "id='cc-report-" + w_obj_nome + "' ";
                          w_report_item_props += "name='cc-report-" + w_obj_nome + "' ";
                          w_report_item_props += "class='cc-col-min-height cc-col cc-col-" + w_obj_colspan + " " + w_obj_extra_class + "' ";

                          var w_html_report_item = "<div " + w_report_item_props + ">";
                          
                          /* TITULO OU LABEL */
                          if(w_obj_titulo != ""){
                            if(w_obj_tp == "inp"){
                              w_html_report_item += "<label class='cc-inp-label mb-0 font-weight-bold float-left w-100'>" + w_obj_titulo + "</label>";
                            }else{
                              w_html_report_item += "<h5 class='float-left w-100 border-bottom'>" + w_obj_titulo + "</h5>";
                            };
                          };

                          /* PROPRIEDADES */
                          var w_inp_prop = "data-inp-col-nome='" + w_obj_col_nome + "' ";
                          w_inp_prop +=  "data-inp-obj-nome='" + w_obj_nome + "' ";
                          w_inp_prop +=  "data-inp-input-tp='" + w_obj_input_tp + "' ";
                          w_inp_prop +=  "data-inp-rotina-carga='" + w_obj_rotina_carga + "' ";
                          w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + _ccPrp.consulta(w_obj_nome, "OBJ_REFERENCIA_DATAGRID") + "' ";
                          w_inp_prop +=  "class='w-100 float-left mt-0 '";

                          w_html_report_item += "<span " + w_inp_prop + "></span>";
                          
                          w_html_report_item += "</div>";
                          
                          $("[name='" + w_obj_referencia + "']").append(w_html_report_item);
                        };
                      };
                    };
                  });

                  
                  /* LOAD DADOS DO GRID PRINCIPAL */
                  var w_grd_principal = $("[name='" + w_report_principal + "']").attr("data-obj-referencia-datagrid");

                  /* VARIAVEIS AJAX DO GRID PRINCIPAL */
                  var w_grd_restful = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"RESTFUL"), 1),
                  w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"TAB_NOME"), 1),
                  w_grd_where = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"WHERE"), 1),
                  w_grd_groupby = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"GROUPBY"), 1),
                  w_grd_orderby = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"ORDERBY"), 1),
                  w_grd_complemento = _cc.string.retorna(_ccPrp.consulta(w_grd_principal,"COMPLEMENTO"), 1),
                  w_grd_where_adicional = _cc.replaceAspas($.trim($("[data-grd='" + w_grd_principal + "']").attr("data-grd-where-adicional")),1);

                  /* VARIAVEIS DINAMICA */
                  var w_grd_table_dados_url = "TABELA=" + w_grd_tab_nome;
                  if($.trim(w_grd_where) != "" && w_grd_where_adicional != ""){
                    w_grd_where = w_grd_where + " and " + w_grd_where_adicional;
                  }else if($.trim(w_grd_where) == "" && w_grd_where_adicional != ""){
                    w_grd_where = w_grd_where_adicional
                  };
                  w_grd_table_dados_url += "&WHERE=" + w_grd_where;
                  w_grd_table_dados_url += "&ORDERBY=" + w_grd_orderby;
                  w_grd_table_dados_url += "&GROUPBY=" + w_grd_groupby;
                  // w_grd_table_dados_url += "&COLUNAS=" + w_grd_cols_col_str;
                  w_grd_table_dados_url += "&COMPLEMENTO=" + w_grd_complemento;

                  /* AJAX DO REPORT */
                  if(w_grd_restful != ""){
                    if($.trim(w_grd_where_adicional) != ""){
                      w_grd_where_adicional = "&WHERE=" + w_grd_where_adicional;
                    }
                    w_grd_table_dados_url = ccase.url.tabela + w_grd_restful + w_grd_where_adicional
                  }else{
                    w_grd_table_dados_url = ccase.url.tabela + w_grd_table_dados_url + w_grd_where_adicional; 
                  };

                  /* AJAX */
                  var w_grd_ajax = _cc.ajax(_cc.replaceAspas(_cc.replaceParametros(w_grd_table_dados_url),1));
      
                  /* RESPONSE DO AJAX */
                  $.when(w_grd_ajax).then(
                    function(json_resp){

                      /* VARIAVEIS */
                      var w_dados = json_resp.data,
                      w_carga_ajax_m = [],
                      w_qtd_linhas = _ccPrp.consulta(w_report_principal,"QTD_LINHAS"),
                      w_index_linha = 0,
                      w_principal_cabecalho = 0,
                      w_principal_rodape = 0;

                      if(w_qtd_linhas == ""){
                        w_qtd_linhas = 1; 
                      };

                      /* LOOP DO REPORT */
                      for(var w_linha in w_dados){
                        
                        /* CABECALHO */
                        if(w_index_linha == w_qtd_linhas){
                          w_principal_cabecalho = 1;
                          w_principal_rodape = 1;
                          w_index_linha = 0;
                        }else{
                          w_principal_cabecalho = 0;
                          w_principal_rodape = 0;
                        };

                        if(w_linha == 0){
                          w_principal_cabecalho = 1;
                        };

                        w_index_linha = w_index_linha + 1;

                        /* APPEND REPORT DA BASE*/
                        // $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_html_report);
                        var w_html_report = $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-base']").html();
                        
                        /* CABECALHO */
                        if(w_principal_rodape == 1){
                          if($("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']").length > 0){
                            var w_rodape_html = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']")[0].outerHTML;
                            $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_rodape_html);
                          };
                        };
                        if(w_principal_cabecalho == 1){
                          if($("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']").length > 0){
                            var w_cabecalho_html = $("[data-report-cabecalho='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']")[0].outerHTML;
                            $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_cabecalho_html);
                          };
                        };

                        /* ITEM */
                        $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_html_report);

                        if(w_linha == w_dados.length -1){
                          if($("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']").length > 0){
                            var w_rodape_html = $("[data-report-rodape='1'][data-obj-referencia-datagrid='" + w_grd_principal + "']")[0].outerHTML;
                            $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_rodape_html);
                          };
                        };
                        /* RODAPE */
                        
                 
                        /* INSERT DADOS */
                        var w_linha_dado = w_dados[w_linha];

                        for(var w_item in w_linha_dado){
                          
                          /* VARIAVEIS */
                          var w_col_dado = _cc.string.retorna(w_item, 1);
                          var w_val_dado = w_linha_dado[w_item];
                          var w_obj_referencia_datagrid = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-referencia-datagrid"));
                          var w_tp = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-input-tp"));
                          var w_rotina_carga = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-rotina-carga"));
                          var w_obj_nome = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-nome"));
                          var w_tab_nome = _ccPrp.consulta(w_obj_referencia_datagrid,"TAB_NOME");

                          /* VERIFICA SE DATA */
                          if(w_tp == 3){
                            w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY");
                          };
                          if(w_tp == 4){
                            w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY HH:mm:ss");
                          };
                          if(w_tp == 11){
                            w_val_dado = w_val_dado == 0 ? "não" : "sim";
                          };

                          /* VERIFICA SE CARGA */
                          if(w_rotina_carga != ""){
                            if(w_rotina_carga.toLowerCase().indexOf("tabela") >= 0){
                              w_val_dado = _ccDom.load.item.tag(w_rotina_carga, w_val_dado);
                            }else{
                              if(_cc.string.retorna(w_val_dado) != ""){
                                w_val_dado = _ccDom.load.item.matriz(w_rotina_carga, w_val_dado);
                              };
                            };
                          };

                          /* VERIFICA VAZIO */
                          if(w_val_dado == ""){
                            w_val_dado = "-"
                          };

                          $("span[data-inp-col-nome='" + w_col_dado + "'][data-inp-obj-referencia-datagrid='" + w_grd_principal + "']:last").html(w_val_dado);
                        };

                        /* FILHOS */
                        var w_index_cabecalho_relacionado = 0;
                        for(var w_report in w_m_report_body){
                          if(w_m_report_body[w_report][0] == 1){
                            
                            /* VARIAVEIS DOS RELACIONADOS */
                            var w_grd_relacionado = _cc.string.retorna(w_m_report_body[w_report][2],1),
                            w_fme_relacionado = w_m_report_body[w_report][1],
                            w_grd_fk_pos = _ccObj.busca.binaria("wMObjetoForeignKey", _cc.string.retorna(_ccPrp.consulta(w_grd_relacionado,"TAB_NOME"),1), 0),
                            w_self_grd_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_grd_relacionado,"OBJ_NOME"),1),
                            w_self_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd_relacionado,"TAB_NOME"),1),
                            w_self_grd_obj_relacionamento_datagrid = _cc.string.retorna(_ccPrp.consulta(w_grd_relacionado,"OBJ_RELACIONAMENTO_DATAGRID"),1),
                            w_parent_grd = w_self_grd_obj_relacionamento_datagrid,
                            w_parent_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_parent_grd,"TAB_NOME"),1),
                            w_grd_fk = "",
                            w_grd_fk_col = "",
                            w_grd_fk_val = "",
                            w_grd_where_relacionamento = '';
                          
                            /* VERIFICA AS FK */
                            if(w_grd_fk_pos != -1){
                              for(var w_index = w_grd_fk_pos;w_index < wMObjetoForeignKey.length;w_index++){
                                try{
                                  if(w_self_grd_tab_nome == wMObjetoForeignKey[w_index][0]){
                                    if(wMObjetoForeignKey[w_index][2] == w_parent_grd_tab_nome){
                                      w_grd_fk_pos = w_index;
                                      break;
                                    };
                                  }else{
                                    break;
                                  };
                                }catch(error){
                                  _cc.error(error);
                                };
                              };

                              w_grd_fk = wMObjetoForeignKey[w_grd_fk_pos][2]+"."+wMObjetoForeignKey[w_grd_fk_pos][3];
                              w_grd_fk_col = wMObjetoForeignKey[w_grd_fk_pos][3];
                              w_grd_fk_val = $.trim($("span[data-inp-col-nome='" + w_grd_fk_col + "'][data-inp-obj-referencia-datagrid='" + w_grd_principal + "']:last").text());

                              w_grd_where_relacionamento = ccase.url.tabela + "&TABELA=" + w_self_grd_tab_nome + "&WHERE=" + w_grd_fk_col + "='" + w_grd_fk_val + "'";
                              /* AJAX */

                              $.ajax({
                                url:w_grd_where_relacionamento,
                                method:"get", 
                                async:false,
                                success:function(json_resp_relacionado){
                                  var w_dados_relacionados = json_resp_relacionado.data;
                                  if(w_index_cabecalho_relacionado == 0){
                                    var w_cabecalho_relacionado = $("[name='" + w_fme_relacionado + "'] [data-report-cabecalho='1']")[0].outerHTML;
                                    $(".cc-fme-report:last").append(w_cabecalho_relacionado);
                                    w_index_cabecalho_relacionado = 1;
                                  };

                                  $("[name='cc-report-" + w_fme_relacionado + "']:last").remove();
                                  var w_base_relacionado = $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-base'] [name='cc-report-" + w_fme_relacionado + "']")[0].outerHTML;

                                  if(w_dados_relacionados.length > 0){
                                    for(var w_linha in w_dados_relacionados){
                                      $(".cc-fme-report:last").append(w_base_relacionado);
                                      var w_linha_dado = w_dados_relacionados[w_linha];
                                      
                                      for(var w_item in w_linha_dado){
                                        /* VARIAVEIS */
                                        var w_col_dado = _cc.string.retorna(w_item, 1);
                                        var w_val_dado = w_linha_dado[w_item];
                                        var w_obj_referencia_datagrid = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-referencia-datagrid"));
                                        var w_tp = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-input-tp"));
                                        var w_rotina_carga = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-rotina-carga"));
                                        var w_obj_nome = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-nome"));
                                        var w_tab_nome = _ccPrp.consulta(w_obj_referencia_datagrid,"TAB_NOME");

                                        /* VERIFICA SE DATA */
                                        if(w_tp == 3){
                                          w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY");
                                        };
                                        if(w_tp == 4){
                                          w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY HH:mm:ss");
                                        };
                                        if(w_tp == 11){
                                          w_val_dado = w_val_dado == 0 ? "não" : "sim";
                                        };

                                        /* VERIFICA SE CARGA */
                                        if(w_rotina_carga != ""){
                                          if(w_rotina_carga.toLowerCase().indexOf("tabela") >= 0){
                                            w_val_dado = _ccDom.load.item.tag(w_rotina_carga, w_val_dado);
                                          }else{
                                            if(_cc.string.retorna(w_val_dado) != ""){
                                              w_val_dado = _ccDom.load.item.matriz(w_rotina_carga, w_val_dado);
                                            };
                                          };
                                        };

                                        /* VERIFICA VAZIO */
                                        if(w_val_dado == ""){
                                          w_val_dado = "-"
                                        };

                                        $("span[data-inp-col-nome='" + w_col_dado + "'][data-inp-obj-referencia-datagrid='" + w_grd_relacionado + "']:last").html(w_val_dado);
                                      };
                                    };
                                  };
                                }
                              })
                            };

                          };
                        };

                      }; /* TERMINA O FOR */

                      /* EXECUTA ROTINA CARGA DOS AJAX */
                      $(".cc-fme-report:first [data-inp-rotina-carga]").each(function(){
                        /* VARIAVEIS */
                        var w_carga = $(this).attr("data-inp-rotina-carga");
                        if(w_carga != ""){
                          if(w_carga.toLowerCase().indexOf("tabela") >= 0){
                            w_carga = decodeURI(w_carga);
                            var w_carga_tab_nome = w_carga.substr(0, w_carga.indexOf("&"));
                            w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
                            _ccDom.load.item.ajax(w_carga, w_carga_tab_nome);
                          };
                        };
                      });

                      /* ABRE MODAL */
                      _cc.modal.show("cc-modal-relatorio");
                      _cc.loading.hide("novo-report")
                    },
                    function(error){
                      _cc.error(error)
                    }
                  );

                };
              };
            }else{
              _cc.msg("Nenhum corpo de relatório encontrado.","danger", 10);
            };

            /* INICIO DA CONFIGURACAO */
          }else{
            /* NAO POSSUI PROPRIEDADE DE REPORT */
            _cc.msg("Não é uma página de relatório","danger", 10);
          };
        },
        function(error){
          _cc.error()
        }
      );
    },
    





















    relatorio:function(){
      /* LOADING */
      _cc.loading.show("Gerando Relatório",1,"novo-relatorio");
      
      /* VARIAVEIS */
      var w_pagina_relatorio = $("[data-report=1]"),
      w_fme_relatorio = $("[data-report-body=1]").attr("name"),
      w_grd = _cc.string.retorna($(w_pagina_relatorio).find("[data-grd]").attr("data-grd"),1),
      w_grd_tab_nome = _ccPrp.consulta(w_grd,"TAB_NOME"),
      w_grd_restful = _ccPrp.consulta(w_grd,"RESTFUL"),
      w_grd_where = _ccPrp.consulta(w_grd,"WHERE"),
      w_colunas = "",
      w_colunas_m = "";

      var w_modal_report = _ccRep.novo.modal();

      /* HTML MODAL ON PAGE */
      $.when(w_modal_report).then(
        function(){

          /* VERIFICA SE A PAGINA É DE REPORT */
          if($("[data-report='1']").length > 0){
            if($("[data-report-body='1']").length > 0){
              /* VARIAVEIS */
              
              var w_fme_report_obj_nome = $("[data-report-body='1']").attr("name");
              var w_fme_report_cabecalho = _cc.string.retorna($("[data-report-cabecalho='1']").attr("name"),1);
              var w_fme_report_rodape = _cc.string.retorna($("[data-report-rodape='1']").attr("name"),1);
              var w_fme_report_colspan = _ccPrp.consulta(w_fme_report_obj_nome,"COLSPAN");
              var w_fme_report_extra_class = _ccPrp.consulta(w_fme_report_obj_nome,"EXTRA_CLASS");
              var w_fme_report_titulo = _ccPrp.consulta(w_fme_report_obj_nome,"TITULO");
              var w_fme_report_qtde_linhas = parseInt(_ccPrp.consulta(w_fme_report_obj_nome,"QTD_LINHAS"));
              var w_fme_report_index = 0;
              
              /* HTML DO CORPO DO REPORT */
              var w_html_report = "<div class='cc-report-item'><div class='cc-fme-report cc-fme cc-row " + w_fme_report_extra_class + "'>";
              w_html_report += "<div class='cc-col cc-col-" + w_fme_report_colspan + "'>";

              if($("[data-report-body='1'] [data-obj-tp='fme']").length > 0){
                
                $("[data-report-body='1'] [data-obj-tp='fme']").each(function(w_index, w_element){

                  if($(this).attr("data-report-cabecalho") != "1" && $(this).attr("data-report-rodape") != "1"){
                    
                    /* OBJ */
                    var w_fme_report_obj_nome = ($(this).attr("name"));
                    var w_fme_report_colspan = _ccPrp.consulta(w_fme_report_obj_nome,"COLSPAN");
                    var w_fme_report_extra_class = _ccPrp.consulta(w_fme_report_obj_nome,"EXTRA_CLASS");
                    var w_fme_report_titulo = _ccPrp.consulta(w_fme_report_obj_nome,"TITULO");
                    
                    w_html_report += "<div class='cc-fme cc-row " + w_fme_report_extra_class + "'>";
                    w_html_report += "<div class='cc-col cc-col-" + w_fme_report_colspan + "'>";
                    
                    if(w_fme_report_titulo != ""){
                      w_html_report += "<div class='cc-titulo pt-1 pb-1 border-bottom mt-1 mb-3'>";
                      w_html_report += "<h4 class='p-2 m-0'>";
                      w_html_report += w_fme_report_titulo;
                      w_html_report += "</h4>";
                      w_html_report += "</div>";
                    };

                    $("[data-obj-referencia='" + w_fme_report_obj_nome + "']:visible").each(function(){
                      var w_inp_report_obj_nome = $(this).attr("data-inp-name");
                      var w_inp_report_obj_referencia_datagrid = _ccPrp.consulta(w_inp_report_obj_nome,"OBJ_REFERENCIA_DATAGRID");
                      var w_inp_report_colspan = _ccPrp.consulta(w_inp_report_obj_nome,"COLSPAN");
                      var w_inp_report_obj_tp = _ccPrp.consulta(w_inp_report_obj_nome,"OBJ_TP");
                      var w_inp_report_input_tp = _ccPrp.consulta(w_inp_report_obj_nome,"INPUT_TP");

                      var w_inp_report_rotina_carga = _ccPrp.consulta(w_inp_report_obj_nome,"ROTINA_CARGA");
                      var w_inp_report_col_nome = _cc.string.retorna(_ccPrp.consulta(w_inp_report_obj_nome,"COL_NOME"),1);
                      var w_inp_report_input_titulo = _ccPrp.consulta(w_inp_report_obj_nome,"TITULO");

                      w_html_report += "<div class='cc-inp mb-3 cc-col cc-col-" + w_inp_report_colspan + "'>"
                      w_html_report += "<div class='form-group'>";
                      w_html_report += "<label class='cc-inp-label mb-0 font-weight-bold'>";
                      w_html_report += w_inp_report_input_titulo;
                      w_html_report += "</label>";
                      
                      var w_inp_prop = "data-inp-col-nome='" + w_inp_report_col_nome + "' ";
                      w_inp_prop +=  "data-inp-obj-nome='" + w_inp_report_obj_nome + "' ";
                      w_inp_prop +=  "data-inp-input-tp='" + w_inp_report_input_tp + "' ";
                      w_inp_prop +=  "data-inp-rotina-carga='" + w_inp_report_rotina_carga + "' ";
                      w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + w_inp_report_obj_referencia_datagrid + "' ";
                      w_inp_prop +=  "class='w-100 float-left mt-0 '";

                      w_html_report += "<span " + w_inp_prop + ">"
                      w_html_report += "</span>"
                      w_html_report += "</div>";
                      w_html_report += "</div>";
                    });

                    w_html_report += "</div>";
                    w_html_report += "</div>";
                  };
                });
              }else{
                $("[data-obj-referencia='" + w_fme_report_obj_nome + "']:visible").each(function(){
                    var w_inp_report_obj_nome = $(this).attr("data-inp-name");
                    var w_inp_report_obj_referencia_datagrid = _ccPrp.consulta(w_inp_report_obj_nome,"OBJ_REFERENCIA_DATAGRID");
                    var w_inp_report_colspan = _ccPrp.consulta(w_inp_report_obj_nome,"COLSPAN");
                    var w_inp_report_obj_tp = _ccPrp.consulta(w_inp_report_obj_nome,"OBJ_TP");
                    var w_inp_report_input_tp = _ccPrp.consulta(w_inp_report_obj_nome,"INPUT_TP");

                    var w_inp_report_rotina_carga = _ccPrp.consulta(w_inp_report_obj_nome,"ROTINA_CARGA");
                    var w_inp_report_col_nome = _cc.string.retorna(_ccPrp.consulta(w_inp_report_obj_nome,"COL_NOME"),1);
                    var w_inp_report_input_titulo = _ccPrp.consulta(w_inp_report_obj_nome,"TITULO");

                    w_html_report += "<div class='cc-inp mb-3 cc-col cc-col-" + w_inp_report_colspan + "'>"
                    w_html_report += "<div class='form-group'>";
                    w_html_report += "<label class='cc-inp-label mb-0 font-weight-bold'>";
                    w_html_report += w_inp_report_input_titulo;
                    w_html_report += "</label>";
                    
                    var w_inp_prop = "data-inp-col-nome='" + w_inp_report_col_nome + "' ";
                    w_inp_prop +=  "data-inp-obj-nome='" + w_inp_report_obj_nome + "' ";
                    w_inp_prop +=  "data-inp-input-tp='" + w_inp_report_input_tp + "' ";
                    w_inp_prop +=  "data-inp-rotina-carga='" + w_inp_report_rotina_carga + "' ";
                    w_inp_prop +=  "data-inp-obj-referencia-datagrid='" + w_inp_report_obj_referencia_datagrid + "' ";
                    w_inp_prop +=  "class='w-100 float-left mt-0 '";

                    w_html_report += "<span " + w_inp_prop + ">"
                    w_html_report += "</span>"
                    w_html_report += "</div>";
                    w_html_report += "</div>";
                  });
              };

              w_html_report += "</div>";
              w_html_report += "</div></div>";

              /* WHERE DO REPORT */
              var w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"), 1),
              w_grd_where = _cc.string.retorna(_ccPrp.consulta(w_grd,"WHERE"), 1),
              w_grd_groupby = _cc.string.retorna(_ccPrp.consulta(w_grd,"GROUPBY"), 1),
              w_grd_orderby = _cc.string.retorna(_ccPrp.consulta(w_grd,"ORDERBY"), 1),
              w_grd_complemento = _cc.string.retorna(_ccPrp.consulta(w_grd,"COMPLEMENTO"), 1);

              var w_grd_where_adicional = _cc.replaceAspas($.trim($("[data-grd='" + w_grd + "']").attr("data-grd-where-adicional")),1);

              var w_grd_table_dados_url = "TABELA=" + w_grd_tab_nome;
              if($.trim(w_grd_where) != "" && w_grd_where_adicional != ""){
                w_grd_where = w_grd_where + " and " + w_grd_where_adicional;
              }else if($.trim(w_grd_where) == "" && w_grd_where_adicional != ""){
                w_grd_where = w_grd_where_adicional
              };
              w_grd_table_dados_url += "&WHERE=" + w_grd_where;
              w_grd_table_dados_url += "&ORDERBY=" + w_grd_orderby;
              w_grd_table_dados_url += "&GROUPBY=" + w_grd_groupby;
              // w_grd_table_dados_url += "&COLUNAS=" + w_grd_cols_col_str;
              w_grd_table_dados_url += "&COMPLEMENTO=" + w_grd_complemento;

              /* AJAX DO REPORT */
              if(w_grd_restful != ""){
                if($.trim(w_grd_where_adicional) != ""){
                  w_grd_where_adicional = "&WHERE=" + w_grd_where_adicional;
                }
                w_grd_table_dados_url = ccase.url.tabela + w_grd_restful + w_grd_where_adicional
              }else{
                w_grd_table_dados_url = ccase.url.tabela + w_grd_table_dados_url + w_grd_where_adicional; 
              };

              var w_grd_ajax = _cc.ajax(_cc.replaceAspas(_cc.replaceParametros(w_grd_table_dados_url),1));
  
              $.when(w_grd_ajax).then(
                function(json_resp){
                  var w_dados = json_resp.data;
                  var w_carga_ajax_m = [];

                  /* LOOP DO REPORT */
                  for(var w_linha in w_dados){
                    if(w_fme_report_index == 0){
                      if($(".cc-report-line-cabecalho").length > 0) $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append("<div class='cc-report-line-cabecalho'>" + $("[data-report-cabecalho='1']")[0].outerHTML + "</div>");
                    };

                    if(w_fme_report_index == w_fme_report_qtde_linhas){
                      
                      if($(".cc-report-line-rodape").length > 0) $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append("<div class='cc-report-line-rodape'>" + $("[data-report-rodape='1']")[0].outerHTML + "</div>");
                      if($(".cc-report-line-cabecalho").length > 0) $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append("<div class='cc-report-line-cabecalho'>" + $("[data-report-cabecalho='1']")[0].outerHTML + "</div>");
                      w_fme_report_index = 1;
                    }else{
                      w_fme_report_index = w_fme_report_index + 1;
                    };

                    /* APPEND REPORT */
                    $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").append(w_html_report);
             
                    /* INSERT DADOS */
                    var w_linha_dado = w_dados[w_linha];

                    for(var w_item in w_linha_dado){
                      /* VARIAVEIS */
                      var w_col_dado = _cc.string.retorna(w_item, 1);
                      var w_val_dado = w_linha_dado[w_item];
                      var w_obj_referencia_datagrid = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-referencia-datagrid"));
                      var w_tp = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-input-tp"));
                      var w_rotina_carga = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-rotina-carga"));
                      var w_obj_nome = _cc.string.retorna($("span[data-inp-col-nome='" + w_col_dado + "']").attr("data-inp-obj-nome"));
                      var w_tab_nome = _ccPrp.consulta(w_obj_referencia_datagrid,"TAB_NOME");

                      /* VERIFICA SE DATA */
                      if(w_tp == 3){
                        w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY");
                      };
                      if(w_tp == 4){
                        w_val_dado = _cc.converteData(w_val_dado,"DD/MM/YYYY HH:mm:ss");
                      };
                      if(w_tp == 11){
                        w_val_dado = w_val_dado == 0 ? "não" : "sim";
                      };

                      /* VERIFICA SE CARGA */
                      if(w_rotina_carga != ""){
                        if(w_rotina_carga.toLowerCase().indexOf("tabela") >= 0){
                          w_val_dado = _ccDom.load.item.tag(w_rotina_carga, w_val_dado);
                        }else{
                          if(_cc.string.retorna(w_val_dado) != ""){
                            w_val_dado = _ccDom.load.item.matriz(w_rotina_carga, w_val_dado);
                          };
                        };
                      };

                      /* VERIFICA VAZIO */
                      if(w_val_dado == ""){
                        w_val_dado = "-"
                      };

                      $("span[data-inp-col-nome='" + w_col_dado + "']:last").html(w_val_dado);
                    };
                  };

                  /* ESCONDEP O HIDE */
                  _cc.loading.hide("novo-relatorio");

                  /* EXECUTA ROTINA CARGA DOS AJAX */
                  $(".cc-fme-report:first [data-inp-rotina-carga]").each(function(){
                    /* VARIAVEIS */
                    var w_carga = $(this).attr("data-inp-rotina-carga");
                    if(w_carga != ""){
                      if(w_carga.toLowerCase().indexOf("tabela") >= 0){
                        w_carga = decodeURI(w_carga);
                        var w_carga_tab_nome = w_carga.substr(0, w_carga.indexOf("&"));
                        w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
                        _ccDom.load.item.ajax(w_carga, w_carga_tab_nome);
                      }
                    }
                  });

                  /* ABRE MODAL */
                  _cc.modal.show("cc-modal-relatorio");
                },
                function(error){
                  _cc.error(error);
                }
              );

            }else{
              _cc.msg("Não há um corpo para o relatório","danger",5);
            };
          }else{
            _cc.msg("A página não é do tipo: RELATÓRIO","danger",5);
          };
        },
        function(){
        }
      );
    },
    modal:function(){
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

          /* HIDE LOADING */
          $("[name='cc-modal-relatorio'] [name='cc-modal-relatorio-dados']").html("");
          
          w_deferred.resolve();
        },
        function(error){
          _cc.error(error);
          _cc.loading.hide();
        }
      );

      return w_deferred.promise();
    }
  };

  this.modal = function(){
    /* DEFERRED */
    var w_deferred = $.Deferred();

    /* VARIAVEIS */
    var w_htm_url = "/Content/Modal//cc-modal-report-imoveis.html?v=" + Math.random(),
    w_htm_ajax = "";

    /* AJAX */
    if($("[name='cc-modal-report-imoveis']").length == 0){
      w_htm_ajax = _cc.ajax(w_htm_url,"get","text/html");
    }else{
      w_htm_ajax = true;
    };

    /* WHEN */ 
    $.when(w_htm_ajax).then(
      function(w_resp_htm){
        var w_htm = w_resp_htm;

        /* APPEND DO MODAL */
        if($("[name='cc-modal-report-imoveis']").length == 0){
          $(w_htm).appendTo("body");
        };

        /* HIDE LOADING */
        $("[name='cc-modal-report-imoveis'] [name='cc-modal-report-imoveis-dados']").html("");
        $("[name='cc-modal-report-imoveis'] [name='cc-titulo']").html("");
        
        w_deferred.resolve();
      },
      function(error){
        _cc.error(error);
        _cc.loading.hide();
      }
    );

    return w_deferred.promise();
  };

  this.imprimir = function(){
    _ccRep.modal();
    _cc.efeito.centraliza("cc-loading-spinner-full");
    $(".cc-loading-full").show();
    $(".cc-loading-full .cc-loading-title").html("Gerando Relatório");

    /* VARIAVEIS  */
    var w_grd_imoveis = "frmgci.relatorios.imoveis.fme.fmegrdimoveis.grd";
    var w_grd_imoveis_tab_nome = _ccPrp.consulta(w_grd_imoveis,"TAB_NOME");
    var w_grd_imoveis_url = ccase.url.tabela + "TABELA=" + w_grd_imoveis_tab_nome + "&WHERE=cnSmartPointReferencia=0";
    var w_grd_imoveis_ajax = _cc.ajax(w_grd_imoveis_url);

    var w_grd_pessoas = "frmgci.relatorios.imoveis.fme.fmepessoas.grdpessoas";
    var w_grd_pessoas_tab_nome = _ccPrp.consulta(w_grd_pessoas,"TAB_NOME");
    var w_grd_pessoas_url = ccase.url.tabela + "TABELA=" + w_grd_pessoas_tab_nome;
    var w_grd_pessoas_ajax = _cc.ajax(w_grd_pessoas_url);

    var w_grd_arquivos = "frmgci.relatorios.imoveis.fme.fmearquivo.grdarquivo";
    var w_grd_arquivos_tab_nome = _ccPrp.consulta(w_grd_arquivos,"TAB_NOME");
    var w_grd_arquivos_url = ccase.url.tabela + "TABELA=" + w_grd_arquivos_tab_nome+"&WHERE=cnsmartpoint=1 or cnsmartpoint=12 or cnsmartpoint=16 or cnsmartpoint=22 or cnsmartpoint=39 or cnsmartpoint=42 or cnsmartpoint=44";
    var w_grd_arquivos_ajax = _cc.ajax(w_grd_arquivos_url);

    $.when(w_grd_imoveis_ajax).then(
      function(json_resp_imoveis){

        $.when(w_grd_pessoas_ajax).then(
          function(json_resp_pessoas){

            $.when(w_grd_arquivos_ajax).then(
              function(json_resp_arquivos){

                $(".cc-loading-full").hide();
                $(".cc-loading-full .cc-loading-title").html("");

                var w_imoveis = json_resp_imoveis.data;
                var w_pessoas = json_resp_pessoas.data;
                var w_arquivos = json_resp_arquivos.data; 
                var w_fk = "cnsmartpoint";
                var w_label_class = "cc-inp-label font-weight-bold float-left w-100 pb-0 border-bottom";
                var w_inp_class = "col-min-height cc-col form-group pl-3 border-left"
                var w_table_class = "table table-xtra-condensed table-hover cc-bg-branco table-striped table-bordered"
                
                var w_html = "<div class='float-left w-100'>";
                w_html += "<h4 class='font-weight-bold text-uppercase text-center pt-3 pb-3 mb-4 border-bottom'>Relatório de Imóveis</h4>";

                for(var w_i in w_imoveis){
                  var w_im = w_imoveis[w_i];

                  var w_nmsmartpoint = _cc.string.retorna(w_im["nmsmartpoint"]);
                  if(w_nmsmartpoint == ""){
                    w_nmsmartpoint = "-";
                  }

                  var dm_grupo = _ccPrp.consulta("frmgci.relatorios.imoveis.fme.fmeinputsimoveis.dmsmartpointgrupo","ROTINA_CARGA");
                  var w_dmsmartpointgrupo = _cc.string.retorna(w_im["dmsmartpointgrupo"]);
                  if(w_dmsmartpointgrupo == ""){
                    w_dmsmartpointgrupo = "-";
                  }else{
                    w_dmsmartpointgrupo = _ccDom.load.item.matriz(dm_grupo, w_im["dmsmartpointgrupo"]);
                  };

                  var w_cnsmartpointcategoria = _cc.string.retorna(w_im["cnsmartpointcategoria"]);
                  var dm_categoria = _ccPrp.consulta("frmgci.relatorios.imoveis.fme.fmeinputsimoveis.cnsmartpointcategoria","ROTINA_CARGA");
                  
                  /* VALIDACAO DA CARGA */
                  var w_carga = dm_categoria;
                  var w_carga_tab_nome = "";
                  var w_val_str = "";
                  var w_val_m = "";

                  if(w_carga != ""){
                    if(w_carga.toLowerCase().indexOf("tabela") >= 0){
                      w_carga = decodeURI(w_carga);
                      w_carga_tab_nome = w_carga.substr(0, w_carga.indexOf("&"));
                      w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
                      w_val_m =  w_cnsmartpointcategoria.toString().split("#");
                      w_val_str = "";
                    };
                  };
                  for(var w_val_item in w_val_m){
                    w_val_str += "<em class='font-style-normal' data-inp-dom='" + _cc.string.retorna(w_carga_tab_nome + "-" + w_val_m[w_val_item], 1) + "'></em>, ";
                  };
                  w_val_str = w_val_str.substr(0, w_val_str.length - 2);
                  w_cnsmartpointcategoria = w_val_str;

                  if(w_cnsmartpointcategoria == ""){
                    w_cnsmartpointcategoria = "-";
                  }
                  var w_dmsmartpointpropriedade = _cc.string.retorna(w_im["dmsmartpointpropriedade"]);
                  if(w_dmsmartpointpropriedade == ""){
                    w_dmsmartpointpropriedade = "-";
                  }
                  var w_dmsmartpointorigem = _cc.string.retorna(w_im["dmsmartpointorigem"]);
                  if(w_dmsmartpointorigem == ""){
                    w_dmsmartpointorigem = "-";
                  }

                  var dm_atividade = _ccPrp.consulta("frmgci.relatorios.imoveis.fme.fmeinputsimoveis.lssmartpointatividade","ROTINA_CARGA");
                  var w_lssmartpointatividade = _cc.string.retorna(w_im["lssmartpointatividade"]);

                  /* VALIDACAO DA CARGA */
                  var w_carga = dm_atividade;
                  var w_carga_tab_nome = "";
                  var w_val_str = "";
                  var w_val_m = "";

                  if(w_carga != ""){
                    if(w_carga.toLowerCase().indexOf("tabela") >= 0){
                      w_carga = decodeURI(w_carga);
                      w_carga_tab_nome = w_carga.substr(0, w_carga.indexOf("&"));
                      w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
                      w_val_m =  w_lssmartpointatividade.toString().split("#");
                      w_val_str = "";
                    };
                  };
                  for(var w_val_item in w_val_m){
                    w_val_str += "<em class='font-style-normal' data-inp-dom='" + _cc.string.retorna(w_carga_tab_nome + "-" + w_val_m[w_val_item], 1) + "'></em>, ";
                  };
                  w_val_str = w_val_str.substr(0, w_val_str.length - 2);
                  w_lssmartpointatividade = w_val_str;
                  
                  if(w_lssmartpointatividade == ""){
                    w_lssmartpointatividade = "-";
                  }
                  var w_dssmartpoint = _cc.string.retorna(w_im["dssmartpoint"]);
                  if(w_dssmartpoint == ""){
                    w_dssmartpoint = "-";
                  }
                  var w_dtaquisicao = _cc.string.retorna(w_im["dtaquisicao"]);
                  if(w_dtaquisicao == ""){
                    w_dtaquisicao = "-";
                  }
                  var w_dtinauguracao = _cc.string.retorna(w_im["dtinauguracao"]);
                  if(w_dtinauguracao == ""){
                    w_dtinauguracao = "-";
                  }
                  var w_qtarea = _cc.string.retorna(w_im["qtarea"]);
                  if(w_qtarea == ""){
                    w_qtarea = "-";
                  }
                  var w_qtareaterreno = _cc.string.retorna(w_im["qtareaterreno"]);
                  if(w_qtareaterreno == ""){
                    w_qtareaterreno = "-";
                  }
                  var w_qtareaconstrucao = _cc.string.retorna(w_im["qtareaconstrucao"]);
                  if(w_qtareaconstrucao == ""){
                    w_qtareaconstrucao = "-";
                  }
                  var w_nrinicial = _cc.string.retorna(w_im["nrinicial"]);
                  if(w_nrinicial == ""){
                    w_nrinicial = "-";
                  }
                  var w_nrfinal = _cc.string.retorna(w_im["nrfinal"]);
                  if(w_nrfinal == ""){
                    w_nrfinal = "-";
                  }
                  var w_caendcep = _cc.string.retorna(w_im["caendcep"]);
                  if(w_caendcep == ""){
                    w_caendcep = "-";
                  }
                  var w_dmlogradourotp = _cc.string.retorna(w_im["dmlogradourotp"]);
                  if(w_dmlogradourotp == ""){
                    w_dmlogradourotp = "-";
                  }
                  var w_anendlogradouro = _cc.string.retorna(w_im["anendlogradouro"]);
                  if(w_anendlogradouro == ""){
                    w_anendlogradouro = "-";
                  }
                  var w_anendnumero = _cc.string.retorna(w_im["anendnumero"]);
                  if(w_anendnumero == ""){
                    w_anendnumero = "-";
                  }
                  var w_anendcomplemento = _cc.string.retorna(w_im["anendcomplemento"]);
                  if(w_anendcomplemento == ""){
                    w_anendcomplemento = "-";
                  }
                  var w_anendcidade = _cc.string.retorna(w_im["anendcidade"]);
                  if(w_anendcidade == ""){
                    w_anendcidade = "-";
                  }
                  var w_anendbairro = _cc.string.retorna(w_im["anendbairro"]);
                  if(w_anendbairro == ""){
                    w_anendbairro = "-";
                  }
                  var w_cnendcidadeibge = _cc.string.retorna(w_im["cnendcidadeibge"]);
                  if(w_cnendcidadeibge == ""){
                    w_cnendcidadeibge = "-";
                  }
                  var w_anenduf = _cc.string.retorna(w_im["anenduf"]);
                  if(w_anenduf == ""){
                    w_anenduf = "-";
                  }
                  var w_dmendpais = _cc.string.retorna(w_im["dmendpais"]);
                  if(w_dmendpais == ""){
                    w_dmendpais = "-";
                  }
                  var w_cnregiao = _cc.string.retorna(w_im["cnregiao"]);
                  if(w_cnregiao == ""){
                    w_cnregiao = "-";
                  }
                  var w_dmendzona = _cc.string.retorna(w_im["dmendzona"]);
                  if(w_dmendzona == ""){
                    w_dmendzona = "-";
                  }

                  var cnreferencia_class = "";
                  var cnsmartpointreferencia = _cc.string.retorna(w_im["cnsmartpointreferencia"]);
                  if(cnsmartpointreferencia == "0"){
                    cnsmartpointreferencia = "-";
                    cnreferencia_class = "";
                  }else{
                    cnreferencia_class = " cc-filho "
                  }

                  w_html += "<div class='cc-bloco cc-bg-branco rounded border mt-5 mb-5 p-4 w-100 float-left cc-bg-branco " + cnreferencia_class + "'>";
                  w_html += "<img width='200' class='cc-logo-modal float-left mb-4 esconde-modal'>"
                  w_html += "<p class='float-left w-100 mb-3 font-large text-primary font-weight-bold text-uppercase'> " + w_nmsmartpoint + "</p>";
                  
                  /* DADOS BASICOS */
                  /* ENDERECO */
                  /* OBS */

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Grupo</label>";
                  w_html += "<span>" + w_dmsmartpointgrupo + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Categoria</label>";
                  w_html += "<span>" + w_cnsmartpointcategoria + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Propriedade</label>";
                  w_html += "<span>" + w_dmsmartpointpropriedade + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Origem</label>";
                  w_html += "<span>" + w_dmsmartpointorigem + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-16'>";
                  w_html += "<label class='" + w_label_class + "'>Atividade  Principal</label>";
                  w_html += "<span>" + w_lssmartpointatividade + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-20'>";
                  w_html += "<label class='" + w_label_class + "'>Descrição</label>";
                  w_html += "<span>" + w_dssmartpoint + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Aquisição</label>";
                  w_html += "<span>" + _cc.converteData(w_dtaquisicao,"DD-MM-YYYY") + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Inauguração</label>";
                  w_html += "<span>" + _cc.converteData(w_dtinauguracao,"DD-MM-YYYY") + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Área (m2)</label>";
                  w_html += "<span>" + w_qtarea + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Área do Terreno (m2)</label>";
                  w_html += "<span>" + w_qtareaterreno + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-6'>";
                  w_html += "<label class='" + w_label_class + "'>Área Construida (m2)</label>";
                  w_html += "<span>" + w_qtareaconstrucao + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>CEP</label>";
                  w_html += "<span>" + w_caendcep + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-12'>";
                  w_html += "<label class='" + w_label_class + "'>Endereço</label>";
                  w_html += "<span>" + w_anendlogradouro + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Número</label>";
                  w_html += "<span>" + w_anendnumero + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Complemento</label>";
                  w_html += "<span>" + w_anendcomplemento + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-6'>";
                  w_html += "<label class='" + w_label_class + "'>Cidade</label>";
                  w_html += "<span>" + w_anendcidade + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Bairro</label>";
                  w_html += "<span>" + w_anendbairro + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Código IBGE</label>";
                  w_html += "<span>" + w_cnendcidadeibge + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>UF</label>";
                  w_html += "<span>" + w_anenduf + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>País</label>";
                  w_html += "<span>Brasil</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Região</label>";
                  w_html += "<span>" + w_cnregiao + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='" + w_inp_class + " cc-col-4'>";
                  w_html += "<label class='" + w_label_class + "'>Zona</label>";
                  w_html += "<span>" + w_dmendzona + "</span>";
                  w_html += "</div>"

                  w_html += "<div class='w-100 float-left border-top pt-3 mt-3  table-pessoas'>";
                  w_html += "<h6 class='text-uppercase font-weight-bold text-primary float-left w-100'>Pessoas do imóvel</h6>";
                  w_html += "<table class='" + w_table_class + "'>";
                  w_html += "<thead class='thead-dark'>";
                  w_html += "<tr>";
                  w_html += "<th class='text-center text-uppercase'>NOME</th>";
                  w_html += "<th class='text-center text-uppercase'>CPF</th>";
                  w_html += "<th class='text-center text-uppercase'>NASCIMENTO</th>";
                  w_html += "</thead>";
                  w_html += "<tbody>";
                  for(var w_p in w_pessoas){
                    if(w_im["cnsmartpoint"] == w_pessoas[w_p]["cnsmartpoint"]){
                      w_html += "<tr valign='middle'>";
                      w_html += "<td>" + w_pessoas[w_p]["nmpessoa"] + "</td>";
                      w_html += "<td>" + w_pessoas[w_p]["cacpf"] + "</td>";
                      w_html += "<td>" + _cc.converteData(w_pessoas[w_p]["dtnascimento"],"DD/MM/YYYY") + "</td>";
                      w_html += "</tr>";
                    };
                    // w_pessoas[w_p]["cnpessoa"]
                    // w_pessoas[w_p]["id"]
                    // w_pessoas[w_p]["cnregtp"]
                    // w_pessoas[w_p]["cnsmartpoint"]
                    // w_pessoas[w_p]["nmpessoa"]
                    // w_pessoas[w_p]["cacpf"]
                    // w_pessoas[w_p]["carg"]
                    // w_pessoas[w_p]["dtnascimento"]
                    // w_pessoas[w_p]["ancelular"]
                    // w_pessoas[w_p]["dmcargo"]
                    // w_pessoas[w_p]["anmatricula"]
                    // w_pessoas[w_p]["anemail"]
                  };
                  w_html += "</tbody>";
                  w_html += "</table>";
                  w_html += "</div>";

                  /* ARQUIVOS */
                  w_html += "<div class='w-100 float-left border-top pt-3 mt-3 table-arquivos'>";
                  w_html += "<h6 class='text-uppercase font-weight-bold text-primary float-left w-100'>Arquivos e Imagens deste imóvel</h6>";
                  w_html += "<table class='" + w_table_class + "'>";
                  w_html += "<thead class='thead-dark'>";
                  w_html += "<tr>";
                  w_html += "<th class='text-center text-uppercase'>Nome do Arquivo</th>";
                  w_html += "<th></th>";
                  w_html += "</thead>";
                  w_html += "<tbody>";
                  for(var w_a in w_arquivos){
                    if(w_im["cnsmartpoint"] == w_arquivos[w_a]["cnsmartpoint"]){
                      w_html += "<tr valign='middle'>";
                      w_html += "<td><img src='" + w_arquivos[w_a]["blarquivo"] + "' style='width:100px'></td>";
                      w_html += "<td>" + w_arquivos[w_a]["nmarquivo"] + "</td>";
                      w_html += "</tr>";
                    };
                  };
                  w_html += "</tbody>";
                  w_html += "</table>";
                  w_html += "</div>";

                  w_html += "</div>";
                };

                w_html += "</div>";

                /* APPEND REPORT */
                $("[name='cc-modal-report-imoveis'] [name='cc-modal-report-imoveis-dados']").append(w_html);
                _cc.modal.show("cc-modal-report-imoveis");
                var dm_categoria = _ccPrp.consulta("frmgci.relatorios.imoveis.fme.fmeinputsimoveis.cnsmartpointcategoria","ROTINA_CARGA");
                var dm_atividade = _ccPrp.consulta("frmgci.relatorios.imoveis.fme.fmeinputsimoveis.lssmartpointatividade","ROTINA_CARGA");
                _ccDom.load.item.ajax(dm_categoria,"gcismartpointcategoria");
                _ccDom.load.item.ajax(dm_atividade,"gcismartpointatividade");

                $(".table-arquivos tbody").each(function(){
                  if($(this).find("tr").length == 0){
                    $(this).closest(".table-arquivos").remove();
                  }
                })
                $(".table-pessoas tbody").each(function(){
                  if($(this).find("tr").length == 0){
                    $(this).closest(".table-pessoas").remove();
                  }
                })

                $("[name='cc-logo-modal']").attr("src",$("[name='cc-logo']").attr("src"))
                $(".cc-logo-modal").attr("src",$("[name='cc-logo']").attr("src"))
                $(".cc-bloco:eq(0)").removeClass("cc-bloco")

              },
              function(error){
                _cc.error(error)
              }
            );
          },
          function(error){
            _cc.error(error)
          }
        );
      },
      function(error){
        _cc.error(error)
      }
    );
  }
};

var _ccRep = new _ccaseReport();