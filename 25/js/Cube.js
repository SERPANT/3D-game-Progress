var CubeObject = function() {
  var c = 10;
  this.verti = [];
  this.Type;
  this.position;
  var cube = [];
  var front = 1;
  var dimension = 0;
  var angle;
  this.cubeFace = [
    [0, 4, 7, 3],
    [1, 5, 6, 2],
    [0, 1, 5, 4],
    [7, 6, 2, 3],
    [0, 1, 2, 3],
    [4, 5, 6, 7]
  ];

  this.directionArr = [];

  this.color;

  this.init = function(
    pos = [0, 0, 0],
    color = "red",
    theta = 0,
    objectType = 0,
    size = 10
  ) {
    this.position = pos;
    this.Type = objectType;
    c = size;

    cube = [
      [-c, -2 * c, -c], //top left front
      [c, -2 * c, -c], //top right front
      [c, c, -c], //bottom right front
      [-c, c, -c], //bottom left front
      [-c, -2 * c, c], //top left back
      [c, -2 * c, c], //top right back
      [c, c, c], //bottom right back
      [-c, c, c] //bottom left back
    ];
    angle = theta;
    this.initVertices(theta, pos);

    this.color = color;
    //console.log(a, b, t, k, e, l);
    this.cubeFace = makeFace(this.cubeFace);
    //console.log(this.cubeFace);
  };

  function makeFace(cubeface) {
    var counter = 0;
    for (face of cubeface) {
      let index = cubeface.indexOf(face);
      counter++;
      let vertex0 = cube[face[0]];
      let vertex1 = cube[face[1]];
      let vertex2 = cube[face[2]];
      let vertex3 = cube[face[3]];

      let side1 = subtract(vertex0, vertex3);
      let side2 = subtract(vertex2, vertex3);
      var oriantationVector = cross(side1, side2);
      //  console.log("dimension", Math.sign(oriantationVector[dimension]));
      //console.log(Math.sign(front));

      if (Math.sign(oriantationVector[dimension]) === Math.sign(front)) {
        let temp = face[0];
        face[0] = face[2];
        face[2] = temp;
      }
      if (counter % 2 === 0) {
        dimension++;
      }

      if (front == 1) {
        front = -1;
      } else {
        front = 1;
      }

      cubeface[index] = face;
    }

    return cubeface;
  }

  function rotateSelf(theta, position) {
    var [x, y, z] = position;
    var s = Math.cos(theta) * x - Math.sin(theta) * z;
    var d = y;
    var f = Math.sin(theta) * x + Math.cos(theta) * z;

    return [s, d, f];
  }

  this.updatePosition = function(newPosition) {
    this.position = newPosition;
    this.updateVertices(angle, this.position);
  };

  this.initVertices = function(theta, pos) {
    let [s, d, f] = rotateSelf(theta, pos);

    for (i in cube) {
      let [X, Y, Z] = cube[i];
      this.verti.push([s + X, d + Y, f + Z]);
    }
  };

  this.updateVertices = function(angle, position) {
    let [s, d, f] = rotateSelf(angle, position);
    this.verti = [];
    for (i in cube) {
      let [X, Y, Z] = cube[i];
      this.verti.push([s + X, d + Y, f + Z]);
    }
  };
};
