var _ccaseMenu = function(){

	/* CLICK DO MENU */
	this.listen = function(p_mnu){
		$(document).on("mousedown","[name='cc-mnu-" + p_mnu +"'] li a",function(){
			/* REMOVE :ACTIVE DO SELECIONADO */
			$("[name='cc-mnu-" + p_mnu +"'] .cc-mnu-item-selected").removeClass("cc-mnu-item-selected");
			
			/* ADICIONA O :ACTIVE AO ITEM SELECIONADO */
			$(this).closest("li").addClass("cc-mnu-item-selected");
		});
	};
	
	/* CLICK DO MENU */
	this.cria = function(p_mnu){
		/* OBJETO */
		var w_mnu = _cc.string.retorna(p_mnu,1);

		/* VARIAVEIS */
		var w_mnu_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_mnu, "OBJ_NOME"),1),
		w_mnu_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_mnu, "OBJ_REFERENCIA"),1),
		w_mnu_titulo = _ccPrp.consulta(w_mnu, "TITULO"),
		w_mnu_descricao = _ccPrp.consulta(w_mnu, "DESCRICAO"),
		w_mnu_action = _cc.replaceAspas(_ccPrp.consulta(w_mnu, "ACTION"), 1),
		w_mnu_hidden = _ccPrp.hidden(_ccPrp.consulta(w_mnu,"HIDDEN")),
		w_mnu_readonly = _ccPrp.consulta(w_mnu,"READONLY"),
		w_mnu_prop = "",
		w_mnu_style = "";

		if(w_mnu_readonly != "1"){
			_cc.listen("mouseup",w_mnu_obj_nome,w_mnu_action);
		}else{
			w_mnu_prop = "data-obj-referencia='" +  w_mnu_obj_referencia + "' ";
			w_mnu_prop += "data-obj-seq='" + _ccPrp.objSeq(w_mnu_obj_nome) + "' ";
		};

		if(w_mnu_readonly == "1" || w_mnu_readonly == "1"){
			w_mnu_style	= "color:#bbb !important;cursor:not-allowed";
		};

		var w_mnu_html = "<li class='" + w_mnu_hidden + "' class='position-relative'>";
		w_mnu_html += "<a style='" + w_mnu_style + "' "+ w_mnu_prop +" class='cc-mnu-item text-uppercase d-inline-block pt-3 pb-3 pl-3 pr-3' name='" + w_mnu_obj_nome + "'>";
		w_mnu_html += w_mnu_titulo;
		w_mnu_html += "</a>";
		w_mnu_html += "<ul class='m-0 list-unstyled cc-submnu' name='cc-mnu-" + w_mnu_obj_nome + "'>";
		w_mnu_html += "</ul>";
		w_mnu_html += "</li>";

		var w_mnu_agrupador_inicio = "<div class='cc-mnu cc-mnu-on m-0 col-md-36 w-100'>"
		w_mnu_agrupador_inicio += "<ul class='list-unstyled m-0 ' name='cc-mnu-" + w_mnu_obj_nome + "'>";
		
		var w_mnu_agrupador_fim = "</ul>";
		w_mnu_agrupador_fim += "</div>";

		if($("[name='cc-mnu-" + w_mnu_obj_referencia + "'").length == 0){
			if($("[name='" + w_mnu_obj_referencia + "'").length == 0){
				$("[name='" + ccase.agrupador.menu + "'").append(w_mnu_agrupador_inicio + w_mnu_agrupador_fim)
			}else{
				$("[name='" + w_mnu_obj_referencia + "'").append(w_mnu_agrupador_inicio + w_mnu_agrupador_fim)
			}
		}else{
			$("[name='cc-mnu-" + w_mnu_obj_referencia + "'").append(w_mnu_html)
		};

		$(".cc-submnu").each(function(){
			if($(this).find("li").length > 0){
				$(this).addClass("shadow border");
			};
		});

		_ccMnu.listen(w_mnu);

	};
}

var _ccMnu = new _ccaseMenu();