/**
 * Seedance 分镜提示词生成器 - 主应用逻辑
 * 处理所有用户交互、数据存储和界面更新
 */

// 应用状态管理
const AppState = {
    currentView: 'scripts', // scripts | script-detail | settings
    currentScriptId: null,
    currentScript: null,
    settings: {
        apiEndpoint: 'https://open.xiaojingai.com/v1',
        apiKey: ''
    }
};

// 数据存储键名
const STORAGE_KEYS = {
    SCRIPTS: 'seedance_scripts',
    SETTINGS: 'seedance_settings'
};

// 工具函数
const Utils = {
    /**
     * 生成唯一ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * 格式化日期时间
     */
    formatDateTime(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    },

    /**
     * 深拷贝对象
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * 显示通知消息
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // 显示动画
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // 关闭按钮
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // 自动关闭
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// 数据存储服务
const StorageService = {
    /**
     * 保存剧本列表
     */
    saveScripts(scripts) {
        localStorage.setItem(STORAGE_KEYS.SCRIPTS, JSON.stringify(scripts));
    },

    /**
     * 获取剧本列表
     */
    getScripts() {
        const data = localStorage.getItem(STORAGE_KEYS.SCRIPTS);
        return data ? JSON.parse(data) : [];
    },

    /**
     * 保存设置
     */
    saveSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    },

    /**
     * 获取设置
     */
    getSettings() {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? { ...AppState.settings, ...JSON.parse(data) } : AppState.settings;
    },

    /**
     * 导出所有数据
     */
    exportData() {
        return {
            version: '1.0',
            exportTime: new Date().toISOString(),
            scripts: this.getScripts(),
            settings: this.getSettings()
        };
    },

    /**
     * 导入数据
     */
    importData(data) {
        if (data.scripts) {
            this.saveScripts(data.scripts);
        }
        if (data.settings) {
            this.saveSettings(data.settings);
        }
    },

    /**
     * 清除所有数据
     */
    clearAll() {
        localStorage.removeItem(STORAGE_KEYS.SCRIPTS);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }
};

// 剧本管理服务
const ScriptService = {
    /**
     * 创建新剧本
     */
    createScript(name, description = '') {
        const scripts = StorageService.getScripts();
        const newScript = {
            id: Utils.generateId(),
            name,
            description,
            characters: [],
            shots: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        scripts.unshift(newScript);
        StorageService.saveScripts(scripts);
        return newScript;
    },

    /**
     * 获取剧本列表
     */
    getAllScripts() {
        return StorageService.getScripts();
    },

    /**
     * 获取单个剧本
     */
    getScript(id) {
        const scripts = StorageService.getScripts();
        return scripts.find(s => s.id === id) || null;
    },

    /**
     * 更新剧本
     */
    updateScript(id, updates) {
        const scripts = StorageService.getScripts();
        const index = scripts.findIndex(s => s.id === id);
        if (index !== -1) {
            scripts[index] = {
                ...scripts[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            StorageService.saveScripts(scripts);
            return scripts[index];
        }
        return null;
    },

    /**
     * 删除剧本
     */
    deleteScript(id) {
        const scripts = StorageService.getScripts();
        const filtered = scripts.filter(s => s.id !== id);
        StorageService.saveScripts(filtered);
        return true;
    },

    // ============ 角色管理 ============

    /**
     * 添加角色
     */
    addCharacter(scriptId, character) {
        const script = this.getScript(scriptId);
        if (!script) return null;

        const newCharacter = {
            id: Utils.generateId(),
            ...character,
            createdAt: new Date().toISOString()
        };

        script.characters.push(newCharacter);
        return this.updateScript(scriptId, { characters: script.characters }) ? newCharacter : null;
    },

    /**
     * 更新角色
     */
    updateCharacter(scriptId, characterId, updates) {
        const script = this.getScript(scriptId);
        if (!script) return null;

        const index = script.characters.findIndex(c => c.id === characterId);
        if (index === -1) return null;

        script.characters[index] = {
            ...script.characters[index],
            ...updates
        };

        return this.updateScript(scriptId, { characters: script.characters }) ? script.characters[index] : null;
    },

    /**
     * 删除角色
     */
    deleteCharacter(scriptId, characterId) {
        const script = this.getScript(scriptId);
        if (!script) return false;

        script.characters = script.characters.filter(c => c.id !== characterId);
        return this.updateScript(scriptId, { characters: script.characters });
    },

    // ============ 分镜管理 ============

    /**
     * 添加分镜
     */
    addShot(scriptId, shot) {
        const script = this.getScript(scriptId);
        if (!script) return null;

        const newShot = {
            id: Utils.generateId(),
            ...shot,
            createdAt: new Date().toISOString()
        };

        script.shots.push(newShot);
        return this.updateScript(scriptId, { shots: script.shots }) ? newShot : null;
    },

    /**
     * 更新分镜
     */
    updateShot(scriptId, shotId, updates) {
        const script = this.getScript(scriptId);
        if (!script) return null;

        const index = script.shots.findIndex(s => s.id === shotId);
        if (index === -1) return null;

        script.shots[index] = {
            ...script.shots[index],
            ...updates
        };

        return this.updateScript(scriptId, { shots: script.shots }) ? script.shots[index] : null;
    },

    /**
     * 删除分镜
     */
    deleteShot(scriptId, shotId) {
        const script = this.getScript(scriptId);
        if (!script) return false;

        script.shots = script.shots.filter(s => s.id !== shotId);
        return this.updateScript(scriptId, { shots: script.shots });
    },

    /**
     * 排序分镜
     */
    reorderShots(scriptId, shotIds) {
        const script = this.getScript(scriptId);
        if (!script) return false;

        const shotMap = new Map(script.shots.map(s => [s.id, s]));
        script.shots = shotIds.map(id => shotMap.get(id)).filter(Boolean);

        return this.updateScript(scriptId, { shots: script.shots });
    }
};

// 视图渲染服务
const ViewRenderer = {
    /**
     * 渲染剧本列表
     */
    renderScriptList() {
        const scripts = ScriptService.getAllScripts();
        const container = document.getElementById('script-list');
        
        if (scripts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>暂无剧本</h3>
                    <p>点击上方按钮创建第一个剧本</p>
                </div>
            `;
            return;
        }

        container.innerHTML = scripts.map(script => `
            <div class="script-card" data-id="${script.id}">
                <div class="script-card-header">
                    <h3 class="script-card-title">${this.escapeHtml(script.name)}</h3>
                    <span class="script-card-meta">
                        ${script.shots.length} 个分镜 · ${script.characters.length} 个角色
                    </span>
                </div>
                ${script.description ? `<p class="script-card-desc">${this.escapeHtml(script.description)}</p>` : ''}
                <div class="script-card-footer">
                    <span class="script-card-date">${Utils.formatDateTime(script.updatedAt)}</span>
                    <div class="script-card-actions">
                        <button class="btn-icon btn-edit" data-action="edit" title="编辑">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                        </button>
                        <button class="btn-icon btn-delete" data-action="delete" title="删除">
                            <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // 绑定点击事件
        container.querySelectorAll('.script-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]')?.dataset.action;
                const id = card.dataset.id;
                
                if (action === 'edit') {
                    App.navigateTo('script-detail', id);
                } else if (action === 'delete') {
                    App.confirmDeleteScript(id, card.querySelector('.script-card-title').textContent);
                } else {
                    App.navigateTo('script-detail', id);
                }
            });
        });
    },

    /**
     * 渲染剧本详情
     */
    renderScriptDetail(script) {
        if (!script) return;

        const container = document.getElementById('script-detail-content');
        
        container.innerHTML = `
            <div class="detail-header">
                <button class="btn-back" onclick="App.navigateTo('scripts')">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    返回
                </button>
                <h2 class="detail-title">${this.escapeHtml(script.name)}</h2>
                <button class="btn-icon btn-settings" onclick="App.showScriptSettings()">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                </button>
            </div>

            <div class="detail-tabs">
                <button class="tab-btn active" data-tab="characters">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                    角色库
                    <span class="tab-badge">${script.characters.length}</span>
                </button>
                <button class="tab-btn" data-tab="shots">
                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
                    分镜列表
                    <span class="tab-badge">${script.shots.length}</span>
                </button>
            </div>

            <div class="detail-content">
                <div id="tab-characters" class="tab-content active">
                    ${this.renderCharacterList(script)}
                </div>
                <div id="tab-shots" class="tab-content">
                    ${this.renderShotList(script)}
                </div>
            </div>
        `;

        // 绑定Tab切换事件
        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            });
        });
    },

    /**
     * 渲染角色列表
     */
    renderCharacterList(script) {
        if (script.characters.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">👤</div>
                    <h3>暂无角色</h3>
                    <p>添加角色以便在分镜中引用</p>
                    <button class="btn btn-primary" onclick="App.showCharacterModal()">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        添加角色
                    </button>
                </div>
            `;
        }

        return `
            <div class="character-grid">
                ${script.characters.map(char => `
                    <div class="character-card" data-id="${char.id}">
                        <div class="character-card-header">
                            <h4>${this.escapeHtml(char.name)}</h4>
                            <div class="character-card-actions">
                                <button class="btn-icon" data-action="edit" title="编辑">
                                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                </button>
                                <button class="btn-icon btn-delete" data-action="delete" title="删除">
                                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                </button>
                            </div>
                        </div>
                        ${char.appearance ? `<p class="character-info"><strong>外貌：</strong>${this.escapeHtml(char.appearance)}</p>` : ''}
                        ${char.clothing ? `<p class="character-info"><strong>服装：</strong>${this.escapeHtml(char.clothing)}</p>` : ''}
                        ${char.weapon ? `<p class="character-info"><strong>武器：</strong>${this.escapeHtml(char.weapon)}</p>` : ''}
                        <div class="character-ref">
                            <code>@[${char.name}]</code>
                            <button class="btn-icon copy-ref" data-ref="@[${char.name}]" title="复制引用">
                                <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary btn-add" onclick="App.showCharacterModal()">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                添加角色
            </button>
        `;
    },

    /**
     * 渲染分镜列表
     */
    renderShotList(script) {
        if (script.shots.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-icon">🎬</div>
                    <h3>暂无分镜</h3>
                    <p>创建分镜并生成提示词</p>
                    <button class="btn btn-primary" onclick="App.showShotModal()">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        创建分镜
                    </button>
                </div>
            `;
        }

        return `
            <div class="shot-list">
                ${script.shots.map((shot, index) => {
                    const recipe = RecipeLibrary.getRecipeById(shot.recipeId);
                    return `
                        <div class="shot-card" data-id="${shot.id}">
                            <div class="shot-card-header">
                                <span class="shot-number">分镜 ${index + 1}</span>
                                ${recipe ? `<span class="shot-recipe">${recipe.name}</span>` : ''}
                                <div class="shot-card-actions">
                                    <button class="btn-icon" data-action="generate" title="生成提示词">
                                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                                    </button>
                                    <button class="btn-icon" data-action="edit" title="编辑">
                                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                    </button>
                                    <button class="btn-icon btn-delete" data-action="delete" title="删除">
                                        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                    </button>
                                </div>
                            </div>
                            <div class="shot-card-body">
                                <div class="shot-info">
                                    <span><strong>时长：</strong>${shot.duration || 5}s</span>
                                </div>
                                ${shot.sceneDescription ? `<p class="shot-scene"><strong>场景：</strong>${this.escapeHtml(shot.sceneDescription)}</p>` : ''}
                                ${shot.actionDescription ? `<p class="shot-action"><strong>动作：</strong>${this.escapeHtml(shot.actionDescription)}</p>` : ''}
                            </div>
                            ${shot.generatedPrompt ? `
                                <div class="shot-prompt">
                                    <div class="prompt-header">
                                        <span>生成的提示词</span>
                                        <button class="btn-icon copy-prompt" data-prompt="${this.escapeAttr(shot.generatedPrompt)}" title="复制">
                                            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                                        </button>
                                    </div>
                                    <pre class="prompt-content">${this.escapeHtml(shot.generatedPrompt)}</pre>
                                </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="btn btn-primary btn-add" onclick="App.showShotModal()">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                创建分镜
            </button>
        `;
    },

    /**
     * 渲染设置页面
     */
    renderSettings() {
        const settings = StorageService.getSettings();
        const container = document.getElementById('settings-content');

        container.innerHTML = `
            <div class="settings-section">
                <h3 class="settings-title">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                    API 配置
                </h3>
                <div class="form-group">
                    <label for="api-endpoint">API 端点</label>
                    <input type="text" id="api-endpoint" class="form-input" value="${settings.apiEndpoint}" placeholder="https://open.xiaojingai.com/v1">
                    <p class="form-hint">小鲸API端点：https://open.xiaojingai.com/v1</p>
                </div>
                <div class="form-group">
                    <label for="api-key">API Key</label>
                    <input type="password" id="api-key" class="form-input" value="${settings.apiKey}" placeholder="请输入您的API Key">
                    <p class="form-hint">您的API密钥将安全存储在本地</p>
                </div>
            </div>

            <div class="settings-section">
                <h3 class="settings-title">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    数据管理
                </h3>
                <div class="settings-actions">
                    <button class="btn btn-secondary" onclick="App.exportData()">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                        导出数据
                    </button>
                    <button class="btn btn-secondary" onclick="App.importData()">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>
                        导入数据
                    </button>
                    <button class="btn btn-danger" onclick="App.confirmClearData()">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        清除所有数据
                    </button>
                </div>
            </div>

            <div class="settings-section">
                <h3 class="settings-title">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    关于
                </h3>
                <div class="about-info">
                    <p><strong>Seedance 分镜提示词生成器</strong></p>
                    <p>版本：1.0.0</p>
                    <p>帮助您快速生成 Seedance 视频生成提示词</p>
                </div>
            </div>

            <button class="btn btn-primary" onclick="App.saveSettings()">
                保存设置
            </button>
        `;

        // 隐藏文件输入
        this._importInput = document.createElement('input');
        this._importInput.type = 'file';
        this._importInput.accept = '.json';
        this._importInput.style.display = 'none';
        this._importInput.addEventListener('change', (e) => App.handleImport(e));
        document.body.appendChild(this._importInput);
    },

    /**
     * HTML转义
     */
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * 属性转义
     */
    escapeAttr(text) {
        if (!text) return '';
        return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
};

// 主应用控制器
const App = {
    /**
     * 初始化应用
     */
    init() {
        // 加载设置
        const settings = StorageService.getSettings();
        AppState.settings = settings;

        // 绑定导航事件
        this.bindNavigation();

        // 绑定全局事件
        this.bindGlobalEvents();

        // 渲染初始视图
        this.navigateTo('scripts');
    },

    /**
     * 绑定导航事件
     */
    bindNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                this.navigateTo(view);
            });
        });
    },

    /**
     * 绑定全局事件
     */
    bindGlobalEvents() {
        // 创建剧本按钮
        document.getElementById('btn-create-script')?.addEventListener('click', () => {
            this.showCreateScriptModal();
        });

        // 设置保存
        document.getElementById('settings-content')?.addEventListener('click', (e) => {
            // 处理复制引用按钮
            if (e.target.closest('.copy-ref')) {
                const btn = e.target.closest('.copy-ref');
                const ref = btn.dataset.ref;
                this.copyToClipboard(ref, '引用已复制');
            }
            // 处理复制提示词按钮
            if (e.target.closest('.copy-prompt')) {
                const btn = e.target.closest('.copy-prompt');
                const prompt = btn.dataset.prompt;
                this.copyToClipboard(prompt, '提示词已复制');
            }
            // 处理角色卡片操作
            if (e.target.closest('.character-card-actions [data-action]')) {
                const btn = e.target.closest('[data-action]');
                const action = btn.dataset.action;
                const card = btn.closest('.character-card');
                const charId = card.dataset.id;
                if (action === 'edit') this.showCharacterModal(charId);
                if (action === 'delete') this.confirmDeleteCharacter(charId);
            }
            // 处理分镜卡片操作
            if (e.target.closest('.shot-card-actions [data-action]')) {
                const btn = e.target.closest('[data-action]');
                const action = btn.dataset.action;
                const card = btn.closest('.shot-card');
                const shotId = card.dataset.id;
                if (action === 'generate') this.generateShotPrompt(shotId);
                if (action === 'edit') this.showShotModal(shotId);
                if (action === 'delete') this.confirmDeleteShot(shotId);
            }
        });
    },

    /**
     * 导航到指定视图
     */
    navigateTo(view, id = null) {
        AppState.currentView = view;
        AppState.currentScriptId = id;

        // 更新导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });

        // 隐藏所有视图
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // 显示对应视图
        switch (view) {
            case 'scripts':
                document.getElementById('view-scripts').classList.add('active');
                ViewRenderer.renderScriptList();
                break;
            case 'script-detail':
                AppState.currentScript = ScriptService.getScript(id);
                document.getElementById('view-script-detail').classList.add('active');
                ViewRenderer.renderScriptDetail(AppState.currentScript);
                break;
            case 'settings':
                document.getElementById('view-settings').classList.add('active');
                ViewRenderer.renderSettings();
                break;
        }
    },

    /**
     * 显示创建剧本模态框
     */
    showCreateScriptModal() {
        const modal = document.getElementById('modal-create-script');
        modal.querySelector('.modal-input[name="name"]').value = '';
        modal.querySelector('.modal-input[name="description"]').value = '';
        modal.classList.add('show');
    },

    /**
     * 创建剧本
     */
    createScript() {
        const modal = document.getElementById('modal-create-script');
        const name = modal.querySelector('.modal-input[name="name"]').value.trim();
        const description = modal.querySelector('.modal-input[name="description"]').value.trim();

        if (!name) {
            Utils.showNotification('请输入剧本名称', 'error');
            return;
        }

        const script = ScriptService.createScript(name, description);
        modal.classList.remove('show');
        Utils.showNotification('剧本创建成功', 'success');
        this.navigateTo('script-detail', script.id);
    },

    /**
     * 确认删除剧本
     */
    confirmDeleteScript(id, name) {
        if (confirm(`确定要删除剧本"${name}"吗？此操作不可恢复。`)) {
            ScriptService.deleteScript(id);
            Utils.showNotification('剧本已删除', 'success');
            ViewRenderer.renderScriptList();
        }
    },

    /**
     * 显示剧本设置
     */
    showScriptSettings() {
        const script = AppState.currentScript;
        if (!script) return;

        const modal = document.getElementById('modal-script-settings');
        modal.querySelector('.modal-input[name="name"]').value = script.name;
        modal.querySelector('.modal-input[name="description"]').value = script.description || '';
        modal.classList.add('show');
    },

    /**
     * 更新剧本设置
     */
    updateScriptSettings() {
        const modal = document.getElementById('modal-script-settings');
        const name = modal.querySelector('.modal-input[name="name"]').value.trim();
        const description = modal.querySelector('.modal-input[name="description"]').value.trim();

        if (!name) {
            Utils.showNotification('请输入剧本名称', 'error');
            return;
        }

        ScriptService.updateScript(AppState.currentScriptId, { name, description });
        AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
        modal.classList.remove('show');
        Utils.showNotification('剧本已更新', 'success');
        ViewRenderer.renderScriptDetail(AppState.currentScript);
    },

    // ============ 角色管理 ============

    /**
     * 显示角色模态框
     */
    showCharacterModal(characterId = null) {
        const modal = document.getElementById('modal-character');
        const title = modal.querySelector('.modal-title');
        
        if (characterId) {
            const character = AppState.currentScript.characters.find(c => c.id === characterId);
            if (character) {
                title.textContent = '编辑角色';
                modal.querySelector('.modal-input[name="name"]').value = character.name;
                modal.querySelector('.modal-input[name="appearance"]').value = character.appearance || '';
                modal.querySelector('.modal-input[name="clothing"]').value = character.clothing || '';
                modal.querySelector('.modal-input[name="weapon"]').value = character.weapon || '';
                modal.dataset.editId = characterId;
            }
        } else {
            title.textContent = '添加角色';
            modal.querySelector('.modal-input[name="name"]').value = '';
            modal.querySelector('.modal-input[name="appearance"]').value = '';
            modal.querySelector('.modal-input[name="clothing"]').value = '';
            modal.querySelector('.modal-input[name="weapon"]').value = '';
            delete modal.dataset.editId;
        }
        
        modal.classList.add('show');
    },

    /**
     * 保存角色
     */
    saveCharacter() {
        const modal = document.getElementById('modal-character');
        const name = modal.querySelector('.modal-input[name="name"]').value.trim();
        const appearance = modal.querySelector('.modal-input[name="appearance"]').value.trim();
        const clothing = modal.querySelector('.modal-input[name="clothing"]').value.trim();
        const weapon = modal.querySelector('.modal-input[name="weapon"]').value.trim();

        if (!name) {
            Utils.showNotification('请输入角色名称', 'error');
            return;
        }

        const characterData = { name, appearance, clothing, weapon };
        const editId = modal.dataset.editId;

        if (editId) {
            ScriptService.updateCharacter(AppState.currentScriptId, editId, characterData);
            Utils.showNotification('角色已更新', 'success');
        } else {
            ScriptService.addCharacter(AppState.currentScriptId, characterData);
            Utils.showNotification('角色已添加', 'success');
        }

        AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
        modal.classList.remove('show');
        ViewRenderer.renderScriptDetail(AppState.currentScript);
    },

    /**
     * 确认删除角色
     */
    confirmDeleteCharacter(characterId) {
        const character = AppState.currentScript.characters.find(c => c.id === characterId);
        if (!character) return;

        if (confirm(`确定要删除角色"${character.name}"吗？`)) {
            ScriptService.deleteCharacter(AppState.currentScriptId, characterId);
            AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
            Utils.showNotification('角色已删除', 'success');
            ViewRenderer.renderScriptDetail(AppState.currentScript);
        }
    },

    // ============ 分镜管理 ============

    /**
     * 显示分镜模态框
     */
    showShotModal(shotId = null) {
        const modal = document.getElementById('modal-shot');
        const title = modal.querySelector('.modal-title');
        const recipes = RecipeLibrary.getAllRecipes();

        // 生成配方选项
        const recipeOptions = recipes.map(r => 
            `<option value="${r.id}">${r.name} - ${r.description.substring(0, 30)}...</option>`
        ).join('');

        if (shotId) {
            const shot = AppState.currentScript.shots.find(s => s.id === shotId);
            if (shot) {
                title.textContent = '编辑分镜';
                modal.querySelector('.modal-input[name="duration"]').value = shot.duration || 5;
                modal.querySelector('.modal-input[name="sceneDescription"]').value = shot.sceneDescription || '';
                modal.querySelector('.modal-input[name="actionDescription"]').value = shot.actionDescription || '';
                modal.querySelector('.modal-input[name="cameraInstruction"]').value = shot.cameraInstruction || '';
                modal.querySelector('.modal-select[name="recipeId"]').value = shot.recipeId || '';
                modal.dataset.editId = shotId;
            }
        } else {
            title.textContent = '创建分镜';
            modal.querySelector('.modal-input[name="duration"]').value = 5;
            modal.querySelector('.modal-input[name="sceneDescription"]').value = '';
            modal.querySelector('.modal-input[name="actionDescription"]').value = '';
            modal.querySelector('.modal-input[name="cameraInstruction"]').value = '';
            modal.querySelector('.modal-select[name="recipeId"]').value = '';
            delete modal.dataset.editId;
        }

        // 注入配方选项
        const recipeSelect = modal.querySelector('.modal-select[name="recipeId"]');
        if (recipeSelect && !recipeSelect.querySelector('option[value=""]')) {
            recipeSelect.innerHTML = `<option value="">不使用配方（简单模式）</option>${recipeOptions}`;
        }

        modal.classList.add('show');
    },

    /**
     * 保存分镜
     */
    saveShot() {
        const modal = document.getElementById('modal-shot');
        const duration = parseInt(modal.querySelector('.modal-input[name="duration"]').value) || 5;
        const sceneDescription = modal.querySelector('.modal-input[name="sceneDescription"]').value.trim();
        const actionDescription = modal.querySelector('.modal-input[name="actionDescription"]').value.trim();
        const cameraInstruction = modal.querySelector('.modal-input[name="cameraInstruction"]').value.trim();
        const recipeId = modal.querySelector('.modal-select[name="recipeId"]').value;

        const shotData = { duration, sceneDescription, actionDescription, cameraInstruction, recipeId };
        const editId = modal.dataset.editId;

        if (editId) {
            ScriptService.updateShot(AppState.currentScriptId, editId, shotData);
            Utils.showNotification('分镜已更新', 'success');
        } else {
            ScriptService.addShot(AppState.currentScriptId, shotData);
            Utils.showNotification('分镜已创建', 'success');
        }

        AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
        modal.classList.remove('show');
        ViewRenderer.renderScriptDetail(AppState.currentScript);
    },

    /**
     * 生成单个分镜的提示词
     */
    generateShotPrompt(shotId) {
        const shot = AppState.currentScript.shots.find(s => s.id === shotId);
        if (!shot) return;

        const recipe = RecipeLibrary.getRecipeById(shot.recipeId);
        const characters = AppState.currentScript.characters;

        const shotIndex = AppState.currentScript.shots.findIndex(s => s.id === shotId) + 1;

        const prompt = PromptGenerator.generatePrompt({
            ...shot,
            shotNumber: shotIndex,
            recipe,
            characters
        });

        ScriptService.updateShot(AppState.currentScriptId, shotId, { generatedPrompt: prompt });
        AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
        
        Utils.showNotification('提示词已生成', 'success');
        ViewRenderer.renderScriptDetail(AppState.currentScript);

        // 滚动到生成的提示词位置
        setTimeout(() => {
            const promptEl = document.querySelector(`[data-id="${shotId}"] .shot-prompt`);
            promptEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    },

    /**
     * 确认删除分镜
     */
    confirmDeleteShot(shotId) {
        if (confirm('确定要删除这个分镜吗？')) {
            ScriptService.deleteShot(AppState.currentScriptId, shotId);
            AppState.currentScript = ScriptService.getScript(AppState.currentScriptId);
            Utils.showNotification('分镜已删除', 'success');
            ViewRenderer.renderScriptDetail(AppState.currentScript);
        }
    },

    // ============ 设置相关 ============

    /**
     * 保存设置
     */
    saveSettings() {
        const apiEndpoint = document.getElementById('api-endpoint')?.value.trim();
        const apiKey = document.getElementById('api-key')?.value.trim();

        if (!apiEndpoint) {
            Utils.showNotification('请输入API端点', 'error');
            return;
        }

        StorageService.saveSettings({ apiEndpoint, apiKey });
        AppState.settings = { apiEndpoint, apiKey };
        Utils.showNotification('设置已保存', 'success');
    },

    /**
     * 导出数据
     */
    exportData() {
        const data = StorageService.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seedance-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        Utils.showNotification('数据已导出', 'success');
    },

    /**
     * 触发导入
     */
    importData() {
        ViewRenderer._importInput?.click();
    },

    /**
     * 处理导入
     */
    handleImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (confirm('导入将覆盖现有数据，确定继续吗？')) {
                    StorageService.importData(data);
                    Utils.showNotification('数据已导入', 'success');
                    this.navigateTo('scripts');
                }
            } catch (err) {
                Utils.showNotification('导入失败：文件格式错误', 'error');
            }
        };
        reader.readAsText(file);
    },

    /**
     * 确认清除数据
     */
    confirmClearData() {
        if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
            StorageService.clearAll();
            Utils.showNotification('所有数据已清除', 'success');
            this.navigateTo('scripts');
        }
    },

    // ============ 工具函数 ============

    /**
     * 复制到剪贴板
     */
    copyToClipboard(text, successMessage = '已复制') {
        navigator.clipboard.writeText(text).then(() => {
            Utils.showNotification(successMessage, 'success');
        }).catch(() => {
            Utils.showNotification('复制失败', 'error');
        });
    }
};

// 模态框控制
document.addEventListener('DOMContentLoaded', () => {
    // 关闭模态框
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal')?.classList.remove('show');
        });
    });

    // 点击模态框背景关闭
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });

    // 表单提交处理
    document.getElementById('form-create-script')?.addEventListener('submit', (e) => {
        e.preventDefault();
        App.createScript();
    });

    document.getElementById('form-script-settings')?.addEventListener('submit', (e) => {
        e.preventDefault();
        App.updateScriptSettings();
    });

    document.getElementById('form-character')?.addEventListener('submit', (e) => {
        e.preventDefault();
        App.saveCharacter();
    });

    document.getElementById('form-shot')?.addEventListener('submit', (e) => {
        e.preventDefault();
        App.saveShot();
    });

    // 初始化应用
    App.init();
});
