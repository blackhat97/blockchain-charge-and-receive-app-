#!/bin/bash

docker rm -f $(docker ps -aq)
images=( company-orderer company-a company-b company-a-peer-1 company-a-peer-2 company-b-peer-1 company-b-peer-2 )
for i in "${images[@]}"
do
	  echo Removing image : $i
    docker rmi -f $i
done

#docker rmi -f $(docker images | grep none)
images=( dev-repairshop-peer dev-police-peer dev-insurance-peer dev-shop-peer)
for i in "${images[@]}"
do
	  echo Removing image : $i
    docker rmi -f $(docker images | grep $i )
done
