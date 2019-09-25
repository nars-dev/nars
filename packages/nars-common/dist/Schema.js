/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.StringValue = (function() {

    /**
     * Properties of a StringValue.
     * @exports IStringValue
     * @interface IStringValue
     * @property {string|null} [value] StringValue value
     */

    /**
     * Constructs a new StringValue.
     * @exports StringValue
     * @classdesc Represents a StringValue.
     * @implements IStringValue
     * @constructor
     * @param {IStringValue=} [properties] Properties to set
     */
    function StringValue(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * StringValue value.
     * @member {string} value
     * @memberof StringValue
     * @instance
     */
    StringValue.prototype.value = "";

    /**
     * Creates a new StringValue instance using the specified properties.
     * @function create
     * @memberof StringValue
     * @static
     * @param {IStringValue=} [properties] Properties to set
     * @returns {StringValue} StringValue instance
     */
    StringValue.create = function create(properties) {
        return new StringValue(properties);
    };

    /**
     * Encodes the specified StringValue message. Does not implicitly {@link StringValue.verify|verify} messages.
     * @function encode
     * @memberof StringValue
     * @static
     * @param {IStringValue} message StringValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StringValue.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
        return writer;
    };

    /**
     * Encodes the specified StringValue message, length delimited. Does not implicitly {@link StringValue.verify|verify} messages.
     * @function encodeDelimited
     * @memberof StringValue
     * @static
     * @param {IStringValue} message StringValue message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    StringValue.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a StringValue message from the specified reader or buffer.
     * @function decode
     * @memberof StringValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {StringValue} StringValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StringValue.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.StringValue();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a StringValue message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof StringValue
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {StringValue} StringValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    StringValue.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a StringValue message.
     * @function verify
     * @memberof StringValue
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    StringValue.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isString(message.value))
                return "value: string expected";
        return null;
    };

    /**
     * Creates a StringValue message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof StringValue
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {StringValue} StringValue
     */
    StringValue.fromObject = function fromObject(object) {
        if (object instanceof $root.StringValue)
            return object;
        var message = new $root.StringValue();
        if (object.value != null)
            message.value = String(object.value);
        return message;
    };

    /**
     * Creates a plain object from a StringValue message. Also converts values to other types if specified.
     * @function toObject
     * @memberof StringValue
     * @static
     * @param {StringValue} message StringValue
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    StringValue.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.value = "";
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        return object;
    };

    /**
     * Converts this StringValue to JSON.
     * @function toJSON
     * @memberof StringValue
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    StringValue.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return StringValue;
})();

$root.Int32Value = (function() {

    /**
     * Properties of an Int32Value.
     * @exports IInt32Value
     * @interface IInt32Value
     * @property {number|null} [value] Int32Value value
     */

    /**
     * Constructs a new Int32Value.
     * @exports Int32Value
     * @classdesc Represents an Int32Value.
     * @implements IInt32Value
     * @constructor
     * @param {IInt32Value=} [properties] Properties to set
     */
    function Int32Value(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Int32Value value.
     * @member {number} value
     * @memberof Int32Value
     * @instance
     */
    Int32Value.prototype.value = 0;

    /**
     * Creates a new Int32Value instance using the specified properties.
     * @function create
     * @memberof Int32Value
     * @static
     * @param {IInt32Value=} [properties] Properties to set
     * @returns {Int32Value} Int32Value instance
     */
    Int32Value.create = function create(properties) {
        return new Int32Value(properties);
    };

    /**
     * Encodes the specified Int32Value message. Does not implicitly {@link Int32Value.verify|verify} messages.
     * @function encode
     * @memberof Int32Value
     * @static
     * @param {IInt32Value} message Int32Value message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Int32Value.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.value);
        return writer;
    };

    /**
     * Encodes the specified Int32Value message, length delimited. Does not implicitly {@link Int32Value.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Int32Value
     * @static
     * @param {IInt32Value} message Int32Value message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Int32Value.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Int32Value message from the specified reader or buffer.
     * @function decode
     * @memberof Int32Value
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Int32Value} Int32Value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Int32Value.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Int32Value();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.value = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Int32Value message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Int32Value
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Int32Value} Int32Value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Int32Value.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Int32Value message.
     * @function verify
     * @memberof Int32Value
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Int32Value.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isInteger(message.value))
                return "value: integer expected";
        return null;
    };

    /**
     * Creates an Int32Value message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Int32Value
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Int32Value} Int32Value
     */
    Int32Value.fromObject = function fromObject(object) {
        if (object instanceof $root.Int32Value)
            return object;
        var message = new $root.Int32Value();
        if (object.value != null)
            message.value = object.value | 0;
        return message;
    };

    /**
     * Creates a plain object from an Int32Value message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Int32Value
     * @static
     * @param {Int32Value} message Int32Value
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Int32Value.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.value = 0;
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        return object;
    };

    /**
     * Converts this Int32Value to JSON.
     * @function toJSON
     * @memberof Int32Value
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Int32Value.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Int32Value;
})();

$root.Callback = (function() {

    /**
     * Properties of a Callback.
     * @exports ICallback
     * @interface ICallback
     * @property {number|null} [callId] Callback callId
     */

    /**
     * Constructs a new Callback.
     * @exports Callback
     * @classdesc Represents a Callback.
     * @implements ICallback
     * @constructor
     * @param {ICallback=} [properties] Properties to set
     */
    function Callback(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Callback callId.
     * @member {number} callId
     * @memberof Callback
     * @instance
     */
    Callback.prototype.callId = 0;

    /**
     * Creates a new Callback instance using the specified properties.
     * @function create
     * @memberof Callback
     * @static
     * @param {ICallback=} [properties] Properties to set
     * @returns {Callback} Callback instance
     */
    Callback.create = function create(properties) {
        return new Callback(properties);
    };

    /**
     * Encodes the specified Callback message. Does not implicitly {@link Callback.verify|verify} messages.
     * @function encode
     * @memberof Callback
     * @static
     * @param {ICallback} message Callback message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Callback.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.callId != null && message.hasOwnProperty("callId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.callId);
        return writer;
    };

    /**
     * Encodes the specified Callback message, length delimited. Does not implicitly {@link Callback.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Callback
     * @static
     * @param {ICallback} message Callback message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Callback.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Callback message from the specified reader or buffer.
     * @function decode
     * @memberof Callback
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Callback} Callback
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Callback.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Callback();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.callId = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Callback message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Callback
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Callback} Callback
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Callback.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Callback message.
     * @function verify
     * @memberof Callback
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Callback.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.callId != null && message.hasOwnProperty("callId"))
            if (!$util.isInteger(message.callId))
                return "callId: integer expected";
        return null;
    };

    /**
     * Creates a Callback message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Callback
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Callback} Callback
     */
    Callback.fromObject = function fromObject(object) {
        if (object instanceof $root.Callback)
            return object;
        var message = new $root.Callback();
        if (object.callId != null)
            message.callId = object.callId | 0;
        return message;
    };

    /**
     * Creates a plain object from a Callback message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Callback
     * @static
     * @param {Callback} message Callback
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Callback.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.callId = 0;
        if (message.callId != null && message.hasOwnProperty("callId"))
            object.callId = message.callId;
        return object;
    };

    /**
     * Converts this Callback to JSON.
     * @function toJSON
     * @memberof Callback
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Callback.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Callback;
})();

$root.LocalProp = (function() {

    /**
     * Properties of a LocalProp.
     * @exports ILocalProp
     * @interface ILocalProp
     * @property {string|null} [localKey] LocalProp localKey
     * @property {string|null} [propKey] LocalProp propKey
     */

    /**
     * Constructs a new LocalProp.
     * @exports LocalProp
     * @classdesc Represents a LocalProp.
     * @implements ILocalProp
     * @constructor
     * @param {ILocalProp=} [properties] Properties to set
     */
    function LocalProp(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * LocalProp localKey.
     * @member {string} localKey
     * @memberof LocalProp
     * @instance
     */
    LocalProp.prototype.localKey = "";

    /**
     * LocalProp propKey.
     * @member {string} propKey
     * @memberof LocalProp
     * @instance
     */
    LocalProp.prototype.propKey = "";

    /**
     * Creates a new LocalProp instance using the specified properties.
     * @function create
     * @memberof LocalProp
     * @static
     * @param {ILocalProp=} [properties] Properties to set
     * @returns {LocalProp} LocalProp instance
     */
    LocalProp.create = function create(properties) {
        return new LocalProp(properties);
    };

    /**
     * Encodes the specified LocalProp message. Does not implicitly {@link LocalProp.verify|verify} messages.
     * @function encode
     * @memberof LocalProp
     * @static
     * @param {ILocalProp} message LocalProp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LocalProp.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.localKey != null && message.hasOwnProperty("localKey"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.localKey);
        if (message.propKey != null && message.hasOwnProperty("propKey"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.propKey);
        return writer;
    };

    /**
     * Encodes the specified LocalProp message, length delimited. Does not implicitly {@link LocalProp.verify|verify} messages.
     * @function encodeDelimited
     * @memberof LocalProp
     * @static
     * @param {ILocalProp} message LocalProp message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    LocalProp.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a LocalProp message from the specified reader or buffer.
     * @function decode
     * @memberof LocalProp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {LocalProp} LocalProp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LocalProp.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.LocalProp();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.localKey = reader.string();
                break;
            case 2:
                message.propKey = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a LocalProp message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof LocalProp
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {LocalProp} LocalProp
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    LocalProp.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a LocalProp message.
     * @function verify
     * @memberof LocalProp
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    LocalProp.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.localKey != null && message.hasOwnProperty("localKey"))
            if (!$util.isString(message.localKey))
                return "localKey: string expected";
        if (message.propKey != null && message.hasOwnProperty("propKey"))
            if (!$util.isString(message.propKey))
                return "propKey: string expected";
        return null;
    };

    /**
     * Creates a LocalProp message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof LocalProp
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {LocalProp} LocalProp
     */
    LocalProp.fromObject = function fromObject(object) {
        if (object instanceof $root.LocalProp)
            return object;
        var message = new $root.LocalProp();
        if (object.localKey != null)
            message.localKey = String(object.localKey);
        if (object.propKey != null)
            message.propKey = String(object.propKey);
        return message;
    };

    /**
     * Creates a plain object from a LocalProp message. Also converts values to other types if specified.
     * @function toObject
     * @memberof LocalProp
     * @static
     * @param {LocalProp} message LocalProp
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    LocalProp.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.localKey = "";
            object.propKey = "";
        }
        if (message.localKey != null && message.hasOwnProperty("localKey"))
            object.localKey = message.localKey;
        if (message.propKey != null && message.hasOwnProperty("propKey"))
            object.propKey = message.propKey;
        return object;
    };

    /**
     * Converts this LocalProp to JSON.
     * @function toJSON
     * @memberof LocalProp
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    LocalProp.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return LocalProp;
})();

$root.CustomComponent = (function() {

    /**
     * Properties of a CustomComponent.
     * @exports ICustomComponent
     * @interface ICustomComponent
     * @property {string|null} [typeId] CustomComponent typeId
     * @property {Uint8Array|null} [contents] CustomComponent contents
     */

    /**
     * Constructs a new CustomComponent.
     * @exports CustomComponent
     * @classdesc Represents a CustomComponent.
     * @implements ICustomComponent
     * @constructor
     * @param {ICustomComponent=} [properties] Properties to set
     */
    function CustomComponent(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CustomComponent typeId.
     * @member {string} typeId
     * @memberof CustomComponent
     * @instance
     */
    CustomComponent.prototype.typeId = "";

    /**
     * CustomComponent contents.
     * @member {Uint8Array} contents
     * @memberof CustomComponent
     * @instance
     */
    CustomComponent.prototype.contents = $util.newBuffer([]);

    /**
     * Creates a new CustomComponent instance using the specified properties.
     * @function create
     * @memberof CustomComponent
     * @static
     * @param {ICustomComponent=} [properties] Properties to set
     * @returns {CustomComponent} CustomComponent instance
     */
    CustomComponent.create = function create(properties) {
        return new CustomComponent(properties);
    };

    /**
     * Encodes the specified CustomComponent message. Does not implicitly {@link CustomComponent.verify|verify} messages.
     * @function encode
     * @memberof CustomComponent
     * @static
     * @param {ICustomComponent} message CustomComponent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CustomComponent.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.typeId != null && message.hasOwnProperty("typeId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeId);
        if (message.contents != null && message.hasOwnProperty("contents"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.contents);
        return writer;
    };

    /**
     * Encodes the specified CustomComponent message, length delimited. Does not implicitly {@link CustomComponent.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CustomComponent
     * @static
     * @param {ICustomComponent} message CustomComponent message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CustomComponent.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CustomComponent message from the specified reader or buffer.
     * @function decode
     * @memberof CustomComponent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CustomComponent} CustomComponent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CustomComponent.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CustomComponent();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.typeId = reader.string();
                break;
            case 2:
                message.contents = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CustomComponent message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CustomComponent
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CustomComponent} CustomComponent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CustomComponent.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CustomComponent message.
     * @function verify
     * @memberof CustomComponent
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CustomComponent.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.typeId != null && message.hasOwnProperty("typeId"))
            if (!$util.isString(message.typeId))
                return "typeId: string expected";
        if (message.contents != null && message.hasOwnProperty("contents"))
            if (!(message.contents && typeof message.contents.length === "number" || $util.isString(message.contents)))
                return "contents: buffer expected";
        return null;
    };

    /**
     * Creates a CustomComponent message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CustomComponent
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CustomComponent} CustomComponent
     */
    CustomComponent.fromObject = function fromObject(object) {
        if (object instanceof $root.CustomComponent)
            return object;
        var message = new $root.CustomComponent();
        if (object.typeId != null)
            message.typeId = String(object.typeId);
        if (object.contents != null)
            if (typeof object.contents === "string")
                $util.base64.decode(object.contents, message.contents = $util.newBuffer($util.base64.length(object.contents)), 0);
            else if (object.contents.length)
                message.contents = object.contents;
        return message;
    };

    /**
     * Creates a plain object from a CustomComponent message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CustomComponent
     * @static
     * @param {CustomComponent} message CustomComponent
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CustomComponent.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.typeId = "";
            if (options.bytes === String)
                object.contents = "";
            else {
                object.contents = [];
                if (options.bytes !== Array)
                    object.contents = $util.newBuffer(object.contents);
            }
        }
        if (message.typeId != null && message.hasOwnProperty("typeId"))
            object.typeId = message.typeId;
        if (message.contents != null && message.hasOwnProperty("contents"))
            object.contents = options.bytes === String ? $util.base64.encode(message.contents, 0, message.contents.length) : options.bytes === Array ? Array.prototype.slice.call(message.contents) : message.contents;
        return object;
    };

    /**
     * Converts this CustomComponent to JSON.
     * @function toJSON
     * @memberof CustomComponent
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CustomComponent.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CustomComponent;
})();

$root.View = (function() {

    /**
     * Properties of a View.
     * @exports IView
     * @interface IView
     * @property {google.protobuf.IStruct|null} [style] View style
     * @property {Array.<IReactElement>|null} [children] View children
     */

    /**
     * Constructs a new View.
     * @exports View
     * @classdesc Represents a View.
     * @implements IView
     * @constructor
     * @param {IView=} [properties] Properties to set
     */
    function View(properties) {
        this.children = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * View style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof View
     * @instance
     */
    View.prototype.style = null;

    /**
     * View children.
     * @member {Array.<IReactElement>} children
     * @memberof View
     * @instance
     */
    View.prototype.children = $util.emptyArray;

    /**
     * Creates a new View instance using the specified properties.
     * @function create
     * @memberof View
     * @static
     * @param {IView=} [properties] Properties to set
     * @returns {View} View instance
     */
    View.create = function create(properties) {
        return new View(properties);
    };

    /**
     * Encodes the specified View message. Does not implicitly {@link View.verify|verify} messages.
     * @function encode
     * @memberof View
     * @static
     * @param {IView} message View message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    View.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.children != null && message.children.length)
            for (var i = 0; i < message.children.length; ++i)
                $root.ReactElement.encode(message.children[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified View message, length delimited. Does not implicitly {@link View.verify|verify} messages.
     * @function encodeDelimited
     * @memberof View
     * @static
     * @param {IView} message View message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    View.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a View message from the specified reader or buffer.
     * @function decode
     * @memberof View
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {View} View
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    View.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.View();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.children && message.children.length))
                    message.children = [];
                message.children.push($root.ReactElement.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a View message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof View
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {View} View
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    View.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a View message.
     * @function verify
     * @memberof View
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    View.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.children != null && message.hasOwnProperty("children")) {
            if (!Array.isArray(message.children))
                return "children: array expected";
            for (var i = 0; i < message.children.length; ++i) {
                var error = $root.ReactElement.verify(message.children[i]);
                if (error)
                    return "children." + error;
            }
        }
        return null;
    };

    /**
     * Creates a View message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof View
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {View} View
     */
    View.fromObject = function fromObject(object) {
        if (object instanceof $root.View)
            return object;
        var message = new $root.View();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".View.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.children) {
            if (!Array.isArray(object.children))
                throw TypeError(".View.children: array expected");
            message.children = [];
            for (var i = 0; i < object.children.length; ++i) {
                if (typeof object.children[i] !== "object")
                    throw TypeError(".View.children: object expected");
                message.children[i] = $root.ReactElement.fromObject(object.children[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a View message. Also converts values to other types if specified.
     * @function toObject
     * @memberof View
     * @static
     * @param {View} message View
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    View.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.children = [];
        if (options.defaults)
            object.style = null;
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.children && message.children.length) {
            object.children = [];
            for (var j = 0; j < message.children.length; ++j)
                object.children[j] = $root.ReactElement.toObject(message.children[j], options);
        }
        return object;
    };

    /**
     * Converts this View to JSON.
     * @function toJSON
     * @memberof View
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    View.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return View;
})();

$root.FlatList = (function() {

    /**
     * Properties of a FlatList.
     * @exports IFlatList
     * @interface IFlatList
     * @property {google.protobuf.IStruct|null} [style] FlatList style
     * @property {ICallback|null} [onEndReached] FlatList onEndReached
     * @property {IInt32Value|null} [onEndReachedThreshold] FlatList onEndReachedThreshold
     * @property {Array.<IReactElement>|null} [keyedChildren] FlatList keyedChildren
     * @property {Array.<ILocalProp>|null} [localProps] FlatList localProps
     */

    /**
     * Constructs a new FlatList.
     * @exports FlatList
     * @classdesc Represents a FlatList.
     * @implements IFlatList
     * @constructor
     * @param {IFlatList=} [properties] Properties to set
     */
    function FlatList(properties) {
        this.keyedChildren = [];
        this.localProps = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FlatList style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof FlatList
     * @instance
     */
    FlatList.prototype.style = null;

    /**
     * FlatList onEndReached.
     * @member {ICallback|null|undefined} onEndReached
     * @memberof FlatList
     * @instance
     */
    FlatList.prototype.onEndReached = null;

    /**
     * FlatList onEndReachedThreshold.
     * @member {IInt32Value|null|undefined} onEndReachedThreshold
     * @memberof FlatList
     * @instance
     */
    FlatList.prototype.onEndReachedThreshold = null;

    /**
     * FlatList keyedChildren.
     * @member {Array.<IReactElement>} keyedChildren
     * @memberof FlatList
     * @instance
     */
    FlatList.prototype.keyedChildren = $util.emptyArray;

    /**
     * FlatList localProps.
     * @member {Array.<ILocalProp>} localProps
     * @memberof FlatList
     * @instance
     */
    FlatList.prototype.localProps = $util.emptyArray;

    /**
     * Creates a new FlatList instance using the specified properties.
     * @function create
     * @memberof FlatList
     * @static
     * @param {IFlatList=} [properties] Properties to set
     * @returns {FlatList} FlatList instance
     */
    FlatList.create = function create(properties) {
        return new FlatList(properties);
    };

    /**
     * Encodes the specified FlatList message. Does not implicitly {@link FlatList.verify|verify} messages.
     * @function encode
     * @memberof FlatList
     * @static
     * @param {IFlatList} message FlatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FlatList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.onEndReached != null && message.hasOwnProperty("onEndReached"))
            $root.Callback.encode(message.onEndReached, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.onEndReachedThreshold != null && message.hasOwnProperty("onEndReachedThreshold"))
            $root.Int32Value.encode(message.onEndReachedThreshold, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.keyedChildren != null && message.keyedChildren.length)
            for (var i = 0; i < message.keyedChildren.length; ++i)
                $root.ReactElement.encode(message.keyedChildren[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.localProps != null && message.localProps.length)
            for (var i = 0; i < message.localProps.length; ++i)
                $root.LocalProp.encode(message.localProps[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified FlatList message, length delimited. Does not implicitly {@link FlatList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FlatList
     * @static
     * @param {IFlatList} message FlatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FlatList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FlatList message from the specified reader or buffer.
     * @function decode
     * @memberof FlatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FlatList} FlatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FlatList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FlatList();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                message.onEndReached = $root.Callback.decode(reader, reader.uint32());
                break;
            case 3:
                message.onEndReachedThreshold = $root.Int32Value.decode(reader, reader.uint32());
                break;
            case 4:
                if (!(message.keyedChildren && message.keyedChildren.length))
                    message.keyedChildren = [];
                message.keyedChildren.push($root.ReactElement.decode(reader, reader.uint32()));
                break;
            case 5:
                if (!(message.localProps && message.localProps.length))
                    message.localProps = [];
                message.localProps.push($root.LocalProp.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a FlatList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FlatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FlatList} FlatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FlatList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FlatList message.
     * @function verify
     * @memberof FlatList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FlatList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.onEndReached != null && message.hasOwnProperty("onEndReached")) {
            var error = $root.Callback.verify(message.onEndReached);
            if (error)
                return "onEndReached." + error;
        }
        if (message.onEndReachedThreshold != null && message.hasOwnProperty("onEndReachedThreshold")) {
            var error = $root.Int32Value.verify(message.onEndReachedThreshold);
            if (error)
                return "onEndReachedThreshold." + error;
        }
        if (message.keyedChildren != null && message.hasOwnProperty("keyedChildren")) {
            if (!Array.isArray(message.keyedChildren))
                return "keyedChildren: array expected";
            for (var i = 0; i < message.keyedChildren.length; ++i) {
                var error = $root.ReactElement.verify(message.keyedChildren[i]);
                if (error)
                    return "keyedChildren." + error;
            }
        }
        if (message.localProps != null && message.hasOwnProperty("localProps")) {
            if (!Array.isArray(message.localProps))
                return "localProps: array expected";
            for (var i = 0; i < message.localProps.length; ++i) {
                var error = $root.LocalProp.verify(message.localProps[i]);
                if (error)
                    return "localProps." + error;
            }
        }
        return null;
    };

    /**
     * Creates a FlatList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FlatList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FlatList} FlatList
     */
    FlatList.fromObject = function fromObject(object) {
        if (object instanceof $root.FlatList)
            return object;
        var message = new $root.FlatList();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".FlatList.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.onEndReached != null) {
            if (typeof object.onEndReached !== "object")
                throw TypeError(".FlatList.onEndReached: object expected");
            message.onEndReached = $root.Callback.fromObject(object.onEndReached);
        }
        if (object.onEndReachedThreshold != null) {
            if (typeof object.onEndReachedThreshold !== "object")
                throw TypeError(".FlatList.onEndReachedThreshold: object expected");
            message.onEndReachedThreshold = $root.Int32Value.fromObject(object.onEndReachedThreshold);
        }
        if (object.keyedChildren) {
            if (!Array.isArray(object.keyedChildren))
                throw TypeError(".FlatList.keyedChildren: array expected");
            message.keyedChildren = [];
            for (var i = 0; i < object.keyedChildren.length; ++i) {
                if (typeof object.keyedChildren[i] !== "object")
                    throw TypeError(".FlatList.keyedChildren: object expected");
                message.keyedChildren[i] = $root.ReactElement.fromObject(object.keyedChildren[i]);
            }
        }
        if (object.localProps) {
            if (!Array.isArray(object.localProps))
                throw TypeError(".FlatList.localProps: array expected");
            message.localProps = [];
            for (var i = 0; i < object.localProps.length; ++i) {
                if (typeof object.localProps[i] !== "object")
                    throw TypeError(".FlatList.localProps: object expected");
                message.localProps[i] = $root.LocalProp.fromObject(object.localProps[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a FlatList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FlatList
     * @static
     * @param {FlatList} message FlatList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FlatList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.keyedChildren = [];
            object.localProps = [];
        }
        if (options.defaults) {
            object.style = null;
            object.onEndReached = null;
            object.onEndReachedThreshold = null;
        }
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.onEndReached != null && message.hasOwnProperty("onEndReached"))
            object.onEndReached = $root.Callback.toObject(message.onEndReached, options);
        if (message.onEndReachedThreshold != null && message.hasOwnProperty("onEndReachedThreshold"))
            object.onEndReachedThreshold = $root.Int32Value.toObject(message.onEndReachedThreshold, options);
        if (message.keyedChildren && message.keyedChildren.length) {
            object.keyedChildren = [];
            for (var j = 0; j < message.keyedChildren.length; ++j)
                object.keyedChildren[j] = $root.ReactElement.toObject(message.keyedChildren[j], options);
        }
        if (message.localProps && message.localProps.length) {
            object.localProps = [];
            for (var j = 0; j < message.localProps.length; ++j)
                object.localProps[j] = $root.LocalProp.toObject(message.localProps[j], options);
        }
        return object;
    };

    /**
     * Converts this FlatList to JSON.
     * @function toJSON
     * @memberof FlatList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FlatList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FlatList;
})();

$root.TouchableOpacity = (function() {

    /**
     * Properties of a TouchableOpacity.
     * @exports ITouchableOpacity
     * @interface ITouchableOpacity
     * @property {ICallback|null} [onPress] TouchableOpacity onPress
     * @property {Array.<IReactElement>|null} [children] TouchableOpacity children
     * @property {Array.<ILocalProp>|null} [localProps] TouchableOpacity localProps
     */

    /**
     * Constructs a new TouchableOpacity.
     * @exports TouchableOpacity
     * @classdesc Represents a TouchableOpacity.
     * @implements ITouchableOpacity
     * @constructor
     * @param {ITouchableOpacity=} [properties] Properties to set
     */
    function TouchableOpacity(properties) {
        this.children = [];
        this.localProps = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TouchableOpacity onPress.
     * @member {ICallback|null|undefined} onPress
     * @memberof TouchableOpacity
     * @instance
     */
    TouchableOpacity.prototype.onPress = null;

    /**
     * TouchableOpacity children.
     * @member {Array.<IReactElement>} children
     * @memberof TouchableOpacity
     * @instance
     */
    TouchableOpacity.prototype.children = $util.emptyArray;

    /**
     * TouchableOpacity localProps.
     * @member {Array.<ILocalProp>} localProps
     * @memberof TouchableOpacity
     * @instance
     */
    TouchableOpacity.prototype.localProps = $util.emptyArray;

    /**
     * Creates a new TouchableOpacity instance using the specified properties.
     * @function create
     * @memberof TouchableOpacity
     * @static
     * @param {ITouchableOpacity=} [properties] Properties to set
     * @returns {TouchableOpacity} TouchableOpacity instance
     */
    TouchableOpacity.create = function create(properties) {
        return new TouchableOpacity(properties);
    };

    /**
     * Encodes the specified TouchableOpacity message. Does not implicitly {@link TouchableOpacity.verify|verify} messages.
     * @function encode
     * @memberof TouchableOpacity
     * @static
     * @param {ITouchableOpacity} message TouchableOpacity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TouchableOpacity.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.onPress != null && message.hasOwnProperty("onPress"))
            $root.Callback.encode(message.onPress, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.children != null && message.children.length)
            for (var i = 0; i < message.children.length; ++i)
                $root.ReactElement.encode(message.children[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.localProps != null && message.localProps.length)
            for (var i = 0; i < message.localProps.length; ++i)
                $root.LocalProp.encode(message.localProps[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified TouchableOpacity message, length delimited. Does not implicitly {@link TouchableOpacity.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TouchableOpacity
     * @static
     * @param {ITouchableOpacity} message TouchableOpacity message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TouchableOpacity.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TouchableOpacity message from the specified reader or buffer.
     * @function decode
     * @memberof TouchableOpacity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TouchableOpacity} TouchableOpacity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TouchableOpacity.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TouchableOpacity();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.onPress = $root.Callback.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.children && message.children.length))
                    message.children = [];
                message.children.push($root.ReactElement.decode(reader, reader.uint32()));
                break;
            case 3:
                if (!(message.localProps && message.localProps.length))
                    message.localProps = [];
                message.localProps.push($root.LocalProp.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TouchableOpacity message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TouchableOpacity
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TouchableOpacity} TouchableOpacity
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TouchableOpacity.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TouchableOpacity message.
     * @function verify
     * @memberof TouchableOpacity
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TouchableOpacity.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.onPress != null && message.hasOwnProperty("onPress")) {
            var error = $root.Callback.verify(message.onPress);
            if (error)
                return "onPress." + error;
        }
        if (message.children != null && message.hasOwnProperty("children")) {
            if (!Array.isArray(message.children))
                return "children: array expected";
            for (var i = 0; i < message.children.length; ++i) {
                var error = $root.ReactElement.verify(message.children[i]);
                if (error)
                    return "children." + error;
            }
        }
        if (message.localProps != null && message.hasOwnProperty("localProps")) {
            if (!Array.isArray(message.localProps))
                return "localProps: array expected";
            for (var i = 0; i < message.localProps.length; ++i) {
                var error = $root.LocalProp.verify(message.localProps[i]);
                if (error)
                    return "localProps." + error;
            }
        }
        return null;
    };

    /**
     * Creates a TouchableOpacity message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TouchableOpacity
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TouchableOpacity} TouchableOpacity
     */
    TouchableOpacity.fromObject = function fromObject(object) {
        if (object instanceof $root.TouchableOpacity)
            return object;
        var message = new $root.TouchableOpacity();
        if (object.onPress != null) {
            if (typeof object.onPress !== "object")
                throw TypeError(".TouchableOpacity.onPress: object expected");
            message.onPress = $root.Callback.fromObject(object.onPress);
        }
        if (object.children) {
            if (!Array.isArray(object.children))
                throw TypeError(".TouchableOpacity.children: array expected");
            message.children = [];
            for (var i = 0; i < object.children.length; ++i) {
                if (typeof object.children[i] !== "object")
                    throw TypeError(".TouchableOpacity.children: object expected");
                message.children[i] = $root.ReactElement.fromObject(object.children[i]);
            }
        }
        if (object.localProps) {
            if (!Array.isArray(object.localProps))
                throw TypeError(".TouchableOpacity.localProps: array expected");
            message.localProps = [];
            for (var i = 0; i < object.localProps.length; ++i) {
                if (typeof object.localProps[i] !== "object")
                    throw TypeError(".TouchableOpacity.localProps: object expected");
                message.localProps[i] = $root.LocalProp.fromObject(object.localProps[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a TouchableOpacity message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TouchableOpacity
     * @static
     * @param {TouchableOpacity} message TouchableOpacity
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TouchableOpacity.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.children = [];
            object.localProps = [];
        }
        if (options.defaults)
            object.onPress = null;
        if (message.onPress != null && message.hasOwnProperty("onPress"))
            object.onPress = $root.Callback.toObject(message.onPress, options);
        if (message.children && message.children.length) {
            object.children = [];
            for (var j = 0; j < message.children.length; ++j)
                object.children[j] = $root.ReactElement.toObject(message.children[j], options);
        }
        if (message.localProps && message.localProps.length) {
            object.localProps = [];
            for (var j = 0; j < message.localProps.length; ++j)
                object.localProps[j] = $root.LocalProp.toObject(message.localProps[j], options);
        }
        return object;
    };

    /**
     * Converts this TouchableOpacity to JSON.
     * @function toJSON
     * @memberof TouchableOpacity
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TouchableOpacity.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TouchableOpacity;
})();

$root.RawText = (function() {

    /**
     * Properties of a RawText.
     * @exports IRawText
     * @interface IRawText
     * @property {string|null} [text] RawText text
     */

    /**
     * Constructs a new RawText.
     * @exports RawText
     * @classdesc Represents a RawText.
     * @implements IRawText
     * @constructor
     * @param {IRawText=} [properties] Properties to set
     */
    function RawText(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RawText text.
     * @member {string} text
     * @memberof RawText
     * @instance
     */
    RawText.prototype.text = "";

    /**
     * Creates a new RawText instance using the specified properties.
     * @function create
     * @memberof RawText
     * @static
     * @param {IRawText=} [properties] Properties to set
     * @returns {RawText} RawText instance
     */
    RawText.create = function create(properties) {
        return new RawText(properties);
    };

    /**
     * Encodes the specified RawText message. Does not implicitly {@link RawText.verify|verify} messages.
     * @function encode
     * @memberof RawText
     * @static
     * @param {IRawText} message RawText message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RawText.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.text != null && message.hasOwnProperty("text"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.text);
        return writer;
    };

    /**
     * Encodes the specified RawText message, length delimited. Does not implicitly {@link RawText.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RawText
     * @static
     * @param {IRawText} message RawText message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RawText.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RawText message from the specified reader or buffer.
     * @function decode
     * @memberof RawText
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RawText} RawText
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RawText.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RawText();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.text = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a RawText message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RawText
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RawText} RawText
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RawText.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RawText message.
     * @function verify
     * @memberof RawText
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RawText.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.text != null && message.hasOwnProperty("text"))
            if (!$util.isString(message.text))
                return "text: string expected";
        return null;
    };

    /**
     * Creates a RawText message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RawText
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RawText} RawText
     */
    RawText.fromObject = function fromObject(object) {
        if (object instanceof $root.RawText)
            return object;
        var message = new $root.RawText();
        if (object.text != null)
            message.text = String(object.text);
        return message;
    };

    /**
     * Creates a plain object from a RawText message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RawText
     * @static
     * @param {RawText} message RawText
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RawText.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.text = "";
        if (message.text != null && message.hasOwnProperty("text"))
            object.text = message.text;
        return object;
    };

    /**
     * Converts this RawText to JSON.
     * @function toJSON
     * @memberof RawText
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RawText.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RawText;
})();

$root.Text = (function() {

    /**
     * Properties of a Text.
     * @exports IText
     * @interface IText
     * @property {google.protobuf.IStruct|null} [style] Text style
     * @property {Array.<IReactElement>|null} [children] Text children
     */

    /**
     * Constructs a new Text.
     * @exports Text
     * @classdesc Represents a Text.
     * @implements IText
     * @constructor
     * @param {IText=} [properties] Properties to set
     */
    function Text(properties) {
        this.children = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Text style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof Text
     * @instance
     */
    Text.prototype.style = null;

    /**
     * Text children.
     * @member {Array.<IReactElement>} children
     * @memberof Text
     * @instance
     */
    Text.prototype.children = $util.emptyArray;

    /**
     * Creates a new Text instance using the specified properties.
     * @function create
     * @memberof Text
     * @static
     * @param {IText=} [properties] Properties to set
     * @returns {Text} Text instance
     */
    Text.create = function create(properties) {
        return new Text(properties);
    };

    /**
     * Encodes the specified Text message. Does not implicitly {@link Text.verify|verify} messages.
     * @function encode
     * @memberof Text
     * @static
     * @param {IText} message Text message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Text.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.children != null && message.children.length)
            for (var i = 0; i < message.children.length; ++i)
                $root.ReactElement.encode(message.children[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Text message, length delimited. Does not implicitly {@link Text.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Text
     * @static
     * @param {IText} message Text message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Text.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Text message from the specified reader or buffer.
     * @function decode
     * @memberof Text
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Text} Text
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Text.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Text();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                if (!(message.children && message.children.length))
                    message.children = [];
                message.children.push($root.ReactElement.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Text message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Text
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Text} Text
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Text.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Text message.
     * @function verify
     * @memberof Text
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Text.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.children != null && message.hasOwnProperty("children")) {
            if (!Array.isArray(message.children))
                return "children: array expected";
            for (var i = 0; i < message.children.length; ++i) {
                var error = $root.ReactElement.verify(message.children[i]);
                if (error)
                    return "children." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Text message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Text
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Text} Text
     */
    Text.fromObject = function fromObject(object) {
        if (object instanceof $root.Text)
            return object;
        var message = new $root.Text();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".Text.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.children) {
            if (!Array.isArray(object.children))
                throw TypeError(".Text.children: array expected");
            message.children = [];
            for (var i = 0; i < object.children.length; ++i) {
                if (typeof object.children[i] !== "object")
                    throw TypeError(".Text.children: object expected");
                message.children[i] = $root.ReactElement.fromObject(object.children[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Text message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Text
     * @static
     * @param {Text} message Text
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Text.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.children = [];
        if (options.defaults)
            object.style = null;
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.children && message.children.length) {
            object.children = [];
            for (var j = 0; j < message.children.length; ++j)
                object.children[j] = $root.ReactElement.toObject(message.children[j], options);
        }
        return object;
    };

    /**
     * Converts this Text to JSON.
     * @function toJSON
     * @memberof Text
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Text.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Text;
})();

$root.TextInput = (function() {

    /**
     * Properties of a TextInput.
     * @exports ITextInput
     * @interface ITextInput
     * @property {google.protobuf.IStruct|null} [style] TextInput style
     * @property {IStringValue|null} [placeholderTextColor] TextInput placeholderTextColor
     * @property {IStringValue|null} [placeholder] TextInput placeholder
     * @property {string|null} [value] TextInput value
     * @property {Array.<ILocalProp>|null} [localProps] TextInput localProps
     * @property {ICallback|null} [onValueChange] TextInput onValueChange
     */

    /**
     * Constructs a new TextInput.
     * @exports TextInput
     * @classdesc Represents a TextInput.
     * @implements ITextInput
     * @constructor
     * @param {ITextInput=} [properties] Properties to set
     */
    function TextInput(properties) {
        this.localProps = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * TextInput style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.style = null;

    /**
     * TextInput placeholderTextColor.
     * @member {IStringValue|null|undefined} placeholderTextColor
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.placeholderTextColor = null;

    /**
     * TextInput placeholder.
     * @member {IStringValue|null|undefined} placeholder
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.placeholder = null;

    /**
     * TextInput value.
     * @member {string} value
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.value = "";

    /**
     * TextInput localProps.
     * @member {Array.<ILocalProp>} localProps
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.localProps = $util.emptyArray;

    /**
     * TextInput onValueChange.
     * @member {ICallback|null|undefined} onValueChange
     * @memberof TextInput
     * @instance
     */
    TextInput.prototype.onValueChange = null;

    /**
     * Creates a new TextInput instance using the specified properties.
     * @function create
     * @memberof TextInput
     * @static
     * @param {ITextInput=} [properties] Properties to set
     * @returns {TextInput} TextInput instance
     */
    TextInput.create = function create(properties) {
        return new TextInput(properties);
    };

    /**
     * Encodes the specified TextInput message. Does not implicitly {@link TextInput.verify|verify} messages.
     * @function encode
     * @memberof TextInput
     * @static
     * @param {ITextInput} message TextInput message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextInput.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.placeholderTextColor != null && message.hasOwnProperty("placeholderTextColor"))
            $root.StringValue.encode(message.placeholderTextColor, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.placeholder != null && message.hasOwnProperty("placeholder"))
            $root.StringValue.encode(message.placeholder, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.value);
        if (message.localProps != null && message.localProps.length)
            for (var i = 0; i < message.localProps.length; ++i)
                $root.LocalProp.encode(message.localProps[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange"))
            $root.Callback.encode(message.onValueChange, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified TextInput message, length delimited. Does not implicitly {@link TextInput.verify|verify} messages.
     * @function encodeDelimited
     * @memberof TextInput
     * @static
     * @param {ITextInput} message TextInput message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    TextInput.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a TextInput message from the specified reader or buffer.
     * @function decode
     * @memberof TextInput
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {TextInput} TextInput
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextInput.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.TextInput();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                message.placeholderTextColor = $root.StringValue.decode(reader, reader.uint32());
                break;
            case 3:
                message.placeholder = $root.StringValue.decode(reader, reader.uint32());
                break;
            case 4:
                message.value = reader.string();
                break;
            case 5:
                if (!(message.localProps && message.localProps.length))
                    message.localProps = [];
                message.localProps.push($root.LocalProp.decode(reader, reader.uint32()));
                break;
            case 6:
                message.onValueChange = $root.Callback.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a TextInput message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof TextInput
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {TextInput} TextInput
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    TextInput.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a TextInput message.
     * @function verify
     * @memberof TextInput
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    TextInput.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.placeholderTextColor != null && message.hasOwnProperty("placeholderTextColor")) {
            var error = $root.StringValue.verify(message.placeholderTextColor);
            if (error)
                return "placeholderTextColor." + error;
        }
        if (message.placeholder != null && message.hasOwnProperty("placeholder")) {
            var error = $root.StringValue.verify(message.placeholder);
            if (error)
                return "placeholder." + error;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            if (!$util.isString(message.value))
                return "value: string expected";
        if (message.localProps != null && message.hasOwnProperty("localProps")) {
            if (!Array.isArray(message.localProps))
                return "localProps: array expected";
            for (var i = 0; i < message.localProps.length; ++i) {
                var error = $root.LocalProp.verify(message.localProps[i]);
                if (error)
                    return "localProps." + error;
            }
        }
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange")) {
            var error = $root.Callback.verify(message.onValueChange);
            if (error)
                return "onValueChange." + error;
        }
        return null;
    };

    /**
     * Creates a TextInput message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof TextInput
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {TextInput} TextInput
     */
    TextInput.fromObject = function fromObject(object) {
        if (object instanceof $root.TextInput)
            return object;
        var message = new $root.TextInput();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".TextInput.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.placeholderTextColor != null) {
            if (typeof object.placeholderTextColor !== "object")
                throw TypeError(".TextInput.placeholderTextColor: object expected");
            message.placeholderTextColor = $root.StringValue.fromObject(object.placeholderTextColor);
        }
        if (object.placeholder != null) {
            if (typeof object.placeholder !== "object")
                throw TypeError(".TextInput.placeholder: object expected");
            message.placeholder = $root.StringValue.fromObject(object.placeholder);
        }
        if (object.value != null)
            message.value = String(object.value);
        if (object.localProps) {
            if (!Array.isArray(object.localProps))
                throw TypeError(".TextInput.localProps: array expected");
            message.localProps = [];
            for (var i = 0; i < object.localProps.length; ++i) {
                if (typeof object.localProps[i] !== "object")
                    throw TypeError(".TextInput.localProps: object expected");
                message.localProps[i] = $root.LocalProp.fromObject(object.localProps[i]);
            }
        }
        if (object.onValueChange != null) {
            if (typeof object.onValueChange !== "object")
                throw TypeError(".TextInput.onValueChange: object expected");
            message.onValueChange = $root.Callback.fromObject(object.onValueChange);
        }
        return message;
    };

    /**
     * Creates a plain object from a TextInput message. Also converts values to other types if specified.
     * @function toObject
     * @memberof TextInput
     * @static
     * @param {TextInput} message TextInput
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    TextInput.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.localProps = [];
        if (options.defaults) {
            object.style = null;
            object.placeholderTextColor = null;
            object.placeholder = null;
            object.value = "";
            object.onValueChange = null;
        }
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.placeholderTextColor != null && message.hasOwnProperty("placeholderTextColor"))
            object.placeholderTextColor = $root.StringValue.toObject(message.placeholderTextColor, options);
        if (message.placeholder != null && message.hasOwnProperty("placeholder"))
            object.placeholder = $root.StringValue.toObject(message.placeholder, options);
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        if (message.localProps && message.localProps.length) {
            object.localProps = [];
            for (var j = 0; j < message.localProps.length; ++j)
                object.localProps[j] = $root.LocalProp.toObject(message.localProps[j], options);
        }
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange"))
            object.onValueChange = $root.Callback.toObject(message.onValueChange, options);
        return object;
    };

    /**
     * Converts this TextInput to JSON.
     * @function toJSON
     * @memberof TextInput
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    TextInput.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return TextInput;
})();

$root.Switch = (function() {

    /**
     * Properties of a Switch.
     * @exports ISwitch
     * @interface ISwitch
     * @property {google.protobuf.IStruct|null} [style] Switch style
     * @property {boolean|null} [value] Switch value
     * @property {ICallback|null} [onValueChange] Switch onValueChange
     */

    /**
     * Constructs a new Switch.
     * @exports Switch
     * @classdesc Represents a Switch.
     * @implements ISwitch
     * @constructor
     * @param {ISwitch=} [properties] Properties to set
     */
    function Switch(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Switch style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof Switch
     * @instance
     */
    Switch.prototype.style = null;

    /**
     * Switch value.
     * @member {boolean} value
     * @memberof Switch
     * @instance
     */
    Switch.prototype.value = false;

    /**
     * Switch onValueChange.
     * @member {ICallback|null|undefined} onValueChange
     * @memberof Switch
     * @instance
     */
    Switch.prototype.onValueChange = null;

    /**
     * Creates a new Switch instance using the specified properties.
     * @function create
     * @memberof Switch
     * @static
     * @param {ISwitch=} [properties] Properties to set
     * @returns {Switch} Switch instance
     */
    Switch.create = function create(properties) {
        return new Switch(properties);
    };

    /**
     * Encodes the specified Switch message. Does not implicitly {@link Switch.verify|verify} messages.
     * @function encode
     * @memberof Switch
     * @static
     * @param {ISwitch} message Switch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Switch.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.value != null && message.hasOwnProperty("value"))
            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.value);
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange"))
            $root.Callback.encode(message.onValueChange, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Switch message, length delimited. Does not implicitly {@link Switch.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Switch
     * @static
     * @param {ISwitch} message Switch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Switch.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Switch message from the specified reader or buffer.
     * @function decode
     * @memberof Switch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Switch} Switch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Switch.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Switch();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                message.value = reader.bool();
                break;
            case 3:
                message.onValueChange = $root.Callback.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Switch message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Switch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Switch} Switch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Switch.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Switch message.
     * @function verify
     * @memberof Switch
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Switch.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.value != null && message.hasOwnProperty("value"))
            if (typeof message.value !== "boolean")
                return "value: boolean expected";
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange")) {
            var error = $root.Callback.verify(message.onValueChange);
            if (error)
                return "onValueChange." + error;
        }
        return null;
    };

    /**
     * Creates a Switch message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Switch
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Switch} Switch
     */
    Switch.fromObject = function fromObject(object) {
        if (object instanceof $root.Switch)
            return object;
        var message = new $root.Switch();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".Switch.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.value != null)
            message.value = Boolean(object.value);
        if (object.onValueChange != null) {
            if (typeof object.onValueChange !== "object")
                throw TypeError(".Switch.onValueChange: object expected");
            message.onValueChange = $root.Callback.fromObject(object.onValueChange);
        }
        return message;
    };

    /**
     * Creates a plain object from a Switch message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Switch
     * @static
     * @param {Switch} message Switch
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Switch.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.style = null;
            object.value = false;
            object.onValueChange = null;
        }
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.value != null && message.hasOwnProperty("value"))
            object.value = message.value;
        if (message.onValueChange != null && message.hasOwnProperty("onValueChange"))
            object.onValueChange = $root.Callback.toObject(message.onValueChange, options);
        return object;
    };

    /**
     * Converts this Switch to JSON.
     * @function toJSON
     * @memberof Switch
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Switch.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Switch;
})();

$root.Image = (function() {

    /**
     * Properties of an Image.
     * @exports IImage
     * @interface IImage
     * @property {google.protobuf.IStruct|null} [style] Image style
     * @property {string|null} [sourceURLString] Image sourceURLString
     */

    /**
     * Constructs a new Image.
     * @exports Image
     * @classdesc Represents an Image.
     * @implements IImage
     * @constructor
     * @param {IImage=} [properties] Properties to set
     */
    function Image(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Image style.
     * @member {google.protobuf.IStruct|null|undefined} style
     * @memberof Image
     * @instance
     */
    Image.prototype.style = null;

    /**
     * Image sourceURLString.
     * @member {string} sourceURLString
     * @memberof Image
     * @instance
     */
    Image.prototype.sourceURLString = "";

    /**
     * Creates a new Image instance using the specified properties.
     * @function create
     * @memberof Image
     * @static
     * @param {IImage=} [properties] Properties to set
     * @returns {Image} Image instance
     */
    Image.create = function create(properties) {
        return new Image(properties);
    };

    /**
     * Encodes the specified Image message. Does not implicitly {@link Image.verify|verify} messages.
     * @function encode
     * @memberof Image
     * @static
     * @param {IImage} message Image message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Image.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.style != null && message.hasOwnProperty("style"))
            $root.google.protobuf.Struct.encode(message.style, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.sourceURLString != null && message.hasOwnProperty("sourceURLString"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.sourceURLString);
        return writer;
    };

    /**
     * Encodes the specified Image message, length delimited. Does not implicitly {@link Image.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Image
     * @static
     * @param {IImage} message Image message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Image.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Image message from the specified reader or buffer.
     * @function decode
     * @memberof Image
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Image} Image
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Image.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Image();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.style = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 2:
                message.sourceURLString = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Image message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Image
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Image} Image
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Image.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Image message.
     * @function verify
     * @memberof Image
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Image.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.style != null && message.hasOwnProperty("style")) {
            var error = $root.google.protobuf.Struct.verify(message.style);
            if (error)
                return "style." + error;
        }
        if (message.sourceURLString != null && message.hasOwnProperty("sourceURLString"))
            if (!$util.isString(message.sourceURLString))
                return "sourceURLString: string expected";
        return null;
    };

    /**
     * Creates an Image message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Image
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Image} Image
     */
    Image.fromObject = function fromObject(object) {
        if (object instanceof $root.Image)
            return object;
        var message = new $root.Image();
        if (object.style != null) {
            if (typeof object.style !== "object")
                throw TypeError(".Image.style: object expected");
            message.style = $root.google.protobuf.Struct.fromObject(object.style);
        }
        if (object.sourceURLString != null)
            message.sourceURLString = String(object.sourceURLString);
        return message;
    };

    /**
     * Creates a plain object from an Image message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Image
     * @static
     * @param {Image} message Image
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Image.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.style = null;
            object.sourceURLString = "";
        }
        if (message.style != null && message.hasOwnProperty("style"))
            object.style = $root.google.protobuf.Struct.toObject(message.style, options);
        if (message.sourceURLString != null && message.hasOwnProperty("sourceURLString"))
            object.sourceURLString = message.sourceURLString;
        return object;
    };

    /**
     * Converts this Image to JSON.
     * @function toJSON
     * @memberof Image
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Image.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Image;
})();

$root.ReactElement = (function() {

    /**
     * Properties of a ReactElement.
     * @exports IReactElement
     * @interface IReactElement
     * @property {string|null} [key] ReactElement key
     * @property {ICustomComponent|null} [custom] ReactElement custom
     * @property {IView|null} [view] ReactElement view
     * @property {IFlatList|null} [flatList] ReactElement flatList
     * @property {ITouchableOpacity|null} [touchableOpacity] ReactElement touchableOpacity
     * @property {ITextInput|null} [textInput] ReactElement textInput
     * @property {IText|null} [text] ReactElement text
     * @property {IRawText|null} [rawText] ReactElement rawText
     * @property {ISwitch|null} ["switch"] ReactElement switch
     * @property {IImage|null} [image] ReactElement image
     */

    /**
     * Constructs a new ReactElement.
     * @exports ReactElement
     * @classdesc Represents a ReactElement.
     * @implements IReactElement
     * @constructor
     * @param {IReactElement=} [properties] Properties to set
     */
    function ReactElement(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ReactElement key.
     * @member {string} key
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.key = "";

    /**
     * ReactElement custom.
     * @member {ICustomComponent|null|undefined} custom
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.custom = null;

    /**
     * ReactElement view.
     * @member {IView|null|undefined} view
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.view = null;

    /**
     * ReactElement flatList.
     * @member {IFlatList|null|undefined} flatList
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.flatList = null;

    /**
     * ReactElement touchableOpacity.
     * @member {ITouchableOpacity|null|undefined} touchableOpacity
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.touchableOpacity = null;

    /**
     * ReactElement textInput.
     * @member {ITextInput|null|undefined} textInput
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.textInput = null;

    /**
     * ReactElement text.
     * @member {IText|null|undefined} text
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.text = null;

    /**
     * ReactElement rawText.
     * @member {IRawText|null|undefined} rawText
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.rawText = null;

    /**
     * ReactElement switch.
     * @member {ISwitch|null|undefined} switch
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype["switch"] = null;

    /**
     * ReactElement image.
     * @member {IImage|null|undefined} image
     * @memberof ReactElement
     * @instance
     */
    ReactElement.prototype.image = null;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ReactElement value.
     * @member {"custom"|"view"|"flatList"|"touchableOpacity"|"textInput"|"text"|"rawText"|"switch"|"image"|undefined} value
     * @memberof ReactElement
     * @instance
     */
    Object.defineProperty(ReactElement.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["custom", "view", "flatList", "touchableOpacity", "textInput", "text", "rawText", "switch", "image"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ReactElement instance using the specified properties.
     * @function create
     * @memberof ReactElement
     * @static
     * @param {IReactElement=} [properties] Properties to set
     * @returns {ReactElement} ReactElement instance
     */
    ReactElement.create = function create(properties) {
        return new ReactElement(properties);
    };

    /**
     * Encodes the specified ReactElement message. Does not implicitly {@link ReactElement.verify|verify} messages.
     * @function encode
     * @memberof ReactElement
     * @static
     * @param {IReactElement} message ReactElement message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactElement.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.key != null && message.hasOwnProperty("key"))
            writer.uint32(/* id 0, wireType 2 =*/2).string(message.key);
        if (message.custom != null && message.hasOwnProperty("custom"))
            $root.CustomComponent.encode(message.custom, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.view != null && message.hasOwnProperty("view"))
            $root.View.encode(message.view, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.flatList != null && message.hasOwnProperty("flatList"))
            $root.FlatList.encode(message.flatList, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.touchableOpacity != null && message.hasOwnProperty("touchableOpacity"))
            $root.TouchableOpacity.encode(message.touchableOpacity, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.textInput != null && message.hasOwnProperty("textInput"))
            $root.TextInput.encode(message.textInput, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.text != null && message.hasOwnProperty("text"))
            $root.Text.encode(message.text, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.rawText != null && message.hasOwnProperty("rawText"))
            $root.RawText.encode(message.rawText, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message["switch"] != null && message.hasOwnProperty("switch"))
            $root.Switch.encode(message["switch"], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        if (message.image != null && message.hasOwnProperty("image"))
            $root.Image.encode(message.image, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ReactElement message, length delimited. Does not implicitly {@link ReactElement.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ReactElement
     * @static
     * @param {IReactElement} message ReactElement message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ReactElement.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ReactElement message from the specified reader or buffer.
     * @function decode
     * @memberof ReactElement
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ReactElement} ReactElement
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactElement.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ReactElement();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 0:
                message.key = reader.string();
                break;
            case 1:
                message.custom = $root.CustomComponent.decode(reader, reader.uint32());
                break;
            case 2:
                message.view = $root.View.decode(reader, reader.uint32());
                break;
            case 3:
                message.flatList = $root.FlatList.decode(reader, reader.uint32());
                break;
            case 4:
                message.touchableOpacity = $root.TouchableOpacity.decode(reader, reader.uint32());
                break;
            case 5:
                message.textInput = $root.TextInput.decode(reader, reader.uint32());
                break;
            case 6:
                message.text = $root.Text.decode(reader, reader.uint32());
                break;
            case 7:
                message.rawText = $root.RawText.decode(reader, reader.uint32());
                break;
            case 8:
                message["switch"] = $root.Switch.decode(reader, reader.uint32());
                break;
            case 9:
                message.image = $root.Image.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ReactElement message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ReactElement
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ReactElement} ReactElement
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ReactElement.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ReactElement message.
     * @function verify
     * @memberof ReactElement
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ReactElement.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.key != null && message.hasOwnProperty("key"))
            if (!$util.isString(message.key))
                return "key: string expected";
        if (message.custom != null && message.hasOwnProperty("custom")) {
            properties.value = 1;
            {
                var error = $root.CustomComponent.verify(message.custom);
                if (error)
                    return "custom." + error;
            }
        }
        if (message.view != null && message.hasOwnProperty("view")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.View.verify(message.view);
                if (error)
                    return "view." + error;
            }
        }
        if (message.flatList != null && message.hasOwnProperty("flatList")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.FlatList.verify(message.flatList);
                if (error)
                    return "flatList." + error;
            }
        }
        if (message.touchableOpacity != null && message.hasOwnProperty("touchableOpacity")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.TouchableOpacity.verify(message.touchableOpacity);
                if (error)
                    return "touchableOpacity." + error;
            }
        }
        if (message.textInput != null && message.hasOwnProperty("textInput")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.TextInput.verify(message.textInput);
                if (error)
                    return "textInput." + error;
            }
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Text.verify(message.text);
                if (error)
                    return "text." + error;
            }
        }
        if (message.rawText != null && message.hasOwnProperty("rawText")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.RawText.verify(message.rawText);
                if (error)
                    return "rawText." + error;
            }
        }
        if (message["switch"] != null && message.hasOwnProperty("switch")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Switch.verify(message["switch"]);
                if (error)
                    return "switch." + error;
            }
        }
        if (message.image != null && message.hasOwnProperty("image")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Image.verify(message.image);
                if (error)
                    return "image." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ReactElement message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ReactElement
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ReactElement} ReactElement
     */
    ReactElement.fromObject = function fromObject(object) {
        if (object instanceof $root.ReactElement)
            return object;
        var message = new $root.ReactElement();
        if (object.key != null)
            message.key = String(object.key);
        if (object.custom != null) {
            if (typeof object.custom !== "object")
                throw TypeError(".ReactElement.custom: object expected");
            message.custom = $root.CustomComponent.fromObject(object.custom);
        }
        if (object.view != null) {
            if (typeof object.view !== "object")
                throw TypeError(".ReactElement.view: object expected");
            message.view = $root.View.fromObject(object.view);
        }
        if (object.flatList != null) {
            if (typeof object.flatList !== "object")
                throw TypeError(".ReactElement.flatList: object expected");
            message.flatList = $root.FlatList.fromObject(object.flatList);
        }
        if (object.touchableOpacity != null) {
            if (typeof object.touchableOpacity !== "object")
                throw TypeError(".ReactElement.touchableOpacity: object expected");
            message.touchableOpacity = $root.TouchableOpacity.fromObject(object.touchableOpacity);
        }
        if (object.textInput != null) {
            if (typeof object.textInput !== "object")
                throw TypeError(".ReactElement.textInput: object expected");
            message.textInput = $root.TextInput.fromObject(object.textInput);
        }
        if (object.text != null) {
            if (typeof object.text !== "object")
                throw TypeError(".ReactElement.text: object expected");
            message.text = $root.Text.fromObject(object.text);
        }
        if (object.rawText != null) {
            if (typeof object.rawText !== "object")
                throw TypeError(".ReactElement.rawText: object expected");
            message.rawText = $root.RawText.fromObject(object.rawText);
        }
        if (object["switch"] != null) {
            if (typeof object["switch"] !== "object")
                throw TypeError(".ReactElement.switch: object expected");
            message["switch"] = $root.Switch.fromObject(object["switch"]);
        }
        if (object.image != null) {
            if (typeof object.image !== "object")
                throw TypeError(".ReactElement.image: object expected");
            message.image = $root.Image.fromObject(object.image);
        }
        return message;
    };

    /**
     * Creates a plain object from a ReactElement message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ReactElement
     * @static
     * @param {ReactElement} message ReactElement
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ReactElement.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.key = "";
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = message.key;
        if (message.custom != null && message.hasOwnProperty("custom")) {
            object.custom = $root.CustomComponent.toObject(message.custom, options);
            if (options.oneofs)
                object.value = "custom";
        }
        if (message.view != null && message.hasOwnProperty("view")) {
            object.view = $root.View.toObject(message.view, options);
            if (options.oneofs)
                object.value = "view";
        }
        if (message.flatList != null && message.hasOwnProperty("flatList")) {
            object.flatList = $root.FlatList.toObject(message.flatList, options);
            if (options.oneofs)
                object.value = "flatList";
        }
        if (message.touchableOpacity != null && message.hasOwnProperty("touchableOpacity")) {
            object.touchableOpacity = $root.TouchableOpacity.toObject(message.touchableOpacity, options);
            if (options.oneofs)
                object.value = "touchableOpacity";
        }
        if (message.textInput != null && message.hasOwnProperty("textInput")) {
            object.textInput = $root.TextInput.toObject(message.textInput, options);
            if (options.oneofs)
                object.value = "textInput";
        }
        if (message.text != null && message.hasOwnProperty("text")) {
            object.text = $root.Text.toObject(message.text, options);
            if (options.oneofs)
                object.value = "text";
        }
        if (message.rawText != null && message.hasOwnProperty("rawText")) {
            object.rawText = $root.RawText.toObject(message.rawText, options);
            if (options.oneofs)
                object.value = "rawText";
        }
        if (message["switch"] != null && message.hasOwnProperty("switch")) {
            object["switch"] = $root.Switch.toObject(message["switch"], options);
            if (options.oneofs)
                object.value = "switch";
        }
        if (message.image != null && message.hasOwnProperty("image")) {
            object.image = $root.Image.toObject(message.image, options);
            if (options.oneofs)
                object.value = "image";
        }
        return object;
    };

    /**
     * Converts this ReactElement to JSON.
     * @function toJSON
     * @memberof ReactElement
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ReactElement.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ReactElement;
})();

$root.Unmount = (function() {

    /**
     * Properties of an Unmount.
     * @exports IUnmount
     * @interface IUnmount
     */

    /**
     * Constructs a new Unmount.
     * @exports Unmount
     * @classdesc Messages *********
     * @implements IUnmount
     * @constructor
     * @param {IUnmount=} [properties] Properties to set
     */
    function Unmount(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Unmount instance using the specified properties.
     * @function create
     * @memberof Unmount
     * @static
     * @param {IUnmount=} [properties] Properties to set
     * @returns {Unmount} Unmount instance
     */
    Unmount.create = function create(properties) {
        return new Unmount(properties);
    };

    /**
     * Encodes the specified Unmount message. Does not implicitly {@link Unmount.verify|verify} messages.
     * @function encode
     * @memberof Unmount
     * @static
     * @param {IUnmount} message Unmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Unmount.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Unmount message, length delimited. Does not implicitly {@link Unmount.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Unmount
     * @static
     * @param {IUnmount} message Unmount message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Unmount.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Unmount message from the specified reader or buffer.
     * @function decode
     * @memberof Unmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Unmount} Unmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Unmount.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Unmount();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Unmount message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Unmount
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Unmount} Unmount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Unmount.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Unmount message.
     * @function verify
     * @memberof Unmount
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Unmount.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates an Unmount message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Unmount
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Unmount} Unmount
     */
    Unmount.fromObject = function fromObject(object) {
        if (object instanceof $root.Unmount)
            return object;
        return new $root.Unmount();
    };

    /**
     * Creates a plain object from an Unmount message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Unmount
     * @static
     * @param {Unmount} message Unmount
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Unmount.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Unmount to JSON.
     * @function toJSON
     * @memberof Unmount
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Unmount.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Unmount;
})();

$root.Render = (function() {

    /**
     * Properties of a Render.
     * @exports IRender
     * @interface IRender
     * @property {string|null} [name] Render name
     * @property {google.protobuf.IStruct|null} [props] Render props
     * @property {Array.<string>|null} [localProps] Render localProps
     */

    /**
     * Constructs a new Render.
     * @exports Render
     * @classdesc Represents a Render.
     * @implements IRender
     * @constructor
     * @param {IRender=} [properties] Properties to set
     */
    function Render(properties) {
        this.localProps = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Render name.
     * @member {string} name
     * @memberof Render
     * @instance
     */
    Render.prototype.name = "";

    /**
     * Render props.
     * @member {google.protobuf.IStruct|null|undefined} props
     * @memberof Render
     * @instance
     */
    Render.prototype.props = null;

    /**
     * Render localProps.
     * @member {Array.<string>} localProps
     * @memberof Render
     * @instance
     */
    Render.prototype.localProps = $util.emptyArray;

    /**
     * Creates a new Render instance using the specified properties.
     * @function create
     * @memberof Render
     * @static
     * @param {IRender=} [properties] Properties to set
     * @returns {Render} Render instance
     */
    Render.create = function create(properties) {
        return new Render(properties);
    };

    /**
     * Encodes the specified Render message. Does not implicitly {@link Render.verify|verify} messages.
     * @function encode
     * @memberof Render
     * @static
     * @param {IRender} message Render message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Render.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.name != null && message.hasOwnProperty("name"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
        if (message.props != null && message.hasOwnProperty("props"))
            $root.google.protobuf.Struct.encode(message.props, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.localProps != null && message.localProps.length)
            for (var i = 0; i < message.localProps.length; ++i)
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.localProps[i]);
        return writer;
    };

    /**
     * Encodes the specified Render message, length delimited. Does not implicitly {@link Render.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Render
     * @static
     * @param {IRender} message Render message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Render.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Render message from the specified reader or buffer.
     * @function decode
     * @memberof Render
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Render} Render
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Render.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Render();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.name = reader.string();
                break;
            case 2:
                message.props = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            case 3:
                if (!(message.localProps && message.localProps.length))
                    message.localProps = [];
                message.localProps.push(reader.string());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Render message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Render
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Render} Render
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Render.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Render message.
     * @function verify
     * @memberof Render
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Render.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.name != null && message.hasOwnProperty("name"))
            if (!$util.isString(message.name))
                return "name: string expected";
        if (message.props != null && message.hasOwnProperty("props")) {
            var error = $root.google.protobuf.Struct.verify(message.props);
            if (error)
                return "props." + error;
        }
        if (message.localProps != null && message.hasOwnProperty("localProps")) {
            if (!Array.isArray(message.localProps))
                return "localProps: array expected";
            for (var i = 0; i < message.localProps.length; ++i)
                if (!$util.isString(message.localProps[i]))
                    return "localProps: string[] expected";
        }
        return null;
    };

    /**
     * Creates a Render message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Render
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Render} Render
     */
    Render.fromObject = function fromObject(object) {
        if (object instanceof $root.Render)
            return object;
        var message = new $root.Render();
        if (object.name != null)
            message.name = String(object.name);
        if (object.props != null) {
            if (typeof object.props !== "object")
                throw TypeError(".Render.props: object expected");
            message.props = $root.google.protobuf.Struct.fromObject(object.props);
        }
        if (object.localProps) {
            if (!Array.isArray(object.localProps))
                throw TypeError(".Render.localProps: array expected");
            message.localProps = [];
            for (var i = 0; i < object.localProps.length; ++i)
                message.localProps[i] = String(object.localProps[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Render message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Render
     * @static
     * @param {Render} message Render
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Render.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.localProps = [];
        if (options.defaults) {
            object.name = "";
            object.props = null;
        }
        if (message.name != null && message.hasOwnProperty("name"))
            object.name = message.name;
        if (message.props != null && message.hasOwnProperty("props"))
            object.props = $root.google.protobuf.Struct.toObject(message.props, options);
        if (message.localProps && message.localProps.length) {
            object.localProps = [];
            for (var j = 0; j < message.localProps.length; ++j)
                object.localProps[j] = message.localProps[j];
        }
        return object;
    };

    /**
     * Converts this Render to JSON.
     * @function toJSON
     * @memberof Render
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Render.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Render;
})();

$root.Call = (function() {

    /**
     * Properties of a Call.
     * @exports ICall
     * @interface ICall
     * @property {number|null} [messageId] Call messageId
     * @property {google.protobuf.IStruct|null} [args] Call args
     */

    /**
     * Constructs a new Call.
     * @exports Call
     * @classdesc Represents a Call.
     * @implements ICall
     * @constructor
     * @param {ICall=} [properties] Properties to set
     */
    function Call(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Call messageId.
     * @member {number} messageId
     * @memberof Call
     * @instance
     */
    Call.prototype.messageId = 0;

    /**
     * Call args.
     * @member {google.protobuf.IStruct|null|undefined} args
     * @memberof Call
     * @instance
     */
    Call.prototype.args = null;

    /**
     * Creates a new Call instance using the specified properties.
     * @function create
     * @memberof Call
     * @static
     * @param {ICall=} [properties] Properties to set
     * @returns {Call} Call instance
     */
    Call.create = function create(properties) {
        return new Call(properties);
    };

    /**
     * Encodes the specified Call message. Does not implicitly {@link Call.verify|verify} messages.
     * @function encode
     * @memberof Call
     * @static
     * @param {ICall} message Call message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Call.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageId);
        if (message.args != null && message.hasOwnProperty("args"))
            $root.google.protobuf.Struct.encode(message.args, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Call message, length delimited. Does not implicitly {@link Call.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Call
     * @static
     * @param {ICall} message Call message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Call.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Call message from the specified reader or buffer.
     * @function decode
     * @memberof Call
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Call} Call
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Call.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Call();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.messageId = reader.int32();
                break;
            case 2:
                message.args = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Call message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Call
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Call} Call
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Call.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Call message.
     * @function verify
     * @memberof Call
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Call.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            if (!$util.isInteger(message.messageId))
                return "messageId: integer expected";
        if (message.args != null && message.hasOwnProperty("args")) {
            var error = $root.google.protobuf.Struct.verify(message.args);
            if (error)
                return "args." + error;
        }
        return null;
    };

    /**
     * Creates a Call message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Call
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Call} Call
     */
    Call.fromObject = function fromObject(object) {
        if (object instanceof $root.Call)
            return object;
        var message = new $root.Call();
        if (object.messageId != null)
            message.messageId = object.messageId | 0;
        if (object.args != null) {
            if (typeof object.args !== "object")
                throw TypeError(".Call.args: object expected");
            message.args = $root.google.protobuf.Struct.fromObject(object.args);
        }
        return message;
    };

    /**
     * Creates a plain object from a Call message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Call
     * @static
     * @param {Call} message Call
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Call.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.messageId = 0;
            object.args = null;
        }
        if (message.messageId != null && message.hasOwnProperty("messageId"))
            object.messageId = message.messageId;
        if (message.args != null && message.hasOwnProperty("args"))
            object.args = $root.google.protobuf.Struct.toObject(message.args, options);
        return object;
    };

    /**
     * Converts this Call to JSON.
     * @function toJSON
     * @memberof Call
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Call.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Call;
})();

$root.ClientToServer = (function() {

    /**
     * Properties of a ClientToServer.
     * @exports IClientToServer
     * @interface IClientToServer
     * @property {IUnmount|null} [unmount] ClientToServer unmount
     * @property {IRender|null} [render] ClientToServer render
     * @property {ICall|null} [call] ClientToServer call
     * @property {number|null} [rootId] ClientToServer rootId
     */

    /**
     * Constructs a new ClientToServer.
     * @exports ClientToServer
     * @classdesc Represents a ClientToServer.
     * @implements IClientToServer
     * @constructor
     * @param {IClientToServer=} [properties] Properties to set
     */
    function ClientToServer(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ClientToServer unmount.
     * @member {IUnmount|null|undefined} unmount
     * @memberof ClientToServer
     * @instance
     */
    ClientToServer.prototype.unmount = null;

    /**
     * ClientToServer render.
     * @member {IRender|null|undefined} render
     * @memberof ClientToServer
     * @instance
     */
    ClientToServer.prototype.render = null;

    /**
     * ClientToServer call.
     * @member {ICall|null|undefined} call
     * @memberof ClientToServer
     * @instance
     */
    ClientToServer.prototype.call = null;

    /**
     * ClientToServer rootId.
     * @member {number} rootId
     * @memberof ClientToServer
     * @instance
     */
    ClientToServer.prototype.rootId = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ClientToServer value.
     * @member {"unmount"|"render"|"call"|undefined} value
     * @memberof ClientToServer
     * @instance
     */
    Object.defineProperty(ClientToServer.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["unmount", "render", "call"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ClientToServer instance using the specified properties.
     * @function create
     * @memberof ClientToServer
     * @static
     * @param {IClientToServer=} [properties] Properties to set
     * @returns {ClientToServer} ClientToServer instance
     */
    ClientToServer.create = function create(properties) {
        return new ClientToServer(properties);
    };

    /**
     * Encodes the specified ClientToServer message. Does not implicitly {@link ClientToServer.verify|verify} messages.
     * @function encode
     * @memberof ClientToServer
     * @static
     * @param {IClientToServer} message ClientToServer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientToServer.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.unmount != null && message.hasOwnProperty("unmount"))
            $root.Unmount.encode(message.unmount, writer.uint32(/* id 0, wireType 2 =*/2).fork()).ldelim();
        if (message.render != null && message.hasOwnProperty("render"))
            $root.Render.encode(message.render, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rootId);
        if (message.call != null && message.hasOwnProperty("call"))
            $root.Call.encode(message.call, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ClientToServer message, length delimited. Does not implicitly {@link ClientToServer.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ClientToServer
     * @static
     * @param {IClientToServer} message ClientToServer message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ClientToServer.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ClientToServer message from the specified reader or buffer.
     * @function decode
     * @memberof ClientToServer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ClientToServer} ClientToServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientToServer.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ClientToServer();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 0:
                message.unmount = $root.Unmount.decode(reader, reader.uint32());
                break;
            case 1:
                message.render = $root.Render.decode(reader, reader.uint32());
                break;
            case 3:
                message.call = $root.Call.decode(reader, reader.uint32());
                break;
            case 2:
                message.rootId = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ClientToServer message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ClientToServer
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ClientToServer} ClientToServer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ClientToServer.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ClientToServer message.
     * @function verify
     * @memberof ClientToServer
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ClientToServer.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.unmount != null && message.hasOwnProperty("unmount")) {
            properties.value = 1;
            {
                var error = $root.Unmount.verify(message.unmount);
                if (error)
                    return "unmount." + error;
            }
        }
        if (message.render != null && message.hasOwnProperty("render")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Render.verify(message.render);
                if (error)
                    return "render." + error;
            }
        }
        if (message.call != null && message.hasOwnProperty("call")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Call.verify(message.call);
                if (error)
                    return "call." + error;
            }
        }
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            if (!$util.isInteger(message.rootId))
                return "rootId: integer expected";
        return null;
    };

    /**
     * Creates a ClientToServer message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ClientToServer
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ClientToServer} ClientToServer
     */
    ClientToServer.fromObject = function fromObject(object) {
        if (object instanceof $root.ClientToServer)
            return object;
        var message = new $root.ClientToServer();
        if (object.unmount != null) {
            if (typeof object.unmount !== "object")
                throw TypeError(".ClientToServer.unmount: object expected");
            message.unmount = $root.Unmount.fromObject(object.unmount);
        }
        if (object.render != null) {
            if (typeof object.render !== "object")
                throw TypeError(".ClientToServer.render: object expected");
            message.render = $root.Render.fromObject(object.render);
        }
        if (object.call != null) {
            if (typeof object.call !== "object")
                throw TypeError(".ClientToServer.call: object expected");
            message.call = $root.Call.fromObject(object.call);
        }
        if (object.rootId != null)
            message.rootId = object.rootId | 0;
        return message;
    };

    /**
     * Creates a plain object from a ClientToServer message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ClientToServer
     * @static
     * @param {ClientToServer} message ClientToServer
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ClientToServer.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.rootId = 0;
        if (message.unmount != null && message.hasOwnProperty("unmount")) {
            object.unmount = $root.Unmount.toObject(message.unmount, options);
            if (options.oneofs)
                object.value = "unmount";
        }
        if (message.render != null && message.hasOwnProperty("render")) {
            object.render = $root.Render.toObject(message.render, options);
            if (options.oneofs)
                object.value = "render";
        }
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            object.rootId = message.rootId;
        if (message.call != null && message.hasOwnProperty("call")) {
            object.call = $root.Call.toObject(message.call, options);
            if (options.oneofs)
                object.value = "call";
        }
        return object;
    };

    /**
     * Converts this ClientToServer to JSON.
     * @function toJSON
     * @memberof ClientToServer
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ClientToServer.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ClientToServer;
})();

$root.Error = (function() {

    /**
     * Properties of an Error.
     * @exports IError
     * @interface IError
     */

    /**
     * Constructs a new Error.
     * @exports Error
     * @classdesc Represents an Error.
     * @implements IError
     * @constructor
     * @param {IError=} [properties] Properties to set
     */
    function Error(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Creates a new Error instance using the specified properties.
     * @function create
     * @memberof Error
     * @static
     * @param {IError=} [properties] Properties to set
     * @returns {Error} Error instance
     */
    Error.create = function create(properties) {
        return new Error(properties);
    };

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @function encode
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        return writer;
    };

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @function decode
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Error();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Error message.
     * @function verify
     * @memberof Error
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Error.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        return null;
    };

    /**
     * Creates an Error message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Error
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Error} Error
     */
    Error.fromObject = function fromObject(object) {
        if (object instanceof $root.Error)
            return object;
        return new $root.Error();
    };

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Error
     * @static
     * @param {Error} message Error
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Error.toObject = function toObject() {
        return {};
    };

    /**
     * Converts this Error to JSON.
     * @function toJSON
     * @memberof Error
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Error.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Error;
})();

$root.Update = (function() {

    /**
     * Properties of an Update.
     * @exports IUpdate
     * @interface IUpdate
     * @property {Array.<IReactElement>|null} [element] Update element
     */

    /**
     * Constructs a new Update.
     * @exports Update
     * @classdesc Represents an Update.
     * @implements IUpdate
     * @constructor
     * @param {IUpdate=} [properties] Properties to set
     */
    function Update(properties) {
        this.element = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Update element.
     * @member {Array.<IReactElement>} element
     * @memberof Update
     * @instance
     */
    Update.prototype.element = $util.emptyArray;

    /**
     * Creates a new Update instance using the specified properties.
     * @function create
     * @memberof Update
     * @static
     * @param {IUpdate=} [properties] Properties to set
     * @returns {Update} Update instance
     */
    Update.create = function create(properties) {
        return new Update(properties);
    };

    /**
     * Encodes the specified Update message. Does not implicitly {@link Update.verify|verify} messages.
     * @function encode
     * @memberof Update
     * @static
     * @param {IUpdate} message Update message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Update.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.element != null && message.element.length)
            for (var i = 0; i < message.element.length; ++i)
                $root.ReactElement.encode(message.element[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Update message, length delimited. Does not implicitly {@link Update.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Update
     * @static
     * @param {IUpdate} message Update message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Update.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Update message from the specified reader or buffer.
     * @function decode
     * @memberof Update
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Update} Update
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Update.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Update();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.element && message.element.length))
                    message.element = [];
                message.element.push($root.ReactElement.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Update message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Update
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Update} Update
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Update.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Update message.
     * @function verify
     * @memberof Update
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Update.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.element != null && message.hasOwnProperty("element")) {
            if (!Array.isArray(message.element))
                return "element: array expected";
            for (var i = 0; i < message.element.length; ++i) {
                var error = $root.ReactElement.verify(message.element[i]);
                if (error)
                    return "element." + error;
            }
        }
        return null;
    };

    /**
     * Creates an Update message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Update
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Update} Update
     */
    Update.fromObject = function fromObject(object) {
        if (object instanceof $root.Update)
            return object;
        var message = new $root.Update();
        if (object.element) {
            if (!Array.isArray(object.element))
                throw TypeError(".Update.element: array expected");
            message.element = [];
            for (var i = 0; i < object.element.length; ++i) {
                if (typeof object.element[i] !== "object")
                    throw TypeError(".Update.element: object expected");
                message.element[i] = $root.ReactElement.fromObject(object.element[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from an Update message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Update
     * @static
     * @param {Update} message Update
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Update.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.element = [];
        if (message.element && message.element.length) {
            object.element = [];
            for (var j = 0; j < message.element.length; ++j)
                object.element[j] = $root.ReactElement.toObject(message.element[j], options);
        }
        return object;
    };

    /**
     * Converts this Update to JSON.
     * @function toJSON
     * @memberof Update
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Update.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Update;
})();

$root.ServerToClient = (function() {

    /**
     * Properties of a ServerToClient.
     * @exports IServerToClient
     * @interface IServerToClient
     * @property {IError|null} [error] ServerToClient error
     * @property {IUpdate|null} [update] ServerToClient update
     * @property {number|null} [rootId] ServerToClient rootId
     */

    /**
     * Constructs a new ServerToClient.
     * @exports ServerToClient
     * @classdesc Represents a ServerToClient.
     * @implements IServerToClient
     * @constructor
     * @param {IServerToClient=} [properties] Properties to set
     */
    function ServerToClient(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ServerToClient error.
     * @member {IError|null|undefined} error
     * @memberof ServerToClient
     * @instance
     */
    ServerToClient.prototype.error = null;

    /**
     * ServerToClient update.
     * @member {IUpdate|null|undefined} update
     * @memberof ServerToClient
     * @instance
     */
    ServerToClient.prototype.update = null;

    /**
     * ServerToClient rootId.
     * @member {number} rootId
     * @memberof ServerToClient
     * @instance
     */
    ServerToClient.prototype.rootId = 0;

    // OneOf field names bound to virtual getters and setters
    var $oneOfFields;

    /**
     * ServerToClient value.
     * @member {"error"|"update"|undefined} value
     * @memberof ServerToClient
     * @instance
     */
    Object.defineProperty(ServerToClient.prototype, "value", {
        get: $util.oneOfGetter($oneOfFields = ["error", "update"]),
        set: $util.oneOfSetter($oneOfFields)
    });

    /**
     * Creates a new ServerToClient instance using the specified properties.
     * @function create
     * @memberof ServerToClient
     * @static
     * @param {IServerToClient=} [properties] Properties to set
     * @returns {ServerToClient} ServerToClient instance
     */
    ServerToClient.create = function create(properties) {
        return new ServerToClient(properties);
    };

    /**
     * Encodes the specified ServerToClient message. Does not implicitly {@link ServerToClient.verify|verify} messages.
     * @function encode
     * @memberof ServerToClient
     * @static
     * @param {IServerToClient} message ServerToClient message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerToClient.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.error != null && message.hasOwnProperty("error"))
            $root.Error.encode(message.error, writer.uint32(/* id 0, wireType 2 =*/2).fork()).ldelim();
        if (message.update != null && message.hasOwnProperty("update"))
            $root.Update.encode(message.update, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rootId);
        return writer;
    };

    /**
     * Encodes the specified ServerToClient message, length delimited. Does not implicitly {@link ServerToClient.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ServerToClient
     * @static
     * @param {IServerToClient} message ServerToClient message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ServerToClient.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ServerToClient message from the specified reader or buffer.
     * @function decode
     * @memberof ServerToClient
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ServerToClient} ServerToClient
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerToClient.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServerToClient();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 0:
                message.error = $root.Error.decode(reader, reader.uint32());
                break;
            case 1:
                message.update = $root.Update.decode(reader, reader.uint32());
                break;
            case 2:
                message.rootId = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ServerToClient message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ServerToClient
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ServerToClient} ServerToClient
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ServerToClient.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ServerToClient message.
     * @function verify
     * @memberof ServerToClient
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ServerToClient.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        var properties = {};
        if (message.error != null && message.hasOwnProperty("error")) {
            properties.value = 1;
            {
                var error = $root.Error.verify(message.error);
                if (error)
                    return "error." + error;
            }
        }
        if (message.update != null && message.hasOwnProperty("update")) {
            if (properties.value === 1)
                return "value: multiple values";
            properties.value = 1;
            {
                var error = $root.Update.verify(message.update);
                if (error)
                    return "update." + error;
            }
        }
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            if (!$util.isInteger(message.rootId))
                return "rootId: integer expected";
        return null;
    };

    /**
     * Creates a ServerToClient message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ServerToClient
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ServerToClient} ServerToClient
     */
    ServerToClient.fromObject = function fromObject(object) {
        if (object instanceof $root.ServerToClient)
            return object;
        var message = new $root.ServerToClient();
        if (object.error != null) {
            if (typeof object.error !== "object")
                throw TypeError(".ServerToClient.error: object expected");
            message.error = $root.Error.fromObject(object.error);
        }
        if (object.update != null) {
            if (typeof object.update !== "object")
                throw TypeError(".ServerToClient.update: object expected");
            message.update = $root.Update.fromObject(object.update);
        }
        if (object.rootId != null)
            message.rootId = object.rootId | 0;
        return message;
    };

    /**
     * Creates a plain object from a ServerToClient message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ServerToClient
     * @static
     * @param {ServerToClient} message ServerToClient
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ServerToClient.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.rootId = 0;
        if (message.error != null && message.hasOwnProperty("error")) {
            object.error = $root.Error.toObject(message.error, options);
            if (options.oneofs)
                object.value = "error";
        }
        if (message.update != null && message.hasOwnProperty("update")) {
            object.update = $root.Update.toObject(message.update, options);
            if (options.oneofs)
                object.value = "update";
        }
        if (message.rootId != null && message.hasOwnProperty("rootId"))
            object.rootId = message.rootId;
        return object;
    };

    /**
     * Converts this ServerToClient to JSON.
     * @function toJSON
     * @memberof ServerToClient
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ServerToClient.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ServerToClient;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Struct = (function() {

            /**
             * Properties of a Struct.
             * @memberof google.protobuf
             * @interface IStruct
             * @property {Object.<string,google.protobuf.IValue>|null} [fields] Struct fields
             */

            /**
             * Constructs a new Struct.
             * @memberof google.protobuf
             * @classdesc Represents a Struct.
             * @implements IStruct
             * @constructor
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             */
            function Struct(properties) {
                this.fields = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Struct fields.
             * @member {Object.<string,google.protobuf.IValue>} fields
             * @memberof google.protobuf.Struct
             * @instance
             */
            Struct.prototype.fields = $util.emptyObject;

            /**
             * Creates a new Struct instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             * @returns {google.protobuf.Struct} Struct instance
             */
            Struct.create = function create(properties) {
                return new Struct(properties);
            };

            /**
             * Encodes the specified Struct message. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fields != null && message.hasOwnProperty("fields"))
                    for (var keys = Object.keys(message.fields), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.google.protobuf.Value.encode(message.fields[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified Struct message, length delimited. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Struct message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Struct(), key;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        reader.skip().pos++;
                        if (message.fields === $util.emptyObject)
                            message.fields = {};
                        key = reader.string();
                        reader.pos++;
                        message.fields[key] = $root.google.protobuf.Value.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Struct message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Struct message.
             * @function verify
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Struct.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fields != null && message.hasOwnProperty("fields")) {
                    if (!$util.isObject(message.fields))
                        return "fields: object expected";
                    var key = Object.keys(message.fields);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.fields[key[i]]);
                        if (error)
                            return "fields." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Struct message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Struct} Struct
             */
            Struct.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Struct)
                    return object;
                var message = new $root.google.protobuf.Struct();
                if (object.fields) {
                    if (typeof object.fields !== "object")
                        throw TypeError(".google.protobuf.Struct.fields: object expected");
                    message.fields = {};
                    for (var keys = Object.keys(object.fields), i = 0; i < keys.length; ++i) {
                        if (typeof object.fields[keys[i]] !== "object")
                            throw TypeError(".google.protobuf.Struct.fields: object expected");
                        message.fields[keys[i]] = $root.google.protobuf.Value.fromObject(object.fields[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Struct message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.Struct} message Struct
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Struct.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.fields = {};
                var keys2;
                if (message.fields && (keys2 = Object.keys(message.fields)).length) {
                    object.fields = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.fields[keys2[j]] = $root.google.protobuf.Value.toObject(message.fields[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this Struct to JSON.
             * @function toJSON
             * @memberof google.protobuf.Struct
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Struct.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Struct;
        })();

        protobuf.Value = (function() {

            /**
             * Properties of a Value.
             * @memberof google.protobuf
             * @interface IValue
             * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
             * @property {number|null} [numberValue] Value numberValue
             * @property {string|null} [stringValue] Value stringValue
             * @property {boolean|null} [boolValue] Value boolValue
             * @property {google.protobuf.IStruct|null} [structValue] Value structValue
             * @property {google.protobuf.IListValue|null} [listValue] Value listValue
             */

            /**
             * Constructs a new Value.
             * @memberof google.protobuf
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {google.protobuf.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value nullValue.
             * @member {google.protobuf.NullValue} nullValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.nullValue = 0;

            /**
             * Value numberValue.
             * @member {number} numberValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.numberValue = 0;

            /**
             * Value stringValue.
             * @member {string} stringValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.stringValue = "";

            /**
             * Value boolValue.
             * @member {boolean} boolValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.boolValue = false;

            /**
             * Value structValue.
             * @member {google.protobuf.IStruct|null|undefined} structValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.structValue = null;

            /**
             * Value listValue.
             * @member {google.protobuf.IListValue|null|undefined} listValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.listValue = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Value kind.
             * @member {"nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue"|undefined} kind
             * @memberof google.protobuf.Value
             * @instance
             */
            Object.defineProperty(Value.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue=} [properties] Properties to set
             * @returns {google.protobuf.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };

            /**
             * Encodes the specified Value message. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.nullValue != null && message.hasOwnProperty("nullValue"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nullValue);
                if (message.numberValue != null && message.hasOwnProperty("numberValue"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.numberValue);
                if (message.stringValue != null && message.hasOwnProperty("stringValue"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.stringValue);
                if (message.boolValue != null && message.hasOwnProperty("boolValue"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolValue);
                if (message.structValue != null && message.hasOwnProperty("structValue"))
                    $root.google.protobuf.Struct.encode(message.structValue, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.listValue != null && message.hasOwnProperty("listValue"))
                    $root.google.protobuf.ListValue.encode(message.listValue, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.nullValue = reader.int32();
                        break;
                    case 2:
                        message.numberValue = reader.double();
                        break;
                    case 3:
                        message.stringValue = reader.string();
                        break;
                    case 4:
                        message.boolValue = reader.bool();
                        break;
                    case 5:
                        message.structValue = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.listValue = $root.google.protobuf.ListValue.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Value message.
             * @function verify
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    properties.kind = 1;
                    switch (message.nullValue) {
                    default:
                        return "nullValue: enum value expected";
                    case 0:
                        break;
                    }
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.numberValue !== "number")
                        return "numberValue: number expected";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Struct.verify(message.structValue);
                        if (error)
                            return "structValue." + error;
                    }
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.ListValue.verify(message.listValue);
                        if (error)
                            return "listValue." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Value)
                    return object;
                var message = new $root.google.protobuf.Value();
                switch (object.nullValue) {
                case "NULL_VALUE":
                case 0:
                    message.nullValue = 0;
                    break;
                }
                if (object.numberValue != null)
                    message.numberValue = Number(object.numberValue);
                if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                if (object.structValue != null) {
                    if (typeof object.structValue !== "object")
                        throw TypeError(".google.protobuf.Value.structValue: object expected");
                    message.structValue = $root.google.protobuf.Struct.fromObject(object.structValue);
                }
                if (object.listValue != null) {
                    if (typeof object.listValue !== "object")
                        throw TypeError(".google.protobuf.Value.listValue: object expected");
                    message.listValue = $root.google.protobuf.ListValue.fromObject(object.listValue);
                }
                return message;
            };

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.Value} message Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    object.nullValue = options.enums === String ? $root.google.protobuf.NullValue[message.nullValue] : message.nullValue;
                    if (options.oneofs)
                        object.kind = "nullValue";
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    object.numberValue = options.json && !isFinite(message.numberValue) ? String(message.numberValue) : message.numberValue;
                    if (options.oneofs)
                        object.kind = "numberValue";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                        object.kind = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                        object.kind = "boolValue";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    object.structValue = $root.google.protobuf.Struct.toObject(message.structValue, options);
                    if (options.oneofs)
                        object.kind = "structValue";
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    object.listValue = $root.google.protobuf.ListValue.toObject(message.listValue, options);
                    if (options.oneofs)
                        object.kind = "listValue";
                }
                return object;
            };

            /**
             * Converts this Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Value;
        })();

        /**
         * NullValue enum.
         * @name google.protobuf.NullValue
         * @enum {string}
         * @property {number} NULL_VALUE=0 NULL_VALUE value
         */
        protobuf.NullValue = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NULL_VALUE"] = 0;
            return values;
        })();

        protobuf.ListValue = (function() {

            /**
             * Properties of a ListValue.
             * @memberof google.protobuf
             * @interface IListValue
             * @property {Array.<google.protobuf.IValue>|null} [values] ListValue values
             */

            /**
             * Constructs a new ListValue.
             * @memberof google.protobuf
             * @classdesc Represents a ListValue.
             * @implements IListValue
             * @constructor
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             */
            function ListValue(properties) {
                this.values = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListValue values.
             * @member {Array.<google.protobuf.IValue>} values
             * @memberof google.protobuf.ListValue
             * @instance
             */
            ListValue.prototype.values = $util.emptyArray;

            /**
             * Creates a new ListValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             * @returns {google.protobuf.ListValue} ListValue instance
             */
            ListValue.create = function create(properties) {
                return new ListValue(properties);
            };

            /**
             * Encodes the specified ListValue message. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                        $root.google.protobuf.Value.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ListValue message, length delimited. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.ListValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.values && message.values.length))
                            message.values = [];
                        message.values.push($root.google.protobuf.Value.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ListValue message.
             * @function verify
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ListValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                        return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.values[i]);
                        if (error)
                            return "values." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ListValue} ListValue
             */
            ListValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.ListValue)
                    return object;
                var message = new $root.google.protobuf.ListValue();
                if (object.values) {
                    if (!Array.isArray(object.values))
                        throw TypeError(".google.protobuf.ListValue.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                        if (typeof object.values[i] !== "object")
                            throw TypeError(".google.protobuf.ListValue.values: object expected");
                        message.values[i] = $root.google.protobuf.Value.fromObject(object.values[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ListValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.ListValue} message ListValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ListValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.values = [];
                if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                        object.values[j] = $root.google.protobuf.Value.toObject(message.values[j], options);
                }
                return object;
            };

            /**
             * Converts this ListValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.ListValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ListValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ListValue;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
