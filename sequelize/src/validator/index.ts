import user from "./user";

// 规则类
class Rules {
  checkRules: object;
  constructor() {
    // 校验规则
    this.checkRules = {
      ...user
    };
  }

  // 拓展校验规则
  expandRules(name, func) {
    this.checkRules[name] = func;
  }
}

export default class FormRules extends Rules {
  inputRules: any[];
  constructor() {
    super();
    this.inputRules = [];
  }

  // 添加校验规则
  add(obj) {
    this.inputRules.push(obj);
  }

  // 校验校验规则
  check() {
    this.inputRules.forEach((rule) => {
      if (rule instanceof Array) {
        rule.forEach((rule) => {
          this.checkRules[rule.type](rule);
        });
      } else {
        this.checkRules[rule.type](rule);
      }
    });
  }
}
