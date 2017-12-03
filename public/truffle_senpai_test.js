
/*
----------------------------------------------------------------------

    ETHEREUM CONTRACT SETINGS

----------------------------------------------------------------------
 */
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.

$.getScript( "truffle-contract.js", function( data, textStatus, jqxhr ) {
  // console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});

// MetaCoin is our usable abstraction, which we'll use through the code below.
var senpai_artifacts;
var Senpai;

// $.getJSON('../build/contracts/MetaCoin.json', function(data) {
$.getJSON('/Senpai.json', function(data) {
  senpai_artifacts = data;
  Senpai = TruffleContract(senpai_artifacts);
});

var accounts;
var account;

// var Senpai = artifacts.require("./Senpai.sol");

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
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


  createProduct: function() {
    var self = this;

    this.setStatus("Initiating transaction... (please wait)");

    Senpai.deployed().then(function(instance) {

      instance.create_product("title", "url", 1,
        1, 1, 1, "CSED232", "한글").then(function(value){
          console.log(instance);
          instance.getTitle.call(0).then(function(value){
            console.log(value);
          });
          instance.getDescription.call(0).then(function(value){
            console.log(value);
          });
          instance.getDepartment.call(0).then(function(value){
            console.log(value);
          });
          instance.getDownloadNum.call(0).then(function(value){
            console.log(value);
          });
          instance.getCourseId.call(0).then(function(value){
            console.log(value);
          });
          
          // var _title = instance.getTitle.call(0);
          //   console.log(value);
          // });
          // console.log(_title);

        }).catch(function(e) {
          // console.log(instance);
        });
        // console.log(instance);

      // instance.purchase_product(1).then(function(value){
      //   console.log(value);
      // });

      // var _title = instance.getTitle.call();
      return true;
    }).then(function() {
      self.setStatus("Transaction complete!");
      // self.refreshBalance();
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
          console.log(value);
          var _title = instance.getTitle.call();
          //   console.log(value);
          // });
          // console.log(_title);

        }).catch(function(e) {
          // console.log(instance);
        });
        // console.log(instance);

      // instance.purchase_product(1).then(function(value){
      //   console.log(value);
      // });

      // var _title = instance.getTitle.call();
      return true;
    }).then(function() {
      self.setStatus("Transaction complete!");
      // self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
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
});


// $.getJSON('./build/contracts/Senpai.json', function(data) {
//   // Get the necessary contract artifact file and instantiate it with truffle-contract
//   var SenpaiArtifact = data;
//   App.contracts.Senpai = TruffleContract(SenpaiArtifact);
//
//   // Set the provider for our contract
//   App.contracts.Senpai.setProvider(App.web3Provider);
//
// });
//
// $(document).ready(function() {
//   App.contracts.Senpai = TruffleContract(SenpaiArtifact);
//
//   // Set the provider for our contract
//   App.contracts.Senpai.setProvider(App.web3Provider);
//
//   // contract('Senpai', function(accounts) {
//     console.log('haha');
//   // });
//
// });



// contract('Senpai', function(accounts) {
//   it("should get title", function() {
//     return Senpai.deployed().then(function(instance) {
//       instance.create_product("title", "url", 1,
//     		1, 1, 1, "CSED232", "한글");
//       instance.purchase_product(1).then(function(value){
//         console.log(value);
//       });
//     });
//   });
// });
