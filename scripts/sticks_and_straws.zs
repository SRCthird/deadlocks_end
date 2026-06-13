craftingTable.addShapeless("stick_sapling", <item:minecraft:stick>, [<tag:items:minecraft:saplings>]);
craftingTable.addShapeless("straw_fiber", <item:notreepunching:plant_fiber>, [<item:farmersdelight:straw>]);
craftingTable.addShapeless("fiber_straw", <item:farmersdelight:straw>, [<item:notreepunching:plant_fiber>]);
craftingTable.remove(<item:farmersdelight:cooking_pot>);
craftingTable.addShaped("new_graybeard_cooking_pot", <item:farmersdelight:cooking_pot>, [
    [<item:minecraft:brick>, <item:farmersdelight:flint_knife>, <item:minecraft:brick>],
    [<item:minecraft:iron_ingot>, <item:minecraft:water_bucket>, <item:minecraft:iron_ingot>],
    [<item:minecraft:iron_ingot>, <item:minecraft:iron_ingot>, <item:minecraft:iron_ingot>]
]);
craftingTable.remove(<item:irons_spellbooks:graybeard_staff>);
craftingTable.addShaped("new_graybeard_staff", <item:irons_spellbooks:graybeard_staff>, [
    [<item:minecraft:air>, <item:minecraft:air>, <item:irons_spellbooks:arcane_essence>],
    [<item:minecraft:air>, <item:spartanweaponry:pole>, <item:minecraft:air>],
    [<item:minecraft:iron_ingot>, <item:minecraft:air>, <item:minecraft:air>]
]);
craftingTable.remove(<item:chipped:carpenters_table>);
craftingTable.addShaped("new_carpenters_table", <item:chipped:carpenters_table>, [
    [<item:minecraft:air>, <item:minecraft:air>, <item:minecraft:iron_ingot>],
    [<tag:items:minecraft:logs>, <item:minecraft:air>, <tag:items:minecraft:logs>],
    [<item:handcrafted:hammer>, <tag:item:minecraft:planks>, <tag:items:minecraft:logs>]
]);
