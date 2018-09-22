/* APIS */
var _ccaseApi = function(){

  /* GOOGLE */
  this.google = {

    /* MAPS */
    maps:function(p_obj_nome){
      try{
        /* VARIAVEIS */
        var w_obj_referencia_datagrid = "";

        /* OBJ REFERENCIA DATAGRID */
        if(_cc.string.retorna(ccase.matriz.inp["" + p_obj_nome + ""]) != ""){
          w_obj_referencia_datagrid = _cc.string.retorna(ccase.matriz.inp["" + p_obj_nome + ""].OBJ_REFERENCIA_DATAGRID, 1);
        }else{
          return false;
        };

        var w_end_logradouro =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='dmlogradourotp']").val();
        var w_end_numero =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendlogradouro']").val();
        var w_end_bairro =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendbairro']").val();
        var w_end_cidade =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendcidade']").val();
        var w_end_uf =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anenduf']").val();

        // var w_end_logradouro = $("[name='" + w_params_google_maps[0] + "']").val();
        // var w_end_numero = $("[name='" + w_params_google_maps[1] + "']").val();
        // var w_end_bairro = $("[name='" + w_params_google_maps[2] + "']").val();
        // var w_end_cidade = $("[name='" + w_params_google_maps[3] + "']").val();
        // var w_end_uf = $("[name='" + w_params_google_maps[4] + "']").val();
        
        var w_end = w_end_logradouro + ", ";
        w_end += w_end_numero + " - ";
        w_end += w_end_cidade + ", ";
        w_end += w_end_uf; 
        
        $("[name='" + p_obj_nome + "']").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyAAc-tVypT0ZlKapYD47YpVeD183cCuVx4&q=" + w_end);
      }catch(error){
        console.log(error);
      }
    },
    /* STREET VIEW */
    streetView:function(p_obj_nome){
      try{
        /* VARIAVEIS */
        var w_obj_referencia_datagrid = "";

        /* OBJ REFERENCIA DATAGRID */
        if(_cc.string.retorna(ccase.matriz.inp["" + p_obj_nome + ""]) != ""){
          w_obj_referencia_datagrid = _cc.string.retorna(ccase.matriz.inp["" + p_obj_nome + ""].OBJ_REFERENCIA_DATAGRID, 1);
        }else{
          return false;
        };
        
        var w_end_logradouro =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='dmlogradourotp']").val();
        var w_end_numero =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendlogradouro']").val();
        var w_end_bairro =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendbairro']").val();
        var w_end_cidade =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anendcidade']").val();
        var w_end_uf =  $("[data-inp-obj-referencia-datagrid='" + w_obj_referencia_datagrid +"'][data-inp-col-nome='anenduf']").val();


        var w_google_streetview_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + w_end_logradouro + ",+" + w_end_numero + ",+"+ w_end_cidade + ",+" + w_end_uf + "&key=AIzaSyAAc-tVypT0ZlKapYD47YpVeD183cCuVx4"
        var w_google_streetview_ajax = _cc.ajax(w_google_streetview_url);

        $.when(w_google_streetview_ajax).then(
          function(json_resp){
            try{
              var w_end_lat = json_resp.results[0].geometry.location.lat;
              var w_end_lng = json_resp.results[0].geometry.location.lng; 
              var w_lat_lng = w_end_lat + ", " + w_end_lng; 
              $("[name='" + p_obj_nome +"']").attr("src","https://www.google.com/maps/embed/v1/streetview?key=AIzaSyAAc-tVypT0ZlKapYD47YpVeD183cCuVx4&location=" + w_lat_lng + "&heading=210&pitch=10&fov=35");
            }catch(error){
              _cc.error(error);
            }
          },
          function(error){
            _cc.error(error);
          }
        );
      }catch(error){
        _cc.error(error);
      };
    },
    charts:{
      start:function(){
        google.charts.load('current', {'packages':['corechart']});
      },
      load:function(){

      }
    }
  }
};

var _ccApi = new _ccaseApi();