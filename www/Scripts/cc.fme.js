var _ccaseFrame = function(){
  this.cria = function(p_fme){ 
    /* OBJETO */
    var w_fme = _cc.string.retorna(p_fme, 1);

    /* VARIAVEIS */
    var w_fme_htm = "",
    w_fme_obj_referencia_frm = "",
    w_fme_props = "",
    w_fme_style = "",
    w_fme_css_class = "";

    /* VARIAVEIS COLLAPSE */
    var w_fme_clps_titulo = "",
    w_fme_clps_titulo_caret = "",
    w_fme_clps_titulo_class_vsblty = "",
    w_fme_clps_titulo_props = "",
    w_fme_clps_titulo_bg = "",
    w_fme_clps_extra_class = "";

    /* PROPRIEDADES > PRINCIPAIS */
    var w_fme_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_fme,"OBJ_NOME"), 1);
    var w_fme_obj_nome_alias = _cc.string.retorna(_ccPrp.consulta(w_fme,"OBJ_NOME_ALIAS"), 1);
    var w_fme_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_fme,"OBJ_REFERENCIA"), 1);
    var w_fme_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_fme,"OBJ_REFERENCIA_DATAGRID"), 1);

    /* PROPRIEDADES > LAYOUT */
    var w_fme_quebra_linha = _ccPrp.quebraLinha(_ccPrp.consulta(w_fme,"QUEBRA_LINHA"));
    var w_fme_extra_class = _cc.string.retorna(_ccPrp.consulta(w_fme,"EXTRA_CLASS"));
    var w_fme_colspan = _ccPrp.colspan(_ccPrp.consulta(w_fme,"COLSPAN"), w_fme_obj_nome);
    var w_fme_rowspan = _ccPrp.rowspan(_ccPrp.consulta(w_fme,"ROWSPAN"));
    var w_fme_titulo = _cc.string.retorna(_ccPrp.consulta(w_fme,"TITULO"));
    var w_fme_text_cor = _ccPrp.textCor(_ccPrp.consulta(w_fme,"TEXT_COR"));
    var w_fme_cor_fundo = _ccPrp.corFundo(_ccPrp.consulta(w_fme,"COR_FUNDO"));
    var w_fme_alinhamento_h = _ccPrp.alinhamento(_ccPrp.consulta(w_fme,"ALINHAMENTO_H"));
    var w_fme_text_alinhamento_h = _ccPrp.alinhamentoTexto(_ccPrp.consulta(w_fme,"TEXT_ALINHAMENTO_H"));
    
    /* PROPRIEDADES REPORT */
    var w_fme_report = _ccPrp.consulta(w_fme,"REPORT");    
    var w_fme_report_body = _ccPrp.consulta(w_fme,"REPORT_BODY");
    var w_fme_report_cabecalho = _ccPrp.consulta(w_fme,"REPORT_CABECALHO");
    var w_fme_report_rodape = _ccPrp.consulta(w_fme,"REPORT_RODAPE");

    /* PROPRIEDADES HIDDEN/DISABLE */
    var w_fme_hidden = _ccPrp.hidden(_ccPrp.consulta(w_fme,"HIDDEN"));
    var w_fme_disable = _ccPrp.disable(_ccPrp.consulta(w_fme,"DISABLE"), _ccPrp.consulta(w_fme,"OBJ_TP"));
    var w_fme_inativo = _ccPrp.inativo(_ccPrp.consulta(w_fme,"INATIVO"));
    
    /* PROPRIEDADES > DEBUG */
    var w_fme_debug = _ccPrp.debug(_ccPrp.consulta(w_fme,"DEBUG"));
    
    /* PROPRIEDADES > ACTION */
    var w_fme_regra_pos = _cc.replaceAspas(_ccPrp.consulta(w_fme,"REGRA_POS"), 1);

    /* PROPRIEDADES > MODAL */
    var w_fme_modal = _ccPrp.modal(_ccPrp.consulta(w_fme,"MODAL"));

    /* PROPRIEDADES > COLLAPSE */
    var w_fme_clps_tp = _cc.string.retorna(_ccPrp.consulta(w_fme,"COLLAPSE_TP"));

    /* INICIA COLLAPSE ABERTO */
    if(w_fme_clps_tp == 1 || w_fme_clps_tp == ""){ 
      w_fme_clps_extra_class = "cc-fme-collapse p-3 mb-0 cc-bg-branco border border-top-0 rounded-bottom ";
      w_fme_clps_titulo_caret = "fa fa-caret-down";
      w_fme_clps_titulo_class_vsblty = "";
      w_fme_clps_titulo_bg = "mt-0 mb-1 cc-btn-azul-escuro";

    /* INICIA COLLAPSE FECHADO */
    }else if(w_fme_clps_tp == 2){
      w_fme_clps_extra_class = "cc-fme-collapse p-3 mb-0 cc-bg-branco border border-top-0 rounded-bottom ";
      w_fme_clps_titulo_caret = "fa fa-caret-right";
      w_fme_clps_titulo_class_vsblty = "d-none";
      w_fme_clps_titulo_bg = "mt-0 mb-1 cc-btn-cinza"
    };
    
    /* STRING COMPLETA DO STYLE */
    w_fme_style = w_fme_cor_fundo; 
    w_fme_style += w_fme_text_cor;
    w_fme_style += w_fme_text_alinhamento_h;
    w_fme_style += w_fme_rowspan;

    /* PROPRIEDADES FME*/
    w_fme_props += "id='" + w_fme_obj_nome + "' ";
    w_fme_props += "name='" + w_fme_obj_nome + "' ";
    w_fme_props += "data-title='" + w_fme_obj_nome + "' ";
    w_fme_props += "data-obj-seq='" + _ccPrp.objSeq(w_fme_obj_nome) + "' ";
    w_fme_props += "data-report='" + w_fme_report + "' ";
    w_fme_props += "data-report-body='" + w_fme_report_body + "' ";
    w_fme_props += "data-report-cabecalho='" + w_fme_report_cabecalho + "' ";
    w_fme_props += "data-report-rodape='" + w_fme_report_rodape + "' ";
    w_fme_props += "data-obj-tp='fme' ";
    w_fme_props += "data-obj-referencia='" + w_fme_obj_referencia + "' ";
    w_fme_props += "data-obj-referencia-datagrid='" + w_fme_obj_referencia_datagrid + "' ";
    
    if(w_fme_regra_pos.indexOf("cIndicadores") >= 0){
      w_fme_props += "data-fme-indicadores='true' ";
    };
    
    w_fme_props += "data-obj-tp='fme' ";

    /* COLLAPSE */
    if(w_fme_clps_tp == 1 || w_fme_clps_tp == 2){
      w_fme_props += "data-obj-collapse='#" + _cc.replacePontosPorTracos(w_fme_obj_nome) + "' ";
    };

    /* CSS CLASS */

    w_fme_css_class = "cc-fme ";
    if(w_fme_regra_pos != ""){
      w_fme_css_class += " cc-fme-regra ";
    };

    if(_ccPrp.consulta(w_fme,"COLSPAN") != undefined){
      if(_ccPrp.consulta(w_fme,"COLSPAN").indexOf("c") >= 0){
        w_fme_css_class += "row ";
      }else{
        w_fme_css_class += "cc-row ";
      };
    };

  
    w_fme_css_class += w_fme_modal + " ";
    w_fme_css_class += w_fme_disable + " ";
    w_fme_css_class += w_fme_inativo + " ";
    w_fme_css_class += w_fme_hidden + " ";
    w_fme_css_class +=  w_fme_alinhamento_h + " ";
    w_fme_css_class += w_fme_extra_class + " ";
    
    if(w_fme_clps_tp == 1 || w_fme_clps_tp == 2){
      w_fme_css_class += w_fme_clps_titulo_class_vsblty + " ";
      w_fme_css_class += w_fme_clps_extra_class + " ";
    };

    /* TITULO */
    if(w_fme_titulo != ""){
      w_fme_titulo = _ccPrp.titulo(_cc.replaceParametros(w_fme_titulo));
      w_fme_clps_titulo_props = "data-collapse='true' ";
      w_fme_clps_titulo_props += "data-fme-collapse-obj-nome='" + w_fme_obj_nome + "' ";
      w_fme_clps_titulo_props += "class='cc-fme-collapse-titulo cc-fme d-block w-100 float-left btn btn-block text-left text-uppercase text-large font-weight-light mb-0 border-bottom " + w_fme_clps_titulo_bg + " " + w_fme_hidden + "' ";
      w_fme_clps_titulo_props += "role='button' ";
      w_fme_clps_titulo_props += "href='#" + _cc.replacePontosPorTracos(w_fme_obj_nome) + "' ";
      w_fme_clps_titulo = "<h2 " + w_fme_clps_titulo_props +">";
      w_fme_clps_titulo += "<i class='" + w_fme_clps_titulo_caret + "'></i> "
      w_fme_clps_titulo += _cc.replaceParametros(_cc.string.retorna(_ccPrp.consulta(w_fme,"TITULO")));
      w_fme_clps_titulo += "</h2>";
    };

    /* FME HTML */
    if(_ccPrp.consulta(w_fme,"HIDDEN") == "1"){
      w_fme_htm += w_fme_quebra_linha;
    };

    if(w_fme_report_cabecalho == "1"){
      w_fme_colspan += " cc-cabecalho-impressao " + " ";
    };

    if(w_fme_report_rodape == "1"){
      w_fme_colspan += " cc-cabecalho-impressao " + " ";
    };

    w_fme_htm += "<div class='" + w_fme_colspan +" " + w_fme_alinhamento_h +"'>"
    w_fme_htm += "<div " + w_fme_props + " class='" + w_fme_css_class + "'style='" + w_fme_style + "'>";
    
    if(w_fme_clps_tp == 1 || w_fme_clps_tp == 2){
      var w_fme_collapse = "";
      w_fme_collapse = "<div class='" + w_fme_colspan + " " + w_fme_alinhamento_h + "'>";
      w_fme_collapse += w_fme_clps_titulo;
      w_fme_collapse += w_fme_htm;
      w_fme_collapse += "</div>";
      w_fme_htm = w_fme_collapse

    }else{
      w_fme_htm += w_fme_titulo;
    };
    w_fme_htm += "</div>";

    /* VERIFICA SE HA FORM PARA FAZER O APPEND */
    if(ccase.matriz.frm["" + ccase.global.form + ""] != undefined ){
      w_fme_obj_referencia_frm = ccase.agrupador.conteudo;
    };

    /* APPEND FME  */
    if(w_fme_obj_referencia == ""){
      $("[name='" + w_fme_obj_referencia_frm + "']").append(w_fme_htm);
    }else{
      if($("[name='" + w_fme_obj_referencia + "']").length == 0){
        $("[name='" + w_fme_obj_referencia_frm + "']").append(w_fme_htm);
      }else{
        $("[name='" + w_fme_obj_referencia + "']").append(w_fme_htm);
      };
    };

    /* EVAL */
    if(w_fme_regra_pos != ""){
      if($("[name='" + w_fme_obj_nome + "']").is(":visible") == false){
        $("[name='" + w_fme_obj_nome + "']").attr("data-regra-pos-show", true);
        
        /* LISTERNER */
        _cc.listen("show", w_fme_obj_nome, w_fme_regra_pos);
      }else{
        eval(_cc.replaceParametros(w_fme_regra_pos));
      };

      if(w_fme_clps_tp == 1 || w_fme_clps_tp == 2){
        eval(_cc.replaceParametros(w_fme_regra_pos));
      };
      
    };
  };


  this.inicia = function(){
    _ccFme.collapse.listen()
  };

  /* COLLAPSE */
  this.collapse = {
    listen:function(p_str){
      $(document).on("mouseup", "[data-collapse='true']", function(){
        
        var w_fme_href_collapse = $(this).attr("href");
          /* MOSTRA */
          
          if($("[data-obj-collapse='" + w_fme_href_collapse + "']").hasClass("d-none") == true){
            $("[data-obj-collapse='" + w_fme_href_collapse + "']").removeClass("d-none");
            $(this).removeClass("cc-btn-cinza").addClass("cc-btn-azul-escuro");
            $(this).find("i").removeClass("fa-caret-right").addClass("fa-caret-down");
          
            var w_fme_obj_nome = $("[data-obj-collapse='" + w_fme_href_collapse + "']").attr("name");
            var w_eval = _ccPrp.consulta(w_fme_obj_nome, "REGRA_POS");
          
            try{
              eval(_cc.replaceParametros(_cc.replaceAspas(w_eval, 1)));
            }catch(error){
              _cc.error(error);
            };

            $("[name='" + w_fme_obj_nome + "'] table[data-grd]").each(function(){
              _ccGrd.load.dados($(this).attr("data-grd"));
            });

          /* ESCONDE */
          }else{
            $("[data-obj-collapse='" + w_fme_href_collapse + "']").addClass("d-none")
            $(this).removeClass("cc-btn-azul-escuro").addClass("cc-btn-cinza")
            $(this).find("i").removeClass("fa-caret-down").addClass("fa-caret-right")
          };
      }); 
    }
  };
};

$(document).ready(function(){
  _ccFme.inicia();
});

var _ccFme = new _ccaseFrame();
