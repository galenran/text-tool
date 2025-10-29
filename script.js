// ...existing code...
// Markdown/HTML预览（实时+代码高亮）
function previewMarkdownHtml() {
    const text = document.getElementById('mdInput').value;
    let previewDiv = document.getElementById('mdPreview');
    // 判断是否为HTML
    if (/^\s*<.+?>/.test(text)) {
        previewDiv.innerHTML = text;
        highlightCodeBlocks(previewDiv);
        return;
    }
    function renderMd() {
        window.marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: false,
            highlight: function (code, lang) {
                if (window.hljs) {
                    return window.hljs.highlightAuto(code).value;
                }
                return code;
            }
        });
        previewDiv.innerHTML = window.marked.parse(text);
        highlightCodeBlocks(previewDiv);
    }
    function highlightCodeBlocks(container) {
        if (window.hljs) {
            container.querySelectorAll('pre code').forEach(block => {
                window.hljs.highlightElement(block);
            });
        } else {
            let script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js';
            script.onload = () => highlightCodeBlocks(container);
            document.body.appendChild(script);
        }
    }
    if (!window.marked) {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = renderMd;
        document.body.appendChild(script);
    } else {
        renderMd();
    }
}

// 实时预览监听
document.addEventListener('DOMContentLoaded', function () {
    var mdInput = document.getElementById('mdInput');
    if (mdInput) {
        mdInput.addEventListener('input', previewMarkdownHtml);
    }
});
// 文本对比/高亮差异
function compareTexts() {
    const a = document.getElementById('compareTextA').value;
    const b = document.getElementById('compareTextB').value;
    const aLines = a.split(/\r?\n/);
    const bLines = b.split(/\r?\n/);
    let maxLen = Math.max(aLines.length, bLines.length);
    let html = '<table class="w-full text-left"><tr><th class="pr-4">文本A</th><th>文本B</th></tr>';
    for (let i = 0; i < maxLen; i++) {
        let aLine = aLines[i] || '';
        let bLine = bLines[i] || '';
        if (aLine === bLine) {
            html += `<tr><td class="pr-4">${escapeHtml(aLine)}</td><td>${escapeHtml(bLine)}</td></tr>`;
        } else {
            let diffA = diffHighlight(aLine, bLine, 'A');
            let diffB = diffHighlight(bLine, aLine, 'B');
            html += `<tr><td class="pr-4">${diffA}</td><td>${diffB}</td></tr>`;
        }
    }
    html += '</table>';
    document.getElementById('compareResult').innerHTML = html;
}

// 逐字符高亮差异
function diffHighlight(str1, str2, mode) {
    let arr1 = str1.split('');
    let arr2 = str2.split('');
    let len = Math.max(arr1.length, arr2.length);
    let result = '';
    for (let i = 0; i < len; i++) {
        let c1 = arr1[i] || '';
        let c2 = arr2[i] || '';
        if (c1 !== c2) {
            result += `<span style="background:${mode === 'A' ? '#ffe4e1' : '#e1f7ff'};">${escapeHtml(c1)}</span>`;
        } else {
            result += escapeHtml(c1);
        }
    }
    return result;
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// 批量添加前后缀
function addPrefixSuffix() {
    const prefix = document.getElementById('prefixInput').value;
    const suffix = document.getElementById('suffixInput').value;
    let lines = getText().split(/\r?\n/);
    lines = lines.map(line => prefix + line + suffix);
    setText(lines.join('\n'));
}

// 批量去除前后缀
function removePrefixSuffix() {
    const prefix = document.getElementById('prefixInput').value;
    const suffix = document.getElementById('suffixInput').value;
    let lines = getText().split(/\r?\n/);
    lines = lines.map(line => {
        if (prefix && line.startsWith(prefix)) {
            line = line.slice(prefix.length);
        }
        if (suffix && line.endsWith(suffix)) {
            line = line.slice(0, -suffix.length);
        }
        return line;
    });
    setText(lines.join('\n'));
}
// 二维码生成/识别
function generateQRCode() {
    const text = getText();
    let qrDiv = document.getElementById('qrResult');
    qrDiv.innerHTML = '';
    let qrCanvas = document.createElement('div');
    qrDiv.appendChild(qrCanvas);
    function addDownloadBtn() {
        // 查找canvas
        let canvas = qrCanvas.querySelector('canvas');
        if (canvas) {
            let btn = document.createElement('button');
            btn.textContent = '下载二维码';
            btn.className = 'bg-green-700 text-white px-3 py-1 rounded ml-4';
            btn.style.marginTop = '10px';
            btn.onclick = function () {
                let url = canvas.toDataURL('image/png');
                let a = document.createElement('a');
                a.href = url;
                a.download = 'qrcode.png';
                a.click();
            };
            qrDiv.appendChild(btn);
        }
    }
    if (!window.QRCode) {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
        script.onload = function () {
            new QRCode(qrCanvas, { text: text, width: 180, height: 180 });
            setTimeout(addDownloadBtn, 300);
        };
        document.body.appendChild(script);
    } else {
        new QRCode(qrCanvas, { text: text, width: 180, height: 180 });
        setTimeout(addDownloadBtn, 300);
    }
}

function recognizeQRCode(event) {
    let file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function (e) {
        let img = new Image();
        img.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            function doRecognize() {
                let result = window.jsQR(imageData.data, canvas.width, canvas.height);
                let qrDiv = document.getElementById('qrResult');
                if (result) {
                    qrDiv.innerHTML = '识别结果：' + result.data;
                } else {
                    qrDiv.innerHTML = '未识别到二维码';
                }
            }
            if (!window.jsQR) {
                let script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js';
                script.onload = doRecognize;
                document.body.appendChild(script);
            } else {
                doRecognize();
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
function getText() {
    return document.getElementById("inputText").value;
}

function setText(val) {
    document.getElementById("inputText").value = val;
}

function toUppercase() {
    setText(getText().toUpperCase());
}

function toLowercase() {
    setText(getText().toLowerCase());
}

function removeSpaces() {
    setText(getText().replace(/\s/g, ''));
}

function countWords() {
    const text = getText().trim();
    // 词数统计不变
    const words = text ? text.split(/\s+/).length : 0;
    // 字数统计：去除所有空白字符后再统计
    const chars = text.replace(/\s/g, '').length;
    document.getElementById("output").innerText = `字数：${chars}，词数：${words}`;
}

function clearText() {
    setText('');
    document.getElementById("output").innerText = '';
}

// ✅ 新增：标题格式化（首字母大写，其他小写）
function toTitleCase() {
    const text = getText().trim().replace(/\s+/g, ' '); // 去多余空格
    const formatted = text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    setText(formatted);
}

// 文本去重：去除重复行
function deduplicateLines() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
}

// 按分隔符分割文本（将所有内容按分隔符拆成多行）
function splitText() {
    const sep = document.getElementById('splitJoinSeparator').value || ',';
    const text = getText();
    // 按分隔符分割，去除首尾空白
    const arr = text.split(sep).map(s => s.trim()).filter(s => s.length > 0);
    setText(arr.join('\n'));
}

// 合并为一行（用分隔符连接所有行）
function joinText() {
    const sep = document.getElementById('splitJoinSeparator').value || ',';
    const text = getText();
    const arr = text.split(/\r?\n/).map(s => s.trim()).filter(s => s.length > 0);
    setText(arr.join(sep));
}

// 批量查找替换（支持正则）
function replaceTextBatch() {
    const find = document.getElementById('findText').value;
    const replace = document.getElementById('replaceText').value;
    const isRegex = document.getElementById('replaceRegex').checked;
    let text = getText();
    if (!find) return;
    try {
        if (isRegex) {
            const reg = new RegExp(find, 'g');
            text = text.replace(reg, replace);
        } else {
            text = text.split(find).join(replace);
        }
        setText(text);
    } catch (e) {
        alert('正则表达式有误！');
    }
}

// 文本排序功能
function sortLines() {
    const type = document.getElementById('sortType').value;
    const text = getText();
    let lines = text.split(/\r?\n/).filter(s => s.length > 0);
    if (type === 'alpha') {
        lines = lines.sort((a, b) => a.localeCompare(b, 'zh-CN'));
    } else if (type === 'num') {
        lines = lines.sort((a, b) => {
            const na = parseFloat(a.replace(/[^\d.\-]/g, ''));
            const nb = parseFloat(b.replace(/[^\d.\-]/g, ''));
            return (isNaN(na) ? 0 : na) - (isNaN(nb) ? 0 : nb);
        });
    } else if (type === 'reverse') {
        lines = lines.reverse();
    }
    setText(lines.join('\n'));
}

// 行内排序：对每一行内部的词语或字符排序
function sortLineInner() {
    const sep = document.getElementById('inlineSortSep').value;
    const type = document.getElementById('inlineSortType').value;
    const text = getText();
    const lines = text.split(/\r?\n/);
    const sortedLines = lines.map(line => {
        let arr;
        if (sep) {
            arr = line.split(sep).map(s => s.trim()).filter(s => s.length > 0);
        } else {
            arr = Array.from(line);
        }
        if (type === 'alpha') {
            arr.sort((a, b) => a.localeCompare(b, 'zh-CN'));
        } else if (type === 'reverse') {
            arr = arr.reverse();
        }
        return sep ? arr.join(sep) : arr.join('');
    });
    setText(sortedLines.join('\n'));
}

// 去除空行
function removeEmptyLines() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    const filtered = lines.filter(line => line.trim().length > 0);
    setText(filtered.join('\n'));
}

// 只保留空行
function keepOnlyEmptyLines() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    const filtered = lines.filter(line => line.trim().length === 0);
    setText(filtered.join('\n'));
}

// 行反转：所有行顺序反转
function reverseLines() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    setText(lines.reverse().join('\n'));
}

// 每行单词反转（默认按空格分割）
function reverseWordsInLine() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    const reversed = lines.map(line => line.split(' ').reverse().join(' '));
    setText(reversed.join('\n'));
}

// 每行字符反转
function reverseCharsInLine() {
    const text = getText();
    const lines = text.split(/\r?\n/);
    const reversed = lines.map(line => Array.from(line).reverse().join(''));
    setText(reversed.join('\n'));
}

// 统计词频或行频
function statFrequency() {
    const type = document.getElementById('freqType').value;
    const text = getText();
    let freq = {};
    if (type === 'word') {
        // 按空格分词
        const words = text.split(/\s+/).filter(s => s.length > 0);
        words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    } else {
        // 按行统计
        const lines = text.split(/\r?\n/).filter(s => s.length > 0);
        lines.forEach(l => { freq[l] = (freq[l] || 0) + 1; });
    }
    // 排序输出
    const result = Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}：${v}`).join('\n');
    setText(result);
}

// 文本加密/解密（Base64、ROT13）
function cryptoText() {
    const type = document.getElementById('cryptoType').value;
    const text = getText();
    let result = '';
    try {
        if (type === 'base64encode') {
            result = btoa(unescape(encodeURIComponent(text)));
        } else if (type === 'base64decode') {
            result = decodeURIComponent(escape(atob(text)));
        } else if (type === 'rot13encode' || type === 'rot13decode') {
            result = text.replace(/[a-zA-Z]/g, function (c) {
                return String.fromCharCode(
                    (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
                );
            });
        }
        setText(result);
    } catch (e) {
        alert('加密/解密失败！');
    }
}

// 英文句子首字母大写，其他字母小写
function sentenceCase() {
    let text = getText();
    // 按句子分割（. ! ? 及中文句号等），保留分隔符
    let sentences = text.match(/[^.!?。！？]+[.!?。！？]?/g);
    if (!sentences) {
        setText(text);
        return;
    }
    let result = sentences.map(s => {
        s = s.trim();
        if (s.length === 0) return '';
        let first = s[0].toUpperCase();
        let rest = s.slice(1).toLowerCase();
        return first + rest;
    }).join(' ');
    setText(result);
}

