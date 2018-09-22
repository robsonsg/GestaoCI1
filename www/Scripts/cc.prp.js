/* PROPRIEDADES */
var _ccasePropriedade = function(){

  this.cria = function(){
  };

  this.insere = function(p_m, p_pos, p_array, p_tipo){
    /* TRANSFORMA STRING EM ARRAY */
    p_m = window["" + p_m + ""];

    /* APENAS INSERE */
    if(p_tipo == 0){
      p_m.splice(p_pos+1, 0, p_array);
    }else 
    /* SUBSTITUI */
    if(p_tipo == 1){
      p_m.splice(p_pos, 1, p_array);
    };
  };

  this.load = function(){
  };

  this.altera = function(p_id, p_prop_id, p_prop_valor){
    try{
      /* VARIAVEIS */
      var w_obj_id_pos = _ccObj.busca.binaria("wMObjetoId", p_id, 0);
      var w_prop_id_pos = _ccObj.busca.sequencial("wMObjetoPropriedades", p_prop_id, 0)
      var w_obj_nome = wMObjetoId[w_obj_id_pos][1];
      var w_prop_nome = wMObjetoPropriedades[w_prop_id_pos][1];
      var w_obj_pos = _ccObj.busca.binaria("wMObjeto", w_obj_nome, 0);

      var w_prop_pos = "";
      var w_prop_pos_final = "";

      for(var w_index = w_obj_pos; w_index < wMObjeto.length;w_index++){
        if(wMObjeto[w_index][0] == w_obj_nome){
          if($.trim(wMObjeto[w_index][4].toUpperCase()) == $.trim(w_prop_nome.toUpperCase())){
            w_prop_pos = w_index;
          };
        }else{
          w_prop_pos_final = w_index;
          break;
        };
      };

      if(w_prop_pos_final != "" && w_prop_pos == ""){
        var w_obj = wMObjeto[w_prop_pos_final-1];
        _ccPrp.insere("wMObjeto", w_prop_pos_final, [w_obj[0],w_obj[1],w_obj[2],w_obj[3],w_prop_nome,p_prop_valor], 1);
      }else{
        /* ALTERA O VALOR */
        wMObjeto[w_prop_pos][5] = p_prop_valor;
      }
    }catch(error){
      _cc.error(error);
    };
  };

  /* PRP > CONSULTA PROPRIEDADE */
  this.consulta = function(p_obj_nome, p_prop){
    
    /* VARIAVEIS */
    var w_obj_pos = "",
    w_obj_tab_pos = "",
    w_obj_nome = "",
    w_obj_tab_nome = "",
    w_obj_col_nome = "",
    w_obj_tp = "",
    w_obj_referencia_datagrid = "",
    w_prop = _cc.string.retorna(p_prop, 1),
    w_prop_valor = "",
    w_prop_default = ["foreign_key","auto_increment","sequence","primary_key","unique_key","bo_requerido","requerido","key","input_tp","tamanho","decimal","rotina_carga"];

    w_obj_pos = _ccObj.busca.binaria("wMObjeto", p_obj_nome, 0);
    

    if(w_obj_pos >= 0){
      w_obj_tp = _cc.string.retorna(wMObjeto[w_obj_pos][1], 1);
      w_obj_nome = _cc.string.retorna(wMObjeto[w_obj_pos][0], 1);

      /* SE FOR INP, VERIFICAR NA MATRIZ PROPRIEDADES DEFAULT */
      if(w_obj_tp == "inp"){

        if(w_prop_default.indexOf(w_prop) >= 0){
          var w_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(p_obj_nome,"OBJ_REFERENCIA_DATAGRID"), 1);
          w_obj_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_obj_referencia_datagrid,"TAB_NOME"), 1);
          w_obj_col_nome = _cc.string.retorna(_ccPrp.consulta(p_obj_nome,"COL_NOME"), 1);
          w_obj_tab_pos = _ccObj.busca.binaria("wMObjetoPropriedadesDefault", w_obj_tab_nome, 0);
          
          while(w_obj_tab_pos < wMObjetoPropriedadesDefault.length - 1 && (w_obj_tab_pos >= 0)){
            if(_cc.string.retorna(wMObjetoPropriedadesDefault[w_obj_tab_pos][0], 1) != w_obj_tab_nome){break;};
            if(_cc.string.retorna(wMObjetoPropriedadesDefault[w_obj_tab_pos][2], 1) == w_prop && _cc.string.retorna(wMObjetoPropriedadesDefault[w_obj_tab_pos][1], 1) == w_obj_col_nome){
              w_prop_valor = wMObjetoPropriedadesDefault[w_obj_tab_pos][3];
              break;
            };
            w_obj_tab_pos++;
          };
        };
      };
    };

    while(w_obj_pos < wMObjeto.length - 1 && (w_obj_pos >= 0)){
      if(_cc.string.retorna(wMObjeto[w_obj_pos][0], 1) != _cc.string.retorna(p_obj_nome, 1)){break;};
      if(_cc.string.retorna(wMObjeto[w_obj_pos][4], 1) == _cc.string.retorna(p_prop, 1)){
        if(wMObjeto[w_obj_pos][5] != ""){
          w_prop_valor = wMObjeto[w_obj_pos][5];
        };
        break;
      };
      w_obj_pos++;
    }; 

    return w_prop_valor;
  };
  
  /* PRP > CONSTRUCAO DAS STRINGS DAS PROPRIEDADES PARA UTILIZAR NOS OBJETOS */

  this.quebraLinha = function(p_quebra_linha){
    var w_quebra_linha = _cc.string.retorna(p_quebra_linha);

    if(p_quebra_linha == 0 || p_quebra_linha == ""){
      w_quebra_linha = "";
    }else if(p_quebra_linha == 1){
      w_quebra_linha = "<div class='float-left d-block w-100'></div>";
    }else if(p_quebra_linha > 1){
      var p_quebra_linha_margin = (parseInt(w_quebra_linha) * parseInt(ccase.default.tamanho.alturaPadrao)) - ccase.default.tamanho.alturaPadrao ;
      w_quebra_linha = "<div style='margin-top:" + w_quebra_linha +"px' class='float-left d-block w-100'></div>"
    };  

    return w_quebra_linha;
  };
  
  this.alinhamento = function(p_alinhamento){
    var w_alinhamento = "";
    
    if(_cc.string.retorna(p_alinhamento) != ""){
      if(p_alinhamento == 1){w_alinhamento = "float-left";};
      if(p_alinhamento == 2){w_alinhamento = "m-auto";};
      if(p_alinhamento == 3){w_alinhamento = "float-right";};
      if(p_alinhamento == 4){w_alinhamento = "";};  
    };

    return w_alinhamento;
  };
  
  this.alinhamentoTexto = function(p_alinhamento_texto){
    var w_alinhamento = "";
    
    if(_cc.string.retorna(p_alinhamento_texto) != ""){
      if(p_alinhamento_texto == 1){w_alinhamento = "text-align:left;";};
      if(p_alinhamento_texto == 2){w_alinhamento = "text-align:center;";};
      if(p_alinhamento_texto == 3){w_alinhamento = "text-align:right;";};
      if(p_alinhamento_texto == 4){w_alinhamento = "text-align:justify;";};
    };

    return w_alinhamento;
  };
  
  this.debug = function(p_debug){
    if(p_debug == 1){
      // $("body").addClass("cc-debug");
    };
  };
  
  this.objSeq = function(p_obj_nome){
    /* variaveis */
    var w_obj_seq_pos = "",
    w_obj_seq = "",
    w_obj_nome = _cc.string.retorna(p_obj_nome, 1);

    /* VERIFICACAO NA MATRIZ DE OBJETOS */
    w_obj_seq_pos = _ccObj.busca.binaria("wMObjeto",w_obj_nome,0);
    w_obj_seq = wMObjeto[w_obj_seq_pos][3];

    return w_obj_seq;
  };

  this.colspan = function(p_colspan, p_obj_nome){

    /* VARIAVEIS */
    var w_obj_tp = "",
    w_pos = "",
    w_obj_referencia_datagrid = "",
    w_tab_nome = "",
    w_colspan_default = "",
    w_colspan = "";

    /* OBJ TP */
    w_obj_tp = _ccPrp.consulta("" + p_obj_nome + "","OBJ_TP");
    if(w_obj_tp != ""){
      w_obj_tp = w_obj_tp.toLowerCase()
    };
    
    /* OBJ REFERENCIA DATAGRID */
    w_obj_referencia_datagrid = _ccPrp.consulta("" + p_obj_nome + "","OBJ_REFERENCIA_DATAGRID");
    if(w_obj_referencia_datagrid != ""){
      w_obj_referencia_datagrid = w_obj_referencia_datagrid.toLowerCase()
    };
    
    /* TAB_NOME */
    w_tab_nome = _ccPrp.consulta("" + w_obj_referencia_datagrid + "","TAB_NOME");
    if(w_tab_nome != ""){
      w_tab_nome = w_tab_nome.toLowerCase()
    };

    /* COLSPAN DEFAULT */
    if(w_tab_nome != ""){
      w_pos = _ccObj.busca.binaria("wMObjetoPropriedadesDefault", w_tab_nome, 0);
      for(w_pos;w_pos < wMObjetoPropriedadesDefault.length-1;w_pos++){
        if(wMObjetoPropriedadesDefault[w_pos] != undefined){
          if(wMObjetoPropriedadesDefault[w_pos][2].toLowerCase() == "colspan"){
            w_colspan_default = wMObjetoPropriedadesDefault[w_pos][3];
            w_pos = wMObjetoPropriedadesDefault.length;
          };
        };
      };
    };

    if( _cc.string.retorna(p_colspan) != ""){
      if(p_colspan.toLowerCase().indexOf("px") >= 0 || p_colspan.toLowerCase().indexOf("%") >= 0){
        w_colspan = "width:" + p_colspan + ";";
      }else if(p_colspan.toLowerCase().indexOf("c") >= 0){
        w_colspan = " col-md-" +  _cc.string.retorna(p_colspan) + " "; 
      }else{
        w_colspan = " cc-col cc-col-" +  parseInt(_cc.string.retorna(p_colspan)) + " ";
      };
    }else{
      if(w_colspan_default != ""){
          w_colspan = "cc-col cc-col-" +  parseInt(w_colspan_default) + " ";
      }else{
        w_colspan = "cc-col w-100";  
      };
    };
    
    return w_colspan;
  }; 
  this.grd_colspan = function(p_colspan, p_obj_nome){

    /* VARIAVEIS */
    var w_obj_tp = "",
    w_pos = "",
    w_obj_referencia_datagrid = "",
    w_tab_nome = "",
    w_colspan_default = "",
    w_colspan = "";

    /* OBJ TP */
    w_obj_tp = _ccPrp.consulta("" + p_obj_nome + "","OBJ_TP");
    if(w_obj_tp != ""){
      w_obj_tp = w_obj_tp.toLowerCase()
    };

    if( _cc.string.retorna(p_colspan) != ""){
      if(p_colspan.toLowerCase().indexOf("px") >= 0 || p_colspan.toLowerCase().indexOf("%") >= 0){
        w_colspan = "width:" + p_colspan + ";";
      }else if(p_colspan.toLowerCase().indexOf("c") >= 0){
        w_colspan = " col-md-" +  _cc.string.retorna(p_colspan) + " "; 
      }else{
        w_colspan = " cc-grd-col-" +  parseInt(_cc.string.retorna(p_colspan)) + " ";
      };
    }else{
      if(w_colspan_default != ""){
          w_colspan = " cc-grd-col-" +  parseInt(w_colspan_default) + " ";
      }else{
        w_colspan = "";  
      };
    };
    
    return w_colspan;
  };
  
  this.rowspan = function(p_rowspan){
    var w_rowspan = "";

    if(_cc.string.retorna(p_rowspan) != "" && parseInt(_cc.string.retorna(p_rowspan)) >= 1){
      w_rowspan = "height:" + parseInt(ccase.default.tamanho.alturaPadrao * p_rowspan) + "px;overflow-y:auto";
    };

    if(_cc.string.retorna(p_rowspan, true).indexOf("px") >= 0 || _cc.string.retorna(p_rowspan, true).indexOf("%") >= 0){
      w_rowspan = "height:" + _cc.string.retorna(p_rowspan) + ";overflow-y:auto;";
    };
  
    return w_rowspan;
  };
  
  /* CRIA TITULO */
  this.titulo = function(p_str, p_tamanho, p_extra_class){
    // var w_titulo = "<div class='cc-titulo col-md-36'><h4>" + p_str + "</h4></div>";
    var w_titulo = "<div class='cc-titulo pt-1 pb-1 border-bottom mt-1 mb-3 '><h4 class='p-2 m-0'>" + _cc.replaceAspas(p_str,1) + "</h4></div>";
    return w_titulo
  };

  this.textCor = function(p_text_cor){
    var w_text_cor = "";

    if(_cc.string.retorna(p_text_cor) != ""){
      if(_cc.string.retorna(p_text_cor).toLowerCase().indexOf("#") >= 0){
        w_text_cor = "color:#" + _cc.string.retorna(p_text_cor) + ";";
      }else{
        w_text_cor = "color:" + _cc.string.retorna(p_text_cor) + ";";
      };
    };
    
    return w_text_cor;
  };
  
  this.corFundo = function(p_cor_fundo){
    var w_cor_fundo = "";

    if(_cc.string.retorna(p_cor_fundo) != ""){
      if(_cc.string.retorna(p_cor_fundo).toLowerCase().indexOf("#") >= 0){
        w_cor_fundo = "background-color:#" + _cc.string.retorna(p_cor_fundo) + ";";
      }else{
        w_cor_fundo = "background-color:" + _cc.string.retorna(p_cor_fundo) + ";";
      };
    };
    
    return w_cor_fundo;
  };
  
  this.textSize = function(p_text_size){
    var w_text_size = "";

    if(_cc.string.retorna(p_text_size) != ""){
      w_text_size = "font-size:" + _cc.string.retorna(p_text_size) + ";";
    };
    
    return w_text_size;
  };
  
  this.autofocus = function(p_autofocus){
    var w_autofocus = "";

    if(p_autofocus == 1){
      w_autofocus = " data-autofocus='autofocus' ";
    };  

    return w_autofocus;
  };

  this.hidden = function(p_hidden){
    var w_hidden = "";

    if(p_hidden == 1){
      w_hidden = " d-none ";
    };  

    return w_hidden;
  };
  
  this.modal = function(p_modal){
    var w_modal = "";

    if(p_modal == 1){
      w_modal = " d-none ";
    };  

    return w_modal;
  };
  
  this.disable = function(p_disabled, p_tipo){
    var w_disabled = "";

    if(_cc.string.retorna(p_tipo, true) == "inp" || _cc.string.retorna(p_tipo, true) == "btn"){
      if(_cc.string.retorna(p_disabled) == 1){
        w_disabled = " disabled='disabled' ";
      };
    }else{
      if(_cc.string.retorna(p_disabled) == 1){
        w_disabled = " d-none ";
      };
    };
  
    return w_disabled;
  };
  
  this.inativo = function(p_inativo){
    var w_inativo = "";

    if(_cc.string.retorna(p_inativo) == 1){
      w_inativo = " d-none ";
    };  

    return w_inativo;
  };

  this.readonly = function(p_readonly){
    var w_readonly = "";

    if(_cc.string.retorna(p_readonly) == 1){
      w_readonly = " readonly='readonly' ";
    };  

    return w_readonly;
  };
};

var _ccPrp = new _ccasePropriedade();