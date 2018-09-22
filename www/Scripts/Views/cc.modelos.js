var p_MAX_LOTE = "";
var p_MAX_OBJ_LOTE = 0;
var p_MAX_OBJ_PRP_LOTE = 0;

var p_grd_OBJ_Nome                 = [];
var p_grd_TAB_Nome                 = [];
var p_grd_Descr                    = [];
var p_grd_OBJ_Relacionamento       = [];
var p_grd_TAB_Where = [];

//---------------GRID 01 -----------------------------------
p_grd_OBJ_Nome.push("frmgci.Equipe");
p_grd_Descr.push("Cadastro de Equipes");
p_grd_TAB_Nome.push("gciEquipe");
p_grd_TAB_Where.push("");
p_grd_OBJ_Relacionamento.push("");
//----------------------------------------------------------

//---------------GRID 02 -----------------------------------
p_grd_OBJ_Nome.push("frmgci.EquipeServico");
p_grd_Descr.push("Serviços da Equipe");
p_grd_TAB_Nome.push("gciEquipeServico");
p_grd_TAB_Where.push("");
p_grd_OBJ_Relacionamento.push("");
//----------------------------------------------------------

//---------------GRID 03 -----------------------------------
p_grd_OBJ_Nome.push("frmgci.EquipePessoa");
p_grd_Descr.push("Pessoas da Equipe");
p_grd_TAB_Nome.push("gciEquipePessoa");
p_grd_TAB_Where.push("");
p_grd_OBJ_Relacionamento.push("");
//----------------------------------------------------------

//--------------------------------------- Max Length do LOTE--------------------------------------//
$.ajax({
   url:ccase.url.tabela + "tabela=ccase_obj&colunas=max(obj_lote)%2B%201%20as%20xmax",
   method:"get",
   async:false,
   success:function(w_resp1){
      $.ajax({
         url:ccase.url.tabela + "tabela=ccase_obj_prp&colunas=max(obj_lote)%2B%201%20as%20xmax",
         method:"get",
         async:false,
         success:function(w_resp2){
            p_MAX_LOTE = (w_resp1.data[0].xmax  > w_resp2.data[0].xmax) ? p_MAX_LOTE = w_resp1.data[0].xmax : p_MAX_LOTE = w_resp2.data[0].xmax;
         }
      });
   }
});
//------------------------------------------------------------------------------------------------//

var p_Obj_Nome_Grid2 = "EquipesMov";      // ou
//var p_Obj_Nome_Grid2 = "EquipesDetalhe";  // ou
//var p_Obj_Nome_Grid2 = "EquipesItem";     // ou


var p_TAB_NOME_GRD2 = "gciEquipesMov";

for (wx=0; wx < p_grd_OBJ_Nome.length; wx++) {
   cObjCria(p_grd_OBJ_Nome[wx]  + ""                            ,"FRM" ,"10"  ,p_grd_Descr[wx]                                                   ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme"                        ,"FME" ,"10"  ,"Frame de " + p_grd_Descr[wx]                                     ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.grd"                    ,"GRD" ,"10"  ,"Grid de " + p_grd_Descr[wx]                                      ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.Edit"                   ,"FME" ,"20"  ,"Frame de Edição " + p_grd_Descr[wx]                              ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.Edit.Botoes"            ,"FME" ,"500" ,"Botões Top"                                                       ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.Edit.Botoes.btnExcluir" ,"BTN" ,"30"  ,"Botão Excluir"                                                    ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.Edit.Botoes.btnNovo"    ,"BTN" ,"10"  ,"Botão Novo"                                                       ,p_MAX_LOTE); 
   cObjCria(p_grd_OBJ_Nome[wx]  + ".fme.Edit.Botoes.btnSalvar"  ,"BTN" ,"20"  ,"Botão Salvar"                                                     ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"COLSPAN"                 ,"36"                                                  ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"DESCRICAO"               ,p_grd_Descr[wx]                                      ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ""                              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"OBJ_REFERENCIA"          ,"frmgci"                                              ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"OBJ_TP"                  ,"FRM"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ""                            ,"TITULO"                  ,p_grd_Descr[wx]                                      ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"COLSPAN"                 ,"36"                                                  ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"DESCRICAO"               ,"Frame de" + p_grd_Descr[wx]                         ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme"                          ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ""                              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"OBJ_TP"                  ,"FME"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme"                        ,"TITULO"                  ,p_grd_Descr[wx]                                      ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"COLSPAN"                 ,"36"                                                  ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"DESCRICAO"               ,"Grid de Equipes"                                     ,p_MAX_LOTE);        
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"GRID_GRADE"              ,"1"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.grd"                      ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme"                          ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"OBJ_REFERENCIA_EDIT"     ,p_grd_OBJ_Nome[wx] + ".fme.Edit"                     ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"OBJ_TP"                  ,"GRD"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"TAB_NOME"                ,p_grd_TAB_Nome[wx] + ""                              ,p_MAX_LOTE);                         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"OBJ_RELACIONAMENTO"      ,p_grd_OBJ_Relacionamento[wx] + ""                    ,p_MAX_LOTE);                                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.grd"                    ,"WHERE"                   ,p_grd_TAB_Where[wx] + ""                             ,p_MAX_LOTE);                          
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit"                   ,"COLSPAN"                 ,"36"                                                  ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit"                   ,"DESCRICAO"               ,"Frame de Edição de " + p_grd_Descr[wx]              ,p_MAX_LOTE); 
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit"                   ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.Edit"                     ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit"                   ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme"                          ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit"                   ,"OBJ_TP"                  ,"FME"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.edit.botoes"            ,"COLSPAN"                 ,"36"                                                  ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"            ,"DESCRICAO"               ,"Botões Top"                                          ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"            ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"            ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme.Edit"                     ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"            ,"OBJ_TP"                  ,"FME"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"            ,"QUEBRA_LINHA"            ,"1"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"BOTAO_ACAO_PADRAO"       ,"3"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"COLSPAN"                 ,"3"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"DESCRICAO"               ,"Botão Excluir"                                       ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir"   ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"OBJ_REFERENCIA_DATAGRID" ,p_grd_OBJ_Nome[wx] + ".fme.grd"                      ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"OBJ_TP"                  ,"BTN"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnExcluir" ,"TITULO"                  ,"Excluir"                                             ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"BOTAO_ACAO_PADRAO"       ,"1"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"COLSPAN"                 ,"3"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"DESCRICAO"               ,"Botão Novo"                                          ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"      ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"OBJ_REFERENCIA_DATAGRID" ,p_grd_OBJ_Nome[wx] + ".fme.grd"                      ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"OBJ_TP"                  ,"BTN"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnNovo"    ,"TITULO"                  ,"Novo"                                                ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"BOTAO_ACAO_PADRAO"       ,"2"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"COLSPAN"                 ,"3"                                                   ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"DESCRICAO"               ,"Botão Salvar"                                        ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"OBJ_NOME"                ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"    ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"OBJ_REFERENCIA"          ,p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes"              ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"OBJ_REFERENCIA_DATAGRID" ,p_grd_OBJ_Nome[wx] + ".fme.grd"                      ,p_MAX_LOTE);                   
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"OBJ_TP"                  ,"BTN"                                                 ,p_MAX_LOTE);         
   cPropCria(p_grd_OBJ_Nome[wx] + ".fme.Edit.Botoes.btnSalvar"  ,"TITULO"                  ,"Salvar"                                              ,p_MAX_LOTE);         
}