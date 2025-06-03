#!/bin/bash

# 阿里云宝塔自动部署脚本
# 适配路径: /www/wwwroot/47.107.67.50

echo "🚀 开始自动部署到宝塔环境..."

# 获取当前脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# 宝塔网站根目录
DEPLOY_PATH="/www/wwwroot/47.107.67.50"

# 1. 拉取最新代码
echo "📥 拉取最新代码..."
git pull origin main || git pull origin master

if [ $? -ne 0 ]; then
    echo "❌ Git拉取失败，请检查网络连接和仓库权限"
    exit 1
fi

# 2. 检查Node.js和npm
echo "🔍 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm未安装，请先安装npm"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo "✅ npm版本: $(npm --version)"

# 3. 安装/更新依赖
echo "📦 安装依赖..."
npm ci

if [ $? -ne 0 ]; then
    echo "⚠️ npm ci失败，尝试使用npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
fi

# 4. 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 项目构建失败"
    exit 1
fi

# 5. 检查构建产物
if [ ! -d "dist" ]; then
    echo "❌ dist目录不存在，构建可能失败"
    exit 1
fi

# 6. 备份当前版本（可选）
if [ -d "$DEPLOY_PATH" ] && [ "$(ls -A $DEPLOY_PATH)" ]; then
    echo "💾 备份当前版本..."
    BACKUP_DIR="/www/backup/$(basename $DEPLOY_PATH)_$(date +%Y%m%d_%H%M%S)"
    mkdir -p /www/backup
    cp -r "$DEPLOY_PATH" "$BACKUP_DIR"
    echo "✅ 备份完成: $BACKUP_DIR"
fi

# 7. 部署新版本
echo "🚀 部署到宝塔目录: $DEPLOY_PATH"

# 确保目标目录存在
mkdir -p "$DEPLOY_PATH"

# 复制文件到宝塔网站目录
cp -r dist/* "$DEPLOY_PATH/"

if [ $? -eq 0 ]; then
    echo "✅ 文件复制成功"
else
    echo "❌ 文件复制失败"
    exit 1
fi

# 8. 设置文件权限（宝塔推荐权限）
echo "🔐 设置文件权限..."
chown -R www:www "$DEPLOY_PATH"
find "$DEPLOY_PATH" -type d -exec chmod 755 {} \;
find "$DEPLOY_PATH" -type f -exec chmod 644 {} \;

# 9. 清理旧的备份（保留最近5个）
echo "🧹 清理旧备份..."
if [ -d "/www/backup" ]; then
    ls -t /www/backup/$(basename $DEPLOY_PATH)_* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null
fi

echo ""
echo "🎉 部署完成！"
echo "🌐 网站地址: http://47.107.67.50"
echo "📁 部署路径: $DEPLOY_PATH"
echo "⏰ 部署时间: $(date)"
echo "" 