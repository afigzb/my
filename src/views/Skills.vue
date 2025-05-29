<template>
  <div class="min-h-screen bg-white">
    <!-- 页面标题 -->
    <section class="bg-black text-white py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          技术能力
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          持续学习和掌握现代前端技术，致力于创建高质量的用户体验
        </p>
      </div>
    </section>

    <!-- 技术栈分类 -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 前端技术 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-black mb-8 text-center">前端技术</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">H</span>
              </div>
              <h3 class="text-xl font-bold mb-2">HTML5</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 95%"></div>
              </div>
              <span class="text-sm text-gray-600">熟练 95%</span>
            </div>

            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">C</span>
              </div>
              <h3 class="text-xl font-bold mb-2">CSS3</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 90%"></div>
              </div>
              <span class="text-sm text-gray-600">熟练 90%</span>
            </div>

            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">JS</span>
              </div>
              <h3 class="text-xl font-bold mb-2">JavaScript</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 85%"></div>
              </div>
              <span class="text-sm text-gray-600">熟练 85%</span>
            </div>

            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">TS</span>
              </div>
              <h3 class="text-xl font-bold mb-2">TypeScript</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 75%"></div>
              </div>
              <span class="text-sm text-gray-600">中级 75%</span>
            </div>
          </div>
        </div>

        <!-- 框架与库 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-black mb-8 text-center">框架与库</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">V</span>
              </div>
              <h3 class="text-xl font-bold mb-2">Vue.js</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 80%"></div>
              </div>
              <span class="text-sm text-gray-600">熟练 80%</span>
            </div>

            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">R</span>
              </div>
              <h3 class="text-xl font-bold mb-2">React</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 70%"></div>
              </div>
              <span class="text-sm text-gray-600">中级 70%</span>
            </div>

            <div class="bg-white border border-gray-200 p-6 rounded-xl text-center hover:shadow-lg transition">
              <div class="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span class="text-2xl font-bold text-black">N</span>
              </div>
              <h3 class="text-xl font-bold mb-2">Node.js</h3>
              <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div class="bg-green-600 h-3 rounded-full" style="width: 65%"></div>
              </div>
              <span class="text-sm text-gray-600">中级 65%</span>
            </div>
          </div>
        </div>

        <!-- 工具与平台 -->
        <div class="mb-16">
          <h2 class="text-3xl font-bold text-black mb-8 text-center">工具与平台</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">Git</span>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">Webpack</span>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">Vite</span>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">Docker</span>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">VSCode</span>
            </div>
            <div class="bg-white border border-gray-200 p-4 rounded-lg text-center hover:shadow-lg transition">
              <div class="w-12 h-12 bg-gray-100 rounded mx-auto mb-2"></div>
              <span class="text-sm font-medium">Figma</span>
            </div>
          </div>
        </div>

        <!-- 学习进程 -->
        <div>
          <h2 class="text-3xl font-bold text-black mb-8 text-center">正在学习</h2>
          <div class="bg-white border border-gray-200 rounded-xl p-8">
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-bold mb-4 text-black">当前学习目标</h3>
                <ul class="space-y-3">
                  <li class="flex items-center">
                    <div class="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span class="text-gray-700">深入学习 Vue 3 Composition API</span>
                  </li>
                  <li class="flex items-center">
                    <div class="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span class="text-gray-700">掌握 TypeScript 高级特性</span>
                  </li>
                  <li class="flex items-center">
                    <div class="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span class="text-gray-700">学习 Nuxt.js 全栈开发</span>
                  </li>
                  <li class="flex items-center">
                    <div class="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    <span class="text-gray-700">探索 WebAssembly 应用</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-4 text-black">技术认证</h3>
                <div class="space-y-3">
                  <div class="p-4 bg-gray-50 rounded-lg">
                    <div class="font-semibold text-black">前端开发工程师认证</div>
                    <div class="text-sm text-gray-600">Vue.js 官方认证 (进行中)</div>
                  </div>
                  <div class="p-4 bg-gray-50 rounded-lg">
                    <div class="font-semibold text-black">阿里云开发者认证</div>
                    <div class="text-sm text-gray-600">云原生开发 (计划中)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 技能页面逻辑
</script>

<style scoped>
/* 技能页面样式 */
</style> 