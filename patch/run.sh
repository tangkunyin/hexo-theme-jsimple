#!/bin/sh

# for timestamp support
cp ./scripts/post.js ../node_modules/hexo/lib/hexo
cp ./scripts/scaffold.js ../node_modules/hexo/lib/hexo

# for stiky-top support
cp ./scripts/generator.js ../node_modules/hexo-generator-index/lib
