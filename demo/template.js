import Iue from 'iue';

var child = Iue.extend({
    template: '#child-template',
    data: {
        name: '',
        age: ''
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        }
    },
    events: {
        'child-name': function (name) {
            this.name = name;
            return true;
        },
        'child-age': function (age) {
            this.age = age;
        },
        'parent-name': function (name) {
            this.name = name;
            return true;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Iue.component('child', child);

var recursiveChild = Iue.extend({
    template: '#recursive-child-template',
    data: {
        name: '',
        age: ''
    },
    methods: {
        dispatchName: function () {
            this.$dispatch('child-name', this.name);
        },
        dispatchAge: function () {
            this.$dispatch('child-age', this.age);
        }
    },
    events: {
        'parent-name': function (name) {
            this.name = name;
        },
        'parent-age': function (age) {
            this.age = age;
        }
    }
});

Iue.component('recursive-child', recursiveChild);

const app = new Iue({
    el: '#app',
    data: {
        name: '111',
        age: '222'
    },
    events: {
        'child-name': function (name) {
            this.name = name;
        },
        'child-age': function (age) {
            this.age = age;
        }
    },
    methods: {
        broadcastName: function () {
            this.$broadcast('parent-name', this.name);
        },
        broadcastAge: function () {
            this.$broadcast('parent-age', this.age);
        }
    }
});
console.log(app);
window.app = app;

