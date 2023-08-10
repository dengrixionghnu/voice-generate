<template>
	<el-container style="height: 100%;">
		<!-- 左侧导航 -->
		<el-aside width="160px">
			<img @click="logoClick" @mouseout="logoClickClear" src="./assets/logo.png" alt="" />
			<el-menu
				:default-active="defaultActive"
				class="el-menu-vertical-demo"
				background-color="#313743"
				text-color="#fff"
				active-text-color="#ffd04b"
				router
				@select="menuSelectAct"
			>
				<el-menu-item :index="item.index" v-for="item in menueList" :key="item.id">
					<i :class="item.icon"></i>
          <template v-slot:title>{{ item.title }}</template>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container class="my-aside">
			<!-- 头部 -->
			<el-header height="50px" class = "el-header">
				<h3>{{softName}} v{{ currentVersion }}</h3>
			</el-header>
			<!-- 主体 -->
			<el-main class="my-aside">
				<voicePage></voicePage>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
 import voicePage from './components/voicePage.vue'

export default {
  name: 'App',
  components: {
    voicePage
  },
  data(){
	return {
		menueList: [
				{ id: "1", title: "语音合成", icon: "el-icon-menu", index: "/" },
				{ id: "2", title: "高级设置", icon: "el-icon-setting", index: "/settings" },
				{ id: "4", title: "下载地址", icon: "el-icon-info", index: "#buy" },
			],
			softName:"Voice Generate",
			currentVersion:1
	}
  }
}
</script>

<style lang="less" scoped>


html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}


.my-aside {
  height: 100%;
}

.el-container {
	height: 100%;
}

.el-header {
	text-align: center;
	// background-color: rgb(54, 61, 64);
	background-color: rgb(49, 55, 67);
	h3 {
		margin: 0 auto; //水平居中
		position: relative; //相对布局
		top: 50%;
		transform: translateY(-50%); //向上移动自身50%
		color: white;
	}
}

.el-aside {
	position: relative;
	background-color: rgb(49, 55, 67);
	img {
		position: absolute;
		width: 80px;
		height: 80px;
		left: 50%;
		top: 20px;
		transform: translateX(-50%);
	}
}

.el-main {
	// background-color: rgb(233, 237, 241);
	background-color: white;
	padding: 10px;
}

.el-footer {
	background-color: rgb(186, 228, 203);
}

.el-menu {
	border-right: none;
	top: 120px;
}

.el-menu-item {
	font-size: 18px;
}
</style>