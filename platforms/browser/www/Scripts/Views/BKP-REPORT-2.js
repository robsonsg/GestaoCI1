
    window.w_grd_principal = [];
    window.w_grd_relacionado = [];
    window.w_grd_principal_colunas = [];
    window.w_grd_relacionado_colunas = [];

    $("[data-report='1'] [data-grd]").each(function(){

      if($(this).attr("data-grd-obj-relacionamento-datagrid") == ""){
        w_grd_principal.push($(this).attr("data-grd"));
      };

      if($(this).attr("data-grd-obj-relacionamento-datagrid") != ""){
        w_grd_relacionado.push($(this).attr("data-grd"));
      };
    });

    for(var w_grd in w_grd_principal){
      var w_str_colunas = "";
      $(":input[data-inp-obj-referencia-datagrid='" + w_grd_principal[w_grd] + "']").each(function(){
        w_str_colunas += $(this).attr("data-inp-col-nome") + ", ";
      });
      w_str_colunas = w_str_colunas.substr(0, w_str_colunas.length-2);
      w_grd_principal_colunas.push([w_grd_principal[w_grd],w_str_colunas]);
    };
    

    for(var w_grd in w_grd_relacionado){
      var w_str_colunas = "";
      $(":input[data-inp-obj-referencia-datagrid='" + w_grd_relacionado[w_grd] + "']").each(function(){
        w_str_colunas += $(this).attr("data-inp-col-nome") + ", ";
      });
      w_str_colunas = w_str_colunas.substr(0, w_str_colunas.length-2);
      w_grd_relacionado_colunas.push([w_grd_relacionado[w_grd],w_str_colunas]);
    };

    var w_principal_url = ccase.url.tabela + "TABELA=" + _ccPrp.consulta(w_grd_principal[0],"TAB_NOME") + "&COLUNAS=" + w_grd_principal_colunas[0][1];
    var w_principal_ajax = _cc.ajax(w_principal_url);

    var w_relacionado_url = ccase.url.tabela + "TABELA=" + _ccPrp.consulta(w_grd_relacionado[0],"TAB_NOME") + "&COLUNAS=" + w_grd_relacionado_colunas[0][1];
    var w_relacionado_ajax = _cc.ajax(w_relacionado_url);

    $.when(w_principal_ajax).then(
      function(json_resp_principal){
        wm = json_resp_principal.data;
        $.when(w_relacionado_ajax).then(
          function(json_resp_relacionado){
            var wm_rel = json_resp_relacionado.data;
            for(var w_obj in wm){
              console.log("cnsmartpoint PAI: " + wm[w_obj]["cnsmartpoint"]);
              for(var w_obj_rel in wm_rel){
                if(wm_rel[w_obj_rel]["cnsmartpoint"] == wm[w_obj]["cnsmartpoint"]){
                  console.log(wm_rel[w_obj_rel]);
                };
              };
            }
          },
          function(error){
            console.log(error);
          }
        );
      },
      function(error){
        console.log(error);
      }
    );