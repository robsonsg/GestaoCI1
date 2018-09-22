/* MATRIZES */
var _ccaseMatriz = function(){
  this.cria = function(p_sys){
    try{
      /* VARIAVEIS */
      var w_return = "LOAD: " + p_sys,
      w_dfd_m = $.Deferred(),
      wMObjetoAux = [];

      /* URLS */
      window.wMObjetoBoLoad = 0;
      window.wMObjetoReferenciaBoLoad = 0;
      window.wMObjetoPropriedadesBoLoad = 0;
      window.wMPerfilSegmentoBoLoad = 0;
      window.wMPerfilUsuarioBoLoad = 0;
      window.wMObjetoDominioBoLoad = 0;
      window.wMObjetoDominioOldBoLoad = 0;
      window.wMObjetoReferenciaDatagridBoLoad = 0;
      window.wMObjetoForeignKeyBoLoad = 0;
      window.wMObjetoPropriedadesDefaultBoLoad = 0;

      var wMObjetoUrl = ccase.url.matriz.objeto.replace("[p_sys]",p_sys),
      wMObjetoReferenciaUrl = ccase.url.matriz.referencia.replace("[p_sys]",p_sys),
      wMObjetoPropriedadesUrl = ccase.url.matriz.propriedade,
      wMPerfilSegmentoUrl = ccase.url.matriz.perfilSistemaSegmento,
      wMPerfilUsuarioUrl = ccase.url.matriz.perfilSistemaUsuario,
      wMObjetoDominioUrl = ccase.url.matriz.dominio,
      wMObjetoDominioOldUrl = ccase.url.matriz.dominioAntigo,
      wMObjetoReferenciaDatagridUrl = ccase.url.matriz.referenciaDatagrid.replace("[p_sys]",p_sys),
      wMObjetoForeignKeyUrl = ccase.url.matriz.foreignKey,
      wMObjetoPropriedadesDefaultUrl = ccase.url.matriz.propriedadeDefault;

      window.wMObjetoDominioControl = 0;
      window.wMObjetoDominioOldControl = 0;
      window.wMObjetoControl = 0;

      /* AJAX */
      var wMObjetoAjax,
      wMObjetoPropriedadesAjax,
      wMPerfilSegmentoAjax,
      wMPerfilUsuarioAjax,
      wMObjetoReferenciaAjax,
      wMObjetoDominioAjax,
      wMObjetoDominioOldAjax,
      wMObjetoReferenciaDatagridAjax,
      wMObjetoForeignKeyAjax,
      wMObjetoPropriedadesDefaultAjax,
      wMObjetoAux;

      /* 1 - MATRIZ DE OBJETOS */
      if(typeof wMObjeto != "object"){window.wMObjeto = [];};
      if(typeof wMObjetoId != "object"){window.wMObjetoId = [];};

      /* 2 - MATRIZ DE PROPRIEDADES */
      if(typeof wMObjetoPropriedades != "object"){window.wMObjetoPropriedades = [];};

      /* 3 - MATRIZ DE PERFIL */
      if(typeof wMPerfilSegmento != "object"){window.wMPerfilSegmento = [];};
      if(typeof wMPerfilUsuario != "object"){window.wMPerfilUsuario = [];};

      /* 4 - MATRIZ DE OBJETOS DE REFERENCIA (FILHOS) */
      if(typeof wMObjetoReferencia != "object"){window.wMObjetoReferencia = [];};

      /* 5 - MATRIZ DE DOMINIOS (NOVO E ANTIGO)*/
      if(typeof wMObjetoDominio != "object"){window.wMObjetoDominio = [];};
      if(typeof wMObjetoDominioOld != "object"){window.wMObjetoDominioOld = [];};

      /* 6 - MATRIZ DE OBJETOS DE REFERENCIA DATAGRID */
      if(typeof wMObjetoReferenciaDatagrid != "object"){window.wMObjetoReferenciaDatagrid = [];}; 

      /* 7 - MATRIZ DE OBJETOS DE FK */
      if(typeof wMObjetoForeignKeyAux != "object"){window.wMObjetoForeignKeyAux = [];};
      if(typeof wMObjetoForeignKey != "object"){window.wMObjetoForeignKey = [];};

      /* 8 - MATRIZ DE PROPRIEDADES DEFAULT */
      if(typeof wMObjetoPropriedadesDefaultAux != "object"){window.wMObjetoPropriedadesDefaultAux = [];};
      if(typeof wMObjetoPropriedadesDefault != "object"){window.wMObjetoPropriedadesDefault = [];};

      /* 1 - OBJETOS */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoAjax = _cc.ajax(wMObjetoUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Objetos", window.w_dese_trace_info,"");
      /* 2 - PROPRIEDADES */      
      wMObjetoPropriedadesAjax = _cc.ajax(wMObjetoPropriedadesUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Propriedades", window.w_dese_trace_info,"");
      
      /* 3 - PERFIL */

      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMPerfilSegmentoAjax = _cc.ajax(wMPerfilSegmentoUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Perfil Segmento",window.w_dese_trace_info,"");

      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMPerfilUsuarioAjax = _cc.ajax(wMPerfilUsuarioUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Perfil Usuário",window.w_dese_trace_info,"");
      
      /* 4 - OBJETOS DE REFERENCIA (FILHOS) */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoReferenciaAjax = _cc.ajax(wMObjetoReferenciaUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Objetos de Referência",window.w_dese_trace_info,"");
      
      /* 5 - DOMINIOS NOVO  */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoDominioAjax = _cc.ajax(wMObjetoDominioUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Dominios",window.w_dese_trace_info,"");

      /* 6 - DOMINIOS ANTIGO */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoDominioOldAjax = _cc.ajax(wMObjetoDominioOldUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Domínios cCase Antiga ",window.w_dese_trace_info,"");
      
      /* 7 - REFERENCIAS DATAGRID */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoReferenciaDatagridAjax = _cc.ajax(wMObjetoReferenciaDatagridUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ:</strong><br> Objetos Referencia Datagrid ",window.w_dese_trace_info,"");
      
      /* 8 - OBJETOS DE FK */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoForeignKeyAjax = _cc.ajax(wMObjetoForeignKeyUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>FKs ",window.w_dese_trace_info,"");

      /* 9 - PROPRIEDADES DEFAULT */
      
      /* TRACE LOG */
      window.w_dese_trace_info = "cc.m";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      wMObjetoPropriedadesDefaultAjax = _cc.ajax(wMObjetoPropriedadesDefaultUrl,"GET","","","<strong class='cc-bg-preto text-blue'>REST MATRIZ: " + _cc.string.retorna(p_sys,2) + "</strong><br>Propriedades Default (BD)",window.w_dese_trace_info,"");
    
      /* OBJETOS */
      _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
      $.when(wMObjetoAjax).then(
        function(json_resp){
          // console.log("OBJETOS", json_resp)
          try{
            if(typeof json_resp == "string"){
              json_resp = JSON.parse(json_resp)
            };
            _cc.validaResponseAjax(json_resp, wMObjetoUrl);
            if(json_resp.data.length != 0){
              var w_objs = json_resp.data;
              
              for(var w_obj in w_objs){
                var w_m_linha = "";
                for(var w_props in w_objs[w_obj]){w_m_linha += w_objs[w_obj][w_props] + "##";};
                w_m_linha = w_m_linha.substr(0, w_m_linha.length - 2);
                // if(w_m_linha.split("##")[4] != "COL_NOME"){
                  window.wMObjeto.push(w_m_linha.split("##"));
                // };
              };

              for(var w_index = 0; w_index < wMObjeto.length;w_index++){
                if(wMObjeto[w_index][0] != undefined){
                  wMObjeto[w_index][0] = _cc.string.retorna(wMObjeto[w_index][0], 1);
                  wMObjeto[w_index][1] = _cc.string.retorna(wMObjeto[w_index][1], 2);
                  wMObjeto[w_index][4] = _cc.string.retorna(wMObjeto[w_index][4], 2);
                };
              };

              wMObjeto.sort();
              
              for(var w_index = 0; w_index < wMObjeto.length;w_index++){
                if(w_index < wMObjeto.length -1){
                  if(wMObjeto[w_index][0] != wMObjeto[parseInt(w_index)+1][0]){
                    wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "OBJ_NOME", wMObjeto[w_index][0]]);
                    // wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "COL_NOME", wMObjeto[w_index][0].substr(wMObjeto[w_index][0].lastIndexOf(".") + 1)]);
                    // wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "OBJ_TP", wMObjeto[w_index][1]]);
                  };
                };

                if(w_index == wMObjeto.length -1){
                  wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "OBJ_NOME", wMObjeto[w_index][0]]);
                  // wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[ w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "COL_NOME", wMObjeto[w_index][0].substr(wMObjeto[w_index][0].lastIndexOf(".") + 1)]);
                  // wMObjetoAux.push([wMObjeto[w_index][0],wMObjeto[w_index][1], wMObjeto[w_index][2],wMObjeto[w_index][3], "OBJ_TP", wMObjeto[w_index][1]]);
                };
              };

              for(var wObj in wMObjetoAux){wMObjeto.push(wMObjetoAux[wObj]);};
              
              wMObjeto.sort();
              
              /* OBJETO ID */
              for(var wMObjetoIdAux in wMObjeto){
                wMObjetoId.push([wMObjeto[wMObjetoIdAux][2],wMObjeto[wMObjetoIdAux][0],wMObjeto[wMObjetoIdAux][1],wMObjeto[wMObjetoIdAux][3],wMObjeto[wMObjetoIdAux][4],wMObjeto[wMObjetoIdAux][5]])
              };

              wMObjetoId.sort();
            }else{
              // console.log("ERRO ao carregar a matriz");
              w_return = false;
            };
          }catch(error){
            _cc.error(error);
          };

          /* ==================================== >>> */
          
          /* FILHOS */
          _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
          $.when(wMObjetoReferenciaAjax).then(
            function(json_resp_referencia){
              // console.log("OBJETOS DE REFERENCIA",json_resp_referencia);
              if(typeof json_resp_referencia == "string"){
                json_resp_referencia = JSON.parse(json_resp_referencia)
              }
              _cc.validaResponseAjax(json_resp_referencia, wMObjetoReferenciaUrl);
              var w_objs_referencia = json_resp_referencia.data;

              for(var w_obj_referencia in w_objs_referencia){
                var w_m_linha_referencia = "";
                for(var w_props in w_objs_referencia[w_obj_referencia]){w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";};
                w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                window.wMObjetoReferencia.push(w_m_linha_referencia.split("##"));
              };

              for(var w_index_referencia = 0; w_index_referencia < wMObjetoReferencia.length; w_index_referencia++){
                if(wMObjetoReferencia[w_index_referencia][0] != undefined){wMObjetoReferencia[w_index_referencia][0] = _cc.string.retorna(wMObjetoReferencia[w_index_referencia][0], 1)};
                if(wMObjetoReferencia[w_index_referencia][5] != undefined){wMObjetoReferencia[w_index_referencia][5] = _cc.string.retorna(wMObjetoReferencia[w_index_referencia][5], 1)};
                if(wMObjetoReferencia[w_index_referencia][3] != undefined){wMObjetoReferencia[w_index_referencia][3] = parseInt(wMObjetoReferencia[w_index_referencia][3])};
              };

              /* SORT > ORDENACAO */
              wMObjetoReferencia.sort(function(a, b) {
                var o1 = _cc.string.retorna(a[5],1);
                var o2 = _cc.string.retorna(b[5],1);
                var p1 = a[3];
                var p2 = b[3];
                if (o1 < o2) return -1;
                if (o1 > o2) return 1;
                if (p1 < p2) return -1;
                if (p1 > p2) return 1;
                return 0;
             });

              /* ==================================== >>> */

              /* PROPRIEDADES */
              _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
              $.when(wMObjetoPropriedadesAjax).then(
                function(json_resp_propriedades){
                  // console.log("OBJETOS / PROPRIEDADES",json_resp_propriedades);
                  if(wMObjetoPropriedadesBoLoad == 0){
                    if(typeof json_resp_propriedades == "string"){
                      json_resp_propriedades = JSON.parse(json_resp_propriedades)
                    };
                    _cc.validaResponseAjax(json_resp_propriedades, wMObjetoPropriedadesUrl);
                    
                    var w_objs_referencia = json_resp_propriedades.data;
                    for(var w_obj_referencia in w_objs_referencia){
                      var w_m_linha_referencia = "";
                      for(var w_props in w_objs_referencia[w_obj_referencia]){w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";};
                      w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                      window.wMObjetoPropriedades.push(w_m_linha_referencia.split("##"));
                    };

                    wMObjetoPropriedadesBoLoad = 1;
                  }

                  /* ==================================== >>> */

                  /* PERFIL */
                  _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                  $.when(wMPerfilSegmentoAjax).then(
                    function(json_resp_segmento){
                      // console.log("SEGMENTO",json_resp_segmento)
                      if(wMPerfilSegmentoBoLoad == 0){
                        if(typeof json_resp_segmento == "string"){
                          json_resp_segmento = JSON.parse(json_resp_segmento)
                        };
                        _cc.validaResponseAjax(json_resp_segmento, wMObjetoDominioUrl);
                        
                        var w_objs_referencia = json_resp_segmento.data;
                        for(var w_obj_referencia in w_objs_referencia){
                          var w_m_linha_referencia = "";
                          for(var w_props in w_objs_referencia[w_obj_referencia]){
                            w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                          };
                          w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                          window.wMPerfilSegmento.push(w_m_linha_referencia.split("##"));
                        };
                        wMPerfilSegmentoBoLoad++;
                      }

                      // /* ALTERACAO DOS DADOS */
                      // for(var wMPerfilSegmentoIndex in wMPerfilSegmento){
                      //   _ccPrp.altera(wMPerfilSegmento[wMPerfilSegmentoIndex][0], wMPerfilSegmento[wMPerfilSegmentoIndex][1], wMPerfilSegmento[wMPerfilSegmentoIndex][2]);
                      // };

                    },/* wMPerfilSegmento */
                    function(error){
                      _cc.error(error);
                    }
                  );

                  _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                  $.when(wMPerfilUsuarioAjax).then(
                    function(json_resp_perfil_usuario){
                      // console.log("PERFIL USUARIO",json_resp_perfil_usuario)
                      if(wMPerfilUsuarioBoLoad == 0){
                        if(typeof json_resp_perfil_usuario == "string"){
                          json_resp_perfil_usuario = JSON.parse(json_resp_perfil_usuario)
                        };
                        
                        _cc.validaResponseAjax(json_resp_perfil_usuario, wMObjetoDominioUrl);
                        window.wMPerfilUsuario = [];
                        var w_objs_referencia = json_resp_perfil_usuario.data;
                        for(var w_obj_referencia in w_objs_referencia){
                          var w_m_linha_referencia = "";
                          for(var w_props in w_objs_referencia[w_obj_referencia]){
                            w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                          };
                          w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                          window.wMPerfilUsuario.push(w_m_linha_referencia.split("##"));
                        };

                        /* ALTERACAO DOS DADOS */
                        // for(var wMPerfilUsuarioIndex in wMPerfilUsuario){
                        //   _ccPrp.altera(wMPerfilUsuario[wMPerfilUsuarioIndex][0], wMPerfilUsuario[wMPerfilUsuarioIndex][1], wMPerfilUsuario[wMPerfilUsuarioIndex][2])
                        // }
                        wMPerfilUsuarioBoLoad++;
                      }
                      
                      /* ==================================== >>> */

                      /* DOMINIOS NOVOS */
                      _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                      $.when(wMObjetoDominioAjax).then(
                        function(json_resp_dominio){
                          // console.log("DOMINIO",json_resp_dominio)
                            if(wMObjetoDominioBoLoad == 0){
                              if(typeof json_resp_dominio == "string"){
                                json_resp_dominio = JSON.parse(json_resp_dominio)
                              };
                              
                              _cc.validaResponseAjax(json_resp_dominio, wMObjetoDominioUrl);
                              
                              if(wMObjetoDominioControl == 0){
                                var w_objs_referencia = json_resp_dominio.data;
                                for(var w_obj_referencia in w_objs_referencia){
                                  var w_m_linha_referencia = "";
                                  for(var w_props in w_objs_referencia[w_obj_referencia]){
                                    w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                                  };
                                  w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                                  window.wMObjetoDominio.push(w_m_linha_referencia.split("##"));
                                };

                                for(var w_index_referencia = 0; w_index_referencia < wMObjetoDominio.length; w_index_referencia++){
                                  if(wMObjetoDominio[w_index_referencia][0] != undefined){
                                    wMObjetoDominio[w_index_referencia][0] = _cc.string.retorna(wMObjetoDominio[w_index_referencia][0], 1);
                                  };
                                };
                                wMObjetoDominio.sort();
                                wMObjetoDominioControl = 1;
                            };

                            wMObjetoDominioBoLoad = 1;
                          };

                          /* ==================================== >>> */

                          /* DOMINIOS ANTIGOS */
                          $.when(wMObjetoDominioOldAjax).then(
                            function(json_resp_dominio){
                              // console.log("DOMINIO OLD",json_resp_dominio)
                              if(wMObjetoDominioOldBoLoad == 0){
                                _cc.validaResponseAjax(json_resp_dominio, wMObjetoDominioOldUrl);
                                
                                var w_objs_referencia = json_resp_dominio.data;
                                for(var w_obj in w_objs_referencia){
                                  var w_str = [];
                                  var w_cadominio = _cc.string.retorna(w_objs_referencia[w_obj]["obj_Nome"], 1);
                                  w_cadominio = w_cadominio.substr(0, w_cadominio.lastIndexOf("."))
                                  var w_cndominio = w_objs_referencia[w_obj]["obj_Nome"];
                                  w_cndominio = w_cndominio.substr(w_cndominio.lastIndexOf(".")+1,w_cndominio.length);
                                  var w_csdominio = w_objs_referencia[w_obj]["obj_Nome"];
                                  w_csdominio = w_csdominio.substr(w_csdominio.lastIndexOf(".")+1,w_csdominio.length);
                                  var w_dsdominio = w_objs_referencia[w_obj]["obj_prp_vlr"];
                                  // w_str = [w_cadominio, "1", w_cndominio, w_csdominio, w_dsdominio, "0"]
                                  w_str = [w_cadominio, w_cndominio, w_dsdominio, w_csdominio, "1", "0"]
                                  wMObjetoDominio.push(w_str);
                                  wMObjetoDominioOld.push(w_str);
                                };

                                wMObjetoDominio.sort();

                                wMObjetoDominioOldBoLoad = 1;
                              };

                              /* ==================================== >>> */

                              /* REFERENCIAS DATAGRID */
                              _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                              $.when(wMObjetoReferenciaDatagridAjax).then(
                                function(json_resp_referencia_datagrid){
                                  // console.log("OBJETO REFERENCIA DATAGRID",json_resp_referencia_datagrid)
                                  if(typeof json_resp_referencia_datagrid == "string"){
                                    json_resp_referencia_datagrid = JSON.parse(json_resp_referencia_datagrid)
                                  };
                                  _cc.validaResponseAjax(json_resp_referencia_datagrid, wMObjetoReferenciaDatagridUrl);
                                  
                                  var w_objs_referencia = json_resp_referencia_datagrid.data;

                                  for(var w_obj_referencia in w_objs_referencia){
                                    var w_m_linha_referencia = "";
                                    for(var w_props in w_objs_referencia[w_obj_referencia]){
                                      w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                                    };
                                    w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                                    window.wMObjetoReferenciaDatagrid.push(w_m_linha_referencia.split("##"));
                                  }

                                  for(var w_index_referencia = 0; w_index_referencia < wMObjetoReferenciaDatagrid.length; w_index_referencia++){
                                    if(wMObjetoReferenciaDatagrid[w_index_referencia][0] != undefined){
                                      wMObjetoReferenciaDatagrid[w_index_referencia][0] = _cc.string.retorna(wMObjetoReferenciaDatagrid[w_index_referencia][0], 1);
                                    };
                                    if(wMObjetoReferenciaDatagrid[w_index_referencia][5] != undefined){
                                      wMObjetoReferenciaDatagrid[w_index_referencia][5] = _cc.string.retorna(wMObjetoReferenciaDatagrid[w_index_referencia][5], 1);
                                    };
                                    if(wMObjetoReferenciaDatagrid[w_index_referencia][3] != undefined){
                                      wMObjetoReferenciaDatagrid[w_index_referencia][3] = parseInt(wMObjetoReferenciaDatagrid[w_index_referencia][3])
                                    };
                                  };

                                  /* SORT > ORDENACAO */
                                  wMObjetoReferenciaDatagrid.sort(function(a, b) {
                                    var o1 = _cc.string.retorna(a[5], 1);
                                    var o2 = _cc.string.retorna(b[5], 1);
                                    var p1 = a[3];
                                    var p2 = b[3];
                                    if (o1 < o2) return -1;
                                    if (o1 > o2) return 1;
                                    if (p1 < p2) return -1;
                                    if (p1 > p2) return 1;
                                    return 0;
                                 });

                                  /* ==================================== >>> */

                                  /* FOREIGN KEY */
                                  _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                                  $.when(wMObjetoForeignKeyAjax).then(
                                    function(json_resp_fk){
                                      // console.log("FKS", json_resp_fk);
                                      if(wMObjetoForeignKeyBoLoad == 0){

                                        if(typeof json_resp_fk == "string"){
                                          json_resp_fk = JSON.parse(json_resp_fk)
                                        };
                                        _cc.validaResponseAjax(json_resp_fk, wMObjetoForeignKeyUrl);
                                        
                                        var w_objs_referencia = json_resp_fk.data;
                                        for(var w_obj_referencia in w_objs_referencia){
                                          var w_m_linha_referencia = "";
                                          for(var w_props in w_objs_referencia[w_obj_referencia]){
                                            w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                                          };
                                          
                                          w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                                          window.wMObjetoForeignKeyAux.push(w_m_linha_referencia.split("##"));
                                        };

                                        /* SORT > ORDENACAO */
                                        wMObjetoForeignKeyAux.sort();

                                        /* MATRIZ DE 2 COLUNAS (TABELA, COLUNA)*/
                                        for(var wObj in wMObjetoForeignKeyAux){
                                          var wObjAuxRelacionando = wMObjetoForeignKeyAux[wObj][0].split(".");
                                          var wObjAuxRelacionado = wMObjetoForeignKeyAux[wObj][1].split(".");
                                          wMObjetoForeignKey.push([_cc.string.retorna(wObjAuxRelacionando[0],1), _cc.string.retorna(wObjAuxRelacionando[1],1), _cc.string.retorna(wObjAuxRelacionado[0],1), _cc.string.retorna(wObjAuxRelacionado[1],1)]);
                                        };

                                        wMObjetoForeignKey.sort();
                                        wMObjetoForeignKeyBoLoad++;
                                      }

                                      /* ==================================== >>> */

                                      /* PROPRIEDADES COLUNAS DEFAULT */
                                      _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"matriz");
                                      $.when(wMObjetoPropriedadesDefaultAjax).then(
                                        function(json_resp_propriedades_default){
                                          // console.log("PROPRIEDADES DEFAULT", json_resp_propriedades_default);
                                          if(wMObjetoPropriedadesDefaultBoLoad == 0){
                                            if(typeof json_resp_propriedades_default == "string"){
                                              json_resp_propriedades_default = JSON.parse(json_resp_propriedades_default)
                                            };
                                            _cc.validaResponseAjax(json_resp_propriedades_default, wMObjetoPropriedadesDefaultUrl);
                                            
                                            var w_objs_referencia = json_resp_propriedades_default.data;
                                            for(var w_obj_referencia in w_objs_referencia){
                                              var w_m_linha_referencia = "";
                                              for(var w_props in w_objs_referencia[w_obj_referencia]){
                                                w_m_linha_referencia += w_objs_referencia[w_obj_referencia][w_props] + "##";
                                              };
                                              w_m_linha_referencia = w_m_linha_referencia.substr(0, w_m_linha_referencia.length - 2);
                                              window.wMObjetoPropriedadesDefaultAux.push(w_m_linha_referencia.split("##"));
                                            };
                                            wMObjetoPropriedadesDefaultAux.sort();
                                            for(var wObj in wMObjetoPropriedadesDefaultAux){
                                              var wObjAuxRelacionando = wMObjetoPropriedadesDefaultAux[wObj][0].split(".");
                                              wMObjetoPropriedadesDefault.push([_cc.string.retorna(wObjAuxRelacionando[0],1), _cc.string.retorna(wObjAuxRelacionando[1], 1), wMObjetoPropriedadesDefaultAux[wObj][1], wMObjetoPropriedadesDefaultAux[wObj][2]]);
                                            };
                                            wMObjetoPropriedadesDefault.sort();
                                            wMObjetoPropriedadesDefaultBoLoad = 1;
                                          }
                                          
                                          /* RESOLVE */
                                          _cc.loading.hide("matriz");
                                          w_dfd_m.resolve(w_return);
                                        },
                                        function(error){
                                          _cc.error(error);
                                        }
                                      );

                                      /* ==================================== >>> */

                                    },
                                    function(error){
                                      _cc.error(error);
                                    }
                                  );

                                  /* ==================================== >>> */

                                },
                                function(error){
                                  _cc.error(error);
                                }
                              );

                              /* ==================================== >>> */

                            },
                            function(error){
                              _cc.error(error);
                            }
                          );

                          /* ==================================== >>> */

                        },
                        function(error){
                          _cc.error(error);
                        }
                      );
                      /* ==================================== >>> */

                    },/* wMPerfilSegmento */
                    function(error){
                      _cc.error(error);
                    }
                  );

                  /* ==================================== >>> */

                },/* wMObjetoPropriedades */
                function(error){
                  _cc.error(error);
                }
              );

              /* ==================================== >>> */

            },/* wMObjetoReferencia */
            function(error){
              _cc.error(error);
            }
          );

          /* ==================================== >>> */

        },/* wMObjeto */
        function(error){
          _cc.error(error);
        }
      );

      /* PROMISE ALL */
      return w_dfd_m.promise()
    }catch(error){
      _cc.error(error);
      _cc.msg("ERRO ao criar uma das matrizes","danger",10)
    }
  }
};

var _ccM = new _ccaseMatriz();