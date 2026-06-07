ServerEvents.tags('item', event => {
  const weakDrinks = [
    'survival_instinct:beer',
    'survival_instinct:whiskey'
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
  ]

  const goodDrinks = [
    'survival_instinct:gallon_of_milk',
    'survival_instinct:milk',
    'the_bumblezone:sugar_water_bottle',
    'the_bumblezone:royal_jelly_bottle',
    'farmersdelight:milk_bottle'
  ]

  const greatDrinks = [
    'survival_instinct:gallon_of_water',
    'survival_instinct:orange_juice',
    'survival_instinct:apple_juice',
    'survival_instinct:bottle_of_water',
    'trinketsandbaubles:dwarf_stout',
    'trinketsandbaubles:titan_spirit'
  ]

  const energyDrinks = [
    'survival_instinct:monster_can',
    'survival_instinct:energy_can',
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
