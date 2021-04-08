angular.module('main')
    .filter('split', function() {
    return function(input, delimiter) {
    var delimiter = delimiter || '|';

    return input.split(delimiter).join("<br />");
    }}).factory('Scopes', function($rootScope){
        var mem = {};

        return {
            store: function(key, value) {
                $rootScope.$emit('scope.stored', key);
                mem[key] = value;
            },
            get: function(key) {
                return mem[key];
            }
        }

    }).controller('homeControllerPlatform', function($scope, $http, Scopes) {
        
        $http.get("https://private-59658d-celulardireto2017.apiary-mock.com/plataformas")
        .then(function (response){
            $scope.platforms = response.data.plataformas;
        })

        Scopes.store('homeControllerPlatform', $scope);

        $scope.getNamePlatform = function(nome) {
            $scope.nomePlataforma = nome;
            return $scope.nomePlataforma;
        }

        $scope.getSkuPlatform = function(sku) {
            $scope.skuPlataforma = sku;
            return $scope.skuPlataforma;
        }

        $scope.missionCompled = function()
        {
            function reorganize() {
                   document.querySelectorAll('p.options-description.ng-binding').forEach((item) => {
                       item.innerHTML = item.textContent;
                       
                   });
                   document.querySelector('.options-content').style.display = "flex";
            }

            reorganize();
        }
        
    }).controller('plansController', function($scope, $http, Scopes) {

        $scope.sku = Scopes.get('homeControllerPlatform').skuPlataforma;

        $scope.carregaPlanos = function () {
            var url_api = "https://private-59658d-celulardireto2017.apiary-mock.com/planos/" + $scope.sku;
            $http.get(url_api)
                .then(function(response){
                    $scope.plans = response.data.planos;
                });
        }

        Scopes.store('plansController', $scope);

        $scope.getPlanName = function(nome) {
            $scope.nomePlano = nome;
            return $scope.nomePlano;
        }


        $scope.$on('$viewContentLoaded', function() {
            $scope.carregaPlanos();
        })
    }).controller('dataUserController', function($scope, Scopes){
        
        Scopes.store('dataUserController', $scope);

        $scope.sendData = function() {
            if ($('#nome').val() && $('#email').val() && $('#nascimento').val() && $('#cpf').val() && $('#telefone').val() != ' ') {
                let jsonSend = {
                    "Nome": $('#nome').val(),
                    "Email": $('#email').val(),
                    "Nascimento": $('#nascimento').val(),
                    "Telefone": $('#telefone').val(),
                    "Plataforma": Scopes.get('homeControllerPlatform').nomePlataforma,
                    "Plano": Scopes.get('plansController').nomePlano,
                }
                console.log(JSON.stringify(jsonSend));
                console.log(jsonSend);
                $('.alert-form').addClass('success');
                $('.alert-form').text('Formulário enviado com sucesso.');

            } else {
                $('.alert-form').addClass('danger');
                $('.alert-form').text('Preencha todos os campos do formulário.');
            }
            
        }

        
    }).directive('afterRender', ['$timeout', function ($timeout) {
        var def = {
            link: function (scope, element, attrs) {
                $timeout(scope.$eval(attrs.afterRender), 800);  //Calling a scoped method
            }
        };
        return def;
    }]);

    
   