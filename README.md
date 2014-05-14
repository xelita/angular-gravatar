# [angular-gravatar][![Build Status](https://travis-ci.org/xelita/angular-gravatar.png?branch=master)](https://travis-ci.org/xelita/angular-gravatar)

This project integrates [Gravatar](http://en.gravatar.com) to [AngularJS](https://angularjs.org) applications.

## Quick start

+ Include gravatar.js in your application.

```html
<script src="js/gravatar.js"></script>
```

or use the minified version:

```html
<script src="js/gravatar.min.js"></script>
```

+ Add the module `gravatarModule` as a dependency to your app module:

```javascript
var myapp = angular.module('myapp', ['gravatarModule']);
```

+ Use the gravatarService as controller dependencies and call gravatarService API:

```javascript
$scope.gravatarUrl = function () {
    var gravatarConfig = {
        ssl: true,
        ext: 'png',
        size: 200,
        defaultImage: 'mm',
        forceDefaultImage: true,
        rating: 'g'
    };
    return gravatarService.getImageUrlFromEmail('john.doe@unknown.com');
}
```

or

+ Use the gravatarImage directive to display Gravatars in your application:

```html
<gravatar-image email={{your_email}} />
```

## Directive attributes

### gravatar-image directive

In your template file, Gravatar directive can be used and configured like this:

```html
<gravatar-image 
    email="john.doe@unknown.com" 
    ssl="true" 
    ext="png" 
    size="200" 
    default-image="mm" 
    force-default-image="true" 
    rating="g"
    />
```

or

```html
<gravatar-image 
    email-hash="6c320be9a7a04782bd10dd04f81ddab6" 
    ssl="true" 
    ext="png" 
    size="200" 
    default-image="mm" 
    force-default-image="true" 
    rating="g"
    />
```

#### email or email-hash
All URLs on Gravatar are based on the use of the hashed value of an email address. Images and profiles are both accessed via the hash of an email, and it is considered the primary way of identifying an identity within the system. To ensure a consistent and accurate hash, the following steps should be taken to create a hash:
If the email hash is given, then the email is ignored.
[More information](https://en.gravatar.com/site/implement/hash/)

#### ssl
If you're displaying Gravatars on a page that is being served over SSL (e.g. the page URL starts with HTTPS), then you'll want to serve your Gravatars via SSL as well, otherwise you'll get annoying security warnings in most browsers. To do this, simply change the URL for your Gravatars so that is starts with:
https://secure.gravatar.com/...
[More information](https://en.gravatar.com/site/implement/images/)

#### ext
If you require a file-type extension (some places do) then you may also add an (optional) extension to this Gravatar URL
[More information](https://en.gravatar.com/site/implement/images/)

#### default
Default image displayed when given configuration does not lead to an existing Gravatar.
[More information](https://en.gravatar.com/site/implement/images/)

#### force-default
If for some reason you wanted to force the default image to always load.
[More information](https://en.gravatar.com/site/implement/images/)

#### rating
Gravatar allows users to self-rate their images so that they can indicate if an image is appropriate for a certain audience.
[More information](https://en.gravatar.com/site/implement/images/)

## Developers

Clone the repo, `git clone git://github.com/xelita/angular-gravatar.git`.
The project is tested with `jasmine` running on `karma`.

>
``` bash
$ npm install
$ bower install
$ npm test
```

## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

## Copyright and license

    The MIT License (MIT)

    Copyright (c) 2014 The Enlightened Developer

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
