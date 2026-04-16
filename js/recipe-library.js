/**
 * Seedance 分镜提示词生成器 - 配方库
 * 包含所有预设的视频生成配方参数
 */

// 配方库数据结构
const RecipeLibrary = {
    /**
     * 获取所有配方列表
     * @returns {Array} 配方数组
     */
    getAllRecipes() {
        return [
            // ============ 史诗场景配方 ============
            {
                id: 'EPIC_ARMY_MARCH_001',
                name: '史诗大远景',
                category: 'epic',
                description: '军队行进、史诗场面 - 24mm广角，升降缓慢，侧逆光体积光',
                applicableScene: '大远景',
                applicableEmotion: '宏大、史诗、庄严',
                applicableTime: '正午',
                fixedParams: {
                    style: '数字绘画写实风格，高饱和度色彩，深蓝天空与亮白云朵对比鲜明，画面宏伟且富有史诗感',
                    focalLength: '24mm广角',
                    aperture: '深景深（环境清晰）',
                    cameraMovement: '升降·缓慢',
                    movementSpeed: '1-2',
                    breathingIntensity: '无',
                    dynamicBlur: '10-15%',
                    mainLightType: '侧逆光',
                    lightEffect: '正午暖阳直射，空气中浮尘呈现闪烁的体积光效果',
                    lightRatio: '标准',
                    colorTemp: '暖色调',
                    saturation: '高饱和度',
                    highlight: '明亮可控',
                    midtone: '自然',
                    shadow: '有细节'
                },
                negativePrompt: '模糊，低清，卡顿，掉帧，人物变形，马匹动作僵硬，尘土颗粒感廉价，光影逻辑矛盾',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },
            {
                id: 'HERO_RIDING_MEDIUM_001',
                name: '英雄骑马中近景',
                category: 'hero',
                description: '英雄登场、骑马行进 - 50mm f/2.8，跟随运镜',
                applicableScene: '中近景',
                applicableEmotion: '自信、骄傲、威严',
                applicableTime: '正午',
                fixedParams: {
                    style: '英雄奇幻风格，高对比度，光滑金属质感，反射出耀眼的高光',
                    focalLength: '50mm标准',
                    aperture: 'f/2.8柔和虚化',
                    cameraMovement: '跟随·中速',
                    movementSpeed: '5',
                    breathingIntensity: '低',
                    dynamicBlur: '15-20%',
                    mainLightType: '硬质侧逆光',
                    lightEffect: '在边缘勾勒出锐利亮边，铠甲质感沉稳且带有哑光金属光泽',
                    lightRatio: '1:3',
                    colorTemp: '暖色调',
                    saturation: '标准饱和度',
                    highlight: '金属高光锐利',
                    midtone: '沉稳',
                    shadow: '有细节'
                },
                negativePrompt: '模糊，低清，手部错误，铠甲穿模，马匹动作僵硬，金属质感像塑料',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },
            {
                id: 'DIALOGUE_SPEAKING_MEDIUM_001',
                name: '对话中景',
                category: 'dialogue',
                description: '对话、说话场景 - 高对比度，铠甲质感',
                applicableScene: '中近景',
                applicableEmotion: '沉稳、真诚',
                applicableTime: '正午',
                fixedParams: {
                    style: '高对比度，玄铁质感沉稳且带有哑光金属光泽',
                    focalLength: '50mm标准',
                    aperture: 'f/2.8柔和虚化',
                    cameraMovement: '跟随·中速',
                    movementSpeed: '5',
                    breathingIntensity: '低',
                    dynamicBlur: '15-20%',
                    mainLightType: '强烈阳光',
                    lightEffect: '在边缘产生锐利高光',
                    lightRatio: '高对比度',
                    colorTemp: '自然色调',
                    saturation: '标准饱和度',
                    highlight: '边缘高光锐利',
                    midtone: '沉稳',
                    shadow: '厚重'
                },
                negativePrompt: '模糊，低清，口型不同步，面部变形，背景路人脸部扭曲',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },
            {
                id: 'EMOTION_FACE_CLOSEUP_001',
                name: '情绪特写',
                category: 'emotion',
                description: '面部情绪特写 - 85mm f/1.4，伦勃朗光',
                applicableScene: '近景/特写',
                applicableEmotion: '自信、骄傲、英雄气概',
                applicableTime: '正午',
                fixedParams: {
                    style: '英雄奇幻风格下的理想化人物气质',
                    focalLength: '85mm人像',
                    aperture: 'f/1.4极浅景深',
                    cameraMovement: '微推·缓慢',
                    movementSpeed: '2-3',
                    breathingIntensity: '无',
                    dynamicBlur: '5-10%',
                    mainLightType: '伦勃朗光效',
                    lightEffect: '鼻梁与颧骨立体感极强，皮肤纹理真实细腻',
                    lightRatio: '戏剧性',
                    colorTemp: '冷暖对比',
                    saturation: '自然饱和度',
                    highlight: '边缘反射冷冽光芒',
                    midtone: '立体',
                    shadow: '柔和过渡'
                },
                negativePrompt: '模糊，低清，人物变形，皮肤质感假，光影逻辑矛盾',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },

            // ============ 仙侠情感配方 ============
            {
                id: 'XIANXIA_EMOTION_CLOSEUP_001',
                name: '仙侠情感唯美',
                category: 'xianxia',
                description: '仙侠情感、唯美展示 - 柔光，梦幻光效',
                applicableScene: '特写、近景',
                applicableEmotion: '惊艳、唯美、浪漫',
                applicableTime: '清晨/黄昏',
                fixedParams: {
                    style: '电影级写实与动画风格融合、高饱和度、仙侠玄幻、唯美、细节丰富',
                    texture: '高对比度、强视觉冲击、梦幻光效、精致妆容、流畅动画',
                    focalLength: '50-85mm',
                    aperture: 'f/1.4-2.0',
                    cameraMovement: '固定、缓慢推、缓慢下移',
                    movementSpeed: '1-3',
                    breathingIntensity: '无/低',
                    dynamicBlur: '0-20%',
                    mainLightType: '柔光',
                    lightRatio: '1:2',
                    colorTemp: '3200-5000K 暖调',
                    saturation: '+10%~+20%',
                    colorTone: '暖色调',
                    highlight: '85-95 IRE',
                    midtone: '45-65 IRE',
                    shadow: '15-35 IRE'
                },
                negativePrompt: '模糊，低清，人物变形，面部崩坏，五官错位，皮肤质感假，光影逻辑矛盾',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },
            {
                id: 'XIANXIA_AWAKENING_TENSE_001',
                name: '觉醒紧张',
                category: 'xianxia',
                description: '觉醒、变身、突破 - 硬光，快运镜',
                applicableScene: '中景、近景、特写',
                applicableEmotion: '紧张、冲击、震撼',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实与动画风格融合、动漫风格、高饱和度、动作流畅、动态十足',
                    texture: '冲击力、强对比度、夸张光影、动感十足、快节奏剪辑',
                    focalLength: '50-85mm',
                    aperture: 'f/1.8-2.0',
                    cameraMovement: '快速推镜头、快速甩拍、手持',
                    movementSpeed: '6-8',
                    breathingIntensity: '中、高',
                    dynamicBlur: '40-60%',
                    mainLightType: '强烈的侧面硬光',
                    lightRatio: '1:6',
                    colorTemp: '5500K',
                    specialEffect: '体积光，戏剧性光影',
                    saturation: '+25%~+30%',
                    colorTone: '暖色调',
                    highlight: '85-100 IRE',
                    midtone: '45-70 IRE',
                    shadow: '0-10 IRE'
                },
                negativePrompt: '画面扭曲，人物变形，肢体畸形，面部崩坏，五官错位，画面剧烈抖动，聚焦错误，画质模糊，低分辨率',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },
            {
                id: 'XIANXIA_ROMANCE_CLOSEUP_001',
                name: '暧昧浪漫',
                category: 'xianxia',
                description: '仙侠情感、暧昧互动 - 柔暖光，极浅景深',
                applicableScene: '特写、近景',
                applicableEmotion: '浪漫、暧昧、温馨',
                applicableTime: '黄昏/室内暖光',
                fixedParams: {
                    style: '电影级写实、动漫风格、暖色调、浪漫氛围、精致细节',
                    texture: '暧昧、特写、慢镜头、精致细节、情绪拉满',
                    focalLength: '85-100mm',
                    aperture: 'f/1.4-2.0',
                    cameraMovement: '缓慢推镜头、缓慢横移',
                    movementSpeed: '3-5',
                    breathingIntensity: '低、中',
                    dynamicBlur: '10-25%',
                    mainLightType: '柔和的侧面暖光',
                    lightRatio: '1:2',
                    colorTemp: '5000K',
                    specialEffect: '柔光效果、朦胧光晕',
                    saturation: '+15%',
                    colorTone: '暖色调',
                    highlight: '85-95 IRE',
                    midtone: '45-65 IRE',
                    shadow: '20-35 IRE'
                },
                negativePrompt: '模糊，低清，人物变形，面部崩坏，五官错位，聚焦错误，皮肤质感假',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}'
            },

            // ============ 仙侠动作戏配方 ============
            {
                id: 'XIANXIA_CLOSE_COMBAT_001',
                name: '近身格斗',
                category: 'xianxia-action',
                description: '近身格斗、拳脚对决 - 手持快速跟拍',
                applicableScene: '中景、近景',
                applicableEmotion: '激烈、紧张',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、动漫风格、高动态、高对比度',
                    texture: '动作流畅、打击感强、快节奏剪辑',
                    focalLength: '35-50mm',
                    aperture: 'f/2.8',
                    cameraMovement: '手持快速跟拍',
                    movementSpeed: '7-8',
                    breathingIntensity: '高',
                    dynamicBlur: '40-60%',
                    mainLightType: '硬光侧逆光',
                    lightRatio: '1:5',
                    saturation: '+20%',
                    colorTone: '暖色调（火焰）或冷色调（冰霜）',
                    highlight: '锐利',
                    midtone: '饱满',
                    shadow: '深'
                },
                actionKeywords: {
                    chain: '侧身闪避 → 近身擒拿 → 肘击冲撞 → 快速后退拉开距离',
                    physics: '汗水飞溅、肌肉紧绷、衣角猎猎作响、金属碰撞铿锵',
                    degree: 'violently, rapidly, powerfully'
                },
                negativePrompt: '模糊，低清，动作僵硬，打斗场面混乱，穿模，动作不连贯',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            },
            {
                id: 'XIANXIA_SWORD_DUEL_001',
                name: '剑法对决',
                category: 'xianxia-action',
                description: '剑客对决、兵器交锋 - 环绕拍摄 + 快速跟拍',
                applicableScene: '全景、中景',
                applicableEmotion: '凌厉、紧张',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、武侠风格、高动态、剑光闪烁',
                    texture: '动作流畅、剑光效果、金属质感、快节奏剪辑',
                    focalLength: '35-50mm',
                    aperture: 'f/2.8-4.0',
                    cameraMovement: '环绕拍摄 + 快速跟拍',
                    movementSpeed: '6-7',
                    breathingIntensity: '中',
                    dynamicBlur: '30-50%',
                    mainLightType: '硬光侧光',
                    lightRatio: '1:4',
                    saturation: '+15%',
                    colorTone: '中性偏冷',
                    highlight: '剑光锐利',
                    midtone: '自然',
                    shadow: '有层次'
                },
                actionKeywords: {
                    chain: '剑尖相对 → 滑步切入 → 剑刃格挡溅起火星 → 翻身斩击',
                    physics: '剑身震颤、剑气破空尖啸、金属碰撞',
                    effects: '剑气纵横、剑芒闪烁、火星四溅',
                    degree: 'sharply, rapidly, gracefully'
                },
                negativePrompt: '模糊，低清，动作僵硬，穿模，剑气不自然',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【光圈】{aperture}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【特效】{effects}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            },
            {
                id: 'XIANXIA_SPELL_CASTING_001',
                name: '法术释放',
                category: 'xianxia-action',
                description: '法术对决、灵力释放 - 升降 + 缓慢推近',
                applicableScene: '全景、中景',
                applicableEmotion: '震撼、史诗',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、仙侠玄幻、高饱和度、粒子特效',
                    texture: '能量光效、法阵效果、粒子爆炸、震撼全场',
                    focalLength: '24-35mm广角',
                    aperture: 'f/4.0-5.6',
                    cameraMovement: '升降 + 缓慢推近',
                    movementSpeed: '3-5',
                    breathingIntensity: '低',
                    dynamicBlur: '20-30%',
                    mainLightType: '混合光（环境光+特效光）',
                    lightRatio: '1:3',
                    saturation: '+30%',
                    colorTone: '根据元素类型（火-暖、冰-冷、雷-紫）',
                    highlight: '能量光芒耀眼',
                    midtone: '饱满',
                    shadow: '有层次'
                },
                actionKeywords: {
                    chain: '双手结印 → 周身灵气汇聚 → 法阵显现 → 猛然释放能量波',
                    physics: '气流翻涌、空气扭曲、光芒四射',
                    effects: '灵气光效、法阵发光、能量冲击波、粒子特效',
                    degree: 'explosively, majestically, dramatically'
                },
                negativePrompt: '模糊，低清，特效廉价，能量波不自然，法阵扭曲',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【特效】{effects}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            },
            {
                id: 'XIANXIA_LIGHTNESS_SKILL_001',
                name: '轻功身法',
                category: 'xianxia-action',
                description: '轻功飞行、空中动作 - 航拍跟随 + 升降',
                applicableScene: '全景、远景',
                applicableEmotion: '飘逸、灵动',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、武侠风格、明亮清透、高动态',
                    texture: '飘逸灵动、动作流畅、气流效果、唯美画面',
                    focalLength: '24-35mm广角',
                    aperture: 'f/5.6-8',
                    cameraMovement: '航拍跟随 + 升降',
                    movementSpeed: '5-6',
                    breathingIntensity: '低',
                    dynamicBlur: '30-40%',
                    mainLightType: '自然光/逆光',
                    lightRatio: '1:2',
                    saturation: '+20%',
                    colorTone: '明亮清透',
                    highlight: '自然光线',
                    midtone: '通透',
                    shadow: '柔和'
                },
                actionKeywords: {
                    chain: '脚尖点地 → 借力腾空 → 空中翻腾 → 稳稳落地',
                    physics: '衣袂飘飞、发丝飞扬、气流扰动',
                    effects: '残影、气流尾迹、光效残留',
                    degree: 'gracefully, swiftly, effortlessly'
                },
                negativePrompt: '模糊，低清，动作僵硬，飞行动作不自然',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【特效】{effects}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            },
            {
                id: 'XIANXIA_ULTIMATE_SKILL_001',
                name: '大招爆发',
                category: 'xianxia-action',
                description: '大招释放、最终决战 - 环绕 + 升格慢动作',
                applicableScene: '全景、远景',
                applicableEmotion: '震撼、史诗、高潮',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、仙侠玄幻、超高饱和度、粒子特效、震撼全场',
                    texture: '能量爆发、空间扭曲、粒子爆炸、史诗级视觉效果',
                    focalLength: '24mm广角',
                    aperture: 'f/4.0',
                    cameraMovement: '环绕 + 升格慢动作 + 快速拉远',
                    movementSpeed: '多变（起始3 → 高潮2 → 结尾6）',
                    breathingIntensity: '低',
                    dynamicBlur: '起始20% → 高潮60%',
                    mainLightType: '特效光为主',
                    lightRatio: '1:2（低对比突出光效）',
                    saturation: '+40%',
                    colorTone: '根据特效类型',
                    highlight: '光芒万丈',
                    midtone: '饱满',
                    shadow: '光效衬托'
                },
                actionKeywords: {
                    chain: '蓄力凝聚 → 周身能量爆发 → 大招释放 → 能量波席卷全场',
                    physics: '空间扭曲、气浪翻涌、光芒吞噬',
                    effects: '巨大能量球、法阵铺满、能量冲击波、粒子爆炸',
                    degree: 'explosively, majestically, at maximum power'
                },
                negativePrompt: '模糊，低清，特效廉价，能量波不自然，粒子效果差',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【特效】{effects}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            },
            {
                id: 'XIANXIA_CHASE_001',
                name: '追逐战',
                category: 'xianxia-action',
                description: '追逐、逃亡 - 手持晃动 + 快速甩镜',
                applicableScene: '全景、远景交替',
                applicableEmotion: '紧张、紧迫',
                applicableTime: '任意',
                fixedParams: {
                    style: '电影级写实、武侠风格、高动态、紧张刺激',
                    texture: '速度感强、手持晃动、尘土飞扬、临场感',
                    focalLength: '35mm',
                    aperture: 'f/2.8',
                    cameraMovement: '手持跟拍 + 快速甩镜',
                    movementSpeed: '8-9',
                    breathingIntensity: '高',
                    dynamicBlur: '50-70%',
                    mainLightType: '自然光/环境光',
                    lightRatio: '1:3',
                    saturation: '+15%',
                    colorTone: '根据环境',
                    highlight: '自然光线',
                    midtone: '自然',
                    shadow: '深'
                },
                actionKeywords: {
                    chain: '快速奔跑 → 翻跃障碍 → 急转方向 → 加速冲刺',
                    physics: '脚步震动、风声呼啸、环境破坏',
                    effects: '残影、速度线、尘土飞扬',
                    degree: 'rapidly, frantically, at breakneck speed'
                },
                negativePrompt: '模糊，低清，动作僵硬，速度感不足，穿模',
                template: '【分镜{shotNumber}】【时长】{duration}s【焦距】{focalLength}【运镜】{cameraMovement}·{movementSpeed}{breathingInfo}{dynamicBlurInfo}【要求】{sceneDescription}。{actionDescription}{cameraInstruction}{negativePrompt}\n\n【动作链】{actionChain}\n【特效】{effects}\n【物理细节】{physicsDetails}\n【程度词】{degreeWords}'
            }
        ];
    },

    /**
     * 根据ID获取配方
     * @param {string} recipeId - 配方ID
     * @returns {Object|null} 配方对象
     */
    getRecipeById(recipeId) {
        return this.getAllRecipes().find(r => r.id === recipeId) || null;
    },

    /**
     * 按分类获取配方
     * @param {string} category - 分类名称
     * @returns {Array} 配方数组
     */
    getRecipesByCategory(category) {
        return this.getAllRecipes().filter(r => r.category === category);
    },

    /**
     * 获取所有分类
     * @returns {Array} 分类列表
     */
    getCategories() {
        return [
            { id: 'epic', name: '史诗场景', icon: '🏰' },
            { id: 'hero', name: '英雄登场', icon: '⚔️' },
            { id: 'dialogue', name: '对话场景', icon: '💬' },
            { id: 'emotion', name: '情绪特写', icon: '😊' },
            { id: 'xianxia', name: '仙侠情感', icon: '🌸' },
            { id: 'xianxia-action', name: '仙侠动作', icon: '🔥' }
        ];
    }
};

// 导出配方库
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecipeLibrary;
}
