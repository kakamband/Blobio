"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_1 = require("./Entity");
var Player_1 = require("./Player");
var Enemy_1 = require("./Enemy");
var Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food(params) {
        var _this = _super.call(this, params) || this;
        _this.mass = 1;
        _this.id = '' + Math.random();
        Food.list.set(_this.id, _this);
        Entity_1.Entity.initPack.food.push(_this.getInitPack());
        return _this;
    }
    Food.allInitPacks = function () {
        var e_1, _a;
        var food = [];
        try {
            for (var _b = __values(Food.list), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), id = _d[0], p = _d[1];
                food.push(p.getInitPack());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return food;
    };
    Food.allUpdatePacks = function () {
        if (Math.random() < 0.1 && Food.list.size < 100) {
            Food.spawnRandomFood();
        }
        else if (Math.random() < 0.01 && Food.list.size < 500) {
            Food.spawnRandomFood();
        }
        var pack = [];
        Food.list.forEach(function (food) {
            if (food) {
                food.update();
                pack.push(food.getUpdatePack());
            }
        });
        return pack;
    };
    Food.spawnRandomFood = function () {
        new Food({ x: Math.floor(Math.random() * 3008), y: Math.floor(Math.random() * 3008) });
    };
    Food.prototype.getInitPack = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        };
    };
    Food.prototype.getUpdatePack = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        };
    };
    Food.prototype.update = function () {
        var _this = this;
        Player_1.Player.list.forEach(function (player) {
            if (_this.getDistance(player.x, player.y) < player.radius) {
                player.mass++;
                player.radius++;
                Food.list.delete(_this.id);
                Entity_1.Entity.removePack.food.push(_this.id);
            }
        });
        Enemy_1.Enemy.list.forEach(function (enemy) {
            if (_this.getDistance(enemy.x, enemy.y) < enemy.radius) {
                enemy.mass++;
                enemy.radius++;
                Food.list.delete(_this.id);
                Entity_1.Entity.removePack.food.push(_this.id);
            }
        });
    };
    Food.list = new Map();
    return Food;
}(Entity_1.Entity));
exports.Food = Food;
