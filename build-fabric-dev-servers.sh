#!/bin/bash
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh
composer network install --card PeerAdmin@hlfv1 --archiveFile block-cnr.bna
composer network start --networkName block-cnr --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@block-cnr
composer-rest-server
