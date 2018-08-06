#!/bin/sh

echo "#################################################################"
echo "#######        Generating cryptographic material       ##########"
echo "#################################################################"
PROJPATH=$(pwd)
BINPATH=$(pwd)/bin
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
echo "####### Generating anchor peer update for InsuranceOrg ##########"
echo "#################################################################"
$BINPATH/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $CLIPATH/CompnayAOrgAnchors.tx -channelID $CHANNEL_NAME -asOrg CompanyAOrgMSP

echo
echo "#################################################################"
echo "#######    Generating anchor peer update for ShopOrg   ##########"
echo "#################################################################"
$BINPATH/configtxgen -profile OrgsChannel -outputAnchorPeersUpdate $CLIPATH/CompnayBOrgAnchors.tx -channelID $CHANNEL_NAME -asOrg CompanyBOrgMSP
