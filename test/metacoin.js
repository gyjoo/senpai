var Senpai = artifacts.require("./Senpai.sol");

contract('Senpai', function(accounts) {
  it("should get title", function() {
    return Senpai.deployed().then(function(instance) {
      instance.create_product("title", "url", 1,
    		1, 1, 1, "CSED232", "한글");
      // instance.purchase_product(1).then(function(value){
      //   console.log(value);
      // });
      /*
      instance.purchase_product(0);
      console.log('shit!!!!!');

      instance.getDownloadNum(0).then(function(value){
        console.log(value);
      })
      */

      /*
      instance.purchase_product(0).then(function(value){
        console.log(value);
      });
      */
      /*
      instance.create_product("title", "url", 1,
    		1, 1, 1, "CSED232", "한글");
      instance.edit_product(0, "title2222", "url22222", 12,
    		13, 14, 15, "CSED23212", "한22글", false);
      instance.create_product("title", "url", 1,
      	1, 1, 1, "CSED232", "영어");

      console.log(instance.getAAA.call());
      instance.purchase_product(0).then(function(value){
        console.log(value);
      });
      instance.getDescription(0).then(function(value) {
        console.log(value);
      });
      console.log('니 내 누군지 아니');
      instance.getTitle(0).then(function(value) {
        console.log('혼자 왔니');
        console.log(value);
      }).catch(function(err){
        console.log(err.message);
      });
      console.log('왔니');
*/
        /*
      instance.purchase_product(0).then(function(value) {
        console.log('이런 개새끼');
        console.log(value);
      }).catch(function(err) {
        console.log('error!!!!!!!!!!');
        console.log(err.message);
      });
      */
    });
  });
});
