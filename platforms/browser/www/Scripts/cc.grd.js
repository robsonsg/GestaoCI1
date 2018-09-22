var _ccaseGrid = function(){

	this.cria = function(p_grd, p_grd_where_adicional){
    
    /* OBJETO */
    var w_grd = _cc.string.retorna(p_grd, 1);

    /* MATRIZ  */
    var w_grd_m =  ccase.matriz.grd["" + p_grd + ""];

    /* PROPRIEDADES > PRINCIPAIS */
    var w_grd_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_NOME"), 1);
    var w_grd_obj_referencia = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_REFERENCIA"), 1);
    var w_grd_obj_referencia_datagrid = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_REFERENCIA_DATAGRID"), 1);
    var w_grd_obj_relacionamento_datagrid = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_RELACIONAMENTO_DATAGRID"), 1);
    
    /* PROPRIEDADES > DADOS */
    var w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"), 1),
    w_grd_restful = _cc.string.retorna(_ccPrp.consulta(w_grd,"RESTFUL"), 1),
    w_grd_fk_pos = _ccObj.busca.binaria("wMObjetoForeignKey", w_grd_tab_nome, 0),
    w_grd_fk_col = "",
    w_grd_fk_relacionado_col = "",
    w_grd_fk = "";


    /* PROPRIEDADES > TREE */
    var w_grd_tree = _ccPrp.consulta(w_grd,"GRID_TREE");
    
    /* PROPRIEDADES DE CONTROLE */
    var w_grd_editavel = _ccPrp.consulta(w_grd,"EDITAVEL");
    var w_grd_busca = _ccPrp.consulta(w_grd,"GRID_BUSCA");
    var w_grd_click_action = _ccPrp.consulta(w_grd,"CLICK_ACTION");

    /* PROPRIEDADES > LAYOUT */
    var w_grd_quebra_linha = _ccPrp.quebraLinha(_ccPrp.consulta(w_grd,"QUEBRA_LINHA"));
    var w_grd_colspan = _ccPrp.colspan(_ccPrp.consulta(w_grd,"COLSPAN"), w_grd_obj_nome);
    var w_grd_extra_class = _ccPrp.consulta(w_grd,"EXTRA_CLASS");
    var w_grd_hidden = _ccPrp.hidden(_ccPrp.consulta(w_grd,"HIDDEN"));
    var w_grd_titulo = _ccPrp.consulta(w_grd,"TITULO");
    var w_grd_grade = _ccPrp.consulta(w_grd,"GRID_GRAD_OFF");
    var w_grd_zebrado = _ccPrp.consulta(w_grd,"ZEBRADO");

    /* VARIAVEIS PROPRIEDADES */
    var w_grd_props ="",
    w_grd_table_props = "";
    
    /* VARIAVEIS CSS */
    var w_grd_css_class = "",
    w_grd_table_css_class = "";

    /* VARIAVEIS HTML */
    var w_grd_htm = "";

    /* TITULO */
    if(w_grd_titulo != ""){
      w_grd_titulo = _ccPrp.titulo(_cc.replaceParametros(w_grd_titulo));
    };
    
    /* ZEBRADO */
    if(w_grd_zebrado == "" || w_grd_zebrado == 1){
      w_grd_zebrado = "table-striped";
    };

    /* GRADE / BORDAS */
    if(w_grd_grade != 1){
      w_grd_grade = "table-bordered";
    };

    /* GRID FK */
    if(w_grd_fk_pos >= 0){
      w_grd_fk_col = wMObjetoForeignKey[w_grd_fk_pos][3];
      w_grd_fk = wMObjetoForeignKey[w_grd_fk_pos][2]+"."+wMObjetoForeignKey[w_grd_fk_pos][3]
    };
		 
    /* PROPRIEDADES > AGRUPADOR */
    w_grd_props += "id='" + p_grd + "' ";
    w_grd_props += "name='" + p_grd + "' ";
    w_grd_props += "data-grd-fme='" + w_grd_obj_referencia + "' ";

    /* PROPRIEDADES */
		w_grd_table_props = "data-grd='" + w_grd_obj_nome + "' ";
    w_grd_table_props += "data-grd-tab-nome='" + w_grd_tab_nome + "' ";
    w_grd_table_props += "data-grd-obj-nome='" + w_grd_obj_nome + "' ";
    w_grd_table_props += "data-obj-referencia='" + w_grd_obj_referencia + "' ";
    w_grd_table_props += "data-obj-tp='grd' ";
    w_grd_table_props += "data-obj-seq='" + _ccPrp.objSeq(w_grd_obj_nome) + "' ";
    w_grd_table_props += "data-grd-where-adicional='" + _cc.replaceAspas(_cc.string.retorna(p_grd_where_adicional),2) + "' ";
    w_grd_table_props += "data-grd-obj-referencia-datagrid='" + w_grd_obj_referencia_datagrid + "' ";
    w_grd_table_props += "data-grd-obj-relacionamento-datagrid='" + w_grd_obj_relacionamento_datagrid + "' ";
    w_grd_table_props += "data-grd-foreign-key='" + w_grd_fk + "' ";
    w_grd_table_props += "data-grd-foreign-key-col='" + w_grd_fk_col + "' ";

    /* PROPRIEDADES > CLASSE AGRUPADOR */
    w_grd_css_class += "cc-grd ";
    w_grd_css_class += w_grd_colspan + " ";
    w_grd_css_class += w_grd_extra_class + " ";
    w_grd_css_class += w_grd_hidden + " ";

    if(w_grd_click_action != ""){
      w_grd_css_class += "cc-grd-regra ";
    };

    /* PROPRIEDADES > BUSCA NO GRID */
    if(w_grd_busca != "1"){
      w_grd_css_class += "cc-grd-no-search ";
    };

    /* PROPRIEDADES > TABELA CSS */
    w_grd_table_css_class += "cc-table ";
    w_grd_table_css_class += "table ";
    w_grd_table_css_class += "table-sm ";
    w_grd_table_css_class += "table-hover ";
    w_grd_table_css_class += "cc-bg-branco ";
    w_grd_table_css_class += w_grd_zebrado + " ";
    w_grd_table_css_class += w_grd_grade + " ";
    
    /* PROPRIEDADES > BUSCA NO GRID */
    if(w_grd_tree == 1){
      w_grd_table_css_class += "cc-treeview-lista ";
    };

    w_grd_table_css_class += _cc.replacePontosPorTracos(w_grd_obj_nome) + " ";

    var w_inp_col_filtro_pos = _ccObj.busca.binaria("wMObjetoReferenciaDatagrid",w_grd_obj_nome,5),
    w_inp_col_filtro_bo = "";

    if(w_inp_col_filtro_pos != -1){
      /* PEGA OS INPUTS DESSE GRID */
      for(var w_index = w_inp_col_filtro_pos;w_index < wMObjetoReferenciaDatagrid.length;w_index++){
        if(wMObjetoReferenciaDatagrid[w_index][5] != w_grd_obj_nome){
          break;
        };
        var w_inp_obj_nome = wMObjetoReferenciaDatagrid[w_index][0];
        if(_ccPrp.consulta(w_inp_obj_nome, "COL_FILTRO") != ""){
          w_inp_col_filtro_bo = 1;
        };
      };
    };

		/* GRID TABLE HTML */
		w_grd_htm = w_grd_quebra_linha; 
    w_grd_htm += "<div class='position-relative " +  w_grd_css_class + "' " + w_grd_props + ">";
    
    w_grd_htm += w_grd_titulo;
    if(w_inp_col_filtro_bo == 1){
      w_grd_htm += "<div class='cc-grd-filter'><button class='btn btn-sm btn-dark btn-filter' data-btn-acao-padrao='4' data-btn-grd-filtro='" + w_grd_obj_nome + "'><i class='fas fa-filter'></i> Filtrar</button></div>";
    };
		w_grd_htm += "<table " + w_grd_table_props + " class='" + w_grd_table_css_class + "'>";
		w_grd_htm += _ccGrd.load.thead(w_grd);
		w_grd_htm += "<tbody>";
		w_grd_htm += "</tbody>";
		w_grd_htm += "</table>";
		w_grd_htm += "</div>";

	  /* ADICIONA GRID */
    /* REMOVE PRIMEIRO*/
		if($("[name='" + p_grd + "'].cc-grd").length > 0){
			$("[name='" + p_grd + "'].cc-grd").addClass("cc-grd-delete");
			$(w_grd_htm).insertAfter($(".cc-grd-delete"));
			$(".cc-grd-delete").remove();
		}else{
			$("[name='" + w_grd_obj_referencia + "']").append(w_grd_htm);
		};

    /* LOAD DADOS */
    if(w_grd_obj_relacionamento_datagrid == ""){
      _ccGrd.load.dados(w_grd_obj_nome, _cc.string.retorna(p_grd_where_adicional));
    };
	};

  this.load = {
    thead:function(p_grd){
      /* VARIAVEIS PRINCIPAIS */
      var w_grd = _cc.string.retorna(p_grd,1);

      /* VARIAVEIS ESTRUTURA */
      var w_grd_htm_thead = "",
      w_grd_cols = "",
      w_grd_cols_aux = [],
      w_grd_cols_col_aux = [];

      /* VARIAVEIS DE DADOS */
      var w_grd_restful = _ccPrp.consulta(w_grd, "RESTFUL");
      var w_grd_restful_url = "";

      /* VARIAVEIS DE CONTROLE */
      var w_grd_tree = _ccPrp.consulta(w_grd, "GRID_TREE");

      /* HTML THEAD */
      w_grd_htm_thead += "<thead class='thead-dark'>";
      w_grd_htm_thead += "<tr>";

      /* CARREGA COLUNAS DO GRID */
      if(w_grd_restful == ""){
        /* BUSCA NA MATRIZ DE OBJETOS AS COLUNAS*/
        w_grd_cols = _ccGrd.load.colunas(w_grd);

        /* SEPARA O OBJEO */
        for(var w_grd_col in w_grd_cols){
          w_grd_cols_aux.push(_ccPrp.consulta(w_grd_cols[w_grd_col],"OBJ_NOME"));
          w_grd_cols_col_aux.push(_cc.string.retorna(_ccPrp.consulta(w_grd_cols[w_grd_col],"COL_NOME"),1));
        };
      }else{
        /* BUSCA NO RESTFUL AS COLUNAS */
        var w_grd_restful_url = w_grd_restful.substr(w_grd_restful.indexOf("&colunas") + 9);
        if(w_grd_restful_url.indexOf("&") >= 0){
          w_grd_restful_url = w_grd_restful_url.substr(0, w_grd_restful_url.indexOf("&"))
        };
        w_grd_cols = w_grd_restful_url.split(",");
      };
    
      /* ADD COLUNA COM QDE DE FILHOS */
      if(w_grd_tree == 1){
        w_grd_cols_col_aux.push("qtFilhos");
        w_grd_cols.push("qtFilhos");
      };

      /* TH DA TABELA */
      for(var w_th in w_grd_cols){
        if(w_grd_cols[w_th] == "qtFilhos"){
          w_grd_htm_thead += "<th class='d-none text-center'>-</th>";
        }else if(w_grd_restful != ""){
          w_grd_htm_thead += "<th class='text-center'>";
          w_grd_htm_thead += w_grd_cols[w_th]; 
          w_grd_htm_thead += "</th>";
        }else{
          var w_col_grd_span = _ccPrp.grd_colspan(_ccPrp.consulta(w_grd_cols[w_th], "COL_GRID_SPAN"), w_grd_cols[w_th]);
          w_grd_htm_thead += "<th class='text-center " + w_col_grd_span + "'>";
          w_grd_htm_thead += _cc.replaceParametros(_ccPrp.consulta(w_grd_cols[w_th],"TITULO")); 
          w_grd_htm_thead += "</th>";
        };
      };

      w_grd_htm_thead += "</tr>";
      w_grd_htm_thead += "</thead>";

      return w_grd_htm_thead; 
    },
    colunas:function(p_grd){
      /* VARIAVEIS */  
      var w_grd_cols = [],
      w_grd_cols_aux = [],
      w_grd_cols_all = _ccGrd.load.inputColunas(p_grd);
      w_grd_cols_all = w_grd_cols_all.data;
      
      for(var w_col in w_grd_cols_all){
        var w_col_grid = _ccPrp.consulta(w_grd_cols_all[w_col].OBJ_NOME,"COL_GRID");
        if(parseInt(w_col_grid) == 1){
          var w_col_grid_ordem = _ccPrp.consulta(w_grd_cols_all[w_col].OBJ_NOME,"COL_GRID_ORDEM");
          if(w_col_grid_ordem == ""){
            w_col_grid_ordem = 9999;
          };
          w_grd_cols_aux.push([w_col_grid_ordem, w_grd_cols_all[w_col].OBJ_NOME]);
        };
      };

      w_grd_cols_aux.sort();

      for(var w_col in w_grd_cols_aux){
        w_grd_cols.push(w_grd_cols_aux[w_col][1]);
      };

      return w_grd_cols;
    },
    inputColunas:function(p_grd){
      /* VARIAVEIS */
      var w_grd = p_grd,
      p_matriz = wMObjetoReferenciaDatagrid,
      p_tipo = 2, //FORCANDO O TIPO 2 PARA RETORNAR FILHOS
      p_col = 0;
      
      /* VERIFICA A POSICAO DA COLUNA DA MATRIZ PELO TIPO DE BUSCA */
      if(p_tipo == 1){
        /* COL 0 = OBJ_NOME */
        p_col = 0;
      }else if(p_tipo == 2){
        /* COL 5 = OBJ_REFERENCIA_DATAGRID */
        p_col = 5;
      };

      /* VARIAVEIS DE RETORNO */
      var w_pos = _ccObj.busca.binaria("wMObjetoReferenciaDatagrid", w_grd, p_col),
      w_str_json = "",
      w_prp_vlr = "";

      /* SE NAO ENCONTRAR, RETORNA VAZIO */
      if(w_pos == -1){
        return false;
      };
      
      if(p_tipo == 2){
        w_str_json += "{\"data\":[";
        while(w_pos < p_matriz.length){
          if(_cc.string.retorna(p_matriz[w_pos][5]) != w_grd){break;};
          w_str_json += "{";
          w_str_json += "\"ID\":" + "\"" + $.trim(p_matriz[w_pos][2]) + "\",";
          w_str_json += "\"OBJ_NOME\":" + "\"" + $.trim(p_matriz[w_pos][0]) + "\",";
          w_str_json += "\"OBJ_TP\":" + "\"" + $.trim(p_matriz[w_pos][1]) + "\",";
          w_str_json += "\"OBJ_SEQ\":" + "\"" + $.trim(p_matriz[w_pos][3]) + "\",";
          w_str_json += "\"OBJ_REFERENCIA\":" + "\"" + $.trim(p_matriz[w_pos][5]) + "\"";
          w_str_json += "},";
          w_pos++;
        };     
        
        w_str_json = w_str_json.substr(0,w_str_json.length-1) + "]}"
      };

      /* SUBSTITUICAO DE CARACTERES */
      if(w_str_json.indexOf("\n") >= 0){
        w_str_json = w_str_json.replace(/\n/g, "\\n");
      };

      /* RETORNO */
      return JSON.parse(w_str_json);
    },
    dados:function(p_grd, p_grd_where_adicional, p_inp_id_ref){
      try{
        /* VARIAVEIS PRINCIPAIS */
        var w_grd = _cc.string.retorna(p_grd,1),
        w_grd_obj_nome = w_grd;

        /* MATRIZ */
        var w_grd_m =  ccase.matriz.grd["" + p_grd + ""];

        /* VARIAVEIS DE GRID */
        var w_grd_tree = w_grd_tree = _ccPrp.consulta(p_grd,"GRID_TREE");

        /* VARIAVEIS DE DADOS */
        var w_inp_id_ref = _cc.string.retorna(p_inp_id_ref),
        w_grd_restful = _ccPrp.consulta(w_grd, "RESTFUL"),
        w_grd_where = $.trim(_cc.replaceParametros(_cc.replaceAspas(_ccPrp.consulta(w_grd, "WHERE"),1))),
        w_grd_where_adicional = _cc.string.retorna(p_grd_where_adicional),
        w_grd_where_url = "",
        w_grd_where_fk = "",
        w_grd_fk = "",
        w_grd_fk_col = "",
        w_grd_fk_relacionado_col = "",
        w_grd_fk_pos = _ccObj.busca.binaria("wMObjetoForeignKey", _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"),1), 0),
        w_grd_principal = "",
        w_grd_principal_tab_nome = "",
        w_grd_principal_inp_val = "";

        /* VARIAVEIS DE TABELA */
        var w_grd_tree_col_pai = _ccPrp.consulta(w_grd_obj_nome, "GRID_TREE_COL_PAI"),
        w_grd_tree_col_filho = _ccPrp.consulta(w_grd_obj_nome, "GRID_TREE_COL_FILHO"),
        w_grd_tree_col_extra_tree = "",
        w_grd_click_action = _ccPrp.consulta(w_grd,"CLICK_ACTION");

        var w_grd_where_bo_and = "",
        w_grd_table_dados_url = ccase.url.tabela,
        w_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"), 1),
        w_grd_orderby = _cc.string.retorna(_ccPrp.consulta(w_grd,"ORDERBY"), 1),
        w_grd_groupby = _cc.string.retorna(_ccPrp.consulta(w_grd,"GROUPBY"), 1),
        w_grd_complemento = _cc.string.retorna(_ccPrp.consulta(w_grd,"COMPLEMENTO"), 1),
        w_grd_restful_url_cols = "",
        w_grd_restful_url = "";

        /* VARIAVEIS DE RELACIONAMENTO */
        var w_self_grd_obj_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_NOME"),1),
        w_self_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_grd,"TAB_NOME"),1),
        w_self_grd_obj_relacionamento_datagrid = _cc.string.retorna(_ccPrp.consulta(w_grd,"OBJ_RELACIONAMENTO_DATAGRID"),1),
        w_parent_grd = w_self_grd_obj_relacionamento_datagrid,
        w_parent_grd_tab_nome = _cc.string.retorna(_ccPrp.consulta(w_parent_grd,"TAB_NOME"),1);
       
        /* VARIAVEIS DE COLUNAS */
        var w_grd_cols = _ccGrd.load.colunas(w_grd_obj_nome),
        w_grd_cols_aux = [],
        w_grd_cols_col_aux = [],
        w_grd_cols_col_where = [],
        w_grd_cols_col_str = "";

        /* VARIAVEIS DO JSON */
        var w_grd_table_dados;

        for(var w_grd_col in w_grd_cols){
          w_grd_cols_aux.push(_cc.string.retorna(_ccPrp.consulta(w_grd_cols[w_grd_col],"OBJ_NOME"),1));
          w_grd_cols_col_aux.push(_cc.string.retorna(_ccPrp.consulta(w_grd_cols[w_grd_col],"COL_NOME"),1));
          w_grd_cols_col_where.push(_cc.string.retorna(_ccPrp.consulta(w_grd_cols[w_grd_col],"COL_NOME"),1));
        };

        if(w_grd_tree == 1){
          if(w_grd_cols_col_aux.indexOf("qtFilhos") == -1){
            w_grd_cols_col_aux.push("qtFilhos");
          };
        };

        /* VERIFICA RELACIONAMENTO AND FOREIGN KEY */
        if(_ccPrp.consulta(w_grd,"OBJ_RELACIONAMENTO_DATAGRID") != ""){

          /* VERIFICA AS FK */
          if(w_grd_fk_pos != -1){
            for(var w_index = w_grd_fk_pos;w_index < wMObjetoForeignKey.length;w_index++){
              try{
                if(w_self_grd_tab_nome == wMObjetoForeignKey[w_index][0]){
                  if(wMObjetoForeignKey[w_index][2] == w_parent_grd_tab_nome){
                    w_grd_fk_pos = w_index;
                    break;
                  };
                }else{
                  break;
                };
              }catch(error){
                _cc.error(error);
              };
            };

            w_grd_fk = wMObjetoForeignKey[w_grd_fk_pos][2]+"."+wMObjetoForeignKey[w_grd_fk_pos][3]
            w_grd_fk_col = wMObjetoForeignKey[w_grd_fk_pos][3];
            w_grd_fk_relacionado_col = wMObjetoForeignKey[w_grd_fk_pos][1];
            w_grd_principal_tab_nome = w_grd_fk.split(".")[0];
            w_grd_principal = $("[data-grd-tab-nome='" + w_grd_principal_tab_nome + "']").attr("data-grd");
            w_grd_principal_inp_val = $("[data-inp-obj-referencia-datagrid='" + w_grd_principal + "'][data-inp-col-nome='" + w_grd_fk_col + "']").val();
            
            if(_cc.string.retorna(w_grd_principal_inp_val) == ""){
              w_grd_principal_inp_val = 0;
            };
            w_grd_where_fk = " " + w_grd_fk_relacionado_col + " = " + w_grd_principal_inp_val + " "; 
            if($.trim(w_grd_where) == ""){
              w_grd_where = w_grd_where_fk;
            }else{
              w_grd_where = w_grd_where + " and " + w_grd_where_fk;
            };
          };
        };

        if($.trim(w_grd_where_adicional) != ""){
          w_grd_where = w_grd_where  + " and " + w_grd_where_adicional;
        };

        w_grd_where_url = w_grd_where;
        w_grd_where_url = _cc.replaceAspas(w_grd_where_url,1);

        w_grd_cols_col_str = w_grd_cols_col_where.toString(); 

        /*VERIFICA SE NAO TEM A COLUNA ID*/
        if(w_grd_cols_col_str.split(",").indexOf("id") == -1 && w_grd_cols_col_str.split(",").indexOf("Id") == -1 && w_grd_cols_col_str.split(",").indexOf("iD") == -1 && w_grd_cols_col_str.split(",").indexOf("ID") == -1){
          /* VERIFICA SE É TREE */
          if(w_grd_tree == 1){
            w_grd_tree_col_extra_tree = ",(`SELECT SUM(1) FROM " + w_grd_tab_nome + " x WHERE x." + w_grd_tree_col_filho + "` = " + w_grd_tree_col_pai + " ) AS qtFilhos";
          };

          /* MONTA AS COLUNAS */
          if(w_grd_cols_col_str.length == 0){
            w_grd_cols_col_str = "id" + w_grd_tree_col_extra_tree;
          }else{
            w_grd_cols_col_str = "id, " + w_grd_cols_col_str + w_grd_tree_col_extra_tree;
          };
        };

        /* RESTFUL GRID COLS */
        if(w_grd_restful != ""){
          var w_grd_restful_url_cols = [];
          var w_grd_restful_url = _cc.string.retorna(_ccPrp.consulta(w_grd,"RESTFUL"),1);
          w_grd_restful_url = w_grd_restful_url.substr(w_grd_restful_url.indexOf("&colunas") + 9);
          
          if(w_grd_restful_url.indexOf("&") >= 0){
            w_grd_restful_url = w_grd_restful_url.substr(0, w_grd_restful_url.indexOf("&"))
          };

          w_grd_restful_url_cols = w_grd_restful_url.split(",")
        };

        /* URL DOS DADOS GRID */
        w_grd_table_dados_url += "TABELA=" + w_grd_tab_nome;
        if(w_grd_tree != 1){
          w_grd_table_dados_url += "&WHERE=" + $.trim(w_grd_where_url);
        }else{
          if($.trim(w_grd_where_url) != ""){
            w_grd_where_bo_and = " and ";
          };
          w_grd_table_dados_url += "&WHERE=" + $.trim(w_grd_where_url) + " " + w_grd_where_bo_and + " " + w_grd_tree_col_filho + " = 0";
        };
        w_grd_table_dados_url += "&ORDERBY=" + w_grd_orderby;
        w_grd_table_dados_url += "&GROUPBY=" + w_grd_groupby;
        w_grd_table_dados_url += "&COLUNAS=" + w_grd_cols_col_str;
        w_grd_table_dados_url += "&COMPLEMENTO=" + w_grd_complemento;

        /* OBEDECE O REST EM VEZ DO WHERE */
        if(w_grd_restful != ""){
          if(w_grd_where_adicional != ""){
            w_grd_where_adicional = "&WHERE=" + w_grd_where_adicional;
          };
          w_grd_table_dados_url = _cc.replaceParametros(ccase.url.tabela + w_grd_restful + w_grd_where_adicional);
        };

        /* VARIAVEL PARA ARMAZENAR OS DADOS */
        window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.grd<br>"
        //p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        var w_grd_table_dados_ajax = _cc.ajax(w_grd_table_dados_url,"GET","","","<strong class='cc-bg-preto cc-text-amarelo'>REST GRD:</strong><br>DADOS DO GRID: <strong class='cc-bg-preto cc-text-amarelo'>" + p_grd + "</strong>",window.w_dese_trace_info,"");

        $.when(w_grd_table_dados_ajax).then(
          function(json_resp_grd_dados){
            /* VALIDACAO */
            _cc.validaResponseAjax(json_resp_grd_dados, w_grd_table_dados_url);

            /* VARIAVEIS PRINCIPAIS */
            var w_grd_htm = "";

            /* VARIAVEIS DE DADOS */
            var w_grd_restful_url = "";

            /* VARIAVEIS DE JSON */
            var w_json_data = JSON.stringify(json_resp_grd_dados);
            w_json_data =  w_json_data.replace(/bo_Requerido/g,"bo_requerido");
            json_resp_grd_dados = JSON.parse(w_json_data)

            var w_grd_table_dados = json_resp_grd_dados.data;

            /* ADICIONA NUMA MATRIZ DE DADOS */
            ccase.matriz.grd_dados["" + p_grd + ""] = w_grd_table_dados;

            /* VARIAVEIS DE CONTROLE */
            var w_grd_autoselect_off = _ccPrp.consulta(w_grd,"AUTOSELECT_OFF"),
            w_grd_click_action = _ccPrp.consulta(w_grd,"CLICK_ACTION");

            /* REMOVE O PLUGIN DATATABLE PARA INICIAR OS DADOS */
            _ccPlugin.DataTable.destroi(w_grd_obj_nome);
            
            /* VALIDACAO DO GRID VAZIO */
            if(w_grd_table_dados.length == 0){
              w_grd_table_dados = "";
              _ccInp.limpa(p_grd);
            };

            if(w_grd_restful != ""){
              w_grd_restful_url = w_grd_restful.substr(w_grd_restful.indexOf("&colunas") + 9);
              if(w_grd_restful_url.indexOf("&") >= 0){
                w_grd_restful_url = w_grd_restful_url.substr(0, w_grd_restful_url.indexOf("&"))
              };
              w_grd_cols_col_aux = w_grd_restful_url.split(",");
            };

            /*  TBODY */ 
            for(var w_index = 0; w_index < w_grd_table_dados.length;w_index++){
              /* LINHA > TR */
              w_grd_htm += "<tr data-grd-data-index='" + w_index + "'>";

              for(var w_col_prop in w_grd_cols_col_aux){
                /* VARIAVEIS COM O COL_NOME DO DADO */
                var w_coluna = w_grd_cols_col_aux[w_col_prop];
                if(_cc.string.retorna(w_coluna,1) != "qtfilhos" && w_grd_restful == ""){
                  w_coluna = _cc.string.retorna(w_coluna,1);
                };
                
                /* VARIAVEIS DO DADO */
                var w_grd_td_dado = w_grd_table_dados[w_index][w_coluna];
                
                /* VARIAVEIS DE PROPRIEDADES */
                var w_grd_td_align = "cc-text-center",
                w_grd_td_align = _ccPrp.consulta(_cc.string.retorna(w_grd_cols_aux[w_col_prop], 1),"COL_GRID_ALINHAMENTO_H"),
                w_grd_td_props = "",
                w_grd_hide_tree_class = "",
                w_grd_inp_pos = _ccObj.busca.binaria("wMObjeto", "" + _cc.string.retorna([w_grd_cols_aux[w_col_prop]], 1) + "",0),
                w_grd_inp = "" + _cc.string.retorna([w_grd_cols_aux[w_col_prop]], 1) + "",
                w_inp_rotina_carga = _ccPrp.consulta(w_grd_inp,"ROTINA_CARGA"),
                w_inp_rotina_carga_tab_nome = "",
                w_grd_td_dado_m = "",
                w_grd_td_dado_str = "";
                
                if(w_grd_td_align == 1){w_grd_td_align = "text-left";};
                if(w_grd_td_align == 2){w_grd_td_align = "text-center";};
                if(w_grd_td_align == 3){w_grd_td_align = "text-right";};
                if(w_grd_td_align == 4){w_grd_td_align = "text-justify";};

                w_grd_td_props = "onmouseup='_ccGrd.listen(\"" + w_grd_obj_nome + "\", this);' ";
                w_grd_td_props += "data-grd-inp-val='" + w_grd_td_dado + "' ";
                w_grd_td_props += "data-grd-inp-id='" + ccase.matriz.grd_dados["" + p_grd + ""][w_index].id + "'";
                
                if(_cc.string.retorna(w_coluna,1) == "qtfilhos"){
                  w_grd_hide_tree_class= " d-none ";
                };

                w_grd_htm += "<td data-grd-col='" + _ccPrp.consulta(w_grd_cols_aux[w_col_prop],"OBJ_NOME") + "' class='" + w_grd_td_align + " " + w_grd_hide_tree_class + "'>";
                
                /* CASO NAO TENHA DADOS */
                if(w_grd_td_dado == null){w_grd_td_dado = "";}
                
                /* VERIFICA PROPRIEDADES DAS COLUNAS */
                if(w_grd_restful != ""){
                  w_grd_inp = $("[data-inp-obj-referencia-datagrid='" + w_grd + "'][data-inp-col-nome='" + _cc.string.retorna(w_coluna,1) + "']").attr("data-inp-obj-nome");
                  w_grd_inp_pos = 0;
                };

                if(w_grd_inp_pos != -1){

                  if(_ccPrp.consulta(w_grd_inp,"INPUT_TP") == "3"){w_grd_td_dado = _cc.converteData(w_grd_td_dado, "DD/MM/YYYY","get");};
                  if(_ccPrp.consulta(w_grd_inp,"INPUT_TP") == "4"){w_grd_td_dado = _cc.converteData(w_grd_td_dado, "DD/MM/YYYY HH:mm:ss","get");};
                  if(_ccPrp.consulta(w_grd_inp,"INPUT_TP") == "11"){
                    w_grd_td_dado = w_grd_td_dado == 0 ? "não" : "sim";
                  };
                  if(_ccPrp.consulta(w_grd_inp,"ROTINA_CARGA") != ""){
                    w_inp_rotina_carga = _ccPrp.consulta(w_grd_inp,"ROTINA_CARGA");
                    try{
                      if(w_inp_rotina_carga.substr(0,6).toLowerCase().indexOf("tabela") >= 0){
                        /* ROTINA CARGA AJAX */
                        w_inp_rotina_carga = decodeURI(w_inp_rotina_carga);
                        w_inp_rotina_carga_tab_nome = w_inp_rotina_carga.substr(0, w_inp_rotina_carga.indexOf("&"));
                        w_inp_rotina_carga_tab_nome = _cc.string.retorna($.trim(w_inp_rotina_carga_tab_nome.substr(7, w_inp_rotina_carga_tab_nome.length)),1);
                        w_grd_td_dado_m =  w_grd_td_dado.toString().split("#");
                        w_grd_td_dado_str = "";
                        
                        for(var w_grd_td_dado_item in w_grd_td_dado_m){
                          w_grd_td_dado_str += "<span data-inp-dom='" + _cc.string.retorna(w_inp_rotina_carga_tab_nome,1) + "-" + _cc.string.retorna(w_grd_td_dado_m[w_grd_td_dado_item], 1) + "'></span>, ";
                        };

                        w_grd_td_dado_str = w_grd_td_dado_str.substr(0, w_grd_td_dado_str.length - 2);
                        w_grd_td_dado = w_grd_td_dado_str;
                        _ccDom.load.item.ajax(w_inp_rotina_carga, w_inp_rotina_carga_tab_nome);
                      }else{
                        w_grd_td_dado = _ccDom.load.item.matriz(_ccPrp.consulta(w_grd_inp,"ROTINA_CARGA"), w_grd_td_dado);
                      };
                    }catch(error){
                      _cc.error(error)
                    }
                  };
                };

                /* DADO EM SI */
                w_grd_htm += "<ul class='list-unstyled m-0 p-0'>"
                w_grd_htm += "<li>";
                if(w_col_prop == "0"){
                  if(w_grd_tree[0] == "1"){
                    if(w_grd_table_dados[w_index]["qtFilhos"] >= 1){
                      w_grd_htm += "<button class='cc-btn-tree mr-2 border-0 cc-btn-plus text-monospace'>+</button>";
                    }else{
                      w_grd_htm += "<button disabled='disabled' class='cc-btn-tree mr-2 border-0 btn-disabled cc-btn-cinza text-monospace'>&rtrif;</button>";
                    }
                  };
                };
                w_grd_htm += "<a " + w_grd_td_props + ">"; 
                w_grd_htm += _cc.replaceAspas(w_grd_td_dado,1);
                w_grd_htm += "</a>";
                w_grd_htm += "</li>";
                w_grd_htm += "</ul>";
                w_grd_htm += "</td>";
              };
              w_grd_htm += "</tr>";
            };

            $("[data-grd='" + p_grd + "'] tbody").html(w_grd_htm);

            if(w_inp_id_ref == ""){
              if(w_grd_autoselect_off != "1"){
                $("table[data-grd='" + w_grd_obj_nome + "'] tbody a:first").trigger("mouseup");
              };
            }else{
              $("table[data-grd='" + w_grd_obj_nome + "'] tbody a[data-grd-inp-id='"+w_inp_id_ref+"']").trigger("mouseup");
            };

            _ccPlugin.DataTable.cria(w_grd_obj_nome);
          },
          function(error){
            _cc.error(error)
          }
        );
      }catch(error){
        _cc.error(error)
      }
    },
    dadosRelacionados:function(p_el){
      var w_grd_principal = _cc.string.retorna($(p_el).closest("[data-grd]").attr("data-grd"));
      var w_grids_relacionados = [];
      if(w_grd_principal != ""){
        $("table[data-grd-obj-relacionamento-datagrid='" + w_grd_principal + "']").each(function(){
          var w_grd_relacionado = $(this).attr("data-grd");
          _ccGrd.load.dados(w_grd_relacionado)
          // _ccGrd.cria(w_grd_relacionado);
        });
      };
    }
  };

	/* CLICK NO GRID */
	this.listen = function(p_grd, p_el, p_event){
    _cc.loading.show("Carregando dados",1,"dados-grid-tabela");
    
    /* VARIAVEIS */
    var w_grd_inp_edit = "",
    w_inp_dados_ajax = "",
    w_grd_click_action = "";

    /* VERIFICA OBJ DE REFERENCIA */
    $(p_el).closest("table").find("tr").removeClass('cc-tabela-tr-selecionada');

    /* VERIFICA OBJ DE REFERENCIA */
    w_grd_inp_edit = _ccPrp.consulta(p_grd,"OBJ_REFERENCIA_EDIT");
    if(w_grd_inp_edit != ""){
      w_grd_inp_edit.toLowerCase();
    };

    /* SELECIONA A LINHA DA TABELA */
    $(p_el).closest("tr").addClass('cc-tabela-tr-selecionada');

    /* CARREGA DADOS DO INPUT */
    w_inp_dados_ajax = _ccInp.load.dados(p_grd, p_el);

    /* RETORNO DE CARREGAR DADOS DO INPUT */
    $.when(w_inp_dados_ajax).then(
      function(){

        /* CLICK ACTION DO GRID */
        var w_grd_click_action = _ccPrp.consulta(p_grd,"CLICK_ACTION");
        if(w_grd_click_action != ""){
          $("table[data-grd='" + p_grd + "'] .cc-tabela-tr-selecionada a:first").trigger("click");
        };

        /* CASO HAJA UM TREE, CLICAR */
        $("table[data-grd='" + p_grd + "'] .cc-tabela-tr-selecionada .cc-btn-plus").trigger("click");
        
        try{
          var w_grd = _cc.string.retorna(p_grd,1);
          var w_grd_click_action = _ccPrp.consulta(w_grd,"CLICK_ACTION");
          if(w_grd_click_action != ""){
            eval(_cc.replaceParametros(_cc.replaceAspas(w_grd_click_action, 1)));
          };
        }catch(error){
          _cc.error(error)
        }

        _cc.loading.hide("dados-grid-tabela");
      }, 
      function(error){
        _cc.error(error);
      }
    );

		/* ABRE MODAL */
    if(ccase.matriz.fme["" + _cc.string.retorna(w_grd_inp_edit, true) + ""] != undefined){
      if(ccase.matriz.fme["" + _cc.string.retorna(w_grd_inp_edit, true) + ""].MODAL == 1){
        _cc.modal.show(w_grd_inp_edit);
      };
    };
    
	};

	/* INICIA */
	this.inicia = function(){
    _ccGrd.treeview();

    $(document).on("mousedown", "tr", function(e){
      if(!$(this).closest("table").hasClass("cc-treesview-lista")){
        if(e.target.tagName.toLowerCase() != "a" && e.target.tagName.toLowerCase() != "button"){
          $(this).closest("table").find("tr").removeClass("cc-tabela-tr-selecionada");
          $(this).addClass("cc-tabela-tr-selecionada");
          $(this).closest("tr").find("a:eq(0)").trigger("mouseup");
        };
      };
    });
	};

  this.treeview = function(){
    try{
      /* CLICK NO MAXIMIZAR */
      $(document).on("click",".cc-btn-tree.cc-btn-plus",function(){ 
        var w_this = $(this);
        w_this.attr("disabled","disabled")
        $(".cc-btn-tree").removeClass("cc-grd-tree-link-active");
        $(this).addClass("cc-grd-tree-link-active");

        /* VARIAVEIS */
        var w_el = this,
        w_dado_id = $(w_el).closest("tr").find("td:eq(0) a").attr("data-grd-inp-id"),
        w_tree_nivel = $(w_el).closest("tr").attr("data-tree-nivel"),
        w_grd = $(w_el).closest("table").attr("data-grd"),
        w_grd_tab_nome = _ccPrp.consulta(w_grd, "TAB_NOME"),
        
        // w_grd_tree_action = _ccPrp.consulta(w_grd, "GRID_TREE_ACTION").split("#"),
        w_grd_tree_rotina_busca_filhos = "",
        w_grd_tree_class_nivel = "",
        w_grd_col_referencia_pai = "",
        w_grd_col_referencia_filho = "";

        w_grd_col_referencia_pai = _ccPrp.consulta(w_grd, "GRID_TREE_COL_PAI");
        w_grd_col_referencia_filho = _ccPrp.consulta(w_grd, "GRID_TREE_COL_FILHO");
        w_grd_tree_rotina_busca_filhos = _ccPrp.consulta(w_grd, "GRID_TREE_ROTINA_BUSCAFILHOS");

        window.w_dese_trace_info = "<strong>FILE:</strong><br> cc.grd<br>"
        //p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        //
        var w_grd_tree_url = ccase.url.tabela+"tabela=" + w_grd_tab_nome + "&where=id="+ w_dado_id+ "&colunas=" + w_grd_col_referencia_pai + "";
        var w_grd_tree_ajax = _cc.ajax(w_grd_tree_url,"GET","","","<strong class='cc-bg-preto cc-text-amarelo'>REST GRID:</strong><br>CLICK NO TREE <strong class='cc-bg-preto cc-text-amarelo'>" + w_dado_id + "</strong>",w_dese_trace_info,"");

        $(w_el).removeClass("cc-btn-plus").addClass("cc-btn-minus").html("-");
        
        /* QUANDO CARREGAR O AJAX */
        $.when(w_grd_tree_ajax).then(
          
          /* SUCCESS */
          function(json_resp){
            /* SHOW LOADING */
            var w_id_referencia = json_resp.data[0]["" + w_grd_col_referencia_pai + ""];
            if($(w_el).closest("tr").attr('data-tree-nivel-referencia') == undefined){
              $(w_el).closest("tr").attr('data-tree-nivel-referencia',w_id_referencia);
            };
            
            if(w_grd_tree_rotina_busca_filhos != ""){
              if(w_grd_tree_rotina_busca_filhos.indexOf("[var_Pai]") >= 0){
                var w_filhos_ajax = _cc.ajax(w_grd_tree_rotina_busca_filhos.replace("[var_Pai]",w_id_referencia), "get");
              }else if(w_grd_tree_rotina_busca_filhos.indexOf("[w_pai]") >= 0){
                var w_filhos_ajax = _cc.ajax(w_grd_tree_rotina_busca_filhos.replace("[w_pai]",w_id_referencia), "get");
              };
            }else{
              var w_grd_tree_url = ccase.url.tabela;
              w_grd_tree_url += "tabela=" + w_grd_tab_nome;
              w_grd_tree_url += "&where=" + w_grd_col_referencia_filho + "="+ w_id_referencia;
              w_grd_tree_url += "&colunas=id, nmsmartpoint, (`SELECT SUM(1) FROM " + w_grd_tab_nome + " x WHERE x." + w_grd_col_referencia_filho + "` = " + w_grd_col_referencia_pai + " ) AS qtFilhos";
              var w_filhos_ajax = _cc.ajax(w_grd_tree_url, "get");
            };
            
            /* QUANDO CARREGAR O AJAX */
            $.when(w_filhos_ajax).then(
              
              /* SUCCESS */
              function(json_resp_filhos){
                w_this.removeAttr("disabled","disabled");
                /*VERIFICA QUEM ESTA COM ZERO*/
                if(json_resp_filhos.data != null && json_resp_filhos.data.length > 0){
                  var w_grd_cols = _ccGrd.load.colunas(w_grd);
                  var w_dados_filhos = json_resp_filhos.data;
                  var w_tr = "";
                  
                  if(w_tree_nivel == undefined){
                    w_tree_nivel=1;
                    w_grd_tree_class_nivel = "cc-grd-tree cc-grd-tree-nivel-" + w_tree_nivel;
                  }else{
                    w_tree_nivel++;
                    w_grd_tree_class_nivel = "cc-grd-tree cc-grd-tree-nivel-" + w_tree_nivel;
                  };

                  // w_grd_cols_col_aux.push("qtFilhos");
                  w_grd_cols.push("qtFilhos");

                  for(var w_dado in w_dados_filhos){
                    var w_pai = $(".cc-grd-tree-link-active").closest("tr").attr("data-tree-nivel-referencia");
                    
                    w_tr += "<tr data-tree-nivel-referencia='" + w_pai + "-" + w_id_referencia + "' class='" + w_grd_tree_class_nivel + "' data-id-referencia-pai='" + w_id_referencia + "' data-dado-id='" + w_dado_id + "' data-tree-nivel='" + w_tree_nivel + "'>";
                    var w_index = 0;
                    for(var w_grd_col in w_grd_cols){

                      var w_col = _cc.string.retorna(_ccPrp.consulta(w_grd_cols[w_grd_col],"COL_NOME"),1);
                      var w_grd_td_align_class = "text-left";
                      var w_grd_td_align = _ccPrp.consulta(w_grd_cols[w_grd_col],"COL_GRID_ALINHAMENTO_H");
                      if(w_grd_td_align == 1){w_grd_td_align_class = "text-left";};
                      if(w_grd_td_align == 2){w_grd_td_align_class = "text-center";};
                      if(w_grd_td_align == 3){w_grd_td_align_class = "text-right";};
                      if(w_grd_td_align == 4){w_grd_td_align_class = "text-justify";};

                      /* DADO */
                      var w_grd_td_dado = w_dados_filhos[w_dado][w_col];

                      if(_ccPrp.consulta(w_grd_cols[w_grd_col],"ROTINA_CARGA") != ""){
                        var w_inp_rotina_carga = _ccPrp.consulta(w_grd_cols[w_grd_col],"ROTINA_CARGA")
                        if(w_inp_rotina_carga.substr(0,6).toLowerCase().indexOf("tabela") == 0){
                        }else{
                          w_grd_td_dado = _ccDom.load.item.matriz(_ccPrp.consulta(w_grd_cols[w_grd_col],"ROTINA_CARGA"), w_dados_filhos[w_dado][w_col.toLowerCase()]);
                        };
                      };

                      var w_grd_hide_tree_class = "";
                      if(w_grd_cols[w_grd_col] == "qtFilhos"){
                        w_grd_td_dado = w_dados_filhos[w_dado]["qtFilhos"];
                        w_grd_hide_tree_class = " d-none ";
                      };

                      w_tr += "<td class=' " + w_grd_td_align_class + " " + w_grd_hide_tree_class + "' data-grd-col='" + w_grd_cols[w_grd_col] + "'>";
                      w_tr += "<ul class='" + w_grd_tree_class_nivel + " list-unstyled m-0 p-0 d-inline-block'>"
                      w_tr += "<li>";

                      if(w_index == 0){
                        if(w_dados_filhos[w_dado]["qtFilhos"] >= 1){
                          w_tr += "<button class='cc-btn-tree mr-2 border-0 btn-transparent cc-btn-plus text-monospace'>+</button>";
                        }else{
                          w_tr += "<button disabled='disabled' class='cc-btn-tree mr-2 border-0 btn-disabled cc-btn-cinza text-monospace'>&rtrif;</button>";
                        };
                      };

                      w_tr += "<a class='cc-tabela-link-tree-view' onmouseup='_ccGrd.listen(\"" + w_grd + "\", this);' data-grd-inp-val='" + w_dados_filhos[w_dado][w_col] + "' data-grd-inp-id='" + w_dados_filhos[w_dado]["id"] + "'>";
                      w_tr += w_grd_td_dado;
                      w_tr += "</a>";
                      w_tr += "</li>";
                      w_tr += "</ul>";
                      w_tr += "</td>";
                      w_index++;
                    };
                    w_tr += "</tr>";
                  };

                  $(w_tr).insertAfter($(w_el).closest("tr"));
                }else{
                  $(w_el).removeClass("cc-btn-plus").removeClass("cc-btn-minus").html("▶");
                };
              },
              /* ERROR */
              function(error){
                _cc.error(error)
              }
            )
          },
          /* ERROR */
          function(error){
            _cc.error(error)
          }
        );
      });
 
      /* CLICK NO MINIMIZAR */
      $(document).on("click",".cc-btn-tree.cc-btn-minus",function(){
        /* VARIAVEIS */
        var w_el = this,
        w_tree_referencia = $(w_el).closest("tr").attr("data-tree-nivel-referencia"),
        w_grd = $(w_el).closest("table").attr("data-grd");

        /* VARREDURA NOS ITENS DO TREE */
        $("[data-grd='" + w_grd + "'] [data-tree-nivel-referencia]").each(function(){

          /* SE FILHO CONTIVER PAI REMOVE*/
          if($(this).attr("data-tree-nivel-referencia").indexOf(w_tree_referencia) >= 0 && $(this).attr("data-tree-nivel-referencia") != w_tree_referencia){
            $(this).remove();
          };
        });

        /* MUDA O ICONE DE MENOS PRA MAIS */
        $(this).removeClass("cc-btn-minus").addClass("cc-btn-plus").html("+");
      });
    }catch(error){
      _cc.error(error);
    };
  };

  /* LIMPA O DATATBLE */
  this.limpa = function(p_grd){
    if(!$.fn.DataTable.isDataTable("table[data-grd='" + p_grd + "']")){
      var w_table = $("table[data-grd='" + p_grd + "']").DataTable();
      w_table.clear().draw();
    }else{
      $("table[data-grd='" + p_grd + "'] tbody").html("");
    };
  }

};

/* GRID */
var _ccGrd = new _ccaseGrid();

$(document).ready(function(){
	_ccGrd.inicia();
})
