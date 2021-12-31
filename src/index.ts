import {
  ref,
  computed,
  onBeforeUnmount,
  Ref,
  ComputedRef,
  readonly
} from 'vue';

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

interface Res {
  countdown: Ref<number>;
  setCountdown: (val: number) => void;
  timeObj: ComputedRef<{
    d: number;
    h: number;
    m: number;
    s: number;
  }>;
  countdownObj: ComputedRef<{
    d: string;
    h: string;
    m: string;
    s: string;
  }>;
  onFinish: (func: () => void) => void;
}

export default function useCountdown(): Res {
  const countdown = ref(0);

  let timer: number = 0;

  const cbs: any[] = [];
  const onFinish = (func: () => void) => cbs.push(func);

  const executeCountdown = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      if (countdown.value <= 0) {
        clearTimeout(timer);
        if (cbs.length > 0) {
          cbs.forEach((cb) => cb());
        }
      } else {
        countdown.value -= 1;
        executeCountdown();
      }
    }, 1000);
  };

  onBeforeUnmount(() => {
    clearTimeout(timer);
  });

  const setCountdown = (val: number) => {
    countdown.value = val;

    if (val > 0) {
      executeCountdown();
    }
  };

  const timeObj = computed(() => {
    let rest = countdown.value;
    if (!rest || rest <= 0) {
      return {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      };
    }
    const d = Math.floor(rest / ONE_DAY);
    rest -= d * ONE_DAY;
    const h = Math.floor(rest / ONE_HOUR);
    rest -= h * ONE_HOUR;
    const m = Math.floor(rest / ONE_MINUTE);
    rest -= m * ONE_MINUTE;
    const s = rest;
    return {
      d,
      h,
      m,
      s
    };
  });

  const countdownObj = computed(() => {
    return {
      d: timeObj.value.d >= 10 ? `${timeObj.value.d}` : `0${timeObj.value.d}`,
      h: timeObj.value.h >= 10 ? `${timeObj.value.h}` : `0${timeObj.value.h}`,
      m: timeObj.value.m >= 10 ? `${timeObj.value.m}` : `0${timeObj.value.m}`,
      s: timeObj.value.s >= 10 ? `${timeObj.value.s}` : `0${timeObj.value.s}`
    };
  });

  return {
    countdown: readonly(countdown),
    setCountdown,
    timeObj,
    countdownObj,
    onFinish
  };
}
