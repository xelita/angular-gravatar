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

    // gravatarService

    describe("gravatarService Tests", function () {

        var gravatarService;
        var gravatarConstants;

        beforeEach(function () {
            module('gravatarModule');
            inject(function (_gravatarService_, _gravatarConstants_) {
                gravatarService = _gravatarService_;
                gravatarConstants = _gravatarConstants_;
            });
        });

        it("apiVersion should return apiVersion defined in gravatarConstants", function () {
            expect(gravatarService.apiVersion()).toBe('1.0.0');
        });

        it("email hash relies on md5", function () {
            expect(gravatarService.emailHash(' JOHN.DOE@unknown.com ')).toBe('6c320be9a7a04782bd10dd04f81ddab6');
        });

        it("image url from email should relies on image url from email hash once email has been hashed", function () {
            spyOn(gravatarService, 'getImageUrlFromEmailHash');

            var gravatarConfig = {
                ssl: true,
                ext: 'png',
                size: 200,
                defaultImage: 'mm',
                forceDefaultImage: true,
                rating: 'g'
            };
            gravatarService.getImageUrlFromEmail(' JOHN.DOE@unknown.com', gravatarConfig);
            expect(gravatarService.getImageUrlFromEmailHash).toHaveBeenCalledWith('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
        });

        it("image url from email hash should return valid Gravatar url", function () {
            var gravatarConfig = {
            };

            var url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('http://www.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6?');

            gravatarConfig.ssl = true;
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6?');

            gravatarConfig.ext = 'png';
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?');

            gravatarConfig.size = '200';
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&');

            gravatarConfig.defaultImage = 'mm';
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=mm&');

            gravatarConfig.forceDefaultImage = true;
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=mm&f=y&');

            gravatarConfig.rating = 'g';
            url = gravatarService.getImageUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=mm&f=y&r=g&');
        });
    });
});