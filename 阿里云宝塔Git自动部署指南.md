# 🚀 阿里云宝塔Git自动部署指南

本指南将帮助您在阿里云服务器上使用宝塔面板配置Git自动部署。

## 📋 环境信息
- **服务器**: 阿里云 47.107.67.50
- **面板**: 宝塔Linux面板
- **部署路径**: `/www/wwwroot/47.107.67.50`
- **项目类型**: Vue + Vite

## 🔧 第一步：服务器环境准备

### 1. 通过宝塔面板安装必要软件

登录宝塔面板 → 软件商店，安装：
- **Git** (通常已安装)
- **Node.js版本管理器** (推荐安装Node.js 18+)
- **PM2管理器** (可选，用于进程管理)

### 2. SSH连接到服务器

```bash
ssh root@47.107.67.50
```

### 3. 检查环境

```bash
# 检查Git
git --version

# 检查Node.js
node --version
npm --version

# 如果没有Node.js，通过宝塔或手动安装
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs
```

## 🎯 第二步：设置Git仓库

### 方案A：直接克隆方式（推荐）

```bash
# 1. 创建项目目录
mkdir -p /www/projects
cd /www/projects

# 2. 克隆您的仓库
git clone https://github.com/yourusername/your-repo.git my
cd my

# 3. 复制部署脚本并设置权限
chmod +x deploy.sh

# 4. 初次部署
./deploy.sh
```

### 方案B：Git Hooks方式（自动化程度更高）

```bash
# 1. 创建bare仓库
mkdir -p /www/git-repos
cd /www/git-repos
git clone --bare https://github.com/yourusername/your-repo.git my.git

# 2. 创建工作目录
git clone /www/git-repos/my.git /www/projects/my

# 3. 设置post-receive hook
cd /www/git-repos/my.git/hooks
# 将post-receive文件上传到这里
chmod +x post-receive

# 4. 在本地添加服务器远程仓库
git remote add deploy root@47.107.67.50:/www/git-repos/my.git
```

## 📝 第三步：配置自动部署

### 1. 上传部署脚本

将 `deploy.sh` 文件上传到服务器项目目录：
```bash
# 方案A路径
/www/projects/my/deploy.sh

# 方案B路径  
/www/projects/my/deploy.sh
```

### 2. 设置文件权限

```bash
cd /www/projects/my
chmod +x deploy.sh

# 确保www用户有权限
chown -R www:www /www/wwwroot/47.107.67.50
chown -R root:root /www/projects/my
```

### 3. 测试部署

```bash
cd /www/projects/my
./deploy.sh
```

## 🚀 第四步：使用自动部署

### 方案A使用方式：

1. **本地开发完成后**:
```bash
git add .
git commit -m "your commit message"
git push origin main
```

2. **登录服务器手动触发**:
```bash
ssh root@47.107.67.50
cd /www/projects/my
./deploy.sh
```

### 方案B使用方式：

1. **本地开发完成后**:
```bash
git add .
git commit -m "your commit message"
git push origin main           # 推送到GitHub
git push deploy main          # 推送到服务器，自动触发部署
```

## 🔄 第五步：设置定时同步（可选）

如果想要定期自动检查更新，可以设置crontab：

```bash
# 编辑crontab
crontab -e

# 添加定时任务，每10分钟检查一次更新
*/10 * * * * cd /www/projects/my && git fetch && [ $(git rev-list HEAD...origin/main --count) != 0 ] && ./deploy.sh >> /var/log/auto-deploy.log 2>&1
```

## 🐛 故障排除

### 常见问题解决：

1. **权限问题**
```bash
# 检查目录权限
ls -la /www/wwwroot/47.107.67.50
# 重新设置权限
chown -R www:www /www/wwwroot/47.107.67.50
```

2. **Node.js版本问题**
```bash
# 在宝塔面板中安装Node.js版本管理器
# 或者手动安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

3. **Git认证问题**
```bash
# 生成SSH密钥
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 将公钥添加到GitHub账户
cat ~/.ssh/id_rsa.pub
```

4. **构建失败**
```bash
# 检查依赖
cd /www/projects/my
npm install
npm run build

# 检查日志
tail -f /var/log/auto-deploy.log
```

## 📊 监控和日志

### 查看部署日志
```bash
# 查看最近的部署日志
tail -f /var/log/auto-deploy.log

# 查看宝塔系统日志
tail -f /www/server/panel/logs/error.log
```

### 宝塔面板监控
- 在宝塔面板中可以查看服务器资源使用情况
- 查看网站访问日志
- 监控文件变化

## 🔐 安全建议

1. **使用SSH密钥而不是密码**
2. **定期更新服务器系统**
3. **配置防火墙规则**
4. **使用强密码**
5. **定期备份数据**

## 💡 优化建议

1. **启用宝塔的Gzip压缩**
2. **配置CDN加速**
3. **设置合适的缓存策略**
4. **定期清理备份文件**

## 📞 支持

如果遇到问题：
1. 检查宝塔面板日志
2. 查看系统日志 `/var/log/`
3. 检查网络连接
4. 确认文件权限

---

设置完成后，您只需要在本地开发，推送代码，服务器就会自动更新网站内容了！🎉

**下次部署流程**：
1. 本地修改代码
2. `git commit` 
3. `git push origin main`
4. SSH到服务器执行 `./deploy.sh` (方案A) 或 `git push deploy main` (方案B)
5. 自动完成构建和部署！ 