#!/bin/bash

IMGS=("f1" "f2" "f3" "f4" "f5" "f6" "f7" "f8" "n1" "n2" "n3" "n4" "n5" "n6" "n7" "n8");

for img in "${IMGS[@]}";
do 
	curl http://localhost/api/products -X POST -H "content-type: application/json" -d "{
		\"name\": \"$(tr -dc A-Za-z0-9 </dev/urandom | head -c $(( $RANDOM % 10 + 5 )))\",
		\"price\": $(( $RANDOM % 200 )),
		\"catagory\": \"$(( $RANDOM % 4 ))\",
		\"img\": \"/public/img/products/$img.jpg\",
		\"alt\": \"$(tr -dc A-Za-z0-9 </dev/urandom | head -c $(( $RANDOM % 20 + 5 )))\"
	}";
	echo;
done;
