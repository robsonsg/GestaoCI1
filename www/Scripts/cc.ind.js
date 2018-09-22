var _ccIndicadores = function(){
  this.carrega = function(p_obj_referencia, p_cn_transacao, p_cn_origem_chave){
    if($("[name='" + _cc.string.retorna(p_obj_referencia,1) + "']").is(":visible") == true && _cc.string.retorna($("[name='" + _cc.string.retorna(p_cn_origem_chave, 1) +"']").val()) != ""){

      p_obj_referencia = p_obj_referencia.toLowerCase();
      p_cn_origem_chave = p_cn_origem_chave.toLowerCase();

      /* RESET */
      $("[name='" + p_obj_referencia + "']").html("");

      /* VARIAVEIS */
      var w_cn_transacao = p_cn_transacao;

      var w_url_transacao = "";
      w_url_transacao += ccase.url.tabela;
      w_url_transacao += "TABELA=gciIndicadorTransacaoItem";
      w_url_transacao += "&COLUNAS=cnTransacao, cnTransacao.dsTransacao, cnIndicador, boQuebraLinha, cnIndicadorReferencia, nmOrdem, boRequerido";
      w_url_transacao += "&ORDERBY=nmOrdem";
      w_url_transacao += "&WHERE=boInativo <> 1 and cnTransacao=" + w_cn_transacao + "";
      
      /* AJAX */
      window.w_dese_trace_info = "cc.ind";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      var w_ind_ajax = _cc.ajax(w_url_transacao, "GET","","","<strong class='cc-bg-preto text-yellow'>REST INDICADORES:<br>0000 </strong> - CARGA INICIAL:<br> - " + p_obj_referencia + "<br> - " + p_cn_transacao + "<br> - " + p_cn_origem_chave,w_dese_trace_info,"");

      /* RETORNO DO AJAX */
      $.when(w_ind_ajax).then(
        function(json_resp_ind){
          _cc.validaResponseAjax(json_resp_ind, w_url_transacao);
          if(json_resp_ind.cnRetorno == 0){
            var w_nm_grp_ind = json_resp_ind.data[0]["cnTransacao.dsTransacao"];
            _ccInd.load.indicadores(p_obj_referencia, p_cn_transacao, w_nm_grp_ind, json_resp_ind, p_cn_origem_chave)
          }
        },
        function(error){
          _cc.error(error)
        }
      );
    };
  };

  this.load = {
    indicadores:function(p_obj_referencia, p_cn_transacao, p_nm_grp_ind, p_json_resp_ind, p_cn_origem_chave){
      if($("[name='" + _cc.string.retorna(p_obj_referencia,1) + "']").is(":visible") == true && _cc.string.retorna($("[name='" + _cc.string.retorna(p_cn_origem_chave, 1) +"']").val()) != ""){
        
        // _cc.loading.show("Carregando...",0,"indicadores");

        var w_nm_grp_ind = p_nm_grp_ind;
        var w_inds = p_json_resp_ind.data;
        var w_inds_index = [];
        
        var w_ind_grp_fme_prop = "name='" + p_obj_referencia + "-"+ p_cn_transacao +"' ";
        w_ind_grp_fme_prop += "id='" + p_obj_referencia + "-"+ p_cn_transacao +"' ";
        w_ind_grp_fme_prop += "data-ind-transacao='" + p_cn_transacao +"' ";
        w_ind_grp_fme_prop += "data-ind-obj-referencia='" +p_obj_referencia +"' ";
        w_ind_grp_fme_prop += "class='row' ";

        var w_fme_grp_ind = "<div " + w_ind_grp_fme_prop + ">"; 
        w_fme_grp_ind += "<h4 class='d-none col-md-36 ml-2 mr-2 border-bottom pb-3'>"; 
        w_fme_grp_ind += p_nm_grp_ind; 
        w_fme_grp_ind += "</h4>"; 
        w_fme_grp_ind += "</div>"; 

        if($("[name='" + p_obj_referencia + "-"+ p_cn_transacao +"']").length == 0){
          $("[name='" + p_obj_referencia + "']").append(w_fme_grp_ind);
        };

        for(var w_ind in w_inds){
          w_inds_index.push(w_inds[w_ind].cnIndicador);
          
          var w_ind_grp_fme_prop = "name='" + p_obj_referencia + "-"+ w_inds[w_ind].cnIndicador +"' ";
          w_ind_grp_fme_prop += "id='" + p_obj_referencia + "-"+ w_inds[w_ind].cnIndicador +"' ";
          w_ind_grp_fme_prop += "data-ind-transacao='" + p_cn_transacao +"' ";
          w_ind_grp_fme_prop += "data-ind='" + w_inds[w_ind].cnIndicador +"' ";
          w_ind_grp_fme_prop += "data-ind-obj-referencia='" +p_obj_referencia +"' ";
          w_ind_grp_fme_prop += "class='' ";

          var w_fme_ind = _ccPrp.quebraLinha(w_inds[w_ind].boQuebraLinha);
          w_fme_ind += "<div " + w_ind_grp_fme_prop + ">";
          w_fme_ind += "</div>";

          if($("[name='" + p_obj_referencia + "-"+ w_inds[w_ind].cnIndicador +"']").length == 0){
            $("[name='" + p_obj_referencia + "']").append(w_fme_ind);
          };
        };

        for(var w_ind in w_inds){
          var w_cn_indicador = w_inds[w_ind].cnIndicador;
          var w_url_indicador = "";
          w_url_indicador += ccase.url.tabela;
          w_url_indicador += "TABELA=gciIndicador";
          w_url_indicador += "&COLUNAS=cnIndicador, dmIndicadorGrupo, dsIndicador, dmInputTP, qtColspan, caDominio,nmOrdem, boRequerido";
          w_url_indicador += "&ORDERBY=nmOrdem";
          w_url_indicador += "&WHERE=boInativo <> 1  and cnIndicador=" + w_cn_indicador + "";
          
          window.w_dese_trace_info = "cc.ind";
          // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
          var w_ajax_indicador = _cc.ajax(w_url_indicador,"GET","","","<strong class='cc-bg-preto cc-text-verde'>REST INDICADOR:<br>0001 </strong> - CARGA INDIVIDUAL:<br> - " + w_cn_indicador,w_dese_trace_info,"");
          $.when(w_ajax_indicador).then(
            function(json_resp_indicador){
              _ccInd.load.indicador(p_obj_referencia, p_cn_transacao, json_resp_indicador, p_cn_origem_chave)
            },
            function(error){
              _cc.error(error);
            },
          )
        }
      }
    },
    indicador:function(p_obj_referencia, p_cn_transacao, json_resp_indicador, p_cn_origem_chave){
      
      if($("[name='" + _cc.string.retorna(p_obj_referencia,1) + "']").is(":visible") == true && _cc.string.retorna($("[name='" + _cc.string.retorna(p_cn_origem_chave, 1) +"']").val()) != ""){
        
        var w_ind = json_resp_indicador.data[0];
        if(w_ind != undefined){
          
          /* PROPRIEDADES DOS INDICADORES */
          var w_ind_propriedades = "data-ind-conteudo='1' ";
          w_ind_propriedades += "data-ind='" + w_ind.cnIndicador +"' ";

          /* AGRUPADOR INDICADORES */
          // var w_fme_ind = "<h5 class='bg-light border p-1 mb-0'>"; 
          var w_fme_ind = "<label>"; 
          w_fme_ind += w_ind.dsIndicador; 
          w_fme_ind += "</label>"; 
          // w_fme_ind += "<div " + w_ind_propriedades + " class='p-2 border mb-3 bg-white'>"; 
          w_fme_ind += "<div " + w_ind_propriedades + " class='mb-4'>"; 
          w_fme_ind += "</div>"; 

          /* PROPRIEDADES INPUT */
          var w_inp_prop_mask = "";
          
          if(w_ind.dmInputTP == 3){
            w_inp_prop_mask += "data-mask='date' ";
          };
          if(w_ind.dmInputTP == 4){
            w_inp_prop_mask += "data-mask='datetime' ";
          };

          var w_inp_props = "name='inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"' ";
          w_inp_props += "id='inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"' ";
          w_inp_props += "data-ind='" + w_ind.cnIndicador +"' ";
          w_inp_props += "data-ind-transacao='" +p_cn_transacao +"' ";
          w_inp_props += "data-ind-inp-tp='" +w_ind.dmInputTP +"' ";
          w_inp_props += "data-ind-origem-chave='" + $("[name='" + p_cn_origem_chave + "']").val() +"' ";
          w_inp_props += w_inp_prop_mask + " ";

          if($("[data-ind-conteudo='1'][data-ind='" + w_ind.cnIndicador +"']").length == 0){
            $("[data-ind-obj-referencia='" +p_obj_referencia +"'][data-ind='" + w_ind.cnIndicador +"']").append(w_fme_ind)
          };

          var w_inp_class = ""; 
          if(
            w_ind.dmInputTP == 1 || 
            w_ind.dmInputTP == 2 || 
            w_ind.dmInputTP == 3 || 
            w_ind.dmInputTP == 4
          ){
            w_inp_class = " form-control "
          };

          var w_lbl = "";
          var w_lbl_required = "";

          if(w_ind.boRequerido == 1){
            w_lbl_required += "<sup class='text-danger'>*</sup>";
          };

          var w_inp_tag = ""; 
          if(
            w_ind.dmInputTP == 1 || 
            w_ind.dmInputTP == 2 || 
            w_ind.dmInputTP == 3 || 
            w_ind.dmInputTP == 4
          ){
            // w_inp_tag += "<label>Insira o " + w_ind.dsIndicador + ":</label>";
            // w_inp_tag += w_lbl_required;
            w_inp_tag += "<input " + w_inp_props + " type='text' class='" + w_inp_class + "'>"
            _cc.listen("blur","inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"","_ccInd.insere(this)")
          };

          if(w_ind.dmInputTP == 10){
            w_inp_tag += "<label class='font-weight-normal' class='ml-1'>";
            w_inp_tag += "<input " + w_inp_props + " type='radio' /> "
            w_inp_tag += w_ind.dsIndicador;
            w_inp_tag += w_lbl_required;
            w_inp_tag += "</label>";
            _cc.listen("click","inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"","_ccInd.insere(this)")
          };

          if(w_ind.dmInputTP == 11){
            w_inp_tag += "<label class='font-weight-normal' class='ml-1'>";
            w_inp_tag += "<input " + w_inp_props + " type='checkbox' /> "
            w_inp_tag += w_ind.dsIndicador;
            w_inp_tag += w_lbl_required;
            w_inp_tag += "</label>";
            _cc.listen("click","inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"","_ccInd.insere(this)")
          };

          var w_inp = "<div class='form-group mb-0'>";
          w_inp += w_inp_tag;
          w_inp += "</div>";

          if($("[name='inp-ind-" + p_cn_transacao + "-" + w_ind.cnIndicador +"']").length == 0){
            $("[data-ind-conteudo='1'][data-ind='" + w_ind.cnIndicador + "']").append(w_inp);
            $("[data-ind-conteudo='1'][data-ind='" + w_ind.cnIndicador + "']").parent().addClass("cc-col cc-col-"+w_ind.qtColspan)
          };

          _ccInd.load.dados(w_ind.cnIndicador, p_cn_transacao, p_obj_referencia, p_cn_origem_chave);
          _ccPlugin.mask.default();
        }
      }
    },
    dados:function(p_cn_indicador, p_cn_transacao, p_obj_referencia, p_cn_origem_chave){
      
      if($("[name='" + _cc.string.retorna(p_obj_referencia,1) + "']").is(":visible") == true && _cc.string.retorna($("[name='" + _cc.string.retorna(p_cn_origem_chave, 1) +"']").val()) != ""){

        var w_cn_origem_chave = $("input[data-ind='" + p_cn_indicador + "']").attr("data-ind-origem-chave");
        if(_cc.string.retorna(w_cn_origem_chave) != ""){

          var w_url_mov_val = ccase.url.tabela;
          w_url_mov_val += "TABELA=gciIndicadorMov";
          w_url_mov_val += "&COLUNAS=cnIndicador,cnTransacao, cnOrigemChave, dtMovimento,nrIndicador, dtIndicador, anIndicador";
          w_url_mov_val += "&ORDERBY=dtMovimento desc";
          w_url_mov_val += "&COMPLEMENTO=limit 1";
          w_url_mov_val += "&WHERE=boInativo <> 1  and cnIndicador=" + p_cn_indicador + " and cnTransacao=" + p_cn_transacao + " and cnOrigemChave=" + w_cn_origem_chave + "";

          window.w_dese_trace_info = "cc.ind";
          // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
          var w_url_mov_ajax = _cc.ajax(w_url_mov_val,"GET","","","<strong class='cc-bg-preto cc-text-vermelho'>REST INDICADOR:<br>0002 </strong> - CARGA MOVIMENTACAO:<br> - " + p_cn_indicador + "<br> - " + p_cn_transacao + "<br> - " + w_cn_origem_chave,w_dese_trace_info,"");

          $.when(w_url_mov_ajax).then(
            function(json_resp){
              if(json_resp.data != null){
                var w_dado = json_resp.data[0];
                if(w_dado != null || w_dado != undefined){
                  var w_inp_tp = $("input[data-ind='" + p_cn_indicador + "']").attr("data-ind-inp-tp");
                  if(w_inp_tp == "1"){
                    $("input[data-ind='" + p_cn_indicador + "']").val(w_dado.anIndicador)
                  };
                  if(w_inp_tp == "2"){
                    $("input[data-ind='" + p_cn_indicador + "']").val(w_dado.nrIndicador)
                  };
                  if(w_inp_tp == "3"){
                    $("input[data-ind='" + p_cn_indicador + "']").val(_cc.converteData(w_dado.dtIndicador, "DD/MM/YYYY","get"));
                  };
                  if(w_inp_tp == "4"){
                    $("input[data-ind='" + p_cn_indicador + "']").val(_cc.converteData(w_dado.dtIndicador, "DD/MM/YYYY HH:mm:ss","get"));
                  };
                  if(w_inp_tp == "10" || w_inp_tp == "11"){
                    if(w_dado.nrIndicador == "1"){
                      $("input[data-ind='" + p_cn_indicador + "']").attr("checked","checked");
                    }
                  };
                  // _cc.loading.hide("indicadores");
                };
              }
            },
            function(error){
              _cc.error(error)
            }
          )
        }
      }
    }
  };

  this.insere = function(p_el){
    /* VARIAVEIS */
    var w_cn_transacao = $(p_el).attr("data-ind-transacao");
    var w_ind = $(p_el).attr("data-ind");
    var w_ind_inp_tp = $(p_el).attr("data-ind-inp-tp");
    var w_origem_chave = $(p_el).attr("data-ind-origem-chave");
    var w_ind_val = "";
    if(
      w_ind_inp_tp == 1 ||
      w_ind_inp_tp == 2 ||
      w_ind_inp_tp == 3 ||
      w_ind_inp_tp == 4
    ){
      w_ind_val = $(p_el).val();
    };

    if(
      w_ind_inp_tp == 10 ||
      w_ind_inp_tp == 11
    ){
      if($(p_el).is(":checked") == false){
        w_ind_val = "0";
      }else{
        w_ind_val = "1";
      };
    };

    var w_url_mov = "";
    w_url_mov += ccase.url.tabela;
    w_url_mov += "TABELA=gciIndicadorMov";

    var w_json_insert_val = "";
    if(w_ind_inp_tp == 1){
      w_json_insert_val += "\"anIndicador\":\"" + w_ind_val + "\",";
    };

    if(w_ind_inp_tp == 2 || w_ind_inp_tp == 10 || w_ind_inp_tp == 11){
      w_json_insert_val += "\"nrIndicador\":\"" + w_ind_val + "\",";
    };

    if(w_ind_inp_tp == 3 || w_ind_inp_tp == 4){
      /* DATE */
      if(w_ind_inp_tp == 3){
        w_ind_val = _cc.converteData(w_ind_val,"YYYY-MM-DD","post");
      };
      
      /* DATETIME */
      if(w_ind_inp_tp == 4){
        w_ind_val = _cc.converteData(w_ind_val,"YYYY-MM-DD[T]HH:mm:ss","post");
      };
      w_json_insert_val += "\"dtIndicador\":\"" + w_ind_val + "\",";
    };

    var w_json_insert = "{";
    w_json_insert += "\"cnOrigemChave\":\"" + w_origem_chave + "\",";
    w_json_insert += "\"cnTransacao\":\"" + w_cn_transacao + "\",";
    w_json_insert += "\"cnIndicador\":\"" + w_ind + "\",";
    w_json_insert += w_json_insert_val;
    w_json_insert += "\"dmInputTP\":\"" + w_ind_inp_tp + "\"";
    w_json_insert += "}";


    window.w_dese_trace_info = "cc.ind";
    // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
    var w_url_mov_post = _cc.ajax(w_url_mov,"POST","application/json",JSON.stringify(w_json_insert),"<strong class='cc-bg-preto text-blue'>REST INDICADOR:<br>0004 </strong> - CARGA INSERT:<br> - " + w_origem_chave + "<br> - " + w_cn_transacao + "<br> - " + w_ind + "<br> - " + w_json_insert_val,w_dese_trace_info,"");

    $.when(w_url_mov_post).then(
      function(json_resp_insere){
        _cc.validaResponseAjax(json_resp_insere, w_url_mov);
        if(json_resp_insere.cnRetorno == 0){
          // _cc.msg("Indicador inserido/atualizado com Sucesso!","success",2);
        };
      },
      function(){}
    );
  };
};

var _ccInd = new _ccIndicadores();