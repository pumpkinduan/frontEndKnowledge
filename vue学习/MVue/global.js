const parseTemplate = (originalTemplate) => {
    return originalTemplate.match(reg);
}
const removeBraces = (template) => {//扒括号 {{age}} => age
    return template.substring(2, template.length - 2);
}
//匹配如： "{{msg}}" "{{persons.sex}} -- {{person.hobby}}"
const reg = /{{([A-z_])*(\.)?([A-z_])*}}/g;