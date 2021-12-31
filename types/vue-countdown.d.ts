import { Ref, ComputedRef } from 'vue';

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
declare function useCountdown(): Res;

export { useCountdown as default };
