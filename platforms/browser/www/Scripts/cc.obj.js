var _ccaseObjeto = function(){
  this.busca = {
    binaria:function(p_m, p_obj_pesquisa, p_col){
      try{
        p_m = window[""+ p_m + ""];
        var w_obj_comparacao,
        w_index,
        w_qtd = 0,
        w_meio,
        w_m_total = p_m.length - 1,
        w_pos = -1,
        w_pos1 = 0,
        w_pos2 = w_m_total,
        w_meio = 0;
        //  var p_col = 0;

        if(p_col == undefined){p_col = 0;};

        for(var w_index = 0; w_index < w_m_total; w_index++){
          w_qtd = (w_pos2 - w_pos1) + 1;
          w_meio = (w_qtd / 2);

          if(w_meio != parseInt(w_meio)){
            w_meio = parseInt(w_meio) + 1;
          };

          w_meio = (w_meio + w_pos1) - 1;
          if(w_meio == -1){
            break;
          };

          if(p_m[w_meio] == undefined){
          }
          w_obj_comparacao = p_m[w_meio][p_col]
          
          /* ACHOU O OBJETO */
          if(p_obj_pesquisa == w_obj_comparacao){
            w_pos = w_meio;

            /* ACHOU E VAI PRA PRIMEIRA OCORRENCIA */
            for(var w_index2 = w_pos; w_index2 >= 0; w_index2--){
              w_obj_comparacao = p_m[w_index2][p_col]
              if(p_obj_pesquisa == w_obj_comparacao){
                  w_pos = w_index2;
                  continue;
              }else{
                break;
              };
            }
            break;
          }else{
            /* NAO ENCONTROU E CONTINUA */
            if(w_pos1 == w_pos2){
              continue;
            }; 
            
            if(p_obj_pesquisa < w_obj_comparacao){
               w_pos1 = w_pos1;
               w_pos2 = w_meio - 1;
            }else{
               w_pos1 = w_meio + 1;
               w_pos2 = w_pos2;
            };
          };
        };

        /* RETORNA A POSICAO */
        return w_pos;
      }catch(error){
        _cc.msg("Erro ao fazer a busca binária","danger",10);
        _cc.error(error);
      }
    },
    sequencial:function(p_m, p_obj_pesquisa, p_col){
      try{
        /* VARIAVEIS */
        p_m = window[p_m];
        p_obj_pesquisa = _cc.string.retorna(p_obj_pesquisa,1);
        
        var w_obj_comparacao = "",
        w_index,
        w_qtd = 0,
        w_m_total = p_m.length,
        w_pos = -1,
        w_pos1 = 0,
        w_pos2 = w_m_total,
        w_meio = 0;
        //  var p_col = 0;

        if(p_col == undefined) {p_col = 0;};

        for(var w_index = 0; w_index < w_m_total; w_index++){
          w_obj_comparacao = _cc.string.retorna(p_m[w_index][p_col],1);
          if(p_obj_pesquisa == w_obj_comparacao){
              w_pos = w_index;
              break;
           };
        };

        return w_pos;
      }catch(error){
        _cc.msg("Erro ao fazera busca sequencial","danger",10);
        _cc.error(error);
      };
    }
  };

  /* OBJ > CRIA */
  this.cria = function(p_obj_nome, p_obj_tp, p_obj_seq, p_json_resp_obj){
    /* OBJETO TIPO */
    var w_obj_tp = _cc.string.retorna(p_obj_tp,1);

    /* FORM */
    if(w_obj_tp == "frm"){
      _ccFrm.cria(p_obj_nome);
    };

    /* FRAME */
    if(w_obj_tp == "fme"){
      _ccFme.cria(p_obj_nome);
    };

    /* TABS */
    if(w_obj_tp == "fld"){
      if(ccase.matriz.fld["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.fld["" + p_obj_nome + ""])
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.fld["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccFld.cria(p_obj_nome);
    };

    /* MENU */
    if(w_obj_tp == "mnu"){
      if(ccase.matriz.mnu["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.mnu["" + p_obj_nome + ""])
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.mnu["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccMnu.cria(p_obj_nome);
    };

    /* GRIDS */
    if(w_obj_tp == "grd"){
      if(ccase.matriz.grd["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.grd["" + p_obj_nome + ""])
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.grd["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccGrd.cria(p_obj_nome);
    };

    /* INPUT */
    if(w_obj_tp == "inp"){
      if(ccase.matriz.inp["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.inp["" + p_obj_nome + ""])
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.inp["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccInp.cria(p_obj_nome);
    };

    /* SAY */
    if(w_obj_tp == "say"){
      _ccSay.cria(p_obj_nome);
    };

    /* BUTTON */
    if(w_obj_tp == "btn"){
      if(ccase.matriz.btn["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.btn["" + p_obj_nome + ""]);
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.btn["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccBtn.cria(p_obj_nome);
    };

    /* HTML */
    if(w_obj_tp == "htm"){
      if(ccase.matriz.htm["" + p_obj_nome + ""] != undefined){
        delete(ccase.matriz.htm["" + p_obj_nome + ""])
      };
      if(p_json_resp_obj != ""){
        ccase.matriz.htm["" + p_obj_nome + ""] = p_json_resp_obj.data["" + p_obj_nome + ""];
      };
      _ccHtml.cria(p_obj_nome);
    };
  };

  this.load = {
    objeto:function(p_obj_nome, p_obj_tp, p_obj_seq){
      // console.log("p_obj_tp",p_obj_tp, "p_obj_nome", p_obj_nome)
      
      if(_cc.string.retorna(p_obj_tp) == ""){
        p_obj_tp = _ccPrp.consulta(p_obj_nome,"OBJ_TP");
      };

      if(_cc.string.retorna(p_obj_seq) == ""){
        p_obj_seq = _ccPrp.consulta(p_obj_nome,"OBJ_SEQ");
      };
      
      if(p_obj_nome == ""){ 
        return false;
      };

      var w_carrega_objeto = _ccObj.retorna.json(_cc.string.retorna(p_obj_nome,1));
      // console.log(w_carrega_objeto)

      /* EXECUTA QUANDO CARREGAR O OBJETO */  
      $.when(w_carrega_objeto).then(
        
        /* SUCCESS */
        function(json_resp_obj){
          try{
            /* MATRIZ */
            var w_obj = json_resp_obj.data["" + _cc.string.retorna(p_obj_nome, 1) + ""]
            /* CRIA OBJETO */
            if(_cc.string.retorna(w_obj) != ""){
              if(w_obj.OBJ_TP != undefined){
                _ccObj.cria(_cc.string.retorna(w_obj.OBJ_NOME,1), w_obj.OBJ_TP, w_obj.OBJ_SEQ, json_resp_obj);
              };
            };

            /* CARREGA FILHOS */
            _ccObj.load.filhos(p_obj_nome);
          }catch(error){
            _cc.error(error);
          }
        },
        /* ERROR */
        function(error){
          _cc.error(error);
        }
      );
    },
    filhos:function(p_obj_nome){
      /* CARREGA FILHOS */
      var w_obj_filhos = _ccObj.retorna.filhos(_cc.string.retorna(p_obj_nome,1));

      /* EXECUTA QUANDO CARREGAR O OBJETO */  
      $.when(w_obj_filhos).then(
        
        /* SUCCESS */
        function(json_resp_obj_filhos){

          /* VARIAVEIS */
          var w_filhos = json_resp_obj_filhos.data;
          if(w_filhos != null){
            for(var w_filho in w_filhos){
              /* VARIAVEIS */
              var w_filho_obj_nome = w_filhos[w_filho].obj_nome,
              w_filho_obj_tp = w_filhos[w_filho].obj_tp,
              w_filho_obj_seq = w_filhos[w_filho].obj_seq;

              /* TRATA SE AS PROPRIEDADES VEM UPPER OU LOWER */
              if(w_filho_obj_nome == undefined){
                w_filho_obj_nome = _cc.string.retorna(w_filhos[w_filho].OBJ_NOME,1);
              };
              if(w_filho_obj_tp == undefined){
                w_filho_obj_tp = w_filhos[w_filho].OBJ_TP
              };
              if(w_filho_obj_seq == undefined){
                w_filho_obj_seq = w_filhos[w_filho].OBJ_SEQ
              };
              /* CARREGA O OBJETO FILHO */
              _ccObj.load.objeto(w_filho_obj_nome, w_filho_obj_tp, w_filho_obj_seq)
            };
          };
        },
        function(error){
          _cc.error(error);
        }
      );
    }
  }

  /* OBJ > CARREGA DA MATRIZ E GERA O JSON */
  this.retorna = {
    json:function(p_obj_nome){
      try{
        /* VARIAVEIS */
        var w_col = 0,
        w_m = wMObjeto,
        w_pos = _ccObj.busca.binaria("wMObjeto", p_obj_nome, w_col),
        w_str_json = "",
        w_prp_vlr = "";

        /* VALIDACAO DO RESULTADO DO SCAN */
        if(w_pos == -1){
          if(_cc.string.retorna(p_obj_nome, true) != ""){
            _cc.msg("Objeto " + p_obj_nome + " não encontrado!");
          };

          return false;
        };

        w_str_json += "{\"data\":{";
        w_str_json += "\"" + $.trim(w_m[w_pos][0]) + "\":{";
        w_str_json += "\"ID\":" + "\"" + $.trim(w_m[w_pos][2]) + "\",";
        w_str_json += "\"OBJ_NOME\":" + "\"" + $.trim(w_m[w_pos][0]) + "\",";
        w_str_json += "\"OBJ_TP\":" + "\"" + $.trim(w_m[w_pos][1]) + "\",";
        w_str_json += "\"OBJ_SEQ\":" + "\"" + $.trim(w_m[w_pos][3]) + "\",";
        var w_obj_tp = $.trim(w_m[w_pos][1]);
        if(w_obj_tp == ""){
          _cc.msg($.trim(w_m[w_pos][0]) + " sem OBJ_TP na CCASE_OBJ","danger",10)
          console.log($.trim(w_m[w_pos][0]) + " sem OBJ_TP na CCASE_OBJ")
          w_obj_tp = "INP";
        };
        // w_str_json += "\"OBJ_TP\":" + "\"" + w_obj_tp + "\",";

        while(w_pos < w_m.length - 1){
          if(w_m[w_pos][0] != p_obj_nome){break;}
          w_prp_vlr = $.trim(w_m[w_pos][5]);
          if(w_prp_vlr.indexOf("\"") >= 0){
            w_prp_vlr = w_prp_vlr.replace(/\"/g,"´");
          };
          w_str_json += "\"" + $.trim(w_m[w_pos][4]) + "\":" + "\"" + w_prp_vlr + "\"," 
          w_pos++;
        };
        w_str_json = w_str_json.substr(0,w_str_json.length-1) + "}}}";
        if(w_str_json.indexOf("\n") >= 0){
          w_str_json = w_str_json.replace(/\n/g, "\\n");
        };
        return JSON.parse(w_str_json);
      }catch(error){
        _cc.error(error);
      };
    },
    filhos:function(p_obj_nome){
      /* VARIAVEIS */
      var w_col = 5,
      w_m = wMObjetoReferencia,
      w_pos = _ccObj.busca.binaria("wMObjetoReferencia", p_obj_nome, w_col),
      w_str_json = "",
      w_prp_vlr = "";

      /* VALIDACAO DO RESULTADO DO SCAN */
      if(w_pos == -1){
        return false;
      };

      w_str_json += "{\"data\":[";
      // while(w_pos < w_m.length - 1){
      while(w_pos < w_m.length){
        
        if(_cc.string.retorna(w_m[w_pos][5]) != p_obj_nome){break;};

        w_str_json += "{";
        w_str_json += "\"ID\":" + "\"" + $.trim(w_m[w_pos][2]) + "\",";
        w_str_json += "\"OBJ_NOME\":" + "\"" + $.trim(w_m[w_pos][0]) + "\",";
        w_str_json += "\"OBJ_TP\":" + "\"" + $.trim(w_m[w_pos][1]) + "\",";
        w_str_json += "\"OBJ_SEQ\":" + "\"" + $.trim(w_m[w_pos][3]) + "\",";
        w_str_json += "\"OBJ_REFERENCIA\":" + "\"" + $.trim(w_m[w_pos][5]) + "\"";
        w_str_json += "},";
        w_pos++;
      };

      w_str_json = w_str_json.substr(0,w_str_json.length-1) + "]}";
      if(w_str_json.indexOf("\n") >= 0){
        w_str_json = w_str_json.replace(/\n/g, "\\n");
      };
    
      return JSON.parse(w_str_json);
    }
  };
};

var _ccObj = new _ccaseObjeto();