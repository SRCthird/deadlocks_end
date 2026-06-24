ServerEvents.recipes(event => {
  event.custom({
    type: 'create:filling',
    ingredients: [
      {
        item: 'minecraft:glass_bottle'
      },
      {
        fluid: 'the_bumblezone:sugar_water_still',
        amount: 250
      }
    ],
    results: [
      {
        item: 'the_bumblezone:sugar_water_bottle'
      }
    ]
  }).id('deadlocks_end:create/filling/sugar_water_bottle')

  event.custom({
    type: 'create:emptying',
    ingredients: [
      {
        item: 'the_bumblezone:sugar_water_bottle'
      }
    ],
    results: [
      {
        item: 'minecraft:glass_bottle'
      },
      {
        fluid: 'the_bumblezone:sugar_water_still',
        amount: 250
      }
    ]
  }).id('deadlocks_end:create/emptying/sugar_water_bottle')
})
