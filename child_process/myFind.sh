#!/bin/bash
# Finds all files with a given file extension in and below the current directory
# that contain a given string.
# For example, myFind java "implements Foo"

if [ $# -ne 2 ]; then
  echo usage: myFind {file-extension} {search-string}
  exit 1
fi

find . -name "*.$1" | xargs grep "$2"
