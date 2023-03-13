const inp = document.querySelector('#fileUpload')
inp.onchange = async (e) => {
  const fileList = inp.files[0];
  const chunks = createChunks(fileList, 10 * 1024 * 1024);
  let md5 = await createHash(chunks);
  console.log(md5);
}

/**
 * 文件切分
 * @param {*} file 文件
 * @param {*} chunk 切片大小（B）
 * @returns 切分数组
 */
function createChunks(file, chunk) {
  const list = [];
  for (let i = 0; i < file.size; i += chunk) {
    list.push(file.slice(i, i + chunk));
  }
  return list;
}

/**
 * 通过增量计算，每个分片转换MD5并合成，方便断点续传时，服务器确认是哪个文件
 * @param {*} chunks 分片后文件数组
 */
function createHash(chunks) {
  return new Promise((resolve, reject) => {
    const spark = new SparkMD5();
    // 递归增量计算 hash
    function _read(i) {
      if (i >= chunks.length) {
        return resolve(spark.end());
      }
      const blob = chunks[i];
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onload = e => {
        const byte = e.target.result
        spark.append(byte);
        _read(i + 1)
      }
    }
    _read(0)
  })
}