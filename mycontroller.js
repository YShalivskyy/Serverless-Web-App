angular.module('webApp', [])
  .controller('myCtrl', function ($scope, $http) {
    $scope.postForm = function(){
        var UserId = new Date();
        var RegistrationDate = new Date();
        var FirstName = $scope.iFirstName;
        var LastName = $scope.iLastName;
        var Email = $scope.iEmail;
        var Phone = $scope.iPhone;
        var dataObj = new Object();
        dataObj.operation = "POST";
        dataObj.Item = {UserId, RegistrationDate, FirstName, LastName, Email, Phone};
        
      $http({
        method  : 'POST',
        url     : 'https://ACCOUNT_NUMBER.execute-api.us-east-1.amazonaws.com/prod/YOUR_REPOSITORY',
        dataType: 'json',
        data    : dataObj,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).success(function (data) {
          console.log(data);
          alert("Thank you for registration");
        }).error(function (error) {
          alert("Error");
        });
    }
});