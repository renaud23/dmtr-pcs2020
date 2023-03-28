"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPcs2020Lp = fetchPcs2020Lp;
exports.fetchPcs2020LpSoft = fetchPcs2020LpSoft;
exports.fetchPcs2020 = fetchPcs2020;

function fetchPcs2020Lp() {
  return regeneratorRuntime.async(function fetchPcs2020Lp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", Promise.all([fetch("".concat(window.location.href, "/json/pcs2020-lp.json")).then(function (r) {
            return r.json();
          }), fetch("".concat(window.location.href, "/json/pcs2020-lp-core.json")).then(function (r) {
            return r.json();
          })]).then(function (values) {
            return values;
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function fetchPcs2020LpSoft() {
  return regeneratorRuntime.async(function fetchPcs2020LpSoft$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", Promise.all([fetch("".concat(window.location.href, "/json/pcs2020-lp.json")).then(function (r) {
            return r.json();
          }), fetch("".concat(window.location.href, "/json/pcs2020-lp-core-soft.json")).then(function (r) {
            return r.json();
          })]).then(function (values) {
            return values;
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function fetchPcs2020() {
  return regeneratorRuntime.async(function fetchPcs2020$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Promise.all([fetch("".concat(window.location.href, "/json/pcs2020.json")).then(function (r) {
            return r.json();
          }), fetch("".concat(window.location.href, "/json/pcs2020-core.json")).then(function (r) {
            return r.json();
          })]).then(function (values) {
            return values;
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}