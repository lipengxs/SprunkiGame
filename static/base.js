function downloadZpl() {
    const zplText = document.getElementById('zplOutput').value;
    if (zplText==""){
        Swal.fire("Please convert to zpl before downloading !");
        return
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
        return
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
}];

// 使用索引的游戏列表
const HotNewGamesIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

const BestGamesIndex = [0, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

const PopularGamesIndex = [2, 3, 4, 5, 30, 6, 31, 7, 32, 33, 8, 34, 35, 9, 36, 37, 38, 10, 51, 52, 53, 54, 55, 56, 57, 58, 59];

// Sprunki相关游戏列表
const SprunkiGames = [1, 2, 3, 6, 9, 10, 11, 13, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95];


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
