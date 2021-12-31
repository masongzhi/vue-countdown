# vue-countdown

countdown hook for vue3, 方便编写倒计时

## 安装与使用

### npm/yarn 引入

执行命令

```sh
npm install --save vue-countdown
yarn add vue-countdown
```

使用方法

```javascript
import useCountdown form 'vue-countdown';

setup() {
    const { setCountdown, countdownObj, timeObj } = useCountdown();

    setCountdown(1000);

    return {
        countdownObj,
        timeObj
    }
}
```

```html
<template>
  <!-- 00:00:16:40 -->
  <div>{{ countdownObj.d }}:{{ countdownObj.h }}:{{ countdownObj.m }}:{{ countdownObj.s }}</div>
  <!-- 0:0:16:40 -->
  <div>{{ timeObj.d }}:{{ timeObj.h }}:{{ timeObj.m }}:{{ timeObj.s }}</div>
</template>
```

完整使用方式

```javascript
import useCountdown form 'vue-countdown';

setup() {
    const { countdown, setCountdown, countdownObj, timeObj, onFinish } = useCountdown();

    // 设置倒计时
    setCountdown(1000);
    // 可重复设置，重复设置后倒计时重新开始
    setCountdown(5000);

    // 倒计时完成触发
    onFinish(() => {
        console.log('倒计时完成');
    })

    return {
        // 当前剩余倒计时
        countdown,
        // 00:00:00:00的对象
        countdownObj,
        // 0:0:0:0 的对象
        timeObj
    }
}
```
