import { writeFile, mkdir } from 'fs/promises'

const trims = [
  'sentry',
  'vex',
  'wild',
  'coast',
  'dune',
  'wayfinder',
  'raiser',
  'shaper',
  'host',
  'ward',
  'silence',
  'tide',
  'snout',
  'rib',
  'eye',
  'spire',
  'flow',
  'bolt'
]

const tools = [
  'netherite_axe',
  'diamond_axe',
  'golden_axe',
  'iron_axe',
  'stone_axe',
  'wooden_axe',
  'netherite_pickaxe',
  'diamond_pickaxe',
  'golden_pickaxe',
  'iron_pickaxe',
  'stone_pickaxe',
  'wooden_pickaxe',
  'netherite_shovel',
  'diamond_shovel',
  'golden_shovel',
  'iron_shovel',
  'stone_shovel',
  'wooden_shovel',
  'netherite_hoe',
  'diamond_hoe',
  'golden_hoe',
  'iron_hoe',
  'stone_hoe',
  'wooden_hoe',
  'netherite_sword',
  'diamond_sword',
  'golden_sword',
  'iron_sword',
  'stone_sword',
  'wooden_sword'
]

const materials = [
  'quartz',
  'iron',
  'netherite',
  'redstone',
  'copper',
  'gold',
  'emerald',
  'diamond',
  'lapis',
  'amethyst',
  'armadillo_scute',
  'blaze_rod',
  'bone',
  'breeze_rod',
  'coal',
  'dragon_breath',
  'echo_shard',
  'end_crystal',
  'ender_pearl',
  'experience_bottle',
  'fire_charge',
  'glow_ink',
  'glowstone',
  'gunpowder',
  'heart_of_the_sea',
  'honeycomb',
  'leather',
  'nautilus',
  'nether_brick',
  'nether_star',
  'netherite_scrap',
  'phantom_membrane',
  'prismarine_crystals',
  'prismarine',
  'purpur',
  'rabbit_hide',
  'slime',
  'turtle_scute'
]

function compareMaterial(material1: string, material2: string) {
  if (material1.startsWith('gold') && material2.startsWith('gold')) return true
  return material1 === material2
}

async function writeItemModels() {
  const promises: Promise<void>[] = []
  
  for (const tool of tools) {
    let [toolMaterial, toolName] = tool.split('_')

    if (!toolName) {
      toolName = toolMaterial
      toolMaterial = ''
    }

    await mkdir(`./generator/output/assets/more_tool_trim/models/item`, { recursive: true })
    
    for (const trim of trims) {
      for (const material of materials) {
        const modelFile = compareMaterial(material, toolMaterial)
          ? `./generator/output/assets/more_tool_trim/models/item/${tool}_${trim}_and_${material}_darker_trim.json`
          : `./generator/output/assets/more_tool_trim/models/item/${tool}_${trim}_and_${material}_trim.json`
        const modelTrim = compareMaterial(material, toolMaterial)
          ? `more_tool_trim:trims/items/${toolName}_trim/${trim}_${material}_darker`
          : `more_tool_trim:trims/items/${toolName}_trim/${trim}_${material}`
        const modelContents = {
          parent: 'minecraft:item/handheld',
          textures: {
            layer0: `minecraft:item/${tool}`,
            layer1: modelTrim
          }
        }
        promises.push(writeFile(modelFile, JSON.stringify(modelContents, null, 2)))
      }
    }
  }

  return Promise.all(promises)
}

writeItemModels()