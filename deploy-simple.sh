#!/bin/bash

# 宝塔面板简化部署脚本
# 适用于图形界面操作

echo "🚀 开始简化自动部署..."

# 进入项目目录
cd /www/projects/my

echo "📥 拉取最新代码..."
git pull origin main

echo "📦 安装依赖..."
npm install

echo "🔨 构建项目..."
npm run build

echo "💾 备份当前版本..."
# 创建备份目录
mkdir -p /www/backup

# 备份当前网站文件
if [ -d "/www/wwwroot/47.107.67.50" ] && [ "$(ls -A /www/wwwroot/47.107.67.50)" ]; then
    cp -r /www/wwwroot/47.107.67.50 /www/backup/backup_$(date +%Y%m%d_%H%M%S)
fi

echo "🚀 部署新版本..."
# 确保目标目录存在
mkdir -p /www/wwwroot/47.107.67.50

# 复制新文件
cp -r dist/* /www/wwwroot/47.107.67.50/

echo "🔐 设置文件权限..."
# 设置正确的文件权限
chown -R www:www /www/wwwroot/47.107.67.50
find /www/wwwroot/47.107.67.50 -type d -exec chmod 755 {} \;
find /www/wwwroot/47.107.67.50 -type f -exec chmod 644 {} \;

echo ""
echo "🎉 部署完成！"
echo "🌐 请访问 http://47.107.67.50 查看更新"
echo "⏰ 部署时间: $(date)"
echo "" 