/*! = POSSUI PROPRIEDADE DEFAULT */ 
var _ccaseInput = function(){

  this.cria = function(p_inp, p_inp_obj_referencia){
    try{
      /*
         01 - TEXT, 
         02 - NUMBER, 
         03 - DATE
         04 - HORA, 
         05 - MULTILINE, 
         06 - RICHTEXT
         07 - COMBO, 
         08 - COMBOCOD, 
         09 - COMBODB
         10 - RADIO, 
         11 - CHECKBOX, 
         12 - ARQUIVO
         13 - IMAGEM, 
         14 - PASSWORD, 
         15 - BUTTON
         16 - HIDDEN, 
         17 - HTML, 
         18 - SEPARADOR
         19 - GOOGLE MAPS, 
         20 - GOOGLE STREET VIEW
         21 - GOOGLE STREET VIEW
      */
     
      /* OBJ */
      var w_inp = _cc.string.retorna(p_inp);

      /* VARIAVEL */
      var w_inp_htm = "",
      w_inp_label = "",
      w_inp_tag = "",
      w_inp_css_class = "",
      w_inp_css_class_tag = "",
      w_inp_css_class_label = "",
      w_inp_readonly = "",
      w_inp_disable = "",
      w_inp_required = "",
      w_inp_mascara = "",
      w_inp_required_label = "",
      w_inp_bo_fk = "",
      w_inp_class_form_control = "",
      w_inp_prop_auto_increment = "",
      w_inp_prop_pk = "",
      w_inp_prop_fk = "",
      w_inp_prop_uk = "",
      w_inp_prop_k = "",
      w_inp_prop_sequence = "",
      w_inp_props = "",
      w_inp_props_tag = "",
      w_inp_props_label = "",
      w_inp_tp_text = "",
      w_inp_tp_number = "",
      w_inp_tp_date = "",
      w_inp_tp_datetime = "",
      w_inp_tp_multiline = "",
      w_inp_tp_richtext = "",
      w_inp_tp_combo = "",
      w_inp_tp_combocod = "",
      w_inp_tp_combodb = "",
      w_inp_tp_radio = "",
      w_inp_tp_checkbox = "",
      w_inp_tp_arquivo = "",
      w_inp_tp_imagem = "",
      w_inp_tp_file = "",
      w_inp_tp_password = "",
      w_inp_tp_button = "",
      w_inp_tp_hidden = "",
      w_inp_tp_html = "",
      w_inp_tp_separador = "",
      w_inp_tp_googlemaps = "",
      w_inp_bo_regra = "",
      w_inp_tp_googlemaps_street_view = "",
      w_inp_filtro_bo = 0;

      /* PROPRIEDADES > PRINCIPAIS */
      var w_inp_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_inp,"OBJ_NOME"), 1);
      var w_inp_col_nome = _cc.string.retorna(_ccPrp.consulta(w_inp,"COL_NOME"), 1);

      if(_cc.string.retorna(p_inp_obj_referencia,1) != ""){
        w_inp_filtro_bo = 1
      };

      /* INPUT SEM COL_VIRTUAL */
      var w_inp_col_virtual = _ccPrp.consulta(w_inp,"COL_VIRTUAL");

      /* VALIDACAO DO COL_NOME */
      if(w_inp_col_nome == ""){
        if(w_inp_col_virtual != 1){
          // COL_VIRTUAL
          _cc.msg("INP: <span class='text-yellow text-monospace'>" + w_inp_obj_nome + "</span> SEM A PRP: <span class='text-yellow text-monospace'>COL_NOME</span>","danger",10);
        }
        /* return false; */
      };

      var w_inp_tp = _ccPrp.consulta(w_inp,"INPUT_TP");
      if(_cc.string.retorna(w_inp_tp,1) == "say"){
        _ccSay.cria(p_inp)
      }

      /* VALIDACAO DO INPUT TP */
      if(w_inp_tp == ""){
        w_inp_tp = 2
        _cc.msg("INP: <span class='text-yellow text-monospace'>" + w_inp_obj_nome + "</span> SEM A PRP: <span class='text-yellow text-monospace'>INPUT_TP</span>","danger",10);
        /* return false; */
      };

      var w_inp_coluna_tp = _ccPrp.consulta(w_inp,"COLUNA_TP");
      var w_inp_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_inp,"OBJ_REFERENCIA"), 1);
      
      if(_cc.string.retorna(p_inp_obj_referencia,1) != ""){
        w_inp_obj_referencia = _cc.string.retorna(p_inp_obj_referencia,1);
      };

      if(w_inp_obj_referencia == ""){
        _cc.msg("INP: <span class='text-yellow text-monospace'>" + w_inp_obj_nome + "</span> SEM A PRP: <span class='text-yellow text-monospace'>OBJ_REFERENCIA</span>","danger",10);
        return false;
      };

      var w_inp_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_inp,"OBJ_REFERENCIA_DATAGRID"), 1);
      if(_cc.string.retorna(p_inp_obj_referencia,1) != ""){
        w_inp_obj_referencia_datagrid = "";
      };
      
      /* PROPRIEDADES > FILTRO */
      var w_inp_obj_referencia_filtro = _cc.string.retorna(_ccPrp.consulta(w_inp,"OBJ_REFERENCIA_FILTRO"), 1);
      var w_inp_col_filtro = _ccPrp.consulta(w_inp,"COL_FILTRO");
      var w_inp_col_filtro_operador = _ccPrp.consulta(w_inp,"COL_FILTRO_OPERADOR");

      /* PROPRIEDADES > LAYOUT */
      var w_inp_extra_class = _ccPrp.consulta(w_inp,"EXTRA_CLASS");
      var w_inp_quebra_linha = _ccPrp.quebraLinha(_ccPrp.consulta(w_inp,"QUEBRA_LINHA"));
      
      var w_inp_colspan = "cc-inp ";
      w_inp_colspan += _ccPrp.colspan(_ccPrp.consulta(w_inp,"COLSPAN"), w_inp);

      /* VALIDACAO DO INPUT TP */
      if(_cc.string.retorna(_ccPrp.consulta(w_inp,"COLSPAN")) == ""){
        w_inp_colspan = "cc-col ";
      };
      
      var w_inp_rowspan = _ccPrp.rowspan(_ccPrp.consulta(w_inp,"ROWSPAN"));
      var w_inp_tooltip = _cc.string.retorna(_ccPrp.consulta(w_inp,"TOOLTIP"));

      /* PROPRIEDADES > AUTOFOCUS */
      var w_inp_autofocus = _ccPrp.consulta(w_inp,"AUTOFOCUS");

      /* PROPRIEDADES > AUTOSELECT */
      var w_inp_autoselect = _ccPrp.consulta(w_inp,"AUTOSELECT");
      
      /* PROPRIEDADES > AUTOSELECT */
      var w_inp_autotab = _ccPrp.consulta(w_inp,"autotab");
      
      /* PROPRIEDADES > MASCARA */
      var w_inp_mascara = _cc.string.retorna(_ccPrp.consulta(w_inp,"MASCARA"),1);
      var w_inp_moeda_precision = "2";
      var w_inp_moeda_suffix = "";
      
      if(w_inp_mascara.indexOf("milhar") >= 0){
        if(w_inp_mascara.indexOf("%") >= 0){
          w_inp_moeda_suffix = " %";
          w_inp_mascara = w_inp_mascara.substr(0, w_inp_mascara.length-1)
        };
        if(w_inp_mascara.indexOf("-") == -1){
          w_inp_moeda_precision = "0";
        }else{
          w_inp_moeda_precision = w_inp_mascara.substr(7,w_inp_moeda_precision.length);
          w_inp_mascara = "milhar";
        };
      };

      /* PROPRIEDADES > HIDDEN / DISABLE */
      var w_inp_hidden = _ccPrp.hidden(_ccPrp.consulta(w_inp,"HIDDEN"));
      var w_inp_readonly = _ccPrp.readonly(_ccPrp.consulta(w_inp,"READONLY"));
      var w_inp_disable = _ccPrp.disable(_ccPrp.consulta(w_inp,"DISABLE"), "INP");
      
      /* PROPRIEDADES > LABEL */
      var w_inp_titulo = _cc.replaceParametros(_cc.string.retorna(_ccPrp.consulta(w_inp,"TITULO")));
      var w_inp_titulo_posicao = _ccPrp.consulta(w_inp,"TITULO_POSICAO");
      var w_inp_titulo_colspan = _ccPrp.consulta(w_inp,"TITULO_COLSPAN");
      
      /* PROPRIEDADES > LABEL > TITULO_NAOQUEBRA  */
      var w_inp_titulo_naoquebra = _ccPrp.consulta(w_inp,"TITULO_NAOQUEBRA");
      if(w_inp_titulo_naoquebra == 1){
        w_inp_titulo_naoquebra = " white-space:nowrap; ";
      };

      /* PROPRIEDADES > TAG */
      var w_inp_tamanho = _ccPrp.consulta(w_inp,"TAMANHO");
      if(w_inp_tamanho != ""){
        w_inp_tamanho = " maxlength='" + w_inp_tamanho + "' ";
      };

      /* PROPRIEDADES > TAG > VALUE */
      var w_inp_value = _cc.replaceParametros(_ccPrp.consulta(w_inp,"VALUE"));
      var w_inp_value_prop = "";
      if(w_inp_value != ""){
        w_inp_value_prop = " data-inp-value='" + w_inp_value + "' ";
        w_inp_value = (w_inp_coluna_tp == 13) ? " src='" + w_inp_value + "' " : " value='" + w_inp_value + "' ";
      };

      /* PROPRIEDADES > TAG > DEFAULT */
      var w_inp_default = _cc.replaceParametros(_ccPrp.consulta(w_inp,"DEFAULT"));
      if(w_inp_default != ""){
        w_inp_default = " data-inp-default='" + w_inp_default + "' "
      };

      /* PROPRIEDADES > TAG > PLACEHOLDER */
      var w_inp_placeholder = _ccPrp.consulta(w_inp,"PLACE_HOLDER");
      if(w_inp_placeholder != ""){
        w_inp_placeholder = " placeholder='" + w_inp_placeholder + "' ";
      };

      /*GOOGLE MAPS STREET VIEW*/
      var w_inp_param = _ccPrp.consulta(w_inp,"PARAMETRO");

      /* PROPRIEDADES CONTROLE > RELACIONAMENTO SEQUENCIA */
      var w_inp_col_relacionamento_sequencia = _cc.string.retorna(_ccPrp.consulta(w_inp,"COL_RELACIONAMENTO_SEQUENCIA"), 1);
      if(w_inp_col_relacionamento_sequencia == 1){
          w_inp_readonly = " readonly='readonly' ";
      };

      /* PROPRIEDADES CONTROLE > JOIN */
      /* FOREIGN KEY */
      var w_inp_fk = _ccPrp.consulta(w_inp, "FOREIGN_KEY");
      var w_inp_fk = w_inp_fk;
      if(w_inp_fk != ""){
        w_inp_readonly = " readonly='readonly' ";
        w_inp_bo_fk = " data-inp-foreign-key-bo='true' ";
      };
      
      /* FOREIGN KEY */
      var w_inp_auto_increment = _ccPrp.consulta(w_inp, "AUTO_INCREMENT");
      if(w_inp_auto_increment == "1"){
        w_inp_readonly = " readonly='readonly' "; 
        w_inp_prop_auto_increment = " data-inp-auto-increment='true' ";
      };
      
      /* PROPRIEDADES CONTROLE > AUTO INCREMENT */
      if(w_inp_auto_increment == "1"){
         w_inp_readonly = " readonly='readonly' "; 
         w_inp_auto_increment = " data-auto-increment='true' ";
      };
      
      var w_inp_primary_key = _ccPrp.consulta(w_inp, "PRIMARY_KEY");
      if(w_inp_primary_key == "1"){
        w_inp_required = " required='required' ";
        w_inp_prop_pk = " data-inp-primary-key='true' ";
      };
      
      var w_inp_key = _ccPrp.consulta(w_inp, "KEY");
      if(w_inp_key == 1){
        w_inp_prop_k = " data-inp-key='true' ";
      };

      /* PROPRIEDADES CONTROLE > NULL */
      var w_inp_bo_requerido = _ccPrp.consulta(w_inp, "BO_REQUERIDO");
      if(w_inp_bo_requerido == 1){
        w_inp_required = " required='required' ";
      }else if(w_inp_bo_requerido == ""){
        w_inp_bo_requerido = _ccPrp.consulta(w_inp, "REQUERIDO");
        if(w_inp_bo_requerido == 1){
          w_inp_required = " required='required' ";
        };
      };

      /* PROPRIEDADES CONTROLE > NULL */
      var w_inp_sequence = _ccPrp.consulta(w_inp, "SEQUENCE");
      if(w_inp_sequence == "1"){
        w_inp_prop_sequence = " data-inp-sequence='true' ";
      };

      /* PROPRIEDADES CONTROLE > UNIQUE */
      var w_inp_unique_key = _ccPrp.consulta(w_inp, "UNIQUE_KEY");
      if(w_inp_unique_key == "1"){
        w_inp_prop_uk = " data-inp-unique-key='true' ";
      };
     
      /* ROTINA CARGA */
      var w_inp_rotina_carga = _cc.string.replace.quebraDeLinha(_cc.string.replace.caracteresEspeciais(_cc.string.retorna(_ccPrp.consulta(w_inp,"ROTINA_CARGA")), 1));

      if(w_inp_rotina_carga == ""){
        w_inp_rotina_carga = _cc.string.replace.quebraDeLinha(_ccPrp.consulta($.trim(w_inp_obj_nome), "ROTINA_CARGA"));
      };

      /* EVENTOS */
      var w_inp_regra_pos = _cc.string.retorna(_ccPrp.consulta(w_inp,"REGRA_POS"));
      if(w_inp_regra_pos != ""){
        _cc.listen("blur", w_inp, w_inp_regra_pos);

      };

      /* BLUR */
      var w_inp_regra_pos_changed = _cc.string.retorna(_ccPrp.consulta(w_inp,"REGRA_POS_CHANGED"));
      if(w_inp_regra_pos_changed != ""){
        _cc.listen("change", w_inp, _cc.string.replace.caracteresEspeciais(w_inp_regra_pos_changed, 1));
      };

      /* CHANGED */
      var w_inp_regra_pos_lostfoucus = _cc.string.retorna(_ccPrp.consulta(w_inp,"REGRA_POS_LOSTFOUCUS"));
      if(w_inp_regra_pos_lostfoucus != ""){_cc.listen("blur", w_inp, _cc.string.replace.caracteresEspeciais(w_inp_regra_pos_lostfoucus, 1));};

      /* VERIFICAR SE TEM REGRA */
      if(_ccPrp.consulta(w_inp,"REGRA_PRE") != "" || _ccPrp.consulta(w_inp,"REGRA_POS") != "" || _ccPrp.consulta(w_inp,"REGRA_POS_CHANGED") != "" || _ccPrp.consulta(w_inp,"REGRA_POS_LOSTFOUCUS") != ""){
        w_inp_bo_regra = 1;
      };

      w_inp_props_tag += "id='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "name='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "data-inp-filtro-name='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "data-title='" + w_inp_tooltip + "' ";
      w_inp_props_tag += "data-thousands='.' ";
      w_inp_props_tag += "data-decimal=',' ";
      w_inp_props_tag += "data-precision='" + w_inp_moeda_precision + "' ";
      w_inp_props_tag += "data-suffix='" + w_inp_moeda_suffix + "' ";
      w_inp_props_tag += "data-title='" + w_inp_tooltip + "' ";
      w_inp_props_tag += "data-bo-regra='" + w_inp_bo_regra + "' ";
      w_inp_props_tag += "data-obj-nome='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "data-inp-autoselect='" + w_inp_autoselect + "' ";
      w_inp_props_tag += "data-inp-readonly='" + _ccPrp.consulta(w_inp_obj_nome,"READONLY") + "' ";
      w_inp_props_tag += "data-inp-autotab='" + w_inp_autotab + "' ";
      w_inp_props_tag += "data-inp-autofocus='" + w_inp_autofocus + "' ";
      w_inp_props_tag += "data-inp-obj-nome='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "data-inp-col-nome='" + w_inp_col_nome + "' ";
      w_inp_props_tag += "data-inp-coluna-tp='" + w_inp_coluna_tp + "' ";
      w_inp_props_tag += "data-inp-obj-nome='" + w_inp_obj_nome + "' ";
      w_inp_props_tag += "data-obj-tp='inp' ";
      w_inp_props_tag += "data-mascara='" + w_inp_mascara + "' ";
      w_inp_props_tag += "data-colspan='" + _cc.string.retorna(_ccPrp.consulta(w_inp,"COLSPAN")) + "' ";
      w_inp_props_tag += "data-obj-seq='" + _ccPrp.objSeq(w_inp_obj_nome) + "' ";
      w_inp_props_tag += "data-obj-referencia='" + w_inp_obj_referencia + "' ";
      w_inp_props_tag += "data-inp-obj-referencia-datagrid='" + w_inp_obj_referencia_datagrid + "' ";
      w_inp_props_tag += "data-inp-grid='" + w_inp_obj_referencia_datagrid + "' ";
      w_inp_props_tag += "data-inp-col-filtro = '" + w_inp_col_filtro + "' ";
      w_inp_props_tag += "data-inp-col-filtro-operador = '" + w_inp_col_filtro_operador + "' ";
      w_inp_props_tag += "data-inp-foreign-key='" + w_inp_fk + "' ";  
      w_inp_props_tag += w_inp_default + " ";
      w_inp_props_tag += w_inp_value + " ";
      w_inp_props_tag += w_inp_disable + " ";
      w_inp_props_tag += w_inp_prop_uk + " ";
      w_inp_props_tag += w_inp_prop_auto_increment + " ";
      w_inp_props_tag += w_inp_prop_pk + " ";
      w_inp_props_tag += w_inp_prop_k + " ";
      w_inp_props_tag += w_inp_prop_sequence + " ";
      w_inp_props_tag += w_inp_auto_increment + " ";
      w_inp_props_tag += w_inp_col_relacionamento_sequencia + " ";
      w_inp_props_tag += w_inp_value_prop + " ";
      if(w_inp_filtro_bo == 0){
        w_inp_props_tag += w_inp_readonly + " ";
      };
      w_inp_props_tag += w_inp_required + " ";
      w_inp_props_tag += w_inp_bo_fk + " ";
      w_inp_props_tag += w_inp_tamanho  + " ";
      w_inp_props_tag += w_inp_placeholder  + " ";
      
      if(w_inp_tp != 10 && w_inp_tp != 11 && w_inp_tp != 18){
        w_inp_class_form_control = " form-control ";
      };

      w_inp_css_class_tag += w_inp_class_form_control + " ";
      w_inp_css_class_tag += w_inp_extra_class + " ";

      w_inp_props += " data-inp-name='" + w_inp_obj_nome + "' "; 
      w_inp_props += " data-obj-nome='" + w_inp_obj_nome + "' "; 
      w_inp_props += " data-inp='true' "; 
      w_inp_props += " data-inp-titulo-posicao='" + w_inp_titulo_posicao + "' "; 

      w_inp_css_class = w_inp_colspan + " ";
      /* NAO ESCONDE SE FOR FILTRO */
      if(w_inp_filtro_bo == 0){
        w_inp_css_class += w_inp_hidden + " ";
      };
      w_inp_css_class += w_inp_extra_class + " ";
      if(w_inp_bo_regra == 1){
        w_inp_css_class += " cc-inp-regra "
      };

      /* COL */
      if(_ccPrp.consulta(w_inp,"HIDDEN") != "1"){
        w_inp_htm += w_inp_quebra_linha;
      }
      w_inp_htm += "<div class='" + w_inp_css_class + "'>";
      
      if(w_inp_titulo_posicao == 2 || w_inp_titulo_posicao == 3){
        w_inp_htm += "<div class='form-inline'>";
      };

      if(w_inp_tp != 10 && w_inp_tp != 11){
        w_inp_htm += "<div class='form-group'>";
      }else{
        w_inp_htm += "<div class='form-group mt-5 mb-4 pb-3'>";
      };

      /* TEXT */
      if(w_inp_tp == 1 || w_inp_tp == 22){
        w_inp_tp_text += " type='text' ";
        w_inp_tp_text += " data-inp-tp='text' ";
        w_inp_tp_text += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_text + " class='" + w_inp_css_class_tag + "' />";
      };

      /* NUMBER */
      if(w_inp_tp == 2){
        w_inp_tp_number += " type='text' ";
        w_inp_tp_number += " data-inp-tp='number' ";
        w_inp_tp_number += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_number + "  class='" + w_inp_css_class_tag + "' />";
      };

      /* DATE */
      if(w_inp_tp == 3){
        w_inp_tp_date += " type='text' ";
        w_inp_tp_date += " data-inp-tp='date' ";
        w_inp_tp_date += " data-mascara='data' ";
        w_inp_tp_date += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_date + "  class='" + w_inp_css_class_tag + "' placeholder='     /       /' />";
      };

      /* DATETIME */
      if(w_inp_tp == 4){
        w_inp_tp_datetime += " type='text' ";
        w_inp_tp_datetime += " data-inp-tp='datetime' ";
        w_inp_tp_datetime += " data-mascara='datehora' ";
        w_inp_tp_datetime += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_datetime + "  class='" + w_inp_css_class_tag + "' placeholder='     /      /' />";
      };

      /* MULTILINE TEXTAREA */
      if(w_inp_tp == 5){
        w_inp_tp_multiline += " data-inp-tp='multiline' ";
        w_inp_tp_multiline += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag += "<textarea " + w_inp_tp_multiline + " rowspan='" + _ccPrp.consulta(w_inp,"ROWSPAN") + "'  class='" + w_inp_css_class_tag + "'>";
        w_inp_tag += w_inp_value;
        w_inp_tag += "</textarea>";
      };

      /* RICHTEXT */
      if(w_inp_tp == 6){
        w_inp_tp_richtext += " data-inp-tp='richtext' ";
        w_inp_tp_richtext += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag += "<textarea " + w_inp_tp_richtext + "  class='" + w_inp_css_class_tag + "' >";
        w_inp_tag += w_inp_value;
        w_inp_tag += "</textarea>";
      };

      /* COMBO */
      if(w_inp_tp == 7 || w_inp_tp == 21){
        w_inp_tp_combo = " data-inp-tp='combo' ";
        w_inp_tp_combo += " data-inp-name='" + w_inp_obj_nome + "' ";
        if(w_inp_tp == 21){
          w_inp_props = "multiple='multiple' "
        };
        w_inp_tp_combo += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<select  " + w_inp_tp_combo + " class='" + w_inp_css_class_tag + "'>"
        if(w_inp_rotina_carga.indexOf("(") >= 0){
          w_inp_tag += eval(w_inp_rotina_carga);
        }else{
          if(w_inp_rotina_carga != ""){
            if(w_inp_rotina_carga.substr(0,6).toLowerCase().indexOf("tabela") == 0){
              w_inp_tag += _ccDom.load.lista.ajax(w_inp_obj_nome, w_inp_rotina_carga,7);
            }else{
              w_inp_tag += _ccDom.load.lista.matriz(w_inp_obj_nome, w_inp_rotina_carga,7);
            };
          };
        };
        w_inp_tag += "</select>";
      };


      /* COMBOCOD */
      if(w_inp_tp == 8){
        w_inp_tp_combocod = " data-inp-tp='combocod' ";
        w_inp_tp_combocod += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<select " + w_inp_tp_combocod + " class='" + w_inp_css_class_tag + "'>"
        if(_cc.string.retorna(w_inp_rotina_carga) != ""){
          if(w_inp_rotina_carga.substr(0,6).toLowerCase().indexOf("tabela") == 0){
              w_inp_tag += _ccDom.load.lista.ajax(w_inp_obj_nome, w_inp_rotina_carga,8);
            }else{
              w_inp_tag += _ccDom.load.lista.matriz(w_inp_obj_nome, w_inp_rotina_carga,8);
            };
        };
        w_inp_tag += "</select>";
      };

      /* COMBODB */
      if(w_inp_tp == 9){
        w_inp_tp_combodb = " data-inp-tp='combodb' ";
        w_inp_tp_combodb += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag += "<div class='input-group'>";
        w_inp_tag += "<input type='text' " + w_inp_tp_combodb + " class='" + w_inp_css_class_tag + "'>";
        w_inp_tag += "<span class='input-group-btn'>";
        w_inp_tag += "<button id='" + w_inp + "-combodb' name='" + w_inp + "-combodb' class='btn cc-btn-cinza' data-title='Abrir' type='button'>";
        w_inp_tag += "<i class='fas fa-caret-down' aria-hidden='true'>";
        w_inp_tag += "</i>";
        w_inp_tag += "</button>";
        w_inp_tag += "</span>";
        w_inp_tag += "</div>";

        /* CLICK NO BOTAO */
        _cc.listen("click", w_inp + "-combodb", w_inp_rotina_carga);
      };

      /* RADIO */
      if(w_inp_tp == 10){
        w_inp_tp_radio = " data-inp-tp='radio' ";
        w_inp_tp_radio += "type='radio' ";
        w_inp_tp_radio += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_radio + "  class='" + w_inp_css_class_tag + "'>";
      };

      /* CHECKBOX */
      if(w_inp_tp == 11){
        w_inp_tp_checkbox = " data-inp-tp='checkbox' ";
        w_inp_tp_checkbox += " type='checkbox' ";
        w_inp_tp_checkbox += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_checkbox + " class='" + w_inp_css_class_tag + "'>";
      };

      /* FILE */
      if(w_inp_tp == 12){
        w_inp_tp_file = " data-inp-tp='file' ";
        w_inp_tp_file += " type='file' ";
        w_inp_tp_file += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input " + w_inp_tp_file + " class='" + w_inp_css_class_tag + "'>";
      };

      /* IMAGE */
      if(w_inp_tp == 13){
        w_inp_tag = "<img \
          data-col-img-nome='" + w_inp_col_nome + "-img' \
          data-inp-tp='image' \
          name='" + w_inp_obj_nome + "-img' \
          class='cc-inp-img border rounded mw-100 mb-3' \
          data-name='" + w_inp_obj_nome + "' \
          src=''>";
        
        w_inp_tag += "<input \
        data-inp-tp='image' \
        type='text' class='d-none' \
        " + w_inp_props + " " + w_inp_props_tag + ">"
        
        w_inp_tag += "<label data-name='" + w_inp_obj_nome + "' class='w-100 cc-btn-img btn btn-block cc-btn-preto' for='" + _cc.replacePontosPorTracos(w_inp_obj_nome) + "-file'>";
        // w_inp_tag += "<button type='button' class='btn btn-block btn-primary btn-sm'>"
        w_inp_tag += "<i class='fas fa-upload'></i> "
        w_inp_tag += "Selecionar Arquivo"
        // w_inp_tag += "</button>"
        w_inp_tag += "<span class='d-none'>";
        w_inp_tag += "<input \
        type='file' \
        onchange='fImageBase64(\"" + w_inp_obj_nome + "\")' \
        id='" + _cc.replacePontosPorTracos(w_inp_obj_nome) + "-file' \
        name='" + w_inp_obj_nome + "-file' \
        data-name='" + w_inp_obj_nome + "'>";
        w_inp_tag += "</span>";
        w_inp_tag += "</label>";
      };

      /* PASSWORD */
      if(w_inp_tp == 14){
        w_inp_tp_password = " data-inp-tp='password' ";
        w_inp_tp_password += " type='password' ";
        w_inp_tp_password += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<input  " + w_inp_tp_password  + "' class='" + w_inp_css_class_tag + "'>";
      };

      /* BUTTON */
      if(w_inp_tp == 15){
        w_inp_tp_button = " data-inp-tp='button' ";
        w_inp_tp_button += " type='button' ";
        w_inp_tp_button += w_inp_props;
        w_inp_tag = "<button " + w_inp_tp_button + "' class='" + w_inp_css_class_tag + "'>"; 
        w_inp_tag += w_inp_titulo 
        w_inp_tag += "</button>";
      };

      /* HIDDEN */
      if(w_inp_tp == 16){
        w_inp_tp_hidden = " type='hidden' ";
        w_inp_tp_hidden += " data-inp-tp='hidden' ";
        w_inp_tp_hidden += w_inp_props + "' ";       
        w_inp_tag = "<input " + w_inp_tp_hidden + " class='" + w_inp_css_class_tag + "'>";};

      /* HTML */
      /* BUTTON */
      if(w_inp_tp == 17){
        w_inp_tp_html = " data-inp-tp='html' ";
        w_inp_tag = "<div " + w_inp_tp_html + "' class='" + w_inp_css_class_tag + "'>"; 
        w_inp_tag += _cc.string.replace.caracteresEspeciais(w_inp_value, 1); 
        w_inp_tag += "<div>";
      };

      /* HTML */
      if(w_inp_tp == 18){
        w_inp_tp_separador = " data-inp-tp='separador' ";
        w_inp_tp_separador += "id='" + w_inp_obj_nome + "' ";
        w_inp_tp_separador += "name='" + w_inp_obj_nome + "' ";
        w_inp_tp_separador += "data-inp-obj-nome='" + w_inp_obj_nome + "' ";
        w_inp_tp_separador += "data-inp-name='" + w_inp_obj_nome + "' ";
        w_inp_tp_separador += "data-inp-col-nome='" + w_inp_col_nome + "' ";
        w_inp_tp_separador += "data-colspan='" + _ccPrp.consulta(w_inp_obj_nome,"COLSPAN") + "' ";
        w_inp_tp_separador += "data-inp-coluna-tp='" + w_inp_coluna_tp + "' ";
        w_inp_tp_separador += "data-inp-obj-nome='" + w_inp_obj_nome + "' ";
        w_inp_tp_separador += "data-inp-obj-referencia-datagrid='" + w_inp_obj_referencia_datagrid + "' ";
        w_inp_tp_separador += "data-inp-grid='" + w_inp_obj_referencia_datagrid + "' ";
        w_inp_tp_separador += "data-inp-col-filtro = '" + w_inp_col_filtro + "' ";
        w_inp_tp_separador += "data-inp-col-filtro-operador = '" + w_inp_col_filtro_operador + "' ";
        w_inp_tp_separador += "data-inp-foreign-key='" + w_inp_fk + "' ";  
        w_inp_tp_separador += w_inp_prop_uk + " ";
        w_inp_tp_separador += w_inp_auto_increment + " ";
        w_inp_tp_separador += w_inp_col_relacionamento_sequencia + " ";
        w_inp_tp_separador += w_inp_bo_fk + " ";

        w_inp_tag = "<div type='html' " + w_inp_tp_separador + " class='" + w_inp_css_class_tag + "'>";
        if(w_inp_titulo == ""){
          w_inp_tag += "<hr style='margin-top:5px'>";
        }else{
          w_inp_tag += "<h4 data-name='" + w_inp_obj_nome + "' class='cc-inp-separador cc-font-weight-normal cc-bg-cinza cc-text-preto mt-5 mt-2 p-3 border-bottom'>";
          w_inp_tag += w_inp_titulo;
          w_inp_tag += "</h4>";
        }
        w_inp_tag += "</div>";
      };

      /* GOOGLE MAPS */ 
      if(w_inp_tp == 19){
        _ccApi.google.maps(w_inp_obj_nome, w_inp_param);
        var w_inp_param_aux = w_inp_param.replace(/\[/g,"");
        w_inp_param_aux = w_inp_param_aux.replace(/\]/g,"");
        w_inp_tp_googlemaps = " data-inp-tp='google-maps' ";
        w_inp_tp_googlemaps += " data-inp-trigger-google-maps-='"+ w_inp_param_aux +"' ";
        w_inp_tp_googlemaps += " data-name='" + w_inp_obj_nome + "' ";
        w_inp_tp_googlemaps += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<iframe  style='" + w_inp_rowspan + "' " + w_inp_tp_googlemaps + " class='cc-inp-frame-google " + w_inp_css_class_tag + "'>";
        w_inp_tag += "</iframe>";
      };

      /* GOOGLE STREET VIEW */
      if(w_inp_tp == 20){
        _ccApi.google.streetView(w_inp_obj_nome, w_inp_param);
        var w_inp_param_aux = w_inp_param.replace(/\[/g,"");
        w_inp_param_aux = w_inp_param_aux.replace(/\]/g,"");
        
        w_inp_tp_googlemaps_street_view = " data-inp-tp='google-maps-street-view' ";
        w_inp_tp_googlemaps_street_view += " data-inp-trigger-google-maps-street-view-='"+ w_inp_param_aux +"' ";
        w_inp_tp_googlemaps_street_view += " data-name-='"+ w_inp_obj_nome +"' ";
        w_inp_tp_googlemaps_street_view += w_inp_props + " " + w_inp_props_tag + " ";
        w_inp_tag = "<iframe style='" + w_inp_rowspan + "' " + w_inp_tp_googlemaps_street_view + " class='cc-inp-frame-google " + w_inp_css_class_tag + "'>";
        w_inp_tag += "</iframe>";
      };

      w_inp_props_label = "style='" + w_inp_titulo_naoquebra + "' "
      w_inp_props_label += "class='cc-inp-label " + w_inp_css_class_label + "' "
      w_inp_props_label += "data-name='" + w_inp_obj_nome + "' "
      w_inp_props_label += "for='" + w_inp_obj_nome + "' "
      

      if(w_inp_required != ""){
        if(w_inp_filtro_bo == 0){
          w_inp_required_label = "<sup class='text-danger'>*</sup>";
        }
      };

      if(w_inp_tp != 10 && w_inp_tp != 11 && w_inp_tp != 18){
        if(w_inp_titulo != ""){
          w_inp_label = "<label " + w_inp_props_label +">";
          w_inp_label += w_inp_titulo;
          w_inp_label += w_inp_required_label;
          w_inp_label += "</label>";
        };

        if(w_inp_titulo_posicao == 1 || w_inp_titulo_posicao == ""){
          w_inp_htm += w_inp_label;
          w_inp_htm += w_inp_tag;
        };

        if(w_inp_titulo_posicao == 2){
          w_inp_htm += w_inp_tag;
          w_inp_htm += w_inp_label;
        };

        if(w_inp_titulo_posicao == 3){
          w_inp_htm += w_inp_label
          w_inp_htm += w_inp_tag
        };

        if(w_inp_titulo_posicao == 4){
          w_inp_htm += w_inp_tag 
          w_inp_htm += w_inp_label;
        };
      }else{
        if(w_inp_tp == 10 || w_inp_tp == 11){
          w_inp_label = "<label " + w_inp_props_label +">";
          
          if(w_inp_titulo_posicao == 1 || w_inp_titulo_posicao == ""){
            w_inp_htm += w_inp_tag + " ";;
            w_inp_htm += "<span class='cc-inp-label'>" + w_inp_titulo + "</span>";
          };

          if(w_inp_titulo_posicao == 2){
            w_inp_htm += w_inp_tag;
            w_inp_htm += " " + w_inp_titulo;
          };

          if(w_inp_titulo_posicao == 3){
            w_inp_htm += w_inp_titulo + " ";
            w_inp_htm += w_inp_tag
          };

          if(w_inp_titulo_posicao == 4){
            w_inp_htm += w_inp_tag 
            w_inp_htm += " " + w_inp_titulo;
          };
          
          w_inp_label += "</label>";
        }else{
          /* SEPARADOR */
          w_inp_htm += w_inp_tag 
        }
      };

      w_inp_htm += "</div>";
      w_inp_htm += "</div>";
      if(w_inp_titulo_posicao == 2 || w_inp_titulo_posicao == 3){
        w_inp_htm += "</div>";
      };

      /* APPEND */
      /* APPEND HTML INPUT  */
      $("[name='" + w_inp_obj_referencia + "']").append(w_inp_htm);
      
      if(w_inp_filtro_bo == 1 && w_inp_col_filtro == 1 && w_inp_col_filtro_operador == 9){
        $("[name='" + w_inp_obj_referencia + "']").append(w_inp_htm);  
        $("[name='" + w_inp_obj_referencia + "'] .cc-inp-label[data-name='" + w_inp_obj_nome + "']:first").html(_ccPrp.consulta(w_inp_obj_nome,"TITULO") + " <small class='cc-text-cinza'>(De:)</small>")
        $("[name='" + w_inp_obj_referencia + "'] .cc-inp-label[data-name='" + w_inp_obj_nome + "']:last").html(_ccPrp.consulta(w_inp_obj_nome,"TITULO") + " <small class='cc-text-cinza'>(Até:)</small>:")
      };
      
      /* PLUGIN SELECT2 */
      if(w_inp_tp == 7 || w_inp_tp == 8 || w_inp_tp == 21){
        if(window.location.href.toLowerCase().indexOf("ccaseide") == -1){
          _ccPlugin.select2.cria(w_inp_obj_nome);
        };
      };  

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

      /* APLICAR MASCARAS */
      _ccPlugin.autoselect();
      $("input[data-inp-autotab='1']").addClass("cc-autotab");
      // $("[data-inp-col-nome='cabarras']").addClass("cc-autotab");
      // setTimeout(function(){
      //   $("[data-inp-col-nome='cabarras']").addClass("cc-autotab");
      // },1000);
      // setTimeout(function(){
      //   $("[data-inp-col-nome='cabarras']").addClass("cc-autotab");
      // },3000);

      // $("input.cc-autotab").autotab();
      _cc.focus($("[data-inp-autofocus='1']").attr("data-inp-obj-nome"))
      _ccPlugin.mask.default();
      _ccPlugin.mask.money();

    }catch(error){
      _cc.error(error);
      var w_msg_error = "Erro ao criar o objeto: <span class='text-yellow text-monospace'> " + p_inp  + "</span>";
      w_msg_error += "<br>";
      w_msg_error += error;
      _cc.msg(w_msg_error, "error", 20)

    }
  };

  /* CARREGA DADOS DOS INPUTS */
  this.load = {
    dados:function(p_grd, p_el){
      /* DEFERRED*/
      var w_deferred = $.Deferred();

      /* MATRIZ */
      var w_inp_m_dados = ccase.matriz.grd_dados["" + p_grd + ""];
      
      /* DADOS DO ARRAY */
      var w_inp_m_dados_index = w_inp_m_dados[w_grd_row_index];
      var w_grid_tr_index = $(p_el).closest("tr").attr("data-grd-data-index");
      var w_grd_tab_nome = _ccPrp.consulta(p_grd, "TAB_NOME");
      
      /* INDEX DO ARRAY */
      var w_grd_row_index = $(p_el).closest("tr").attr("data-grd-index");
      var w_inp_id = $(p_el).attr("data-grd-inp-id");
     
      /* AJAX PARA PEGAR O ID DO ELEMENTO */
      var w_inp_id_url = ccase.url.tabela + "tabela=" + w_grd_tab_nome + "&where=id='" + _cc.string.retorna(w_inp_id) +"'";
      
      /* TRACE LOG */
      window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.inp<br>"
      
      //p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      var w_inp_id_ajax = _cc.ajax(w_inp_id_url,"GET","","","<strong class='cc-bg-preto cc-text-vermelho'>REST INPUT:</strong><br>DADOS CADASTRADOS NA TABELA: <strong class='cc-bg-preto cc-text-vermelho'>" + w_grd_tab_nome + "</strong> COM O ID: <strong class='cc-bg-preto cc-text-vermelho'>" + w_inp_id,window.w_dese_trace_info + "</strong>","-");

      $.when(w_inp_id_ajax).then(
        function(json_resp_obj){
          try{
            var w_grd = _cc.string.retorna(p_grd,1);

            /* PRIMEIRO CARREGA DA MATRIZ DE DADOS */
            var w_grid_cols = ccase.matriz.grd_dados["" + w_grd + ""][w_grid_tr_index];
            var w_dado = "";
            if(w_grid_cols != undefined){
              w_dado = w_grid_cols[w_grid_col];
            }

            for(var w_grid_col in w_grid_cols){
              var $w_input = $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='" + w_grid_col + "']");

              if(w_dado == null){
                  /* SE DADO: FOR VAZIO */
                  $w_input.val("").change();
              }else{
                /* SE DADO: DATE */
                if($w_input.attr("data-inp-tp") == "date"){
                  if(w_dado != ""){
                    $w_input.val(_cc.converteData(w_dado, "DD/MM/YYYY","get")).change();
                  };
                /* SE DADO: DATETIME */
                }else if($w_input.attr("data-inp-tp") == "datetime"){
                  if(w_dado != ""){
                    $w_input.val(_cc.converteData(w_dado, "DD/MM/YYYY HH:mm:ss","get")).change();
                  };
                /* SE DADO: COMBO / COMBOCOD  */
                }else if($w_input.attr("data-inp-tp") == "checkbox"){
                  if(w_dado == 1){
                    $w_input.prop("checked",true);
                  }else{
                    $w_input.prop("checked",false);
                  }
                }else if($w_input.attr("data-inp-tp") == "combo" || $w_input.attr("data-inp-tp") == "combocod"){
                  var w_combo_val = "" + w_dado + "";
                  if(w_combo_val.indexOf("#") >= 0){
                    /* SE DADO: MULTIPLE */
                    $w_input.val(w_combo_val.split("#")).change();
                  }else{
                    if($.trim(w_combo_val) != ""){
                      /* SE DADO: MULTIPLE */
                      $w_input.val(w_combo_val).change();  
                    };
                  };
                /* MASCARA */
                }else if($w_input.attr("data-mascara") == "moeda"){
                  var w_val_mascara_money = w_dado;
                  $w_input.val(w_val_mascara_money);
                }else{
                  /* SE DADO: NORMAL */
                  $w_input.val(_cc.string.replace.caracteresEspeciais(w_dado,1)).change();
                };
              };
            };

            _cc.validaResponseAjax(json_resp_obj, ccase.url.tabela + "tabela=" + w_grd_tab_nome + "&where=id=" + w_inp_id);
            
            /* CARREGA */
            w_inp_m_dados_index = json_resp_obj.data[0];

            /* DEPOIS CARREGA DO AJAX */
            for(var w_inp_dado in w_inp_m_dados_index){
              /* VARIAVEL */
              var $winput_ = $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='" + w_inp_dado + "']");
              var w_dado = w_inp_m_dados_index[w_inp_dado];

              if($winput_.length > 0){
                /* SE DADO: DATE */
                if($winput_.attr("data-inp-tp") == "date"){
                  $winput_.val(_cc.converteData($.trim(w_dado), "DD/MM/YYYY","get")).change();
                /* SE DADO: DATETIME */
                }else if($winput_.attr("data-inp-tp") == "datetime"){
                  $winput_.val(_cc.converteData($.trim(w_dado), "DD/MM/YYYY HH:mm:ss","get")).change();
                /* SE DADO: IMAGE */
                }else if($winput_.attr("data-inp-tp") == "image"){          
                  $("[data-col-img-nome='" + w_inp_dado + "-img']").attr("src",$.trim(w_dado));
                  $winput_.val($.trim(w_dado)).change();
                /* SE DADO: COMBO / COMBOCOD  */
                }else if(
                  $winput_.attr("data-inp-tp") == "combo" || $winput_.attr("data-inp-tp") == "combocod"){
                  var w_combo_val = "" + w_dado + "";
                  if(w_combo_val.indexOf("#") >= 0){
                    /* SE DADO: MULTIPLE */
                    $winput_.val(w_combo_val.split("#")).change();
                  }else{
                    if($.trim(w_combo_val) != ""){
                      /* SE DADO: MULTIPLE */
                      $winput_.val(w_combo_val).change();  
                    }
                  };
                }else if($winput_.attr("data-inp-tp") == "checkbox"){
                  if(w_dado == 1){
                    $winput_.prop("checked",true);
                  }else{
                    $winput_.prop("checked",false);
                  }
                }else if($winput_.attr("data-mascara") == "moeda"){          
                  var w_val_mascara_money = w_dado;
                    $winput_.val(w_val_mascara_money); 
                }else{
                  /* SE DADO: INPUT NORMAL */
                  $winput_.val($.trim(_cc.string.replace.caracteresEspeciais(w_dado,1))).change();
                };
              };
            };

            /* RELOAD INDICADORES */
            $("[data-fme-indicadores='true']").each(function(w_i, w_el){
              eval(_cc.replaceAspas(_ccPrp.consulta($(w_el).attr("name"),"REGRA_POS"),1))
            });

            if($("[data-inp-foreign-key-bo='true']").length != 0){
              var w_inp_name = _cc.string.retorna($("[data-inp-foreign-key-bo='true']").attr("name"),true);
              var w_input = _ccPrp.consulta(w_inp_name, "FOREIGN_KEY").toLowerCase();
              w_input = w_input.split(".");

              var w_grid_relacionamento = $("table[data-grd-tab-nome='" + w_input[0] + "']").attr("data-grd-obj-nome");
              var w_inp_relacionamento = $("[data-inp-obj-referencia-datagrid='" + w_grid_relacionamento + "'][data-inp-col-nome='" + w_input[1] + "']").val();
              if(w_inp_relacionamento != undefined && w_inp_relacionamento != undefined){
                $("[data-inp-foreign-key-bo='true']").val(_cc.string.replace.caracteresEspeciais(w_inp_relacionamento),1).change();
              };
            };
            _ccGrd.load.dadosRelacionados(p_el);

            /* VALIDACAO */
            $("[data-inp-unique-key='true'], [data-inp-primary-key='true'], [data-inp-sequence='true'], [data-inp-auto-increment='true']").attr("readonly","readonly");

            /* MASCARAS */
            _ccPlugin.unmask();
            _ccPlugin.mask.default();
            _ccPlugin.mask.aplica();

            w_deferred.resolve(json_resp_obj);
          }catch(error){
            w_deferred.reject(error);
            _cc.error(error);
          }
        },
        function(error){
          _cc.error(error);
        }
      );

      return w_deferred.promise();
    }
  };

  this.limpa = function(p_grd){
    
    /* VARIAVEIS */
    var w_grd = p_grd.toLowerCase(),
    w_pos_fk = "",
    w_grd_fk = "",
    w_grd_fk_col = "",
    w_grd_principal_tab_nome = "",
    w_grd_principal = "",
    w_grd_principal_inp_val = "";

    $("[name='" + w_grd + "']").find("tr").removeClass("cc-tabela-tr-selecionada");

    $(":input[data-inp-obj-referencia-datagrid='" + w_grd + "']").each(function(){
      if($(this).attr("multiple") == "multiple"){
        $(this).val([]).change();
      }else{
        $(this).val("").change().prop("checked",false);;
      }
    });
    
    $("[data-inp-tp='image'][data-inp-obj-referencia-datagrid='" + w_grd + "']").each(function(){
      var w_inp_obj_nome = $(this).attr("name");
      $("[name='" + w_inp_obj_nome + "-img']").attr("src","");
    });

    w_pos_fk = _ccObj.busca.binaria("wMObjetoForeignKey", _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"), "true"), 0);
        
    /* SE EXISTIR FK, BUSCA OS DADOS */
    if(w_pos_fk >= 0){
      w_grd_fk = wMObjetoForeignKey[w_pos_fk][2]+"."+wMObjetoForeignKey[w_pos_fk][3]
      w_grd_fk_col = wMObjetoForeignKey[w_pos_fk][3];
      w_grd_principal_tab_nome = w_grd_fk.split(".")[0];
      w_grd_principal = $("[data-grd-tab-nome='" + w_grd_principal_tab_nome + "']").attr("data-grd");
      w_grd_principal_inp_val = $("[data-inp-obj-referencia-datagrid='" + w_grd_principal + "'][data-inp-col-nome='" + w_grd_fk_col + "']").val();
      if(w_grd_principal_inp_val == ""){
        w_grd_principal_inp_val = 0;
      };
    };

    /* RE-INSERE A FK */
    $("[data-inp-obj-referencia-datagrid='"+ w_grd +"'][data-inp-col-nome='"+ w_grd_fk_col +"']").val(w_grd_principal_inp_val);
  
    /* VERIFICA OS DEFAUTS E VALUES */
    // $("[data-inp-default]").each(function(){
    //   var w_val = $(this).attr("data-inp-default");
    //   $(this).val(w_val).change();
    // });

    // $("[data-inp-value]").each(function(){
    //   var w_val = $(this).attr("data-inp-value");
    //   $(this).val(w_val).change();
    // });
  };

  this.inicia = function(){
    try{

      $(document).on("keypress","input.cc-autotab",function(){
        /* VARIAVEIS */
        var w_len = parseInt($(this).attr("maxlength"));
        if(parseInt($(this).val().length) >= parseInt(w_len -1)){
          var w_inp_obj = $(this).closest(".cc-inp").next().find("input").attr("data-inp-obj-nome");
          _cc.focus(w_inp_obj)
        };
      });

      $("[data-inp-tp='date']").datepicker({
          language: "pt-BR",
          todayHighlight: true
      });
    }catch(error){
      _cc.error(error);
      var w_msg_error = "Erro ao inciar a biblioteca de inputs";
      w_msg_error += "<br>";
      w_msg_error += error;
      _cc.msg(w_msg_error, "error", 20)
    }

  };
};

var _ccInp = new _ccaseInput();

$(document).ready(function(){
  _ccInp.inicia();
})