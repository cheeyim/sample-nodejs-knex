var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha Test', function() {
    it('should deal with object', function() {
        var obj = {name:'cheeyim', gender:'female'};
        var objB = {name:'cheeyim', gender:'female'};

        //note: should is available here as it's using should from obj prototype
        obj.should.deep.equal(objB);
    });

    it('should allow testing null', function() {
        var iAmNull = null;

        //this uses should function from chai
        should.not.exists(iAmNull);
    });
});