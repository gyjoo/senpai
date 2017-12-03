
/*
----------------------------------------------------------------------

    ETHEREUM CONTRACT SETINGS

----------------------------------------------------------------------
 */

$.getScript( "truffle-contract.js", function( data, textStatus, jqxhr ) {
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});

var senpai_artifacts;
var Senpai;

$.getJSON('/Senpai.json', function(data) {
  senpai_artifacts = data;
  Senpai = TruffleContract(senpai_artifacts);
});

var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the abstraction for Use.
    Senpai.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },


  createProduct: function(title, file_url, price,
		created_at, source_type, department, course_id,
		description) {
    var self = this;

    this.setStatus("Initiating transaction... (please wait)");

    Senpai.deployed().then(function(instance) {

      instance.create_product(title, file_url, price,
    		created_at, source_type, department, course_id,
    		description).then(function(value){
          console.log(instance);
        }).catch(function(e) {
          // Handle the exception
        });
      return true;
    }).then(function() {
      self.setStatus("Transaction complete!");
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  purchaseProduct: function() {
    var self = this;

    this.setStatus("Initiating transaction... (please wait)");

    Senpai.deployed().then(function(instance) {

      instance.purchase_product(1).then(function(value){
          var _title = instance.getTitle.call(0).then(function(value){
            console.log(value);
          });
        }).catch(function(e) {
          // Handle the exception
        });
      return true;
    }).then(function() {
      self.setStatus("Transaction complete!");
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  },

  // instance.getProductsTotal.call().then(function(value){
  //   console.log(value);
  // });

    getProductsInfo: function() {
      var self = this;
      var info = {};
      var i;

      this.setStatus("Get product list... (please wait)");

        Senpai.deployed().then(function(instance) {

          // instance.getProductsTotal.call();


          // instance.getProductsTotal.call().then(function(value){
          //   i = value;
          // });

          // instance.getTitle.call(0).then(function(value){
          //   console.log(value);
          // });

          i = 10;

          // instance.getProductsTotal().then(function(value){
          //   i = value;
          //   console.log(value);
          // });

        while(i >= 0){
          var entry = {};

              instance.getTitle.call(i).then(function(value){
                console.log('제목' + value);
                entry['title'] = value;
              });
              instance.getDescription.call(i).then(function(value){
                console.log('내용' + value);
                entry['description'] = value;
              });
              instance.getDepartment.call(i).then(function(value){
                console.log('학과' + value);
                entry['department'] = value;
              });
              instance.getDownloadNum.call(i).then(function(value){
                console.log('다운 수' + value);
                entry['download_num'] = value;
              });
              instance.getCourseId.call(i).then(function(value){
                console.log('학수번호' + value);
                entry['courseId'] = value;
              });
              instance.getCreatedAt.call(i).then(function(value){
                console.log('시간' + value);
                entry['created_time'] = value;
              });

              info[i] = entry;
              i--;
        }
      }).then(function() {
        self.setStatus("Transaction complete!");
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });

      // document.getElementById("product_info").innerHTML = info;

      console.log(info);
      return info;

    }

  //
  // createProductBundleTest: function() {
  //   var self = this;
  //
  //   this.setStatus("Initiating transaction... (please wait)");
  //
  //   Senpai.deployed().then(function(instance) {
  //
  //     while (i < 50)
  //     instance.create_product("title", "url", i,
  //       1, 1, 1, "CSED232", "한글").then(function(value){
  //         console.log(instance);
  //       });
  //       const products_total = instance.products_total;
  //       console.log(products_total);
  //
  //       }).catch(function(e) {
  //         // console.log(instance);
  //       });
  //       // console.log(instance);
  //
  //     // instance.purchase_product(1).then(function(value){
  //     //   console.log(value);
  //     // });
  //
  //     // var _title = instance.getTitle.call();
  //     return true;
  //   }).then(function() {
  //     self.setStatus("Transaction complete!");
  //     // self.refreshBalance();
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error sending coin; see log.");
  //   });
  // },
  // sortingByLike: function() {
  //   var self = this;
  //
  //   this.setStatus("Sorting by likes... (please wait)");
  //
  //   Senpai.deployed().then(function(instance) {
  //
  //     instance.purchase_product(1).then(function(value){
  //         console.log(value);
  //         var _title = instance.getTitle.call();
  //         //   console.log(value);
  //         // });
  //         // console.log(_title);
  //
  //       }).catch(function(e) {
  //         // console.log(instance);
  //       });
  //       // console.log(instance);
  //
  //     // instance.purchase_product(1).then(function(value){
  //     //   console.log(value);
  //     // });
  //
  //     // var _title = instance.getTitle.call();
  //     return true;
  //   }).then(function() {
  //     self.setStatus("Sorting Complete!");
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error sending coin; see log.");
  //   });
  // }


};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
     console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
});






/*

  2. 검색
    - 학수번호
    - 제목
  3. 업로드
    - createProduct
  4. 로그인
    - currentProvider
    1. Sorting
      - 좋아요 순
      - 다운로드 순
      - 최근 순
*/


// instance.getTitle.call(0).then(function(value){
//   console.log(value);
// });
// instance.getDescription.call(0).then(function(value){
//   console.log(value);
// });
// instance.getDepartment.call(0).then(function(value){
//   console.log(value);
// });
// instance.getDownloadNum.call(0).then(function(value){
//   console.log(value);
// });
// instance.getCourseId.call(0).then(function(value){
//   console.log(value);
