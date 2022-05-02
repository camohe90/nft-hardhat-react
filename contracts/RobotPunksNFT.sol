// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




contract RobotPunksNFT is ERC721, ERC721Burnable, Ownable, Pausable{

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    address payable public withdrawWallet;
    mapping (address=>uint256) public walletMints;
    string internal baseTokenUri;


    constructor () payable ERC721 ("Robots", "RBT"){
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }


    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exits');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_),".json"));

    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner{
        _unpause();
    }

    function mint(uint256 _quantity) public payable {
        require(msg.value == _quantity * mintPrice, 'wrong mint value');
        require(totalSupply + _quantity <= maxSupply, "No art left");
        require(walletMints[msg.sender] + _quantity < maxPerWallet, "You can't mint more tokens");

        for(uint256 i = 0; i< _quantity; i++){

            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
            walletMints[msg.sender]++;
        }

    }


    function getCountByAccout(address account) public view onlyOwner returns(uint256){
        return walletMints[account];
    }
   

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(' ');
        require(success, 'withdraw failed');
    }

    
   
}