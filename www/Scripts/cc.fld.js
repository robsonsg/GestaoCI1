var _ccaseFolder = function(){

  this.cria = function(p_fld){

    /* VARIAVEIS */
    var w_fld_tab_vsblty = "",
    w_fld_content_vsblty = "",
    w_fld_tab_props = "",
    w_fld_content_props = "",
    w_fld_readonly_class = "",
    w_fld_hidden_class = "";

    /* MATRIZ */
    var w_fld_m = ccase.matriz.fld["" + p_fld + ""];
    
    /* PROPRIEDADES > PRINCIPAIS */
    var w_fld_obj_nome = _cc.string.retorna(w_fld_m.OBJ_NOME, 1);
    var w_fld_obj_referencia = _cc.string.retorna(w_fld_m.OBJ_REFERENCIA, 1);

    /* PROPRIEDADES > LAYOUT */
    var w_fld_titulo = _cc.string.retorna(w_fld_m.TITULO);
    var w_fld_readonly = _cc.string.retorna(w_fld_m.READONLY);
    var w_fld_autofocus = _cc.string.retorna(w_fld_m.AUTOFOCUS, 1);
    var w_fld_hidden = _cc.string.retorna(w_fld_m.HIDDEN, 1);

    /* VERIFICA A ABA ATIVA */
    if(w_fld_autofocus == 1){
      w_fld_tab_vsblty = "cc-fld-active";
      w_fld_content_vsblty = "cc-fld-active d-block";
    }else{
      w_fld_content_vsblty = "d-none";
    };

    if(w_fld_hidden == 1){
      w_fld_hidden_class = "d-none";
    };

    if(w_fld_readonly == 1){
      w_fld_readonly_class = " cc-fld-readonly ";
    };

    /* VERIFICA SE TEM A ABA E INSERE OS CONTEUDOS */
    if($("[name='" + w_fld_obj_referencia + "-fld']").length == 0){
      $("[name='" + w_fld_obj_referencia + "']").append("<div class='float-left w-100 cc-fld' name='" + w_fld_obj_referencia + "-fld'></div>")
      $("[name='" + w_fld_obj_referencia + "-fld']").append("<ul class='w-100 float-left cc-fld-lista float-left list-unstyled mb-0' name='" + w_fld_obj_nome + "-fld-lista'></ul>")
      $("[name='" + w_fld_obj_referencia + "-fld']").append("<div class='float-left w-100 cc-fld cc-fld-conteudo pt-5 pt-5 " + w_fld_hidden_class + "' name='" + w_fld_obj_nome + "-fld-conteudo'></div>")
    };

    w_fld_tab_props = "data-ref-name='" + _cc.string.retorna(w_fld_obj_nome, true) + "' ";
    w_fld_tab_props += "data-name='" + _cc.string.retorna(w_fld_obj_nome, true) + "-fld-lista-item' "; 

    var w_fld_tab_htm = "<li data-fld-obj-nome='" + w_fld_obj_nome + "' class='cc-fld-tab cc-fld-lista-item "+ w_fld_tab_vsblty + " " + w_fld_hidden_class + " " + w_fld_readonly_class + "'>"
    w_fld_tab_htm += "<a " + w_fld_tab_props + ">" 
    w_fld_tab_htm += "" + w_fld_titulo;
    w_fld_tab_htm += "</a>";
    w_fld_tab_htm += "</li>";
    
    w_fld_content_props += "data-obj-tp='fld' ";
    w_fld_content_props += "data-fld-obj-nome='" + w_fld_obj_nome + "' ";
    w_fld_content_props += "data-fld-obj-nome='" + w_fld_obj_nome + "' ";
    w_fld_content_props += "class='cc-fld-conteudo-item "+ w_fld_content_vsblty +"' ";
    w_fld_content_props += "name='" + _cc.string.retorna(w_fld_obj_nome, true) + "' ";
    w_fld_content_props += "data-name='" + _cc.string.retorna(w_fld_obj_nome, true) + "-fld-conteudo-item' ";
    
    var w_fld_content_htm = "<div " + w_fld_content_props + ">";
    // w_fld_content_htm += _ccPrp.titulo(_cc.replaceParametros(w_fld_m.TITULO));;
    w_fld_content_htm += "</div>";

    $("[name='" + w_fld_obj_referencia + "'] .cc-fld-lista").append(w_fld_tab_htm);
    $("[name='" + w_fld_obj_referencia + "'] .cc-fld-conteudo").append(w_fld_content_htm);

    $("[data-fme-OBJ_REFERENCIA='" + w_fld_obj_nome + "']").appendTo($("[name='" + w_fld_obj_nome + "']"));

  };

  this.listen = function(){
    
    $(document).on({
      mouseup:function(){
        if($(this).parent().hasClass("cc-fld-readonly")){
          return false;
        }
        $(this).closest(".cc-fld-lista").find("li").removeClass("cc-fld-active");
        $(this).parent().addClass("cc-fld-active");
        $(this).closest(".cc-fld").find(".cc-fld-conteudo-item").attr("class","cc-fld-conteudo-item d-none");
        var w_fld = $(this).attr("data-ref-name") + "-fld-conteudo-item";
        $("[data-name='" + w_fld + "']").attr("class","cc-fld cc-fld-conteudo-item d-block");
      
        /*var w_obj_nome = $(".cc-fld-active").attr("data-fld-obj-nome");
        $("[name='" + w_obj_nome + "'] [data-grd]:visible").each(function(){
          console.log($(this).attr("data-grd"))
          _ccGrd.load.dados($(this).attr("data-grd"));
        });*/
        var w_obj_nome = $(".cc-fld-active").attr("data-fld-obj-nome");
        
        var w_obj_focus_nome = $("[name='" + w_obj_nome + "'] input[data-inp-autofocus='1']:first").attr("name");
        _cc.focus(w_obj_focus_nome)
      }
    },".cc-fld-lista-item a");
  };

  this.inicia = function(){
    _ccFld.listen();
  };
};

/* ALIAS */
var _ccFld = new _ccaseFolder();

$(document).ready(function(){
  _ccFld.inicia();
})
