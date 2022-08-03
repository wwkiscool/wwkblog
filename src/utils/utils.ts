export const formatDate = (val: string): string => { //格式化时间
    let date;
    if (val) {
        date = new Date(val);
    } else {
        date = new Date();
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const formatNumber = (n: number): string => {
        let _n = '';
        _n = n.toString();
        return _n[1] ? _n : `0${_n}`;
    };

    return `${[year, month, day].map(formatNumber).join("-")} ${[hour, minute, second]
        .map(formatNumber)
        .join(":")}`;
}

// let CommonFunction:object = {};
// CommonFunction.install = function(Vue) {

// }