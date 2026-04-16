/**
 * Seedance 分镜提示词生成器 - 提示词生成逻辑
 * 处理角色引用、提示词组装等功能
 */

// 提示词生成器
const PromptGenerator = {
    /**
     * 解析角色引用，将 @[角色名] 替换为角色描述
     * @param {string} text - 包含角色引用的文本
     * @param {Array} characters - 角色列表
     * @returns {string} 替换后的文本
     */
    resolveCharacterRefs(text, characters) {
        if (!text || !characters) return text;
        
        // 匹配 @[角色名] 格式
        return text.replace(/@\[([^\]]+)\]/g, (match, charName) => {
            const character = characters.find(c => c.name === charName);
            if (character) {
                // 构建角色描述
                let desc = character.name;
                if (character.appearance) desc += `：${character.appearance}`;
                if (character.clothing) desc += `，${character.clothing}`;
                if (character.weapon) desc += `，手持${character.weapon}`;
                return desc;
            }
            return match; // 如果找不到角色，保持原样
        });
    },

    /**
     * 获取角色的简要引用文本
     * @param {Object} character - 角色对象
     * @returns {string} 角色引用文本
     */
    getCharacterRef(character) {
        let ref = character.name;
        if (character.appearance) ref += `：${character.appearance}`;
        if (character.clothing) ref += `，${character.clothing}`;
        if (character.weapon) ref += `，手持${character.weapon}`;
        return ref;
    },

    /**
     * 生成完整的分镜提示词
     * @param {Object} options - 生成选项
     * @returns {string} 生成的提示词
     */
    generatePrompt(options) {
        const {
            shotNumber,
            duration,
            sceneDescription,
            actionDescription,
            cameraInstruction,
            recipe,
            characters
        } = options;

        // 如果没有配方，使用默认模板
        if (!recipe) {
            return this.generateSimplePrompt(options);
        }

        // 替换角色引用
        const resolvedScene = this.resolveCharacterRefs(sceneDescription, characters);
        const resolvedAction = this.resolveCharacterRefs(actionDescription, characters);
        const resolvedCamera = this.resolveCharacterRefs(cameraInstruction, characters);

        // 获取配方模板
        let prompt = recipe.template || this.getDefaultTemplate();

        // 构建呼吸感信息
        let breathingInfo = '';
        if (recipe.fixedParams?.breathingIntensity && recipe.fixedParams.breathingIntensity !== '无') {
            breathingInfo = `，呼吸感${recipe.fixedParams.breathingIntensity}`;
        }

        // 构建动态模糊信息
        let dynamicBlurInfo = '';
        if (recipe.fixedParams?.dynamicBlur) {
            dynamicBlurInfo = `，动态模糊${recipe.fixedParams.dynamicBlur}`;
        }

        // 替换模板变量
        prompt = prompt
            .replace(/\{shotNumber\}/g, shotNumber || '1')
            .replace(/\{duration\}/g, duration || '5')
            .replace(/\{focalLength\}/g, recipe.fixedParams?.focalLength || '50mm')
            .replace(/\{aperture\}/g, recipe.fixedParams?.aperture || 'f/2.8')
            .replace(/\{cameraMovement\}/g, recipe.fixedParams?.cameraMovement || '固定')
            .replace(/\{movementSpeed\}/g, recipe.fixedParams?.movementSpeed || '5')
            .replace(/\{breathingInfo\}/g, breathingInfo)
            .replace(/\{dynamicBlurInfo\}/g, dynamicBlurInfo)
            .replace(/\{sceneDescription\}/g, resolvedScene || '')
            .replace(/\{actionDescription\}/g, resolvedAction || '')
            .replace(/\{cameraInstruction\}/g, resolvedCamera ? `，${resolvedCamera}` : '')
            .replace(/\{negativePrompt\}/g, recipe.negativePrompt || '');

        // 替换动作相关变量（如果是动作戏配方）
        if (recipe.actionKeywords) {
            prompt = prompt
                .replace(/\{actionChain\}/g, recipe.actionKeywords.chain || '')
                .replace(/\{physicsDetails\}/g, recipe.actionKeywords.physics || '')
                .replace(/\{effects\}/g, recipe.actionKeywords.effects || '')
                .replace(/\{degreeWords\}/g, recipe.actionKeywords.degree || '');
        }

        return prompt;
    },

    /**
     * 生成简单的提示词（不使用配方时）
     * @param {Object} options - 生成选项
     * @returns {string} 生成的提示词
     */
    generateSimplePrompt(options) {
        const {
            shotNumber,
            duration,
            sceneDescription,
            actionDescription,
            cameraInstruction,
            characters
        } = options;

        // 替换角色引用
        const resolvedScene = this.resolveCharacterRefs(sceneDescription, characters);
        const resolvedAction = this.resolveCharacterRefs(actionDescription, characters);
        const resolvedCamera = this.resolveCharacterRefs(cameraInstruction, characters);

        let prompt = `【分镜${shotNumber || 1}】【时长】${duration || 5}s`;
        
        if (resolvedScene) {
            prompt += `【场景】${resolvedScene}`;
        }
        
        if (resolvedAction) {
            prompt += `【动作】${resolvedAction}`;
        }
        
        if (resolvedCamera) {
            prompt += `【运镜】${resolvedCamera}`;
        }

        return prompt;
    },

    /**
     * 获取默认模板
     * @returns {string} 默认模板
     */
    getDefaultTemplate() {
        return '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}';
    },

    /**
     * 生成批量提示词（多个分镜）
     * @param {Array} shots - 分镜列表
     * @param {Array} characters - 角色列表
     * @returns {string} 批量提示词
     */
    generateBatchPrompts(shots, characters) {
        return shots.map((shot, index) => {
            const recipe = RecipeLibrary.getRecipeById(shot.recipeId);
            return this.generatePrompt({
                ...shot,
                shotNumber: index + 1,
                recipe,
                characters
            });
        }).join('\n\n');
    },

    /**
     * 格式化配方参数为可读文本
     * @param {Object} recipe - 配方对象
     * @returns {string} 格式化的参数文本
     */
    formatRecipeParams(recipe) {
        if (!recipe || !recipe.fixedParams) return '';

        const params = recipe.fixedParams;
        const lines = [];

        lines.push(`📷 镜头参数`);
        if (params.focalLength) lines.push(`  焦距：${params.focalLength}`);
        if (params.aperture) lines.push(`  光圈：${params.aperture}`);
        if (params.cameraMovement) lines.push(`  运镜：${params.cameraMovement}`);
        if (params.movementSpeed) lines.push(`  速度：${params.movementSpeed}`);

        lines.push(`💡 光控参数`);
        if (params.mainLightType) lines.push(`  光源：${params.mainLightType}`);
        if (params.lightRatio) lines.push(`  光比：${params.lightRatio}`);
        if (params.colorTemp) lines.push(`  色温：${params.colorTemp}`);

        lines.push(`🎨 色彩参数`);
        if (params.saturation) lines.push(`  饱和度：${params.saturation}`);
        if (params.colorTone) lines.push(`  色调：${params.colorTone}`);
        if (params.highlight) lines.push(`  高光：${params.highlight}`);

        if (params.style) {
            lines.push(`✨ 风格：${params.style}`);
        }

        return lines.join('\n');
    }
};

// 导出提示词生成器
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PromptGenerator;
}
