const MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
const MobEffects = Java.loadClass('net.minecraft.world.effect.MobEffects')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const SoundSource = Java.loadClass('net.minecraft.sounds.SoundSource')
const Byte = Java.loadClass('java.lang.Byte')

const SANITY_TOTEM = Item.of(
  'minecraft:totem_of_undying',
  '{DeadlocksSanityTotem:1b,display:{Name:\'{"text":"Totem of Sanity","color":"gold","italic":false}\'}}'
)

const isSanityTotem = (stack) => {
  if (stack == null || stack.isEmpty()) return false
  if (stack.id !== 'minecraft:totem_of_undying') return false
  return stack.nbt && stack.nbt.DeadlocksSanityTotem === 1
}
const findHeldSanityTotem = (player) => {
  const main = player.getMainHandItem()
  if (isSanityTotem(main)) return main
  const off = player.getOffhandItem()
  if (isSanityTotem(off)) return off
  return null
}
const setPlayerSanity = (player, value) => {
  if (typeof player.setSanity === 'function') {
    player.setSanity(value)
  }
}
const popTotem = (player) => {
  player.level().broadcastEntityEvent(player, Byte.valueOf(35))
  player.level().playSound(
    null,
    player.getX(),
    player.getY(),
    player.getZ(),
    SoundEvents.TOTEM_USE,
    SoundSource.PLAYERS,
    1.0,
    1.0
  )
}
const applyVanillaTotemEffects = (player) => {
  player.setHealth(1.0)
  player.removeAllEffects()
  player.addEffect(new MobEffectInstance(MobEffects.REGENERATION, 45 * 20, 1))
  player.addEffect(new MobEffectInstance(MobEffects.ABSORPTION, 5 * 20, 1))
  player.addEffect(new MobEffectInstance(MobEffects.FIRE_RESISTANCE, 40 * 20, 0))
}
const activateSanityTotem = (player, stack) => {
  if (!player.isCreative()) {
    stack.shrink(1)
  }
  applyVanillaTotemEffects(player)
  setPlayerSanity(player, 100)
  popTotem(player)
  player.tell(Text.gold('The Totem of Sanity anchors your mind.'))
}

EntityEvents.death('player', event => {
  const player = event.entity ?? event.player
  const totem = findHeldSanityTotem(player)
  if (totem == null) return
  event.cancel()
  activateSanityTotem(player, totem)
})
SanityEvents.change(event => {
  if (event.getChange() >= 0) return
  const player = event.getEntity()
  const totem = findHeldSanityTotem(player)
  if (totem == null) return
  event.cancel()
})
LootJS.modifiers((event) => {
  event
    .addEntityLootModifier("sanitydim:rotting_stalker")
    .randomChance(0.03)
    .addLoot(SANITY_TOTEM);
  event
    .addEntityLootModifier("sanitydim:sneaking_terror")
    .randomChance(0.03)
    .addLoot(SANITY_TOTEM);
});
