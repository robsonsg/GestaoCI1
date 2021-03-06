/* VARIAVEIS DA URL */
var w_url_hostname = window.location.hostname,
w_url_subdomain = w_url_hostname.substr(0, w_url_hostname.indexOf(".")),
w_url_ccasegd = window.location.protocol + "//" + window.location.hostname + "/ccasegd/";

/* VERIFICA SE HÁ PORTAS */
if(location.port != ""){
  w_url_ccasegd = window.location.protocol + "//" + window.location.hostname + ":" + location.port + "/ccasegd/";
};
w_url_ccasegd = ((window.location.hostname == "localhost") ? "http://dese.gestaoci.com.br/cCaseGD/" : w_url_ccasegd);
/* VARIAVEIS DA CCASEGD */
var w_rest_info = "",
w_rest_sys = "",
w_rest_cli= "",
w_rest_seg = "",
w_rest_datetime = "",
w_rest_datatime_ascii = "",
w_rest_token = "",
w_rest_cn_login = "";

/* VARIAVEIS DEBUG PARA FORÇAR TRAZER O CONTEUDO */
var w_url_param_debug = "";

/* VARIAVEIS MASTER */
var w_master_m = "",
w_master_mnu = "",
w_master_obj = "";

/* VARIAVEIS DE DESE */
var w_dese_bo_debug = 0;
window.w_dese_trace_info = "";
window.w_dese_bo_trace = true;

/* TIMEOUT DO CLOCK DO SISTEMA */
window.w_cc_timeout = "";

/* START DO OBJETO CONFIG */
var _ccaseConfig = function(){

  /* ABRE TELA DE LOGIN */
  this.start = function(){
    /* CARREGA ALGUMAS PROPRIEDADES DEFAULT, CASO NECESSITE */
    var w_trace_html = _ccDev.IDE.trace();
    $.when(w_trace_html).then(
      function(w_resp_trace_html){
        _ccConf.load.sistema.parametros.anonimo();
      },
      function(error){
        _cc.error(error);
      }
    );
  };

  this.load = {
    sistema:{
      parametros:{
        anonimo:function(){
          try{
            /* URL DO CCASEGD */
            window.ccase.url.ccasegd = w_url_ccasegd;

            /* VARIAVEIS */
            var w_param_sistema_url = "",
            w_param_sistema_ajax = "";

            /* AJAX */
            w_param_sistema_url = window.ccase.url.ccasegd + "getinfo?url=" + w_url_hostname;
            w_param_sistema_url = window.ccase.url.ccasegd + "getinfo?url=" + ((window.location.hostname == "localhost") ? "dese.gestaoci.com.br" : w_url_hostname);
            window.w_dese_trace_info = "cc.config";

            w_param_sistema_ajax = _cc.ajax(w_param_sistema_url,"GET","","", "<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>GETINFO" ,w_dese_trace_info,"");
            
            $.when(w_param_sistema_ajax).then(
              function(json_resp_param_sistema){
                /* VALIDA RETORNO */
                var w_resp_param_sistema = _cc.validaResponseAjax(json_resp_param_sistema, w_param_sistema_url);
                
                if(w_resp_param_sistema[0] == true){
                  var w_rest_info = json_resp_param_sistema.data,
                  w_item = "";
                  
                  w_rest_sys = _cc.string.retorna(w_rest_info["SISTEMA"], 1);
                  w_rest_cli = _cc.string.adicionaZeros(w_rest_info["CLIENTE"], 3);
                  w_rest_seg = _cc.string.adicionaZeros(w_rest_info["SISTEMA_SEGUIMENTO"],2);
                  
                  /* DATETIME */
                  w_rest_datetime = new Date(w_rest_info["DATETIME"]);
                  w_rest_datetime = _cc.converteData(w_rest_datetime, "DDHHmm");
                  w_rest_datatime_ascii = _cc.string.mascaraASCII(w_rest_datetime,6);

                  /* TOKEN */
                  var w_url_parametros = _cc.url.parametros();
                  var w_alt_sys = _cc.string.retorna(w_url_parametros[0], 1);
                  var w_alt_cli = _cc.string.adicionaZeros(w_url_parametros[1],2);
                  var w_alt_seg = _cc.string.adicionaZeros(w_url_parametros[2],2);

                  if(w_alt_sys != ""){w_rest_sys = w_alt_sys;};
                  if(w_alt_cli != ""){w_rest_cli = w_alt_cli;};
                  if(w_alt_seg != ""){w_rest_seg = w_alt_seg;};

                  w_rest_token = w_rest_sys + "" + w_rest_seg + "" + w_rest_cli + "";

                  /* ATTRIB DE VARIAVEIS GLOBAIS */
                  window.ccase.global.sys = w_rest_sys;
                  window.ccase.global.cli = w_rest_cli;
                  window.ccase.global.seg = w_rest_seg;
                  window.ccase.global.token_sistema = w_rest_token;
                  window.ccase.global.token = w_rest_token;
                  window.ccase.global.token_primario = w_rest_token;
                  window.ccase.global.datetime_system = new Date(w_rest_info["DATETIME"]);;
                  window.ccase.global.datetime = w_rest_datetime;
                  window.ccase.global.datetime_ascii = w_rest_datatime_ascii;

                  var w_sys_url = w_url_ccasegd + "consultapropriedades?nomeObjeto=" + window.ccase.global.sys +"."+parseInt(window.ccase.global.cli) + "&debug=1";
                  var w_sys_ajax = _cc.ajax(w_sys_url);

                  $.when(w_sys_ajax).then(
                    function(w_sys_ajax){
                      
                      var w_prp = w_sys_ajax.data,
                      w_logo_sys = "";

                      for(var w_item in w_prp){
                        if(w_prp[w_item].prp_nome == "IMAGEM_LOGO"){
                          w_logo_sys = w_prp[w_item].obj_prp_vlr;
                        };
                      };

                      /* LOGO */
                      window.ccase.global.logo = w_logo_sys;
                      $("[name='cc-logo']").attr("src",w_logo_sys);
                    },
                    function(error){
                      _cc.error(error);
                    }
                  );

                  /* CHAMA LOGIN */
                  _ccOath.load.acesso();
                };
              },
              function(error){
                _cc.error(error);
              }
            );
          }catch(error){
            _cc.error(error);
          };
        },
        logado:{
          master:function(){
            /* VARIAVEIS */
            var w_rest_master_url = "",
            w_rest_master_ajax = "";

            w_rest_master_url = w_url_ccasegd + "?tk=" + ccase.global.token + "&TABELA=ccase_obj_prp\
              &COLUNAS=prp_nome,obj_prp_vlr\
              &WHERE=boInativo = 0 AND obj_nome LIKE '" + w_rest_sys + "%' and obj_nome.obj_tp='SYS'"  + w_url_param_debug;  

            /* AJAX MASTER */
            _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"logado-master");
            
            /* TRACE LOG */
            window.w_dese_trace_info = "cc.config";
            // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
            var w_rest_master_ajax = _cc.ajax(w_rest_master_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>MASTER",window.w_dese_trace_info,"");

            /* WHEN REST COMPLETE */
            $.when(w_rest_master_ajax).then(
              function(json_resp_master){
                /* VALIDA AJAX */
                var w_rest_resp_master = _cc.validaResponseAjax(json_resp_master, w_rest_master_url);

                /* VARIAVEIS */
                var w_master = json_resp_master.data,
                w_item_master = "",
                w_master_index = 0;

                for(w_item_master in w_master){
                  var w_master_aux = w_master[w_item_master];

                  /* MASTER FORM - START PAGE */
                  if(w_master_aux.prp_nome == "MASTER_FORM"){
                    w_master_obj = _cc.string.retorna(w_master_aux.obj_prp_vlr, 1);
                  };
                  /* MASTER MENU - MAIN MENU */
                  if(w_master_aux.prp_nome == "MASTER_MENU"){
                    w_master_mnu = _cc.string.retorna(w_master_aux.obj_prp_vlr, 1);
                  };
                  /* SYS FORM - MATRIZES */
                  if(w_master_aux.prp_nome == "SYS_FORM"){
                    w_master_m = _cc.string.retorna(w_master_aux.obj_prp_vlr, 1).split("#");
                  };
                };

                /* VERIFICA OS ITENS VAZIOS DAS MATRIZES */
                for(var w_master_m_item in w_master_m){
                  if(w_master_m[w_master_m_item] == ""){
                    w_master_m.splice(w_master_index)
                  }
                  w_master_index++;
                };
                window.ccase.master.mnu = w_master_mnu;
                window.ccase.master.obj = w_master_obj;
                window.ccase.master.matriz = _cc.string.retorna(w_master_m,1).split(",");
                _ccConf.load.sistema.parametros.logado.perfil();
                _cc.loading.hide("logado-master");
              },
              function(error){
                _cc.error(error);
              }
            );
          },
          perfil:function(){
            /* VARIAVEIS */
            var w_rest_perfil_url = "",
            w_rest_perfil_ajax = "";

            w_rest_perfil_url = w_url_ccasegd + "?tk=" + ccase.global.token + "&TABELA=tiAcessoUsuarioPerfil\
              &WHERE=boInativo=0 AND cnusuario=" + ccase.global.cod_usuario + " AND caperfil = 'dese'" + w_url_param_debug; 
            _cc.loading.show("Aguarde<br> <strong>Carregando dados do Sistema</strong>",1,"logado-perfil");
            
            /* TRACE LOG */
            window.w_dese_trace_info = "cc.config";
            w_rest_perfil_ajax = _cc.ajax(w_rest_perfil_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>PERFIL DO USER",window.w_dese_trace_info,""); 

            /* WHEN */
            $.when(w_rest_perfil_ajax).then(
              function(json_resp_perfil){
                /* VALIDACAO AJAX */
                var w_rest_resp_perfil = _cc.validaResponseAjax(json_resp_perfil, w_rest_perfil_url);

                /* DESENV MODE */
                if(json_resp_perfil.data.length > 0){
                  w_dese_bo_debug = 1;
                };

                window.ccase.dese = w_dese_bo_debug;
                
                /* SEGMENTO */
                if(w_rest_seg == "" || w_rest_seg == undefined){w_rest_seg = 0;};
                
                /* CLI */
                if(w_rest_cli == ""){w_rest_cli = 0};

                /* DESIGN DE ELEMENTOS */
                _ccIni.design.page();
                _ccIni.design.colspan();
                _ccIni.design.plugins();

                _cc.loading.hide("logado-perfil");
                
                /* START DO SISTEMA */
                if(ccase.global.start == 0){
                  _ccIni.start.sistema();
                };
              },
              function(error){
                _cc.error(error);
              }
            );
          }
        }
      }
    }
  };
  
  this.attrib = {
    variaveis:function(){
      /* VARIAVEIS */
      var w_param_gd = "tk=" + ccase.global.token;
      /* CCASE GLOBAL */
      ccase.url.root =  ccase.url.ccasegd + "?" + w_param_gd + "&";
      ccase.url.login =  ccase.url.ccasegd + "login?" + w_param_gd + "&";
      ccase.url.TrocarSenha = ccase.url.ccasegd + "TrocarSenha?" + w_param_gd + "&";
      ccase.url.RecuperarSenha = ccase.url.ccasegd + "RecuperarSenha?";
      ccase.url.log = ccase.url.ccasegd + "LOG?" + w_param_gd + "&";
      ccase.url.logout =  ccase.url.ccasegd + "logout?" + w_param_gd + "&";
      ccase.url.consulta.objeto =  ccase.url.ccasegd + "CONSULTA?" + w_param_gd + "&";
      ccase.url.consulta.propriedade = ccase.url.ccasegd + "consultapropriedades?" + w_param_gd + "&nomeObjeto=";
      ccase.url.consulta.filho =  ccase.url.ccasegd + "consultaFilhos?" + w_param_gd + "&";
      ccase.url.consulta.usuario = ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=tiAcessoUsuario&COLUNAS=nmusuario&WHERE=cnUsuario="+ccase.global.cod_usuario;
      ccase.url.token =  ccase.url.ccasegd + "?" + w_param_gd;
      ccase.url.tabela =  ccase.url.ccasegd + "?" + w_param_gd + "&";
      ccase.url.dominio =  ccase.url.ccasegd + "dominio?" + w_param_gd + "&d=";
      ccase.url.dominio_novo =  ccase.url.ccasegd + "dominio/novo/?" + w_param_gd + "&d=";
      /*
      ccase.url.matriz.objeto =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,obj_prp_vlr&ORDERBY=obj_nome,prp_nome&WHERE=obj_nome like '[p_sys]%' AND obj_nome.boInativo=0 AND boInativo=0";
      ccase.url.matriz.propriedade =  ccase.url.ccasegd + "?" +w_param_gd  +"&TABELA=cCase_Prp&COLUNAS=ID, prp_nome&WHERE=boInativo=0&ORDERBY=ID";
      ccase.url.matriz.referencia =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,obj_prp_vlr&WHERE=prp_nome ='OBJ_REFERENCIA' AND obj_prp_vlr like '[p_sys]%' AND obj_nome.obj_nome is not null AND obj_nome.boInativo = 0 &ORDERBY=obj_prp_vlr,obj_seq";
      ccase.url.matriz.dominio =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=TIDOMINIO&COLUNAS=caDominio,csDominio,dsDominio,nmOrdem, cnRegTP&WHERE=boInativo=0 &ORDERBY=cadominio, nmordem, csdominio";
      ccase.url.matriz.dominioAntigo =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=cCase_obj_prp&COLUNAS=obj_Nome,prp_Nome,obj_prp_vlr&WHERE=prp_nome LIKE 'DOM_DSC' AND boInativo=0 &ORDERBY=obj_nome,prp_nome,obj_prp_vlr";
      ccase.url.matriz.referenciaDatagrid =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,obj_prp_vlr&WHERE=prp_nome ='OBJ_REFERENCIA_DATAGRID' AND obj_prp_vlr like '[p_sys]%' AND obj_nome.obj_nome is not null AND obj_nome.boInativo = 0 &ORDERBY=obj_prp_vlr,obj_seq";
      ccase.url.matriz.foreignKey =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome, obj_prp_vlr&ORDERBY=obj_prp_vlr&WHERE= boInativo=0 AND prp_nome = 'FOREIGN_KEY'";
      
      ccase.url.matriz.perfil = ccase.url.ccasegd + "?"+ w_param_gd + "&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnRegTP=1 AND (cnUsuario=" + ccase.global.cod_usuario + " OR caperfil in ( SELECT `caperfil` From tiAcessoUsuarioPerfil WHERE `cnUsuario`=" + ccase.global.cod_usuario + " order by `nrOrdem` asc ))";
      ccase.url.matriz.perfilSistemaSegmento = ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnregtp=1 AND caSys = '" + ccase.global.sys + "' AND cnusuario=0 AND caPerfil = '' AND (cnSeg = " + ccase.global.seg + " or cnSeg = 0) AND (cnCli = " + ccase.global.cli + " or cnCli = 0)";
      ccase.url.matriz.perfilSistemaUsuario = ccase.url.ccasegd + "?" + w_param_gd +"&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnregtp=1 AND caSys = '" + ccase.global.sys + "' AND (cnusuario=" + ccase.global.cod_usuario + " OR caperfil IN   (SELECT `caperfil` FROM tiAcessoUsuarioPerfil WHERE `boInativo`=0 and `cnUsuario`=" + ccase.global.cod_usuario + " ORDER BY `nrOrdem` ASC))";
      
      ccase.url.matriz.propriedadeDefault =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome, prp_nome,obj_prp_vlr&ORDERBY=obj_nome,prp_nome &WHERE=boInativo = 0 AND obj_nome.obj_tp='COL' AND obj_prp_vlr IS NOT NULL AND obj_prp_vlr <> '' AND   ((prp_nome = 'FOREIGN_KEY') or  (prp_nome = 'AUTO_INCREMENT' AND obj_prp_vlr=1) OR (prp_nome = 'SEQUENCE' AND obj_prp_vlr=1) OR (prp_nome = 'PRIMARY_KEY' AND obj_prp_vlr=1) OR (prp_nome = 'UNIQUE_KEY' AND obj_prp_vlr=1) OR (prp_nome = 'BO_REQUERIDO' AND obj_prp_vlr=1) OR (prp_nome = 'KEY' AND obj_prp_vlr=1) OR (prp_nome = 'INPUT_TP') OR (prp_nome = 'DEFAULT') OR (prp_nome = 'TAMANHO') OR (prp_nome = 'DECIMAL') OR (prp_nome = 'COLSPAN') OR (prp_nome = 'ROWSPAN') OR (prp_nome = 'TITULO') OR (prp_nome = 'TOOLTIP') OR (prp_nome = 'MSG_ERRO') OR (prp_nome = 'HELP_USER') OR (prp_nome = 'HELP_TECNICA') OR (prp_nome = 'PLACE_HOLDER') OR (prp_nome = 'ROTINA_CARGA') OR (prp_nome = 'REQUERIDO'))";
      */
      /*Incluído controle para trazer COL_NOME do LastIndexIf do Obj_Nome e OBJ_TP da cCase_Obj - Incl. 20/09/2018 - Robson*/
      ccase.url.matriz.objeto =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,CASE WHEN (`obj_nome.Obj_Tp` = 'INP' or `obj_nome.Obj_Tp` = 'COL') THEN CASE WHEN `prp_nome` = 'OBJ_TP' then `obj_nome.Obj_Tp` WHEN `prp_nome` = 'COL_NOME' THEN SUBSTRING_INDEX(`ccase_obj_prp.obj_nome`,'.',-1) ELSE `ccase_obj_prp.obj_prp_vlr` END ELSE `ccase_obj_prp.obj_prp_vlr` END as `obj_prp_vlr`&ORDERBY=obj_nome,prp_nome&WHERE=obj_nome like '[p_sys]%' AND obj_nome.boInativo=0 AND boInativo=0 and obj_nome.Obj_Tp is not null";
      ccase.url.matriz.propriedade =  ccase.url.ccasegd + "?" +w_param_gd  +"&TABELA=cCase_Prp&COLUNAS=ID, prp_nome&WHERE=boInativo=0&ORDERBY=ID";
      ccase.url.matriz.referencia =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,CASE WHEN (`obj_nome.Obj_Tp` = 'INP' or `obj_nome.Obj_Tp` = 'COL') THEN CASE WHEN `prp_nome` = 'OBJ_TP' then `obj_nome.Obj_Tp` WHEN `prp_nome` = 'COL_NOME' THEN SUBSTRING_INDEX(`ccase_obj_prp.obj_nome`,'.',-1) ELSE `ccase_obj_prp.obj_prp_vlr` END ELSE `ccase_obj_prp.obj_prp_vlr` END as `obj_prp_vlr`&WHERE=prp_nome ='OBJ_REFERENCIA' AND obj_prp_vlr like '[p_sys]%' AND obj_nome.obj_nome is not null AND obj_nome.boInativo = 0 and obj_nome.Obj_Tp is not null &ORDERBY=obj_prp_vlr,obj_seq";
      ccase.url.matriz.dominio =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=TIDOMINIO&COLUNAS=caDominio,csDominio,dsDominio,nmOrdem, cnRegTP&WHERE=boInativo=0 &ORDERBY=cadominio, nmordem, csdominio";
      ccase.url.matriz.dominioAntigo =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=cCase_obj_prp&COLUNAS=obj_Nome,prp_Nome,obj_prp_vlr&WHERE=prp_nome LIKE 'DOM_DSC' AND boInativo=0 &ORDERBY=obj_nome,prp_nome,obj_prp_vlr";
      ccase.url.matriz.referenciaDatagrid =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome,obj_tp,obj_nome.id,obj_nome.obj_seq,prp_nome,CASE WHEN (`obj_nome.Obj_Tp` = 'INP' or `obj_nome.Obj_Tp` = 'COL') THEN CASE WHEN `prp_nome` = 'OBJ_TP' then `obj_nome.Obj_Tp` WHEN `prp_nome` = 'COL_NOME' THEN SUBSTRING_INDEX(`ccase_obj_prp.obj_nome`,'.',-1) ELSE `ccase_obj_prp.obj_prp_vlr` END ELSE `ccase_obj_prp.obj_prp_vlr` END as `obj_prp_vlr`&WHERE=prp_nome ='OBJ_REFERENCIA_DATAGRID' AND obj_prp_vlr like '[p_sys]%' AND obj_nome.obj_nome is not null AND obj_nome.boInativo = 0 and obj_nome.Obj_Tp is not null&ORDERBY=obj_prp_vlr,obj_seq";
      ccase.url.matriz.foreignKey =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome, obj_prp_vlr&ORDERBY=obj_prp_vlr&WHERE= boInativo=0 AND prp_nome = 'FOREIGN_KEY'";
      
      ccase.url.matriz.perfil = ccase.url.ccasegd + "?"+ w_param_gd + "&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnRegTP=1 AND (cnUsuario=" + ccase.global.cod_usuario + " OR caperfil in ( SELECT `caperfil` From tiAcessoUsuarioPerfil WHERE `cnUsuario`=" + ccase.global.cod_usuario + " order by `nrOrdem` asc ))";
      ccase.url.matriz.perfilSistemaSegmento = ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnregtp=1 AND caSys = '" + ccase.global.sys + "' AND cnusuario=0 AND caPerfil = '' AND (cnSeg = " + ccase.global.seg + " or cnSeg = 0) AND (cnCli = " + ccase.global.cli + " or cnCli = 0)";
      ccase.url.matriz.perfilSistemaUsuario = ccase.url.ccasegd + "?" + w_param_gd +"&TABELA=tiAcessoPerfil&COLUNAS=idOBJ,idPRP,anObjPrpVlr&WHERE=boInativo=0 AND cnregtp=1 AND caSys = '" + ccase.global.sys + "' AND (cnusuario=" + ccase.global.cod_usuario + " OR caperfil IN   (SELECT `caperfil` FROM tiAcessoUsuarioPerfil WHERE `boInativo`=0 and `cnUsuario`=" + ccase.global.cod_usuario + " ORDER BY `nrOrdem` ASC))";
      
      ccase.url.matriz.propriedadeDefault =  ccase.url.ccasegd + "?" + w_param_gd + "&TABELA=ccase_obj_prp&COLUNAS=obj_nome, prp_nome,CASE WHEN (`obj_nome.Obj_Tp` = 'INP' or `obj_nome.Obj_Tp` = 'COL') THEN CASE WHEN `prp_nome` = 'OBJ_TP' then `obj_nome.Obj_Tp` WHEN `prp_nome` = 'COL_NOME' THEN SUBSTRING_INDEX(`ccase_obj_prp.obj_nome`,'.',-1) ELSE `ccase_obj_prp.obj_prp_vlr` END ELSE `ccase_obj_prp.obj_prp_vlr` END as `obj_prp_vlr`&ORDERBY=obj_nome,prp_nome &WHERE=boInativo = 0 AND obj_nome.obj_tp='COL' AND obj_prp_vlr IS NOT NULL AND obj_prp_vlr <> '' AND   ((prp_nome = 'FOREIGN_KEY') or  (prp_nome = 'AUTO_INCREMENT' AND obj_prp_vlr=1) OR (prp_nome = 'SEQUENCE' AND obj_prp_vlr=1) OR (prp_nome = 'PRIMARY_KEY' AND obj_prp_vlr=1) OR (prp_nome = 'UNIQUE_KEY' AND obj_prp_vlr=1) OR (prp_nome = 'BO_REQUERIDO' AND obj_prp_vlr=1) OR (prp_nome = 'KEY' AND obj_prp_vlr=1) OR (prp_nome = 'INPUT_TP') OR (prp_nome = 'DEFAULT') OR (prp_nome = 'TAMANHO') OR (prp_nome = 'DECIMAL') OR (prp_nome = 'COLSPAN') OR (prp_nome = 'ROWSPAN') OR (prp_nome = 'TITULO') OR (prp_nome = 'TOOLTIP') OR (prp_nome = 'MSG_ERRO') OR (prp_nome = 'HELP_USER') OR (prp_nome = 'HELP_TECNICA') OR (prp_nome = 'PLACE_HOLDER') OR (prp_nome = 'ROTINA_CARGA') OR (prp_nome = 'REQUERIDO')) and obj_nome.Obj_Tp is not null";
    }
  };
};

/* ALIAS */
var _ccConf = new _ccaseConfig();

$(document).ready(function(){
  /* ARVORE */
  window.ccase = {
    url:{
      ccasegd:"",
      root:"",
      login:"",
      logout:"",
      consulta:{
        objeto:"",
        propriedade:"",
        filho:"",
        usuario:""
      },
      tabela:"",
      dominio:"",
      dominio_novo:"",
      matriz:{
        objeto:"",
        propriedade:"",
        referencia:"",
        dominio:"",
        dominioAntigo:"",
        referenciaDatagrid:"",
        foreignKey:"",
        perfil:"",
        perfilSistemaSegmento:"",
        perfilSistemaUsuario:"",
        propriedadeDefault:"",
      }
    },
    agrupador:{
      conteudo:"cc-conteudo-bloco",
      menu:"cc-menu-bloco",
      cabecalho:"cc-cabecalho-bloco",
      rodape:"cc-rodape-bloco"
    },
    default:{
      tamanho:{
        pagina:1280,
        coluna:35,
        alturaPadrao:35,
        alturaQuebraLinha:15
      },
      quantidade:{
        coluna:36
      }
    },
    matriz:{
      url:[],
      obj:[],
      frm:[],
      fme:[],
      grd:[],
      grd_dados:[],
      grd_inp:[],
      grd_inp_col_nome:[],
      grd_inp_col_nome_query:[],
      grd_inp_col_titulo:[],
      inp:[],
      btn:[],
      htm:[],
      mnu:[],
      sys:[],
      fld:[]
    },
    master:{
      mnu:"",
      obj:"",
      matriz:""
    },
    global:{
      start:0,
      param:"",
      sys:"",
      cli:"",
      seg:"",
      token:"",
      token_sistema:"",
      usuario:"",
      cod_usuario:"",
      datetime:"",
      datetime_ascii:"",
      datetime_system:"",
      system_token:""
    },
    dese:""
  };

  /* LISTEN DOS BOTOES */
  _ccConf.start();
  _ccOath.start();
});
