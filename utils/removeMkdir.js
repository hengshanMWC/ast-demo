const fs = require('fs')
const path = require('path')
module.exports = function removeMkdir (filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, function(err, stat) {
      if(err) {
        reject(err)
        return
      }
      if(stat.isFile()) {
        fs.unlink(filePath, function(err) {
          if(err) {
            reject(err)
            return
          }
          resolve()
        })
      }else {
        fs.readdir(filePath, function(err, dirs) {
          if(err) {
            reject(err)
            return
          }
          dirs = dirs.map(dir => path.join(filePath, dir)) // a/b a/c
          let index = 0;
          (function next() {
            if(index === dirs.length) {
              fs.rmdir(filePath, function(err) {
                if(err) {
                  reject(err)
                  return
                }
                resolve()
              })
            }else {
              removeMkdir(dirs[index++]).then(() => {
                next()
              }, err => {
                reject(err)
              })
            }
          })()
        })
      }
    })
  })
}