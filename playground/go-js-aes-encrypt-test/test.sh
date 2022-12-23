#!/bin/bash

GO=`go run aes-encrypt.go`
JS=`node aes-encrypt.js`


echo 'Compare hex aes encrypted text: "The quick brown fox jumps over the lazy dog"'

if [ "$GO" = "$JS" ]; then
    echo "Strings are equal."
else
    echo "Strings are *not* equal."
fi

echo "GO: $GO"
echo "JS: $JS"