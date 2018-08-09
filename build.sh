#!/bin/bash

export FABRIC_CFG_PATH=$PWD
sh ./build_fabric.sh
sh ./build_docker.sh
sh ./build_composer.sh
sleep 5
docker-compose up -d
