type t;

[@bs.new] [@bs.module] external make: string => t = "analytics-node";

type identifyPayload('a) = {
  .
  "anonymousId": string,
  "traits": Js.t({..} as 'a),
};

[@bs.send] external identify: (t, identifyPayload('any)) => unit = "identify";
let identify = (analytics, ~anonymousId, ~traits) =>
  identify(analytics, {"anonymousId": anonymousId, "traits": traits});

type trackPayload = {
  .
  "anonymousId": string,
  "event": string,
};

[@bs.send] external track: (t, trackPayload) => unit = "track";
let track = (analytics, ~anonymousId, ~event) =>
  track(analytics, {"anonymousId": anonymousId, "event": event});
