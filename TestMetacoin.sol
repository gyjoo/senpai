
pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";
import "../contracts/Senpai.sol";

contract TestMetacoin {
  // Senpai senpai = Senpai(DeployedAddresses.Senpai());
  address me;
  function testInitialBalanceUsingDeployedContract() {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());
    Senpai sen = Senpai(DeployedAddresses.Senpai());
    sen.testCreateProduct();
    uint expected = 10000;
    string memory ex_title = "hihi";
    string storage result = sen.getTitle(0);
    sen.compare(result, ex_title);
    //Assert.equal(uint(1), meta.getBalance(tx.origin), "fail!!!!!!");
    //Assert.equal(uint(1), (sen.compare(sen.getTitle(0), ex_title)), "fail to compare get title");
    Assert.equal(uint(1), sen.getPrice(0), 'fail!!!!!!');
    //Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");

  }

}
/*

pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MetaCoin.sol";

contract TestMetacoin {

  function testInitialBalanceUsingDeployedContract() {
    MetaCoin meta = MetaCoin(DeployedAddresses.MetaCoin());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

  function testInitialBalanceWithNewMetaCoin() {
    MetaCoin meta = new MetaCoin();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
  }

}
*/
