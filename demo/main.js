import Zue from '../zue/src/'
new Zue({
    el: '#app',
    data: {
        title: 'hello world',
        name: 'canfoo'
    },
    methods: {
        clickMe: function () {
            this.title = 'hello world';
        }
    },
    mounted: function () {
        window.setTimeout(() => {
            this.title = '你好';
        }, 1000);
    }
})
