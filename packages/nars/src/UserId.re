module MachineUDID = {
  [@bs.module "node-machine-id"]
  external make: unit => string = "machineIdSync";
};

module UUID = {
  [@bs.module] external make: unit => string = "uuid/v1";
};
