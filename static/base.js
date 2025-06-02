function downloadZpl() {
    const zplText = document.getElementById('zplOutput').value;
    if (zplText==""){
        Swal.fire("Please convert to zpl before downloading !");
        return;
    }
    const blob = new Blob([zplText], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.zpl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyToClipboard() {
    const zplText = document.getElementById('zplOutput').value;
    if (zplText==""){
        Swal.fire("Please convert to zpl before downloading !");
        return;
    }
    navigator.clipboard.writeText(zplText).then(function () {
        alert('ZPL text copied to clipboard');
    }, function (err) {
        console.error('Unable to copy text: ', err);
    });
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // 发送用户令牌到服务器进行验证
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var result=JSON.parse(xhr.responseText);
            if (result.error&&result.error!=""){
                console.error("login error :",result.error)
                return
            }
            var user = result.user;

            // 存储会话 Token
            document.cookie = "session_token=" + result.token + "; path=/";
            document.getElementById('login-button').style.display = 'none';
            var userInfo = document.getElementById('user-info');
            userInfo.innerHTML = `<img src="${user.picture}" alt="User Picture"> ${user.name}`;
        } else {
            console.error('Failed to sign in:', xhr.responseText);
        }
    };
    xhr.send('idtoken=' + response.credential);
}
//
// window.onload = function () {
//     // 检查会话 Token
//     var token = document.cookie.split('; ').find(row => row.startsWith('session_token='));
//     if (token) {
//         var tokenValue = token.split('=')[1];
//         // 使用会话 Token 验证用户
//         var xhr = new XMLHttpRequest();
//         xhr.open('POST', '/api/validate_token');
//         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 var user = JSON.parse(xhr.responseText).user;
//                 document.getElementById('login-button').style.display = 'none';
//                 var userInfo = document.getElementById('user-info');
//                 userInfo.innerHTML = `<img src="${user.picture}" alt="User Picture">${user.name}`;
//             } else {
//                 console.error('Failed to validate token:', xhr.responseText);
//                 initializeGoogleAccounts();
//             }
//         };
//         xhr.send('token=' + tokenValue);
//     } else {
//         initializeGoogleAccounts();
//     }
//
// }
//
// function initializeGoogleAccounts() {
//     console.warn("initializeGoogleAccounts")
//     google.accounts.id.initialize({
//         client_id: '538946901479-08hh86f43uvd8tk2gpvo7fojmoggbkpt.apps.googleusercontent.com',
//         callback: handleCredentialResponse,
//         auto_select: true
//     });
//
//     google.accounts.id.prompt(); // 显示 One Tap 提示
// }



function toggleAnswer(faq) {
    const answer = faq.nextElementSibling;
    const icon = faq.querySelector('.icon');
    const isOpen = answer.style.display === 'block';

    answer.style.display = isOpen ? 'none' : 'block';
    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}


// 主游戏库 - 包含所有独特的游戏
const GameLibrary = [{
    "id": 0,
    "name": "Cartoon Strike",
    "gameUrl": "https://www.gameflare.com/embed/cartoon-strike/",
    "filePath": "cartoon-strike-logo.jpg",
    "urlPath": "cartoon-strike",
    "isGenerator": true
},{
    "id": 1,
    "name": "Sprunki Retake",
    "gameUrl": "https://game.sprunki-incredibox.org/sprunki/retake/index.html",
    "filePath": "sprunki-retake-logo.jpg",
    "urlPath": "sprunki-retake"
},{
    "id": 2,
    "name": "Incredibox Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/incredibox-sprunki/",
    "filePath": "incredibox-sprunki-logo.jpg",
    "urlPath": "",
    "isGenerator": true   
},{
    "id": 3,
    "name": "Sprunki Phase 3",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-3/",
    "filePath": "sprunki-phase-3-logo.jpg",
    "urlPath": "sprunki-phase-3",
    "isGenerator": true
},{
    "id": 4,
    "name": "Colorbox Mustard",
    "gameUrl": "https://www.gameflare.com/embed/colorbox-mustard/",
    "filePath": "colorbox-mustard-logo.jpg",
    "urlPath": "colorbox-mustard",
    "isGenerator": true 
},{
    "id": 5,
    "name": "Incredibox Abgerny",
    "gameUrl": "https://www.gameflare.com/embed/incredibox-abgerny/",
    "filePath": "incredibox-abgerny-logo.jpg",
    "urlPath": "incredibox-abgerny",
    "isGenerator": true
},{
    "id": 6,
    "name": "Sprunki Phase 4",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-4/",
    "filePath": "sprunki-phase-4-logo.jpg",
    "urlPath": "sprunki-phase-4",
    "isGenerator": true
},{
    "id": 7,
    "name": "Ozzybox Terrors: Incredibox with Horror Characters",
    "gameUrl": "https://www.gameflare.com/embed/ozzybox-terrors-incredibox-with-horror-characters/",
    "filePath": "ozzybox-terrors-incredibox-with-horror-characters-logo.jpg",
    "urlPath": "ozzybox-terrors-incredibox-with-horror-characters",
    "isGenerator": true
},{
    "id": 8,
    "name": "Charlie the Steak",
    "gameUrl": "https://www.gameflare.com/embed/charlie-the-steak/",
    "filePath": "charlie-the-steak-logo.png",
    "urlPath": "charlie-the-steak",
    "isGenerator": true
},{
    "id": 9,
    "name": "FNF Sprunkin",
    "gameUrl": "https://www.gameflare.com/embed/fnf-sprunkin/",
    "filePath": "fnf-sprunkin-logo.jpg",
    "urlPath": "fnf-sprunkin",
    "isGenerator": true
},{
    "id": 10,
    "name": "Sprunki: Original Clicker",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-clicker/",
    "filePath": "sprunki-original-clicker-logo.jpg",
    "urlPath": "sprunki-original-clicker",
    "isGenerator": true
},{
    "id": 11,
    "name": "Sprunki Infected",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-infected/",
    "filePath": "sprunki-infected-logo.jpg",
    "urlPath": "sprunki-infected",
    "isGenerator": true
},{
    "id": 12,
    "name": "Madness: Sheriff's Compound",
    "gameUrl": "https://www.gameflare.com/embed/madness-sheriff-s-compound/",
    "filePath": "madness-sheriffs-compound-logo.jpg",
    "urlPath": "madness-sheriffs-compound",
    "isGenerator": true
},{
    "id": 13,
    "name": "Sprunki's World",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-s-world/",
    "filePath": "sprunki-s-world-logo.jpg",
    "urlPath": "sprunkis-world"
},{
    "id": 14,
    "name": "Cat Life Simulator 3D",
    "gameUrl": "https://www.gameflare.com/embed/cat-life-simulator-3d/",
    "filePath": "cat-life-simulator-3d-logo.jpg",
    "urlPath": "cat-life-simulator-3d"
},{
    "id": 15,
    "name": "Basket Blitz 2",
    "gameUrl": "https://www.gameflare.com/embed/basket-blitz-2/",
    "filePath": "basket-blitz-2-logo.jpg",
    "urlPath": "basket-blitz-2"
},{
    "id": 16,
    "name": "Obby: Hide and Seek Battle Royale",
    "gameUrl": "https://www.gameflare.com/embed/obby-hide-and-seek-battle-royale/",
    "filePath": "obby-hide-and-seek-battle-royale-logo.jpg",
    "urlPath": "obby-hide-and-seek-battle-royale"
},{
    "id": 17,
    "name": "Pixel Playground: Ragdoll Noob",
    "gameUrl": "https://www.gameflare.com/embed/pixel-playground-ragdoll-noob/",
    "filePath": "pixel-playground-ragdoll-noob-logo.jpg",
    "urlPath": "pixel-playground-ragdoll-noob"
},{
    "id": 18,
    "name": "Wolf Family Simulator",
    "gameUrl": "https://www.gameflare.com/embed/wolf-family-simulator/",
    "filePath": "wolf-family-simulator-logo.jpg",
    "urlPath": "wolf-family-simulator"
},{
    "id": 19,
    "name": "My Land: King Defender",
    "gameUrl": "https://www.gameflare.com/embed/my-land-king-defender/",
    "filePath": "my-land-king-defender-logo.jpg",
    "urlPath": "my-land-king-defender"
},{
    "id": 20,
    "name": "Mini Colony",
    "gameUrl": "https://www.gameflare.com/embed/mini-colony/",
    "filePath": "mini-colony-logo.jpg",
    "urlPath": "mini-colony"
},{
    "id": 21,
    "name": "House Builder",
    "gameUrl": "https://www.gameflare.com/embed/house-builder/",
    "filePath": "house-builder-logo.jpg",
    "urlPath": "house-builder"
},{
    "id": 22,
    "name": "Mini Farm",
    "gameUrl": "https://www.gameflare.com/embed/mini-farm/",
    "filePath": "mini-farm-logo.jpg",
    "urlPath": "mini-farm"
},{
    "id": 23,
    "name": "Mini Survival",
    "gameUrl": "https://www.gameflare.com/embed/mini-survival/",
    "filePath": "mini-survival-logo.jpg",
    "urlPath": "mini-survival"
},{
    "id": 24,
    "name": "Business Tycoon",
    "gameUrl": "https://www.gameflare.com/embed/business-tycoon/",
    "filePath": "business-tycoon-logo.jpg",
    "urlPath": "business-tycoon"
},{
    "id": 25,
    "name": "Stunt Destroyer",
    "gameUrl": "https://www.gameflare.com/embed/stunt-destroyer/",
    "filePath": "stunt-destroyer-logo.jpg",
    "urlPath": "stunt-destroyer"
},{
    "id": 26,
    "name": "Save the Penguin",
    "gameUrl": "https://www.gameflare.com/embed/save-the-penguin/",
    "filePath": "save-the-penguin-logo.jpg",
    "urlPath": "save-the-penguin"
},{
    "id": 27,
    "name": "Samurai Warrior",
    "gameUrl": "https://www.gameflare.com/embed/samurai-warrior/",
    "filePath": "samurai-warrior-logo.jpg",
    "urlPath": "samurai-warrior"
},{
    "id": 28,
    "name": "Prison Break",
    "gameUrl": "https://www.gameflare.com/embed/prison-break/",
    "filePath": "prison-break-logo.jpg",
    "urlPath": "prison-break"
},{
    "id": 29,
    "name": "Monopoly Online",
    "gameUrl": "https://www.gameflare.com/embed/monopoly-online/",
    "filePath": "monopoly-online-logo.jpg",
    "urlPath": "monopoly-online"
},{
    "id": 30,
    "name": "Melon Sandbox",
    "gameUrl": "https://www.gameflare.com/embed/melon-sandbox/",
    "filePath": "melon-sandbox-logo.jpg",
    "urlPath": "melon-sandbox"
},{
    "id": 31,
    "name": "Bloons Tower Defense 5",
    "gameUrl": "https://www.gameflare.com/embed/bloons-tower-defense-5/",
    "filePath": "bloons-tower-defense-5-logo.jpg",
    "urlPath": "bloons-tower-defense-5"
},{
    "id": 32,
    "name": "Five Nights at Freddy's",
    "gameUrl": "https://www.gameflare.com/embed/five-nights-at-freddys/",
    "filePath": "five-nights-at-freddy-s-logo.jpg",
    "urlPath": "five-nights-at-freddys"
},{
    "id": 33,
    "name": "Race Survival: Arena King",
    "gameUrl": "https://www.gameflare.com/embed/race-survival-arena-king/",
    "filePath": "race-survival-arena-king-logo.jpg",
    "urlPath": "race-survival-arena-king"
},{
    "id": 34,
    "name": "Toca Life World",
    "gameUrl": "https://www.gameflare.com/embed/toca-life-world/",
    "filePath": "toca-life-world-logo.jpg",
    "urlPath": "toca-life-world"
},{
    "id": 35,
    "name": "Garry's Mod",
    "gameUrl": "https://www.gameflare.com/embed/garry-s-mod/",
    "filePath": "garry-s-mod-logo.jpg",
    "urlPath": "garrys-mod"
},{
    "id": 36,
    "name": "Learn to Fly 3",
    "gameUrl": "https://www.gameflare.com/embed/learn-to-fly-3/",
    "filePath": "learn-to-fly-3-logo.jpg",
    "urlPath": "learn-to-fly-3"
},{
    "id": 37,
    "name": "Lightbot",
    "gameUrl": "https://www.gameflare.com/embed/light-bot/",
    "filePath": "lightbot-logo.jpg",
    "urlPath": "lightbot"
},{
    "id": 38,
    "name": "Sprunki Phase 6",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-6/",
    "filePath": "sprunki-phase-6-logo.jpg",
    "urlPath": "sprunki-phase-6"
},{
    "id": 39,
    "name": "Sprunki Kissing Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-kissing-mod/",
    "filePath": "sprunki-kissing-mod-logo.jpg",
    "urlPath": "sprunki-kissing-mod"
},{
    "id": 40,
    "name": "Sprunki Phase 7",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-7/",
    "filePath": "sprunki-phase-7-logo.jpg",
    "urlPath": "sprunki-phase-7"
},{
    "id": 41,
    "name": "Corruptbox3 x Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/corruptbox3-x-sprunki/",
    "filePath": "corruptbox3-x-sprunki-logo.jpg",
    "urlPath": "corruptbox3-x-sprunki"
},{
    "id": 42,
    "name": "Sprunki Phase 10",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-10/",
    "filePath": "sprunki-phase-10-logo.jpg",
    "urlPath": "sprunki-phase-10"
},{
    "id": 43,
    "name": "Sprunki Phase 8",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-8/",
    "filePath": "sprunki-phase-8-logo.jpg",
    "urlPath": "sprunki-phase-8"
},{
    "id": 44,
    "name": "Corruptbox 2 but Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/corruptbox-2-but-sprunki/",
    "filePath": "corruptbox-2-but-sprunki-logo.jpg",
    "urlPath": "corruptbox-2-but-sprunki"
},{
    "id": 45,
    "name": "Sprunki Phase 777",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-777/",
    "filePath": "sprunki-phase-777-logo.jpg",
    "urlPath": "sprunki-phase-777"
},{
    "id": 46,
    "name": "Sprunki Modded",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-modded/",
    "filePath": "sprunki-modded-logo.jpg",
    "urlPath": "sprunki-modded"
},{
    "id": 47,
    "name": "Sprunki Spunkr!!",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-spunkr/",
    "filePath": "sprunki-spunkr-logo.jpg",
    "urlPath": "sprunki-spunkr"
},{
    "id": 48,
    "name": "Sprunki Phase 9",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-9/",
    "filePath": "sprunki-phase-9-logo.jpg",
    "urlPath": "sprunki-phase-9"
},{
    "id": 49,
    "name": "Sprunki Retake 2",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake-2/",
    "filePath": "sprunki-retake-2-logo.jpg",
    "urlPath": "sprunki-retake-2"
},{
    "id": 50,
    "name": "Granny's Classroom Nightmare",
    "gameUrl": "https://www.gameflare.com/embed/granny-s-classroom-nightmare/",
    "filePath": "granny-s-classroom-nightmare-logo.jpg",
    "urlPath": "granny-s-classroom-nightmare"
},{
    "id": 51,
    "name": "MiSide",
    "gameUrl": "https://www.gameflare.com/embed/miside/",
    "filePath": "miside-logo.jpg",
    "urlPath": "miside"
},{
    "id": 52,
    "name": "Sprunki Relish",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-relish/",
    "filePath": "sprunki-relish-logo.jpg",
    "urlPath": "sprunki-relish"
},{
    "id": 53,
    "name": "Sprunkr Phase 3",
    "gameUrl": "https://www.gameflare.com/embed/sprunkr-phase-3/",
    "filePath": "sprunkr-phase-3-logo.jpg",
    "urlPath": "sprunkr-phase-3"
},{
    "id": 54,
    "name": "Clean 3D",
    "gameUrl": "https://www.gameflare.com/embed/clean-3d/",
    "filePath": "clean-3d-logo.jpg",
    "urlPath": "clean-3d"
},{
    "id": 55,
    "name": "Sprunki Spruted",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-spruted/",
    "filePath": "sprunki-spruted-logo.jpg",
    "urlPath": "sprunki-spruted"
},{
    "id": 56,
    "name": "Sprunki Mustard",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mustard/",
    "filePath": "sprunki-mustard-logo.jpg",
    "urlPath": "sprunki-mustard"
},{
    "id": 57,
    "name": "Sprunki Phase 5",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-5/",
    "filePath": "sprunki-phase-5-logo.jpg",
    "urlPath": "sprunki-phase-5"
},{
    "id": 58,
    "name": "Sprunked",
    "gameUrl": "https://www.gameflare.com/embed/sprunked/",
    "filePath": "sprunked-logo.jpg",
    "urlPath": "sprunked"
},{
    "id": 59,
    "name": "Sprunki with OC",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-with-oc/",
    "filePath": "sprunki-with-oc-logo.jpg",
    "urlPath": "sprunki-with-oc"
},{
    "id": 60,
    "name": "Sprunki Sprunkr 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-sprunkr-20/",
    "filePath": "sprunki-sprunkr-20-logo.jpg",
    "urlPath": "sprunki-sprunkr-20"
},{
    "id": 61,
    "name": "Sprunki Playtime",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-playtime/",
    "filePath": "sprunki-playtime-logo.jpg",
    "urlPath": "sprunki-playtime"
},{
    "id": 62,
    "name": "Sprunki Rejoyed Secret Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-rejoyed-secret-mod/",
    "filePath": "sprunki-rejoyed-secret-mod-logo.jpg",
    "urlPath": "sprunki-rejoyed-secret-mod"
},{
    "id": 63,
    "name": "Sprunki Megalovania",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-megalovania/",
    "filePath": "sprunki-megalovania-logo.jpg",
    "urlPath": "sprunki-megalovania"
},{
    "id": 64,
    "name": "Sprunki Icebox: Cold As Frost",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-icebox-cold-as-frost/",
    "filePath": "sprunki-icebox-cold-as-frost-logo.jpg",
    "urlPath": "sprunki-icebox-cold-as-frost"
},{
    "id": 65,
    "name": "Sprunki Pyramixed",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-pyramixed/",
    "filePath": "sprunki-pyramixed-logo.jpg",
    "urlPath": "sprunki-pyramixed"
},{
    "id": 66,
    "name": "Sprunki: Night Time",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-night-time/",
    "filePath": "sprunki-night-time-logo.jpg",
    "urlPath": "sprunki-night-time"
},{
    "id": 67,
    "name": "Sprunki Night Time 2",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-night-time-2/",
    "filePath": "sprunki-night-time-2-logo.jpg",
    "urlPath": "sprunki-night-time-2"
},{
    "id": 68,
    "name": "Sprunki Remastered 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-remastered-20/",
    "filePath": "sprunki-remastered-20-logo.jpg",
    "urlPath": "sprunki-remastered-20"
},{
    "id": 69,
    "name": "Sprunki Icebox: Cool As Ice",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-icebox-cool-as-ice/",
    "filePath": "sprunki-icebox-cool-as-ice-logo.jpg",
    "urlPath": "sprunki-icebox-cool-as-ice"
},{
    "id": 70,
    "name": "Sprunki 3D Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-3d-mod/",
    "filePath": "sprunki-3d-mod-logo.jpg",
    "urlPath": "sprunki-3d-mod"
},{
    "id": 71,
    "name": "Sprunki Phase 11",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-11/",
    "filePath": "sprunki-phase-11-logo.jpg",
    "urlPath": "sprunki-phase-11"
},{
    "id": 72,
    "name": "Sprunki Hyperblast",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-hyperblast/",
    "filePath": "sprunki-hyperblast-logo.jpg",
    "urlPath": "sprunki-hyperblast"
},{
    "id": 73,
    "name": "Sprunki Christmas",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-christmas/",
    "filePath": "sprunki-christmas-logo.jpg",
    "urlPath": "sprunki-christmas"
},{
    "id": 74,
    "name": "Sprunki X Happy Tree Friends",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-happy-tree-friends/",
    "filePath": "sprunki-x-happy-tree-friends-logo.jpg",
    "urlPath": "sprunki-x-happy-tree-friends"
},{
    "id": 75,
    "name": "Sprunki x SepBox: Steel Factory",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-sepbox-steel-factory/",
    "filePath": "sprunki-x-sepbox-steel-factory-logo.jpg",
    "urlPath": "sprunki-x-sepbox-steel-factory"
},{
    "id": 76,
    "name": "Sprunki Scratch",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-scratch/",
    "filePath": "sprunki-scratch-logo.jpg",
    "urlPath": "sprunki-scratch"
},{
    "id": 77,
    "name": "Sprunki Mr.Tree Family",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mrtree-family/",
    "filePath": "sprunki-mrtree-family-logo.jpg",
    "urlPath": "sprunki-mrtree-family"
},{
    "id": 78,
    "name": "Sprunki Dash",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-dash/",
    "filePath": "sprunki-dash-logo.jpg",
    "urlPath": "sprunki-dash"
},{
    "id": 79,
    "name": "Sprunki But I Ruined It",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-but-i-ruined-it/",
    "filePath": "sprunki-but-i-ruined-it-logo.jpg",
    "urlPath": "sprunki-but-i-ruined-it"
},{
    "id": 80,
    "name": "Sprunki: Mr. Fun Computers",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mr-fun-computers/",
    "filePath": "sprunki-mr-fun-computers-logo.jpg",
    "urlPath": "sprunki-mr-fun-computers"
},{
    "id": 81,
    "name": "Sprunki X Rejecz [SPREJECZ]",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-rejecz-sprejecz/",
    "filePath": "sprunki-x-rejecz-sprejecz-logo.jpg",
    "urlPath": "sprunki-x-rejecz-sprejecz"
},{
    "id": 82,
    "name": "Sprunki Retake: Oren Virus",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake-oren-virus/",
    "filePath": "sprunki-retake-oren-virus-logo.jpg",
    "urlPath": "sprunki-retake-oren-virus"
},{
    "id": 83,
    "name": "Sprunki Minecraft",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-minecraft/",
    "filePath": "sprunki-minecraft-logo.jpg",
    "urlPath": "sprunki-minecraft"
},{
    "id": 84,
    "name": "Sprunki: The Lost File",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-the-lost-file/",
    "filePath": "sprunki-the-lost-file-logo.jpg",
    "urlPath": "sprunki-the-lost-file"
},{
    "id": 85,
    "name": "Five Nights with Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/five-nights-with-sprunki/",
    "filePath": "five-nights-with-sprunki-logo.jpg",
    "urlPath": "five-nights-with-sprunki"
},{
    "id": 86,
    "name": "Sprunki Definitive Phase 3",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-definitive-phase-3/",
    "filePath": "sprunki-definitive-phase-3-logo.jpg",
    "urlPath": "sprunki-definitive-phase-3"
},{
    "id": 87,
    "name": "ParaSprunki Retake",
    "gameUrl": "https://www.gameflare.com/embed/parasprunki-retake/",
    "filePath": "parasprunki-retake-logo.jpg",
    "urlPath": "parasprunki-retake"
},{
    "id": 88,
    "name": "Sprunkilairity Remake",
    "gameUrl": "https://www.gameflare.com/embed/sprunkilairity-remake/",
    "filePath": "sprunkilairity-remake-logo.jpg",
    "urlPath": "sprunkilairity-remake"
},{
    "id": 89,
    "name": "Sprunkstard Human Edition",
    "gameUrl": "https://www.gameflare.com/embed/sprunkstard-human-edition/",
    "filePath": "sprunkstard-human-edition-logo.jpg",
    "urlPath": "sprunkstard-human-edition"
},{
    "id": 90,
    "name": "Sprunkilairity",
    "gameUrl": "https://www.gameflare.com/embed/sprunkilairity/",
    "filePath": "sprunkilairity-logo.jpg",
    "urlPath": "sprunkilairity"
},{
    "id": 91,
    "name": "Sprunked 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunked-20/",
    "filePath": "sprunked-20-logo.jpg",
    "urlPath": "sprunked-20"
},{
    "id": 92,
    "name": "HTSprunkis Retake",
    "gameUrl": "https://www.gameflare.com/embed/htsprunkis-retake/",
    "filePath": "htsprunkis-retake-logo.jpg",
    "urlPath": "htsprunkis-retake"
},{
    "id": 93,
    "name": "Sprunked Retake",
    "gameUrl": "https://www.gameflare.com/embed/sprunked-retake/",
    "filePath": "sprunked-retake-logo.jpg",
    "urlPath": "sprunked-retake"
},{
    "id": 94,
    "name": "Kino Sprunked",
    "gameUrl": "https://www.gameflare.com/embed/kino-sprunked/",
    "filePath": "kino-sprunked-logo.jpg",
    "urlPath": "kino-sprunked"
},{
    "id": 95,
    "name": "SprunkioPhobia",
    "gameUrl": "https://www.gameflare.com/embed/sprunkiophobia/",
    "filePath": "sprunkiophobia-logo.jpg",
    "urlPath": "sprunkiophobia"
},{
    "id": 96,
    "name": "Sprunki Night Time Phase 3",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-night-time-phase-3/",
    "filePath": "sprunki-night-time-phase-3-logo.jpg",
    "urlPath": "sprunki-night-time-phase-3"
},{
    "id": 97,
    "name": "Minecraft: Create a Monster and Fight!",
    "gameUrl": "https://www.gameflare.com/embed/minecraft-create-a-monster-and-fight/",
    "filePath": "minecraft-create-a-monster-and-fight-logo.jpg",
    "urlPath": "minecraft-create-a-monster-and-fight"
},{
    "id": 98,
    "name": "Sprunki Definitive Phase 6",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-definitive-phase-6/",
    "filePath": "sprunki-definitive-phase-6-logo.jpg",
    "urlPath": "sprunki-definitive-phase-6"
},{
    "id": 99,
    "name": "Squid Game 2: Mini Games",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-2-mini-games/",
    "filePath": "squid-game-2-mini-games-logo.jpg",
    "urlPath": "squid-game-2-mini-games"
},{
    "id": 100,
    "name": "Revenge and Justice",
    "gameUrl": "https://www.gameflare.com/embed/revenge-and-justice/",
    "filePath": "revenge-and-justice-logo.jpg",
    "urlPath": "revenge-and-justice"
},{
    "id": 101,
    "name": "Sprunki x Dandy's World 2",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-dandy-s-world-2/",
    "filePath": "sprunki-x-dandy-s-world-2-logo.jpg",
    "urlPath": "sprunki-x-dandy-s-world-2"
},{
    "id": 102,
    "name": "Sprunki ParodyBox",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-parodybox/",
    "filePath": "sprunki-parodybox-logo.jpg",
    "urlPath": "sprunki-parodybox"
},{
    "id": 103,
    "name": "Sprunksters",
    "gameUrl": "https://www.gameflare.com/embed/sprunksters/",
    "filePath": "sprunksters-logo.jpg",
    "urlPath": "sprunksters"
},{
    "id": 104,
    "name": "Sprunki Retake: Deluxe",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake-deluxe/",
    "filePath": "sprunki-retake-deluxe-logo.jpg",
    "urlPath": "sprunki-retake-deluxe"
},{
    "id": 105,
    "name": "Sprunki: Chaotic Good",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-chaotic-good/",
    "filePath": "sprunki-chaotic-good-logo.jpg",
    "urlPath": "sprunki-chaotic-good"
},{
    "id": 106,
    "name": "Kino Sprunked 2.0",
    "gameUrl": "https://www.gameflare.com/embed/kino-sprunked-20/",
    "filePath": "kino-sprunked-20-logo.jpg",
    "urlPath": "kino-sprunked-20"
},{
    "id": 107,
    "name": "ParaSprunki Pyramixed",
    "gameUrl": "https://www.gameflare.com/embed/parasprunki-pyramixed/",
    "filePath": "parasprunki-pyramixed-logo.jpg",
    "urlPath": "parasprunki-pyramixed"
},{
    "id": 108,
    "name": "Sprunki Phase 777",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-777/",
    "filePath": "sprunki-phase-777-logo.jpg",
    "urlPath": "sprunki-phase-777"
},{
    "id": 109,
    "name": "Sprunkilairity 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunkilairity-20/",
    "filePath": "sprunkilairity-20-logo.jpg",
    "urlPath": "sprunkilairity-20"
},{
    "id": 110,
    "name": "Incredibox Banana",
    "gameUrl": "https://www.gameflare.com/embed/incredibox-banana/",
    "filePath": "incredibox-banana-logo.jpg",
    "urlPath": "incredibox-banana"
},{
    "id": 111,
    "name": "Sprunki: Cool As Ice Original 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-cool-as-ice-original-20/",
    "filePath": "sprunki-cool-as-ice-original-20-logo.jpg",
    "urlPath": "sprunki-cool-as-ice-original-20"
},{
    "id": 112,
    "name": "Sprunki Playground",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-playground/",
    "filePath": "sprunki-playground-logo.jpg",
    "urlPath": "sprunki-playground"
},{
    "id": 113,
    "name": "Sprunki Phase 69",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-69/",
    "filePath": "sprunki-phase-69-logo.jpg",
    "urlPath": "sprunki-phase-69"
},{
    "id": 114,
    "name": "Sprunki Sprinkle",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-sprinkle/",
    "filePath": "sprunki-sprinkle-logo.jpg",
    "urlPath": "sprunki-sprinkle"
},{
    "id": 115,
    "name": "Sprunki Retake: Human Edition",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake-human-edition/",
    "filePath": "sprunki-retake-human-edition-logo.jpg",
    "urlPath": "sprunki-retake-human-edition"
},{
    "id": 116,
    "name": "Sprunki: Lights Out",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-lights-out/",
    "filePath": "sprunki-lights-out-logo.jpg",
    "urlPath": "sprunki-lights-out"
},{
    "id": 117,
    "name": "Sprunki But Everyone Gyat",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-but-everyone-gyat/",
    "filePath": "sprunki-but-everyone-gyat-logo.jpg",
    "urlPath": "sprunki-but-everyone-gyat"
},{
    "id": 118,
    "name": "Sprunki x BFDI",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-bfdi/",
    "filePath": "sprunki-x-bfdi-logo.jpg",
    "urlPath": "sprunki-x-bfdi"
},{
    "id": 119,
    "name": "Traffic Jam 3D",
    "gameUrl": "https://www.gameflare.com/embed/traffic-jam-3d/",
    "filePath": "traffic-jam-3d-logo.jpg",
    "urlPath": "traffic-jam-3d"
},{
    "id": 120,
    "name": "Sprunki Retake: Babies",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake-babies/",
    "filePath": "sprunki-retake-babies-logo.jpg",
    "urlPath": "sprunki-retake-babies"
},{
    "id": 121,
    "name": "Sprunki with OC 2",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-with-oc-2/",
    "filePath": "sprunki-with-oc-2-logo.jpg",
    "urlPath": "sprunki-with-oc-2"
},{
    "id": 122,
    "name": "Sprunki Interactive",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-interactive/",
    "filePath": "sprunki-interactive-logo.jpg",
    "urlPath": "sprunki-interactive"
},{
    "id": 123,
    "name": "Sprunki x Dandy's World",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-dandy-s-world/",
    "filePath": "sprunki-x-dandy-s-world-logo.jpg",
    "urlPath": "sprunki-x-dandy-s-world"
},{
    "id": 124,
    "name": "Sprunki Rejoyed",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-rejoyed/",
    "filePath": "sprunki-rejoyed-logo.jpg",
    "urlPath": "sprunki-rejoyed"
},{
    "id": 125,
    "name": "Sprunki Babies",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-babies/",
    "filePath": "sprunki-babies-logo.jpg",
    "urlPath": "sprunki-babies"
},{
    "id": 126,
    "name": "Deal or No Deal",
    "gameUrl": "https://www.gameflare.com/embed/deal-or-no-deal/",
    "filePath": "deal-or-no-deal-logo.jpg",
    "urlPath": "deal-or-no-deal"
},{
    "id": 127,
    "name": "Stick War II: Order Empire",
    "gameUrl": "https://www.gameflare.com/embed/stick-war-ii-order-empire/",
    "filePath": "stick-war-ii-order-empire-logo.jpg",
    "urlPath": "stick-war-ii-order-empire"
},{
    "id": 128,
    "name": "Sprunked Parasite",
    "gameUrl": "https://www.gameflare.com/embed/sprunked-parasite/",
    "filePath": "sprunked-parasite-logo.jpg",
    "urlPath": "sprunked-parasite"
},{
    "id": 129,
    "name": "Sprunki Hyperblast",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-hyperblast/",
    "filePath": "sprunki-hyperblast-logo.jpg",
    "urlPath": "sprunki-hyperblast"
},{
    "id": 130,
    "name": "Sprunki Ragdoll: Box 3D",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-ragdoll-box-3d/",
    "filePath": "sprunki-ragdoll-box-3d-logo.jpg",
    "urlPath": "sprunki-ragdoll-box-3d"
},{
    "id": 131,
    "name": "Sprunki Relish",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-relish/",
    "filePath": "sprunki-relish-logo.jpg",
    "urlPath": "sprunki-relish"
},{
    "id": 132,
    "name": "Sprunki But Everyone is Alive",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-but-everyone-is-alive/",
    "filePath": "sprunki-but-everyone-is-alive-logo.jpg",
    "urlPath": "sprunki-but-everyone-is-alive"
},{
    "id": 133,
    "name": "Cactus McCoy",
    "gameUrl": "https://www.gameflare.com/embed/cactus-mccoy/",
    "filePath": "cactus-mccoy-logo.jpg",
    "urlPath": "cactus-mccoy"
},{
    "id": 134,
    "name": "Papa Louie 2: When Burgers Attack!",
    "gameUrl": "https://www.gameflare.com/embed/papa-louie-2-when-burgers-attack/",
    "filePath": "papa-louie-2-when-burgers-attack-logo.jpg",
    "urlPath": "papa-louie-2-when-burgers-attack"
},{
    "id": 135,
    "name": "Road of the Dead",
    "gameUrl": "https://www.gameflare.com/embed/road-of-the-dead/",
    "filePath": "road-of-the-dead-logo.jpg",
    "urlPath": "road-of-the-dead"
},{
    "id": 136,
    "name": "Frunki: The Fruity Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/frunki-the-fruity-sprunki/",
    "filePath": "frunki-the-fruity-sprunki-logo.jpg",
    "urlPath": "frunki-the-fruity-sprunki"
},{
    "id": 137,
    "name": "Sprunki OC v3",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-oc-v3/",
    "filePath": "sprunki-oc-v3-logo.jpg",
    "urlPath": "sprunki-oc-v3"
},{
    "id": 138,
    "name": "Sprunbox: The Qoobies",
    "gameUrl": "https://www.gameflare.com/embed/sprunbox-the-qoobies/",
    "filePath": "sprunbox-the-qoobies-logo.jpg",
    "urlPath": "sprunbox-the-qoobies"
},{
    "id": 139,
    "name": "Sprunki Sonic",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-sonic/",
    "filePath": "sprunki-sonic-logo.jpg",
    "urlPath": "sprunki-sonic"
},{
    "id": 140,
    "name": "Roblox: Barry's Prison Run",
    "gameUrl": "https://www.gameflare.com/embed/roblox-barry-s-prison-run/",
    "filePath": "roblox-barry-s-prison-run-logo.jpg",
    "urlPath": "roblox-barry-s-prison-run"
},{
    "id": 141,
    "name": "Age of War 2",
    "gameUrl": "https://www.gameflare.com/embed/age-of-war-2/",
    "filePath": "age-of-war-2-logo.jpg",
    "urlPath": "age-of-war-2"
},{
    "id": 142,
    "name": "Corruptbox But Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/corruptbox-but-sprunki/",
    "filePath": "corruptbox-but-sprunki-logo.jpg",
    "urlPath": "corruptbox-but-sprunki"
},{
    "id": 143,
    "name": "Angry Birds",
    "gameUrl": "https://www.gameflare.com/embed/angry-birds/",
    "filePath": "angry-birds-logo.jpg",
    "urlPath": "angry-birds"
},{
    "id": 144,
    "name": "Sprunki: The Amazing Digital Circus",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-the-amazing-digital-circus/",
    "filePath": "sprunki-the-amazing-digital-circus-logo.jpg",
    "urlPath": "sprunki-the-amazing-digital-circus"
},{
    "id": 145,
    "name": "Brawl Stars",
    "gameUrl": "https://www.gameflare.com/embed/brawl-stars/",
    "filePath": "brawl-stars-logo.jpg",
    "urlPath": "brawl-stars"
},{
    "id": 146,
    "name": "Rogue Soul",
    "gameUrl": "https://www.gameflare.com/embed/rogue-soul/",
    "filePath": "rogue-soul-logo.jpg",
    "urlPath": "rogue-soul"
},{
    "id": 147,
    "name": "Can Your Pet?",
    "gameUrl": "https://www.gameflare.com/embed/can-your-pet/",
    "filePath": "can-your-pet-logo.jpg",
    "urlPath": "can-your-pet"
},{
    "id": 148,
    "name": "Flight of the Hamsters",
    "gameUrl": "https://www.gameflare.com/embed/flight-of-the-hamsters/",
    "filePath": "flight-of-the-hamsters-logo.jpg",
    "urlPath": "flight-of-the-hamsters"
},{
    "id": 149,
    "name": "Bloxd.io",
    "gameUrl": "https://www.gameflare.com/embed/bloxdio/",
    "filePath": "bloxdio-logo.jpg",
    "urlPath": "bloxdio"
},{
    "id": 150,
    "name": "Sprunki But Human",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-but-human/",
    "filePath": "sprunki-but-human-logo.jpg",
    "urlPath": "sprunki-but-human"
},{
    "id": 151,
    "name": "Papa Louie 3: When Sundaes Attack!",
    "gameUrl": "https://www.gameflare.com/embed/papa-louie-3-when-sundaes-attack/",
    "filePath": "papa-louie-3-when-sundaes-attack-logo.jpg",
    "urlPath": "papa-louie-3-when-sundaes-attack"
},{
    "id": 152,
    "name": "Sprunki: Skibidi Toilet 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-skibidi-toilet-20/",
    "filePath": "sprunki-skibidi-toilet-20-logo.jpg",
    "urlPath": "sprunki-skibidi-toilet-20"
},{
    "id": 153,
    "name": "Sprunki Meme Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-meme-mod/",
    "filePath": "sprunki-meme-mod-logo.jpg",
    "urlPath": "sprunki-meme-mod"
},{
    "id": 154,
    "name": "Avatar World",
    "gameUrl": "https://www.gameflare.com/embed/avatar-world/",
    "filePath": "avatar-world-logo.jpg",
    "urlPath": "avatar-world"
},{
    "id": 155,
    "name": "Five Nights at Freddy's 4",
    "gameUrl": "https://www.gameflare.com/embed/five-nights-at-freddy-s-4/",
    "filePath": "five-nights-at-freddy-s-4-logo.jpg",
    "urlPath": "five-nights-at-freddy-s-4"
},{
    "id": 156,
    "name": "People Playground",
    "gameUrl": "https://www.gameflare.com/embed/people-playground/",
    "filePath": "people-playground-logo.jpg",
    "urlPath": "people-playground"
},{
    "id": 157,
    "name": "Squid Game: Survival 456!",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-survival-456/",
    "filePath": "squid-game-survival-456-logo.jpg",
    "urlPath": "squid-game-survival-456"
},{
    "id": 158,
    "name": "Haunt the House",
    "gameUrl": "https://www.gameflare.com/embed/haunt-the-house/",
    "filePath": "haunt-the-house-logo.jpg",
    "urlPath": "haunt-the-house"
},{
    "id": 159,
    "name": "Sprunki Blue Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-blue-mod/",
    "filePath": "sprunki-blue-mod-logo.jpg",
    "urlPath": "sprunki-blue-mod"
},{
    "id": 160,
    "name": "Yetisports - Flamingo drive",
    "gameUrl": "https://www.gameflare.com/embed/yetisports---flamingo-drive/",
    "filePath": "yetisports---flamingo-drive-logo.jpg",
    "urlPath": "yetisports---flamingo-drive"
},{
    "id": 161,
    "name": "Dude Theft Wars",
    "gameUrl": "https://www.gameflare.com/embed/dude-theft-wars/",
    "filePath": "dude-theft-wars-logo.jpg",
    "urlPath": "dude-theft-wars"
},{
    "id": 162,
    "name": "Squid Game Playground",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-playground/",
    "filePath": "squid-game-playground-logo.jpg",
    "urlPath": "squid-game-playground"
},{
    "id": 163,
    "name": "Squid Game Sniper",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-sniper/",
    "filePath": "squid-game-sniper-logo.jpg",
    "urlPath": "squid-game-sniper"
},{
    "id": 164,
    "name": "Five nights at Freddy's 2",
    "gameUrl": "https://www.gameflare.com/embed/five-nights-at-freddy-s-2/",
    "filePath": "five-nights-at-freddy-s-2-logo.jpg",
    "urlPath": "five-nights-at-freddy-s-2"
},{
    "id": 165,
    "name": "Sprunki x FPE",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-fpe/",
    "filePath": "sprunki-x-fpe-logo.jpg",
    "urlPath": "sprunki-x-fpe"
},{
    "id": 166,
    "name": "Sprunki: Mr. Sun Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mr-sun-mod/",
    "filePath": "sprunki-mr-sun-mod-logo.jpg",
    "urlPath": "sprunki-mr-sun-mod"
},{
    "id": 167,
    "name": "Flip Master",
    "gameUrl": "https://www.gameflare.com/embed/flip-master/",
    "filePath": "flip-master-logo.jpg",
    "urlPath": "flip-master"
},{
    "id": 168,
    "name": "Tower of Memes: Grow Fruit",
    "gameUrl": "https://www.gameflare.com/embed/tower-of-memes-grow-fruit/",
    "filePath": "tower-of-memes-grow-fruit-logo.jpg",
    "urlPath": "tower-of-memes-grow-fruit"
},{
    "id": 169,
    "name": "Bad Piggies",
    "gameUrl": "https://www.gameflare.com/embed/bad-piggies/",
    "filePath": "bad-piggies-logo.jpg",
    "urlPath": "bad-piggies"
},{
    "id": 170,
    "name": "Combat Online",
    "gameUrl": "https://www.gameflare.com/embed/combat-online/",
    "filePath": "combat-online-logo.jpg",
    "urlPath": "combat-online"
},{
    "id": 171,
    "name": "Fortzone Battle Royale",
    "gameUrl": "https://www.gameflare.com/embed/fortzone-battle-royale/",
    "filePath": "fortzone-battle-royale-logo.jpg",
    "urlPath": "fortzone-battle-royale"
},{
    "id": 172,
    "name": "Sprunki Lore Mod",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-lore-mod/",
    "filePath": "sprunki-lore-mod-logo.jpg",
    "urlPath": "sprunki-lore-mod"
},{
    "id": 173,
    "name": "Sprunki Corruptbox Goreless",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-corruptbox-goreless/",
    "filePath": "sprunki-corruptbox-goreless-logo.jpg",
    "urlPath": "sprunki-corruptbox-goreless"
},{
    "id": 174,
    "name": "Roblox: Hide and Seek Extreme",
    "gameUrl": "https://www.gameflare.com/embed/roblox-hide-and-seek-extreme/",
    "filePath": "roblox-hide-and-seek-extreme-logo.jpg",
    "urlPath": "roblox-hide-and-seek-extreme"
},{
    "id": 175,
    "name": "Call of Duty: Zombies (Demake)",
    "gameUrl": "https://www.gameflare.com/embed/call-of-duty-zombies-demake/",
    "filePath": "call-of-duty-zombies-demake-logo.jpg",
    "urlPath": "call-of-duty-zombies-demake"
},{
    "id": 176,
    "name": "Home Sheep Home",
    "gameUrl": "https://www.gameflare.com/embed/home-sheep-home/",
    "filePath": "home-sheep-home-logo.jpg",
    "urlPath": "home-sheep-home"
},{
    "id": 177,
    "name": "Tribals.io Survival",
    "gameUrl": "https://www.gameflare.com/embed/tribalsio-survival/",
    "filePath": "tribalsio-survival-logo.jpg",
    "urlPath": "tribalsio-survival"
},{
    "id": 178,
    "name": "Sprunki X Regretevator",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-regretevator/",
    "filePath": "sprunki-x-regretevator-logo.jpg",
    "urlPath": "sprunki-x-regretevator"
},{
    "id": 179,
    "name": "Sprunki: Mr. Fun Computers",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mr-fun-computers/",
    "filePath": "sprunki-mr-fun-computers-logo.jpg",
    "urlPath": "sprunki-mr-fun-computers"
},{
    "id": 180,
    "name": "Dandy World 3D Simulator",
    "gameUrl": "https://www.gameflare.com/embed/dandy-world-3d-simulator/",
    "filePath": "dandy-world-3d-simulator-logo.jpg",
    "urlPath": "dandy-world-3d-simulator"
},{
    "id": 181,
    "name": "Granny",
    "gameUrl": "https://www.gameflare.com/embed/granny/",
    "filePath": "granny-logo.jpg",
    "urlPath": "granny"
},{
    "id": 182,
    "name": "Governor of poker",
    "gameUrl": "https://www.gameflare.com/embed/governor-of-poker/",
    "filePath": "governor-of-poker-logo.jpg",
    "urlPath": "governor-of-poker"
},{
    "id": 183,
    "name": "Douchebag Workout 2",
    "gameUrl": "https://www.gameflare.com/embed/douchebag-workout-2/",
    "filePath": "douchebag-workout-2-logo.jpg",
    "urlPath": "douchebag-workout-2"
},{
    "id": 184,
    "name": "Supermarket Manager Simulator",
    "gameUrl": "https://www.gameflare.com/embed/supermarket-manager-simulator/",
    "filePath": "supermarket-manager-simulator-logo.jpg",
    "urlPath": "supermarket-manager-simulator"
},{
    "id": 185,
    "name": "Cactus McCoy 2",
    "gameUrl": "https://www.gameflare.com/embed/cactus-mccoy-2/",
    "filePath": "cactus-mccoy-2-logo.jpg",
    "urlPath": "cactus-mccoy-2"
},{
    "id": 186,
    "name": "The Amazing Fix",
    "gameUrl": "https://www.gameflare.com/embed/the-amazing-fix/",
    "filePath": "the-amazing-fix-logo.jpg",
    "urlPath": "the-amazing-fix"
},{
    "id": 187,
    "name": "Zoo 2: Animal Park",
    "gameUrl": "https://www.gameflare.com/embed/zoo-2-animal-park/",
    "filePath": "zoo-2-animal-park-logo.jpg",
    "urlPath": "zoo-2-animal-park"
},{
    "id": 188,
    "name": "Dinosaur Park – Primeval Zoo",
    "gameUrl": "https://www.gameflare.com/embed/dinosaur-park--primeval-zoo/",
    "filePath": "dinosaur-park--primeval-zoo-logo.jpg",
    "urlPath": "dinosaur-park--primeval-zoo"
},{
    "id": 189,
    "name": "Sprunki But I Ruined It",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-but-i-ruined-it/",
    "filePath": "sprunki-but-i-ruined-it-logo.jpg",
    "urlPath": "sprunki-but-i-ruined-it"
},{
    "id": 190,
    "name": "Sandbox Playground 3D",
    "gameUrl": "https://www.gameflare.com/embed/sandbox-playground-3d/",
    "filePath": "sandbox-playground-3d-logo.jpg",
    "urlPath": "sandbox-playground-3d"
},{
    "id": 191,
    "name": "Cat & Granny: Escape",
    "gameUrl": "https://www.gameflare.com/embed/cat--granny-escape/",
    "filePath": "cat--granny-escape-logo.jpg",
    "urlPath": "cat--granny-escape"
},{
    "id": 192,
    "name": "Rainbow Friends Return",
    "gameUrl": "https://www.gameflare.com/embed/rainbow-friends-return/",
    "filePath": "rainbow-friends-return-logo.jpg",
    "urlPath": "rainbow-friends-return"
},{
    "id": 193,
    "name": "Sword Masters",
    "gameUrl": "https://www.gameflare.com/embed/sword-masters/",
    "filePath": "sword-masters-logo.jpg",
    "urlPath": "sword-masters"
},{
    "id": 194,
    "name": "Min Hero: Tower of Sages",
    "gameUrl": "https://www.gameflare.com/embed/min-hero-tower-of-sages/",
    "filePath": "min-hero-tower-of-sages-logo.jpg",
    "urlPath": "min-hero-tower-of-sages"
},{
    "id": 195,
    "name": "Squid Game Mingle",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-mingle/",
    "filePath": "squid-game-mingle-logo.jpg",
    "urlPath": "squid-game-mingle"
},{
    "id": 196,
    "name": "Sprunki: Murder Drones",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-murder-drones/",
    "filePath": "sprunki-murder-drones-logo.jpg",
    "urlPath": "sprunki-murder-drones"
},{
    "id": 197,
    "name": "Sprunki Food Simulator 3D",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-food-simulator-3d/",
    "filePath": "sprunki-food-simulator-3d-logo.jpg",
    "urlPath": "sprunki-food-simulator-3d"
},{
    "id": 198,
    "name": "TABS: Epic Battle Simulator",
    "gameUrl": "https://www.gameflare.com/embed/tabs-epic-battle-simulator/",
    "filePath": "tabs-epic-battle-simulator-logo.jpg",
    "urlPath": "tabs-epic-battle-simulator"
},{
    "id": 199,
    "name": "Who's Your Daddy?",
    "gameUrl": "https://www.gameflare.com/embed/who-s-your-daddy/",
    "filePath": "who-s-your-daddy-logo.jpg",
    "urlPath": "who-s-your-daddy"
},{
    "id": 200,
    "name": "Toca World: Dream Home",
    "gameUrl": "https://www.gameflare.com/embed/toca-world-dream-home/",
    "filePath": "toca-world-dream-home-logo.jpg",
    "urlPath": "toca-world-dream-home"
},{
    "id": 201,
    "name": "Sprunki x Melophobia",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-x-melophobia/",
    "filePath": "sprunki-x-melophobia-logo.jpg",
    "urlPath": "sprunki-x-melophobia"
},{
    "id": 202,
    "name": "Slither.io",
    "gameUrl": "https://www.gameflare.com/embed/slitherio/",
    "filePath": "slitherio-logo.jpg",
    "urlPath": "slitherio"
},{
    "id": 203,
    "name": "GTA: Smash the Car to Pieces!",
    "gameUrl": "https://www.gameflare.com/embed/gta-smash-the-car-to-pieces/",
    "filePath": "gta-smash-the-car-to-pieces-logo.jpg",
    "urlPath": "gta-smash-the-car-to-pieces"
},{
    "id": 204,
    "name": "Mad GunS - Battle Royale",
    "gameUrl": "https://www.gameflare.com/embed/mad-guns-battle-royale/",
    "filePath": "mad-guns-battle-royale-logo.jpg",
    "urlPath": "mad-guns-battle-royale"
},{
    "id": 205,
    "name": "Idle Game Dev Simulator",
    "gameUrl": "https://www.gameflare.com/embed/idle-game-dev-simulator/",
    "filePath": "idle-game-dev-simulator-logo.jpg",
    "urlPath": "idle-game-dev-simulator"
},{
    "id": 206,
    "name": "Sprunki: The Lost Souls",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-the-lost-souls/",
    "filePath": "sprunki-the-lost-souls-logo.jpg",
    "urlPath": "sprunki-the-lost-souls"
},{
    "id": 207,
    "name": "Lulu's Fashion World",
    "gameUrl": "https://www.gameflare.com/embed/lulu-s-fashion-world/",
    "filePath": "lulu-s-fashion-world-logo.jpg",
    "urlPath": "lulu-s-fashion-world"
},{
    "id": 208,
    "name": "Operation Flashpoint: Red - Blue War",
    "gameUrl": "https://www.gameflare.com/embed/operation-flashpoint-red-blue-war/",
    "filePath": "operation-flashpoint-red-blue-war-logo.jpg",
    "urlPath": "operation-flashpoint-red-blue-war"
},{
    "id": 209,
    "name": "Sprunki Phase 1.5 Remaster",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-phase-15-remaster/",
    "filePath": "sprunki-phase-15-remaster-logo.jpg",
    "urlPath": "sprunki-phase-15-remaster"
},{
    "id": 210,
    "name": "Italian Brainrot: Meme Sandbox",
    "gameUrl": "https://www.gameflare.com/embed/italian-brainrot-meme-sandbox/",
    "filePath": "italian-brainrot-meme-sandbox-logo.jpg",
    "urlPath": "italian-brainrot-meme-sandbox"
},{
    "id": 211,
    "name": "Powerwash Simulator: 3D Wash",
    "gameUrl": "https://www.gameflare.com/embed/powerwash-simulator-3d-wash/",
    "filePath": "powerwash-simulator-3d-wash-logo.jpg",
    "urlPath": "powerwash-simulator-3d-wash"
},{
    "id": 212,
    "name": "Brainrot Clicker",
    "gameUrl": "https://www.gameflare.com/embed/brainrot-clicker/",
    "filePath": "brainrot-clicker-logo.jpg",
    "urlPath": "brainrot-clicker"
},{
    "id": 213,
    "name": "Baby Sniper In Vietnam",
    "gameUrl": "https://www.gameflare.com/embed/baby-sniper-in-vietnam/",
    "filePath": "baby-sniper-in-vietnam-logo.jpg",
    "urlPath": "baby-sniper-in-vietnam"
},{
    "id": 214,
    "name": "Squid Game: Mini Games Online",
    "gameUrl": "https://www.gameflare.com/embed/squid-game-mini-games-online/",
    "filePath": "squid-game-mini-games-online-logo.jpg",
    "urlPath": "squid-game-mini-games-online"
},{
    "id": 215,
    "name": "Five Nights at Candy's Remaster",
    "gameUrl": "https://www.gameflare.com/embed/five-nights-at-candy-s-remaster/",
    "filePath": "five-nights-at-candy-s-remaster-logo.jpg",
    "urlPath": "five-nights-at-candy-s-remaster"
},{
    "id": 216,
    "name": "KS Russian Snipers",
    "gameUrl": "https://www.gameflare.com/embed/ks-russian-snipers/",
    "filePath": "ks-russian-snipers-logo.jpg",
    "urlPath": "ks-russian-snipers"
},{
    "id": 217,
    "name": "Grand Escape: Prison",
    "gameUrl": "https://www.gameflare.com/embed/grand-escape-prison/",
    "filePath": "grand-escape-prison-logo.jpg",
    "urlPath": "grand-escape-prison"
},{
    "id": 218,
    "name": "Octopus Invasion",
    "gameUrl": "https://www.gameflare.com/embed/octopus-invasion/",
    "filePath": "octopus-invasion-logo.jpg",
    "urlPath": "octopus-invasion"
},{
    "id": 219,
    "name": "Sprunksters Episode 2: The Cave",
    "gameUrl": "https://www.gameflare.com/embed/sprunksters-episode-2-the-cave/",
    "filePath": "sprunksters-episode-2-the-cave-logo.jpg",
    "urlPath": "sprunksters-episode-2-the-cave"
},{
    "id": 220,
    "name": "Geometry 2.2",
    "gameUrl": "https://www.gameflare.com/embed/geometry-22/",
    "filePath": "geometry-22-logo.jpg",
    "urlPath": "geometry-22"
},{
    "id": 221,
    "name": "Sprunki Mr. Fun Computer Treatment",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-mr-fun-computer-treatment/",
    "filePath": "sprunki-mr-fun-computer-treatment-logo.jpg",
    "urlPath": "sprunki-mr-fun-computer-treatment"
},{
    "id": 222,
    "name": "Italian Brainrot Obby Parkour",
    "gameUrl": "https://www.gameflare.com/embed/italian-brainrot-obby-parkour/",
    "filePath": "italian-brainrot-obby-parkour-logo.jpg",
    "urlPath": "italian-brainrot-obby-parkour"
},{
    "id": 223,
    "name": "Sprunki Wenda Treatment Pyramixed 3.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-wenda-treatment-pyramixed-30/",
    "filePath": "sprunki-wenda-treatment-pyramixed-30-logo.jpg",
    "urlPath": "sprunki-wenda-treatment-pyramixed-30"
},{
    "id": 224,
    "name": "WinterCraft: Survival in the Forest",
    "gameUrl": "https://www.gameflare.com/embed/wintercraft-survival-in-the-forest/",
    "filePath": "wintercraft-survival-in-the-forest-logo.jpg",
    "urlPath": "wintercraft-survival-in-the-forest"
},{
    "id": 225,
    "name": "Adopt Me",
    "gameUrl": "https://www.gameflare.com/embed/adopt-me/",
    "filePath": "adopt-me-logo.jpg",
    "urlPath": "adopt-me"
},{
    "id": 226,
    "name": "Epic Sword Battle!",
    "gameUrl": "https://www.gameflare.com/embed/epic-sword-battle/",
    "filePath": "epic-sword-battle-logo.jpg",
    "urlPath": "epic-sword-battle"
},{
    "id": 227,
    "name": "FRAGEN",
    "gameUrl": "https://www.gameflare.com/embed/fragen/",
    "filePath": "fragen-logo.jpg",
    "urlPath": "fragen"
},{
    "id": 228,
    "name": "Italian Animals Mod: Playground",
    "gameUrl": "https://www.gameflare.com/embed/italian-animals-mod-playground/",
    "filePath": "italian-animals-mod-playground-logo.jpg",
    "urlPath": "italian-animals-mod-playground"
},{
    "id": 229,
    "name": "reKILL",
    "gameUrl": "https://www.gameflare.com/embed/rekill/",
    "filePath": "rekill-logo.jpg",
    "urlPath": "rekill"
},{
    "id": 230,
    "name": "Sprunki MSI Phase 3",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-msi-phase-3/",
    "filePath": "sprunki-msi-phase-3-logo.jpg",
    "urlPath": "sprunki-msi-phase-3"
},{
    "id": 231,
    "name": "Hole Digger",
    "gameUrl": "https://www.gameflare.com/embed/hole-digger/",
    "filePath": "hole-digger-logo.jpg",
    "urlPath": "hole-digger"
},{
    "id": 232,
    "name": "Ultimate Custom Night",
    "gameUrl": "https://www.gameflare.com/embed/ultimate-custom-night/",
    "filePath": "ultimate-custom-night-logo.jpg",
    "urlPath": "ultimate-custom-night"
},{
    "id": 233,
    "name": "Sprunki: Italian Brainrot",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-italian-brainrot/",
    "filePath": "sprunki-italian-brainrot-logo.jpg",
    "urlPath": "sprunki-italian-brainrot"
},{
    "id": 234,
    "name": "Mega Parkour: Obby Escape Run",
    "gameUrl": "https://www.gameflare.com/embed/mega-parkour-obby-escape-run/",
    "filePath": "mega-parkour-obby-escape-run-logo.jpg",
    "urlPath": "mega-parkour-obby-escape-run"
},{
    "id": 235,
    "name": "Pimple Squeeze",
    "gameUrl": "https://www.gameflare.com/embed/pimple-squeeze/",
    "filePath": "pimple-squeeze-logo.jpg",
    "urlPath": "pimple-squeeze"
},{
    "id": 236,
    "name": "Sprunki: Wenda Treatment 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-wenda-treatment-20/",
    "filePath": "sprunki-wenda-treatment-20-logo.jpg",
    "urlPath": "sprunki-wenda-treatment-20"
},{
    "id": 237,
    "name": "Italian Brainrot Animals: Playground",
    "gameUrl": "https://www.gameflare.com/embed/italian-brainrot-animals-playground/",
    "filePath": "italian-brainrot-animals-playground-logo.jpg",
    "urlPath": "italian-brainrot-animals-playground"
},{
    "id": 238,
    "name": "Roblox: Raft Tycoon",
    "gameUrl": "https://www.gameflare.com/embed/roblox-raft-tycoon/",
    "filePath": "roblox-raft-tycoon-logo.jpg",
    "urlPath": "roblox-raft-tycoon"
},{
    "id": 239,
    "name": "Jolly 2",
    "gameUrl": "https://www.gameflare.com/embed/jolly-2/",
    "filePath": "jolly-2-logo.jpg",
    "urlPath": "jolly-2"
},{
    "id": 240,
    "name": "The Definitive Phase 9: Revenge",
    "gameUrl": "https://www.gameflare.com/embed/the-definitive-phase-9-revenge/",
    "filePath": "the-definitive-phase-9-revenge-logo.jpg",
    "urlPath": "the-definitive-phase-9-revenge"
},{
    "id": 241,
    "name": "The Return to Freddy's 3",
    "gameUrl": "https://www.gameflare.com/embed/the-return-to-freddy-s-3/",
    "filePath": "the-return-to-freddy-s-3-logo.jpg",
    "urlPath": "the-return-to-freddy-s-3"
},{
    "id": 242,
    "name": "Mr. Dude: Online Multiverse Challenges",
    "gameUrl": "https://www.gameflare.com/embed/mr-dude-online-multiverse-challenges/",
    "filePath": "mr-dude-online-multiverse-challenges-logo.jpg",
    "urlPath": "mr-dude-online-multiverse-challenges"
},{
    "id": 243,
    "name": "Sprunki.MSI",
    "gameUrl": "https://www.gameflare.com/embed/sprunkimsi/",
    "filePath": "sprunkimsi-logo.jpg",
    "urlPath": "sprunkimsi"
},{
    "id": 244,
    "name": "People vs Zombies: Sandbox",
    "gameUrl": "https://www.gameflare.com/embed/people-vs-zombies-sandbox/",
    "filePath": "people-vs-zombies-sandbox-logo.jpg",
    "urlPath": "people-vs-zombies-sandbox"
},{
    "id": 245,
    "name": "Cat Simulator: My Pets",
    "gameUrl": "https://www.gameflare.com/embed/cat-simulator-my-pets/",
    "filePath": "cat-simulator-my-pets-logo.jpg",
    "urlPath": "cat-simulator-my-pets"
},{
    "id": 246,
    "name": "Sprunki Craft - Sandbox 3D",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-craft-sandbox-3d/",
    "filePath": "sprunki-craft-sandbox-3d-logo.jpg",
    "urlPath": "sprunki-craft-sandbox-3d"
},{
    "id": 247,
    "name": "Ultimate Destruction Simulator",
    "gameUrl": "https://www.gameflare.com/embed/ultimate-destruction-simulator/",
    "filePath": "ultimate-destruction-simulator-logo.jpg",
    "urlPath": "ultimate-destruction-simulator"
},{
    "id": 248,
    "name": "Sprunki All Bonus",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-all-bonus/",
    "filePath": "sprunki-all-bonus-logo.jpg",
    "urlPath": "sprunki-all-bonus"
},{
    "id": 249,
    "name": "Arsenal Playground: Ragdoll Mayhem",
    "gameUrl": "https://www.gameflare.com/embed/arsenal-playground-ragdoll-mayhem/",
    "filePath": "arsenal-playground-ragdoll-mayhem-logo.png",
    "urlPath": "arsenal-playground-ragdoll-mayhem"
},{
    "id": 250,
    "name": "Yubin Niiku 2: Dionysos' Denial",
    "gameUrl": "https://www.gameflare.com/embed/yubin-niiku-2-dionysos-denial/",
    "filePath": "yubin-niiku-2-dionysos-denial-logo.jpg",
    "urlPath": "yubin-niiku-2-dionysos-denial"
},{
    "id": 251,
    "name": "Fluffy Fall",
    "gameUrl": "https://www.gameflare.com/embed/fluffy-fall/",
    "filePath": "fluffy-fall-logo.jpg",
    "urlPath": "fluffy-fall"
},{
    "id": 252,
    "name": "Sprunki Brud Edition",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-brud-edition/",
    "filePath": "sprunki-brud-edition-logo.jpg",
    "urlPath": "sprunki-brud-edition"
},{
    "id": 253,
    "name": "Ragdoll Hit Stickman",
    "gameUrl": "https://www.gameflare.com/embed/ragdoll-hit-stickman/",
    "filePath": "ragdoll-hit-stickman-logo.jpg",
    "urlPath": "ragdoll-hit-stickman"
},{
    "id": 254,
    "name": "3D Pinball Space Cadet",
    "gameUrl": "https://www.gameflare.com/embed/3d-pinball-space-cadet/",
    "filePath": "3d-pinball-space-cadet-logo.jpg",
    "urlPath": "3d-pinball-space-cadet"
},{
    "id": 255,
    "name": "Sprunki Wenda Treatment",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-wenda-treatment/",
    "filePath": "sprunki-wenda-treatment-logo.jpg",
    "urlPath": "sprunki-wenda-treatment"
},{
    "id": 256,
    "name": "Hawk of Evil: Zombie Invasion",
    "gameUrl": "https://www.gameflare.com/embed/hawk-of-evil-zombie-invasion/",
    "filePath": "hawk-of-evil-zombie-invasion-logo.jpg",
    "urlPath": "hawk-of-evil-zombie-invasion"
},{
    "id": 257,
    "name": "Sprunki: Simon's Realm",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-simons-realm/",
    "filePath": "sprunki-simons-realm-logo.jpg",
    "urlPath": "sprunki-simons-realm"
},{
    "id": 258,
    "name": "Hero Blocks Arena! Ragdoll Sword Fight!",
    "gameUrl": "https://www.gameflare.com/embed/hero-blocks-arena-ragdoll-sword-fight/",
    "filePath": "hero-blocks-arena-ragdoll-sword-fight-logo.jpg",
    "urlPath": "hero-blocks-arena-ragdoll-sword-fight"
},{
    "id": 259,
    "name": "Sprunki Chaotic Good PLUS!",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-chaotic-good-plus/",
    "filePath": "sprunki-chaotic-good-plus-logo.jpg",
    "urlPath": "sprunki-chaotic-good-plus"
},{
    "id": 260,
    "name": "Samurai's Shadow",
    "gameUrl": "https://www.gameflare.com/embed/samurais-shadow/",
    "filePath": "samurais-shadow-logo.jpg",
    "urlPath": "samurais-shadow"
},{
    "id": 261,
    "name": "FNF vs Indie Cross",
    "gameUrl": "https://www.gameflare.com/embed/fnf-vs-indie-cross/",
    "filePath": "fnf-vs-indie-cross-logo.jpg",
    "urlPath": "fnf-vs-indie-cross"
},{
    "id": 262,
    "name": "Pixel Path",
    "gameUrl": "https://www.gameflare.com/embed/pixel-path/",
    "filePath": "pixel-path-logo.jpg",
    "urlPath": "pixel-path"
},{
    "id": 263,
    "name": "Sprunksters: The Final Update",
    "gameUrl": "https://www.gameflare.com/embed/sprunksters-the-final-update/",
    "filePath": "sprunksters-the-final-update-logo.jpg",
    "urlPath": "sprunksters-the-final-update"
},{
    "id": 264,
    "name": "Noob Sniper 3D",
    "gameUrl": "https://www.gameflare.com/embed/noob-sniper-3d/",
    "filePath": "noob-sniper-3d-logo.jpg",
    "urlPath": "noob-sniper-3d"
},{
    "id": 265,
    "name": "Dynamons 11",
    "gameUrl": "https://www.gameflare.com/embed/dynamons-11/",
    "filePath": "dynamons-11-logo.jpg",
    "urlPath": "dynamons-11"
},{
    "id": 266,
    "name": "Sprunki Retake",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-retake/",
    "filePath": "sprunki-retake-logo.jpg",
    "urlPath": "sprunki-retake"
},{
    "id": 267,
    "name": "People Playground 3D",
    "gameUrl": "https://www.gameflare.com/embed/people-playground-3d/",
    "filePath": "people-playground-3d-logo.jpg",
    "urlPath": "people-playground-3d"
},{
    "id": 268,
    "name": "Sprunki Ultimate Deluxe",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-ultimate-deluxe/",
    "filePath": "sprunki-ultimate-deluxe-logo.jpg",
    "urlPath": "sprunki-ultimate-deluxe"
},{
    "id": 269,
    "name": "Cubecraft Sandbox: Ragdoll Playground",
    "gameUrl": "https://www.gameflare.com/embed/cubecraft-sandbox-ragdoll-playground/",
    "filePath": "cubecraft-sandbox-ragdoll-playground-logo.jpg",
    "urlPath": "cubecraft-sandbox-ragdoll-playground"
},{
    "id": 270,
    "name": "Spfundi Sprunki",
    "gameUrl": "https://www.gameflare.com/embed/spfundi-sprunki/",
    "filePath": "spfundi-sprunki-logo.jpg",
    "urlPath": "spfundi-sprunki"
},{
    "id": 271,
    "name": "Cat Chaos Simulator",
    "gameUrl": "https://www.gameflare.com/embed/cat-chaos-simulator/",
    "filePath": "cat-chaos-simulator-logo.jpg",
    "urlPath": "cat-chaos-simulator"
},{
    "id": 272,
    "name": "ParaSprunki Phase 3.7",
    "gameUrl": "https://www.gameflare.com/embed/parasprunki-phase-37/",
    "filePath": "parasprunki-phase-37-logo.jpg",
    "urlPath": "parasprunki-phase-37"
},{
    "id": 273,
    "name": "Stick Fighting Online",
    "gameUrl": "https://www.gameflare.com/embed/stick-fighting-online/",
    "filePath": "stick-fighting-online-logo.jpg",
    "urlPath": "stick-fighting-online"
},{
    "id": 274,
    "name": "Overtide.io",
    "gameUrl": "https://www.gameflare.com/embed/overtideio/",
    "filePath": "overtideio-logo.jpg",
    "urlPath": "overtideio"
},{
    "id": 275,
    "name": "Dungeon Master: Cult & Craft",
    "gameUrl": "https://www.gameflare.com/embed/dungeon-master-cult-craft/",
    "filePath": "dungeon-master-cult-craft-logo.jpg",
    "urlPath": "dungeon-master-cult-craft"
},{
    "id": 276,
    "name": "Mosquito Bite 3D",
    "gameUrl": "https://www.gameflare.com/embed/mosquito-bite-3d/",
    "filePath": "mosquito-bite-3d-logo.jpg",
    "urlPath": "mosquito-bite-3d"
},{
    "id": 277,
    "name": "Tunnel Road",
    "gameUrl": "https://www.gameflare.com/embed/tunnel-road/",
    "filePath": "tunnel-road-logo.jpg",
    "urlPath": "tunnel-road"
},{
    "id": 278,
    "name": "Sonic.EXE",
    "gameUrl": "https://www.gameflare.com/embed/sonicexe/",
    "filePath": "sonicexe-logo.jpg",
    "urlPath": "sonicexe"
},{
    "id": 279,
    "name": "Grenadier Noob!",
    "gameUrl": "https://www.gameflare.com/embed/grenadier-noob/",
    "filePath": "grenadier-noob-logo.jpg",
    "urlPath": "grenadier-noob"
},{
    "id": 280,
    "name": "FoodStars.io",
    "gameUrl": "https://www.gameflare.com/embed/foodstarsio/",
    "filePath": "foodstarsio-logo.jpg",
    "urlPath": "foodstarsio"
},{
    "id": 281,
    "name": "I Am Security",
    "gameUrl": "https://www.gameflare.com/embed/i-am-security/",
    "filePath": "i-am-security-logo.jpg",
    "urlPath": "i-am-security"
},{
    "id": 282,
    "name": "GET YOKED: Extreme Bodybuilding",
    "gameUrl": "https://www.gameflare.com/embed/get-yoked-extreme-bodybuilding/",
    "filePath": "get-yoked-extreme-bodybuilding-logo.jpg",
    "urlPath": "get-yoked-extreme-bodybuilding"
},{
    "id": 283,
    "name": "Poxel.io",
    "gameUrl": "https://www.gameflare.com/embed/poxelio/",
    "filePath": "poxelio-logo.jpg",
    "urlPath": "poxelio"
},{
    "id": 284,
    "name": "Sprunki Frunki 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-frunki-20/",
    "filePath": "sprunki-frunki-20-logo.jpg",
    "urlPath": "sprunki-frunki-20"
},{
    "id": 285,
    "name": "GTA: Grand Vegas Crime",
    "gameUrl": "https://www.gameflare.com/embed/gta-grand-vegas-crime/",
    "filePath": "gta-grand-vegas-crime-logo.jpg",
    "urlPath": "gta-grand-vegas-crime"
},{
    "id": 286,
    "name": "Yubin Niiku: The Postal Killer",
    "gameUrl": "https://www.gameflare.com/embed/yubin-niiku-the-postal-killer/",
    "filePath": "yubin-niiku-the-postal-killer-logo.jpg",
    "urlPath": "yubin-niiku-the-postal-killer"
},{
    "id": 287,
    "name": "Trollface Horror",
    "gameUrl": "https://www.gameflare.com/embed/trollface-horror/",
    "filePath": "trollface-horror-logo.jpg",
    "urlPath": "trollface-horror"
},{
    "id": 288,
    "name": "Sprunki Cute Time Mega!!!",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-cute-time-mega/",
    "filePath": "sprunki-cute-time-mega-logo.jpg",
    "urlPath": "sprunki-cute-time-mega"
},{
    "id": 289,
    "name": "Screw Master 3D: Pin Puzzle",
    "gameUrl": "https://www.gameflare.com/embed/screw-master-3d-pin-puzzle/",
    "filePath": "screw-master-3d-pin-puzzle-logo.jpg",
    "urlPath": "screw-master-3d-pin-puzzle"
},{
    "id": 290,
    "name": "Space Waves",
    "gameUrl": "https://www.gameflare.com/embed/space-waves/",
    "filePath": "space-waves-logo.jpg",
    "urlPath": "space-waves"
},{
    "id": 291,
    "name": "Sprunki: Long Hand",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-long-hand/",
    "filePath": "sprunki-long-hand-logo.jpg",
    "urlPath": "sprunki-long-hand"
},{
    "id": 292,
    "name": "Minecraft: Murder Mystery",
    "gameUrl": "https://www.gameflare.com/embed/minecraft-murder-mystery/",
    "filePath": "minecraft-murder-mystery-logo.jpg",
    "urlPath": "minecraft-murder-mystery"
},{
    "id": 293,
    "name": "Sprunki Skrunchy 2.0",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-skrunchy-20/",
    "filePath": "sprunki-skrunchy-20-logo.jpg",
    "urlPath": "sprunki-skrunchy-20"
},{
    "id": 294,
    "name": "Obby: Dragon Training",
    "gameUrl": "https://www.gameflare.com/embed/obby-dragon-training/",
    "filePath": "obby-dragon-training-logo.jpg",
    "urlPath": "obby-dragon-training"
},{
    "id": 295,
    "name": "Soldier of Ruins",
    "gameUrl": "https://www.gameflare.com/embed/soldier-of-ruins/",
    "filePath": "soldier-of-ruins-logo.jpg",
    "urlPath": "soldier-of-ruins"
},{
    "id": 296,
    "name": "Cougar Simulator: Big Cats",
    "gameUrl": "https://www.gameflare.com/embed/cougar-simulator-big-cats/",
    "filePath": "cougar-simulator-big-cats-logo.jpg",
    "urlPath": "cougar-simulator-big-cats"
},{
    "id": 297,
    "name": "The Latest Playground Mod",
    "gameUrl": "https://www.gameflare.com/embed/the-latest-playground-mod/",
    "filePath": "the-latest-playground-mod-logo.jpg",
    "urlPath": "the-latest-playground-mod"
},{
    "id": 298,
    "name": "Sprunki Tragic Breakout",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-tragic-breakout/",
    "filePath": "sprunki-tragic-breakout-logo.jpg",
    "urlPath": "sprunki-tragic-breakout"
},{
    "id": 299,
    "name": "Sprunki Gets Surgery",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-gets-surgery/",
    "filePath": "sprunki-gets-surgery-logo.jpg",
    "urlPath": "sprunki-gets-surgery"
},{
    "id": 300,
    "name": "Geometry Vibes",
    "gameUrl": "https://www.gameflare.com/embed/geometry-vibes/",
    "filePath": "geometry-vibes-logo.jpg",
    "urlPath": "geometry-vibes"
},{
    "id": 301,
    "name": "Throw Things off a Skyscraper",
    "gameUrl": "https://www.gameflare.com/embed/throw-things-off-a-skyscraper/",
    "filePath": "throw-things-off-a-skyscraper-logo.jpg",
    "urlPath": "throw-things-off-a-skyscraper"
},{
    "id": 302,
    "name": "Sprunki Softened",
    "gameUrl": "https://www.gameflare.com/embed/sprunki-softened/",
    "filePath": "sprunki-softened-logo.jpg",
    "urlPath": "sprunki-softened"
},{
    "id": 303,
    "name": "Madness: Arena",
    "gameUrl": "https://www.gameflare.com/embed/madness-arena/",
    "filePath": "madness-arena-logo.jpg",
    "urlPath": "madness-arena"
}];

// 使用索引的游戏列表
const HotNewGamesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 65, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303];

const BestGamesIndex = [0, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

const PopularGamesIndex = [2, 3, 4, 5, 30, 6, 31, 7, 32, 33, 8, 34, 35, 9, 36, 37, 38, 10, 51, 52, 53, 54, 55, 56, 57, 58, 59, 65, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203];

// Sprunki相关游戏列表
const SprunkiGames = [1, 2, 3, 6, 9, 10, 11, 13, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 98, 101, 102, 103, 104, 105, 159, 165, 166, 172, 173, 178, 179, 189, 196, 197, 201, 264, 266, 268, 270, 272, 284, 288, 291, 293, 298, 299, 302];


var HotNewGames = getGamesByIndices(HotNewGamesIndex);
var BestGames = getGamesByIndices(BestGamesIndex);
var PopularGames = getGamesByIndices(PopularGamesIndex);    

// 辅助函数 - 通过索引获取游戏数据
function getGameByIndex(index) {
    return GameLibrary[index];
}

// 辅助函数 - 将索引数组转换为游戏对象数组
function getGamesByIndices(indices) {
    return indices.map(index => getGameByIndex(index));
}

var streamsGames= [
    {
        "name": "Mirthwood",
        "gameUrl": "https://mirthwood.net/",
        "filePath": "mirthwood.jpeg",
        "urlPath": "mirthwood"
    },{
        "name": "Mouthwashing",
        "gameUrl": "https://mouthwashing.co/",
        "filePath": "mouthwashing.jpeg",
        "urlPath": "mouthwashing"
    },{
        "name": "Anime Reborn",
        "gameUrl": "https://animereborn.info/",
        "filePath": "animereborn.jpeg",
        "urlPath": "mouthwashing"
    },
    {
        "name": "Homicipher",
        "gameUrl": "https://homicipher.net/",
        "filePath": "homicipher.jpeg",
        "urlPath": "homicipher"
    },
    {
        "name": "Marvel Rivals",
        "gameUrl": "https://marvelrivals.net/",
        "filePath": "marvelrivals.jpeg",
        "urlPath": "marvelrivals"
    },
    {
        "name": "Monster Hunter Wilds",
        "gameUrl": "https://monsterhunterwilds.org/",
        "filePath": "monsterhunterwilds.jpeg",
        "urlPath": "monsterhunterwilds"
    },
    {
        "name": "The Quinfall",
        "gameUrl": "https://thequinfall.com/",
        "filePath": "thequinfall.jpeg",
        "urlPath": "thequinfall"
    }
];

function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // 防止菜单打开时页面可以滚动
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// 点击菜单项时关闭菜单
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.nav-menu');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});

// 搜索功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('gameSearch');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(() => {
            const results = GameLibrary.filter(game => 
                game.name.toLowerCase().includes(searchTerm)
            ).slice(0, 5); // 只显示前5个结果

            if (results.length > 0) {
                searchResults.innerHTML = results.map(game => `
                    <div class="search-result-item" onclick="window.location.href='${game.urlPath === '' ? '/' : `/games/${game.urlPath}`}'">
                        ${game.name}
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No games found</div>';
                searchResults.classList.add('active');
            }
        }, 300);
    });

    // 点击页面其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // 处理键盘事件
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
        }
    });
});
