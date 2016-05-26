"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require("../../Utils");
class UnicodeArrayTranslator extends Node_1.Node {
    constructor(unicodeArrayTranslatorName, unicodeArrayName, unicodeArray) {
        super();
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArrayTranslatorName = unicodeArrayTranslatorName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }
    getNodeIdentifier() {
        return this.unicodeArrayTranslatorName;
    }
    ;
    getNode() {
        if (!this.unicodeArray.length) {
            return;
        }
        return super.getNode();
    }
    getNodeStructure() {
        let keyName = Utils_1.Utils.getRandomVariableName(), node = esprima.parse(`
                var ${this.unicodeArrayTranslatorName} = function (${keyName}) {
                    return ${this.unicodeArrayName}[[][${Utils_1.Utils.stringToUnicode('filter')}][${Utils_1.Utils.stringToUnicode('constructor')}](${Utils_1.Utils.stringToUnicode('return this')})()[${Utils_1.Utils.stringToUnicode('parseInt')}](${keyName})]
                };
            `);
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.UnicodeArrayTranslator = UnicodeArrayTranslator;
