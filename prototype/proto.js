var Point = function (x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.add = function (otherPoint) {
    this.x += otherPoint.x;
    this.y += otherPoint.y;
}

var p1 = new Point(3, 4);
var p2 = new Point(8, 6);
var aa = p1.add(p2);
console.log(p1.x); // now p1.x is 11 and p1.y is 10
