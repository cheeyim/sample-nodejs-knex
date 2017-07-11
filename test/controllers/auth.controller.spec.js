var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function () {
    //sample hooks - give name to hooks for easier troubleshooting
    beforeEach('Setting Up Roles', function settingUpRoles() {
        console.log('Running before each');
        authController.setRoles(['user']);
    });
    //hint: add describe.only if you want mocha to only run this describe tests
    //hint: add describe.skip if you want mocha to skip failing tests
    describe('isAuthorized', function () {
        var user = {};
        beforeEach(function() {
            user = {
                roles: ['user', 'dev'],
                isAuthorized : function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
            //sample using sinon.spy to watch function
            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });

        it('should return false if not authorized', function () {
            var isAuth = authController.isAuthorized('admin');
            //sample using chai - expect
            expect(isAuth).to.be.false;
            //sample using sinon.spy to watch function
            user.isAuthorized.calledOnce.should.be.true;
        })
        it('should return true if authorized', function () {
            authController.setRoles(['user', 'dev']);
            var isAuth = authController.isAuthorized('dev');
            isAuth.should.be.true;
        })
        //sample pending tests
        it('should not allow a get if not authorized');
        it('should allow get if authorized');
    })

    //test async - to use ES5 syntax instead of arrow function for ES6
    describe('isAuthorizedAsync', function () {
        it('should return false if not authorized', function (done) {
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    assert.equal(false, isAuth);
                    done();
                });
        })
    })

    //test promise
    describe('isAuthorizedPromise', function () {
        it('should return false if not authorized', function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })

    //test using sinon spy function
    describe('getIndex', function() {
        it('should return index', function() {
            var req = {};
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            //hint:you may use console.log(res.render) to view the full stack of the fake function
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
        })
    })
});