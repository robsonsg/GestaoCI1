var _ccaseForm = function(){
	
	/* CRIA OBJETO */
	this.cria = function(p_frm){
		/* OBJ */
		var w_frm = _cc.string.retorna(p_frm);
		
		/* VARIAVEIS */
		var w_frm_htm = "",
		w_frm_style = "",
		w_frm_css_class = "",
		w_frm_props = "";

		/* PROPRIEDADES > PRINCIPAIS */
		var w_frm_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_frm,"OBJ_NOME"), 1);
		var w_frm_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_frm,"OBJ_REFERENCIA"), 1);
		
		/* PROPRIEDADES > LAYOUT */
		var w_frm_extra_class = _ccPrp.consulta(w_frm,"EXTRA_CLASS");
		var w_frm_titulo = _ccPrp.titulo(_cc.replaceParametros(_ccPrp.consulta(w_frm,"TITULO")));
		var w_frm_text_cor = _ccPrp.textCor(_ccPrp.consulta(w_frm,"TEXT_COR"));
		var w_frm_text_size = _ccPrp.textSize(_ccPrp.consulta(w_frm,"TEXT_SIZE"));

		/* PROPRIEDADES > DEBUG */
		var w_frm_report = _ccPrp.consulta(w_frm,"REPORT");

		/* PROPRIEDADES > DEBUG */
		var w_frm_debug = _ccPrp.debug(_ccPrp.consulta(w_frm,"DEBUG"));
		
		/* PROPRIEDADES > ACTION */
		var w_frm_regra_pos = _cc.string.retorna(_ccPrp.consulta(w_frm,"REGRA_POS"));

		/* FRM STYLE */
		w_frm_style += w_frm_text_size + " ";
		w_frm_style += w_frm_text_cor +  " ";

		/* FRM PROPRIEDADES */
		w_frm_props +=  "id='" + w_frm_obj_nome + "' ";
		w_frm_props +=  "name='" + w_frm_obj_nome + "' ";
		w_frm_props +=  "data-obj-referencia='" + w_frm_obj_referencia + "' ";
		w_frm_props +=  "data-report-page='" + w_frm_report + "' ";
		w_frm_props +=  "data-report='" + w_frm_report + "' ";
		w_frm_props +=  "data-obj-seq='" + _ccPrp.objSeq(w_frm_obj_nome) + "' ";
		w_frm_props +=  "data-obj-tp='frm' ";

		/* FRM CSS CLASS */
		w_frm_css_class += "cc-frm ";
		w_frm_css_class += "row ";
		w_frm_css_class += w_frm_extra_class + " ";
		w_frm_css_class += w_frm_debug + " ";

		/* FRM HTML */
		w_frm_htm = "<div class=''>"
		w_frm_htm += "<div " + w_frm_props + " class='" + w_frm_css_class + "' style='" + w_frm_style + "'>"
		w_frm_htm += "</div>";
		w_frm_htm += "</div>";

		/* APPEND DO FORM NO HTML */
		if(w_frm_obj_referencia == ""){
			$("[name='" + ccase.agrupador.conteudo + "']").append(w_frm_htm);
		}else{
			if($("[name='" + w_frm_obj_referencia + "']").length == 0){
				$("[name='" + ccase.agrupador.conteudo + "']").append(w_frm_htm);
			}else{
				$("[name='" + w_frm_obj_referencia + "']").append(w_frm_htm);
			}
		};

		if(w_frm_regra_pos != ""){
      if($("[name='" + w_frm_obj_nome + "']").is(":visible") == false){
        $("[name='" + w_frm_obj_nome + "']").attr("data-regra-pos-show", true);
      	_cc.listen("show", w_frm_obj_nome, w_frm_regra_pos);
      }else{
        eval(_cc.replaceParametros(w_frm_regra_pos));
      };
    };

		/* APPEND DO TITULO NO FORM */
		if(_cc.string.retorna(_ccPrp.consulta(w_frm,"TITULO")) != ""){
			$("[name='" + w_frm_obj_nome + "']").append(w_frm_titulo);
		};

		/* DEBUG */
		if(w_frm_debug == 1){
			// _cc.debug();
			// _cc.menuAuxiliar();
		}
	};
};

var _ccFrm = new _ccaseForm();
