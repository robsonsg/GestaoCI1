var _ccaseOath = function(){
  this.listen = {
    botoes:function(){
      /* LOGIN */
      /************************/

      /* LOGIN > BOTAO ENTRAR */
      $(document).on("click","[name='cc-login-btn-entrar']",function(){
      
        /* VARIAVEIS */
        var w_caLogin = $("[name='cc-login-ca-login']").val(),
        w_caPassword = $("[name='cc-login-ca-password']").val();

        /* VALIDACAO DOS CAMPOS */
        if(w_caLogin == "" || w_caPassword == ""){
          if(w_caLogin == ""){
            _cc.msg("Preencha o usuário","danger",5);
            return false;
          }else if(w_caPassword == ""){
            _cc.msg("Preencha sua Senha","danger",5);
            return false;
          };
        };

        /* USUARIO LOGADO */
        window.ccase.global.usuario = w_caLogin;

        /* CHAMA FUNCAO DE ACESSO */
        _ccOath.load.acesso();
      });

      $(document).on("click","[name='cc-btn-nova-senha']", function(){
       _ccOath.modal.novaSenha();
      });

      /**/
      $(document).on("click","[name='cc-btn-token-fechar']",function(){
        _cc.modal.close()
      });

      /**/
      $(document).on("click","[name='cc-esqueci-senha-btn-enviar']",function(){
        _cc.loading.show("Enviando Código",1,"cc-esqueci-senha-btn-enviar");
        var w_usuario_url = w_url_ccasegd + "login?tk="+ ccase.global.token_primario +"&caLogin=" + $("[name='cc-login-ca-login']").val() + "";
        var w_usuario_ajax = _cc.ajax(w_usuario_url);

        $.when(w_usuario_ajax).then(
          function(json_resp_usuario){
            var w_token = json_resp_usuario.data;
            w_token = w_token + ccase.global.datetime_ascii;

            ccase.global.token = w_token;
            _ccConf.attrib.variaveis();

            //0 = email - 1 = celular
            var w_op = $("[name='cc-modal-esqueci-senha-op']:checked").val();
            if(w_op == 0){
              w_op = "10";
            }else if(w_op == 1){
              w_op = "01";
            };

            var w_envia_token_url = ccase.url.RecuperarSenha + "tk=" + w_token + "&lsOpcao=" + w_op;
            var w_envia_token_ajax = _cc.ajax(w_envia_token_url);
            
            $.when(w_envia_token_ajax).then(
              function(json_resp){
                _cc.loading.hide("cc-esqueci-senha-btn-enviar");
                if(json_resp.cnRetorno == 0){
                  _ccOath.modal.novaSenhaToken();
                };
              },
              function(error){

              }
            );
          },
          function(error){
            _cc.error(error)
          }
        );
      })

      /* BOTAO - ESQUECI MINHA SENHA */
      $(document).on("click","[name='cc-btn-esqueci-senha-token']",function(){
        /* VARIAVEIS */
        var w_htm_modal_url = "/Content/Modal//cc-modal-token.html?v="+Math.random(),
        w_htm_modal_ajax = "";

        /* LOADING */
        _cc.loading.show("Carregando",1,"cc-loading-esqueci-senha");

        /* AJAX OR NOT */
        if($("[name='cc-modal-token']").length == 0){
          w_htm_modal_ajax = _cc.ajax(w_htm_modal_url,"get","text/html");
        }else{
          w_htm_modal_ajax = true;
        };

        /* DEPOIS DO AJAX COMPLETAR */ 
        $.when(w_htm_modal_ajax).then(
          function(w_resp_htm){
            var w_htm = w_resp_htm;

            /* APPEND DO MODAL NO BODY */
            if($("[name='cc-modal-token']").length == 0){
              $(w_htm).appendTo("body");
            };

            /* CHAMA MODAL */
            _cc.modal.show("cc-modal-token");

            /* ESCONDE O LOADING */
            _cc.loading.hide("cc-loading-esqueci-senha");
          },function(error){
            _cc.error(error);
          }
        );
      });

      /* BOTAO ALTERAR SENHA */
      $(document).on("click","[name='cc-btn-salvar-nova-senha']",function(){
        if($("[name='cc-nova-senha-senha-atual']").val() == ""){
          _cc.msg("Informe sua senha atual","danger",10);
          return false;
        };
        if($("[name='cc-nova-senha-ca-password']").val() != $("[name='cc-nova-senha-ca-password-repetir']").val()){
          _cc.msg("Novas senhas não sao iguais","danger",10);
          return false;
        }

        var w_nova_senha_url = ccase.url.TrocarSenha + "anNovaSenha=" + $("[name='cc-nova-senha-ca-password']").val() + "&anSenha=" + $("[name='cc-nova-senha-senha-atual']").val();
        var w_nova_senha_ajax = _cc.ajax(w_nova_senha_url);
        $.when(w_nova_senha_ajax).then(
          function(json_nova_senha_resp){
            if(json_nova_senha_resp.cnRetorno == 0){
              _cc.msg("Senha alterada com sucesso","success",5);
              _cc.modal.close()
            }else{
              _cc.msg("Houve um problema ao altera a senha.<br> Tenta mais tarde novamente.","danger",5);
            }
          },
          function(error){
            _cc.error(error)
          }
        );
      });

      /* BOTAO NOVA  SENHA TOKEN */
      $(document).on("click","[name='cc-btn-salvar-nova-senha-token']",function(){
        if($("[name='cc-token-nova-senha-codigo']").val() == ""){
          _cc.msg("Informe o Código ","danger",10);
          return false;
        };

        if($("[name='cc-token-nova-senha-ca-password']").val() != $("[name='cc-token-nova-senha-ca-password-repetir']").val()){
          _cc.msg("Novas senhas não sao iguais","danger",10);
          return false;
        };

        var w_nova_senha_url = ccase.url.TrocarSenha + "anNovaSenha=" + $("[name='cc-token-nova-senha-ca-password']").val() + "&sTK=" + $("[name='cc-token-nova-senha-codigo']").val();
        var w_nova_senha_ajax = _cc.ajax(w_nova_senha_url);
        $.when(w_nova_senha_ajax).then(
          function(json_nova_senha_resp){
            if(json_nova_senha_resp.cnRetorno == 0){
              _cc.msg("Senha criada com sucesso","success",5);
              _cc.modal.close()
              _cc.modal.close()
            }else{
              _cc.msg("Houve um problema ao altera a senha.<br> Tenta mais tarde novamente.","danger",5);
            }
          },
          function(error){
            _cc.error(error)
          }
        );
      });
    },
    deslogar:function(){
      $(document).on("click","[name='cc-reautenticar-sair']",function(){
        window.location.href = "/";
      });
      $(document).on("click","[name='cc-logout']",function(){
        /* VARIAVEIS */
        var w_logout_ajax = "";
        
        /* CONFIRMA SAIDA DO SISTEMA */
        var w_confirm = confirm("Deseja realmente encerrar sua sessão?");
        if (w_confirm == true) {

          /* AJAX DO LOGOUT */
          window.w_dese_trace_info = "cc.oauth";
          // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
          w_logout_ajax = _cc.ajax(ccase.url.logout,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>LOGOUT",w_dese_trace_info,"");
          
          /* RESPONSE DO AJAX */
          $.when(w_logout_ajax).then(
            function(json_resp_logout){
              /* RESPONSE AJAX */
              var w_logout_return = _cc.validaResponseAjax(json_resp_logout, ccase.url.logout);

              /* TRATANDO O RESPONSE*/
              if(w_logout_return[0] == true){

                /* REDIRECIONA PRO INICIO DO SISTEMA */
                window.location.href = "/";
              };
            },
            function(error){
              _cc.error(error);
            }
          )
        };
      });
    },
    reautenticar:function(){
      $(document).on("click","[name='cc-reautenticar-trocar-usuario']",function(){
        /* LIMPAR */
        $("[name='cc-reautenticar-ca-login']").val("");
        $("[name='cc-reautenticar-ca-password']").val("");

        $(".cc-form-group-reautenticar-infos").addClass("d-none");
        $(".cc-form-group-reautenticar-inputs").removeClass("d-none");

        _cc.focus("cc-reautenticar-ca-login");
      });

      $(document).on("click","[name='cc-reautenticar-btn-entrar']",function(){
        
        /* VARIAVEIS */
        var w_caLogin = $("[name='cc-reautenticar-ca-login']").val(),
        w_caPassword = $("[name='cc-reautenticar-ca-password']").val();

        /* VALIDACAO DOS CAMPOS */
        if(w_caLogin == "" || w_caPassword == ""){
          if(w_caLogin == ""){
            _cc.msg("Preencha o usuário","danger",5);
            return false;
          }else if(w_caPassword == ""){
            _cc.msg("Preencha sua Senha","danger",5);
            return false;
          };
        };

        _ccOath.load.reacesso()
        setTimeout(function(){
          _cc.loading.hide();
        },2000);
      });
    },
    login:function(){
      $(document).on("click","[name='cc-btn-esqueci-senha-fechar']",function(){
        _cc.modal.close()
      });

      $(document).on("click","[name='cc-btn-esqueci-senha']",function(){
        _cc.loading.show("Carregando",1,"cc-btn-esqueci-senha");
        if($.trim($("[name='cc-login-ca-login']").val()) == ""){
          _cc.msg("Insira seu <strong>nome de usuário</strong>","danger",10);
          _cc.focus("cc-login-ca-login");
          return false;
        };

        var w_param_sistema_url = window.ccase.url.ccasegd + "getinfo?url=" + w_url_hostname;
        window.w_dese_trace_info = "cc.oauth";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        var w_param_sistema_ajax = _cc.ajax(w_param_sistema_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>REST LOGIN/INICIAL: GETINFO (RELOGIN)",w_dese_trace_info,"");
        
        $.when(w_param_sistema_ajax).then(
          function(json_resp_param_sistema){
            /* RESPONSE AJAX */
            _cc.validaResponseAjax(json_resp_param_sistema, w_param_sistema_url);
            var w_rest_info = json_resp_param_sistema.data,
            w_item = "";

            /* DATETIME */
            var w_rest_datetime = new Date(w_rest_info["DATETIME"]);
            w_rest_datetime = _cc.converteData(w_rest_datetime, "DDHHmm");
            var w_rest_datatime_ascii = _cc.string.mascaraASCII(w_rest_datetime,6);

            /* TOKEN */
            var w_rest_token = w_rest_sys + "" + w_rest_seg + "" + w_rest_cli + "";
            var w_calogin = $("[name='cc-login-ca-login']").val();

            var w_usuario_url = w_url_ccasegd + "login?tk="+ w_rest_token +"&caLogin=" + w_calogin + "";
            var w_usuario_ajax = _cc.ajax(w_usuario_url);

            $.when(w_usuario_ajax).then(
              function(json_resp_usuario){
                if(json_resp_usuario.cnRetorno == 0){

                  var w_esqueci_senha_url = w_usuario_url + "&boEsqueciSenha=1";
                  var w_esqueci_senha_ajax = _cc.ajax(w_esqueci_senha_url);

                  $.when(w_esqueci_senha_ajax).then(
                    function(json_resp_esqueci_senha){
                      var w_dados = json_resp_esqueci_senha.data.split("#");

                      if(json_resp_esqueci_senha.cnRetorno == 0){
                        var w_htm_modal_url = "/Content/Modal//cc-modal-esqueci-senha.html?v="+Math.random(),
                        w_htm_modal_ajax = "";
                        
                        /* AJAX */
                        if($("[name='cc-modal-esqueci-senha']").length == 0){
                          w_htm_modal_ajax = _cc.ajax(w_htm_modal_url,"get","text/html");
                        }else{
                          w_htm_modal_ajax = true;
                        };

                        /* WHEN */ 
                        $.when(w_htm_modal_ajax).then(
                          function(w_resp_htm){
                            var w_htm = w_resp_htm;

                            /* APPEND DO MODAL */
                            if($("[name='cc-modal-esqueci-senha']").length == 0){
                              $(w_htm).appendTo("body");
                            };

                            _cc.modal.show("cc-modal-esqueci-senha");
                            _cc.loading.hide("cc-btn-esqueci-senha");
                            if(w_dados[1] != ""){
                              $("[name='cc-modal-esqueci-senha-email']").removeClass("d-none");
                              $("[name='cc-modal-esqueci-senha-email'] label span").html(w_dados[1]);
                            };

                            if(w_dados[2] != ""){
                              $("[name='cc-modal-esqueci-senha-telefone']").removeClass("d-none");
                              $("[name='cc-modal-esqueci-senha-telefone'] label span").html(w_dados[2]);
                            };
                            
                          },function(error){
                            _cc.error(error);
                          }
                        );
                      };
                    },
                    function(error){
                      _cc.error(error)
                    }
                  );

                }else{
                  _cc.msg("Usuário não encontrado","danger",10);
                  _cc.focus("cc-login-ca-login");
                };
              },
              function(error){
                _cc.error(error)
              }
            )

          },
          function(error){
            _cc.error(error)
          }
        );
      });
    }
  };


  this.load = {
    acesso:function(){
      if(window.ccase.global.usuario != ""){
        window.w_dese_trace_info = "cc.oauth";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        var w_usuario_url = w_url_ccasegd + "login?tk="+ window.ccase.global.token_primario +"&caLogin=" + window.ccase.global.usuario + "";
        var w_usuario_ajax = _cc.ajax(w_usuario_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>VALIDA USUARIO",w_dese_trace_info,"");
      }else{
        _ccOath.modal.login();
        return false;
      };

      /* VARIAVEIS */
      $.when(w_usuario_ajax).then(
        function(json_resp_usuario){
          /* RESPONSE AJAX */
          _cc.validaResponseAjax(json_resp_usuario, w_usuario_url,1);

          var w_rest_calogin = json_resp_usuario.data;
          // var w_rest_cnusuario = _cc.string.mascaraASCII(w_rest_calogin, -3);
          var w_rest_cnusuario = _cc.string.mascaraASCII(w_rest_calogin,0);
          w_rest_cnusuario = w_rest_cnusuario.substr(8, 4);
          ccase.global.cod_usuario = w_rest_cnusuario;


          if(json_resp_usuario.cnRetorno >= 0){
            var w_calogin_tk = json_resp_usuario.data,
            w_calogin_tk = w_calogin_tk + ccase.global.datetime_ascii;


            ccase.global.token = w_calogin_tk;
            _ccConf.attrib.variaveis();

            ccase.global.system_token = json_resp_usuario.data;

            window.w_dese_trace_info = "cc.oauth";
            // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
            var a_ansenha_url = w_url_ccasegd + "login?tk=" + w_calogin_tk + "&anSenha=" + $("[name='cc-login-ca-password']").val() + "";
            var w_ansenha_ajax = _cc.ajax(a_ansenha_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>REST LOGIN/INICIAL: SENHA",w_dese_trace_info,"");
            
            $.when(w_ansenha_ajax).then(
              function(json_resp_senha){
                /* RESPONSE AJAX */
                _cc.validaResponseAjax(json_resp_senha, a_ansenha_url);

                if(json_resp_senha.cnRetorno == 0){

                  window.w_dese_trace_info = "cc.oauth";
                  // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
                  var w_usuario_url = ccase.url.consulta.usuario;
                  var w_usuario_ajax = _cc.ajax(w_usuario_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>DADOS DO USUARIO",window.w_dese_trace_info,"");

                  $.when(w_usuario_ajax).then(
                    function(json_resp_usuario){
                      /* RESPONSE AJAX */
                      _cc.validaResponseAjax(json_resp_usuario, w_usuario_url);

                      $(".cc-cabecalho-usuario-info").removeClass("d-none")
                      $("[name='cc-display-an-usuario']").html(json_resp_usuario.data[0].nmusuario)
                    },
                    function(error){
                      _cc.error(error);
                    }
                  );
                  _cc.datetime(ccase.global.datetime_system);
                  _ccConf.load.sistema.parametros.logado.master();
                  _cc.modal.close()
                }else{
                  window.ccase.global.usuario = "";
                };
                
              },
              function(error){
                _cc.error(error);
              }
            );
          };
        },
        function(error){
          _cc.error(error);
        }
      );
    },
    reacesso:function(){
      var w_param_sistema_url = window.ccase.url.ccasegd + "getinfo?url=" + w_url_hostname;
      window.w_dese_trace_info = "cc.oauth";
      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
      var w_param_sistema_ajax = _cc.ajax(w_param_sistema_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>REST LOGIN/INICIAL: GETINFO (RELOGIN)",w_dese_trace_info,"");
      
      $.when(w_param_sistema_ajax).then(
        function(json_resp_param_sistema){
          /* RESPONSE AJAX */
          _cc.validaResponseAjax(json_resp_param_sistema, w_param_sistema_url);
          var w_rest_info = json_resp_param_sistema.data,
          w_item = "";

          /* DATETIME */
          var w_rest_datetime = new Date(w_rest_info["DATETIME"]);
          w_rest_datetime = _cc.converteData(w_rest_datetime, "DDHHmm");
          var w_rest_datatime_ascii = _cc.string.mascaraASCII(w_rest_datetime,6);

          /* TOKEN */
          var w_rest_token = w_rest_sys + "" + w_rest_seg + "" + w_rest_cli + "";

          /* ATTRIB DE VARIAVEIS GLOBAIS */
          window.ccase.global.token_sistema = w_rest_token;
          window.ccase.global.token = w_rest_token;
          window.ccase.global.token_primario = w_rest_token;
          window.ccase.global.datetime_system = new Date(w_rest_info["DATETIME"]);;
          window.ccase.global.datetime = w_rest_datetime;
          window.ccase.global.datetime_ascii = w_rest_datatime_ascii;

          /* CHAMA LOGIN */
          /* VARIAVEIS */
          var w_calogin = $("[name='cc-reautenticar-ca-login']").val();
          window.w_dese_trace_info = "cc.oauth";
          // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
          var w_calogin_url = w_url_ccasegd + "login?tk="+ window.ccase.global.token_sistema +"&caLogin=" + w_calogin + "";
          var w_calogin_ajax = _cc.ajax(w_calogin_url,"GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>USUARIO (RELOGIN)",window.w_dese_trace_info,"");
          
          $.when(w_calogin_ajax).then(
            function(json_resp_usuario){
              /* RESPONSE AJAX */
              _cc.validaResponseAjax(json_resp_usuario, w_calogin_url);

              var w_rest_calogin = json_resp_usuario.data;
              // var w_rest_cnusuario = _cc.string.mascaraASCII(w_rest_calogin, -3);
              var w_rest_cnusuario = _cc.string.mascaraASCII(w_rest_calogin, 0);
              w_rest_cnusuario = w_rest_cnusuario.substr(8, 4);
              ccase.global.usuario = w_calogin;
              ccase.global.cod_usuario = w_rest_cnusuario;

              if(json_resp_usuario.cnRetorno == 0){
                var w_calogin_tk = json_resp_usuario.data,
                w_calogin_tk = w_calogin_tk + ccase.global.datetime_ascii;

                ccase.global.token = w_calogin_tk;
                _ccConf.attrib.variaveis();

                ccase.global.system_token = json_resp_usuario.data;
                
                window.w_dese_trace_info = "cc.oauth";
                // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
                var w_ansenha_url = w_url_ccasegd + "login?tk=" + w_calogin_tk + "&anSenha=" + $("[name='cc-reautenticar-ca-password']").val() + "";
                var w_ansenha_ajax = _cc.ajax(w_ansenha_url, "GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>SENHA (RELOGIN)",w_dese_trace_info,"");
                $.when(w_ansenha_ajax).then(
                  function(json_resp_senha){
                    /* RESPONSE AJAX */
                    _cc.validaResponseAjax(json_resp_senha, w_ansenha_url);

                    if(json_resp_senha.cnRetorno == 0){

                      window.w_dese_trace_info = "cc.oauth";
                      // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
                      var w_usuario_url = ccase.url.consulta.usuario;
                      var w_usuario_ajax = _cc.ajax(w_usuario_url, "GET","","","<strong class='cc-bg-preto text-yellow'>REST LOGIN/INICIAL:</strong><br>DADOS USUARIO (RELOGIN)",w_dese_trace_info,"");

                      $.when(w_usuario_ajax).then(
                        function(json_resp_usuario){

                          /* RESPONSE AJAX */
                          _cc.validaResponseAjax(json_resp_usuario, w_usuario_url);

                          $(".cc-cabecalho-usuario-info").removeClass("d-none")
                          $("[name='cc-display-an-usuario']").html(json_resp_usuario.data[0].nmusuario)

                          _cc.datetime(ccase.global.datetime_system);
                          _cc.efeito.blur("cc-cabecalho-agrupador",0);
                          _cc.efeito.blur("cc-menu-agrupador",0);
                          _cc.efeito.blur("cc-conteudo-agrupador",0);
                          _cc.efeito.blur("cc-rodape-agrupador",0);
                          
                          _cc.modal.close();
                          _cc.loading.hide();

                        },
                        function(error){
                          _cc.error(error);
                        }
                      );
                    };

                  },
                  function(error){
                    _cc.error(error);
                  }
                );
              };  

            },
            function(error){
              _cc.error(error);
            }
          );
        },
        function(error){

        }
      );
    }
  }

  this.modal = {
    login:function(){
      /* VARIAVEIS */
      var w_htm_obj_url = "/Content/Modal//cc-modal-login.html?v=" + Math.random(),
      w_htm_obj_ajax = "";

      /* AJAX */
      if($("[name='cc-modal-login']").length == 0){

        window.w_dese_trace_info = "cc.oauth";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"GET","text/html","-","<strong class='cc-bg-preto cc-text-verde'>AJAX MODAL HTML:</strong><br>LOGIN");
      }else{
        w_htm_obj_ajax = true;
      };

      $.when(w_htm_obj_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-login']").length == 0){
            $(w_htm).appendTo("body");
          };

          _cc.modal.show("cc-modal-login",1);
        },
        function(error){
          _cc.error(error);
        }
      );
    },
    novaSenha:function(){
      var w_htm_modal_url = "/Content/Modal//cc-modal-nova-senha.html?v="+Math.random(),
      w_htm_modal_ajax = "";

      /* AJAX */
      if($("[name='cc-modal-nova-senha']").length == 0){
        w_htm_modal_ajax = _cc.ajax(w_htm_modal_url,"get","text/html");
      }else{
        w_htm_modal_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_modal_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-nova-senha']").length == 0){
            $(w_htm).appendTo("body");
          };

          _cc.modal.show("cc-modal-nova-senha");

          $("[name='cc-nova-senha-senha-atual']").val("");
          $("[name='cc-nova-senha-ca-password']").val("");
          $("[name='cc-nova-senha-ca-password-repetir']").val("");

        },function(error){
          _cc.error(error);
        }
      );
    },
    novaSenhaToken:function(){
      var w_htm_modal_url = "/Content/Modal//cc-modal-token-senha.html?v="+Math.random(),
      w_htm_modal_ajax = "";

      /* AJAX */
      if($("[name='cc-modal-token-nova-senha']").length == 0){
        w_htm_modal_ajax = _cc.ajax(w_htm_modal_url,"get","text/html");
      }else{
        w_htm_modal_ajax = true;
      };

      /* WHEN */ 
      $.when(w_htm_modal_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-token-nova-senha']").length == 0){
            $(w_htm).appendTo("body");
          };

          _cc.modal.show("cc-modal-token-nova-senha");

          $("[name='cc-token-nova-senha-codigo']").val("");
          $("[name='cc-token-nova-senha-ca-password']").val("");
          $("[name='cc-token-nova-senha-ca-password-repetir']").val("");

        },function(error){
          _cc.error(error);
        }
      );
    },
    reautenticar:function(){
      
      clearTimeout(window.w_cc_timeout);
      /* NAO LOGADO */
      _cc.efeito.blur("cc-cabecalho-agrupador",1);
      _cc.efeito.blur("cc-menu-agrupador",1);
      _cc.efeito.blur("cc-conteudo-agrupador",1);
      _cc.efeito.blur("cc-rodape-agrupador",1);

      $(".cc-form-group-reautenticar-infos").removeClass("d-none");
      $(".cc-form-group-reautenticar-inputs").addClass("d-none");

      /* VARIAVEIS */
      var w_htm_obj_url = "/Content/Modal//cc-modal-reautenticar.html?v=" + Math.random(),
      w_htm_obj_ajax = "";

      /* AJAX */
      if($("[name='cc-modal-reautenticar']").length == 0){
        window.w_dese_trace_info = "cc.oauth";
        // p_url, p_method, p_content_type, p_data, p_origem, p_info, p_retorno
        w_htm_obj_ajax = _cc.ajax(w_htm_obj_url,"get","text/html","-","<strong class='cc-bg-preto cc-text-verde'>AJAX MODAL HTML:</strong><br>AUTENTICAR");
      }else{
        w_htm_obj_ajax = true;
      };

      $.when(w_htm_obj_ajax).then(
        function(w_resp_htm){
          var w_htm = w_resp_htm;

          /* APPEND DO MODAL */
          if($("[name='cc-modal-reautenticar']").length == 0){
            $(w_htm).appendTo("body");
          };
          
          /* USUARIO */
          $("[name='cc-reautenticar-an-login']").html(ccase.global.usuario)
          $("[name='cc-reautenticar-ca-login']").val(ccase.global.usuario)
          
          setTimeout(function(){
            _cc.modal.show("cc-modal-reautenticar",1);
            _cc.loading.hide();
          },100);
        },
        function(error){
          _cc.error(error);
        }
      );
    },
  };

  this.start = function(){
    _ccOath.listen.login();
    _ccOath.listen.reautenticar();
    _ccOath.listen.deslogar();
    _ccOath.listen.botoes();
  }
};

var _ccOath = new _ccaseOath();
