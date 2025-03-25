#!/bin/bash

# Build the image
docker build -t fairness-ml .

# Run the container
docker run --rm -p 127.0.0.1:8080:8080 -w /app -v $(pwd):/app -it fairness-ml