#!/bin/bash
# Finds all files with a given file extension in and below the current directory
# that contain a given string.
# For example, find3 java "implements Foo"

if [ $# -ne 2 ]; then
  echo usage: find3 {file-extension} {search-string}
  exit 1
fi

find . -name "*.$1" | xargs grep "$2"
