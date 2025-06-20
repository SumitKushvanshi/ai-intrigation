export  function checkString(str){
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export  function checkStringReplace(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,'')
}

export function formating(str){
    return str.replaceAll("**", "''");
}