// 拾光集 · 影像数据
// 每张照片：图源、标题、时间、地点、一句话氛围、故事正文

const img = (prompt, size = 'landscape_4_3') =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/tool_text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${size}`

export const chapters = [
  { id: 'all', name: '全部', mark: '◎' },
  { id: 'journey', name: '远行', mark: '✈' },
  { id: 'daily', name: '日常', mark: '☕' },
  { id: 'people', name: '相遇', mark: '☺' },
  { id: 'night', name: '夜色', mark: '☾' }
]

export const photos = [
  {
    id: 1,
    chapter: 'journey',
    title: '第一缕海雾',
    date: '2021 · 04 · 12',
    time: '05:47',
    place: '福建 · 平潭 北港村',
    weather: '雾 / 微光',
    accent: '07:00',
    mood: '海还没醒，天先亮了一角。',
    story:
      '凌晨四点从民宿出发，骑车沿环岛路往北。雾气把海面和天空缝在一起，分不清边界在哪。等了大概四十分钟，太阳从雾层下面漏出一条金线——就那么几秒，海面被点亮成一条窄窄的、会呼吸的路。快门按下的时候我手是抖的，不是因为冷。',
    tags: ['雾航', '日出', '环岛'],
    src: img('misty oceanic dawn, thin golden light line cutting through thick sea fog, silhouetted rocky coastline, muted teal and warm amber tones, cinematic film photograph', 'landscape_4_3'),
    ratio: '4 / 3'
  },
  {
    id: 2,
    chapter: 'daily',
    title: '第二杯凉了',
    date: '2021 · 09 · 03',
    time: '15:20',
    place: '上海 · 绍兴路 老咖啡馆',
    weather: '阴 / 静',
    accent: '06:00',
    mood: '有些下午是用来浪费得理直气壮的。',
    story:
      '常去的那家店有只上了年纪的猫，只肯趴在靠窗第二张桌子上。那天赶稿子，点了两杯手冲，第一杯喝完，第二杯一直放到彻底凉透也没动过。抬头才发现窗外的梧桐叶已经开始泛黄，光斜斜地铺在木桌上，像一层薄薄的蜂蜜。凉掉的那杯，其实挺好喝。',
    tags: ['午后', '旧木桌', '猫'],
    src: img('cozy vintage coffee shop interior, wooden table with cooling pour-over coffee, autumn light through window, warm honey tones, film grain, shallow depth of field', 'portrait_4_3'),
    ratio: '3 / 4'
  },
  {
    id: 3,
    chapter: 'night',
    title: '雨口逃生',
    date: '2022 · 06 · 18',
    time: '21:35',
    place: '重庆 · 洪崖洞 对岸',
    weather: '雨 / 霓虹',
    accent: '08:00',
    mood: '整座城市泡在水里，还在发光。',
    story:
      '天气预报说夜里有雨，我们偏要过江去拍对岸的灯。刚架好三脚架，雨就来了，越下越大。镜头前的雨滴把灯火拉成一小片一小片融化的颜色，桥、楼、江面的倒影全搅在一起。后来干脆不打伞了，站在江边看这座立体的城市一层一层亮到江水里去。',
    tags: ['霓虹', '江面倒影', '雨夜'],
    src: img('rainy night cityscape reflected in river, layered neon lights of a hilly metropolis, bokeh raindrops on lens, deep blue and magenta, long exposure photograph', 'landscape_16_9'),
    ratio: '16 / 9'
  },
  {
    id: 4,
    chapter: 'people',
    title: '外婆的手',
    date: '2020 · 02 · 05',
    time: '11:02',
    place: '湖南 · 老家 灶房',
    weather: '晴 / 暖',
    accent: '06:30',
    mood: '皱纹里藏着一整个家族的口味。',
    story:
      '过年回家，外婆在灶房包蛋饺。她的手一直很稳，蛋液在铁勺里转一圈就摊成薄薄一张圆皮，动作快得看不清。我举着相机蹲了半小时，她笑我"拍个啥子"。这双手做过几十年的年夜饭，我小时候的胃就是被它养大的。照片有点糊，因为那天我也在流眼泪。',
    tags: ['家', '灶台', '年味'],
    src: img('elderly grandmother hands making egg dumplings with iron ladle, rustic village kitchen, warm sunlight, intimate close-up, documentary photograph, nostalgic', 'portrait_4_3'),
    ratio: '3 / 4'
  },
  {
    id: 5,
    chapter: 'journey',
    title: '雪线之上',
    date: '2023 · 01 · 27',
    time: '09:14',
    place: '四川 · 四姑娘山 大峰',
    weather: '晴 / 极寒',
    accent: '07:30',
    mood: '走到高处，才知道安静有多重。',
    story:
      '凌晨三点出发冲顶，头灯只照见前面队友的脚后跟。快到峰顶时天亮了，回头一看——整片云海在脚下翻，没有一丝风，连呼吸声都显得吵闹。那一刻大概明白，为什么有人愿意背着几十斤的东西往高处走。',
    tags: ['雪山', '云海', '冲顶'],
    src: img('high altitude snowy mountain summit above sea of clouds, alpine dawn, climber silhouette small against vast white peaks, crisp cold light, wide landscape photograph', 'landscape_16_9'),
    ratio: '16 / 9'
  },
  {
    id: 6,
    chapter: 'daily',
    title: '窗台植物角',
    date: '2022 · 04 · 22',
    time: '08:15',
    place: '上海 · 家中 阳台',
    weather: '晴 / 微尘',
    accent: '05:00',
    mood: '它们比我更懂什么叫按时生长。',
    story:
      '疫情期间在家办公，阳台成了我唯一的远方。养了七盆植物，每天给它们转一次方向，让每一面都能晒到太阳。那天早晨光特别好，能看见空气里飘着的细小尘埃，像给整个画面撒了一层金粉。原来不出门的日子，也可以长得这么茂盛。',
    tags: ['宅家', '绿植', '晨光'],
    src: img('sunlit balcony with potted plants, golden morning light and floating dust particles, calm minimalist home corner, warm airy photograph', 'portrait_4_3'),
    ratio: '3 / 4'
  },
  {
    id: 7,
    chapter: 'people',
    title: '毕业那天的走廊',
    date: '2019 · 06 · 28',
    time: '17:40',
    place: '武汉 · 大学 旧教学楼',
    weather: '晴 / 黄昏',
    accent: '07:30',
    mood: '我们最后一次并肩走过这条走廊。',
    story:
      '拍完毕业照，大家散在校园各处。我绕回常上课的那栋旧楼，走廊空空的，夕阳从窗户一格格地铺进来，把地板切成一段一段的光。四年的早八、赶考、偷睡、大笑，都留在这条走廊里了。我在原地站了很久，直到光全部退到墙上去。',
    tags: ['毕业', '走廊', '夕阳'],
    src: img('empty university corridor at golden hour, sunset light squares cast through windows on floor, nostalgic quiet atmosphere, warm nostalgic photograph', 'landscape_4_3'),
    ratio: '4 / 3'
  },
  {
    id: 8,
    chapter: 'night',
    title: '天台上的银河',
    date: '2023 · 08 · 12',
    time: '23:50',
    place: '浙江 · 天荒坪 观星台',
    weather: '晴 / 无月',
    accent: '09:00',
    mood: '抬头那一刻，人显得特别小，也特别自由。',
    story:
      '英仙座流星雨那晚，一群人裹着被子躺在天台上。实时气温十几度，谁也没说话，就听着偶尔的惊呼——又一颗。三十秒曝光，拍到一整片银河横过头顶。有人说看见流星要许愿，我想了想，好像什么都不缺。',
    tags: ['流星雨', '银河', '露营'],
    src: img('milky way galaxy arching over mountain observatory, starry night sky, small silhouettes of people lying on rooftop, deep indigo, astrophotography', 'portrait_4_3'),
    ratio: '3 / 4'
  },
  {
    id: 9,
    chapter: 'journey',
    title: '绿皮车窗',
    date: '2021 · 07 · 30',
    time: '16:05',
    place: '甘肃 · 兰州 — 敦煌 途中',
    weather: '晴 / 尘',
    accent: '07:00',
    mood: '慢一点，才看得清自己在往哪里去。',
    story:
      '为了看沿途的风景，特意买了绿皮车的硬座。十几个小时，窗外的颜色从城市的灰变成戈壁的黄。邻座的大叔分我半个西瓜，用报纸垫着，很甜。列车过祁连山的时候，光把远处的雪峰照得像一枚硬币。慢车有慢车的好。',
    tags: ['绿皮火车', '戈壁', '慢旅行'],
    src: img('view through old green train window, arid gobi desert landscape, distant snow-capped mountains, dusty warm light, analog travel photograph', 'landscape_16_9'),
    ratio: '16 / 9'
  },
  {
    id: 10,
    chapter: 'daily',
    title: '一碗面的仪式',
    date: '2020 · 11 · 08',
    time: '19:30',
    place: '陕西 · 西安 小巷面馆',
    weather: '寒 / 烟火',
    accent: '06:00',
    mood: '热气腾腾，是冬天最体面的开场白。',
    story:
      '冬天下班，冻得手都僵了，钻进巷子口那家面馆。老板抻面的时候，面在案板上摔得啪啪响。面上来，先喝一口汤，从喉咙一直暖到胃里。那种安稳，是再多的外卖都换不来的。吃完抬头看，玻璃上全是雾气，窗外的人影都被蒸软了。',
    tags: ['碳水', '冬天', '市井'],
    src: img('steaming bowl of noodles in small alley restaurant, winter evening, warm light and hot vapor, condensation on window, cozy documentary photograph', 'portrait_4_3'),
    ratio: '3 / 4'
  },
  {
    id: 11,
    chapter: 'night',
    title: '城市打烊以后',
    date: '2022 · 12 · 31',
    time: '01:12',
    place: '深圳 · 深南大道',
    weather: '晴 / 空旷',
    accent: '08:30',
    mood: '一年里唯一一条可以横着走的大道。',
    story:
      '跨年零点过后，人潮散去，我沿着深南大道往回走。平时车流滚滚的主干道空得能听见自己的脚步声，只剩路灯一路铺到很远的地方。远处楼顶还亮着"新年快乐"的霓虹，还没来得及关。站在马路正中间拍了这张照片，很奢侈地浪费了一整条街的宽度。',
    tags: ['跨年', '空街', '路灯'],
    src: img('empty wide city avenue at night after new year, long row of streetlights receding into distance, tall buildings with neon signage, urban solitude photograph', 'landscape_16_9'),
    ratio: '16 / 9'
  },
  {
    id: 12,
    chapter: 'people',
    title: '巷口的棋局',
    date: '2020 · 09 · 20',
    time: '16:48',
    place: '成都 · 宽窄巷子 附近',
    weather: '晴 / 闲',
    accent: '06:30',
    mood: '围观的人比下棋的人还投入。',
    story:
      '路过一条老街，几个大爷在巷口支了张矮桌下象棋。围了一圈看客，比下棋的还紧张，指指点点的、出谋划策的、后悔拍腿的，热闹得像一场小型赛事。我蹲在旁边拍了好一会儿，忽然觉得这种缓慢的、无关紧要的热闹，才是城市最动人的部分。',
    tags: ['市井', '象棋', '巴适'],
    src: img('elderly men playing chinese chess at street corner, onlookers gathered in circle, sunny afternoon in old town alley, warm candid documentary photograph', 'portrait_4_3'),
    ratio: '3 / 4'
  }
]
