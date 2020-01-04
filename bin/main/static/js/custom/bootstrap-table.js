(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/tables/bootstrap', ['jquery', 'Site'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('jquery'), require('Site'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.jQuery, global.Site);
    global.tablesBootstrap = mod.exports;
  }
})(this, function (_jquery, _Site) {
  'use strict';

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  function buildTable($el, cells, rows) {
    var i,
        j,
        row,
        columns = [],
        data = [];

    for (i = 0; i < cells; i++) {
      columns.push({
        field: 'field' + i,
        title: 'Cell' + i
      });
    }
    for (i = 0; i < rows; i++) {
      row = {};
      for (j = 0; j < cells; j++) {
        row['field' + j] = 'Row-' + i + '-' + j;
      }
      data.push(row);
    }
    $el.bootstrapTable('destroy').bootstrapTable({
      columns: columns,
      data: data,
      iconSize: 'outline',
      icons: {
        columns: 'wb-list-bulleted'
      }
    });
  }

  (0, _jquery2.default)(document).ready(function ($$$1) {
    (0, _Site.run)();
  });

  // 형제관계 테이블
  // ------------------------------
  (function () {
    (0, _jquery2.default)('#sibling').bootstrapTable({
      locale:'ko-KR',
      data: studentCreateRoot.sibling,
      showRefresh: true,
      iconSize: 'outline',
      toolbar: '#siblingToolbar',
      icons: {
        refresh: 'wb-refresh',
        toggle: 'wb-order',
        columns: 'wb-list-bulleted'
      }
    });

  })();
});