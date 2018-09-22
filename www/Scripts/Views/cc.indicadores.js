"use strict";

function btnCarregaIndicadores(){
  $("#cc-indicadores").removeClass("d-none");
  _ccEntidades.loadGrupoEstruturas();
  $("#cc-estrutura").html("");
};

var _ccaseEntidades = function(){
  this.loadGrupoEstruturas = function(){
    /* VARIAVEIS */
    var w_ajax_url_indicadores =  ccase.url.root + "TABELA=TIDOMINIO&COLUNAS=id,cndominioitem,dsdominio&where=CADOMINIO=%27dmIndicadorGrupo%27%20AND%20cnregtp=1&orderby=cndominioitem";
    var w_ajax_grupo_indicadores = _cc.ajax(w_ajax_url_indicadores, "get");
    
    $.when(w_ajax_grupo_indicadores).then(
      function(json_resp){
        $("#cc-indicadores #cc-tipo-estrutura").html("");
        var w_itens = json_resp.data;
        for(var w_item in w_itens){
          var w_html = "<div class='form-check'>";
              w_html +=  "<input class='form-check-input' type='radio' name='cc-tipo-estrutura' id='cc-tipo-estrutura-"+w_itens[w_item].id+"' value='"+w_itens[w_item].cndominioitem+"'>";
              w_html +=  "<label class='form-check-label mr' for='cc-tipo-estrutura-"+w_itens[w_item].id+"'>&nbsp;" + w_itens[w_item].dsdominio + "</label>";
            w_html +=  "</div>";
          
          $("#cc-indicadores #cc-tipo-estrutura").append(w_html);
        };
      },
      function(error){
        console.log(error);
        _cc.loading.hide();
      }
    );
  };

  this.loadEstruturas = function(p_id){
    var w_ajax_url_estruturas =  ccase.url.root + "TABELA=gciindicador&COLUNAS=id,dmIndicadorGrupo,cnIndicador,dsIndicador,dmInputTP,caDominio,nmOrdem,boRequerido&where=dmIndicadorGrupo=" + p_id + "&orderby= nmOrdem,cnIndicador";
    var w_ajax_grupo_estruturas = _cc.ajax(w_ajax_url_estruturas, "get");
    
    $.when(w_ajax_grupo_estruturas).then(
      function(json_resp){
        var w_itens = json_resp.data;
        var w_html = "<div class='p-2 border mt-3 bloco-entidade-estrutura' id='bloco-entidade-estrutura-" + p_id +"'>"
        for(var w_item in w_itens){
          
          w_html += "<h5 class='bg-light border p-1 mb-0'>" + w_itens[w_item].dsIndicador + "</h5>";
          w_html += "<div class='border mb-3 p-3' data-cnindicador='" + w_itens[w_item].cnIndicador + "' id='cc-estrutura-" + w_itens[w_item].cnIndicador + "'>"
          _ccEntidades.loadDominiosEstrutura(w_itens[w_item].caDominio, "cc-estrutura-" + w_itens[w_item].cnIndicador, w_itens[w_item].dmInputTP, w_itens[w_item].id)
          w_html += "</div>";
        };
        w_html += "</div>";

        if($("#bloco-entidade-estrutura-" + p_id + "").length == 0){
          $("#cc-indicadores #cc-estrutura").append(w_html);
        }
      },
      function(error){
        console.log(error);
        _cc.loading.hide();
      }
    )
  };

  this.loadDominiosEstrutura = function(dominio, objeto, tipo_input, id_pai){

    var w_ajax_url_dominios_estruturas =  ccase.url.root + "TABELA=TIDOMINIO&COLUNAS=id,cndominioitem,csdominio,dsdominio&where=CADOMINIO='" + dominio + "' AND cnregtp=1&orderby=cndominioitem";
    var w_ajax_grupo_dominios_estruturas = _cc.ajax(w_ajax_url_dominios_estruturas, "get");
    
    $.when(w_ajax_grupo_dominios_estruturas).then(
      function(json_resp){
        var w_itens = json_resp.data;
        var w_input = "";
        var w_input_class = "";
        var w_html = "";

        if(tipo_input == 11){
          w_input = "checkbox";
          w_input_class = "form-check-input";
        }else if(tipo_input == 10){
          w_input = "radio";
          w_input_class = "form-check-input";
        }else{
          w_input = "text";
          w_input_class = "form-control";
        };

        for(var w_item in w_itens){
            w_html = "<div class='form-check form-check-inline'>";
              w_html +=  "<input class='" + w_input_class + "' type='" + w_input + "' name='cc-estrutura-dominio-" + id_pai + "' data-nrindicador='" + w_itens[w_item].csdominio + "' id='cc-estrutura-dominio-"+w_itens[w_item].csdominio+"' value='"+w_itens[w_item].cndominioitem+"'>";
              w_html +=  "<label class='form-check-label'>&nbsp;" + w_itens[w_item].dsdominio + "</label>";
            w_html +=  "</div>";
          if($("#cc-indicadores #"+objeto + " #cc-estrutura-dominio-"+w_itens[w_item].csdominio+"").length == 0){
            $("#cc-indicadores #"+objeto).append(w_html);
          }
        }

        var w_cnSmartPoint = $("[name='frmgci.smartpoint.fmecadastro.fmedadosbasicos.cnsmartpoint']").val();
        $.ajax({
          url:ccase.url.root + "TABELA=gcismartpointindicador&colunas=id, cnsmartpoint,cnindicador,nrindicador,anindicador,dtindicador,dtmovimento,dminputtp&where=cnsmartpoint=" + w_cnSmartPoint +" and cnindicador = " + id_pai + "&orderby=dtmovimento desc&complemento=limit 1",
          method:"get",
          success:function(response){
            if(response.data.length != 0){
              var item_selecionado = response.data[0].nrindicador.toString(); 
              $("[data-cnindicador='" + id_pai + "'] #cc-estrutura-dominio-" +  item_selecionado + "").attr("checked","checked")
            };
          }
        });
      },
      function(error){
        console.log(error);
        _cc.loading.hide();
      }
    )
  };

  this.listen = function(){
    $(document).on({
      change:function(){
        $(".bloco-entidade-estrutura").addClass("d-none");
        $("#bloco-entidade-estrutura-" + $(this).val()).removeClass("d-none");
        _ccEntidades.loadEstruturas($(this).val());
      }
    },"[name='cc-tipo-estrutura']");

    $(document).on({
      change:function(){
        var w_cnSmartPoint = $("[name='frmgci.smartpoint.fmecadastro.fmedadosbasicos.cnsmartpoint']").val();
        var w_cnIndicador = $(this).closest("[data-cnindicador]").attr("data-cnindicador");
        var w_nrindicador = $(this).attr("data-nrindicador");
        var w_json_insert = {"cnsmartpoint":"" + w_cnSmartPoint + "","cnindicador":"" + w_cnIndicador + "","nrindicador":"" + w_nrindicador + "","dminputtp":"2"}
      
        $.ajax({
          url:ccase.url.root + "TABELA=gcismartpointindicador",
          method:"post",
          contentType: 'application/json',
          data:JSON.stringify(w_json_insert),
          success:function(response){
          }
        })
      }
    },"#cc-estrutura input");

  }

  this.inicia = function(){
    _ccEntidades.listen();
  }
}

var _ccEntidades = new _ccaseEntidades();


$(document).ready(function(){
  _ccEntidades.inicia();
});






