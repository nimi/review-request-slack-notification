#!/bin/bash

yarn build

yarn pack

git add .

git commit -m "Debugging"

git push
