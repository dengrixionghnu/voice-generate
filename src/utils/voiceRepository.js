import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { HmacSHA1, enc } from 'crypto-js';
import voiceConfig from './config.js'




var config ={
     AccessKeyId : 'xxxxxx',
     AccessKeySecret :'xxxxxx',
	   appkey : 'xxxxx',
     tokenUrl:'http://nls-meta.cn-shanghai.aliyuncs.com',
     voiceUrl:"wss://nls-gateway-cn-shanghai.aliyuncs.com/ws/v1",
     apiVersion:'2019-02-28',
	   token:"",
     expireTime:0,
}


// 获取时间戳
// 获取时间戳
function timestamp() {  const currentDate = new Date(); 
   return currentDate.toISOString().split('.')[0] + 'Z';
  }
// url编码
function encode(str) {
  const result = encodeURIComponent(str);

  return result
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

var getToken = function getToken(){
    const nowTime = Math.round(new Date().getTime() / 1000); 
    if(nowTime<config.expireTime){
        return;
    }

    const Timestamp = encode(timestamp());
		const SignatureNonce = uuidv4();
    console.log(SignatureNonce);
		//规范化的请求字符串
		const query_string = `AccessKeyId=${config.AccessKeyId}&Action=CreateToken&Format=JSON&RegionId=cn-shanghai&SignatureMethod=HMAC-SHA1&SignatureNonce=${SignatureNonce}&SignatureVersion=1.0&Timestamp=${Timestamp}&Version=2019-02-28`;

		//构造待签名字符串
		const stringToSign = `GET&${encode("/")}&${encode(query_string)}`;

		//计算签名
    const key = config.AccessKeySecret + "&";   
    const signature = HmacSHA1(stringToSign, key).toString(enc.Base64);  
    const Signature = encode(signature);
    //调用服务
    const full_url = `/getToken/?Signature=${Signature}&${query_string}`;


    const corsConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    axios.get(full_url, corsConfig)
        .then(response => {
          var tokenObj = response.data.Token;
          config.token = tokenObj.Id;
          config.expireTime = tokenObj.ExpireTime
        })
        .catch(error => {
          console.error(error);
        });
}


function saveFile(voiceAddress,callback) {
    axios({
      method: 'get',
      url: voiceAddress,
      responseType: 'blob',
    }).then(response => {
      var filename = timestamp()+".wma";
      const filePath = voiceConfig.voice_path+filename; // 下载文件的文件名
      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filePath;
      link.click();
      callback(filename);
    });
}
     
var convertVoice = async function convertVoice(line,voiceType,callback){
    var url = "/convertVoice"
    console.log(url);
    // 请求参数，以JSON格式字符串填入HTTPS POST请求的Body中。
    var context = {
        device_id : "device_id",
    };
    var header = {
        appkey : config.appkey,
        token : config.token,
    };
    var tts_request = {
        text : line,
        voice : voiceType,
        format : "wav",
        "sample_rate" : 16000,
        "enable_subtitle" : false
    };
    var payload = {
        "enable_notify" : false,
        "notify_url": "http://123.com",
        "tts_request" : tts_request,
    };

    var tts_body = {
      "context" : context,
      "header" : header,
      "payload" : payload
  };


    var bodyContent = JSON.stringify(tts_body);
    const corsConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type' : 'application/json'
      },
    };
    axios.post(url,bodyContent,corsConfig)
    .then(resp=>{
      var respData = resp.data;
      var task_id = respData.data.task_id;
      var request_id = respData.request_id;
      var fullUrl = url + "?appkey=" + config.appkey + "&task_id=" + task_id + "&token=" 
      + config.token + "&request_id=" + request_id;
      waitLoop4Complete(fullUrl,callback);

    })
    .catch (error=>{

    })

  
}

function waitLoop4Complete(url,callback) {
  const corsConfig = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  };
  //while(true) {
  var timer = setInterval(() => {
    axios.get(url,corsConfig)
    .then(
      resp=>{
        var result = resp.data;
        var error_code = result.error_code
        var error_message = result.error_message
        if(error_code==20000000 && error_message=="SUCCESS"){
          var address = result.data.audio_address;
          callback(address);
          clearInterval(timer);
        }
        if(error_code!=20000000){
          clearInterval(timer);
        }

      }
    ).catch(
      error=>{
        clearInterval(timer);
      }
    )
     

    }, 10000);
  
}


export default {
    getToken:getToken,
    convertVoice:convertVoice
}
  

