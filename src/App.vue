<template>
	<el-container>
		<!-- 左侧导航 -->
		<el-aside width="160px">
			<img src="./assets/logo.png" alt="" />
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
		<el-container>
			<!-- 头部 -->
			<el-header height="50px">
				<h3>{{softName}} v{{ currentVersion }}</h3>
			</el-header>
			<!-- 主体 -->
			<el-main>
				<main_page/>
			</el-main>
		</el-container>
	</el-container>
</template>


<script>
import main_page from '/components/index.vue';
const path = require("path");

const fse = require("fs-extra");

export default {
	components: {
		main_page
	},
	data() {
		return {
			menueList: [
				{ id: "1", title: "语音合成", icon: "el-icon-menu", index: "/" },
				{ id: "2", title: "高级设置", icon: "el-icon-setting", index: "/settings" },
				{ id: "3", title: "注册激活", icon: "el-icon-document", index: "#register" },
				{ id: "4", title: "下载地址", icon: "el-icon-info", index: "#buy" },
				{ id: "5", title: "使用帮助", icon: "el-icon-help", index: "/help" },
				{ id: "6", title: "在线升级", icon: "el-icon-info", index: "#update" },
			],
			defaultActive: "/",
			updialogVisible: false, //软件更新对话框
      downURL: "", //软件下载地址
      softName: "voice generate",//软件名称
			currentVersion: 1, //软件当前版本
			isShowClose: true, //是否显示更新对话框关闭按钮
			isShowCancel: true, //是否显示更新对话框取消按钮
			upTip: "", //软件更新提示
		};
	},
	methods: {
		// 菜单被选中激活时调用
		menuSelectAct(index) {
			console.log(index);
		
		},
	},

	mounted() {
		// 创建用户目录
    var userFolder = path.join("/Users/apple/front","/voice_data");
    if (fse.existsSync(userFolder) == false) {
        fse.ensureDirSync(userFolder);
    }
		
	},
};
</script>

<style lang="less" scoped>
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
