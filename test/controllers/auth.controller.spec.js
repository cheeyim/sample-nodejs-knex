var assert = require('assert');
var authController = require('../../controllers/auth.controller');

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
            assert.equal(false, authController.isAuthorized('admin'));
        })
        it('should return true if authorized', function () {
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('admin'));
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