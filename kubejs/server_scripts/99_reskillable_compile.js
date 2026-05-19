(function () {
  var INPUT_FILES = [
    "kubejs/data/reskillable_defaults_locks.json",
    "kubejs/data/reskillable_iceandfire_skill_locks.json",
    "kubejs/data/reskillable_by_material_skill_locks.json"
  ];

  // Final combined output.
  var OUTPUT_PATH = "kubejs/data/reskillable/skill_locks.json";

  function readJson(path) {
    try {
      return JsonIO.read(path);
    } catch (error) {
      console.error("[Reskillable Compile] Failed to read " + path + ": " + error);
      return null;
    }
  }

  function copyRequirements(value) {
    var output = [];

    if (!value) return output;

    for (var i = 0; i < value.length; i++) {
      output.push(String(value[i]));
    }

    return output;
  }

  function reqsToString(value) {
    if (!value) return "";

    var output = [];

    for (var i = 0; i < value.length; i++) {
      output.push(String(value[i]));
    }

    return output.join(",");
  }

  function mergeLocks(target, source, sourceName, sourceByItem) {
    if (!source) return 0;

    var count = 0;
    var itemIds = Object.keys(source);

    for (var i = 0; i < itemIds.length; i++) {
      var itemId = itemIds[i];
      var incomingRequirements = copyRequirements(source[itemId]);

      if (target[itemId]) {
        var oldReqsText = reqsToString(target[itemId]);
        var newReqsText = reqsToString(incomingRequirements);

        if (oldReqsText !== newReqsText) {
          console.warn(
            "[Reskillable Compile] Duplicate lock for " +
              itemId +
              ". Replacing [" +
              oldReqsText +
              "] from " +
              sourceByItem[itemId] +
              " with [" +
              newReqsText +
              "] from " +
              sourceName +
              "."
          );
        }
      }

      target[itemId] = incomingRequirements;
      sourceByItem[itemId] = sourceName;
      count++;
    }

    return count;
  }

  function compileReskillableLocks() {
    var combinedLocks = {};
    var sourceByItem = {};

    var filesRead = 0;
    var totalInputLocks = 0;

    for (var i = 0; i < INPUT_FILES.length; i++) {
      var path = INPUT_FILES[i];
      var json = readJson(path);

      if (!json) continue;

      if (!json.skillLocks) {
        console.warn(
          "[Reskillable Compile] Skipping " +
            path +
            " because it does not contain skillLocks."
        );
        continue;
      }

      filesRead++;
      totalInputLocks += mergeLocks(combinedLocks, json.skillLocks, path, sourceByItem);
    }

    var output = {
      skillLocks: combinedLocks
    };

    JsonIO.write(OUTPUT_PATH, output);

    console.info(
      "[Reskillable Compile] Compiled " +
        Object.keys(combinedLocks).length +
        " unique locks from " +
        totalInputLocks +
        " input locks across " +
        filesRead +
        " files into " +
        OUTPUT_PATH
    );
  }

  ServerEvents.recipes(function (event) {
    compileReskillableLocks();
  });
})();
