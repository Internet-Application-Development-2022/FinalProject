#!/bin/bash

sellers=(\
    '{"name":"a","signature":"a","email":"a@a.com","phone":"0","location": [31.97009473393667, 34.77095442949617]}'\
    '{"name":"b","signature":"b","email":"b@b.com","phone":"1","location": [38.89785997749, -77.03663708604945]}'\
    '{"name":"c","signature":"c","email":"c@c.com","phone":"2","location": [51.50147751666957, -0.1418685404705843]}'\
)

for seller in "${sellers[@]}";
do
    curl http://localhost:8080/api/sellers -H 'Content-Type: application/json' -d "$(echo $seller)";
    echo;
done