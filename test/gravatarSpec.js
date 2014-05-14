describe("gravatarModule Tests Suite", function () {

    // gravatarConstants

    describe("gravatarConstants Tests", function () {

        var gravatarConstants;

        beforeEach(function () {
            module('gravatarModule');
            inject(function (_gravatarConstants_) {
                gravatarConstants = _gravatarConstants_;
            });
        });

        it("apiVersion", function () {
            expect(gravatarConstants.apiVersion).toBe('1.0.0');
        });

        it("http url", function () {
            expect(gravatarConstants.urls.http).toBe('http://www.gravatar.com/avatar');
        });

        it("https url", function () {
            expect(gravatarConstants.urls.https).toBe('https://secure.gravatar.com/avatar');
        });

        it("images notfound", function () {
            expect(gravatarConstants.images.notfound).toBe('404');
        });

        it("images mysteryman", function () {
            expect(gravatarConstants.images.mysteryman).toBe('mm');
        });

        it("images identicon", function () {
            expect(gravatarConstants.images.identicon).toBe('identicon');
        });

        it("images monster", function () {
            expect(gravatarConstants.images.monster).toBe('monsterid');
        });

        it("images wavatar", function () {
            expect(gravatarConstants.images.wavatar).toBe('wavatar');
        });

        it("images retro", function () {
            expect(gravatarConstants.images.retro).toBe('retro');
        });

        it("images blank", function () {
            expect(gravatarConstants.images.blank).toBe('blank');
        });

        it("images g", function () {
            expect(gravatarConstants.ratings.g).toBe('g');
        });

        it("images pg", function () {
            expect(gravatarConstants.ratings.pg).toBe('pg');
        });

        it("images r", function () {
            expect(gravatarConstants.ratings.r).toBe('r');
        });

        it("images x", function () {
            expect(gravatarConstants.ratings.x).toBe('x');
        });
    });
});