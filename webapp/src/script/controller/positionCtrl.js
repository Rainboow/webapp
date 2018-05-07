'usr strict';

angular.module('app').controller('positionCtrl', ['$q', '$scope', '$http', '$state', function ($q, $scope, $http, $state) {
    $scope.isLogin = false;

    function getPosition() {
        //声明延迟加载对象
        var def = $q.defer();
        $http.get('/data/position.json?id=' + $state.params.id).then(function (resp) {
            $scope.position = resp.data;
            def.resolve(resp);
        });
        //返回promise属性
        return def.promise;
    }

    function getCompany(id) {
        $http.get('/data/company.json?id=' +id).then(function (resp) {
            $scope.company = resp.data;
        });
    }

    getPosition().then(function (obj) {
        getCompany(obj.companyId);
    });

}]);