var RPCClient = require('@alicloud/pop-core').RPCClient;
const Nls = require('alibabacloud-nls')



var config ={
     AccessKeyId : 'LTAI5t8mtvtrPbRKzREnKAtG',
     AccessKeySecret :'mA34IKXMKFx45Otji6D3wjnjRbyHyB',
	   appkey : 'rwuFY88M4HZUkfBk',
     tokenUrl:'http://nls-meta.cn-shanghai.aliyuncs.com',
     voiceUrl:"wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1",
     apiVersion:'2019-02-28',
	   token:"",
     expireTime:0,
}

var getToken = function getToken(){
    const nowTime = Math.round(new Date().getTime() / 1000); 
    if(nowTime<config.expireTime){
        return;
    }
    var client = new RPCClient({
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        endpoint: config.tokenUrl,
        apiVersion: config.apiVersion
      });
      client.request('CreateToken').then((result) => {
        console.log(result.Token)
        config.token = result.Token.Id;
        config.expireTime = result.Token.ExpireTime;
    });
}
     
var convertVoice = async function convertVoice(line,voiceType,callback){
    let tts = new Nls.SpeechSynthesizer({
        url: config.voiceUrl,
        appkey:config.appkey,
        token:config.token
      })
      tts.on("completed", (msg)=>{
        console.log("Client recv completed:", msg)
        callback(msg);
      })
      let param = tts.defaultStartParams()
        param.text = line
        param.voice = voiceType
    try {
        await tts.start(param, true, 6000)
        } catch(error) {
        console.log("error on start:", error)
        return
        } finally {
        //dumpFile.end()
        }
          
}

module.exports = {
    getToken:getToken,
    convertVoice:convertVoice
}
  

