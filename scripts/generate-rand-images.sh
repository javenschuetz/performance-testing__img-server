#!/bin/bash

echo "Generating 1MB random images"
for i in {0..10}; do
    # echo "Number: $i"
    convert -size 740x455 xc:gray +noise random "static/images/random_image_1mb_${i}.bmp"
done

echo "Generating 5MB random images"
for i in {0..10}; do
    # echo "Number: $i"
    convert -size 1650x1000 xc:gray +noise random "static/images/random_image_5mb_${i}.bmp"
done

echo "Generating 10MB random images"
for i in {0..10}; do
    # echo "Number: $i"
    convert -size 2380x1400 xc:gray +noise random "static/images/random_image_10mb_${i}.bmp"
done

echo "results in static/images:"
ls static/images
