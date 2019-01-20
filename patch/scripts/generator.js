'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var posts = locals.posts.sort(config.index_generator.order_by);
    
  posts.data = posts.data.sort(function(first, second) {
        if (first.top && second.top) { // 两篇文章top都有定义
            return first.top == second.top ? second.date - first.date : second.top - first.top //若top值一样则按照文章日期降序排, 否则按照top值降序排
        } else if (first.top && !second.top) { // 以下是只有一篇文章top有定义，将有top的排在前面
            return -1;
        } else if (!first.top && second.top) {
            return 1;
        } else {
            return second.date - first.date;  // 都没定义top，按照文章日期降序排
        }
  });
  
  var paginationDir = config.pagination_dir || 'page';
  var path = config.index_generator.path || '';
  
  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
