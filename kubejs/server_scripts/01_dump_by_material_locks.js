(function () {
  var H = global.ReskillableLockHelpers;

  if (!H) {
    throw new Error(
      "ReskillableLockHelpers was not loaded. Make sure 00_reskillable_lock_helpers.js loads before this file."
    );
  }

  var OUTPUT_PATH = "kubejs/data/reskillable_by_material_skill_locks.json";

  var NAMESPACES = [
    "minecraft",
    "spartanweaponry",
    "spartanfire",
    "spartanshields",
    "srp_spartans",
    "kobolds",
    "iceandfire",
    "dragonseeker",
    "chestcavity",
    "aquaculture",
    "simplyswords",
    "justhammers",
    "nopunchtree",
    "immersiveengineering",
    "nethersdelight",
    "magistuarmory"
  ];

  function has(path, text) {
    return String(path).indexOf(text) !== -1;
  }

  function namespaceOf(id) {
    return String(id.getNamespace());
  }

  function isVanillaHarvestingItem(id, path) {
    var namespace = namespaceOf(id);

    return (
      namespace === "minecraft" &&
      has(path, "brush")
    )
  }

  function isReinforcedHammerItem(id, path) {
    var namespace = namespaceOf(id);

    return (
      namespace === "justhammers" &&
      has(path, "reinforced")
    )
  }

  function isDestructorHammerItem(id, path) {
    var namespace = namespaceOf(id);

    return (
      namespace === "justhammers" &&
      has(path, "destructor")
    )
  }

  function isShieldItem(id, path) {
    var namespace = namespaceOf(id);

    return (
      namespace === "spartanshields" ||
      has(path, "shield") ||
      has(path, "buckler")
    );
  }

  function isArmorItem(path) {
    return (
      has(path, "armor") ||
      has(path, "helmet") ||
      has(path, "chestplate") ||
      has(path, "leggings") ||
      has(path, "boots")
    );
  }

  function isDragonArmorItem(id, path) {
    var namespace = namespaceOf(id);

    return (
      namespace === "iceandfire" &&
      (has(path, "armor") || has(path, "tide")) &&
      !has(path, "metal")
    );
  }

  function isPickaxeItem(path) {
    return has(path, "pickaxe");
  }

  function isStaffItem(path) {
    return has(path, "staff");
  }

  function isMagicAttunedItem(path) {
    return (
      has(path, "gold") ||
      has(path, "silver") ||
      has(path, "manasteel")
    );
  }

  function isShovelItem(path) {
    return has(path, "shovel");
  }

  function isHoeItem(path) {
    return has(path, "hoe");
  }

  function isAxeItem(path) {
    return (
      has(path, "axe") &&

      !has(path, "pickaxe") &&
      !has(path, "battleaxe") &&
      !has(path, "throwing_axe") &&
      !has(path, "poleaxe")
    );
  }

  function isFishingRodItem(path) {
    return (
      has(path, "fishing_rod") ||
      has(path, "fishingrod")
    )
  }

  function isToolItem(path) {
    return (
      isPickaxeItem(path) ||
      isShovelItem(path) ||
      isHoeItem(path) ||
      isAxeItem(path)
    );
  }

  function baseLevelFor(path) {
    path = String(path);

    // Exact Misc Tools:
    if (has(path, "dread_knight_sword")) return 30;
    if (has(path, "dread_queen_sword")) return 30;
    if (has(path, "ghost_sword")) return 30;
    if (has(path, "blindfold")) return 5;
    if (has(path, "earplugs")) return 5;
    if (has(path, "dread_sword")) return 5;
    if (has(path, "hippocampus_slapper")) return 5;
    if (has(path, "hippogryph_sword")) return 5;
    if (has(path, "amphithere_macuahuitl")) return 5;
    if (has(path, "stymphalian_bird_dagger")) return 5;
    if (has(path, "dread_queen_staff")) return 25;
    if (has(path, "lich_staff")) return 25;
    if (has(path, "dragon_stick")) return 25;
    if (has(path, "dragonseeker")) return 25;

    // By Material
    if (has(path, "wood")) return 0;
    if (has(path, "stone")) return 0;
    if (has(path, "studded")) return 3;
    if (has(path, "copper")) return 3;
    if (has(path, "silver")) return 5;
    if (has(path, "aluminum")) return 5;
    if (has(path, "gold")) return 5;
    if (has(path, "iron")) return 5;
    if (has(path, "electrum")) return 5;
    if (has(path, "lead")) return 5;
    if (has(path, "nickel")) return 5;
    if (has(path, "bronze")) return 5;
    if (has(path, "invar")) return 10;
    if (has(path, "osmium")) return 10;
    if (has(path, "elementium")) return 10;
    if (has(path, "constantan")) return 10;
    if (has(path, "sheep")) return 15;
    if (has(path, "diamond")) return 15;
    if (has(path, "deathworm")) return 15;
    if (has(path, "obsidian")) return 15;
    if (has(path, "myrmex_stinger")) return 20;
    if (has(path, "platinum")) return 20;
    if (has(path, "enderium")) return 20;
    if (has(path, "troll_leather")) return 20;
    if (has(path, "flamed_dragon_bone")) return 30;
    if (has(path, "iced_dragon_bone")) return 30;
    if (has(path, "lightning_dragon_bone")) return 30;
    if (has(path, "troll_weapon")) return 30;
    if (has(path, "netherite")) return 30;
    if (has(path, "living")) return 32;
    if (has(path, "sentient")) return 32;
    if (has(path, "dragonsteel")) return 32;
    if (has(path, "neptunium")) return 32;
    if (has(path, "runic")) return 32;
    if (has(path, "tin")) return 5;
    if (has(path, "steel")) return 10;
    if (has(path, "myrmex")) return 15;
    if (has(path, "dragon_bone")) return 25;
    if (has(path, "dragonbone")) return 25;
    if (has(path, "bone")) return 5;
    if (has(path, "brush")) return 5;

    return 1;
  }

  function requirementsFor(id, stack) {
    var path = String(id.getPath());
    var level = baseLevelFor(path);

    var outputRequirements = [];

    var isMagicAttuned = isMagicAttunedItem(path);
    var isLiving = has(path, "living");
    var isSentient = has(path, "sentient");
    var isVanillaHarvesting = isVanillaHarvestingItem(id, path);
    var isFishingRod = isFishingRodItem(path);
    var isDestructorHammer = isDestructorHammerItem(id, path);
    var isReinforcedHammer = isReinforcedHammerItem(id, path);

    var isLongbow = has(path, "longbow");
    var isCrossbow = has(path, "crossbow");
    var isBoomerang = has(path, "boomerang");
    var isElytra = has(path, "elytra");

    var isShield = isShieldItem(id, path);
    var isArmor = isArmorItem(path);
    var isDragonArmor = isDragonArmorItem(id, path);

    var isPickaxe = isPickaxeItem(path);
    var isShovel = isShovelItem(path);
    var isHoe = isHoeItem(path);
    var isAxe = isAxeItem(path);

    if (isShield) {
      outputRequirements.push(H.req("defense", level));
    } else if (isElytra) {
      if (level != 1) {
        outputRequirements.push(H.req("defense", level));
      }
      outputRequirements.push(H.req("agility", 25));
    } else if (isDragonArmor) {
      outputRequirements.push(H.req("defense", 25));
    } else if (isArmor) {
      outputRequirements.push(H.req("defense", level));
    } else if (isPickaxe) {
      outputRequirements.push(H.req("mining", level));
    } else if (isShovel) {
      outputRequirements.push(H.req("gathering", level));
    } else if (isHoe) {
      outputRequirements.push(H.req("farming", level));
    } else if (isAxe) {
      outputRequirements.push(H.req("gathering", level));
    } else if (isFishingRod) {
      outputRequirements.push(H.req("gathering", level));
    } else if (isCrossbow) {
      var agilityLevel = level;
      var attackLevel = Math.ceil(agilityLevel * 0.5);

      outputRequirements.push(H.req("agility", agilityLevel));
      outputRequirements.push(H.req("attack", attackLevel));
    } else if (isLongbow) {
      outputRequirements.push(H.req("agility", level));
    } else if (isBoomerang) {
      outputRequirements.push(H.req("agility", level));
    } else if (isVanillaHarvesting) {
      outputRequirements.push(H.req("gathering", level));
    } else if (isReinforcedHammer) {
      outputRequirements.push(
        H.req("mining", (level+5 <= 32) ? level+5 : 32)
      );
    } else if (isDestructorHammer) {
      outputRequirements.push(
        H.req("mining", (level+10 <= 32) ? level+10 : 32)
      );
    } else if (level != 1) {
      outputRequirements.push(H.req("attack", level));
    }

    if (isMagicAttuned) {
      outputRequirements.push(H.req("magic", 3));
    }

    if (isLiving) {
      outputRequirements.push(H.req("magic", 20));
    }

    if (isSentient) {
      outputRequirements.push(H.req("magic", 32));
    }

    return outputRequirements;
  }

  function shouldInclude(id, stack) {
    var path = String(id.getPath());

    return (
      stack.isDamageableItem() ||
      isShieldItem(id, path) ||
      isArmorItem(path) ||
      isToolItem(path) ||
      isStaffItem(path)
    );
  }

  ServerEvents.recipes(function (event) {
    H.dumpLocks({
      namespaces: NAMESPACES,
      shouldInclude: shouldInclude,
      requirementsFor: requirementsFor,
      outputPath: OUTPUT_PATH,
      label: "Weaponry + Shields + Tools + Armor"
    });
  });
})();
