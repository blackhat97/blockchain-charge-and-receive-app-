docker run \
-d \
--name vda \
-e REACT_APP_REST_SERVER_CONFIG='{"webSocketURL": "ws://app.nbroker.net:3000", "httpURL": "http://app.nbroker.net:3000/api"}' \
-p 6001:6001 \
-v "`pwd`/src:/usr/src/app/src" \
-v "`pwd`/block-cnr:/usr/src/app/block-cnr" \
block-cnr-app
