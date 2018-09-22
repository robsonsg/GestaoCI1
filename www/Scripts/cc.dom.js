var _ccaseDominio = function(){
	/* DOMINIO */
	this.load = {

		/* OPTION LIST AJAX */
		lista:{
			ajax:function(p_inp, p_dm, p_inp_tp){
				/* VARIAVEIS */
				var w_url = p_dm,
				w_url_aux = _cc.string.retorna(p_dm,1),
				w_colunas_m = [];

				w_url_aux = w_url_aux.indexOf("colunas");
				w_url = w_url.substr(w_url_aux + 8);
				w_url = w_url.substr(0, w_url.indexOf("&"));
				w_url = w_url.split(",");
				
				for(var w_url_item in w_url){
					w_colunas_m.push($.trim(w_url[w_url_item]));
				};

				/* TRACE LOG */
				var w_option_list = "", 
				w_where_dom_url = _cc.replaceParametros(ccase.url.root+p_dm);

				window.w_dese_trace_info = "cc.dom"
				var w_where_dom_ajax = _cc.ajax(w_where_dom_url,"GET","","","<strong class='cc-bg-preto cc-text-verde'>REST DOM:</strong><br>OPTIONS DO DOMINIO: " + p_dm,w_dese_trace_info,"");

				/* AJAX RESULT */
				$.when(w_where_dom_ajax).then(
					function(json_resp){

						_cc.validaResponseAjax(json_resp, w_where_dom_url);

						var w_m_rest = json_resp.data;
        		w_option_list += "<option data-option-text='' value=''>Selecione</option>";
						for(var w_option in w_m_rest){
							w_option_list += "<option data-option-text='" + _cc.string.retorna(w_m_rest[w_option][w_colunas_m[2]],"true") + "' value='" + w_m_rest[w_option][w_colunas_m[1]] + "'>"
				      w_option_list += (p_inp_tp == 8) ? w_m_rest[w_option][w_colunas_m[1]] + " - " + w_m_rest[w_option][w_colunas_m[2]] : w_m_rest[w_option][w_colunas_m[2]];
				      w_option_list += "</option>";
						};

						/* APPEND AND PLUGIN */
						if(window.location.href.toLowerCase().indexOf("ccaseide") == -1){
							_ccPlugin.select2.destroi(p_inp);
						};
						$("[name='" + p_inp + "']").html(w_option_list);
						if(window.location.href.toLowerCase().indexOf("ccaseide") == -1){
							_ccPlugin.select2.cria(p_inp);
						};

					},
					function(error){
						_cc.error(error);
						_cc.loading.hide();
					}
				);
			},
			matriz:function(p_inp, p_dm, p_inp_tp){
				/* VARIAVEIS */
				p_dm = p_dm.toLowerCase();

				var w_m = wMObjetoDominio,
				w_dm_pos = _ccObj.busca.binaria("wMObjetoDominio",p_dm,0),
				w_m_aux = [],
				w_pos = w_dm_pos,
				w_option_list = "";

				/* FOR INPUT LIST */
				if(w_pos != -1){
					while(w_pos < w_m.length - 1){
			      if(w_m[w_pos][0] != p_dm){break;}
			      if(w_m[w_pos][4] == "1"){
			      	w_m_aux.push([w_m[w_pos][3],w_m[w_pos][1], w_m[w_pos][2]]);
			      };
			      w_pos++;
			    };
			  };

			  w_m_aux = w_m_aux.sort();

			  w_option_list += "<option data-option-text='' value=''>Selecione</option>";
			  for(var w_option in w_m_aux){
			  	w_option_list += "<option data-option-text='" + w_m_aux[w_option][2].toLowerCase() + "' value='" + w_m_aux[w_option][1] + "'>"
		      w_option_list += (p_inp_tp == 8) ? w_m_aux[w_option][1] + " - " + w_m_aux[w_option][2] : w_m_aux[w_option][2];
		      w_option_list += "</option>";
			  };
			  return w_option_list;
			}
		},
		item:{
			tag:function(p_rotina_carga, p_val){
				/* VARIAVEIS */
				var w_val_tag = "";
				var w_val = _cc.string.retorna(p_val);
				var w_rotina_carga = decodeURI(_cc.string.retorna(p_rotina_carga));
				var w_carga_tab_nome = w_rotina_carga.substr(0, w_rotina_carga.indexOf("&"));
        
        w_carga_tab_nome = _cc.string.retorna($.trim(w_carga_tab_nome.substr(7, w_carga_tab_nome.length)),1);
        
        var w_val_m =  w_val.toString().split("#");
				var w_val_str = "";
				var w_val_tag = "";

				for(var w_val_item in w_val_m){
          w_val_str += "<em class='font-style-normal' data-inp-dom='" + _cc.string.retorna(w_carga_tab_nome + "-" + w_val_m[w_val_item], 1) + "'></em>, ";
        };

        w_val_tag = w_val_str.substr(0, w_val_str.length - 2);
        // _ccDom.load.item.ajax(w_rotina_carga, w_carga_tab_nome);

				return w_val_tag;
			},
			ajax:function(p_dm, p_dm_tab_nome){
				/* VARIAVEIS */
				var w_url = p_dm,
				w_url_aux = p_dm.toLowerCase(),
				w_colunas_m = [];

				w_url_aux = w_url_aux.indexOf("colunas");
				w_url = w_url.substr(w_url_aux + 8);
				w_url = w_url.substr(0, w_url.indexOf("&"));
				w_url = w_url.split(",");
				
				for(var w_url_item in w_url){
					w_colunas_m.push($.trim(w_url[w_url_item]));
				};

				var w_where_dom_url = "",
				w_where_dom_ajax = "";

				w_where_dom_url = _cc.replaceParametros(ccase.url.root+_cc.string.replace.quebraDeLinha(p_dm));	


				/* TRACE LOG */
	      window.w_dese_trace_info = "cc.dom";
        // 1 - p_url, 2 - p_method, 3 - p_content_type, 4 - p_data, 5 - p_origem, 6 - p_info, 7 - p_retorno
				w_where_dom_ajax = _cc.ajax(w_where_dom_url,"GET","","","<strong class='cc-bg-preto cc-text-verde'>REST DOM:</strong><br> -ITEM DO DOMINIO: " + p_dm,window.w_dese_trace_info);

				$.when(w_where_dom_ajax).then(
					function(json_resp){
						_cc.validaResponseAjax(json_resp, w_where_dom_url);

						var w_m_rest = json_resp.data,
						w_m_rest_aux = [];
						

						for(var w_desc in w_m_rest){
							w_m_rest_aux.push([w_m_rest[w_desc][w_colunas_m[1]], w_m_rest[w_desc][w_colunas_m[2]]])
						};


						$("[data-inp-dom^='" + p_dm_tab_nome + "']" ).each(function(){
							var w_inp_dado_dom = $(this).attr("data-inp-dom").substr(p_dm_tab_nome.length + 1);							

							for(var w_index in w_m_rest_aux){
								if(_cc.string.retorna(w_m_rest_aux[w_index][0],1) == _cc.string.retorna(w_inp_dado_dom,1)){
									$("[data-inp-dom='" + p_dm_tab_nome + "-"+ w_inp_dado_dom +"']").html(w_m_rest_aux[w_index][1])
								};
							};
						});

					},
					function(error){
						_cc.error(error);
						_cc.loading.hide();
					}
				);
			},
			matriz:function(p_dm, p_dado){
				/* VARIAVEIS */
				var w_dm = _cc.string.retorna(p_dm,1),
				w_dado_m = p_dado.toString().split("#"),
				w_m = wMObjetoDominio,
				w_cs_dm = "",
				w_pos = "",
				w_ds_dm = "",
				w_ds_dm_return = "",
				w_pos_dm = _ccObj.busca.sequencial("wMObjetoDominio",w_dm,0);

				for(var w_index = w_pos_dm; w_index < wMObjetoDominio.length;w_index++){
					
					w_cs_dm = w_m[w_index][1];
					w_ds_dm = w_m[w_index][2];

					if(wMObjetoDominio[w_index][0] != w_dm){
						if(w_ds_dm_return == ""){
							w_ds_dm_return = "<small class='cc-text-vermelho'>não encontrado</small>"
							// _cc.msg("NÃO encontrado: <strong class='cc-text-amarelo'>" + p_dado + "</strong> no DOMÍNIO: <strong class='cc-text-amarelo'> "  + p_dm + " </strong>","danger",10)
						}
						break;
						w_index = wMObjetoDominio.length-1;
					};

					if(_cc.string.retorna(w_cs_dm,1) == _cc.string.retorna(p_dado,1)){
						console.log(wMObjetoDominio[w_index])
						w_ds_dm_return = w_ds_dm;
						w_index = wMObjetoDominio.length-1;
						break;
					}
					
				};

				return w_ds_dm_return;
			}
		}
	}
}

var _ccDom = new _ccaseDominio();
