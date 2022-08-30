let baseTitle = 'wwk 博客 前端工程师';

let globalTitle = baseTitle;

function titleTick() {
    document.addEventListener('visibilitychange', function () {
        document.title = document.hidden ? '出BUG 了快看！' : globalTitle
    })
}

function setTitle(title:string|null) {
    globalTitle = title !== '首页' ? `${title} | ${baseTitle}` : baseTitle;
    document.title = globalTitle;
}

function copyPrefix() {
    // 复制超过18个字，改变被复制文字
    document.addEventListener('copy',function (event) {
        let clipboardData = event.clipboardData || (window as any).clipboardData;
        let innerText = window.getSelection()?.toString();

        if(!clipboardData || !innerText || innerText.length < 18) {
            return
        }
        event.preventDefault();
        let data = [
            '作者:wwk',
            '来自: 火星',
            '链接:'+ window.location.href,
            '',
            innerText
        ];
        clipboardData.setData('text/html',data.join('<br>'));
        clipboardData.setData('text/plain',data.join('\n'));

    });
}

function consolePrint () {
    try {
        console.log('wwk\r\nis\r\nso\r\ncool');
    } catch (e) {
        
    }
}

const funny = {
    setTitle,
    init() {
        titleTick()
		copyPrefix()
		consolePrint()
    }
}
export default funny