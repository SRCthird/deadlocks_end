(function () {
  if (global.ReskillableLockHelpers) {
    return;
  }

  var BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries");

  function req(skill, level) {
    return String(skill) + ":" + String(level);
  }

  function reqList(skill, level) {
    return [req(skill, level)];
  }

  function multiReq(values) {
    var output = [];

    Object.keys(values).forEach(function (skill) {
      output.push(req(skill, values[skill]));
    });

    return output;
  }

  function includesAny(path, values) {
    path = String(path);

    for (var i = 0; i < values.length; i++) {
      if (path.indexOf(values[i]) !== -1) return true;
    }

    return false;
  }

  function startsWithAny(path, values) {
    path = String(path);

    for (var i = 0; i < values.length; i++) {
      if (path.startsWith(values[i])) return true;
    }

    return false;
  }

  function endsWithAny(path, values) {
    path = String(path);

    for (var i = 0; i < values.length; i++) {
      if (path.endsWith(values[i])) return true;
    }

    return false;
  }

  function arrayContains(values, value) {
    for (var i = 0; i < values.length; i++) {
      if (values[i] === value) return true;
    }

    return false;
  }

  function scanItems(namespaces, shouldInclude, requirementsFor) {
    var locks = {};

    BuiltInRegistries.ITEM.keySet().forEach(function (id) {
      var namespace = String(id.getNamespace());

      if (!arrayContains(namespaces, namespace)) return;

      var item = BuiltInRegistries.ITEM.get(id);
      var stack = item.getDefaultInstance();

      if (shouldInclude && !shouldInclude(id, stack)) return;

      var requirements = requirementsFor(id, stack);
      if (!requirements || requirements.length === 0) return;

      locks[id.toString()] = requirements;
    });

    return locks;
  }

  function writeLocks(outputPath, locks, label) {
    var output = {
      skillLocks: locks
    };

    JsonIO.write(outputPath, output);

    console.info(
      "Dumped " +
        Object.keys(locks).length +
        " " +
        label +
        " locks to " +
        outputPath
    );
  }

  function dumpLocks(options) {
    var locks = scanItems(
      options.namespaces,
      options.shouldInclude,
      options.requirementsFor
    );

    writeLocks(options.outputPath, locks, options.label);

    return locks;
  }

  global.ReskillableLockHelpers = {
    BuiltInRegistries: BuiltInRegistries,
    req: req,
    reqList: reqList,
    multiReq: multiReq,
    includesAny: includesAny,
    startsWithAny: startsWithAny,
    endsWithAny: endsWithAny,
    arrayContains: arrayContains,
    scanItems: scanItems,
    writeLocks: writeLocks,
    dumpLocks: dumpLocks
  };

  console.info("Loaded Reskillable lock helper functions");
})();
