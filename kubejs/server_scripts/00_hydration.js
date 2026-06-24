ServerEvents.tags('item', event => {
  const weakDrinks = [
    'survival_instinct:beer',
    'survival_instinct:whiskey',
    'undead_revamp2:spittea',
    'minecraft:suspicious_stew',
  ]

  const mildDrinks = [
    'survival_instinct:fruit_can',
    'survival_instinct:tomato_soup',
    'survival_instinct:lemon_soda',
    'survival_instinct:red_soda',
    'survival_instinct:blue_soda',
    'born_in_chaos_v1:bottle_of_magical_energy',
    'born_in_chaos_v1:elixirof_insect_protection',
    'born_in_chaos_v1:potion_of_rampage',
    'born_in_chaos_v1:elixir_of_vampirism',
    'born_in_chaos_v1:elixirof_wither_resistance',
    'born_in_chaos_v1:elixirof_ice_barrier',
    'born_in_chaos_v1:intoxicating_decoction',
    'born_in_chaos_v1:stimulating_decoction',
    'botania:brew_vial',
    'botania:brew_flask',
    'botania:mana_bottle',
    'kobolds:kobold_potion',
    'biomancy:acid_extract',
    'the_bumblezone:bee_soup',
    'minecraft:beetroot_soup',
    'aquaculture:turtle_soup',
    'farmersdelight:pumpkin_soup',
    'trinketsandbaubles:goblin_soup',
    'trinketsandbaubles:fairy_dew',
    'survival_instinct:orange',
    'regions_unexplored:hanging_earlight_fruit',
    'quark:ancient_fruit',
    'bosses_of_mass_destruction:crystal_fruit',
    'minecraft:chorus_fruit',
    'born_in_chaos_v1:mint_ice_cream',
    'irons_spellbooks:greater_oakskin_elixir',
    'irons_spellbooks:greater_healing_potion',
    'irons_spellbooks:greater_invisibility_elixir',
    'irons_spellbooks:greater_evasion_elixir',
  ]

  const goodDrinks = [
    'survival_instinct:gallon_of_milk',
    'survival_instinct:milk',
    'the_bumblezone:sugar_water_bottle',
    'the_bumblezone:royal_jelly_bottle',
    'farmersdelight:milk_bottle',
    'farmersdelight:chicken_soup',
    'farmersdelight:vegetable_soup',
    'farmersdelight:noodle_soup',
    'farmersdelight:onion_soup',
    'under_the_moon:puffball_soup',
    'the_deep_void:eyeball_soup',
  ]

  const greatDrinks = [
    'survival_instinct:gallon_of_water',
    'survival_instinct:orange_juice',
    'survival_instinct:apple_juice',
    'survival_instinct:bottle_of_water',
    'trinketsandbaubles:dwarf_stout',
    'trinketsandbaubles:titan_spirit',
    'oceansdelight:bowl_of_guardian_soup',
  ]

  const energyDrinks = [
    'survival_instinct:monster_can',
    'survival_instinct:energy_can',
    'arphex:scorched_soup',
    'arphex:void_sherbet',
  ]

  const allDrinks = weakDrinks.concat(mildDrinks, goodDrinks, greatDrinks, energyDrinks)

  event.add('toughasnails:drinks', allDrinks)

  event.add('toughasnails:thirst/1_thirst_drinks', weakDrinks)
  event.add('toughasnails:hydration/10_hydration_drinks', weakDrinks)

  event.add('toughasnails:thirst/3_thirst_drinks', mildDrinks)
  event.add('toughasnails:hydration/20_hydration_drinks', mildDrinks)

  event.add('toughasnails:thirst/5_thirst_drinks', goodDrinks)
  event.add('toughasnails:hydration/50_hydration_drinks', goodDrinks)

  event.add('toughasnails:thirst/8_thirst_drinks', greatDrinks)
  event.add('toughasnails:hydration/60_hydration_drinks', greatDrinks)

  event.add('toughasnails:thirst/10_thirst_drinks', energyDrinks)
  event.add('toughasnails:hydration/20_hydration_drinks', energyDrinks)
})
