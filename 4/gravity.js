// Generated by CoffeeScript 1.7.1
(function() {
  var BlackHole, GravitatingBody, Space, Star,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Space = (function() {
    function Space() {}

    Space.playing = true;

    Space.bg = 'rgb(0,0,0)';

    Space.gravG = 1;

    Space.objects = [];

    return Space;

  })();

  GravitatingBody = (function() {
    function GravitatingBody() {
      this._d = {};
      this._posX = 0;
      this._posY = 0;
      this._m = 0;
      this._traces = [];
      this._gravX = 0;
      this._gravY = 0;
      this._velx = 0;
      this._vely = 0;
      this._restX = 0;
      this._restY = 0;
      this._diam = 0;
      this._col = {
        r: 0,
        g: 0,
        b: 0
      };
    }

    GravitatingBody.prototype.build = function() {
      this._d = document.createElement('div');
      this._d.style.borderRadius = this._diam / 2 + 'px';
      this._d.style.height = this._diam + 'px';
      this._d.style.width = this._diam + 'px';
      this._d.style.position = 'absolute';
      this._d.style.backgroundColor = 'rgb(' + this._col.r + ',' + this._col.g + ',' + this._col.b + ')';
      document.documentElement.appendChild(this._d);
      return this.moveTo(this._posX, this._posY);
    };

    GravitatingBody.prototype.mass = function() {
      return this._m;
    };

    GravitatingBody.prototype.moveTo = function(x, y) {
      this._d.style.top = Math.floor(y) + 'px';
      return this._d.style.left = Math.floor(x) + 'px';
    };

    GravitatingBody.prototype.coords = function() {
      return {
        x: parseInt(this._d.style.left),
        y: parseInt(this._d.style.top)
      };
    };

    GravitatingBody.prototype.colour = function() {
      return this._d.style.backgroundColor;
    };

    GravitatingBody.prototype.frame = function() {
      var newPosX, newPosY, self;
      self = this;
      self._gravX = self._gravY = 0;
      Space.objects.forEach(function(object) {
        var MCtr, d, d2, d2xp, d2yp, dx, dy, grav;
        if (object === self) {
          return;
        }
        MCtr = object.mass();
        dy = self.coords().y - object.coords().y;
        dx = self.coords().x - object.coords().x;
        d2 = Math.pow(dy, 2) + Math.pow(dx, 2);
        d = Math.sqrt(d2);
        d2xp = dx / d;
        d2yp = dy / d;
        grav = (Space.gravG * MCtr) / d2;
        self._gravX += d2xp * grav;
        return self._gravY += d2yp * grav;
      });
      self._vely -= self._gravY;
      self._velx -= self._gravX;
      newPosX = self.coords().x + self._velx;
      newPosY = self.coords().y + self._vely;
      return self.moveTo(newPosX, newPosY);
    };

    GravitatingBody.prototype.setPositionFromEvent = function(event) {
      this._posY = event.clientY;
      return this._posX = event.clientX;
    };

    GravitatingBody.prototype.setPositionRandom = function() {
      var el;
      el = document.documentElement;
      this._posY = Math.floor(Math.random() * el.clientHeight);
      return this._posX = Math.floor(Math.random() * el.clientWidth);
    };

    GravitatingBody.prototype.setPositionMiddle = function() {
      var el;
      el = document.documentElement;
      this._posY = 0.5 * el.clientHeight;
      return this._posX = 0.5 * el.clientWidth;
    };

    return GravitatingBody;

  })();

  Star = (function(_super) {
    __extends(Star, _super);

    function Star() {
      Star.__super__.constructor.apply(this, arguments);
      this._m = 3000;
      this._diam = 3;
      this._col = {
        r: 255,
        g: 255,
        b: 255
      };
    }

    return Star;

  })(GravitatingBody);

  BlackHole = (function(_super) {
    __extends(BlackHole, _super);

    function BlackHole() {
      BlackHole.__super__.constructor.apply(this, arguments);
      this._m = 300000;
      this._diam = 30;
      this._col = {
        r: 32,
        g: 32,
        b: 32
      };
    }

    BlackHole.prototype.frame = function() {};

    return BlackHole;

  })(GravitatingBody);

  $(document).ready(function() {
    var animate, bh, num, star, _i;
    $(document.documentElement).css({
      backgroundColor: Space.bg
    });
    $(document.documentElement).click(function(e) {
      var b;
      if (e.button === 0) {
        b = new Star;
      }
      b.setPositionFromEvent(e);
      b.build();
      return Space.objects.push(b);
    });
    bh = new BlackHole;
    bh.setPositionMiddle();
    bh.build();
    Space.objects.push(bh);
    for (num = _i = 1; _i <= 100; num = ++_i) {
      star = new Star;
      star.setPositionRandom();
      star.build();
      Space.objects.push(star);
    }
    animate = function() {
      Space.objects.forEach(function(object) {
        return object.frame();
      });
      return window.requestAnimationFrame(animate);
    };
    return animate();
  });

}).call(this);
