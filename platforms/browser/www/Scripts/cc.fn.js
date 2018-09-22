/***********************************/
/***********************************/
/**            OBJETOS            **/
/***********************************/
/***********************************/

/* CRIA OBJETO */
function cObjCria(p_obj_nome, p_obj_tp, p_obj_seq, p_obj_dsc, p_obj_lote){

  var w_json_insert = "{";
  w_json_insert += "\"OBJ_NOME\" : \"" + p_obj_nome +"\",";
  w_json_insert += "\"OBJ_TP\" : \"" + p_obj_tp + "\",";
  w_json_insert += "\"OBJ_SEQ\" : \"" + p_obj_seq + "\",";
  w_json_insert += "\"OBJ_DSC\" : \"" + p_obj_dsc + "\",";
  w_json_insert += "\"OBJ_LOTE\" : \"" + p_obj_lote + "\"";
  w_json_insert += "}";

  $.ajax({
    url:ccase.url.tabela + "tabela=ccase_obj",
    method:"post",
    contentType: "application/json",
    data:w_json_insert,
    success:function(json_resp_obj){
      _cc.validaResponseAjax(json_resp_obj, ccase.url.tabela + "tabela=ccase_obj");
    }
  });
};

/* CRIA MATRIZ DE OBJETOS: WMOBJETO */
function fObjCriaMatriz(p_sys){
  return _ccM.cria(p_sys);
};

function cObjBuscaPropValor(p_obj_nome, p_prop){
  return _ccPrp.consulta(p_obj_nome, p_prop)
};

/* BUSCA BINARIA */
function cObjbuscaBinaria(p_matriz, p_obj_pesquisa, p_col){
  return _ccObj.busca.binaria(p_matriz, p_obj_pesquisa, p_col);
};


function cObjBuscaSequencial(p_matriz, p_obj_pesquisa, p_col){
  return _ccObj.busca.sequencial(p_matriz, p_obj_pesquisa, p_col);
};
  
/* CONSULTA PROPRIEDADE DE UM OBJETO */ 
function cObjConsultaProp(p_obj_nome, p_prop){
  return _cc.consultaPropriedade(p_obj_nome, p_prop);
};


/************************************/
/************************************/
/**          PROPRIEDADES          **/
/************************************/
/************************************/

function cPropCria(p_obj_nome, p_prp_nome, p_obj_prp_vlr, p_obj_lote){
  _cc.criaPropriedade(p_obj_nome, p_prp_nome, p_obj_prp_vlr, p_obj_lote);
};

/* CRIA RETORNA PROPRIEDADE */
function fconsultaPropriedade(p_obj_nome, p_prop){
  return _cc.consultaPropriedade(p_obj_nome, p_prop);
};

/************************************/
/************************************/
/**           UTILIDADES           **/
/************************************/
/************************************/

/* INDICADORES */
function cIndicadores(p_obj_referencia, p_transacao, p_origemChave){
  _ccInd.carrega(p_obj_referencia, p_transacao, p_origemChave)
};

/* CARREGA REST E ATRIBUI A UMA VARIAVEL GLOBAL */
function fLoadRest(p_var, p_rest){
  
  /* VARIAVEIS */
  var w_var = _cc.replaceParametros(p_var);
  var w_rest_url = _cc.replaceParametros(_cc.replaceAspas(p_rest),1);
  var w_rest_ajax = "";

  w_rest_ajax = _cc.ajax(w_rest_url);
  _cc.loading.show("Carrregando",0,"rest");

  $.when(w_rest_ajax).then(
    function(p_resp_rest){
      _cc.loading.hide("rest");
      _cc.validaResponseAjax(p_resp_rest, w_rest_url);
      window[w_var] = p_resp_rest.data;
    },
    function(error){
      _cc.error(error);
    }
  );
};

/* CSV TO ARRAY */
function CSVToArray( strData, strDelimiter ){
  strDelimiter = (strDelimiter || ",");
  var objPattern = new RegExp(( "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + strDelimiter + "\\r\\n]*))"),"gi");

  var arrData = [[]];
  var arrMatches = null;
  while(arrMatches = objPattern.exec(strData)){
      var strMatchedDelimiter = arrMatches[1];

      if(strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)){
        arrData.push([]);
      };

      if(arrMatches[ 2 ]){
        var strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
      }else{
        var strMatchedValue = arrMatches[ 3 ];
      };
      arrData[ arrData.length - 1 ].push( strMatchedValue );
  }
  return( arrData );
}
  
function fComboDB(p_header, p_tab, p_cols, p_titulos, p_where,p_orderby,p_return_objetos){
  _cc.comboDB(p_header, p_tab, p_cols, p_titulos, p_where,p_orderby,p_return_objetos);
  // _ccInp.comboDB(p_header, p_tab, p_cols, p_titulos, p_where,p_orderby,p_return_objetos);
};

function fLoadGoogleMaps(p_obj_nome){
  _ccApi.google.maps(p_obj_nome);
};

function fLoadGoogleStreetView(p_obj_nome){
  _ccApi.google.streetView(p_obj_nome);
};

function fLoadObj(p_obj_nome, p_param){

  try{
    // _cc.ajaxAbort();
    $("[name='" + p_obj_nome + "']").parent().add("cc-mnu-item-selected");
    
    /* VARIAVEIS */
    var w_obj_pos = "",
    w_obj_tp = "",
    w_obj_nome = _cc.string.retorna(p_obj_nome,1),
    w_param = p_param,
    w_obj_seq = "";

    /* CONTADOR DO LOAD DO GRID */
    window.w_grd_load = 0; 

    /* PARAM */
    if(w_param != ""){
      ccase.global.param = w_param;
    };

    /* VALIDA TOKEN */
    var w_oauth_ajax = _cc.ajax(ccase.url.token + "&tabela=tiacessousuario&complemento=limit 0");
    $.when(w_oauth_ajax).then(
      function(json_resp){
        _cc.validaResponseAjax(json_resp, ccase.url.token + "&tabela=tiacessousuario&complemento=limit 0");

        if(json_resp.cnRetorno == 0){
          
          /* LIMPA O AGRUPADOR DO CONTEUDO */
          $("[name='" + ccase.agrupador.conteudo + "']").html("")
          $(".cc-modal").remove();

          /* BUSCA DO OBJETO */
          w_obj_pos = _ccObj.busca.binaria("wMObjeto",w_obj_nome,0);
          if(w_obj_pos == -1){
            _cc.msg("OBJETO: " + w_obj_nome + " NÃO ENCONTRADO","danger", 10);
          };

          w_obj_tp = wMObjeto[w_obj_pos][1];
          w_obj_seq = wMObjeto[w_obj_pos][3];

          _ccObj.load.objeto(w_obj_nome, w_obj_tp, w_obj_seq);

          setTimeout(function(){
            var w_link_obj_nome = $(".cc-mnu-item-selected a").attr("name");
            var w_titulo = $(".cc-mnu-item-selected a").text();
            var w_link = $(".cc-mnu-item-selected a").attr("onmouseup");

            var w_log_url = ccase.url.log;
            w_log_url += "cnRegTP=3";
            w_log_url += "&cnMensagem=0";
            w_log_url += "&caTransacao=MNU - [" + w_titulo + "] - ACTION:[" +  w_link + "]";
            w_log_url += "&boSucesso=1";
            w_log_url += "&anMensagem=-";
            _cc.ajax(w_log_url);
          },500);
        }else{
          $(".cc-mnu-item-selected").removeClass("cc-mnu-item-selected");
        };
      },
      function(error){
        _cc.error(error);
      }
    );
  }catch(error){
    _cc.error(error);
  };
};

function fImageBase64(p_obj_nome){
  _cc.converteFileToBase64(p_obj_nome);
};

/***
	* 
	* FUNCOES DAS PROPRIEDADES LOAD
	*
***/

function fCarregaObjeto(p_obj_nome){
	_cc.modal.show(p_obj_nome);
};

/* CRIA PROPRIEDADE */
function fCriaPropriedade(p_obj_nome, p_prop, p_prop_val){
  _cc.criaPropriedade(p_obj_nome, p_prop, p_prop_val)
};

/* CRIA PROPRIEDADE */
function fCriaObjeto(p_obj_nome, p_prop, p_prop_val){
	_cc.criaObjetoDinamico(p_obj_nome, p_prop, p_prop_val)
};

/***
	* 
	* FUNCOES DOS GRIDS
	*
***/

/* LIMPA GRID */
function fLimpaGrid(p_grd_nome){
	_ccGrd.limpa(p_grd_nome);	
};

/* LOAD INPUTS */

function fLoadInputsTabela(p_tab){
  try{
    var w_tabela = "";
    $.ajax({
      url: ccase.url.ccasegd + "tabela?tabela=" + p_tab,
      method:"get",
      async:false,
      success(json_resp){
        _cc.validaResponseAjax(json_resp,  ccase.url.ccasegd + "tabela?tabela=" + p_tab);

        if(json_resp.data != null){
          w_tabela = json_resp.data[0];
        }else{
          fMsg("Tabela não encontrada ou sem dados.","normal", 2)
          fMsg(json_resp.anMensagem,"error", 2)
        }
      }
    }); 
  }catch(error){
    _cc.msg("Verifique as informações da tabela", "danger", )
    _cc.error(error);
  };
  
  return w_tabela;
};

function fTrigger(p_obj_nome, p_event){
  _cc.trigger(p_obj_nome, p_event)
};

function fFocus(p_obj_nome){
  _cc.focus(p_obj_nome)
};

// function fObjImportaTabela(p_obj_referencia){
//   var w_max_lote;

//   $.ajax({
//     url:ccase.url.tabela + "tabela=ccase_obj&colunas=max(obj_lote)%2B 1 as wMax",
//     method:"get",
//     async:false,
//     success:function(w_resp_obj){
//       $.ajax({
//          url:ccase.url.tabela + "tabela=ccase_obj_prp&colunas=max(obj_lote)%2B 1 as wMax",
//          method:"get",
//          async:false,
//          success:function(w_resp_prp){
//             w_max_lote = (w_resp_obj.data[0].wMax  > w_resp_prp.data[0].wMax) ? w_max_lote = w_resp_obj.data[0].wMax : w_max_lote = w_resp_prp.data[0].wMax;
//          }
//       });
//     }
//   });

//   var w_json = "[";
//   $("[name='" + p_obj_referencia + "'] .table-import-inputs tbody tr").each(function(w_index, w_element){
//       if($(w_element).find(".checkbox").is(":checked")){
//           w_json += "{\"OBJ_TP\":\"INP\",\"OBJ_REFERENCIA_DATAGRID\":\"" + $("[name='frm_ccaseide.fme_gridobjetoedit.fme_gridimportinputs.inp_obj_ref_datagrid']").val() + "\",";
//           $(w_element).find(":input:not(.checkbox)").each(function(w_index_aux, w_element_aux){
//               var w_element_val = "";
//               if($(w_element_aux).attr("name") == "obj_tp"){

//               }else if($(w_element_aux).attr("name") == "obj_referencia"){
//                 w_element_val = $(w_element_aux).find("option:selected").text();
//               }else{
//                 w_element_val = $(w_element_aux).val();
//               };
//               if($(w_element_aux).closest("td").next().is(':last-child')){
//                   w_json += "\"" + $(w_element_aux).attr("name") + "\" : \"" + w_element_val + "\"";
//               }else{
//                   w_json += "\"" + $(w_element_aux).attr("name") + "\" : \"" + w_element_val + "\",";
//               };
//           });
//           w_json += "},";
//         };
//     });

//     w_json = w_json.substr(0, w_json.length-1) + "]";

//     console.log(w_json)

//     var w_input_list = JSON.parse(w_json);

//     for(var w_input in w_input_list){
//       var w_obj_nome = w_input_list[w_input].obj_referencia + "." + w_input_list[w_input].obj_nome.substr(w_input_list[w_input].obj_nome.lastIndexOf(".")+1);
//       var w_json_insert = "{"
//       w_json_insert += "\"OBJ_SEQ\":\"" + w_input_list[w_input].obj_seq + "\",";
//       w_json_insert += "\"OBJ_NOME\":\"" + w_obj_nome + "\",";
//       w_json_insert += "\"OBJ_TP\":\"INP\",";
//       w_json_insert += "\"OBJ_DSC\":\"" + w_input_list[w_input].descricao + "\","
//       w_json_insert += "\"OBJ_LOTE\":\"" + w_max_lote + "\""
//       w_json_insert += "}";

//       console.log(w_json_insert)

//       $.ajax({
//         url:ccase.url.tabela + "tabela=ccase_obj",
//         method:"post",
//         async:false,
//         contentType: "application/json",
//         data:w_json_insert,
//         success:function(p_json){
          
//           _cc.validaResponseAjax(p_json, ccase.url.tabela + "tabela=ccase_obj");

//           if(p_json.cnRetorno == 0){
//             _cc.msg(p_json.anMensagem,"success",2);

//             var w_inp_props = w_input_list[w_input];
//             for(var w_inp_prop in w_inp_props){
//               var w_json_insert_prop = "";
//               if($.trim(w_inp_prop.toLowerCase()) == "obj_nome"){
//                  w_json_insert_prop = "{\"OBJ_NOME\" : \""+ w_obj_nome +"\",\"PRP_NOME\" : \"OBJ_NOME\",\"OBJ_PRP_VLR\" : \""+ w_obj_nome +"\",\"OBJ_LOTE\" : \""+ w_max_lote +"\"}";
//               }else{
//                 w_json_insert_prop = "{\"OBJ_NOME\" : \""+ w_obj_nome +"\",\"PRP_NOME\" : \"" +  w_inp_prop.toUpperCase() + "\",\"OBJ_PRP_VLR\" : \""+ w_inp_props[w_inp_prop]  +"\",\"OBJ_LOTE\" : \""+ w_max_lote  +"\"}";
//               };
   
//               $.ajax({
//                 url:ccase.url.tabela + "tabela=ccase_obj_prp",
//                 method:"post",
//                 contentType: "application/json",
//                 data:w_json_insert_prop,
//                 success:function(p_json_prop){
                  
//                   _cc.validaResponseAjax(p_json_prop, ccase.url.tabela + "tabela=ccase_obj_prp");
                  
//                   if(p_json_prop.cnRetorno == 0){
//                     _cc.msg(p_json_prop.anMensagem,"success",2);
//                   }else{
//                     _cc.msg(p_json_prop.anMensagem,"error",2);
//                   };
//                 },
//                 error:function(error){
//                   _cc.error(error);
//                 }
//               });
//             };
//           }else{
//             _cc.msg(p_json.anMensagem,"error",2);
//           };
//         },
//         error:function(error){
//           _cc.error(error);
//         }
//       });
//     }
//     return w_json;
// };

function fCarregaOptionsObjetos(p_obj_referencia, p_obj_tp){
  var w_dominio_option_lista = "";

    //AJAX DOMINIO OPTION LISTA
    $.ajax({
      url:ccase.url.consulta.objeto + "pobjNome=" + p_obj_referencia +"%&pboAtivo=1&pobjTp=" + p_obj_tp + "&pOrderBy=OBJ_NOME",
      method:"get",
      async:false,
      success:function(json_resp_dominio){

        _cc.validaResponseAjax(json_resp_dominio, ccase.url.consulta + "pobjNome=" + p_obj_referencia +"%&pboAtivo=1&pobjTp=" + p_obj_tp + "&pOrderBy=OBJ_NOME");

        //FOR OPTION IN DOMAIN JSON
        var w_options = json_resp_dominio.data;

        for(var w_option in w_options){
          w_dominio_option_lista += "<option value=\"" + w_options[w_option].OBJ_NOME + "\">" + w_options[w_option].OBJ_NOME + "</option>";
        };

      },
      error:function(error){
        _cc.error(error);
      }
    });

    //RETURN = OPTION LISTA DOMINIO
    return w_dominio_option_lista;
}

function fCriaTabelaInputs(p_inputs, p_obj_referencia){

  var w_input_list = p_inputs.COLUNAS;
  
  /* COLUNAS DO CABECALHO */
  var w_input_thead = 
  ["obj_seq",
   "col_grid",
   "col_virtual",
   "col_grid_ordem",
   "col_grid",
   "input_tp",
   "col_tp",
   "obj_nome",
   "obj_referencia",
   "col_nome",
   "colspan",
   "titulo",
   "descricao"];
  var w_table = "<table class='minw-100 table-import-inputs table table-hover table-striped table-bordered table-sm'>";
  
      w_table += "<thead class='thead-dark'>";
      w_table += "<tr>";
      w_table += "<th style='width:30px' class='text-center'></th>";
      for(var w_th_propridade in w_input_list[0]){
          if(w_input_thead.indexOf(w_th_propridade.toLowerCase()) >= 0){
              var w_th_style = "";
              if(w_th_propridade.toLowerCase() == "obj_nome"){
                var w_th_style = "display:none;";
              };
              if(w_th_propridade.toLowerCase() == "obj_seq" || w_th_propridade.toLowerCase() == "colspan" || w_th_propridade.toLowerCase() == "input_tp"){
                  var w_width = "40px";
              }else{
                  var w_width = "";
              }
              w_table += "<th style='width:" + w_width + ";" + w_th_style + "' class='text-center'> " + w_th_propridade + " </th>";    
          };
      };
      w_table += "<th style='width:40px;' class='text-center'><input type='checkbox'></th>";    
      
      w_table += "</tr>";
      w_table += "</thead>";
  
      /* CABECALHO */
      w_table += "<tbody>"
      var w_width_td = "auto";
      var w_index = 1;
      for(var w_td in w_input_list){

          w_table += "<tr class='pt-3 pb-3'>";
          w_table += "<td class='text-center'><p class='mb-0 mt-1 cc-text-verde'><small>" + w_index +  "</small></p></td>";    
          for(var w_td_propriedade in w_input_list[w_td]){
              if(w_input_thead.indexOf(w_td_propriedade.toLowerCase()) >= 0){
                  var w_td_style = "";
                  if(w_td_propriedade.toLowerCase() == "obj_nome"){
                    var w_td_style = "display:none;"
                  };

                  var w_obj_referencia = "";
                  if(w_td_propriedade.toLowerCase() == "obj_referencia"){
                    w_obj_referencia = $("[name='frm_ccaseide.fme_gridobjetoedit.fme_gridimportinputs.inp_objetoreferencia_inputs']")[0].outerHTML;
                  };

                  if(w_td_propriedade.toLowerCase() == "obj_seq" || w_td_propriedade.toLowerCase() == "colspan"){
                      w_width_td = "30px";
                  }else{
                      w_width_td = "auto";
                  };
                  var w_td_readonly = "";
                  if(w_td_propriedade.toLowerCase() == "obj_nome" || w_td_propriedade.toLowerCase() == "col_nome" || w_td_propriedade.toLowerCase() == "descricao" ){
                    w_td_readonly = "readonly='readonly'"
                  };

                  var w_input = ""
                  if(w_obj_referencia != ""){
                    w_input = "<div class='form-group mb-0'>" + w_obj_referencia + "</div>";
                  }else{
                    w_input = "<div class='form-group mb-0'><input " + w_td_readonly + "  name='" + w_td_propriedade.toLowerCase() + "' type='text' class='form-control' value='" + w_input_list[w_td][w_td_propriedade] + "'></div>";
                  }
                  w_table += "<td style='width:" +  w_width_td + ";" + w_td_style +"'  class='text-center'>" + w_input + "</div></td>";    
              };
          }
          w_table += "<td style='width:40px' class='text-center'><div class='form-control'><input type='checkbox' class='checkbox' value='' checked='checked'></div></div></td>";    
          w_table += "</tr>";   
          w_index++; 
      };

      w_table += "</tbody>"
  /* CORPO */

  w_table += "</table>";

  if($("[name='" + p_obj_referencia + "']").find(".table-import-inputs").length > 0){
  	$("[name='" + p_obj_referencia + "']").find(".table-import-inputs").remove();
  	$("[name='" + p_obj_referencia + "']").append(w_table);
  }else{
  	$("[name='" + p_obj_referencia + "']").append(w_table);
  };

  $(".table-import-inputs tbody select").removeAttr("id").attr("name","obj_referencia");

  /* EVENTO CLICK DO :CHECKBOX PARA DES/SELECIONAR TODOS */
  /**** ****/
  $(document).on({
    change:function(){
      if($(this).is(":checked") == true){
        $(".table-import-inputs tbody :checkbox").attr("checked","checked");
      }else{
        $(".table-import-inputs tbody :checkbox").removeAttr("checked");
      };
    }
  },".table-import-inputs thead :checkbox");

  $(".table-import-inputs tbody [name='col_grid_ordem']").val('');
  $(".table-import-inputs tbody [name='col_grid']").val('');

  $(document).on({
    blur:function(){
      if($(this).val() != ""){
        $(this).closest("tr").find("[name='col_grid']").val("1");
      }else if($(this).val() == ""){
        $(this).closest("tr").find("[name='col_grid']").val("");
      }
    }
  },"[name='col_grid_ordem']");
};

/***
	* 
	* FUNCOES DE CONTEUDO E ATRIBUICOES
	*
***/

/* CRIA NOVO OBJ */
function fCriaObjeto(){
	var w_json_propriedades = "{\"data\":{\"frm_workflow.fme_followup.fmebotoes.btn_11\":{\"OBJ_NOME\":\"frm_workflow.fme_followup.fmebotoes.btn_11\",\"BOTAO_ACAO_PADRAO\":\"0\",\"OBJ_REFERENCIA\":\"frm_workflow.fme_followup.fmebotoes\",\"COLSPAN\":\"3\",\"TITULO\":\"Botão 11\",\"QUEBRA_LINHA\":\"2\"}}}";
	_cc.criaObjeto("frm_workflow.fme_followup.fmebotoes.btn_11", "BTN", "1", JSON.parse(w_json_propriedades));
};

/* CRIA RETORNA PROPRIEDADE */
function fRetornaPropriedade(p_obj_nome, p_prop){
  return _cc.retornaPropriedade(p_obj_nome, p_prop);
};

function fReplaceConteudo(p_obj){
	$("[name='" + p_obj.toLowerCase() + "']").html(_cc.replaceParametros($("[name='" + p_obj.toLowerCase() + "']").html()));
};

/* FUNCAO DE PROPRIEDADE */
function cProp(p_obj_nome, p_prp, p_valor){
  try{
    /* VARIAVEIS OBJ */
    var w_obj_nome = _cc.string.retorna(p_obj_nome, 1),
    w_obj_tp = _ccPrp.consulta(w_obj_nome, "OBJ_TP"),
    w_obj_pos = _ccObj.busca.binaria();

    /* VARIAVEIS PRP */
    var w_prp = _cc.string.retorna(p_prp, 1);

    /* VARIAVEIS VALOR */
    if(p_valor != undefined){
      w_valor = _cc.string.retorna(p_valor);
    }else{
    };

    /* ACAO PROPRIEDADES */
    if(w_prp == "obj_referencia"){}
    if(w_prp == "extra_class"){}
    if(w_prp == "alinhamento_h"){}
    if(w_prp == "value"){}
    if(w_prp == "hidden"){}
    if(w_prp == "readonly"){}
    if(w_prp == "titulo"){}
    if(w_prp == "colspan"){}
    if(w_prp == "rowspan"){}
    if(w_prp == "quebra_linha"){}
    if(w_prp == "tab_nome"){}
    if(w_prp == "botao_acao_padra"){}


  }catch(error){
    _cc.error(error)
  }
}
function fProp(p_obj_nome, p_prp, p_prp_vlr){
  try{
    /* VARIAVEIS */
    var w_obj_nome = _cc.string.retorna(p_obj_nome,1),
    w_prp = _cc.replaceParametros(_cc.string.retorna(p_prp, 2)),
    w_valor = _cc.string.retorna(p_prp_vlr),
    w_obj = "[name='" + w_obj_nome + "']",
    w_return = "";

    /* VARIAVEIS PARA AS MATRIZES*/
    /* ID DO OBJ */
    var w_obj_pos = _ccObj.busca.binaria("wMObjeto",w_obj_nome,0);
    var w_obj_id = "";
    if(w_obj_pos != -1){
      w_obj_id = wMObjeto[w_obj_pos][2];  
    };

    /* ID DO PRP */
    var w_prp_pos = _ccObj.busca.sequencial("wMObjetoPropriedades",w_prp,1);
    var w_prp_id = "";
    if(w_prp_pos != -1){
      w_prp_id = wMObjetoPropriedades[w_prp_pos][0];
    };

    /* VALIDACAO DE OBJ */
    if(w_obj_nome == ""){
      _cc.msg("Informe um OBJETO para fazer a mudança de PROPRIEDADE", "danger",10);
      return false;
    };

    /* VALIDACAO DE PROPRIEDADE */
    if(w_prp == ""){
      _cc.msg("Informe uma PROPRIEDADE para fazer a mudança no OBJETO", "danger",10);
      return false;
    };

    /* ATRIBUICAO */
    if(w_valor != ""){
      /* IF VALUE */
      if(w_prp == "VALUE"){ 
        /* VERIFICA SE É INPUT */
        if($(w_obj).attr("data-inp") == "true"){
          $(w_obj).val(w_valor).change();
        }else{
          $(w_obj).html(w_valor);
        };
      };
      if(w_prp == "DISABLE" || w_prp == "READONLY"){
        /* IF INPUT */
        if($(w_obj).closest(".cc-inp").length >= 1){
          if(w_valor == "0"){
            $(w_obj).closest(".cc-inp").find(":input").removeAttr("readonly");
          }else if(w_valor == "1"){
            $(w_obj).closest(".cc-inp").find(":input").attr("readonly","readonly");
          };
        }else{
          if(w_valor == 0){
            $("[data-fld-obj-nome='" + w_obj_nome + "']").removeClass("cc-fld-readonly")
          }else{
            $("[data-fld-obj-nome='" + w_obj_nome + "']").addClass("cc-fld-readonly")
          };
        };
      };

      /* IF HIDDEN */
      if(w_prp == "HIDDEN"){
        /* ALTERA NA MATRIZ */
        /* IF INPUT */
        if($(w_obj).closest(".cc-inp").length >= 1){
          if(w_valor == "0"){ 
            $(w_obj).closest(".cc-inp").removeClass("d-none");
          }else if(w_valor == "1"){
            $(w_obj).closest(".cc-inp").addClass("d-none");
          };
        /* IF BUTTON */
        }else if($(w_obj).attr("data-btn") == "true"){
          if(w_valor == "0"){ 
            $(w_obj).removeClass("d-none");
          }else if(w_valor == "1"){
            $(w_obj).addClass("d-none");
          };
        /* IF GRID */
        }else if($(w_obj).closest(".cc-grd").length >= 1){
          if(w_valor == "0"){ 
            $(w_obj).closest(".cc-grd").removeClass("d-none");
          }else if(w_valor == "1"){
            $(w_obj).closest(".cc-grd").addClass("d-none");
          };
        /* IF FME */
        }else if($(w_obj).hasClass("cc-fme")){
          /* IF COLLAPSE */
          if($(w_obj).hasClass("cc-fme-collapse")){
            if(w_valor == "0"){ 
              $("[data-fme-collapse-obj-nome='" + w_obj_nome + "']").removeClass("d-none");
            }else if(w_valor == "1"){
              $("[data-fme-collapse-obj-nome='" + w_obj_nome + "']").addClass("d-none");
            };
          }else{
            if(w_valor == "0"){ 
              $(w_obj).removeClass("d-none");
            }else if(w_valor == "1"){
              $(w_obj).addClass("d-none");
            };
          };
        /* IF FLD */
        }else if($(w_obj).attr("data-fld-obj-nome") != ""){
          if(w_valor == "0"){ 
            $("li[data-fld-obj-nome='" + w_obj_nome + "']").removeClass("d-none");
          }else if(w_valor == "1"){
            $("li[data-fld-obj-nome='" + w_obj_nome + "']").addClass("d-none");
          };
        }
      };
    }else{
      /* RETRIBUI VALOR */
      w_return = $(w_obj).val();
    };

    /* TRANSFORMA O NULO EM VAZIO */
    if(w_return == null){
      w_return = "";
    };

    return w_return;
  }catch(error){
    _cc.error(error);
  }
};

//CONVERT FUNCTIONS
function fAttrib(p_input, p_val){
	var w_val = "";
	w_val = eval("'" + pf_val + "'");
	
	if(w_val == "null"){
		w_val = "";
	};

	if($("[name='" + $.trim(p_input.toLowerCase()) + "'").attr("data-inp-tp") == "date"){
		w_val = _cc.converteData(w_val, "DD/MM/YYYY");
	};
	if($("[name='" + $.trim(p_input.toLowerCase()) + "'").attr("data-inp-tp") == "datetime"){
		w_val = _cc.converteData(w_val, "DD/MM/YYYY HH:mm:ss");
	};

	if($("[name='" + $.trim(p_input.toLowerCase()) + "'").attr("data-inp-tp") == "html"){
		$("[name='" + $.trim(p_input.toLowerCase()) + "'").html(w_val);
	}else if($("[name='" + $.trim(p_input.toLowerCase()) + "'").attr("data-inp-tp") == "image"){
    $("[name='" + $.trim(p_input.toLowerCase()) + "'").html(w_val);
  }else{
		$("[name='" + $.trim(p_input.toLowerCase()) + "'").val(w_val);
	}
};

function fCep(p_el, p_tp, p_objs_retorno){
  _cc.cep.busca(p_el, p_tp, p_objs_retorno)
};

/* VALIDA */
function fvalidaCaracteresEspeciais(p_obj_nome){
  _cc.regExpChar(p_obj_nome);
};


/* CONDICOES LOGICAS */
function iIf(p_condicao, p_then , p_else){
	if(eval(p_condicao)){
		eval(p_then);
	}else{
		if(p_else != undefined || $.trim(p_else) != ""){
			eval(p_else);
		};
	};
};

/* MENSAGEM */
function fMontaTabela(p_rest, p_grd_col, p_grd_dados){
	return _ccGrd.criaTabelaEstatica(p_rest, p_grd_col, p_grd_dados);
};

/* MENSAGEM */
function cMsg(p_msg){
  _cc.msg(p_msg, "normal", 10)
};

function fMsg(p_msg, p_status, p_delay){
	_cc.msg(p_msg, p_status, p_delay)
};

function cMsgSN(p_msg, p_callback){
	var w_confirm = confirm(p_msg) 
  if(w_confirm) {
      eval(p_callback)
  };
};

function fToTop(){
  $("html,body").animate({scrollTop: 0}, 500);
};

function fGetOptionText(p_obj_nome){
  p_obj_nome = _cc.string.retorna(p_obj_nome, 1);
  return document.getElementById(p_obj_nome).options[document.getElementById(p_obj_nome).selectedIndex].text
};

function fMedia(p_objetos){
  /* VARIAVEIS */
  var w_objetos = p_objetos.split(","),
  w_divisor = w_objetos.length,
  w_media = "",
  w_soma = 0;

  if(w_objetos.length > 0){
    for(var w_item in w_objetos){
      var w_valor = "";
      if(_ccPrp.consulta(_cc.string.retorna(w_objetos[w_item],1),"MASCARA") == "money"){
        w_valor = _ccPlugin.mask.retorna(_cc.string.retorna(w_objetos[w_item],1));
      }else{
        w_valor = $("[name='" + _cc.string.retorna(w_objetos[w_item],1) + "']").val();
      };

      if(w_valor == ""){
        w_divisor = w_divisor - 1;
        w_valor = 0;
      };
      w_soma += parseFloat(w_valor);
    }

    w_media = w_soma / w_divisor;
  };

  return w_media.toFixed(2);
};

