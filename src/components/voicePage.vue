<template>
  <el-container class="my-container" style="height: 100%;">
    <!-- 上部区域 -->
    <el-main style="height: 100%;">
      <textarea style="height:400px;width:95%"
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
          <el-row>
            <span>语音类型：</span>
            <el-button plain size="small" @click="selectVoicer">{{ voicer.name }} / {{ voicer.type }}</el-button>
            <span style="margin-left:40px;">背景音乐：</span>
            <el-button plain size="small" @click="selectBgMusic">{{ music.name }}</el-button>
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
          <div class="right-buttons-box">
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


export default {
  name: 'voicePage',
  mounted() {
		this.$nextTick(function() {
			//初始化token
      this.convertText = "";
      voiceRepository.getToken();
		});
	},
	data() {
		return {
			voicer: { name: "小云", alias: "Xiaoyun", type: "标准女声", scene: "通用场景" },
			music: { name: "选择背景音乐", url: null, path: null, isOnline: null, isUseBgm: false },
			convertText: "",
			volume: 50, //音量
			speed: 50, //语速
			volume_bg: 50, //背景音量
			format: "mp3", //输出格式
			saveFolder: path.join("/Users/apple/front/voice-data", "语音"), //保存目录
			audioSaveFile: "", //临时生成的语音文件
			outputAudioFile: "", //转换完毕生成的音频文件
			showLoading: false, //转换按钮动画
			sound: new Howl({ src: ["1.mp3"] }), // 试听播放器
			isPlay: false //是否正在播放
		};
	},
  methods: {
    rightClickHandle(event) {
      // 处理右键点击事件
    },
    selectVoicer() {
      // 选择语音类型操作
    },
    selectBgMusic() {
      // 选择背景音乐操作
    },
    voicerChange(selectedVoicer) {
      this.voicer = selectedVoicer;
    },
    musicChange(selectedMusic) {
      this.music = selectedMusic;
    },
    updateFolder() {
      // 更新保存目录操作
    },
    openFolder() {
      // 打开保存目录操作
    },
    trialListen() {
      // 试听操作
    },
    startConvert() {
      // 开始转换操作
      if(!this.convertText){
        return
      }
      console.log(this.convertText);
    }
  }
};
</script>

<style lang="less" scoped>
//scoped穿透修改第三方组件样式 参考：https://www.cnblogs.com/wenxuehai/p/11611960.html
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
.right-buttons {
	.right-buttons-box {
		width: 150px;
		height: 110px;
		margin: 0px auto; //水平居中
		margin-right: 0px; //按钮靠右
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		display: block;
		// 试听一下
		.right-buttons-listen {
			width: 140px;
			height: 45px;
			margin: 0px auto;
			font-size: 18px;
		}
		// 开始转换
		.right-buttons-convert {
			width: 140px;
			height: 45px;
			margin: 0px auto;
			margin-top: 20px;
			font-size: 18px;
		}
	}
}
</style>
