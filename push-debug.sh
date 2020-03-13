#!/bin/bash

npm run build

npm run pack

git add .

git commit -m "Debugging"

git push
