#!/bin/bash
git pull
npm i
npx webpack --mode=production
docker rmi revotech2017/wi-user-manager:hlhvjoc
docker build -t revotech2017/wi-user-manager:hlhvjoc .
docker push revotech2017/wi-user-manager:hlhvjoc
