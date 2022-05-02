import {useState} from 'react';
import { ethers, BigNumber } from 'ethers';
import {Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import robotPunksNFT from "../RobotPunks.json";

const robotPunksNFTAddress = "0x4cEE8D9451cA130D0EEfD91C369D5C5F0eFF49c2";

const MainMint = ({accounts, setAccounts}) =>{
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    
    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                robotPunksNFTAddress,
                robotPunksNFT.abi,
                signer
            );

            try{
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response', response);

            } catch(err){
                console.log("error", err)
            }
        }
    }

    const handleDecrement = () =>{
        if(mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () =>{
        if(mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };
    return(
        <Flex justify="center" align="center" height="100vh" padding="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">Car NFT</Text>
                    <p>It's 2022. would you like to buy a car with crypto?</p>
                </div>
                {isConnected ?(
                    <div>
                        <div>
                            <button onClick={handleDecrement}>-</button>
                            <input type="number" value={mintAmount}/>
                            <button onClick={handleIncrement}>+</button>
                        </div>
                        <button onClick={handleMint}>Mint</button>
                    </div>
                ):(
                    <p>You must be Connected to mint</p>
                    )}
            </Box>
        </Flex>
    );

};

export default MainMint;
