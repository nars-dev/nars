type t =
  | CannotRegisterWaitComponent
  | DuplicateComponentRegistrationAttempt(string);

type exn +=
  | NarsInternalError({
      t,
      humanReadable: string,
    });

let make = t =>
  NarsInternalError({
    t,
    humanReadable:
      switch (t) {
      | CannotRegisterWaitComponent => {j|'Wait' is a special component name used for suspended rendering|j}
      | DuplicateComponentRegistrationAttempt(name) => {j|Component with this name exists: '$(name)'|j}
      },
  });
