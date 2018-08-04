#!/bin/sh

echo "#################################################################"
echo "#######        Generating cryptographic material       ##########"
echo "#################################################################"
PROJPATH=$(pwd)
BINPATH=$(pwd)/bin
CLIPATH=$PROJPATH/cli/peers
ORDERERS=$CLIPATH/ordererOrganizations
PEERS=$CLIPATH/peerOrganizations

rm -rf $CLIPATH
$BINPATH/cryptogen generate --config=$PROJPATH/crypto-config.yaml --output=$CLIPATH
