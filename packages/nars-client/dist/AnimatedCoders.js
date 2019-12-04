"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nars_animated_pb_1 = require("./nars_animated_pb");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const decodeNumber = {
    decode: (x) => typeof x === "number",
};
const decodeAny = {
    decode: (_x) => true,
};
const unreachable = (exception) => {
    throw Error(exception || "Unreachable decoding path");
};
const decodeAdaptable = (decoder, node, retainedInstances) => {
    if (!node) {
        return unreachable();
    }
    const primitive = node.getPrimitive();
    if (primitive) {
        if (primitive.hasFloat() && decoder.decode(primitive.getFloat())) {
            return primitive.getFloat();
        }
        else if (primitive.hasString() && decoder.decode(primitive.getString())) {
            return primitive.getString();
        }
        else if (primitive.hasBool() && decoder.decode(primitive.getBool())) {
            return primitive.getBool();
        }
    }
    else if (node.hasNode()) {
        return decodeNode(decoder, node.getNode(), retainedInstances);
    }
    return unreachable();
};
const optDecodeAdaptable = (decoder, adaptable, retainedInstances) => {
    if (adaptable) {
        return decodeAdaptable(decoder, adaptable, retainedInstances);
    }
    return undefined;
};
const unary = nars_animated_pb_1.UnaryOperatorType;
const unaryOperators = {
    [unary.SQRT]: react_native_reanimated_1.default.sqrt,
    [unary.LOG]: react_native_reanimated_1.default.log,
    [unary.SIN]: react_native_reanimated_1.default.sin,
    [unary.COS]: react_native_reanimated_1.default.cos,
    [unary.TAN]: react_native_reanimated_1.default.tan,
    [unary.ACOS]: react_native_reanimated_1.default.acos,
    [unary.ASIN]: react_native_reanimated_1.default.asin,
    [unary.ATAN]: react_native_reanimated_1.default.atan,
    [unary.EXP]: react_native_reanimated_1.default.exp,
    [unary.ROUND]: react_native_reanimated_1.default.round,
    [unary.FLOOR]: react_native_reanimated_1.default.floor,
    [unary.CEIL]: react_native_reanimated_1.default.ceil,
    [unary.DEFINED]: react_native_reanimated_1.default.defined,
    [unary.NOT]: react_native_reanimated_1.default.not,
};
const derivedUnary = nars_animated_pb_1.UnaryDerivedOperatorType;
const derivedUnaryOpeartors = {
    [derivedUnary.ABS]: react_native_reanimated_1.default.abs,
    [derivedUnary.ACC]: react_native_reanimated_1.default.acc,
    [derivedUnary.DIFF]: react_native_reanimated_1.default.diff,
};
const multi = nars_animated_pb_1.MultiOperatorType;
const multiOperators = {
    [multi.ADD]: react_native_reanimated_1.default.add,
    [multi.SUB]: react_native_reanimated_1.default.sub,
    [multi.MULTIPLY]: react_native_reanimated_1.default.multiply,
    [multi.DIVIDE]: react_native_reanimated_1.default.divide,
    [multi.POW]: react_native_reanimated_1.default.pow,
    [multi.MODULO]: react_native_reanimated_1.default.modulo,
    [multi.AND]: react_native_reanimated_1.default.and,
    [multi.OR]: react_native_reanimated_1.default.or,
};
const binary = nars_animated_pb_1.BinaryOperatorType;
const binaryOperators = {
    [binary.MAX]: react_native_reanimated_1.default.max,
    [binary.MIN]: react_native_reanimated_1.default.min,
    [binary.LESSTHAN]: react_native_reanimated_1.default.lessThan,
    [binary.EQ]: react_native_reanimated_1.default.eq,
    [binary.GREATERTHAN]: react_native_reanimated_1.default.greaterThan,
    [binary.LESSOREQ]: react_native_reanimated_1.default.lessOrEq,
    [binary.GREATEROREQ]: react_native_reanimated_1.default.greaterOrEq,
    [binary.NEQ]: react_native_reanimated_1.default.neq,
};
const decodeValue = (decoder, value, retainedInstances) => {
    if (!value) {
        return unreachable();
    }
    const memoizedValue = retainedInstances.getValue(value);
    if (memoizedValue) {
        return memoizedValue;
    }
    else {
        const decode = () => {
            if (value.hasFloat() && decoder.decode(value.getFloat())) {
                return new react_native_reanimated_1.default.Value(value.getFloat());
            }
            else if (value.hasString() && decoder.decode(value.getString())) {
                return new react_native_reanimated_1.default.Value(value.getString());
            }
            else if (value.hasBool() && decoder.decode(value.getBool())) {
                return new react_native_reanimated_1.default.Value(value.getBool());
            }
            return unreachable();
        };
        const animatedValue = decode();
        retainedInstances.setValue(value, animatedValue);
        return animatedValue;
    }
};
const decodeClock = (clock, retainedInstances) => {
    if (!clock) {
        return unreachable();
    }
    const memoizedValue = retainedInstances.getClock(clock);
    if (memoizedValue) {
        return memoizedValue;
    }
    else {
        const animatedClock = new react_native_reanimated_1.default.Clock();
        retainedInstances.setClock(clock, animatedClock);
        return animatedClock;
    }
};
const convertExtrapolate = (e) => {
    if (e) {
        switch (e.getValue()) {
            case nars_animated_pb_1.ExtrapolateType.CLAMP:
                "Clamp";
            case nars_animated_pb_1.ExtrapolateType.EXTEND:
                "Extend";
            case nars_animated_pb_1.ExtrapolateType.IDENTITY:
                "Identity";
        }
    }
    return undefined;
};
const decodeInterpolationConfig = (config, retainedInstances) => ({
    inputRange: (config.getInputrangeList() || []).map(x => decodeAdaptable(decodeNumber, x, retainedInstances)),
    outputRange: (config.getOutputrangeList() || []).map(x => decodeAdaptable(decodeNumber, x, retainedInstances)),
    extrapolate: convertExtrapolate(config.getExtrapolate()),
    extrapolateLeft: convertExtrapolate(config.getExtrapolateleft()),
    extrapolateRight: convertExtrapolate(config.getExtrapolateright()),
});
const decodePhysicsAnimationState = (state, retainedInstances) => {
    const animation = state && state.getAnimation();
    if (animation && state) {
        return {
            finished: decodeValue(decodeNumber, animation.getFinished(), retainedInstances),
            position: decodeValue(decodeNumber, animation.getPosition(), retainedInstances),
            time: decodeValue(decodeNumber, animation.getTime(), retainedInstances),
            velocity: decodeValue(decodeNumber, state.getVelocity(), retainedInstances),
        };
    }
    return unreachable();
};
const decodeSpringConfig = (config, retainedInstances) => {
    if (!config) {
        return unreachable();
    }
    return {
        damping: decodeAdaptable(decodeNumber, config.getDamping(), retainedInstances),
        mass: decodeAdaptable(decodeNumber, config.getMass(), retainedInstances),
        stiffness: decodeAdaptable(decodeNumber, config.getStiffness(), retainedInstances),
        overshootClamping: decodeAdaptable(decodeNumber, config.getOvershootclamping(), retainedInstances),
        restSpeedThreshold: decodeAdaptable(decodeNumber, config.getRestspeedthreshold(), retainedInstances),
        restDisplacementThreshold: decodeAdaptable(decodeNumber, config.getRestdisplacementthreshold(), retainedInstances),
        toValue: decodeAdaptable(decodeNumber, config.getTovalue(), retainedInstances),
    };
};
const decodeDecayConfig = (config, retainedInstances) => {
    if (config && config.hasDeceleration()) {
        return {
            deceleration: decodeAdaptable(decodeNumber, config.getDeceleration(), retainedInstances),
        };
    }
    return unreachable();
};
const decodeTimingState = (state, retainedInstances) => {
    const animation = state && state.getAnimation();
    if (animation && state) {
        return {
            finished: decodeValue(decodeNumber, animation.getFinished(), retainedInstances),
            position: decodeValue(decodeNumber, animation.getPosition(), retainedInstances),
            time: decodeValue(decodeNumber, animation.getTime(), retainedInstances),
            frameTime: decodeValue(decodeNumber, state.getFrametime(), retainedInstances),
        };
    }
    return unreachable();
};
const decodeEasingFunction = (easing, _retainedInstances) => {
    // TODO: Handle easing
    if (!easing) {
        return react_native_reanimated_1.Easing.linear;
    }
    else if (easing.hasCustom()) {
        return react_native_reanimated_1.Easing.linear;
    }
    else if (easing.hasBuiltin()) {
        return react_native_reanimated_1.Easing.linear;
    }
    else {
        return unreachable();
    }
};
const decodeTimingConfig = (config, retainedInstances) => {
    if (config) {
        return {
            toValue: decodeAdaptable(decodeNumber, config.getTovalue(), retainedInstances),
            duration: decodeAdaptable(decodeNumber, config.getDuration(), retainedInstances),
            easing: decodeEasingFunction(config.getEasing(), retainedInstances),
        };
    }
    return unreachable();
};
const decodeNode = (decoder, node, retainedInstances) => {
    if (!node) {
        return unreachable();
    }
    return (() => {
        if (node.hasCond()) {
            const cond = node.getCond();
            return react_native_reanimated_1.default.cond(decodeAdaptable(decodeNumber, cond.getCondition(), retainedInstances), decodeAdaptable(decoder, cond.getIfnode(), retainedInstances), optDecodeAdaptable(decoder, cond.getElsenode(), retainedInstances));
        }
        else if (node.hasUnary()) {
            const unary = node.getUnary();
            const op = unaryOperators[unary.getOperator()];
            return op(decodeAdaptable(decodeNumber, unary.getValue(), retainedInstances));
        }
        else if (node.hasMulti()) {
            const multi = node.getMulti();
            const others = multi.getOthersList();
            const op = multiOperators[multi.getOperator()];
            return op(decodeAdaptable(decodeNumber, multi.getA(), retainedInstances), decodeAdaptable(decodeNumber, multi.getB(), retainedInstances), ...others.map(x => decodeAdaptable(decodeNumber, x, retainedInstances)));
        }
        else if (node.hasSetter()) {
            const setter = node.getSetter();
            return react_native_reanimated_1.default.set(decodeValue(decodeNumber, setter.getValuetobeupdated(), retainedInstances), decodeAdaptable(decodeNumber, setter.getTovalue(), retainedInstances));
        }
        else if (node.hasBinary()) {
            const binary = node.getBinary();
            const op = binaryOperators[binary.getOperator()];
            return op(decodeAdaptable(decodeNumber, binary.getLeft(), retainedInstances), decodeAdaptable(decodeNumber, binary.getRight(), retainedInstances));
        }
        else if (node.hasDerivedunary()) {
            const derivedUnary = node.getDerivedunary();
            const op = derivedUnaryOpeartors[derivedUnary.getOperator()];
            return op(decodeAdaptable(decodeNumber, derivedUnary.getValue(), retainedInstances));
        }
        else if (node.hasAnimation()) {
            const animationNode = node.getAnimation();
            if (animationNode.hasSpring()) {
                const animation = animationNode.getSpring();
                const clock = decodeClock(animation.getClock(), retainedInstances);
                return react_native_reanimated_1.default.spring(clock, decodePhysicsAnimationState(animation.getState(), retainedInstances), decodeSpringConfig(animation.getConfig(), retainedInstances));
            }
            else if (animationNode.hasDecay()) {
                const animation = animationNode.getDecay();
                const clock = decodeClock(animation.getClock(), retainedInstances);
                return react_native_reanimated_1.default.decay(clock, decodePhysicsAnimationState(animation.getState(), retainedInstances), decodeDecayConfig(animation.getConfig(), retainedInstances));
            }
            else if (animationNode.hasTiming()) {
                const animation = animationNode.getTiming();
                const clock = decodeClock(animation.getClock(), retainedInstances);
                return react_native_reanimated_1.default.timing(clock, decodeTimingState(animation.getState(), retainedInstances), decodeTimingConfig(animation.getConfig(), retainedInstances));
            }
        }
        else if (node.hasBlock()) {
            const values = node.getBlock();
            return react_native_reanimated_1.default.block(values
                .getValuesList()
                .map(x => decodeAdaptable(decoder, x, retainedInstances)));
        }
        else if (node.hasValue()) {
            return decodeValue(decodeNumber, node.getValue(), retainedInstances);
        }
        else if (node.hasConcat() && (decoder.decode("") || decoder.decode(1))) {
            const values = node.getConcat().getValuesList();
            return react_native_reanimated_1.default.concat(...values.map(x => decodeAdaptable(decoder, x, retainedInstances)));
        }
        else if (node.hasCall()) {
            // TODO: Implement call
            return unreachable("Animated.call is not implemented");
        }
        else if (node.hasDebug()) {
            const debug = node.getDebug();
            return react_native_reanimated_1.default.debug(debug.getDebugmessage(), decodeNode(decoder, debug.getValue(), retainedInstances));
        }
        else if (node.hasOnchange()) {
            const oc = node.getOnchange();
            return react_native_reanimated_1.default.onChange(decodeAdaptable(decodeNumber, oc.getValue(), retainedInstances), decodeAdaptable(decodeNumber, oc.getAction(), retainedInstances));
        }
        else if (node.hasClockoperation()) {
            const co = node.getClockoperation();
            if (co.hasClock()) {
                const clock = decodeClock(co.getClock(), retainedInstances);
                if (clock) {
                    const clockOperations = nars_animated_pb_1.ClockOperationType;
                    switch (co.getOperation()) {
                        case clockOperations.START:
                            return react_native_reanimated_1.default.startClock(clock);
                        case clockOperations.STOP:
                            return react_native_reanimated_1.default.stopClock(clock);
                        case clockOperations.ISRUNNING:
                            return react_native_reanimated_1.default.clockRunning(clock);
                    }
                }
            }
        }
        else if (node.hasClock()) {
            decodeClock(node.getClock(), retainedInstances);
        }
        else if (node.hasInterpolate()) {
            const i = node.getInterpolate();
            if (i.hasConfig()) {
                return react_native_reanimated_1.default.interpolate(decodeAdaptable(decodeNumber, i.getValue(), retainedInstances), decodeInterpolationConfig(i.getConfig(), retainedInstances));
            }
        }
        else if (node.hasColor()) {
            const c = node.getColor();
            if (c.hasR() && c.hasG() && c.hasB()) {
                const r = decodeAdaptable(decodeNumber, c.getR(), retainedInstances);
                const g = decodeAdaptable(decodeNumber, c.getG(), retainedInstances);
                const b = decodeAdaptable(decodeNumber, c.getB(), retainedInstances);
                const alpha = optDecodeAdaptable(decodeNumber, c.getAlpha(), retainedInstances);
                return react_native_reanimated_1.default.color(r, g, b, alpha);
            }
        }
        else if (node.hasDiffclamp()) {
            const dc = node.getDiffclamp();
            const value = decodeAdaptable(decodeNumber, dc.getValue(), retainedInstances);
            const minVal = decodeAdaptable(decodeNumber, dc.getMinval(), retainedInstances);
            const maxVal = decodeAdaptable(decodeNumber, dc.getMaxval(), retainedInstances);
            return react_native_reanimated_1.default.diffClamp(value, minVal, maxVal);
        }
        return unreachable();
    })();
};
const getListValues = (x) => {
    if (x) {
        const l = x.getListValue();
        return l ? l.getValuesList() : [];
    }
    else {
        return [];
    }
};
const ofValueOrAnimatedNode = (value, retainedInstances) => {
    if (value.hasNode()) {
        const animatedNode = value.getNode();
        if (animatedNode) {
            const memoized = retainedInstances.getNode(animatedNode);
            if (memoized) {
                return memoized;
            }
            const decoded = decodeNode(decodeAny, animatedNode.getNode(), retainedInstances);
            retainedInstances.setNode(animatedNode, decoded);
            return decoded;
        }
        return unreachable();
    }
    else if (value.hasNumberValue()) {
        return Number(value.getNumberValue());
    }
    else if (value.hasNullValue()) {
        return null;
    }
    else if (value.hasStringValue()) {
        return String(value.getStringValue());
    }
    else if (value.hasBoolValue()) {
        return Boolean(value.getBoolValue());
    }
    else if (value.hasStyleValue()) {
        return exports.decodeAnimatedStyle(value.getStyleValue(), retainedInstances);
    }
    else if (value.hasListValue()) {
        return getListValues(value).map(x => ofValueOrAnimatedNode(x, retainedInstances));
    }
    else if (value.hasUndefinedValue()) {
        return undefined;
    }
    else {
        return undefined;
    }
};
exports.decodeAnimatedStyle = (struct, retainedInstances) => {
    if (struct) {
        const fields = {};
        struct.getFieldsMap().forEach((value, key) => {
            fields[key] = ofValueOrAnimatedNode(value, retainedInstances);
        });
        return fields;
    }
    return {};
};
exports.updateAnimatedValue = (value, toValue, retainedInstances) => {
    if (value && toValue) {
        const animatedValue = decodeValue(decodeAny, value, retainedInstances);
        const adaptale = decodeAdaptable(decodeAny, toValue, retainedInstances);
        animatedValue.setValue(adaptale);
    }
};
