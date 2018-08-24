#!/bin/bash

export FABRIC_CFG_PATH=$PWD
sh ./build_fabric.sh
sh ./build_docker.sh
sleep 5
docker-compose up -d
sleep 5
sh ./build_composer.sh
