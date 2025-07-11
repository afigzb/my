import { css } from '/vendor/lit-core.min.js';

export default [
    css`
    /* 核心变量 */
:host {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --text: #374151;
    --text-light: #6b7280;
    --bg: #ffffff;
    --bg-light: #f9fafb;
    --border: #e5e7eb;
    --shadow: rgba(59, 130, 246, 0.3);
    --trans: 0.2s ease;
}

button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
}

/* 播放器容器 */
.player-container {
}

/* 浮动球 */
.player-ball {
    width: 64px;
    height: 64px;
    background-image: url('/public/demos/components/AudioPlayer/img/黑胶唱片.png');
    background-size: cover;
    background-position: center;
    box-shadow: 0 4px 12px var(--shadow);
    border-radius: 50%;
    transition: all var(--trans);
    animation: rotate 10s linear infinite;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.player-controls {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: white;
    pointer-events: none;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.player-ball:hover {
    animation-play-state: paused;
}

.player-ball.hidden {
    opacity: 0;
}

/* 面板 */
.player-panel {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 320px;
    backdrop-filter: blur(20px);
    background: var(--bg);
    border: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    margin: 0 8px 8px 0;
    transform-origin: bottom right;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    display: none;
}

.player-panel.show {
    display: block;
    opacity: 1;
    transform: scale(1);
}

/* 头部和信息 */
.player-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--border);
}

.track-info {
    flex: 1;
    min-width: 0;
}

.track-title {
    font-size: 14px;
    font-weight: 600;
    color: #111827;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.play-mode {
    font-size: 12px;
    color: var(--text-light);
}

/* 按钮样式 */
.close-btn, .volume-btn {
    color: var(--text-light);
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn {
    margin-left: 12px;
    width: 24px;
    height: 24px;
}

.close-btn:hover, .volume-btn:hover, 
.control-btn:hover, .mode-btn:hover, .playlist-btn:hover {
    color: #111827;
}

/* 主控制区域 */
.player-main {
    padding: 16px;
}

/* 进度条 */
.progress-container {
    background: var(--border);
    height: 4px;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 16px;
    position: relative;
    display: flex;
    align-items: center;
}

.progress-bar {
    background: var(--primary);
    height: 100%;
    border-radius: 2px;
    transition: width 0.1s ease;
}

/* 时间显示 */
.time-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--text-light);
    margin-bottom: 16px;
}

/* 控制按钮 */
.controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin-bottom: 16px;
}

.control-btn {
    color: var(--text);
    padding: 8px;
    border-radius: 8px;
    transition: all var(--trans);
}

.control-btn:hover, .play-btn:hover {
    transform: scale(1.05);
}

.control-btn:active, .play-btn:active {
    transform: scale(0.95);
}

.play-btn {
    background: var(--primary);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px var(--shadow);
    transition: all var(--trans);
}

.play-btn:hover {
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

/* 底部控制 */
.bottom-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mode-btn, .playlist-btn {
    color: var(--text-light);
    padding: 8px;
    border-radius: 8px;
    transition: all var(--trans);
}

.mode-btn:hover, .playlist-btn:hover, .playlist-btn.active {
    background: #f3f4f6;
}

/* 音量控制 */
.volume-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    margin: 0 16px;
}

.volume-slider-wrapper {
    flex: 1;
    height: 24px;
    display: flex;
    align-items: center;
    position: relative;
}

.volume-slider-container {
    position: relative;
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.volume-slider-fill {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background: var(--primary);
    border-radius: 3px;
    transition: width 0.1s ease;
}

.volume-display {
    font-size: 12px;
    color: var(--text-light);
    width: 32px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

/* 滑块样式 */
input[type="range"] {
    -webkit-appearance: none;
    background: transparent;
    position: absolute;
    z-index: 10;
    margin: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
    background: transparent;
    height: 6px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: var(--primary);
    height: 14px;
    width: 14px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px;
    box-shadow: 0 2px 4px var(--shadow);
    transition: all var(--trans);
}

input[type="range"]::-webkit-slider-thumb:hover {
    background: var(--primary-dark);
    transform: scale(1.1);
}

input[type="range"]::-moz-range-track {
    background: transparent;
    height: 6px;
    border: none;
}

input[type="range"]::-moz-range-thumb {
    background: var(--primary);
    height: 14px;
    width: 14px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px var(--shadow);
}

/* 播放列表 */
.playlist-container {
    position: relative;
}

.playlist-popup {
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 8px;
    width: 288px;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    opacity: 0;
    transform: scale(0.95);
    transition: all var(--trans);
    display: none;
}

.playlist-popup.show {
    display: block;
    opacity: 1;
    transform: scale(1);
}

.playlist-header {
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.playlist-content {
    max-height: 192px;
    overflow-y: auto;
}

.playlist-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    margin: 4px 8px;
    transition: all var(--trans);
}

.playlist-item:hover, .playlist-item.active {
    background: rgba(255, 255, 255, 0.6);
}

.playlist-item.active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.playlist-number {
    font-size: 12px;
    color: #9ca3af;
    width: 24px;
    display: flex;
    align-items: center;
}

.playlist-title {
    flex: 1;
    font-size: 14px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 8px;
    display: flex;
    align-items: center;
}

.playlist-playing {
    font-size: 12px;
    color: var(--primary-dark);
    display: flex;
    align-items: center;
    margin-left: 4px;
}

.playlist-item.active .playlist-title {
    font-weight: 500;
    color: var(--primary-dark);
}

/* 图标样式 */
.icon-svg, .icon-svg-lg, .icon-svg-play {
    width: 16px;
    height: 16px;
    fill: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.icon-svg-lg {
    width: 20px;
    height: 20px;
}

.icon-svg-play {
    width: 18px;
    height: 18px;
}

/* 隐藏元素 */
.hidden {
    display: none !important;
}

    `
];
