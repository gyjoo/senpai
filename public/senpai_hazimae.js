
/*
----------------------------------------------------------------------

    ETHEREUM CONTRACT SETINGS

----------------------------------------------------------------------
 */

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

    // alert(senpai_artifacts);
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
    console.log(message);
    // var status = document.getElementById("status");
    // status.innerHTML = message;
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
          // console.log(instance);

          // var total;
          // instance.getProductsTotal.call().then(function(value){
          //   total = value - 1;
          //   console.log(total);
          // });
          instance.getTitle.call(total).then(function(value){
            console.log('새 소스 추가 : ' + value);
            console.log("ahahahaha");
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

  purchaseProduct: function(pid) {
    var self = this;

    this.setStatus("Initiating transaction... (please wait)");

    Senpai.deployed().then(function(instance) {

      instance.purchase_product(pid).then(function(value){
          var _title = instance.getTitle.call(pid).then(function(value){
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

    getProductsInfo: function(info_cb) {
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
                // console.log('제목' + value);
                entry['title'] = value;
              });
              instance.getDescription.call(i).then(function(value){
                // console.log('내용' + value);
                entry['description'] = value;
              });
              instance.getDepartment.call(i).then(function(value){
                // console.log('학과' + value);
                entry['department'] = value;
              });
              instance.getDownloadNum.call(i).then(function(value){
                // console.log('다운 수' + value);
                entry['download_num'] = value;
              });
              instance.getCourseId.call(i).then(function(value){
                // console.log('학수번호' + value);
                entry['courseId'] = value;
              });
              instance.getCreatedAt.call(i).then(function(value){
                // console.log('시간' + value);
                entry['created_at'] = value;
              });

              info[i] = entry;
              i--;
        }
      }).then(function() {
        self.setStatus("Transaction complete!");
        info_cb(info);
        return info
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });

      // document.getElementById("product_info").innerHTML = info;
      // console.log(info);
      // alert(info);
      return info;
    },

    getProduct: function(info_cb) {
      var self = this;
      var info = {};
      var i;

      this.setStatus("Get product list... (please wait)");

        Senpai.deployed().then(function(instance) {

        instance.getTitle.call(i).then(function(value){
          // console.log('제목' + value);
          entry['title'] = value;
        });

      }).then(function() {
        self.setStatus("Transaction complete!");
        info_cb(info);
        return info
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });

      // document.getElementById("product_info").innerHTML = info;
      // console.log(info);
      // alert(info);
      return info;
    }


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

    App.start();
});
