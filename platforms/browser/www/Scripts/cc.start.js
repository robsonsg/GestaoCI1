var _ccaseInicio = function(){

  /* CARREGA MATRIZES E DÁ START AO PROCESSO */
  this.design = {
    plugins:function(){
      _cc.cep.html();
      _ccApi.google.charts.start();
    },
    colspan:function(){
      var w_style = "<style>";
      /* COLSPAN */
      for(var w_index = 1;w_index <= ccase.default.quantidade.coluna;w_index++){
        var w_size = (ccase.default.tamanho.pagina/ccase.default.quantidade.coluna * w_index) - 10;
        w_style += ".cc-col-"+ w_index +"{width:" + w_size + "px;}"
        w_style += ".cc-grd-col-"+ w_index +"{width:" + w_size + "px;}"
      };

      w_style += "@media print {";
      for(var w_index = 1;w_index <= ccase.default.quantidade.coluna;w_index++){
        var w_size = (1024/ccase.default.quantidade.coluna * w_index);
        w_style += ".cc-col-"+ w_index +"{width:" + w_size + "px;}"
      };
      w_style += "}";

      w_style += "<style>";
      $("head").append(w_style);
    },
    page:function(){
      /* LOGO */
      var w_url_logo = "/Content/Img/logo-" + window.location.host.substr(0, window.location.host.indexOf(".")) + ".png";
      $("[name='cc-logo']").attr("src",w_url_logo)

      /* LARGURA MAX DAS PAGINAS */
      $("[name='cc-cabecalho-bloco']").closest(".row").css({maxWidth:ccase.default.tamanho.pagina});
      $("[name='cc-menu-bloco']").closest(".row").css({maxWidth:ccase.default.tamanho.pagina});
      $("[name='cc-conteudo-bloco']").closest(".row").css({maxWidth:ccase.default.tamanho.pagina});
      $("[name='cc-rodape-bloco']").closest(".row").css({maxWidth:ccase.default.tamanho.pagina});
    }
  };

  this.load = {
    matriz:function(){
      try{
        /* VARIAVEIS */
        var w_m = ccase.master.matriz,
        w_master_form_count = 0,
        w_matriz_sys;

        /* FOR PARA MONTAR AS MATRIZES */
        for(var w_master_form_item in w_m){
          w_matriz_sys = _ccM.cria(w_m[w_master_form_item]);
          $.when(w_matriz_sys).then(
            function(json_resp_matriz){
              w_master_form_count++;
              
              /* QUANDO TERMINAR O FOR INICIA A PAGINA */
              if(w_master_form_count == w_m.length){
                /* ALTERACAO DOS DADOS */
                for(var wMPerfilSegmentoIndex in wMPerfilSegmento){
                  _ccPrp.altera(wMPerfilSegmento[wMPerfilSegmentoIndex][0], wMPerfilSegmento[wMPerfilSegmentoIndex][1], wMPerfilSegmento[wMPerfilSegmentoIndex][2]);
                };

                for(var wMPerfilUsuarioIndex in wMPerfilUsuario){
                  _ccPrp.altera(wMPerfilUsuario[wMPerfilUsuarioIndex][0], wMPerfilUsuario[wMPerfilUsuarioIndex][1], wMPerfilUsuario[wMPerfilUsuarioIndex][2]);
                };
                _ccIni.load.page();
              };
            },
            function(error){
              _cc.error(error);
            }
          );
        };
      }catch(error){
        _cc.error(error);
      };
    },
    page:function(){
      try{
        if(ccase.master.mnu != ""){
          
          /* CARREGA O MENU */
          _ccObj.load.objeto(ccase.master.mnu, "mnu");
          if(ccase.master.obj != ""){
            _cc.string.retorna(ccase.master.obj)
          }
        };

        if(ccase.master.obj != ""){
          /* CARREGA A PAGINA PRINCIPAL */
          var w_obj_pos = _ccObj.busca.binaria("wMObjeto",_cc.string.retorna(ccase.master.obj, 1), 0)
          var w_obj_tp = wMObjeto[w_obj_pos][1];
          _ccObj.load.objeto(ccase.master.obj, w_obj_tp);
        };
      }catch(error){
        _cc.error(error);
      };
    }
  };

  /* INICIA */
  this.start = {
    sistema:function(){
      ccase.global.start = 1;
      _ccIni.start.comportamento();

      /* LOAD MATRIZES */
      _ccIni.load.matriz();
    },
    comportamento:function(){
      if($("[name='cc-display-an-usuario']").html().toLowerCase().indexOf("cicero") >= 0 
        || 
        $("[name='cc-display-an-usuario']").html().toLowerCase().indexOf("caio") >= 0
        ||
        $("[name='cc-display-an-usuario']").html().toLowerCase().indexOf("vagner") >= 0
      ){
        _ccDev.menuBotaoDireito();
      };
    }
  };
};

/* ALIAS */
var _ccIni = new _ccaseInicio();

