<template>
  <el-container class="my-container" style="height: 100%;">
    <!-- 上部区域 -->
    <el-main style="height: 100%;">
      <textarea style="height:350px;width:95%"
        v-model="convertText"
        type="textarea"
        placeholder="请输入内容"
        maxlength="3000"
        spellcheck="false"
        resize="none"
        show-word-limit
        @contextmenu.prevent="rightClickHandle($event)"
      ></textarea>
    </el-main>
    <!-- 下部区域 -->
    <el-footer style="height: 20%;">
      <el-container>
        <!-- 左侧区域 -->
        <el-main>
          <el-row v-on:mouseleave = "this.dropdownVisible=false;this.voiceDropdownVisible=false">
              <el-dropdown>
              <span>
                语音类型：
              </span>
              <el-dropdown-menu slot="dropdown" v-show="dropdownVisible">
                <el-dropdown-item v-for="option in voiceList" :key="option.name" @click="selectVoicer(option)">
                  {{ option.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain size="small" @click="this.dropdownVisible=true">{{ voicer.name }} / {{ voicer.type }}</el-button>

            <el-dropdown>
              <span style="margin-left:20px;">背景音乐：</span>
              <el-dropdown-menu slot="dropdown" v-show="voiceDropdownVisible">
                <el-dropdown-item v-for="item in backgroundList" :key="item.name" @click="selectBackground(item)">
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain size="small" @click="this.voiceDropdownVisible=true">{{ music.name }}</el-button>
         
          </el-row>
          <el-row>
            <el-col :span="8">
              <span>音量：</span>
              <el-slider v-model="volume" style="display:inline-block;width:calc(100% - 68px);vertical-align: middle;"></el-slider>
            </el-col>
            <el-col :span="8">
              <span>语速：</span>
              <el-slider v-model="speed" style="display:inline-block;width:calc(100% - 68px);vertical-align: middle;"></el-slider>
            </el-col>
            <el-col :span="8">
              <span>背景音量：</span>
              <el-slider v-model="volume_bg" style="display:inline-block;width:calc(100% - 100px);vertical-align: middle;"></el-slider>
            </el-col>
          </el-row>
          <el-row>
            <span>输出格式：</span>
            <el-radio v-model="format" label="mp3">MP3</el-radio>
            <el-radio v-model="format" label="wav">WAV</el-radio>
            <!-- <el-radio v-model="format" label="pcm">PCM</el-radio> -->
          </el-row>
          <el-row class="my-outpath">
            <span>保存目录：</span>
            <el-input v-model="saveFolder" placeholder="请输入内容" :disabled="true" style="display:inline-block;width:calc(100% - 300px);vertical-align: middle;"></el-input>
          </el-row>
        </el-main>
        <!-- 右侧区域 -->
        <el-aside width="170px" class="right-buttons">
          <div class="right-buttons-conver">
            <el-button
              class="right-buttons-listen"
              :disabled="isDisabled"
              :icon="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"
              @click="trialListen"
            >
              试听一下
            </el-button>
            <el-button
              class="right-buttons-convert"
              :loading="showLoading"
              icon="el-icon-refresh"
              type="primary"
              @click="startConvert"
            >
              开始转换
            </el-button>
            <el-button
              class="right-buttons-convert"
              :loading="showLoading"
              icon="el-icon-refresh"
              type="primary"
              @click="downLoadVoice"
            >
              下载
            </el-button>
          </div>
        </el-aside>
      </el-container>
    </el-footer>
  </el-container>
</template>

<script>
import { Howl } from 'howler';
import path from "path";
import voiceRepository from '../utils/voiceRepository.js'
import voiceConfig from '../utils/config.js'


export default {
  name: 'voicePage',
  mounted() {
		this.$nextTick(function() {
			//初始化token
      this.dropdownVisible = false;
      this.voiceList = voiceConfig.voice_type;
      this.voiceDropdownVisible = false;
      this.backgroundList =  voiceConfig.background;
      this.music = this.backgroundList[0];
      voiceRepository.getToken();
		});
	},
	data() {
		return {
			voicer: { name: "小云/标准女声", value: "Xiaoyun" },
			music: { name: "选择背景音乐", url: null},
			convertText: "",
			volume: 50, //音量
			speed: 50, //语速
			volume_bg: 50, //背景音量
			format: "mp3", //输出格式
			outputFileUrl: "", //转换完毕生成的音频文件
			showLoading: false, //转换按钮动画
			sound: new Howl({ src: ["1.mp3"] }), // 试听播放器
			isPlay: false, //是否正在播放
      isBackgroundPlay:false,
      voiceList:[],
      dropdownVisible:false,
      backgroundList:[],
      voiceDropdownVisible:false

		};
	},
  methods: {
    rightClickHandle(event) {
      // 处理右键点击事件
    },
    selectVoicer(option) {
      // 选择语音类型操作
      this.voicer = option;
      this.dropdownVisible=false;
    },
    selectBackground(option){
      this.music = option;
      this.voiceDropdownVisible = false;
    },
    updateFolder() {
      // 更新保存目录操作
    },
    openFolder() {
      // 打开保存目录操作
    },
    trialListen() {
      // 试听操作
      if(this.isBackgroundPlay){
        this.isBackgroundPlay = false;
        this.sound.stop();
        return 
      }
      this.isBackgroundPlay = true;
      this.sound = new Howl({src:[this.music.url]})
      this.sound.volume = this.volume/100
      this.sound.play();
    },
    startConvert() {
      // 开始转换操作
      if(!this.convertText){
        return
      }
      this.sound.stop();
      var that = this;
      voiceRepository.convertVoice(this.convertText,this.voicer.value,function(address){
        that.sound = new Howl({src:[address]})
        that.sound.play();
        that.outputFileUrl = address;

      })
    },
    downLoadVoice(){
      if(!this.outputFileUrl){
        return;
      }
      const downloadUrl = this.outputFileUrl // 下载文件的URL
      const filename = 'myVoice.wma'; // 下载文件的文件名
      fetch(downloadUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;

          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          window.URL.revokeObjectURL(url);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
	height: 100%;

}

.el-textarea {
	height: 100%;

}
	.el-textarea__inner {
		//文本框内层
		height: 100%;
	}


.my-container /deep/ .el-main {
	padding: 5px;
}

.my-container /deep/ .el-footer {
	padding: 5px;
}

.my-container /deep/ .el-container {
	height: 100%;
}

.my-outpath /deep/ .el-input__inner {
	height: 28px;
}

.el-row {
	margin-top: 10px;
}

// ========= 右侧按钮 =========

.right-buttons-box {
		width: 140px;
		height: 90px;
		margin: 0px auto; //水平居中
		margin-right: 0px; //按钮靠右
		position: relative;
		top: 40%;
		transform: translateY(-50%);
		display: block;
}
		// 试听一下
.right-buttons-listen {
  width: 140px;
  height: 20px;
  margin: 0px auto;
  font-size: 18px;
}
		// 开始转换
.right-buttons-convert {
  width: 140px;
  height: 20px;
  margin: 0px auto;
  margin-top: 10px;
  font-size: 18px;
}


</style>
