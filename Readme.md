# Nars - SSR for React Native

This is a monorepo containing the core packages and examples of nars

### Discord

I'm more than happy to answer any questions or help you if you stumble 
upon some issues when using nars. You can chat with me on [Discord.](https://discord.gg/ubsun8r).


## Getting started with examples

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
