// MASCARA POR PROPRIEDADE "MASCARA":
// MOEDA     - 10.550.000,00
// MILHAR    - 10.550.000
// MILHAR-3  - 10.550.000,513
// MILHAR-%  - 10.550.000,513 %
// TELEFONE  - (011) 999999-3355
// CPF       - 012.345.654-44
// CNPJ      - 33.212.545/0001-00
// CPFCNPJ   - 012.345.654-44 ou 33.212.545/0001-00


// MASCARA POR PROPRIEDADE "COLUNA_TP" (quando não tem "MASCARA"):
// 1-C - AlphaNumérico
// 2-N - Numérico
// 3-D - Data DD/MM/AAAA
// 4-T - DataTime DD/MM/AAAA 00:00:00

var _ccasePlugins = function(){

	this.autotab = function(){
		try{
			$("[data-inp-autotab]").autotab("filter","all");
		}catch(error){
			_cc.error(error);
		}
	};

	this.autoselect = function(){
		try{
			$(document).on("focus","[data-inp-autoselect='1']",function(){
				$(this)[0].select();
			});
		}catch(error){
			_cc.error(error)
		}
	};

	/* MASCARAS */
	this.unmask = function(){
		$("[data-mascara]").each(function(){
			if($(this).attr("data-mascara") != ""){
				$(this).unmask();
			}
		})
	};

	this.mask = {
		default:function(){
			
			/* CPF E CNPJ */
			var w_options = {
				onKeyPress : function(w_cpfcnpj, e, field, w_options) {
					var w_masks = ['000.000.000-000', '00.000.000/0000-00'];
					var w_mask = (w_cpfcnpj.length > 14) ? w_masks[1] : w_masks[0];
					$("[data-mascara='cpfcnpj']").mask(w_mask, w_options);
				}
			};

			$("[data-mascara='telefone']").mask("(00) 0000-00009");


			$("[data-mascara='cpfcnpj']").mask('000.000.000-000', w_options);

			/* CPF */
			$("[data-mascara='cpf']").mask("000.000.000-00");
			
			/* CNPJ */
			$("[data-mascara='cnpj']").mask("00.000.000/0000-00");
			
			/* MOEDA */
			$("[data-mascara='moeda']").maskMoney({allowNegative: false, thousands:'.', decimal:',', });
			$("[data-mascara='milhar']").maskMoney({allowNegative: false, thousands:'.', decimal:','});
			
			/* DATA */
			$("[data-mascara='data']").mask('00/00/0000');
    	
    	/* DATA E HORA */
			$("[data-mascara='datahora']").mask('00/00/0000 00:00:00');
    	
			/* HORA */
    	$("[data-mascara='hora']").mask('00:00');
    	
    	/* CEP */
    	$("[data-mascara='cep']").mask('00000-000');

		},
		money:function(){
			
		},
		aplica:function(){
			/* VARIAVEIS  */
			var w_val = "";

			/* RETURN */
			$("[data-mascara='moeda']").each(function(w_index, w_el){
				if($(this).val() != ""){
					if($(this).val().indexOf(".") >= 0){
						w_val = $(this).val();
						w_val = w_val.replace(".",",");
						$(this).val(w_val);
						$(this).maskMoney("mask");
					};
				};
			});
		},
		retorna:function(p_obj){
			/* VARIAVEIS */
			var w_obj = _cc.string.retorna(p_obj, 1),
			w_val = "";
			if($("[name='" + w_obj + "']").val().indexOf(",") >= 0){
				w_val = $("[name='" + w_obj + "']").maskMoney('unmasked')[0];
			}else{
				w_val = $("[name='" + w_obj + "']").val();
			}
			return w_val;
		}
	};

	this.select2 = {
		cria:function(p_inp_obj_nome){
			try{
				$("[name='" + p_inp_obj_nome + "']:not('.cc-ignore-select2')").select2({
	        // placeholder:"Selecione",
	        language: "pt-BR"
      	});	
			}catch(error){
				_cc.error(error);
			};
		},
		destroi:function(p_inp_obj_nome){
			try{
				if($("[name='" + p_inp_obj_nome + "']").hasClass("select2-hidden-accessible")){
					$("[name='" + p_inp_obj_nome + "']").select2("destroy");
				};
			}catch(error){
				_cc.error(error);
			};
		}
	};

	this.DataTable = {
		cria:function(p_grd_obj_nome){
			try{

				var p_grd_json_datatable = {
		      "aLengthMenu": [-1, 'todas'],
			    "aaSorting": [],
			    "iDisplayLength": -1,
			    "pageLength": -1,
		        "paging": false,
		        "ordering": true,
		        "destroy":true,
		        "info":false,
		        "language": {
				    "sEmptyTable": "Nenhum registro encontrado",
				    "sInfo": "Mostrando de _START_ atÃ© _END_ de _TOTAL_ registros",
				    "sInfoEmpty": "Mostrando 0 atÃ© 0 de 0 registros",
						"searchPlaceholder": "Buscar",
				    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
				    "sInfoPostFix": "",
				    "sInfoThousands": ".",
				    "sLengthMenu": "_MENU_ <span class='cc-float-left cc-datatable-length'>resultados por pÃ¡gina</span>",
				    "sLoadingRecords": "Carregando...",
				    "sProcessing": "Carregando...",
				    "sZeroRecords": "Nenhum registro encontrado",
				    "sSearch": "",
				    "oPaginate": {
			        "sNext": "Próximo",
			        "sPrevious": "Anterior",
			        "sFirst": "Primeiro",
			        "sLast": "Último"
				    },
				    "buttons": ["excel"],
				    "oAria": {
			        "sSortAscending": ": Ordenar A-Z",
			        "sSortDescending": ": Ordenar Z-A"
				    }
	        }
		    };

		    if($("[data-grd-obj-nome='" + p_grd_obj_nome + "']").length == 0){
		    	$("[name='" + p_grd_obj_nome + "']").DataTable(p_grd_json_datatable);
		    }else{
		    	$("[data-grd-obj-nome='" + p_grd_obj_nome + "']").DataTable(p_grd_json_datatable);
		    };
		   }catch(error){
				_cc.error(error);
			};
		},
		destroi:function(p_grd_obj_nome){
			try{
				if($("[data-grd-obj-nome='" + p_grd_obj_nome + "']").length == 0){
		    	$("[name='" + p_grd_obj_nome + "']").DataTable().destroy();
		    }else{
		    	$("[data-grd-obj-nome='" + p_grd_obj_nome + "']").DataTable().destroy();
		    };
			}catch(error){
				_cc.error(error);
			}
		}
	};
}

var _ccPlugin = new _ccasePlugins();
