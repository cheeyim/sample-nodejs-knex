var assert = require('assert');
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;
var should = require('chai').should();

describe('AuthController', function () {
    //sample hooks - give name to hooks for easier troubleshooting
    beforeEach('Setting Up Roles', function settingUpRoles() {
        console.log('Running before each');
        authController.setRoles(['user']);
    });
    //hint: add describe.only if you want mocha to only run this describe tests
    //hint: add describe.skip if you want mocha to skip failing tests
    describe('isAuthorized', function () {
        it('should return false if not authorized', function () {
            var isAuth = authController.isAuthorized('admin');
            //sample using chai - expect
            expect(isAuth).to.be.false;
        })
        it('should return true if authorized', function () {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
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
});