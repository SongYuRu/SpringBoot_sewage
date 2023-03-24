// 自定义的jquery函数
$.fn.extend({
    serializeJson : function() {
        var json = {}; // 就是一个javascript的对象.
        // 1.通过jquery提供的serializeArray方法得到不符合要求的json串
        var msg = this.serializeArray();
        // console.info(msg);
        // [Object { name="username", value="tom"}, Object { name="password",
        // value="123"}, Object { name="hobby", value="eat"}, Object {
        // name="hobby", value="drink"}, Object { name="hobby", value="play"}]
        $(msg).each(function() {
            if (json[this.name]) { // 在json对象中没有this.name对应的值
                // 有,需要考虑一个名称对应多个值，而这些值应该放入到数组中
                if (!json[this.name].push) { // 如果为true,代表是数组,如果为false，代表不是数组
                    json[this.name] = [ json[this.name] ];
                }
                json[this.name].push(this.value || ''); // 装入到数组

            } else {
                // 没有
                json[this.name] = this.value || '';
            }
        });
        return json
    }
});