const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evalueteRegex } = require('../src/util');

describe('#Util', () => {
    it ('#evalueteRegex should throw an error an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

        expect(() => evalueteRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
    });

    it ('#evalueteRegex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-z])$/

        expect(() => evalueteRegex(safeRegex)).to.not.throw;
        expect(evalueteRegex(safeRegex)).to.be.ok;
    });
});
