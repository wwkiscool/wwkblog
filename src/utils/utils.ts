import { App } from "vue";
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
interface func {
    (source: App): void
}
interface common {
    install: func
}
let CommonFunction: common = {
    install: function () { }
};
CommonFunction.install = function (APP: App<Element>) {
    //全局挂在方法    
    /**
     * 
     * 使用方式
     * 1.const { proxy }: any = getCurrentInstance()  getCurrentInstance===>vue 导出的
     * 2.const { appContext: { config: { globalProperties } } } = getCurrentInstance() as ComponentInternalInstance;  ComponentInternalInstance ===> vue 中导出的
     * 
     */
    //  格式化时间  
    /**
     * 
     * @param val  val 时间戳 可以为空 为空的话是当前时间的格式化 type : 0  ，1，2， 3
     * @returns {YYYY-MM-DD HH:mm:SS}
     * @version  1.0.0
     * @desc: 版本一 默认格式话时间
     * @next  如果要使用type的话 第一个参数不用的话必须要传null
     * @
     */
    APP.config.globalProperties.$DateFormat = function (val?: string, type?: string | number): string | undefined {
        let date, res;

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
        switch (type) { //根据 业务需求自己添加类型 返回
            case 1:
                res = `${[year, month, day].map(formatNumber).join("-")}
                    .map(formatNumber)
                    .join(":")}`;
                break;
            case 2:
                res = `${[year, month, day].map(formatNumber).join("-")} ${[hour]
                    .map(formatNumber)
                    .join(":")}`;
                break;
            case 3:
                res = `${[year, month, day].map(formatNumber).join("-")} ${[hour, minute]
                    .map(formatNumber)
                    .join(":")}`;
                break;
            default:
                res = `${[year, month, day].map(formatNumber).join("-")} ${[hour, minute, second]
                    .map(formatNumber)
                    .join(":")}`;
                break;
        }
        return res
    }

    APP.config.globalProperties.GetLocalStorage = function (StorageName: string): object {
        if (!StorageName) return {};

        let Storage = localStorage.getItem(StorageName)
        if (Storage) {
            return JSON.parse(Storage)
        } else {
            return {}
        }
    }
    interface dataStorage {
        Key:string,
        Value:object
    }
    APP.config.globalProperties.SetLocalStorage = function (StorageName:string, Data:dataStorage):void {
        let Storage = localStorage.getItem(StorageName);
        // 如果表存在，修改表中字段名
        
        let objKey = Data.Key;
        if (Storage) {
          // 将表的值转为对象，并装入传入的字段
          let StorageObject = JSON.parse(Storage);
          StorageObject[Data.Key] = Data.Value;
          // 重新将存储
          localStorage.setItem(StorageName, JSON.stringify(StorageObject));
        }
        //如果表不存在直接存储
       /**
        * 未知属性  判断类型方式
        * @type:1
        * let obj: { [key:string]:any }= {}
        * @type: 2
        * let obj: Record<string,any>= {}
        */
        else {
          let Object:{[key:string]:any} = {};
          Object[Data.Key] = Data.Value;
          localStorage.setItem(StorageName, JSON.stringify(Object));
        }
      };
      APP.config.globalProperties.MatchEmotion = function (data:String) {
        let EmotionList = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭',
          '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱',
          '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘',
          '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
          '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒',
          '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹',
          '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
          '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
          '激动', '街舞', '献吻', '左太极', '右太极'];
    
        //获取由所有双中括号的汉语组成的数组
        let EmoticonChineseArray = data.match(/\[\[.*?\]\]/g);  //如果匹配到返回数据，匹配不到返回null,如[ '[[微笑]]','[[撇嘴]]' ]。因为es6不支持断言，只能处理成这样
        // 将数组中的各项，替换为<img src='1.gif'>
        if (EmoticonChineseArray) {
          EmoticonChineseArray.forEach(function (Item) {
            Item = Item.replace(/\[|\]/g, '');// 将字符串中的项如 '[[微笑]]'，替换为'微笑'
            data = data.replace(/\[\[.*?\]\]/, '<img style="vertical-align:bottom" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + EmotionList.indexOf(Item) + '.gif">'); //将'微笑'替换为<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif">
          });
        }
    
        return data;
      };


}
export default CommonFunction