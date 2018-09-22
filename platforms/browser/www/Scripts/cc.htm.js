var _ccaseHtml = function(){  
  this.cria = function(p_html){
    
    /* MATRIZ */
    var w_htm_m = ccase.matriz.htm["" + p_html + ""];

    /* VARIAVEIS */
    var w_htm_htm = "",
    w_htm_style = "",
    w_htm_props = "",
    w_htm_css_class = "";

    /* PROPRIEDADES > PRINCIPAIS */
    var w_htm_obj_nome = _cc.string.retorna(w_htm_m.OBJ_NOME, true);
    var w_htm_obj_referencia = _cc.string.retorna(w_htm_m.OBJ_REFERENCIA, true);
    
    /* PROPRIEDADES > LAYOUT */
    var w_htm_quebra_linha = _ccPrp.quebraLinha(w_htm_m.QUEBRA_LINHA);
    var w_htm_extra_class = _cc.string.retorna(w_htm_m.EXTRA_CLASS);
    var w_htm_alinhamento_h = _ccPrp.alinhamento(w_htm_m.ALINHAMENTO_H);
    var w_htm_text_alinhamento_h = _ccPrp.alinhamentoTexto(w_htm_m.TEXT_ALINHAMENTO_H);    
    var w_htm_colspan = _ccPrp.colspan(w_htm_m.COLSPAN, w_htm_obj_nome);
    var w_htm_rowspan = _ccPrp.rowspan(w_htm_m.ROWSPAN);
    var w_htm_conteudo = _cc.replaceParametros(_cc.string.retorna(w_htm_m.HTML));
    
    /* PROPRIEDADES > HTML */
    var w_htm_hidden = _ccPrp.hidden(w_htm_m.HIDDEN);
    var w_htm_disable = _ccPrp.disable(w_htm_m.DISABLE,w_htm_m.OBJ_TP);
    var w_htm_inativo = _ccPrp.inativo(w_htm_m.INATIVO);
    
    /* PROPRIEDADES > ACTION */
    var w_htm_regra_pos = _cc.string.retorna(w_htm_m.REGRA_POS);
    
    /* STYLE */
    w_htm_style = w_htm_rowspan;

    /* PROPRIEDADES */
    w_htm_props += "id='" + w_htm_obj_nome + "' ";
    w_htm_props += "name='" + w_htm_obj_nome + "' ";
    w_htm_props += "data-obj-tp='html ' ";
    w_htm_props += "data-title='" + w_htm_obj_nome + "' ";
    w_htm_props += "data-obj-nome='" + w_htm_obj_nome + "' ";
    w_htm_props += "data-obj-tipo='html' ";
    w_htm_props += "data-htm-obj-referencia='" + w_htm_obj_referencia + "' ";

    /* CSS CLASS */
    w_htm_css_class += "cc-htm ";
    w_htm_css_class += w_htm_colspan + " ";
    w_htm_css_class += w_htm_extra_class + " ";
    w_htm_css_class += w_htm_disable + " ";
    w_htm_css_class += w_htm_inativo + " ";
    w_htm_css_class += w_htm_hidden + " ";
    w_htm_css_class += w_htm_alinhamento_h + " ";

    /* html = DIV */
    var w_htm_htm = w_htm_quebra_linha;
    w_htm_htm += "<div " + w_htm_props + " class='" + w_htm_css_class + "'  style='" + w_htm_style +  "'>";
    w_htm_htm += _cc.replaceAspas(w_htm_conteudo,1);
    w_htm_htm += "</div>";;

    /* Html = HTML */
    var w_htm_obj_referencia_frm = ccase.agrupador.conteudo;
    if( ccase.matriz.frm["" + ccase.global.form + ""] != undefined){
      var w_htm_obj_referencia_frm = ccase.agrupador.conteudo;
    };

    /* APPEND NO RAIZ SE FOR VAZIO */
    if(w_htm_obj_referencia == ""){
      $("[name='" + w_htm_obj_referencia_frm + "']").append(w_htm_htm);
    }else{
      /* APPEND NO RAIZ SE O html AINDA NAO FOR CRIADO */
      if($("[name=\"" + w_htm_obj_referencia + "\"]").length == 0){
        $("[name='" + w_htm_obj_referencia_frm + "']").append(w_htm_htm);
      }else{
        /* APPEND NO REFERENCIA O html */
        $("[name=\"" + w_htm_obj_referencia + "\"]").append(w_htm_htm);
      };
    };

    /* EVAL REGRA POS */
    if(w_htm_regra_pos != ""){
      if($("[name='" + w_htm_obj_nome + "']").is(":visible") == false){
        $("[name='" + w_htm_obj_nome + "']").attr("data-htm-regra-pos-show", w_htm_regra_pos);
      }else{
        eval(_cc.replaceParametros(w_htm_regra_pos));
      };
    };
  };
};

var _ccHtml = new _ccaseHtml();
