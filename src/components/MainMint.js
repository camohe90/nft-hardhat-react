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
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value:ethers.utils.parseEther((0.02*mintAmount).toString())
                });
                console.log('response', response);

            } catch(err){
                alert("error", err)
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
                    <Text fontSize="48px" textShadow="0 5px #000000" fontWeight="Bold">Car NFT</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily= "Roboto"
                        textShadow="0 2px 2px #000000"
                    >
                        
                        It's 2022. would you like to buy a car with crypto?
                    </Text>
                </div>
                {isConnected ?(
                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecrement}
                            >-</Button>
                            <Input 
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            paddingLeft="19px"
                            fontSize="20px"
                            textAlign="center"
                            marginTop="10px"
                            type="number" value={mintAmount}/>
                            <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            textAlign="center"
                            onClick={handleIncrement}>+</Button>
                        </Flex>
                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        fontSize="20px"
                        padding="15px"
                        marginTop="10px"
                        fontWeight="Bold"
                        onClick={handleMint}>Mint</Button>
                    </div>
                ):(
                    <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="Roboto"
                    textShadow="0 3px #000000"
                    color="#D6517D"
                    >
                        You must be Connected to mint</Text>
                    )}
            </Box>
        </Flex>
    );

};

export default MainMint;
