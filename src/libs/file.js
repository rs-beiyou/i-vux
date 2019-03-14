import Vue from 'vue'
import packinfo from '../../package.json'
import store from '../libs/store'

class CordovaFileTransfer {
  constructor () {
    this.op = {}
    this.sourceType = ''
    Object.assign(this.op, CordovaFileTransfer.DEFAULTS)
    // eslint-disable-next-line
    this.ft = new FileTransfer()
  }
  getPicture (type, op) {
    this.sourceType = type
    Object.assign(this.op, op || {})
    navigator.camera.getPicture(this.upload.bind(this), () => {}, {
      quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType[type],
      mediaType: navigator.camera.MediaType.ALLMEDIA
    })
  }
  upload (fileURI) {
    this.op.chooseSuccess && this.op.chooseSuccess(fileURI)
    // eslint-disable-next-line
    let options = new FileUploadOptions()
    options.fileKey = this.op.fileObjName
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1)
    options.mimeType = 'multipart/form-data'
    options.chunkedMode = false
    Object.assign(options, this.op.params || {})
    this.ft.onprogress = this.uploadProcess.bind(this)
    this.ft.upload(
      fileURI,
      this.op.uploadUrl,
      this.uploadSuccess.bind(this),
      this.uploadFailed.bind(this),
      options
    )
  }
  uploadProcess (progressEvent) {
    if (progressEvent.lengthComputable) {
      let loaded = progressEvent.loaded
      let total = progressEvent.total
      let percent =
        parseFloat(((loaded / total).toFixed(2) * 100).toPrecision(12)) + '%'
      this.op.uploadProcess && this.op.uploadProcess(percent)
    }
  }
  clearProcess () {
    this.complete && this.complete()
    this.ft.abort()
  }
  uploadSuccess (op) {
    this.op.uploadSuccess && this.op.uploadSuccess(op)
  }
  uploadFailed (error) {
    this.op.uploadFailed && this.op.uploadFailed(error)
  }
  formatFileSize (size, byKB) {
    if (size > 1024 * 1024 && !byKB) {
      size = (Math.round((size * 100) / (1024 * 1024)) / 100).toString() + 'MB'
    } else {
      size = (Math.round((size * 100) / 1024) / 100).toString() + 'KB'
    }
    return size
  }
  filter (file) {
    var currFile
    var typeArray = this.op.fileType.split(';')
    if (
      typeArray.indexOf(
        file.name
          .split('.')
          .pop()
          .toLowerCase()
      ) > -1
    ) {
      if (parseInt(this.formatFileSize(file.size, true)) > this.fileSizeLimit) {
        Vue.$vux.toast.show('文件大小超出限制！')
        return false
      }
      currFile = file
    } else {
      Vue.$vux.toast.show('文件类型不允许！')
      return false
    }
    return currFile
  }
  download (url, start, progress, success, error, complete) {
    this.downProcess = progress
    this.downSuccess = success
    this.downError = error
    this.start = start
    this.complete = complete
    var _this = this
    var sourceUrl = encodeURI(url)
    var filename = sourceUrl.substr(sourceUrl.lastIndexOf('/') + 1)
    // var filename = source_url.substr(source_url.lastIndexOf('/') + 1)
    window.requestFileSystem(
      // eslint-disable-next-line
      LocalFileSystem.PERSISTENT,
      0,
      function (fs) {
        fs.root.getDirectory(
          `${packinfo.name}_download`,
          {
            create: true
          },
          function (entry) {
            var fullurl = entry.toURL()
            entry.getFile(filename, {}, _this.openFile, function () {
              // eslint-disable-next-line
              _this.ft = new FileTransfer()
              var fileURL = fullurl + filename
              _this.ft.download(
                sourceUrl,
                fileURL,
                _this.downloadSuccess.bind(_this),
                _this.downloadError.bind(_this),
                false,
                {
                  headers: {
                    Authorization: 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
                  }
                }
              )
              _this.start && _this.start()
              _this.ft.onprogress = _this.downloadProcess.bind(_this)
            })
          },
          function () {
            Vue.$vux.toast.show('创建文件夹失败,请联系管理员')
          }
        )
      },
      function () {
        Vue.$vux.toast.show('创建文件夹失败,请联系管理员')
      }
    )
  }
  downloadProcess (progressEvent) {
    if (progressEvent.lengthComputable) {
      let loaded = progressEvent.loaded
      let total = progressEvent.total
      let percent = parseFloat(
        ((loaded / total).toFixed(2) * 100).toPrecision(12)
      )
      this.downProcess && this.downProcess(percent)
    }
  }
  downloadSuccess (entry) {
    var _this = this
    this.clearProcess()
    if (this.downSuccess) {
      this.downSuccess()
    } else {
      setTimeout(function () {
        _this.openFile(entry)
      }, 500)
    }
  }
  downloadError () {
    this.clearProcess()
    this.downError && this.downError()
  }
  openFile (entry, isLocal) {
    var path
    if (isLocal !== undefined && isLocal) {
      path = entry
    } else {
      path = entry.toURL()
    }
    var type = path.substr(path.lastIndexOf('.') + 1).toLowerCase()
    var fileMIMEType
    switch (type) {
      case 'pdf':
        fileMIMEType = 'application/pdf'
        break
      case 'jpeg':
      case 'jpg':
      case 'jpe':
      case 'png':
        fileMIMEType = 'image/*'
        break
      case 'txt':
      case 'text':
        fileMIMEType = 'text/plain'
        break
      case 'doc':
        fileMIMEType = 'application/msword'
        break
      case 'docx':
        fileMIMEType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        break
      case 'mp4':
      case 'mpg4':
      case 'mp4v':
        fileMIMEType = 'video/*'
        break
      case 'mp3':
      case 'uva':
      case 'wma':
      case 'wav':
        fileMIMEType = 'audio/*'
        break
      case 'apk':
        fileMIMEType = 'application/vnd.android.package-archive'
        break
    }
    // eslint-disable-next-line
    cordova.plugins.fileOpener2.open(path, fileMIMEType, {
      error: function () {
        Vue.$vux.toast.show('未找到相关软件打开该文档')
      },
      success: function () {
        store.commit('toNativeApp', true)
      }
    })
  }
}
CordovaFileTransfer.DEFAULTS = {
  fileObjName: 'uploadFile',
  fileType: 'jpg;jpeg;png;rng',
  uploadUrl: encodeURI(
    packinfo.server + '/extTtExtCommon/uploadFile.action.action'
  ),
  fileSizeLimit: 3 * 1024,
  uploadSuccess: null,
  uploadProcess: null,
  uploadFail: null,
  chooseSuccess: null,
  params: null
}

export default CordovaFileTransfer
