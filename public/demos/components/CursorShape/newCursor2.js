class FluidCursor {
    constructor(containerId = 'body') {
        this.containerId = containerId;
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        this.trail = []; // 鼠标轨迹点
        this.animationId = null;
        this.isDestroyed = false;
        
        // ==================== 配置项说明 ====================
        this.config = {
            // 【线条配置】
            layerCount: 6,              // 流体线条数量 
            maxLineWidth: 2,            // 最大线条宽度 
            minLineWidth: 1,            // 最小线条宽度 
            
            maxTrailLength: 30,         // 轨迹最大长度
                                        // 数值越大，拖尾越长，但会影响性能
            trailLifetime: 0.8,         // 线条收束时间/秒
                                        // 停止移动后，线条多久完全消失
            
            // 【颜色配置】
            color: {
                hueSpeed: 30,           // 色相变化速度
                hueLayerOffset: 40,     // 层间色相偏移
                saturation: 60,         // 饱和度
                baseLightness: 60,      // 基础亮度
                lightnessStep: 2,       // 层间亮度递增 
                maxAlpha: 0.9,          // 最大透明度
                minAlpha: 0.6,          // 最小透明度
            },
            
            // 【光标配置】
            cursor: {
                size: 4,                // 光标基础尺寸
                pulseAmplitude: 1,      // 脉动振幅
                pulseSpeed: 6,          // 脉动速度
                glowMultiplier: 2,    // 光晕倍数
                coreSize: 2,            // 核心尺寸
                coreAlpha: 0.95,        // 核心透明度
                glowAlpha: 0.7          // 光晕透明度
            },
            
            // 【动画配置】
            timeStep: 0.03              // 时间步长 
        };
    }
    
    // 初始化方法
    init() {
        this.createCanvas();
        this.setupCanvas();
        this.bindEvents();
        this.animate();
        return this;
    }
    
    // 创建Canvas元素
    createCanvas() {
        // 移除已存在的canvas
        const existingCanvas = document.getElementById('fluid-cursor-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'fluid-cursor-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
            background: transparent;
        `;
        
        // 添加到body
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    
    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
    }
    
    bindEvents() {
        this.handleResize = () => this.setupCanvas();
        this.handleMouseMove = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // 添加轨迹点
            this.trail.push({
                x: this.mouse.x,
                y: this.mouse.y,
                time: this.time
            });
            
            // 简单的点数限制
            while (this.trail.length > this.config.maxTrailLength) {
                this.trail.shift();
            }
        };
        
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('mousemove', this.handleMouseMove);
    }
    
    // 销毁方法
    destroy() {
        this.isDestroyed = true;
        
        // 取消动画帧
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // 移除事件监听
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        
        // 移除canvas
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.canvas = null;
        this.ctx = null;
    }
    
    drawStraightTrail() {
        if (this.trail.length < 2) return;
        
        for (let layer = 0; layer < this.config.layerCount; layer++) {
            this.ctx.beginPath();
            
            // 直接使用轨迹点，不添加波形偏移
            if (this.trail.length > 0) {
                this.ctx.moveTo(this.trail[0].x, this.trail[0].y);
                
                for (let i = 1; i < this.trail.length; i++) {
                    this.ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
            }
            
            // 基于配置的线条样式
            const hue = (this.time * this.config.color.hueSpeed + layer * this.config.color.hueLayerOffset) % 360;
            const alpha = Math.max(
                this.config.color.minAlpha, 
                this.config.color.maxAlpha - layer * 0.12
            );
            const lineWidth = Math.max(
                this.config.minLineWidth, 
                this.config.maxLineWidth - layer * 0.15
            );
            
            this.ctx.strokeStyle = `hsla(${hue}, ${this.config.color.saturation}%, ${this.config.color.baseLightness + layer * this.config.color.lightnessStep}%, ${alpha})`;
            this.ctx.lineWidth = lineWidth;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();
        }
    }
    
    drawCursor() {
        const cursorSize = this.config.cursor.size;
        const pulseSize = Math.sin(this.time * this.config.cursor.pulseSpeed) * this.config.cursor.pulseAmplitude + cursorSize;
        
        // 外圈光晕
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, pulseSize * this.config.cursor.glowMultiplier
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.config.cursor.glowAlpha})`);
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, pulseSize * this.config.cursor.glowMultiplier, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // 内圈核心
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, this.config.cursor.coreSize, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.config.cursor.coreAlpha})`;
        this.ctx.fill();
    }
    
    animate() {
        if (this.isDestroyed) return;
        
        this.time += this.config.timeStep;
        
        // 清除画布
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // 绘制直线拖尾
        this.drawStraightTrail();
        
        // 绘制光标
        this.drawCursor();
        
        // 定期清理过老的轨迹点（优化版本）
        if (this.trail.length > 0) {
            this.trail = this.trail.filter(point => this.time - point.time < this.config.trailLifetime);
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // 提供配置更新方法
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        // 如果更新了maxTrailLength，需要立即调整轨迹长度
        if (newConfig.maxTrailLength && this.trail.length > newConfig.maxTrailLength) {
            this.trail = this.trail.slice(-newConfig.maxTrailLength);
        }
    }
    
    // 快速预设配置
    applyPreset(presetName) {
        const presets = {
            // 柔和效果 - 适合优雅场景
            subtle: {
                layerCount: 4,
                maxTrailLength: 10,
                trailLifetime: 0.3,
                color: { saturation: 60, maxAlpha: 0.7 }
            },
            // 强烈效果 - 适合炫酷场景
            intense: {
                layerCount: 8,
                maxLineWidth: 3.0,
                maxTrailLength: 25,
                trailLifetime: 0.6,
                color: { saturation: 90, maxAlpha: 0.95 }
            },
            // 霓虹效果 - 赛博朋克风格
            neon: {
                maxTrailLength: 20,
                trailLifetime: 0.5,
                color: { 
                    saturation: 100, 
                    baseLightness: 80,
                    hueSpeed: 80
                }
            },
            // 极简效果 - 适合专业场景
            minimal: {
                layerCount: 3,
                maxLineWidth: 1.0,
                maxTrailLength: 8,
                trailLifetime: 0.25
            }
        };
        
        if (presets[presetName]) {
            this.updateConfig(presets[presetName]);
        }
    }
}

// 导出FluidCursor类供Vue项目使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FluidCursor;
}

// 全局变量
window.FluidCursor = FluidCursor;

// 兼容原有的初始化方式（如果页面中有canvas#canvas元素）
window.addEventListener('DOMContentLoaded', () => {
    const existingCanvas = document.getElementById('canvas');
    if (existingCanvas) {
        // 如果页面已有canvas元素，创建实例
        const fluidCursor = new FluidCursor().init();
        window.fluidCursor = fluidCursor;
    }
});
