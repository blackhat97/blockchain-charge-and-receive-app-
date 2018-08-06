#!/bin/sh

echo "#################################################################"
echo "#######        Generating cryptographic material       ##########"
echo "#################################################################"
PROJPATH=$(pwd)
BINPATH=$(pwd)/bin
NODESPATH=$(pwd)/nodes
CLIPATH=$PROJPATH/cli/peers
ORDERERS=$CLIPATH/ordererOrganizations
PEERS=$CLIPATH/peerOrganizations
CHANNEL_NAME="default"

rm -rf $CLIPATH
$BINPATH/cryptogen generate --config=$PROJPATH/crypto-config.yaml --output=$CLIPATH

echo
echo "##########################################################"
echo "#########  Generating Orderer Genesis block ##############"
echo "##########################################################"
$BINPATH/configtxgen -profile OrgsGenesis -outputBlock $CLIPATH/genesis.block

echo
echo "#################################################################"
echo "### Generating channel configuration transaction 'channel.tx' ###"
echo "#################################################################"
$BINPATH/configtxgen -profile OrgsChannel -outputCreateChannelTx $CLIPATH/channel.tx -channelID $CHANNEL_NAME
cp $CLIPATH/channel.tx $PROJPATH/web

echo
echo "#################################################################"
echo "####### Generating anchor peer update for CompnayAOrg ###########"
echo "#################################################################"
$BINPATH/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $CLIPATH/CompnayAOrgAnchors.tx -channelID $CHANNEL_NAME -asOrg CompanyAOrgMSP

echo
echo "#################################################################"
echo "######    Generating anchor peer update for CompnayBOrg   #######"
echo "#################################################################"
$BINPATH/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $CLIPATH/CompnayBOrgAnchors.tx -channelID $CHANNEL_NAME -asOrg CompanyBOrgMSP

echo
echo "#################################################################"
echo "############    Generating nodes directories   ##################"
echo "#################################################################"

rm -rf $NODESPATH/orderer/crypto
rm -rf $NODESPATH/company-a-peer-1/crypto
rm -rf $NODESPATH/company-a-peer-2/crypto
rm -rf $NODESPATH/company-b-peer-1/crypto
rm -rf $NODESPATH/company-b-peer-2/crypto

mkdir -p $NODESPATH/orderer/crypto
mkdir -p $NODESPATH/company-a-peer-1/crypto
mkdir -p $NODESPATH/company-a-peer-2/crypto
mkdir -p $NODESPATH/company-b-peer-1/crypto
mkdir -p $NODESPATH/company-b-peer-2/crypto

cp -r $ORDERERS/orderer-org/orderers/orderer0/msp $NODESPATH/orderer/crypto
cp -r $ORDERERS/orderer-org/orderers/orderer0/tls $NODESPATH/orderer/crypto

cp -r $PEERS/company-a-org/peers/company-a-peer-1/msp $NODESPATH/company-a-peer-1/crypto
cp -r $PEERS/company-a-org/peers/company-a-peer-1/tls $NODESPATH/company-a-peer-1/crypto
cp -r $PEERS/company-a-org/peers/company-a-peer-2/msp $NODESPATH/company-a-peer-2/crypto
cp -r $PEERS/company-a-org/peers/company-a-peer-2/tls $NODESPATH/company-a-peer-2/crypto
cp -r $PEERS/company-b-org/peers/company-b-peer-1/msp $NODESPATH/company-b-peer-1/crypto
cp -r $PEERS/company-b-org/peers/company-b-peer-1/tls $NODESPATH/company-b-peer-1/crypto
cp -r $PEERS/company-b-org/peers/company-b-peer-2/msp $NODESPATH/company-b-peer-2/crypto
cp -r $PEERS/company-b-org/peers/company-b-peer-2/tls $NODESPATH/company-b-peer-2/crypto

cp $CLIPATH/genesis.block $NODESPATH/orderer/crypto/

COMPANY_A_CA_PATH=$NODESPATH/companyACA
COMPANY_B_CA_PATH=$NODESPATH/companyBCA

rm -rf $COMPANY_A_CA_PATH/ca
rm -rf $COMPANY_A_CA_PATH/tls
rm -rf $COMPANY_B_CA_PATH/ca
rm -rf $COMPANY_B_CA_PATH/tls

mkdir -p $COMPANY_A_CA_PATH/ca
mkdir -p $COMPANY_A_CA_PATH/tls
mkdir -p $COMPANY_B_CA_PATH/ca
mkdir -p $COMPANY_B_CA_PATH/tls

cp $PEERS/company-a-org/ca/* $COMPANY_A_CA_PATH/ca
cp $PEERS/company-a-org/tlsca/* $COMPANY_A_CA_PATH/tls
mv $COMPANY_A_CA_PATH/ca/*_sk $COMPANY_A_CA_PATH/ca/key.pem
mv $COMPANY_A_CA_PATH/ca/*-cert.pem $COMPANY_A_CA_PATH/ca/cert.pem
mv $COMPANY_A_CA_PATH/tls/*_sk $COMPANY_A_CA_PATH/tls/key.pem
mv $COMPANY_A_CA_PATH/tls/*-cert.pem $COMPANY_A_CA_PATH/tls/cert.pem

cp $PEERS/company-b-org/ca/* $COMPANY_B_CA_PATH/ca
cp $PEERS/company-b-org/tlsca/* $COMPANY_B_CA_PATH/tls
mv $COMPANY_B_CA_PATH/ca/*_sk $COMPANY_B_CA_PATH/ca/key.pem
mv $COMPANY_B_CA_PATH/ca/*-cert.pem $COMPANY_B_CA_PATH/ca/cert.pem
mv $COMPANY_B_CA_PATH/tls/*_sk $COMPANY_B_CA_PATH/tls/key.pem
mv $COMPANY_B_CA_PATH/tls/*-cert.pem $COMPANY_B_CA_PATH/tls/cert.pem

WEBCERTS=$NODESPATH/web/certs
rm -rf $WEBCERTS
mkdir -p $WEBCERTS
cp $NODESPATH/orderer/crypto/tls/ca.crt $WEBCERTS/ordererOrg.pem
cp $NODESPATH/company-a-peer-1/crypto/tls/ca.crt $WEBCERTS/insuranceOrg.pem
cp $NODESPATH/company-a-peer-2/crypto/tls/ca.crt $WEBCERTS/policeOrg.pem
cp $NODESPATH/company-b-peer-1/crypto/tls/ca.crt $WEBCERTS/repairShopOrg.pem
cp $NODESPATH/company-b-peer-2/crypto/tls/ca.crt $WEBCERTS/shopOrg.pem
cp $PEERS/company-a-org/users/Admin@company-a-org/msp/keystore/* $WEBCERTS/Admin@company-a-org-key.pem
cp $PEERS/company-a-org/users/Admin@company-a-org/msp/signcerts/* $WEBCERTS/
cp $PEERS/company-b-org/users/Admin@company-b-org/msp/keystore/* $WEBCERTS/Admin@company-b-org-key.pem
cp $PEERS/company-b-org/users/Admin@company-b-org/msp/signcerts/* $WEBCERTS/
