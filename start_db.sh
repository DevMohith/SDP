#!/bin/bash
docker run -it --name postgres-container -e POSTGRES_PASSWORD=root -e POSTGRES_DB=sdp -v /srv/sdp_database:/var/lib/postgresql/data -v /home/sotiris/Desktop/LIB_INV.sql:/docker-entrypoint-initdb.d/LIB_INV.sql -p 5432:5432 -d postgres
