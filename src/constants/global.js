
import { StatusBar, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
//屏幕宽和高
export const ScreenWidth = Dimensions.get('window').width;
export const ScreenHeight = Dimensions.get('window').height;
//缩放比例
export const fontSizeScaler = (PixelRatio.get() / PixelRatio.getFontScale()) / PixelRatio.get();
//状态栏高度
export const StatusBarHeight = StatusBar.currentHeight;
//主题颜色 
export const styleColor = '#531600';




//console方法简化 
export function log(data) {
    console.log('**********************')
    console.log(data)
    console.log('**********************')
}

//转换数字成多少万
export function ChangeNum(num) {
    if (num >= 10000) {
        return (
            `${(num / 10000).toFixed(1)}万`
        )
    } else {
        return num
    }
}


//转换秒数成多少分钟
export function toMinute(num) {
    const time = parseInt(num);
    let minutes = parseInt(time / 60); //分钟数取整
    let seconds = time % 60;           //秒数取余数
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`
}

//转换秒数成多少分钟
export function formatTime(second) {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };
    return [zero(h), zero(i), zero(s)].join(":");
}