fs = require 'fs'

readObject = (filePath, cb) ->
  fs.readFile filePath, (err, buf) ->
    if !err
      try
        obj = JSON.parse(buf) # can throw
      catch e
        err = e
    cb err, obj

readObject 'demo.json', (err, obj) ->
  if err
    console.error err
  else
    console.log obj
