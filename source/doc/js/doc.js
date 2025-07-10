document.addEventListener('DOMContentLoaded', () => {
    const keyInput = document.getElementById('keyInput');
    const generateKeyBtn = document.getElementById('generateKeyBtn');
    const keyInfo = document.getElementById('keyInfo');
    const plainInput = document.getElementById('plainInput');
    const cipherInput = document.getElementById('cipherInput');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const encryptResult = document.getElementById('encryptResult');
    const decryptResult = document.getElementById('decryptResult');
    
    // 生成新密钥
    generateKeyBtn.addEventListener('click', () => {
        const keyBytes = new Uint8Array(32);
        window.crypto.getRandomValues(keyBytes);
        const keyHex = Array.from(keyBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        
        keyInput.value = keyHex;
        keyInfo.innerHTML = `新密钥已生成: ${keyHex} <button class="copy-btn">复制密钥</button>`;
        keyInfo.style.display = 'block';
        
        // 添加复制功能
        keyInfo.querySelector('.copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(keyHex).then(() => {
                const originalText = keyInfo.innerHTML;
                keyInfo.innerHTML = '密钥已复制到剪贴板!';
                setTimeout(() => {
                    keyInfo.innerHTML = originalText;
                }, 2000);
            });
        });
    });
    
    // 加密文档
    encryptBtn.addEventListener('click', async () => {
        encryptResult.textContent = '加密中...';
        encryptResult.className = 'result-box';
        
        try {
            const plaintext = plainInput.value.trim();
            if (!plaintext) {
                throw new Error('请输入要加密的文本');
            }
            
            const keyHex = validateKey();
            const keyData = hexToArrayBuffer(keyHex);
            
            // 加密数据
            const encrypted = await encryptData(keyData, plaintext);
            
            // 显示结果
            encryptResult.textContent = encrypted;
            encryptResult.classList.add('success');
            
            // 添加复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '复制密文';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(encrypted).then(() => {
                    copyBtn.textContent = '已复制!';
                    setTimeout(() => {
                        copyBtn.textContent = '复制密文';
                    }, 2000);
                });
            });
            
            encryptResult.appendChild(copyBtn);
        } catch (err) {
            encryptResult.textContent = `加密失败: ${err.message}`;
            encryptResult.classList.add('error');
        }
    });
    
    // 解密文档
    decryptBtn.addEventListener('click', async () => {
        decryptResult.textContent = '解密中...';
        decryptResult.className = 'result-box';
        
        try {
            const ciphertext = cipherInput.value.trim().replace(/\s+/g, '');
            if (!ciphertext) {
                throw new Error('请输入要解密的密文');
            }
            
            const keyHex = validateKey();
            const keyData = hexToArrayBuffer(keyHex);
            const encryptedData = base64ToArrayBuffer(ciphertext);
            
            // 解密数据
            const decrypted = await decryptData(keyData, encryptedData);
            
            // 显示结果
            decryptResult.textContent = decrypted;
            decryptResult.classList.add('success');
        } catch (err) {
            decryptResult.textContent = `解密失败: ${err.message}`;
            decryptResult.classList.add('error');
        }
    });
    
    // 验证密钥格式
    function validateKey() {
        const keyHex = keyInput.value.trim();
        if (!keyHex) {
            throw new Error('请输入密钥');
        }
        if (keyHex.length !== 64) {
            throw new Error('密钥必须是64个字符（32字节）');
        }
        if (!/^[0-9a-fA-F]+$/.test(keyHex)) {
            throw new Error('密钥必须是有效的十六进制格式');
        }
        return keyHex;
    }
    
    // 十六进制字符串转ArrayBuffer
    function hexToArrayBuffer(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }
    
    // Base64转ArrayBuffer
    function base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
    
    // ArrayBuffer转Base64
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    
    // 使用Web Crypto API加密
    async function encryptData(keyData, plaintext) {
        // 生成随机IV（12字节）
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        // 导入密钥
        const key = await window.crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );
        
        // 执行加密
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128
            },
            key,
            new TextEncoder().encode(plaintext)
        );
        
        // 组合IV和密文
        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encrypted), iv.length);
        
        return arrayBufferToBase64(combined);
    }
    
    // 使用Web Crypto API解密
    async function decryptData(keyData, encryptedData) {
        // 提取IV（前12字节）和实际密文
        const iv = encryptedData.slice(0, 12);
        const ciphertext = encryptedData.slice(12);
        
        // 导入密钥
        const key = await window.crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );
        
        // 执行解密
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
                tagLength: 128
            },
            key,
            ciphertext
        );
        
        // 转换为文本
        return new TextDecoder().decode(decrypted);
    }
});