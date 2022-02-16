const NFTMaktplUp = artifacts.require("NFTMarketplaceUpgradable");
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const BN = web3.utils.toBN;

let TokenName="CTokem";
let TokenSymbol="CT";
let TokenBaseURI="https;//www.google.com/";
let IPFSHASH="QmXG9i6vszJBUAzUjk1fPeGA9Ag71fmpKYcJGTumA5BZ3f"
let TotalSupply=-0;
let Owner="0xb20b32f703BB2EF7C9b9a7363E159aD771338C26"
let User1="0x3d27862aAcCe8D8bEfeDf18e4495aB554C521294"
let User2="0x536f7F046A6e276d2ed49CB7bF8475bcBf08E3f0"
let RenounceOwnerAddress="0x0000000000000000000000000000000000000000"
console.log("Testing ERC721 Upgradeable Contract @ Raja Ragavan");
contract("NFTMarketplaceUpgradable", async (accounts) => {

    it("Contract Owner", async function () {
      const Tester = await NFTMaktplUp.deployed();
      expect(await Tester.owner()).to.equal(Owner);
    });
    
    it("Contract Name", async function () {
        const Tester = await NFTMaktplUp.deployed();
        expect(await Tester.name()).to.equal(TokenName);
        //await reservoir.pause();
        //expect(await reservoir.paused()).is.false;

    });

    it("Contract Token", async function () {
      const Tester = await NFTMaktplUp.deployed();
      expect(await Tester.symbol()).to.equal(TokenSymbol);
      //await reservoir.pause();
      //expect(await reservoir.paused()).is.false;

   });

  it("Contract Base Token URI", async function () {
    const Tester = await NFTMaktplUp.deployed();
   
    await Tester.mint(User1,1,IPFSHASH)
    TotalSupply++;
    //console.log(await Tester.tokenURI(1));
    expect(await Tester.tokenURI(1)).to.equal(TokenBaseURI+IPFSHASH);

});

it("Check Initially Contract is Paused", async function () {
  const Tester = await NFTMaktplUp.deployed();
 
  //await reservoir.pause();
  expect(await Tester.paused()).is.false;

});

it("Check Now Contract is Paused", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.pause();
  expect(await Tester.paused()).is.true;
});

it("Check Now Contract is UnPaused", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.unpause();
  expect(await Tester.paused()).is.false;
});

it("Minting a Token", async function () {
  const Tester = await NFTMaktplUp.deployed();
  //let GetTotalSupplyfromContract=await Tester.totalSupply()
  //console.log(GetTotalSupplyfromContract.words[0]);
  //console.log(await Tester.mint('0x3d27862aAcCe8D8bEfeDf18e4495aB554C521294',1,'QmXG9i6vszJBUAzUjk1fPeGA9Ag71fmpKYcJGTumA5BZ3f')); 
  await Tester.mint(User1,2,IPFSHASH)
  TotalSupply++;
  let GetTotalSupplyfromContract=await Tester.totalSupply()
  // let GetTotalSupplyfromContract1=await Tester.totalSupply()
  // console.log(GetTotalSupplyfromContract1.words[0]);
  let totalSupplyNow=GetTotalSupplyfromContract.words[0]
  expect(await totalSupplyNow).to.equal(TotalSupply);
});


it("Verifying the owner of minited token", async function () {
  const Tester = await NFTMaktplUp.deployed();
  // console.log(await Tester.ownerOf(1)); 
  expect(await Tester.ownerOf(2)).to.equal(User1);
});

it("Transfer Minited token from Owner to another user", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.mint(Owner,3,IPFSHASH)
  TotalSupply++
  await Tester.transferFrom(Owner,User1,3)
  expect(await Tester.ownerOf(3)).to.equal(User1);
});

it("Burn Minited token", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.mint(Owner,4,IPFSHASH)
  TotalSupply++;
  expect(await Tester.ownerOf(4)).to.equal(Owner);
  await Tester.burn(4)
  TotalSupply--;
  let GetTotalSupplyfromContract=await Tester.totalSupply()
  let totalSupplyNow=GetTotalSupplyfromContract.words[0]
  expect(await totalSupplyNow).to.equal(TotalSupply);
});
it("Try to Transfer Non-Exiting  token [ Execption Occured & Handled ]", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await expectRevert(Tester.transferFrom(Owner,User1,10),'ERC721: operator query for nonexistent token -- Reason given: ERC721: operator query for nonexistent token.')

});
it("Try to Burn Non-Exiting  token [ Execption Occured & Handled ]", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await expectRevert(Tester.burn(5),'ERC721: operator query for nonexistent token -- Reason given: ERC721: operator query for nonexistent token.')

});

it("Try to Transfer Minited token from Owner to another user when Contract Paused [ Execption Occured & Handled ]", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.mint(Owner,4,IPFSHASH)
  TotalSupply++
  await Tester.pause();
  //expect(await Tester.paused()).is.true;

  await expectRevert(Tester.transferFrom(Owner,User1,4),'ERC721Pausable: token transfer while paused -- Reason given: ERC721Pausable: token transfer while paused.');
});

it("Try to Transfer Minited token from Owner to another user when Contract Un-Paused [ Execption Not Occured ]", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.unpause();
  await Tester.mint(Owner,6,IPFSHASH)
  TotalSupply++
  //await Tester.unpause();
  await Tester.transferFrom(Owner,User1,6)
  expect(await Tester.ownerOf(6)).to.equal(User1);
});

it("Approving Token to Transfer", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.approve(User2,3,{from:User1})

});

it("Check the token is Approved For Transfer", async function () {
  const Tester = await NFTMaktplUp.deployed();
  //console.log(await Tester.getApproved(3));
  expect(await Tester.getApproved(3)).to.equal(User2);
});

it("Transfer Approved Token Form One User to another User Behalf of Token Owner", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.safeTransferFrom(User1,User2,3,{from:User2})
  //console.log(await Tester.safeTransferFrom(User1,User2,3,{from:User2}));
  expect(await Tester.ownerOf(3)).to.equal(User2);
});

it("Checking Balance of Tokens in Owner of Account", async function () {
  const Tester = await NFTMaktplUp.deployed();
  let getBalance_data=await Tester.balanceOf(Owner)
  let Balance_tokens=getBalance_data.words[0]
  expect(Balance_tokens).to.equal(1);
  //console.log(await Tester.balanceOf(Owner));
  
});

it("Checking Balance of Tokens in User1 of Account", async function () {
  const Tester = await NFTMaktplUp.deployed();
  let getBalance_data=await Tester.balanceOf(User1)
  let Balance_tokens=getBalance_data.words[0]
  expect(Balance_tokens).to.equal(3);
  //console.log(await Tester.balanceOf(Owner));
});



it("Transfer Contract OwnerShip", async function () {
  const Tester = await NFTMaktplUp.deployed();
  await Tester.transferOwnership(User1)
  //console.log(await Tester.safeTransferFrom(User1,User2,3,{from:User2}));
  expect(await Tester.owner()).to.equal(User1);
});
  
it("Renounce OwnerShip", async function () {
  const Tester = await NFTMaktplUp.deployed();
  //console.log(await Tester.renounceOwnership({from:User1}));
  await Tester.renounceOwnership({from:User1})
  expect(await Tester.owner()).to.equal(RenounceOwnerAddress);
});

});
