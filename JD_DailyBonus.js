// version v0.0.1
// create by ruicky
// detail url: https://github.com/ruicky/jd_sign_bot

const exec = require("child_process").execSync;
const fs = require("fs");
const download = require("download");

// 公共变量
const JD_COOKIE = process.env.JD_COOKIE; //cokie,多个用&隔开即可
let SyncUrl = process.env.SYNCURL; //签到地址,方便随时变动
let CookieJDs = [shshshfpb=sNwQA4qg3tR0T7tBRMquMJg%3D%3D; shshshfpa=feced863-7714-1c5b-6972-dd6c2270d201-1567749670; pinId=bexjxHwr2QofTm9udy87qrV9-x-f3wj7; __jdu=15882986400711041170491; __jdv=76161171|baidu|-|organic|%25E4%25BA%25AC%25E4%25B8%259C|1615015980235; areaId=28; ipLoc-djd=28-2509-0-0; PCSYCityID=CN_620000_620200_0; user-key=10d18412-cf3a-4223-b117-2ed463cdb430; pin=jd_70ff67ccd13b6; unick=M%E6%9C%A8%E7%99%BD%E6%B0%B4; _tp=1rbqCtJY4hX2GnPGLGj4MYeqs7IRoi2UXBNOE54wUNU%3D; _pst=jd_70ff67ccd13b6; cn=15; TrackID=1wtcErbVAM-huRaCBm4vm5kRBIatASNKnoplaCPb_pCen8QzPg2cOQqYO4nOXBIUDrrRv6trKCcW_Y31dLv284NoJsITiuXAB9_yqbvvk7VA; thor=FAF1A250C5C1198ABF1CBDDCCF53BD443D63974D237F1B285510C1858E10C1C22F8DA19F7232B6F02C1E53D8A70E256BCBDC656EC1DDC07A43F5521C69A8B3057370A6ACCBA64132F5B547F72DAC03A596DA037EAD7CAC0B163848289B581DF244130F81A2C9A139251DA3835ACAA4E0F16B73A90B7C49B1AABFEA9FBB6395CE9B7BA118B9AA13A8164FABA346A6919121ED412515C59EA1B0A1D389BC491DB7; ceshi3.com=201; list_sign_1688330843=8155eea82d80abd7e996dfbd008a646d; shshshfp=3988735fd180878ae7d315a2cdd3365d; __jda=76161171.15882986400711041170491.1588298640.1615375150.1615433646.27; __jdc=76161171; shshshsID=78df4c99f7ac3cfb8779cfec98de51fd_5_1615433671723; __jdb=76161171.8.15882986400711041170491|27.1615433646];

async function downFile() {
    if (!SyncUrl) {
        SyncUrl = "https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js";
    }
    await download(SyncUrl, "./");
}

async function executeOneByOne() {
    const content = await fs.readFileSync("./JD_DailyBonus.js", "utf8");
    for (var i = 0; i < CookieJDs.length; i++) {
        console.log(`正在执行第${i + 1}个账号签到任务`);
        changeFiele(content, CookieJDs[i]);
        console.log("替换变量完毕");
        await exec("node JD_DailyBonus.js", { stdio: "inherit" });
        console.log("执行完毕");
    }
}
async function changeFiele(content, cookieKey) {
    let newContent = content.replace(/var Key = ''/, `var Key = '${cookieKey}'`);
    await fs.writeFileSync("./JD_DailyBonus.js", newContent, "utf8");
}

async function start() {
    if (!JD_COOKIE) {
        console.log("请填写 JD_COOKIE 后在继续");
        return;
    }
    CookieJDs = JD_COOKIE.split("&");
    console.log(`当前共${CookieJDs.length}个账号需要签到`);
    // 下载最新代码
    await downFile();
    console.log("下载代码完毕");
    await executeOneByOne();
    console.log("全部执行完毕");
}

start();
