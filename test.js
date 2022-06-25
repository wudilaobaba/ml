const cache = `${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}/.whj_tmp`;
console.log(cache)