var _ccaseDesenvolvedor = function(){
  
  /* CONSOLOG LOG COM COR SIMPLIFICADO */
  this.log = function(p_string, p_style){
    console.log("%c " + p_string,p_style);
  };

  /* MENU > BOTAO DIREITO */
  this.inicia = function(){
    _ccDev.IDE.errorLog();
    _ccDev.IDE.trace();
  };

  /* BOTAO DIREITO */
  this.menuBotaoDireito = function(){
    /* CONTEXT MENU */
    $.contextMenu({
      selector: "input,\
       textarea,\
       select,\
       button,\
       .cc-btn-col,\
       select,\
       .select2-selection__rendered,\
       .cc-fme-collapse-titulo,\
       table,\
       .cc-mnu-item,\
       .cc-inp-img,\
       .cc-btn-img,\
       .cc-inp-iframe, \
       [data-obj-tp='frm'],\
       [data-obj-tp='fme'],\
       [data-obj-tipo='html'],\
       [data-fld-obj-nome],\
       [data-inp-tp='separador'],\
       .cc-inp-label", 
      events: {
        show: function(opt) {
          var $this = this;
          $.contextMenu.setInputValues(opt, $this.data());
        }, 
        hide: function(opt) {
          var $this = this;
          $.contextMenu.getInputValues(opt, $this.data());
        }
      },
      callback:function(key, options) {
        /* VARIAVEIS */ 
        var w_obj = "";

        console.log($(options.$trigger[0]), this.attr("name"))

        /* SE FOR UM SELECT2 */
        if($(options.$trigger[0]).hasClass("select2-selection__rendered")){
          if(w_obj == ""){
            w_obj = $(this).closest(".form-group").find("select").attr("name");
          }
        };

        /* SE FOR UM FME*/
        if($(options.$trigger[0]).hasClass("cc-frm")){
          if(w_obj == ""){
            w_obj = $(this).attr("name");
          }
        };

        /* SE FOR UM HTM*/
        if($(options.$trigger[0]).hasClass("cc-htm")){
          if(w_obj == ""){
            w_obj = $(this).attr("name");
          }
        };

        if($(options.$trigger[0]).hasClass("cc-btn-col")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-btn-obj-nome");
          }
        };

        /* SE FOR UM FME*/
        if($(options.$trigger[0]).hasClass("cc-fme")){
          if(w_obj == ""){
            w_obj = $(this).attr("name");
          }
        };

        /* SE FOR UM FLD*/
        if($(options.$trigger[0]).hasClass("cc-fld-tab")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-fld-obj-nome");
          }
        };

        /* SE FOR UM FLD*/
        if($(options.$trigger[0]).attr("data-inp-tp") == "separador"){
            if(w_obj == ""){
              w_obj = $(this).attr("id");
            }
        };

        /* SE FOR UM IFRAME, COMO GOOGLE MAPS */
        if($(options.$trigger[0]).hasClass("cc-inp-iframe")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-name");
          }
        };

        /* SE FOR UM IMG */
        if($(options.$trigger[0]).hasClass("cc-inp-img")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-name");
          }
        };

        /* SE FOR O BTN DO IMG */
        if($(options.$trigger[0]).hasClass("cc-btn-img")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-name");
          }
        };

        /* SE FOR LABEL */
        if($(options.$trigger[0]).hasClass("cc-inp-label")){
            w_obj = $(this).attr("data-name");
        };

        /* SE FOR LABEL */
        if($(options.$trigger[0]).hasClass("cc-say")){
            w_obj = $(this).attr("name");
        };

        /* SE FOR UM GRD*/
        if($(options.$trigger[0]).hasClass("cc-table")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-grd");
          }
        };

        /* SE FOR UM MNU*/
        if($(options.$trigger[0]).hasClass("cc-mnu-item")){
          if(w_obj == ""){
            w_obj = $(this).attr("name");
          }
        };

        /* COLLAPSE TITULO */
        if($(options.$trigger[0]).hasClass("cc-fme-collapse-titulo")){
          if(w_obj == ""){
            w_obj = $(this).attr("data-fme-collapse-obj-nome");
          }
        }; 

        /* BTN */
        if($(options.$trigger[0]).hasClass("cc-btn")){
          if(w_obj == ""){
            w_obj = $(this).attr("name");
          }
        }; 
  
        if($(options.$trigger[0]).attr("data-inp-obj-nome") != ""){
          if(w_obj == ""){
            w_obj = $(this).attr("data-inp-obj-nome");
          }
        }; 
       
        /* CALLBACK: PROPRIEDADES */
        if(key == "cc_cmnu_propriedades"){
          if(w_obj != ""){
            var w_oauth_ajax = _cc.ajax(ccase.url.token + "&tabela=tiacessousuario&complemento=limit 0");
            $.when(w_oauth_ajax).then(
              function(json_resp){
                _cc.validaResponseAjax(json_resp, ccase.url.token + "&tabela=tiacessousuario&complemento=limit 0");

                if(json_resp.cnRetorno == 0){
                  _ccDev.IDE.propriedades(w_obj);
                }
              },function(error){
                _cc.error(error);
              }
            );
          }else{
            _cc.msg("IDE: Nenhum OBJ selecionado","danger",2);
            return false;
          };
        };

        /* CALLBACK: IMPORTAR */
        if(key == "cc_cmnu_obj_importar"){
          if(w_obj != ""){
            _ccDev.IDE.importarInputs(w_obj);
          }else{
            _cc.msg("IDE: Nenhum OBJ selecionado","danger",2);
            return false;
          };
        };

        /* CRIAR */
        if(key == "cc_cmnu_obj_criar"){
          _ccDev.IDE.objetos.criar(w_obj);
        };

        if(key == "cc_cmnu_obj_replace"){
          _ccDev.IDE.objetos.replace(w_obj);
        };

        /* CALLBACK: TRACE */
        if(key == "cc_cmnu_obj_clonar"){
          _ccDev.IDE.objetos.clonar(w_obj);
        };

        /* EDITAR */
        if(key == "cc_cmnu_obj_editar"){
          _ccDev.IDE.objetos.editar(w_obj);
        };

        /* CALLBACK: DEBUG HIGHLIGHT */
        if(key == "cc_cmnu_debug_highlight"){
          $("body").toggleClass("cc-debug");
          _ccDev.IDE.debug()
        };

        if(key == "cc_cmnu_debug_mnu"){
          _ccDev.IDE.debugMenu()
        };

        /* CALLBACK: HIDDEN */
        if(key == "cc_cmnu_hidden"){
          $("body").toggleClass("cc-hidden-show")
        };

        /* CALLBACK: ERROR */
        if(key == "cc_cmnu_error"){
          _cc.modal.show("cc-dev-error")
        };

        /* CALLBACK: TRACE */
        if(key == "cc_cmnu_trace_modal"){
          _cc.modal.show("cc-dev-trace");
        };

        /* CALLBACK: TRACE */
        if(key == "cc_cmnu_refresh"){
          _ccDev.IDE.refresh();
        };

        /* CALLBACK: TRACE */
        if(key == "cc_cmnu_sys"){
          _ccDev.IDE.sys();
        };

        if(key == "cc_cmnu_sys_cli"){
          _ccDev.IDE.sysCli();
        };
      },

      /* MENU BOTAO DIREITO */
      items: {
        "cc_cmnu_propriedades": {name: "PROPRIEDADES"},
        "cc_cmnu_folder_objetos":{
          name:"OBJETOS", 
          items:{
            "cc_cmnu_obj_editar":{name:"EDITAR"},
            "cc_cmnu_obj_criar":{name:"CRIAR"},
            "cc_cmnu_obj_clonar":{name:"CLONAR"},
            "cc_cmnu_obj_replace":{name:"REPLACE"},
            "sep_importar": "---------",
            "cc_cmnu_obj_importar": {name: "IMPORTAR"}
          }
        },
        "sep_ar": "---------",
        /* CONTEXT MENU > ACOES RAPIDAS */
        "cc_cmnu_folder_acao_rapida":{
          name:"AÇÕES RÁPIDAS", 
          items:{
            "cc_cmnu_ar_hidden":{
              name:"HIDDEN",
              items:{
                "cc_cmnu_ar_hidden_mostrar": {name: "MOSTRAR"},
                "cc_cmnu_ar_hidden_esconder": {name: "ESCONDER"}
              }
            },
            "cc_cmnu_ar_col_grid":{
              name:"COL_GRID",
              items:{
                "cc_cmnu_ar_col_grid_incluir": {name: "INCLUIR"},
                "cc_cmnu_ar_col_grid_remover": {name: "REMOVER"}
              }
            },
            "cc_cmnu_ar_colspan":{
              name:"COLSPAN",
              items:{
                "cc_cmnu_ar_colspan_aumentar": {name: "AUMENTAR"},
                "cc_cmnu_ar_colspan_diminuir": {name: "DIMINUIR"},
                "cc_cmnu_ar_colspan_definir": {name: "DEFINIR TAMANHO"}
              }
            },
            "cc_cmnu_ar_rotina_carga": {name: "ROTINA_CARGA"}
          }
        },
        "sep_debug": "---------",
        "cc_cmnu_hidden":{name:"MOSTRAR/ESCONDER"},
        "cc_cmnu_debug_highlight":{name:"DESTACAR OBJETOS"},
        "cc_cmnu_debug_mnu":{name:"DESTACAR MENU"},
        "cc_cmnu_error": {name: "VER ERROS"},
        "cc_cmnu_ar_trace":{
          name:"TRACE",
          items:{
            yesno: {
              name: "ON/OFF", 
              type: 'checkbox', 
              selected: true,
              events: {
                change: function(e, el) {
                  if($(e.target).is(":checked") == true){
                    _ccDev.IDE.trace(true)
                  }else{
                    _ccDev.IDE.trace(false)
                  };
                }
              }
            },
            "cc_cmnu_trace_modal": {name: "VER"}
          }
        },
        "sep_refresh": "---------",
        "cc_cmnu_refresh": {name: "ATUALIZAR"},
        "sep_refresh_sys": "---------",
        "cc_cmnu_sys": {name: "SISTEMA"},
        "cc_cmnu_sys_cli": {name: "SISTEMA + CLIENTE"},
        "sep_close": "---------",
        "cc_cmnu_close": {name: "FECHAR"}
      }
    });
  };

  this.IDE = {
    listen:function(){
      /* LISTEN DOS BOTOES E OBJETOS DA AREA DE DESENVOLVIMENTO */

      $(document).on("click","[name='cc-dev-ide-propriedades-btn-busca-obj']",function(){
        var w_obj_nome = _cc.string.retorna($("[name='cc-dev-ide-propriedades-obj-nome']").val(),1);
        _ccDev.IDE.tabelaPropriedades(w_obj_nome);
      });

      /* CLICK NA TABELA DE PROPRIEDADES */
      $(document).on("click","[name='cc-dev-ide-propriedades-tabela'] td",function(){
        /* VARIAVEIS */
        var w_id = $(this).parent("tr").find("td:eq(0)").html();
        var w_propriedade = $(this).parent("tr").find("td:eq(1)").html();
        var w_valor = $(this).parent("tr").find("td:eq(2)").html();

        /* SE NAO HOUVER ID, DEIXA O CAMPO DESABILITADO */
        if(w_id == ""){
          $("[name='cc-dev-ide-propriedades-id']").attr("readonly","readonly");
        }else{
          $("[name='cc-dev-ide-propriedades-id']").removeAttr("readonly");
        };https://www.googleadservices.com/pagead/aclk?sa=L&ai=C0FGEhaGNW_P1OYKAj-8PwtqQgA_IyoHbUo-nrfq5B7aQHxABIABgzejrgKwDggEXY2EtcHViLTYyMTk4MTE3NDcwNDkzNzGgAZnPhJ4DqQIQkt9rhTCQPqgDBKoEiANP0FV7l4icg6FORBfui4GDLxjYxQwxp7cgsKb-x2G-eLDPZ0ptaW1TGz3eMjA54DIiVJv-F29yACMzp3WuTpmzXbHTnEsSRU4VxeXO33JI4w7rZxUMdqswvH7v3g_mdo0TBkf5SqD2mUqwQkglEHw3act4_6GslCvwlgorM8ZSsBbCKxVy5_0qoJ2004Bv9wEVofSz65TTjW3rHLfey1zAhO5wX_1W0j4fsrSkMCzN6km-G40ZhS_u3pZHR30o56mKCCk9X_C4O6QzychVQkAn7Rtvu89lHBxS5FYraAG8a8bSOtyGZc1nr-7u-fLr14FGboI389hbxTT3SyFhfm5qYxt3TigcLVGb9FZlv0guZsAPGpb5hls-Hsq6RjQ3YL6DLMTOcDzP7E3yTfpMKd21bzT1spsQNnaFGmYSEksYmXQRlWReLxzTihO8dPq3scoZBe16cJd7J2PA3i_VQtdbdgI2aU6VPidvM0gIs5jnXOzBHuJnArnIZjaDA39N1yFzm-4mBlT8hIgF0N_0ogWSBQ0IEjDCy-3S_qfdhPwBkgUECAMQAqAGHIAHz7D7YYgHAZAHAqgH2csbqAfPzBuoB4HGG6gHmM4bqAerxRuoB97OG6gIAdIIBAgAEALyCB9jYS15dC1ob3N0LXB1Yi05NDgxNDUyOTI1NjU2MzY4sQkBhZRYiVraccgJGMgJkAG4E9UBsBQB&num=1&cid=CAESD-D2PAmcUy0MRjeXzlvu5Q&sig=AOD64_36Jvbz6k4uE3vUHO_3mX46RGvlBQ&adurl=http://br.udacity.com&label=video_click_to_advertiser_site&ctype=18&ms=[CLICK_MS]

        /* ATTRIBUICOES */
        $("[name='cc-dev-ide-propriedades-id']").val(w_id);
        $("[name='cc-dev-ide-propriedades-propriedade']").val(w_propriedade);
        $("[name='cc-dev-ide-propriedades-valor']").val(_cc.string.replace.caracteresEspeciais(w_valor,1));
        
        /* POG */
        _cc.focus("cc-dev-ide-propriedades-propriedade")

        // window.ccAceEditor.getSession().setValue(_cc.string.replace.caracteresEspeciais(w_valor,1),-1);
        window.ccAceEditor.getSession().setValue(_cc.replaceHTMLentidades(_cc.string.replace.caracteresEspeciais(w_valor,1),1));
        window.ccAceEditor.getSession().selection.selectAll();
        window.ccAceEditor.focus();
      });

      /* ACE EDITOR FULL SCREEN PARA A TELA DE PROPRIEDADES */
      $(document).on("change","[name='cc-dev-ace-editor-full-screen']",function(){
        if($(this).is(":checked") == true){
          $("[name='cc-dev-ide-propriedades-tabela-bloco']").addClass("d-none");
          $("[name='cc-dev-ide-propriedades-editor-bloco']").removeClass("col-md-13").addClass("col-md-36");
        }else{
          $("[name='cc-dev-ide-propriedades-tabela-bloco']").removeClass("d-none");
          $("[name='cc-dev-ide-propriedades-editor-bloco']").removeClass("col-md-36").addClass("col-md-13");
        };
      });

      /* BUTTON: PROPRIEDADES */
      $(document).on("mouseup","[name='cc-dev-ide-propriedades-btn']",function(){
        /* VARIAVEIS */
        var w_prp_obj_nome = $("[name='cc-dev-ide-propriedades-obj-nome']").val();  
        var w_prp_id = $("[name='cc-dev-ide-propriedades-id']").val();  
        var w_prp_prp = $("[name='cc-dev-ide-propriedades-propriedade']").val();  
        $("[name='cc-dev-ide-propriedades-valor']").val(_cc.replaceHTMLentidades(window.ccAceEditor.getSession().getValue()));
        var w_prp_vlr = _cc.string.replace.caracteresEspeciais($("[name='cc-dev-ide-propriedades-valor']").val(),2);  
        var w_prp_ajax = "";
        var w_prp_url = "";
      
        /* JSON COM OS DADOS */
        var w_prp_json = {
          "OBJ_NOME":""+ w_prp_obj_nome +"",
          "PRP_NOME":""+ w_prp_prp +"",
          "OBJ_PRP_VLR":""+ w_prp_vlr + ""
        };

        console.log(w_prp_json)

        /* TIPO DE AJAX */
        if($.trim(w_prp_id) == ""){
          w_prp_ajax = "post";
          w_prp_url = ccase.url.tabela + "tabela=ccase_obj_prp";
        }else{
          w_prp_ajax = "put";
          w_prp_url = ccase.url.tabela + "tabela=ccase_obj_prp&where=id=" + w_prp_id;
        };

        /* AJAX SEQUENCIA */
        if($("[name='cc-dev-ide-propriedades-id-obj']").val() != ""){
          if($("[data-obj-seq-inicial]").attr("data-obj-seq-inicial") != $("[name='cc-dev-ide-propriedades-obj-seq']").val()){
            var w_url_obj_seq_url = ccase.url.tabela + "tabela=ccase_obj&id=" + $("[name='cc-dev-ide-propriedades-id-obj']").val();
            var w_url_obj_json = {
              "OBJ_SEQ":"" + $("[name='cc-dev-ide-propriedades-obj-seq']").val() + "",
              "OBJ_TP":"" + $("[name='cc-dev-ide-propriedades-obj-tp']").val() + ""
            };

            console.log(w_url_obj_json)

            var w_url_obj_seq_method = "put";
            var w_url_obj_seq_ajax = _cc.ajax(w_url_obj_seq_url, w_url_obj_seq_method, "application/json", JSON.stringify(w_url_obj_json))
            $.when(w_url_obj_seq_ajax).then(
              function(json_resp_obj_seq){
                _cc.validaResponseAjax(json_resp_obj_seq, w_url_obj_seq_url);
                if(json_resp_obj_seq.cnRetorno == 0){
                  _cc.msg("DADOS DO OBJ salvos com sucesso!", "success", 2);
                };
              },
              function(error){
                _cc.error(error);
                _cc.loading.hide();
              }
            );
          };
        };

        if($("[name='cc-dev-ide-propriedades-propriedade']").val() != ""){

          var w_obj_prp_ide_ajax = _cc.ajax(w_prp_url, w_prp_ajax, "application/json", JSON.stringify(w_prp_json))
          $.when(w_obj_prp_ide_ajax).then(
            function(json_resp){
              _cc.validaResponseAjax(json_resp, w_prp_url);
              if(json_resp.cnRetorno == 0){
                _cc.msg("PROPRIEDADE: <strong>" + w_prp_prp + "</strong> salva com sucesso!", "success", 2);
                _ccDev.IDE.tabelaPropriedades(w_prp_obj_nome);
              };
            },
            function(error){
              _cc.error(error);
              _cc.loading.hide();
            }
          );
        };

        
      });

      /* LINK CARREGAR MAIS FMES */
      $(document).on("click","[name='cc-dev-ide-obj-referencia-carregar-mais']",function(){
        /* VARIAVEIS  */
        var w_obj_referencia_url = "",
        w_obj_referencia_ajax = "",
        w_index = 0;

        _ccPlugin.select2.destroi("cc-dev-ide-objetos-obj-referencia");
        $("[name='cc-dev-ide-objetos-obj-referencia']").html("");

        for(var w_form in ccase.master.matriz){
          w_obj_referencia_url = ccase.url.consulta.objeto + "pobjNome=" + _cc.string.retorna(ccase.master.matriz[w_form], 1) + "%&pobjTp=FME&pboAtivo=1&pOrderBy=OBJ_NOME";
          w_obj_referencia_ajax = _cc.ajax(w_obj_referencia_url)

          /* MONTA COMBO COM OBJETOS DE REFERENCIA*/
          $.when(w_obj_referencia_ajax).then(
            function(json_resp_obj_referencia){
              w_index = w_index+1;

              /* VARIAVEIS */
              var w_options = json_resp_obj_referencia.data,
              w_html_option = "";

              for(var w_item in w_options){
                w_html_option += "<option value='" + w_options[w_item].OBJ_NOME + "'>" + w_options[w_item].OBJ_NOME  +"</option>";
              };

              $("[name='cc-dev-ide-objetos-obj-referencia']").append(w_html_option);
              if(w_index == ccase.master.matriz.length){
                _ccPlugin.select2.cria("cc-dev-ide-objetos-obj-referencia");
              };
            },
            function(error){
              _cc.error(error);
              _cc.loading.hide();
            }
          );
        };
      });
    
      /* CHANGE DO OBJ TP, ALTERNANDO O OBJ_NOME */
      $(document).on("change","[name='cc-dev-ide-objetos-obj-tp']",function(){
        $("[name='cc-dev-ide-objetos-obj-referencia']").change()
      });

      /* CHANGE DO OBJ DE REFERENCIA, ALTERNANDO O OBJ_NOME */
      $(document).on("change","[name='cc-dev-ide-objetos-obj-referencia']",function(){
        $("[name='cc-dev-ide-objetos-obj-nome']").val($(this).val() + "." + _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-tp']").val(),1));
        setTimeout(function(){
          _cc.focus("cc-dev-ide-objetos-obj-nome");
        },50);

        var w_obj_tp = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-tp']").val(), 1);
        var w_obj_seq = _cc.string.retorna($("[data-obj-referencia='" + _cc.string.retorna($(this).val(), 1) + "'][data-obj-tp='" + w_obj_tp + "']:last").attr("data-obj-seq"));
        
        if(w_obj_seq != ""){
          $("[name='cc-dev-ide-objetos-obj-seq']").val(parseInt(w_obj_seq) + 10);
        }else{
          $("[name='cc-dev-ide-objetos-obj-seq']").val(10);
        };
      });

      /* ABRIR MODAL DE EDICAO DE OBJETO */
      $(document).on("click","[name='cc-dev-ide-propriedades-propriedade-editar-objeto']",function(){
        _ccDev.IDE.objetos.editar(_cc.string.retorna($("[name='cc-dev-ide-propriedades-obj-nome']").val(),1));
      })


      /* EXCLUIR OBJETO */
      $(document).on("click","[name='cc-dev-ide-editar-objetos-btn-excluir']",function(){
        var w_obj_pos = _ccObj.busca.binaria("wMObjeto",_cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-nome']").val(),1), 0);
        var w_inp_id = wMObjeto[w_obj_pos][2];
        var w_delete_url = ccase.url.tabela + "tabela=ccase_obj&id=" + w_inp_id + "";
        var w_delete_ajax = _cc.ajax(w_delete_url,"delete")
        
        var w_confirm = confirm("Deseja realmente excluir este item?");
        if (w_confirm == true) {
          /* TRACE LOG */
          $.when(w_delete_ajax).then(
            function(json_resp){
              var w_rest_delete = _cc.validaResponseAjax(json_resp, w_delete_url);
              _cc.msg(json_resp.anMensagem,"success",5);
              _cc.modal.close()
            },
            function(error){
              _cc.error(error);
              _cc.loading.hide();
            }
          );
        };
      });

      /* ABRIR AS PROPRIEDADES DE UM OBJETO NO MODAL DE EDICAO */
      $(document).on("click","[name='cc-dev-ide-editar-objetos-btn-propriedades']",function(){
        _ccDev.IDE.propriedades($("[name='cc-dev-ide-editar-objetos-obj-nome']").val())
      });

      /* SALVAR OBJ */
      $(document).on("click","[name='cc-dev-ide-editar-objetos-btn']",function(){
        /* VARIAVEIS */
        var w_obj_nome = _cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-nome']").val()),
        w_obj_tp = _cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-tp']").val()),
        w_obj_referencia = _cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-referencia']").val()),
        w_obj_dsc = _cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-desc']").val()),
        w_obj_seq = _cc.string.retorna($("[name='cc-dev-ide-editar-objetos-obj-seq']").val()),
        w_obj_json = "";

        /* VALIDACAO */
        if(w_obj_nome == "" || w_obj_tp == "" ||  w_obj_seq == ""){
          _cc.msg("Preencha os campos obrigatórios", "danger", 2);
          return false;
        };
        /* AJAX SEQUENCIA */
        var w_obj_url = ccase.url.tabela + "tabela=ccase_obj&id=" + $("[name='cc-dev-ide-editar-objetos-obj-id']").val();
        var w_url_obj_json = {
          "OBJ_SEQ":"" + w_obj_seq + "",
          "OBJ_TP":"" + w_obj_tp + "",
          "OBJ_DSC":"" + w_obj_dsc + ""
        };

        var w_obj_ajax = _cc.ajax(w_obj_url, "put", "application/json", JSON.stringify(w_url_obj_json));

        $.when(w_obj_ajax).then(
          function(json_resp_obj){
            _cc.validaResponseAjax(json_resp_obj, w_obj_url);
            if(json_resp_obj.cnRetorno == 0){
              _cc.msg("DADOS DO OBJ atualizados com sucesso!", "success", 2);
              if($("[name='cc-dev-ide-objetos-abre-propriedades']").is(":checked")){
                  /* VARIAVEIS AUXILIARES */
                  window["cc_aux_obj_tp"] = w_obj_tp
                  window["cc_aux_obj_id"] = json_resp_obj.id
                  window["cc_aux_obj_seq"] = w_obj_seq
                  window["cc_aux_obj_dsc"] = w_obj_dsc

                  _ccDev.IDE.propriedades(w_obj_nome);
                };
            };
          },
          function(error){
            _cc.error(error);
            _cc.loading.hide();
          }
        );
      });



      /* BUTTON: CRIAR OBJETO */
      $(document).on("click","[name='cc-dev-ide-objetos-btn']",function(){
        
        /* VARIAVEIS */
        var w_obj_nome = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-nome']").val()),
        w_obj_tp = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-tp']").val()),
        w_obj_referencia = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-referencia']").val()),
        w_obj_dsc = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-desc']").val()),
        w_obj_seq = _cc.string.retorna($("[name='cc-dev-ide-objetos-obj-seq']").val()),
        w_obj_json = "";

        /* VALIDACAO */
        if(w_obj_nome == "" || w_obj_tp == "" || w_obj_referencia == "" || w_obj_seq == ""){
          _cc.msg("Preencha os campos obrigatórios", "danger", 2);
          return false;
        };

        /* VARIAVEIS DE LOTE */
        var w_obj_lote_obj_url = "",
        w_obj_lote_obj_ajax = "",
        w_obj_lote_prp_url = "",
        w_obj_lote_prp_ajax = "",
        w_obj_lote = "",
        w_props_index = 1;

        /* URL DO LOTE OBJ */
        w_obj_lote_obj_url = ccase.url.tabela + "tabela=ccase_obj&colunas=max(obj_lote)%2B 1 as wMax";
        w_obj_lote_obj_ajax = _cc.ajax(w_obj_lote_obj_url);
          
        /* WHEN */
        $.when(w_obj_lote_obj_ajax).then(
          function(json_resp_lote){

            /* AJAX DO LOTE PRP */
            w_obj_lote_prp_url = ccase.url.tabela + "tabela=ccase_obj_prp&colunas=max(obj_lote)%2B 1 as wMax";
            
            /* AJAX DO LOTE PRP */
            w_obj_lote_prp_ajax = _cc.ajax(w_obj_lote_prp_url);
            
            /* WHEN */
            $.when(w_obj_lote_prp_ajax).then(
              function(json_resp_prp_lote){
                var w_max_lote = "";
                w_obj_lote = (json_resp_lote.data[0].wMax  > json_resp_prp_lote.data[0].wMax) ? w_max_lote = json_resp_lote.data[0].wMax : w_max_lote = json_resp_prp_lote.data[0].wMax;

                w_obj_json = {
                  "OBJ_NOME":""+ w_obj_nome +"",
                  "OBJ_SEQ":""+ w_obj_seq +"",
                  "OBJ_DSC":""+ w_obj_dsc + "",
                  "OBJ_TP":"" + w_obj_tp +"",
                  "OBJ_LOTE":""+ w_obj_lote + ""
                };

                var w_obj_url = ccase.url.tabela + "tabela=ccase_obj";
                var w_prp_url = ccase.url.tabela + "tabela=ccase_obj_prp";
                var w_obj_ajax = _cc.ajax(w_obj_url, "post", "application/json", JSON.stringify(w_obj_json));
                
                /* PROPRIEDADES DO OBJETO */
                var w_props = ["obj_nome", "obj_tp", "titulo", "descricao", "obj_referencia"];
                var w_props_valor = [w_obj_nome, w_obj_tp, w_obj_dsc, w_obj_dsc, w_obj_referencia];

                /* WHEN */
                $.when(w_obj_ajax).then(
                  function(json_resp_obj){
                    if(json_resp_obj.cnRetorno == 0){
                      _cc.msg("Objeto criado com sucesso: <strong>" + w_obj_nome + "</strong>","success",2);
                      
                      /* INSERT DAS PROPRIEDADES */
                      for(var w_item in w_props){

                        var w_prp_json = {
                          "OBJ_NOME":""+ w_obj_nome +"",
                          "PRP_NOME":""+ w_props[w_item] +"",
                          "OBJ_PRP_VLR":""+ w_props_valor[w_item] + "",
                          "OBJ_LOTE":""+ w_obj_lote + ""
                        };
                        
                        var w_prp_ajax = _cc.ajax(w_prp_url,"post", "application/json", JSON.stringify(w_prp_json));

                        $.when(w_prp_ajax).then(
                          function(json_resp_prp){
                            /*  */
                            w_props_index = w_props_index+1;

                            if(json_resp_prp.cnRetorno == 0){
                              _cc.msg("Propriedade <strong>" + w_props[w_item] + "</strong adicionada ao OBJ: " + w_obj_nome,"success",2);    
                            };

                            if(w_props_index == w_props.length){
                              if($("[name='cc-dev-ide-objetos-abre-propriedades']").is(":checked")){
                                /* VARIAVEIS AUXILIARES */
                                window["cc_aux_obj_tp"] = w_obj_tp
                                window["cc_aux_obj_id"] = json_resp_prp.id
                                window["cc_aux_obj_seq"] = w_obj_seq
                                window["cc_aux_obj_dsc"] = w_obj_dsc

                                _ccDev.IDE.propriedades(w_obj_nome);
                              };
                            };
                          },
                          function(error){
                            _cc.error(error);
                            _cc.loading.hide();
                          }
                        );
                      }
                    }
                  },function(error){
                    _cc.error(error);
                    _cc.loading.hide();
                  }
                );
              },
              function(error){
                _cc.error(error);
                _cc.loading.hide();
              }
            );
          },function(error){
            _cc.error(error);
            _cc.loading.hide();
          }
        );
      });

      /* IMPORTAR INPUTS, CHECKBOX DE SELECAO */
      $(document).on("change","[name='cc-dev-ide-grd-importar-check']", function(){
        if($(this).is(":checked") == true){
          $("[name='cc-dev-ide-grd-importar-tabela-inputs'] tbody :checkbox").attr("checked","checked");
        }else{
          $("[name='cc-dev-ide-grd-importar-tabela-inputs'] tbody :checkbox").removeAttr("checked");
        };
      });

      /* MUDA OS SELECTS DE OBJ REFERENCIA */
      $(document).on("change","[name='cc-dev-ide-grd-importar-obj-referencia']",function(){
        var w_obj_referencia = $(this).val();
        $(".cc-import-inputs-obj-referencia").val(w_obj_referencia);
      });

      /* ESCONDE/MOSTRA COLUNAS DO GRID */
      $(document).on("change",".cc-dev-ide-grd-importar-tabela-colunas",function(){
        var w_class = "." + $(this).val();
        if($(this).is(":checked") == true){
          $("" + w_class + "").removeClass("d-none");
        }else{
          $("" + w_class + "").addClass("d-none");
        };
      });

      /* BTN IMPORTAR INPUTS GRID */
      $(document).on("mouseup","[name='cc-dev-ide-grd-importar-btn']",function(){
        var w_grd_import_lote_obj_url = "",
        w_grd_import_lote_obj_ajax = "",
        w_grd_import_lote_prp_url = "",
        w_grd_import_lote_prp_ajax = "",
        w_grd_import_lote = "";

        /* URL DO LOTE OBJ */
        w_grd_import_lote_obj_url = ccase.url.tabela + "tabela=ccase_obj&colunas=max(obj_lote)%2B 1 as wMax";
        w_grd_import_lote_obj_ajax = _cc.ajax(w_grd_import_lote_obj_url);
          
        /* WHEN */
        $.when(w_grd_import_lote_obj_ajax).then(
          function(json_resp_lote){

            /* AJAX DO LOTE PRP */
            w_grd_import_lote_prp_url = ccase.url.tabela + "tabela=ccase_obj_prp&colunas=max(obj_lote)%2B 1 as wMax";
            
            /* AJAX DO LOTE PRP */
            w_grd_import_lote_prp_ajax = _cc.ajax(w_grd_import_lote_prp_url);
            
            /* WHEN */
            $.when(w_grd_import_lote_prp_ajax).then(
              function(json_resp_prp_lote){

                var w_max_lote = "";
                w_grd_import_lote = (json_resp_lote.data[0].wMax  > json_resp_prp_lote.data[0].wMax) ? w_max_lote = json_resp_lote.data[0].wMax : w_max_lote = json_resp_prp_lote.data[0].wMax;
                $("[name='cc-dev-ide-grd-importar-lote']").val(w_grd_import_lote);
                /* OBJ LOTE */

                $("[name='cc-dev-ide-grd-importar-tabela-inputs'] tbody tr").each(function(){
                  if($(this).find(":checkbox").is(":checked") == true){
                    /* VARIAVEIS */
                    var w_obj_nome_col_nome = $(this).find("td:eq(1) :input").val();
                    w_obj_nome_col_nome = w_obj_nome_col_nome.substr(w_obj_nome_col_nome.indexOf(".") + 1);
                    
                    /* VARIAVEIS */
                    var w_props = ["OBJ_REFERENCIA_DATAGRID", "OBJ_REFERENCIA", "OBJ_NOME", "OBJ_SEQ", "COL_NOME", "COL_TP", "INPUT_TP", 'COL_VIRTUAL', "COL_GRID", "COL_GRID_ORDEM", "COLSPAN", "TITULO", "OBJ_TP", "DESCRICAO"],
                    w_props_json = [],
                    w_objs_json = [],
                    w_obj_url = "", 
                    w_obj_ajax = "",
                    w_prp_url = "", 
                    w_prp_ajax = "";

                    /* VARIAVEIS DOS OBJETOS */
                    var w_obj_referencia_datagrid = $("[name='cc-dev-ide-grd-importar-obj-nome']").val(),
                    w_obj_referencia = $(this).find("td:eq(0) :input").val(),
                    w_obj_nome = w_obj_referencia + "." + w_obj_nome_col_nome,
                    w_obj_tp = "INP",
                    w_obj_seq = $(this).find("td:eq(2) :input").val(),
                    w_col_nome = $(this).find("td:eq(3) :input").val(),
                    w_col_tp = $(this).find("td:eq(4) :input").val(),
                    w_input_tp = $(this).find("td:eq(5) :input").val(),
                    w_col_virtual = $(this).find("td:eq(6) :input").val(),
                    w_col_grid = $(this).find("td:eq(7) :input").val(),
                    w_col_grid_ordem = $(this).find("td:eq(8) :input").val(),
                    w_colspan = $(this).find("td:eq(9) :input").val(),
                    w_titulo = $(this).find("td:eq(10) :input").val(),
                    w_descricao = $(this).find("td:eq(11) :input").val();


                    /* JSON DO OBJ */
                    var w_obj_json = {
                      "OBJ_NOME":""+ w_obj_nome +"",
                      "OBJ_SEQ":""+ w_obj_seq +"",
                      "OBJ_DSC":""+ w_descricao + "",
                      "OBJ_TP":"INP",
                      "OBJ_LOTE":""+ w_grd_import_lote + ""
                    };                    

                    /* INSERT DOS OBJETOS */
                    $.ajax({
                      url:ccase.url.tabela + "tabela=ccase_obj",
                      method:"post",
                      contentType: "application/json",
                      data:JSON.stringify(w_obj_json),
                      success:function(json_resp_obj){
                        if(json_resp_obj.cnRetorno == 0){
                          _cc.msg("Objeto criado com sucesso: <strong>" + w_obj_nome + "</strong>","success",2);
                          /* INSERT DAS PROPRIEDADES */
                          for(var w_item in w_props){
                            var w_prp_json = {
                              "OBJ_NOME":""+ w_obj_nome +"",
                              "PRP_NOME":""+ w_props[w_item] +"",
                              "OBJ_PRP_VLR":""+ eval("w_" + _cc.string.retorna(w_props[w_item],1) + "") + "",
                              "OBJ_LOTE":""+ w_grd_import_lote + ""
                            };
                            
                            $.ajax({
                              url:ccase.url.tabela + "tabela=ccase_obj_prp",
                              method:"post",
                              contentType: "application/json",
                              data:JSON.stringify(w_prp_json),
                              success:function(json_resp_prp){
                                if(json_resp_prp.cnRetorno == 0){
                                  _cc.msg("Propriedade <strong>" + w_props[w_item] + "</strong adicionada ao OBJ: " + w_obj_nome,"success",2);    
                                };
                              }
                            });
                          }
                        };
                      }
                    });

                  };
                })

              },
              function(error){
                _cc.error(error);
              }
            );
          },
          function(error){
            _cc.error(error)
          },
        );
      });

      /* BTN LIMPAR LOG ERROS */
      $(document).on("mouseup",".cc-dev-clear-error-log",function(){
        $("[name='cc-dev-error-log']").html("");
      });

      $(document).on("click",".cc-dev-trace-log-remove-line",function(){
        $(this).closest("tr").remove();
      });

      $(document).on("click",".cc-btn-trace-json",function(){
        
      });

      /* BTN LIMPAR LOG TRACE */
      $(document).on("mouseup",".cc-dev-clear-trace-log",function(){
        $("[name='cc-dev-trace-grid'] tbody").html("");
      });
    },
    debug:function(){
      $("[data-bo-regra='1']").each(function(){
        $(this).toggleClass("cc-bo-regra");
      });
    },
    debugMenu:function(){
      if($(".cc-mnu-on").length > 0){
        $(".cc-mnu-on").removeClass("cc-mnu-on");
        $(".cc-mnu").addClass("cc-mnu-off");
      }else{
        $(".cc-mnu-off").removeClass("cc-mnu-off");
        $(".cc-mnu").addClass("cc-mnu-on");
      }
    },
    tabelaPropriedades:function(p_obj){
      try{
        /* VARIAVEIS */
        var w_prp_url = ccase.url.consulta.propriedade + p_obj,
        w_prp_ajax = _cc.ajax(w_prp_url);

        /* WHEN */
        $.when(w_prp_ajax).then(
          function(json_resp){

            /* VALIDA AJAX */
            _cc.validaResponseAjax(json_resp, ccase.url.consulta.propriedade + p_obj)

            var w_obj_id_pos = _ccObj.busca.binaria("wMObjeto",_cc.string.retorna(p_obj,1),0)

            _ccPlugin.DataTable.destroi("cc-dev-ide-propriedades-tabela");

            $("[name='cc-dev-ide-propriedades-obj-nome']").val(_cc.string.retorna(p_obj,1));

            var w_obj_url = ccase.url.consulta.objeto + "pobjNome=" + _cc.string.retorna(p_obj,1);
            var w_obj_ajax = _cc.ajax(w_obj_url);

            $.when(w_obj_ajax).then(
              function(json_resp_obj){
                var w_data_obj = json_resp_obj.data["" + _cc.string.retorna(p_obj,1) + ""];

                if(w_obj_id_pos > -1){
                  $("[name='cc-dev-ide-propriedades-id-obj']").val(wMObjeto[w_obj_id_pos][2]);
                }
                $("[name='cc-dev-ide-propriedades-obj-tp']").val(w_data_obj.OBJ_TP);
                $("[name='cc-dev-ide-propriedades-obj-seq']").val(w_data_obj.OBJ_SEQ);
                $("[name='cc-dev-ide-propriedades-obj-seq']").attr("data-obj-seq-inicial",w_data_obj.OBJ_SEQ);
                
                /* TABLE PROPRIEDADES */
                var w_propriedades = json_resp.data;
                var w_tr = ""; 
                for(var w_propriedade in w_propriedades){
                  w_tr += "<tr>";
                  // id , prp_nome , obj_prp_vlr , prp_grp , prp_Input_TP , prp_Tamanho , prp_ColSpan , Prp_Get_Dft , Prp_Dsc , Prp_Hlp , Prp_Obs , bo_prioridade , bo_requerido , prp_cmb_lst
                  var w_id = w_propriedades[w_propriedade].id;
                  var w_valor = w_propriedades[w_propriedade].obj_prp_vlr;
                  var w_requerido = w_propriedades[w_propriedade].bo_requerido;
                  var w_prioridade = w_propriedades[w_propriedade].bo_prioridade;

                  if(w_id == null){w_id = "";};
                  if(w_valor == null){w_valor = "";};
                  if(w_requerido == "1"){
                    w_requerido = "<span class='text-danger fas fa-clipboard-check'></span>";
                  }else{
                    w_requerido = "";
                  };
                  if(w_prioridade == "1"){
                    w_prioridade = "<span class='text-warning fas fa-clipboard-check'></span>";
                  }else{
                    w_prioridade = "";
                  };

                  w_tr += "<td class='text-center'>" + w_id + "</td>";
                  w_tr += "<td>" + w_propriedades[w_propriedade].prp_nome + "</td>";
                  w_tr += "<td>" + w_valor + "</td>";
                  w_tr += "<td class='text-center'>" + w_propriedades[w_propriedade].prp_grp + "</td>";
                  w_tr += "<td class='text-center'>" + w_prioridade + "</td>";
                  w_tr += "<td class='text-center'>" + w_requerido + "</td>";
                  w_tr += "</tr>";
                };
                $("[name='cc-dev-ide-propriedades-tabela'] tbody").html(w_tr);
                
                /*_ccPlugin.DataTable.cria("cc-dev-ide-propriedades-tabela");*/
                var p_grd_json_datatable = {
                  "aLengthMenu": [-1, 'todas'],
                  "aaSorting": [[5,'desc'], [4,'desc']],
                  "iDisplayLength": -1,
                  "pageLength": -1,
                  "paging": false,
                  "destroy":true,
                  "info":false,
                  "language": {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ atÃ© _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 atÃ© 0 de 0 registros",
                    "searchPlaceholder": "Buscar",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ <span class='cc-float-left cc-datatable-length'>resultados por pÃ¡gina</span>",
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
                    "buttons": ["excel"],
                    "oAria": {
                      "sSortAscending": ": Ordenar A-Z",
                      "sSortDescending": ": Ordenar Z-A"
                    }
                  }
                };

                $("[name='cc-dev-ide-propriedades-tabela']").DataTable(p_grd_json_datatable);

                $("[name='cc-dev-ide-propriedades-id']").val("");
                $("[name='cc-dev-ide-propriedades-propriedade']").val("");
                $("[name='cc-dev-ide-propriedades-valor']").val("");
              },
              function(error){
                _cc.error(error);
              }
            );
          },
          function(error){
            _cc.error(error)
          }
        );
      }catch(error){
        _cc.error(error);
      }
    },
    trace:function(p_bo){
      /* VARIAVEIS */
      var w_deferred = $.Deferred();

      var w_htm_prp_url = "/Content/Dev/cc-dev-trace.html?v="+Math.random(),
      w_htm_prp_ajax = "";

      /* LOADING AJAX */
      _cc.loading.show();
      
      /* AJAX */
      if($("[name='cc-dev-trace']").length == 0){
        w_htm_prp_ajax = _cc.ajax(w_htm_prp_url,"get","text/html");
      }else{
        w_htm_prp_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_prp_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-dev-trace']").length == 0){
            $(w_htm).appendTo("body");
          };

          /* HIDE LOADING */
          _cc.loading.hide();

          w_deferred.resolve(w_resp_htm);
        },
        function(error){
          _cc.error(error);
          _cc.loading.hide();
        }
      );

      if(p_bo == true){
        // window.w_dese_bo_trace = true;
      }else{
        // window.w_dese_bo_trace = false;
      };

      return w_deferred.promise();
    },
    errorLog:function(){
      /* VARIAVEIS */
      var w_htm_prp_url = "/Content/Dev//cc-dev-error.html?v="+Math.random(),
      w_htm_prp_ajax = "";

      /* LOADING AJAX */
      _cc.loading.show();
      
      /* AJAX */
      if($("[name='cc-dev-error']").length == 0){
        w_htm_prp_ajax = _cc.ajax(w_htm_prp_url,"get","text/html");
      }else{
        w_htm_prp_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_prp_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-dev-error']").length == 0){
            $(w_htm).appendTo("body");
          };

          /* HIDE LOADING */
          _cc.loading.hide();
        },
        function(error){
          _cc.error(error);
          _cc.loading.hide();
        }
      );
    },
    objetos:{
      criar:function(p_obj){
        var w_htm_obj_url = "/Content/Dev//cc-dev-ide-objetos-criar.html?v="+Math.random(),
        w_htm_obj_ajax = "";

        /* LOADING AJAX */
        _cc.loading.show();
        
        /* AJAX */
        if($("[name='cc-dev-ide-objetos']").length == 0){
          w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"get","text/html");
        }else{
          w_htm_obj_ajax = true;
        };

        /* WHEN */ 
        $.when(w_htm_obj_ajax).then(
          function(w_resp_htm){
            var w_htm = w_resp_htm,
            w_obj_pos = "",
            w_obj_nome = "",
            w_obj_tp = "",
            w_obj_tp_url = "",
            w_obj_tp_ajax = "",
            w_obj_referencia_url = "",
            w_obj_referencia_ajax = "",
            w_obj_referencia = "",
            w_obj_seq = "",
            w_obj = _cc.string.retorna(p_obj, 1);

            w_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_obj,"obj_referencia"),1);

            /* APPEND DO MODAL */
            if($("[name='cc-dev-ide-objetos']").length == 0){
              $(w_htm).appendTo("body");
            };

            /* LIMPA CAMPOS NO MODAL */
            $("[name='cc-dev-ide-objetos-obj-nome']").val("");
            $("[name='cc-dev-ide-objetos-obj-referencia']").html("");
            $("[name='cc-dev-ide-objetos-obj-seq']").val("");
            $("[name='cc-dev-ide-objetos-obj-tp']").val("");
            $("[name='cc-dev-ide-objetos-obj-nome']").val("");

            /* FILL CAMPOS */
            w_obj_pos = _ccObj.busca.binaria("wMObjeto",w_obj,0);
            w_obj_nome = w_obj.substr(0, w_obj.indexOf("."));
            
            $("[name='cc-dev-ide-objetos-obj-nome']").val(w_obj_nome + ".");
            $("[name='cc-dev-ide-objetos-obj-seq']").val();

            w_obj_referencia_url = ccase.url.consulta.objeto + "pobjNome=" + w_obj_nome +".%&pObjTp=frm','mnu','fme&pboAtivo=1&pOrderBy=OBJ_NOME";
            w_obj_referencia_ajax = _cc.ajax(w_obj_referencia_url)

            /* MONTA COMBO COM OBJETOS DE REFERENCIA*/
            $.when(w_obj_referencia_ajax).then(
              function(json_resp_obj_referencia){
                /* VARIAVEIS */
                var w_options = json_resp_obj_referencia.data,
                w_html_option = "";
                _ccPlugin.select2.destroi("cc-dev-ide-objetos-obj-referencia");

                for(var w_item in w_options){
                  w_html_option += "<option value='" + _cc.string.retorna(w_options[w_item].OBJ_NOME,1) + "'>" + w_options[w_item].OBJ_NOME  +"</option>";
                };

                $("[name='cc-dev-ide-objetos-obj-referencia']").html(w_html_option);
                _ccPlugin.select2.cria("cc-dev-ide-objetos-obj-referencia");

                /* OBJETO TP */
                w_obj_tp_url = ccase.url.dominio + "DOM_Obj_Tp";
                w_obj_tp_ajax = _cc.ajax(w_obj_tp_url);

                $.when(w_obj_tp_ajax).then(
                  function(json_resp_tp){
                    /* VARIAVEIS */
                    var w_options = json_resp_tp.data,
                    w_html_option = "";
                    _ccPlugin.select2.destroi("cc-dev-ide-objetos-obj-tp");

                    for(var w_item in w_options){
                      w_html_option += "<option value='" + w_options[w_item].caDominio + "'>" + w_options[w_item].caDominio + " - " + w_options[w_item].anDominio  +"</option>";
                    };

                    $("[name='cc-dev-ide-objetos-obj-tp']").html(w_html_option);
                    _ccPlugin.select2.cria("cc-dev-ide-objetos-obj-tp");

                    setTimeout(function(){
                      $("[name='cc-dev-ide-objetos-obj-tp']").val(wMObjeto[w_obj_pos][1]).change();
                      var w_array_self = ["fme","frm","fld","mnu"];
                      var w_array_parent = ["inp","btn","grd","htm"];
                      var w_obj_tp = _cc.string.retorna(wMObjeto[w_obj_pos][1],1);
                      
                      if(w_array_self.indexOf(w_obj_tp) >= 0){
                        $("[name='cc-dev-ide-objetos-obj-referencia']").val(_cc.string.retorna(p_obj,1)).change();
                      }else{
                        $("[name='cc-dev-ide-objetos-obj-referencia']").val(w_obj_referencia).change();
                      } 
                    },50);

                    setTimeout(function(){
                      _cc.modal.show("cc-dev-ide-objetos");
                    },100);
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
      },
      editar:function(p_obj){
        var w_htm_obj_url = "/Content/Dev//cc-dev-ide-objetos-editar.html?v="+Math.random(),
        w_htm_obj_ajax = "";

        /* LOADING AJAX */
        _cc.loading.show();
        
        /* AJAX */
        if($("[name='cc-dev-ide-editar-objetos']").length == 0){
          w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"get","text/html");
        }else{
          w_htm_obj_ajax = true;
        };

        /* WHEN */ 
        $.when(w_htm_obj_ajax).then(
          function(w_resp_htm){
            var w_htm = w_resp_htm;
            w_obj_pos = "",
            w_obj_id = "",
            w_obj_nome = "",
            w_obj_tp = "",
            w_obj_dsc = "",
            w_obj_seq = "",
            w_obj_ajax = "",
            w_obj_propriedade_url = "",
            w_obj_propriedade_ajax = "",
            w_obj_tp_url = "",
            w_obj_tp_ajax = "",
            w_obj_referencia_url = "",
            w_obj_referencia_ajax = "",
            w_obj_referencia = "",
            w_index = 0,
            w_obj = _cc.string.retorna(p_obj, 1);

            /* APPEND DO MODAL */
            if($("[name='cc-dev-ide-editar-objetos']").length == 0){
              $(w_htm).appendTo("body");
            };

            /* LIMPA CAMPOS NO MODAL */
            $("[name='cc-dev-ide-editar-objetos-id']").val("");
            $("[name='cc-dev-ide-editar-objetos-obj-nome']").val("");
            $("[name='cc-dev-ide-editar-objetos-obj-referencia']").html("");
            $("[name='cc-dev-ide-editar-objetos-obj-seq']").val("");
            $("[name='cc-dev-ide-editar-objetos-obj-tp']").val("");
            $("[name='cc-dev-ide-editar-objetos-obj-nome']").val("");

            /* FILL CAMPOS */
            w_obj_pos = _ccObj.busca.binaria("wMObjeto",w_obj,0);
            w_obj_id = wMObjeto[w_obj_pos][2];
            
            /* URLs */
            w_obj_url = ccase.url.root + "tabela=ccase_obj&where=id=" + w_obj_id;
            w_obj_propriedade_url = ccase.url.tabela + "&TABELA=ccase_obj_prp&WHERE=obj_nome='"+ wMObjeto[w_obj_pos][0] + "'";

            w_obj_ajax = _cc.ajax(w_obj_url);
            w_obj_propriedade_ajax = _cc.ajax(w_obj_propriedade_url);

            $.when(w_obj_propriedade_ajax).then(
              function(json_resp_obj_propriedade){
                var w_propriedades = json_resp_obj_propriedade.data;
                for(var w_item in w_propriedades){
                  if(_cc.string.retorna(w_propriedades[w_item].prp_nome, 1) == "obj_referencia"){
                    w_obj_referencia = _cc.string.retorna(w_propriedades[w_item].obj_prp_vlr, 1);
                  };
                };
              },
              function(error){
                _cc.error(error);
                _cc.loading.hide();
              }
            );

            $.when(w_obj_ajax).then(
              function(json_resp_obj){
                var w_obj_json = json_resp_obj.data[0];

                /* ATRIBUICOES */
                w_obj_id = w_obj_json.id,
                w_obj_nome = w_obj_json.obj_nome,
                w_obj_tp = w_obj_json.obj_tp,
                w_obj_dsc = w_obj_json.obj_dsc,
                w_obj_seq = w_obj_json.obj_seq;

                $("[name='cc-dev-ide-editar-objetos-obj-id']").val(w_obj_id);
                $("[name='cc-dev-ide-editar-objetos-obj-nome']").val(w_obj_nome);
                $("[name='cc-dev-ide-editar-objetos-obj-desc']").val(w_obj_dsc);
                $("[name='cc-dev-ide-editar-objetos-obj-seq']").val(w_obj_seq);
              },
              function(error){
                _cc.error(error);
                _cc.loading.hide();
              }
            );
   
            $.when(w_obj_ajax).then(
              function(){
                /* CARREGA OBJETOS DE REFERENCIA DO PROJETO */
                w_obj_referencia_url = ccase.url.consulta.objeto + "pobjNome=" + w_obj_nome +"%&pobjTp=FME&pboAtivo=1&pOrderBy=OBJ_NOME";
                w_obj_referencia_ajax = _cc.ajax(w_obj_referencia_url)
                
                _ccPlugin.select2.destroi("cc-dev-ide-editar-objetos-obj-referencia");
                
                $("[name='cc-dev-ide-editar-objetos-obj-referencia']").html("");
                
                for(var w_form in ccase.master.matriz){
                  w_obj_referencia_url = ccase.url.consulta.objeto + "pobjNome=" + _cc.string.retorna(ccase.master.matriz[w_form], 1) + "%&pobjTp=FME&pboAtivo=1&pOrderBy=OBJ_NOME";
                  w_obj_referencia_ajax = _cc.ajax(w_obj_referencia_url)
                  /* MONTA COMBO COM OBJETOS DE REFERENCIA*/
                  $.when(w_obj_referencia_ajax).then(
                    function(json_resp_obj_referencia){
                      
                      w_index = w_index+1;
                      /* VARIAVEIS */
                      
                      var w_options = json_resp_obj_referencia.data,
                      w_html_option = "";
                      
                      for(var w_item in w_options){
                        w_html_option += "<option value='" + _cc.string.retorna(w_options[w_item].OBJ_NOME, 1) + "'>" + w_options[w_item].OBJ_NOME  +"</option>";
                      };

                      $("[name='cc-dev-ide-editar-objetos-obj-referencia']").append(w_html_option);
                      
                      if(w_index == ccase.master.matriz.length){
                        _ccPlugin.select2.cria("cc-dev-ide-editar-objetos-obj-referencia");

                        setTimeout(function(){
                          $("[name='cc-dev-ide-editar-objetos-obj-referencia']").val(w_obj_referencia).change();
                        },100);
                      };
                    },
                    function(error){
                      _cc.error(error);
                      _cc.loading.hide();
                    }
                  );
                };
                /* CARREGA OS OBJ TP */
                w_obj_tp_url = ccase.url.dominio + "DOM_Obj_Tp";
                w_obj_tp_ajax = _cc.ajax(w_obj_tp_url);
                $.when(w_obj_tp_ajax).then(
                  function(json_resp_tp){
                    /* VARIAVEIS */
                    var w_options = json_resp_tp.data,
                    w_html_option = "";
                    _ccPlugin.select2.destroi("cc-dev-ide-editar-objetos-obj-tp");
                    
                    for(var w_item in w_options){
                      w_html_option += "<option value='" + w_options[w_item].caDominio + "'>" + w_options[w_item].caDominio + " - " + w_options[w_item].anDominio  +"</option>";
                    };

                    
                    $("[name='cc-dev-ide-editar-objetos-obj-tp']").html(w_html_option);
                    _ccPlugin.select2.cria("cc-dev-ide-editar-objetos-obj-tp");
                    
                    /* SELECIONA OBJ */
                    setTimeout(function(){
                      $("[name='cc-dev-ide-editar-objetos-obj-tp']").val(w_obj_tp).change();
                      _cc.modal.show("cc-dev-ide-editar-objetos")
                    },100);

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
      },
      clonar:function(p_obj){
        var w_htm_obj_url = "/Content/Dev//cc-dev-ide-clonar.html?v="+Math.random(),
        w_htm_obj_ajax = "";

        /* LOADING AJAX */
        _cc.loading.show();
        
        /* AJAX */
        if($("[name='cc-dev-ide-clonar']").length == 0){
          w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"get","text/html");
        }else{
          w_htm_obj_ajax = true;
        };

        $.when(w_htm_obj_ajax).then(
          function(w_resp_htm){
            var w_htm = w_resp_htm;
            w_obj = _cc.string.retorna(p_obj, 1);

            /* APPEND DO MODAL */
            if($("[name='cc-dev-ide-objetos-clonar']").length == 0){
              $(w_htm).appendTo("body");
            };

            _cc.modal.show("cc-dev-ide-clonar");
          },
          function(){}
        );
      },
      replace:function(p_obj){
        var w_htm_obj_url = "/Content/Dev//cc-dev-ide-replace.html?v="+Math.random(),
        w_htm_obj_ajax = "";

        /* LOADING AJAX */
        _cc.loading.show();
        
        /* AJAX */
        if($("[name='cc-dev-ide-replace']").length == 0){
          w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"get","text/html");
        }else{
          w_htm_obj_ajax = true;
        };

        $.when(w_htm_obj_ajax).then(
          function(json_resp){
            _cc.modal.show("cc-dev-ide-replace");
          },
          function(){}
        );

      }
    },
    propriedades:function(p_obj){
      /* VARIAVEIS */
      var w_htm_prp_url = "/Content/Dev//cc-dev-ide-propriedades.html?v="+Math.random(),
      w_htm_prp_ajax = "";

      /* LOADING AJAX */
      _cc.loading.show();
      
      /* AJAX */
      if($("[name='cc-dev-ide-propriedades']").length == 0){
        w_htm_prp_ajax = _cc.ajax(w_htm_prp_url,"get","text/html");
      }else{
        w_htm_prp_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_prp_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-dev-ide-propriedades']").length == 0){
            $(w_htm).appendTo("body");
            /* EDITOR */
            window.ccAceEditor = ace.edit("cc-ace-editor");
            ccAceEditor.getSession().setMode("ace/mode/javascript");
            ccAceEditor.session.setOptions({
              mode: "ace/mode/javascript",
              tabSize: 2,
              showInvisibles:true,
              showPrintMargin:false,
              autoIndent:false,
              autoComplete:false,
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              spellcheck: false,
              showTokenInfo:true,
              mergeUndoDeltas:false,
              enableEmmet:false,
              enableBasicAutocompletion:false,
              enableLiveAutocompletion:false,
              enableSnippets:false,
              spellcheck:false,
              useElasticTabstops:false,
              useSoftTabs: true,
              useWorker:false
            });
          };

          /* SHOW MODAL */
          _cc.modal.show("cc-dev-ide-propriedades")

          /* FILL THE TABLE */
          $("[name='cc-dev-ide-propriedades-id-obj']").val("");
          $("[name='cc-dev-ide-propriedades-obj-nome']").val("");
          $("[name='cc-dev-ide-propriedades-obj-tp']").val("");
          $("[name='cc-dev-ide-propriedades-id']").val("");
          $("[name='cc-dev-ide-propriedades-propriedade']").val("");
          $("[name='cc-dev-ide-propriedades-valor']").val("");
          ccAceEditor.getSession().setValue("");

          if($("[name='cc-dev-ace-editor-full-screen']").is(":checked") == true){
            $("[name='cc-dev-ace-editor-full-screen']").trigger("click").change();
          };

          _ccDev.IDE.tabelaPropriedades(p_obj);

          /* HIDE LOADING */
          _cc.loading.hide();
        },
        function(error){
          _cc.error(error);
          _cc.loading.hide();
        }
      );
    },
    sysCli:function(){
      _ccDev.IDE.propriedades(ccase.global.sys + "." + parseInt(ccase.global.cli));
    },
    sys:function(){
      _ccDev.IDE.propriedades(ccase.global.sys);
    },
    refresh:function(){
      wMObjeto = [];
      wMObjetoReferencia = [];
      wMObjetoPropriedades = [];
      wMPerfilSegmento = [];
      wMPerfilUsuario = [];
      wMObjetoDominio = [];
      wMObjetoDominioOld = [];
      wMObjetoReferenciaDatagrid = [];
      wMObjetoForeignKey = [];
      wMObjetoPropriedadesDefault = [];
      $("[name='cc-menu-bloco']").html("");
      $("[name='cc-conteudo-bloco']").html("");
      
      _ccConf.start();
      _ccOath.start();
    },
    importarInputs:function(p_obj){
       /* VARIAVEIS */
      var w_htm_prp_url = "/Content/Dev/cc-dev-grd-importar.html?v="+Math.random(),
      w_htm_prp_ajax = "";

      /* LOADING AJAX */
      _cc.loading.show();
      
      /* AJAX */
      if($("[name='cc-dev-ide-grd-importar']").length == 0){
        window.w_dese_trace_info = "cc.dev";
        w_htm_prp_ajax = _cc.ajax(w_htm_prp_url,"GET","text/html","","<strong class='cc-bg-preto text-yellow'>REST IMPORTAR INPUTS:</strong><br>GETINFO" ,w_dese_trace_info,"");
      }else{
        w_htm_prp_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_prp_ajax).then(
        function(w_resp_htm){
          console.log("w_resp_htm",w_resp_htm);

          var w_htm = w_resp_htm,
          w_grd_obj_referencia_tab_nome_ajax = "",
          w_grd_obj_referencia_tab_nome_url = "",
          w_grd_obj_referencia = "",
          w_grd_obj_referencia_tab_nome = "",
          w_grd_obj_referencia_url = "",
          w_grd_obj_referencia_ajax = "";

          /* APPEND DO MODAL */
          if($("[name='cc-dev-ide-grd-importar']").length == 0){
            $(w_htm).appendTo("body");
          };

          /* SHOW MODAL */
          _cc.modal.show("cc-dev-ide-grd-importar")

          /* OBJ NOME */
          $("[name='cc-dev-ide-grd-importar-obj-nome']").val(p_obj);
          
          /* OBJ REFERENCIA */
          w_grd_obj_referencia = _ccPrp.consulta(p_obj, "OBJ_REFERENCIA");
          if(_cc.string.retorna(w_grd_obj_referencia) == ""){
            _cc.msg("Não existe <strong>OBJ_REFERENCIA</strong> no Grid: " + p_obj,"danger",2);
            return false;
          };

          w_grd_obj_referencia_tab_nome = _ccPrp.consulta(p_obj, "TAB_NOME");
          if(_cc.string.retorna(w_grd_obj_referencia_tab_nome) == ""){
            _cc.msg("Não existe <strong>TAB_NOME</strong> no Grid: " + p_obj,"danger",2);
          };

          w_grd_obj_referencia = w_grd_obj_referencia.substr(0, w_grd_obj_referencia.lastIndexOf("."));
          w_grd_obj_referencia_url = ccase.url.consulta.objeto + "pobjNome=" + w_grd_obj_referencia +"%&pobjTp=FME&pboAtivo=1&pOrderBy=OBJ_NOME";
          console.log("w_grd_obj_referencia_url",w_grd_obj_referencia_url)
          w_grd_obj_referencia_ajax = _cc.ajax(w_grd_obj_referencia_url);

          /* MONTA COMBO COM OBJETOS DE REFERENCIA*/
          $.when(w_grd_obj_referencia_ajax).then(
            function(json_resp_obj_referencia){
              console.log("w_grd_obj_referencia_ajax",w_grd_obj_referencia_ajax);

              /* VARIAVEIS */
              var w_options = json_resp_obj_referencia.data,
              w_html_option = "";

              _ccPlugin.select2.destroi("cc-dev-ide-grd-importar-obj-referencia");

              for(var w_item in w_options){
                w_html_option += "<option value='" + w_item + "'>" + w_item  +"</option>";
              };

              $("[name='cc-dev-ide-grd-importar-obj-referencia']").html(w_html_option);
              
              _ccPlugin.select2.cria("cc-dev-ide-grd-importar-obj-referencia");
            },
            function(error){
              _cc.error(error)
            }
          );

          /* INPUTS */
          w_grd_obj_referencia_tab_nome_url = ccase.url.ccasegd + "/tabela?tabela=" + w_grd_obj_referencia_tab_nome + "&tk=" + ccase.global.token;
          w_grd_obj_referencia_tab_nome_ajax = _cc.ajax(w_grd_obj_referencia_tab_nome_url);
          $.when(w_grd_obj_referencia_tab_nome_ajax).then(
            function(json_resp){
              var w_inputs = json_resp.data[0].COLUNAS,
              w_item = "",
              w_htm = "";

              for(w_item in w_inputs){
                w_htm += "<tr>";
                w_htm +=  "<td class='cc_col_obj_referencia'><select class='form-control form-control cc-import-inputs-obj-referencia cc-ignore-select2'></select></td>";
                w_htm +=  "<td class='cc_col_obj_nome d-none'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].OBJ_NOME) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_obj_seq'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].OBJ_SEQ) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_col_nome'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COL_NOME) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_col_tp'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COL_TP) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_input_tp'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].INPUT_TP) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_col_virtual'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COL_VIRTUAL) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_col_grid'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COL_GRID) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_col_grid_ordem'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COL_GRID_ORDEM) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_colspan'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].COLSPAN) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_titulo'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].TITULO) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='cc_col_descricao'><input type='text' value='" + _cc.string.retorna(w_inputs[w_item].DESCRICAO) + "' class='form-control form-control-sm'></td>";
                w_htm +=  "<td class='text-center'><input type='checkbox'></td>"
                w_htm += "</tr>";
              };

              $("[name='cc-dev-ide-grd-importar-tabela-inputs'] tbody").html(w_htm);
              
              /* INSERE OS OPTIONS */
              $(".cc-import-inputs-obj-referencia").each(function(){
                $(this).html($("[name='cc-dev-ide-grd-importar-obj-referencia']").html());
              });
            },function(error){
              _cc.error(error)
            }
          );

          /* HIDE LOADING */
          _cc.loading.hide();
        },
        function(error){
          _cc.error(error);
          _cc.loading.hide();
        }
      );
    }
  };
};

var _ccDev = new _ccaseDesenvolvedor();

$(document).ready(function(){
  _ccDev.inicia();
  _ccDev.IDE.listen();
});


