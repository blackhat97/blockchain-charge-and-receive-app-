#!/bin/bash
set -eu

dockerFabricPull() {
  local FABRIC_TAG=$1
  for IMAGES in peer orderer ccenv; do
      echo "==> FABRIC IMAGE: $IMAGES"
      echo
      docker pull hyperledger/fabric-$IMAGES:$FABRIC_TAG
      docker tag hyperledger/fabric-$IMAGES:$FABRIC_TAG hyperledger/fabric-$IMAGES
  done
}

dockerCaPull() {
      local CA_TAG=$1
      echo "==> FABRIC CA IMAGE"
      echo
      docker pull hyperledger/fabric-ca:$CA_TAG
      docker tag hyperledger/fabric-ca:$CA_TAG hyperledger/fabric-ca
}

BUILD=
DOWNLOAD=
if [ $# -eq 0 ]; then
    BUILD=true
    PUSH=true
    DOWNLOAD=true
else
    for arg in "$@"
        do
            if [ $arg == "build" ]; then
                BUILD=true
            fi
            if [ $arg == "download" ]; then
                DOWNLOAD=true
            fi
    done
fi

if [ $DOWNLOAD ]; then
    : ${CA_TAG:="x86_64-1.1.0"}
    : ${FABRIC_TAG:="x86_64-1.1.0"}

    echo "===> Pulling fabric Images"
    dockerFabricPull ${FABRIC_TAG}

    echo "===> Pulling fabric ca Image"
    dockerCaPull ${CA_TAG}
    echo
    echo "===> List out hyperledger docker images"
    docker images | grep hyperledger*
fi

NODESPATH=$(pwd)/nodes
if [ $BUILD ];
    then
    echo '############################################################'
    echo '#                 BUILDING CONTAINER IMAGES                #'
    echo '############################################################'
    docker build -t company-orderer:latest $NODESPATH/orderer/
    docker build -t company-a-peer-1:latest $NODESPATH/company-a-peer-1/
    docker build -t company-a-peer-2:latest $NODESPATH/company-a-peer-2/
    docker build -t company-b-peer-1:latest $NODESPATH/company-b-peer-1/
    docker build -t company-b-peer-2:latest $NODESPATH/company-b-peer-2/
    docker build -t company-a-ca:latest $NODESPATH/company-a-ca/
    docker build -t company-b-ca:latest $NODESPATH/company-b-ca/
fi
