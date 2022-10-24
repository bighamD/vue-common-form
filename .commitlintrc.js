module.exports = {
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    // 总体格式：<类型><(作用域)>:<空格><描述>

    // 类型必填
    'function-rules/type-empty': [
      2,
      'never',
      parsed => {
        if (parsed.type) {
          return [true];
        }
        return [false, '<类型>必填'];
      },
    ],
    // 类型枚举
    // feat：新功能、新特性
    // fix：修改问题
    // perf: 性能提升的修改
    // chore：其他调整和修改，或者无法定性的改动
    // test：单元测试相关的调整
    // refactor：重构（即不是新增功能，也不是修改bug的代码变动）
    // build：对项目构建或者依赖的改动，包括技术栈的调整
    // style：代码格式（不影响代码运行的变动，不是css修改）
    // docs：文档改动
    'function-rules/type-enum': [
      2,
      'always',
      parsed => {
        const types = ['feat', 'fix', 'perf', 'chore', 'test', 'refactor', 'build', 'style', 'docs'];
        if (parsed.type && types.includes(parsed.type)) {
          return [true];
        }
        return [false, '<类型>必须是[feat, fix, perf, chore, test, refactor, build, style, docs]之一'];
      },
    ],

    // 作用域必填
    'function-rules/scope-empty': [
      2,
      'never',
      parsed => {
        if (parsed.scope) {
          return [true];
        }
        return [false, '<作用域>必填'];
      },
    ],
    // iwms 联想
    'function-rules/scope-enum': [
      2,
      'always',
      parsed => {
        const scopes = /^(iwms|skawms|mtwms)(#\d+)?$/;
        if (parsed.scope && scopes.test(parsed.scope)) {
          return [true];
        }
        return [false, '<作用域>必须是[iwms, skawms, mtwms]之一，可以带#bug-id, example: fix(iwms#bug9527)'];
      },
    ],

    // 描述必填
    'function-rules/subject-empty': [
      2,
      'never',
      parsed => {
        if (parsed.subject) {
          return [true];
        }
        return [false, '<描述>必填'];
      },
    ],
    // 描述最长 120 个字符
    'function-rules/subject-max-length': [
      2,
      'always',
      parsed => {
        if (parsed.subject && parsed.subject.length > 0 && parsed.subject.length <= 120) {
          return [true];
        }
        return [false, '<描述>的长度不能超过 120 个字符'];
      },
    ],
  },
  ignores: [commit => /^(Merge|cherry-pick|Revert)\s\S+/i.test(commit)],
};
