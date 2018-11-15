#!/usr/bin/env bash

project="cubego_client"
target=""
username="$2"

if [ "$1" == "test" ]; then
    target="test_${project}"
elif [ "$1" == "prod" ]; then
    target="${project}"
else
    echo "Syntax Err: bash deploy.sh <test|prod> <username>"
    exit 1
fi

if [ "$username" == "" ]; then
    echo "Syntax Err: bash deploy.sh <test|prod> <username>"
    exit 1
fi


python pack_archive.py

scp ${project}.zip ${username}@139.59.244.132:/data/source/${target}.zip

ssh ${username}@139.59.244.132 "
    echo 'setting permission of /source'
    chgrp dev /data/source/${target}.zip || true
    chmod 775 /data/source/${target}.zip || true

    echo 'deploying files'
    bash /data/source/deploy_${target}.sh

    echo 'setting permission of /release'
    chgrp -R dev /data/release/${target} || true
    chmod -R 775 /data/release/${target} || true
"
echo "finish!"
