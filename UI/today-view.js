/**
 * 今日待办视图渲染器
 * 用于渲染今日待办视图的内容
 */

function renderTodayView(containerElement) {
  if (!containerElement) {
    console.error("找不到容器元素");
    return;
  }

  // 创建今日待办视图内容
  const todayViewContent = `
    <div class="view" style="display: block">
      <main class="main-content">
        <div class="section-header mb-6">
          <h2 class="text-2xl font-bold">今日待办</h2>
          <div class="flex items-center">
            <select class="sort-select mr-4 py-2 px-4 bg-white border border-gray-200 rounded-md text-gray-700">
              <option value="priority">按优先级</option>
              <option value="deadline">按截止时间</option>
              <option value="created">按创建时间</option>
            </select>
            <button class="btn btn-primary" id="addTodayTaskBtn">
              <i class="fas fa-plus mr-2"></i>添加任务
            </button>
          </div>
        </div>

        <!-- 今日待办统计 -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          <div class="stat-card hover:shadow-lg transition-all">
            <div class="stat-title">总任务</div>
            <div class="stat-value text-primary-color">7</div>
          </div>
          <div class="stat-card hover:shadow-lg transition-all">
            <div class="stat-title">已完成</div>
            <div class="stat-value text-green-500">3</div>
          </div>
          <div class="stat-card hover:shadow-lg transition-all">
            <div class="stat-title">剩余</div>
            <div class="stat-value text-yellow-500">4</div>
          </div>
          <div class="stat-card hover:shadow-lg transition-all">
            <div class="stat-title">完成率</div>
            <div class="stat-value text-primary-color">42.8%</div>
          </div>
        </div>

        <!-- 今日任务列表 -->
        <div class="space-y-6">
          <!-- 高优先级任务 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-semibold flex items-center">
                <i class="fas fa-circle text-red-500 mr-2"></i>高优先级
              </h3>
              <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">2</span>
            </div>
            <div class="p-0">
              <!-- 任务1 -->
              <div class="border-b border-gray-100 p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task1" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800 mb-1">首页重构</h4>
                    <div class="flex text-sm text-gray-600 mb-2">
                      <span class="mr-3"><i class="far fa-clock mr-1"></i>剩余2天</span>
                      <span>完成度75%</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-primary-color" style="width: 75%"></div>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
              
              <!-- 任务2 -->
              <div class="p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task2" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800 mb-1">API开发</h4>
                    <div class="flex text-sm text-gray-600 mb-2">
                      <span class="mr-3"><i class="far fa-clock mr-1"></i>剩余3天</span>
                      <span>完成度60%</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-primary-color" style="width: 60%"></div>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 中优先级任务 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-semibold flex items-center">
                <i class="fas fa-circle text-yellow-500 mr-2"></i>中优先级
              </h3>
              <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">2</span>
            </div>
            <div class="p-0">
              <!-- 任务1 -->
              <div class="border-b border-gray-100 p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task3" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800 mb-1">团队周会</h4>
                    <div class="flex text-sm text-gray-600">
                      <span><i class="far fa-clock mr-1"></i>今天 10:00</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
              
              <!-- 任务2 -->
              <div class="p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task4" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer">
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800 mb-1">数据分析</h4>
                    <div class="flex text-sm text-gray-600 mb-2">
                      <span class="mr-3"><i class="far fa-clock mr-1"></i>今天 16:00</span>
                      <span>完成度40%</span>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-primary-color" style="width: 40%"></div>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 已完成任务 -->
          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 class="font-semibold flex items-center">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>已完成
              </h3>
              <span class="px-3 py-1 bg-gray-200 rounded-full text-sm">3</span>
            </div>
            <div class="p-0">
              <!-- 任务1 -->
              <div class="border-b border-gray-100 p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task5" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer" checked>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-500 line-through mb-1">登录功能优化</h4>
                    <div class="flex text-sm text-gray-400">
                      <span><i class="far fa-check-circle mr-1"></i>今天 09:30</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
              
              <!-- 任务2 -->
              <div class="border-b border-gray-100 p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task6" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer" checked>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-500 line-through mb-1">Bug修复</h4>
                    <div class="flex text-sm text-gray-400">
                      <span><i class="far fa-check-circle mr-1"></i>今天 11:20</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
              
              <!-- 任务3 -->
              <div class="p-5 hover:bg-gray-50 transition-colors">
                <div class="flex items-start">
                  <div class="mr-4 mt-1">
                    <input type="checkbox" id="task7" class="rounded-full w-5 h-5 border-2 border-gray-300 cursor-pointer" checked>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-500 line-through mb-1">文档更新</h4>
                    <div class="flex text-sm text-gray-400">
                      <span><i class="far fa-check-circle mr-1"></i>今天 13:45</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <button class="text-gray-400 hover:text-gray-600 p-2"><i class="fas fa-ellipsis-v"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // 清空容器并添加新内容
  containerElement.innerHTML = todayViewContent;

  // 绑定添加任务按钮事件
  const addTaskBtn = document.getElementById("addTodayTaskBtn");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", function() {
      const taskModal = document.getElementById("taskModal");
      if (taskModal) {
        taskModal.classList.add("active");
      }
    });
  }

  console.log("今日待办视图已渲染");
} 