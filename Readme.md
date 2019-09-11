<p align="center">
  <img width="180" height="126" src="design/github_logo.png" />
</p>

<h3 align="center">
  Server rendered React Native.
</h3>

### Discord

I'm more than happy to answer any questions or help you if you stumble
upon some issues when using nars. You can chat with me on [Discord](https://discord.gg/ubsun8r).

---

## Getting started

nars is currently being developed in a private repo, but it's public on npm so that it's easier to use it.

### App packages

In the rest of this guide, I assume that you have three packages: `client`, `server`, and `common`. 
You can rename these however you want but make sure to swap the name in all relevant places.

### Folder structure

We want to share the common package so we will create a yarn monorepo.

```
|-- client
|  |-- package.json
|-- common
|  |-- package.json
|  |-- index.js
|-- server
|  |-- package.json
|-- package.json
```

```
package.json in root:

{
  "private": true,
  "workspaces": [
    "client",
    "server",
    "common"
  ]
}
```

### Defining a config

In the common package run:
- `yarn add nars-common@latest`

Next, create index.js with a config.

nars config is an object which defines the components rendered on the server. It is a type-safe contract between the client and server. For example:

```
import { InputProp } from "nars-common";

export const config = {
  Example: {
    props: {
      backgroundColor: InputProp.string,
      textColor: InputProp.optional(InputProp.string)
    }
  }
};
```

- `Example` is the name of the component
- `props` object contains all props that it can accept
- `backgroundColor` and `textColor` keys are prop names and the value, like `InputProp.string` describes the desired prop type.

### Configuring the server

In the server package run:
- `yarn add nars <common_package_name>` where `common_package_name` is the name of the package in the `common` directory.

Create `index.js` file:

```
import * as React from "react";
import { Static } from "nars";
import { Server } from "ws";
import { config } from <common_package_name>;

/**
 * For every component in the config file create a component definition.
 * It consists of component's name as the key and a React Component as
 * a value.
 * For example:
 * const components = {
 *   Form: props => <Form {...props} />
 * };
 */
const components = {
  <component_name>: <component_definition>
};

/**
 * Create a router. config and components have to match!
 * Tip: If you use typescript, config and components will
 * be statically type checked for you.
 */
const router = Static.createRouter(config, components);

/* Create and start a server */
const webSocketServer = new Server({ port: 9000 });

/* Start listening for incoming requests */
Static.attatchListener(webSocketServer, router);
```

#### Running the server

**Typescript**

Add `parcel` if not present:
```
yarn add parcel
```

Run:
```
parcel build --target node index.tsx && node dist/index.js
```

**Plain JavaScript**

```
node index.js
```

### Attaching a client

Set up your React Native app in the client folder. Next run:
- `yarn add nars-client <common_package_name>` where `common_package_name` is the name of the package in the `common` directory.
- Go to a file where you'd like to use nars' `RemoteComponent`.

```
import * as Nars from "nars-client";
import { config } from "<common_package_name>";

const RemoteComponent = Nars.createRemoteComponent(
  "ws://localhost:9000",
  config
);

/* In render */
   return (
     <RemoteComponent
       name=<component_name>
       props={{....}}
     />
   );
```

Remote component will server render the component with `<component_name>`.

## Contributing

Many component types and props are currently missing and there are many bugs.
If you have some questions or issues you can get in touch on [Discord](https://discord.gg/ubsun8r).

If you'd like to help but don't know where to start check out the `Project` tab or `Issues`.

### Getting started with examples

Make sure you clone the repository using:

```
git clone --recurse-submodules git@github.com:wokalski/nars.git
```

If you've cloned the repository already make sure to pull the submodules:

```
git submodule update --init
```

Add [esy](https://esy.sh). We require esy for some native tools.

```
yarn global add esy
```

Run `esy install`. It will take a minute. It builds some native dev-time tools used by nars.

In the root directory run:

- `yarn && yarn build`

Next you're going to need to run the server which runs the business logic:

- `cd examples/server && yarn start`

In a different tab/terminal window run the client:

- `cd examples/client && yarn run-ios`

### Modifying examples

You can modify `examples/server/Form.tsx`, and relaunch the server.
Afterwards just open and close the `Form` card in the examples app
and observe the changes.

There's a limited set of props which are supported. You can check them out in
`packages/nars/src/<component-name>.ts`.

### Adding a prop to an existing component

Go to schema protobuf file: 
`packages/nars-common/src/proto/schema.proto`

1. Find the message that describes the component (i.e. View is described by message View)
2. Add a field to the component's message (see [Protobuf Language Guide](https://developers.google.com/protocol-buffers/docs/proto#simple)
for a reference.
3. If the field is optional, wrap it in a value type. See `Int32Value` message for reference. 
It's a wrapper around int32 type. Protobuf doesn't have the notion of optional values but
the default value for message is 0 so it's possible to detect if it's set or not.
4. If the prop is a function we use Callback message for describing it.

Go to `packages/nars/src/<component-name>.ts`
- Add the prop to the component and parsing code

Go to `packages/nars-client/src/DecodeElement.tsx`
- Implement decoding for the prop.
