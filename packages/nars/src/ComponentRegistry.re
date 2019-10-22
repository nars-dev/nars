module HashMap = Belt.HashMap.String;

type t = HashMap.t(Instance.encoder);

let registry: t = HashMap.make(~hintSize=6);

let add = (~name, ~encoder) =>
  if (!HashMap.has(registry, name)) {
    HashMap.set(registry, name, encoder);
  } else {
    raise(Invalid_argument("Component with this name exists: " ++ name));
  };

let get = (~name) => {
  HashMap.get(registry, name);
};

let createInstance = (~name, ~key, ~props) => {
  switch (get(~name)) {
  | Some(encode) =>
    Instance.Component({props: Props(props), encode, children: [||], key})
  | None => invalid_arg("Unknown primitive component with name " ++ name)
  };
};
