#!/bin/bash

IMGS=("f1" "f2" "f3" "f4" "f5" "f6" "f7" "f8" "n1" "n2" "n3" "n4" "n5" "n6" "n7" "n8" "f5");

for img in "${IMGS[@]}";
do
	curl http://localhost:8080/api/products -X POST -H "content-type: application/json" -d "{
		\"name\": \"$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c $(( $RANDOM % 10 + 5 )))\",
		\"price\": $(( $RANDOM % 200 )),
		\"catagory\": \"catagory $(( $RANDOM % 4 ))\",
		\"img\": \"/public/img/products/$img.jpg\",
		\"alt\": \"$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c $(( $RANDOM % 20 + 5 )))\",
		\"seller\": \"636f9d958547369c5e81cbf1\"
	}";
	echo;
done;
