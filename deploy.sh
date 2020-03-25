#!/bin/bash
git stash
git pull
git stash pop
npm i
npx webpack --mode=production
docker rmi registry.i2g.cloud/pvep/wi-user-manager
docker build -t registry.i2g.cloud/pvep/wi-user-manager .
docker push registry.i2g.cloud/pvep/wi-user-manager
kubectl patch deployment wi-user-manager-client -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
