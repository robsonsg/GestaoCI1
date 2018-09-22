var _ccaseSay = function(){
  this.cria = function(p_obj_nome){
    /* VARIAVEIS */
    var w_say = _cc.string.retorna(p_obj_nome,1),
    w_say_obj_nome = _cc.string.retorna(p_obj_nome,1);

    /* VARIAVEIS PRINCIPAIS */
    var w_say_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_say,"OBJ_REFERENCIA"), 1);
    
    /* PROPRIEDADES > LAYOUT */
    var w_say_colspan = _ccPrp.colspan(_ccPrp.consulta(w_say,"COLSPAN"), w_say_obj_nome);
    var w_say_rowspan = _ccPrp.rowspan(_ccPrp.consulta(w_say,"ROWSPAN"), 1);
    var w_say_quebra_linha = _ccPrp.quebraLinha(_ccPrp.consulta(w_say,"QUEBRA_LINHA"));
    var w_say_extra_class = _cc.string.retorna(_ccPrp.consulta(w_say,"EXTRA_CLASS"), 1);
    var w_say_alinhamento_h = _ccPrp.alinhamento(_ccPrp.consulta(w_say,"ALINHAMENTO_H"));
    var w_say_hidden = _ccPrp.hidden(_ccPrp.consulta(w_say,"HIDDEN"));
    var w_say_icone = _cc.string.retorna(_ccPrp.consulta(w_say,"ICONE"), 1);
    var w_say_imagem = _cc.string.retorna(_ccPrp.consulta(w_say,"IMAGEM"), 1);
    var w_say_value = _cc.string.retorna(_cc.replaceParametros(_ccPrp.consulta(w_say,"VALUE")));

    /* CLASSES */
    var w_say_css_class = "cc-say ";
    w_say_css_class += w_say_colspan + " ";
    w_say_css_class += w_say_extra_class + " ";
    w_say_css_class += w_say_hidden + " ";

    /* PROPRIEDADES SAY */
    var w_say_props = "id='" + w_say_obj_nome + "' ";
    w_say_props += "name='" + w_say_obj_nome + "' ";
    w_say_props += "class='" + w_say_css_class + "' ";
    w_say_props += "data-name='" + _ccPrp.objSeq(w_say_obj_nome) + "' ";
    w_say_props += "data-obj-seq='" + _ccPrp.objSeq(w_say_obj_nome) + "' ";
    w_say_props += "data-obj-tp='say' ";
    w_say_props += "data-obj-referencia='" + w_say_obj_referencia + "' ";


    /* HTML SAY */
    var w_say_html = "<div " + w_say_props + " >"
    if(w_say_value != ""){
      w_say_html += "<span>" + w_say_value + "</span>";
    };
    w_say_html += "</div>"

    /* APPEND SAY */
    $("[name='" + w_say_obj_referencia + "']").append(w_say_html)
  }
};

var _ccSay = new _ccaseSay();