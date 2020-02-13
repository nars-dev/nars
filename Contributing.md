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
