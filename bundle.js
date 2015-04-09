(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function main() {
  var image = new Image();
  image.src = "lachen.jpg";
  image.onload = function () {
      render(image);
  }
}

var gl, colorLocation;

function render (image) {
  var canvas = document.getElementById("webgl-canvas");
  gl = canvas.getContext("experimental-webgl");

  var program = createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
  gl.useProgram(program);

  var positionLocation  = gl.getAttribLocation(program, "a_position");

  // resolution
  var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

  colorLocation = gl.getUniformLocation(program, "u_color");

  var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
  
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);



  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  //for (var ii = 0; ii < 100; ++ii) {
    // random rect
 renderImage();
}

  function renderImage () {
  for (var ii = 0; ii < 100; ++ii) {
    setRectangle(
        gl, randomInt(1000), randomInt(1900), randomInt(1000), randomInt(1000));
        //gl, 0, 0, image.width, image.height);
     //random color
    gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);

    //Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

    window.requestAnimationFrame(function () {
        renderImage();
      });
  }
 
  function randomInt(range) {
    return Math.floor(Math.random() * range);
  }

  function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2
        ]),
      gl.STATIC_DRAW);
  }

main();

},{}]},{},[1]);
