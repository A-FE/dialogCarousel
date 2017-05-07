<template>
    <transition name="dialog-fade">
        <div v-show="showDialog" class="hfq-dialog-carousel" :ref="id">

            <v-touch @pan="onPan">

                <div ref="hfq-dialog" id="hfq-dialog" class="hfq-dialog">

                    <!-- 中间图片区 -->
                    <div class="hfq-dialog-content">
                        <div class="hfq-carousel-img-content" v-for="(url,index) in data.imgUrls"
                             :class="index === currentIndex ? 'opacity-1':'opacity-0'">
                            <img class="carousel-img animated fadeIn" ref="hfq-carousel-img" :index="index" :src="url">
                        </div>
                    </div>

                    <!-- 弹框底部 -->
                    <div class="hfq-dialog-bottom">
                        <!-- 底部按钮 -->
                        <div class="icons-container">
                            <el-button type="primary" class="btn scaleL" @click="scaleL">
                                <img src="./img/add.png" title="放大" width="24" height="24">
                            </el-button>
                            <el-button type="primary" class="btn scaleS" @click="scaleS">
                                <img src="./img/min.png" title="缩小" width="24" height="24">
                            </el-button>
                            <el-button type="primary" @click="pre">
                                <img src="./img/pre.png" title="上一张" width="24" height="24">
                            </el-button>
                            <el-button type="primary" @click="next">
                                <img src="./img/next.png" title="下一张" width="24" height="24">
                            </el-button>
                            <el-button type="primary" class="btn rotateL" @click="rotateL">
                                <img src="./img/left-r.png" title="左转" width="24" height="24">
                            </el-button>
                            <el-button type="primary" class="btn rotateR" @click="rotateR">
                                <img src="./img/right-r.png" title="右转" width="24" height="24">
                            </el-button>
                        </div>
                    </div>

                </div>
            </v-touch>

            <div class="hfq-modal" @click="handlerCloseDialog"></div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'
    import VueTouch  from 'vue-touch'
    import ImageView from './ImageView'


    Vue.use(VueTouch, {name: 'v-touch'})

    export default{
        name: 'hfq-dialog-carousel',
        props: {
            value: {
                type: Object,
                default: function () {
                    return {
                        initialIndex: 0,
                        showDialog: false,
                        tags: [],
                    }
                }
            },
            data: {
                type: Object,
                default: function () {
                    return {
                        imgUrls: [],
                        tags: []
                    }
                }
            },
            tagsPositionType: {
                type: String,
                default: 'mix'
            }
        },
        data(){
            return {
                imageviews: [],
                rotateNum: 0,
                currentIndex: 0,
                isFirst: true,
                dialogStyle: {
                    left: '',
                    top: '',
                    maxL: '',
                    maxT: '',
                    width: '',
                    height: ''
                }
            }
        },
        computed: {
            // checkbox的值tags[]
            tags: {
                get(){
                    return this.value.tags !== undefined
                        ? this.value.tags : [];
                },
                set(tags){
                    this.value.tags = tags;
                    this.$emit('input', this.value);
                }
            },
            // 控制显示隐藏
            showDialog: {
                get(){
                    let that = this;
                    console.log();
                    // 如果val为true,则初始化imageView组件
                    if (this.value.showDialog && this.isFirst) {
                        this.initImageview();
                    }
                    if (this.value.showDialog) {
                        this.initIndex();
                        this.initDrag();
                    }
                    return this.value.showDialog !== undefined
                        ? this.value.showDialog : false;
                },
                set(val){
                    this.value.showDialog = val;
                    this.$emit('input', this.value);
                }
            },
            id(){
                return 'dialog-carousel-' + Math.random()
            },
            total(){
                return this.data && this.data.imgUrls.length || 0
            }
        },
        watch: {
            value: {
                handler(val){
                    let that = this;
                    if (!val.showDialog) {
                        window.$once = '';
                    }
                },
                deep: true
            },
            currentIndex(index){
                console.log(index);
            }
        },
        methods: {
            handlerCloseDialog(){
                this.showDialog = false;
            },
            // 初始化页面的第一页
            initIndex(){
                this.currentIndex = this.value.initialIndex;
            },
            // 初始化imageview
            initImageview(){
                let that = this;
                // 查找次数
                let n = 20;
                let interval = setInterval(function () {
                    let imgs = that.$refs['hfq-carousel-img'];
                    if (imgs.length || n-- < 0) {
                        clearInterval(interval);
                        for (let i = 0; i < imgs.length; i++) {
                            let imageview = new ImageView(imgs[i], {
                                movingCheck: false, // 可选， 当移动的时候，是否检查边界，达到的效果就是当到边界的时候，
                                                    // 可不可以继续拖拽等效果 实验下就明白了 默认true
                                scaleNum: 1 // 可选，缩放比例 当进行缩放时 scale 时的比例 默认2
                            });
                            that.imageviews.push(imageview);
                        }
                        that.isFirst = false;
                    }
                }, 200);
            },
            // 放大
            scaleL(){
                this.imageviews[this.currentIndex].scale(0.1);
            },
            // 缩小
            scaleS(){
                this.imageviews[this.currentIndex].scale(-0.1);
            },
            // 上一页
            pre(){
                let currentIndex = this.currentIndex;
                switch (currentIndex) {
                    case 0:
                        this.currentIndex = this.total - 1;
                        break
                    default :
                        this.currentIndex--
                }
            },
            // 下一页
            next(){
                let currentIndex = this.currentIndex;
                switch (currentIndex) {
                    case this.total - 1:
                        this.currentIndex = 0;
                        break
                    default :
                        this.currentIndex++
                }
            },
            // 左转
            rotateL(){
                var deg = this.imageviews[this.currentIndex].deg;
                this.imageviews[this.currentIndex].rotate(deg - 90);
            },
            // 右转
            rotateR(){
                var deg = this.imageviews[this.currentIndex].deg;
                this.imageviews[this.currentIndex].rotate(deg + 90);
            },
            // 初始化拖拽插件
            initDrag(){
                // 初始化拖拽插件
                let left, top;
                let $dialog = this.$el.querySelectorAll('#hfq-dialog')[0];
                let dialogStyle = this.store.getItem('dialogStyle');
                if (dialogStyle.left) {
                    left = dialogStyle.left;
                    top = dialogStyle.top;
                } else {
                    left = 50;
                    top = 100;
                }
                Object.assign(this.dialogStyle, {
                    left: left,
                    top: top
                });
                Object.assign($dialog.style, {
                    left: left + 'px',
                    top: top + 'px'
                });
            },
            // 拖拽
            onPan(e){
                let $dialog = this.$el.querySelectorAll('#hfq-dialog')[0];
                // 移动距离
                let deltaX = e.deltaX;
                let deltaY = e.deltaY;

                // 移动开始点坐标
                let curLeft = parseFloat(this.dialogStyle.left);
                let curTop = parseFloat(this.dialogStyle.top);

                // 目标坐标
                let left = curLeft + deltaX;
                let top = curTop + deltaY;

                Object.assign($dialog.style, {
                    left: left + 'px',
                    top: top + 'px'
                });

                if (e.isFinal) {
                    Object.assign(this.dialogStyle, {
                        left: left,
                        top: top
                    });
                    this.store.setItem('dialogStyle', this.dialogStyle);
                }
            }
        }
    }

</script>

<style>

    /* 页面容器 */
    .hfq-dialog-carousel {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        z-index: 2001;
    }

    /* 弹框垂直居中的参照物 */
    .hfq-dialog-carousel:after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }

    /* 弹框容器 */
    .hfq-dialog-carousel .hfq-dialog {
        padding: 20px;
        text-align: left;
        display: inline-block;
        vertical-align: middle;
        background-color: rgba(255, 255, 255, 1);
        width: 700px;
        border-radius: 3px;
        font-size: 16px;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
        cursor: pointer;
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    /* 页面遮罩 */
    .hfq-dialog-carousel .hfq-modal {
        opacity: 0;
    }

    /* 弹框顶部按钮 */
    .hfq-dialog-carousel .hfq-dialog-top .el-dialog__close {
        margin-left: 15px;
    }

    /* 弹框底部 */
    .hfq-dialog-carousel .hfq-dialog-bottom {
        z-index: 2;
        text-align: center;
        padding: 10px;
        position: absolute;
        z-index: 2;
        bottom: 0;
        width: 100%;
    }

    /* 弹框底部--按钮容器 */
    .hfq-dialog-carousel .icons-container {
        text-align: center;
        padding: 10px;
    }

    /* 弹框底部--按钮 */
    .hfq-dialog-carousel .icons-container button.el-button {
        padding: 0;
        border-radius: 50%;
        width: 26px;
        height: 26px;
        box-sizing: border-box;
    }

    /* 弹框图片区域 */
    .hfq-dialog-carousel .hfq-dialog-content {
        position: relative;
        height: 400px;
        z-index: 1;
        margin-bottom: 50px;
    }

    /* 弹框图片区域--图片容器 */
    .hfq-dialog-carousel .hfq-carousel-img-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* 弹框图片区域--图片 */
    .hfq-dialog-carousel img.carousel-img {
        transition: transform 100ms;
        display: none;
        position: absolute;

    }

    /* ============== 工具类样式 ===================*/
    .hfq-dialog-carousel .opacity-0 {
        opacity: 0;
        z-index: 0;
    }

    .hfq-dialog-carousel .opacity-1 {
        opacity: 1;
        z-index: 1;
    }

    .hfq-dialog-carousel .el-checkbox__label {
        background-color: #fff;
    }

    /* 弹框背景 */
    .hfq-modal {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

</style>
