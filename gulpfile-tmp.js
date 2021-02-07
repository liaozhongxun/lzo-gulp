// const { src, dest } = require("gulp");
const gulp = require("gulp");
const rename = require("gulp-rename"); // 修改代码后缀
const inject = require("gulp-inject"); // 模板注入
const replace = require("gulp-replace"); // 替换内容

// 创建页面
function createPage(cb) {
    const len = process.argv.length - 1;
    const pageName = process.argv[len].slice(2, process.argv[len].length); // 获取自定义文件名称参数
    console.log(pageName);
    gulp.src("./template/index.vue") // 找到要注入的模板
        .pipe(rename(`${pageName}.vue`)) // 替换成咱们终端里参数的名称
        .pipe(
            inject(gulp.src("./template/index.vue"), {
                // 这里的index.vue是个空文件就行
                starttag: "// start",
                endtag: "// end",
                transform() {
                    return `<template>
    <div id="${pageName}">111<div> 
</template>`;
                },
            })
        )
        .pipe(replace("// start", "")) // 将注释替换为空
        .pipe(replace("// end", "")) // 将注释替换为空
        .pipe(gulp.dest(__dirname + "/dist")); // 最后输出到别的目录中
    cb();
}

exports.page = createPage; // 导出任务
