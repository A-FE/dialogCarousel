<template>
    <div id="app">
        <div class="m-tip">单击图片查看效果</div>
        <div class="photo-img-group">
            <img @click="setActiveItem(index,idcardData,idcardForm)" v-for="(url,index) in idcardData.imgUrls"
                 :src="url"
                 class="img-item" width="125" height="125">
        </div>
        <!-- 弹框轮播图组件 -->
        <keep-alive>
            <dialog-carousel v-model="carouselForm" tags-position-type="mix"
                             :data="carouselData"></dialog-carousel>
        </keep-alive>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-default/index.css'
    import Hello from './components/Hello'
    import dialogCarousel from './components/dialogCarousel'

    export default {
        name: 'app',
        components: {
            dialogCarousel
        },
        data(){
            return {
                // 弹框轮播图数据
                carouselData: {},
                // 弹框轮播图表单
                carouselForm: {
                    initialIndex: 0,
                    showDialog: false,
                    tags: []
                },

                // 身份证照片信息
                idcardData: {
                    imgTitles: ['正面', '反面', '手持', '其他'],
                    imgUrls: ['static/test_1.jpg', 'static/test_2.jpg', 'static/test_3.jpg', 'static/test_4.jpg'],
                    tags: [
                        {
                            label: '缺钱',
                            value: '0001',
                            group: 0
                        },
                        {
                            label: '缺心眼',
                            value: '0002',
                            group: 1
                        },
                        {
                            label: '缺牙',
                            value: '0003',
                            group: 2
                        },
                        {
                            label: '缺失',
                            value: '0003',
                            group: 3
                        },
                    ]
                },
                // 身份证照片表单
                idcardForm: {
                    initialIndex: 0,
                    showDialog: false,
                    tags: []
                }
            }
        },
        methods: {
            // 显示轮播图,设置轮播图的第一页
            setActiveItem(index, data, form){
                console.log(index);
                this.carouselData = data;
                this.carouselForm = form;
                this.carouselForm.initialIndex = index;
                this.carouselForm.showDialog = true;
            },
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        padding-top: 60px;
        background-color: #e8e8e8;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .img-item {
        margin-left: 12px;
        border-radius: 4px;
    }

    .m-tip {
        text-align: left;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
    }
</style>
