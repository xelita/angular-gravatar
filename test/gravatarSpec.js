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

        it("avatar http url", function () {
            expect(gravatarConstants.urls.avatar.http).toBe('http://www.gravatar.com/avatar');
        });

        it("avatar https url", function () {
            expect(gravatarConstants.urls.avatar.https).toBe('https://secure.gravatar.com/avatar');
        });

        it("profile http url", function () {
            expect(gravatarConstants.urls.profile.http).toBe('http://www.gravatar.com');
        });

        it("profile https url", function () {
            expect(gravatarConstants.urls.profile.https).toBe('https://secure.gravatar.com');
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

        var $httpBackend;

        beforeEach(function () {
            module('gravatarModule');
            inject(function (_gravatarService_, _gravatarConstants_, _$httpBackend_) {
                gravatarService = _gravatarService_;
                gravatarConstants = _gravatarConstants_;
                $httpBackend = _$httpBackend_;
            });
        });

        it("apiVersion should return apiVersion defined in gravatarConstants", function () {
            expect(gravatarService.apiVersion()).toBe('1.0.0');
        });

        it("email hash relies on md5", function () {
            expect(gravatarService.emailHash(' JOHN.DOE@unknown.com ')).toBe('6c320be9a7a04782bd10dd04f81ddab6');
        });

        it("image url from email should delegate call to image url with hashed email function", function () {
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

        it("image url from hashed email should return valid Gravatar image url", function () {
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

        it("profile url from email should delegate call to profile url with hashed email function", function () {
            spyOn(gravatarService, 'getProfileVCardUrlFromEmailHash');

            var gravatarConfig = {
                ssl: true
            };
            gravatarService.getProfileVCardUrlFromEmail(' JOHN.DOE@unknown.com', gravatarConfig);
            expect(gravatarService.getProfileVCardUrlFromEmailHash).toHaveBeenCalledWith('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
        });

        it("profile url from hashed email should return valid Gravatar profile url", function () {
            var gravatarConfig = {
            };

            var url = gravatarService.getProfileVCardUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('http://www.gravatar.com/6c320be9a7a04782bd10dd04f81ddab6.vcf');

            gravatarConfig.ssl = true;
            url = gravatarService.getProfileVCardUrlFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            expect(url).toBe('https://secure.gravatar.com/6c320be9a7a04782bd10dd04f81ddab6.vcf');
        });

        it("profile data from email should delegate call to profile data with hashed email function", function () {
            spyOn(gravatarService, 'getProfileFromEmailHash');

            var gravatarConfig = {
                ssl: true
            };
            var callback = 'alert';

            gravatarService.getProfileFromEmail(' JOHN.DOE@unknown.com', gravatarConfig, callback);
            expect(gravatarService.getProfileFromEmailHash).toHaveBeenCalledWith('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig, callback);
        });

        it("profile data from hashed email should return http promise on profile url", function () {
            var gravatarConfig = {
            };
            var callback = 'alert';

            $httpBackend.expectGET('http://www.gravatar.com/6c320be9a7a04782bd10dd04f81ddab6.json').respond({});
            gravatarService.getProfileFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig);
            $httpBackend.flush();

            $httpBackend.expectGET('http://www.gravatar.com/6c320be9a7a04782bd10dd04f81ddab6.json?callback=alert').respond({});
            gravatarService.getProfileFromEmailHash('6c320be9a7a04782bd10dd04f81ddab6', gravatarConfig, callback);
            $httpBackend.flush();
        });
    });

    // gravatarImage

    describe("gravatarImage Tests", function () {

        var gravatarService;
        var gravatarConstants;

        var scope;
        var element;

        beforeEach(function () {
            module('gravatarModule');
            inject(function (_gravatarService_, _gravatarConstants_, $rootScope) {
                gravatarService = _gravatarService_;
                gravatarConstants = _gravatarConstants_;

                scope = $rootScope.$new();
            });
        });

        it("should watch email", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("src")).toBe('http://www.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6?');
        });

        it("should watch email hash", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email-hash='{{emailHash}}'></gravatar-image>")(scope);
            });

            scope.emailHash = '6c320be9a7a04782bd10dd04f81ddab6';
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email-hash")).toBe('6c320be9a7a04782bd10dd04f81ddab6');
            expect(element.attr("src")).toBe('http://www.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6?');
        });

        it("should watch ssl", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6?');
        });

        it("should watch ext", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}' ext='{{ext}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.ext = 'png';
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?');
        });

        it("should watch size", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}' ext='{{ext}}' size='{{size}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.ext = 'png';
            scope.size = '200';
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("size")).toBe('200');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&');
        });

        it("should watch default image", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}' ext='{{ext}}' size='{{size}}' default-image='{{defaultImage}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.ext = 'png';
            scope.size = '200';
            scope.defaultImage = gravatarConstants.images.notfound;
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("size")).toBe('200');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=404&');
        });

        it("should watch force default image", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}' ext='{{ext}}' size='{{size}}' default-image='{{defaultImage}}' force-default-image='{{forceDefaultImage}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.ext = 'png';
            scope.size = '200';
            scope.defaultImage = gravatarConstants.images.notfound;
            scope.forceDefaultImage = true;
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("size")).toBe('200');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=404&f=y&');
        });

        it("should watch rating", function () {
            inject(function ($compile) {
                element = $compile("<gravatar-image email='{{email}}' ssl='{{ssl}}' ext='{{ext}}' size='{{size}}' default-image='{{defaultImage}}' force-default-image='{{forceDefaultImage}}' rating='{{rating}}'></gravatar-image>")(scope);
            });

            scope.email = 'john.doe@unknown.com';
            scope.ssl = 'true';
            scope.ext = 'png';
            scope.size = '200';
            scope.defaultImage = gravatarConstants.images.notfound;
            scope.forceDefaultImage = true;
            scope.rating = gravatarConstants.ratings.g;
            scope.$digest();

            expect(element.prop("tagName")).toBe('IMG');
            expect(element.attr("email")).toBe('john.doe@unknown.com');
            expect(element.attr("ssl")).toBe('true');
            expect(element.attr("size")).toBe('200');
            expect(element.attr("src")).toBe('https://secure.gravatar.com/avatar/6c320be9a7a04782bd10dd04f81ddab6.png?s=200&d=404&f=y&r=g&');
        });
    });
});