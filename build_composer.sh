#!/bin/sh

echo "#################################################################"
echo "#####    Generating composer connection.json material       #####"
echo "#################################################################"

PROJECTPATH=$(pwd)
PEERSPATH=$(pwd)/cli/peers
NODESPATH=$(pwd)/nodes
COMPOSERPATH=$(pwd)/composer
BNAPATH=$COMPOSERPATH/bna
PROFILEPATH=$COMPOSERPATH/profile
TMPPATH=$COMPOSERPATH/tmp

ORDERER_SOURCE=$PEERSPATH/ordererOrganizations/orderer-org
COMPANY_A_SOURCE=$PEERSPATH/peerOrganizations/company-a-org
COMPANY_B_SOURCE=$PEERSPATH/peerOrganizations/company-b-org

ORDERER_TARGET=$TMPPATH/orderer
COMPANY_A_TARGET=$TMPPATH/company-a
COMPANY_B_TARGET=$TMPPATH/company-b

mkdir -p $ORDERER_TARGET
mkdir -p $COMPANY_A_TARGET
mkdir -p $COMPANY_B_TARGET

awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' $ORDERER_SOURCE/orderers/orderer0/tls/ca.crt > $ORDERER_TARGET/ca.txt
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' $COMPANY_A_SOURCE/peers/company-a-peer-1/tls/ca.crt > $COMPANY_A_TARGET/ca.txt
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' $COMPANY_B_SOURCE/peers/company-b-peer-1/tls/ca.crt > $COMPANY_B_TARGET/ca.txt

ORDERER_CA=`cat $ORDERER_TARGET/ca.txt`
COMPANY_A_CA=`cat $COMPANY_A_TARGET/ca.txt`
COMPANY_B_CA=`cat $COMPANY_B_TARGET/ca.txt`

COMPANY_A_JSON=`cat ${PROFILEPATH}/company-a.json`
COMPANY_B_JSON=`cat ${PROFILEPATH}/company-b.json`
eval "cat << EOF > ${COMPANY_A_TARGET}/connection.json
${COMPANY_A_JSON}
EOF"
eval "cat << EOF > ${COMPANY_B_TARGET}/connection.json
${COMPANY_B_JSON}
EOF"
#echo $COMPANY_A_JSON > DevServer_connection2.json

cp -p $COMPANY_A_SOURCE/users/Admin@company-a-org/msp/signcerts/A*.pem $COMPANY_A_TARGET/
cp -p $COMPANY_A_SOURCE/users/Admin@company-a-org/msp/keystore/*_sk $COMPANY_A_TARGET/
cp -p $COMPANY_B_SOURCE/users/Admin@company-b-org/msp/signcerts/A*.pem $COMPANY_B_TARGET/
cp -p $COMPANY_B_SOURCE/users/Admin@company-b-org/msp/keystore/*_sk $COMPANY_B_TARGET/

echo "#############################################r####################"
echo "#######        Generating composer card material       ##########"
echo "#################################################################"

cd $COMPANY_A_TARGET && \
    composer card create -p $COMPANY_A_TARGET/connection.json -u PeerAdmin -c $COMPANY_A_TARGET/Admin@company-a-org-cert.pem -k $COMPANY_A_TARGET/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@block-cnr-network-company-a.card && \
    composer network install --card PeerAdmin@block-cnr-network-company-a --archiveFile $BNAPATH/block-cnr-network.bna

cd $COMPANY_B_TARGET && \
    composer card create -p $COMPANY_B_TARGET/connection.json -u PeerAdmin -c $COMPANY_B_TARGET/Admin@company-b-org-cert.pem -k $COMPANY_B_TARGET/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@block-cnr-network-company-b.card && \
    composer network install --card PeerAdmin@block-cnr-network-company-b --archiveFile $BNAPATH/block-cnr-network.bna

