function arrayUniq(array) {
    return [...new Set(array)];
}
function resizeTarget(target) {
    target.style.height=`${target.value.trim().split('\n').length+5}em`;
}
function splitLine(target) {
    target.value = target.value.split('https://').join('\nhttps://');
    target.value = target.value.split('http://').join('\nhttp://');
    target.value = target.value.split('ftp://').join('\nftp://');
    target.value = target.value.split(location.protocol).join('\n'+location.protocol);

    /* * sort * */
    target.value = target.value.split('\n').sort().join('\n');

    /* * unique list * */
    target.value = arrayUniq(target.value.split('\n')).join('\n');

    console.debug('splitLine', '\n', target.value);
    resizeTarget(target);
}
async function readClipboard(target) {
    const permissionStatus = {
        clipboard: {
            read: await navigator.permissions.query({name: 'clipboard-read'}),
            write: await navigator.permissions.query({name: 'clipboard-write'}),
        },
    };
    console.debug(permissionStatus);

    let text;
    try {
        text = await navigator.clipboard.readText();
    } catch (error) {
        text = '';
        console.error(error);
        console.trace(error);
    }
    console.log(text);
    return text;
}
async function download_list(target, section='', download=true, copy2mem=false) {
    target.disabled = true;
    evented_on = target;
    target = target.parentNode.children.item(1);
    console.debug(target, evented_on);

    const permissionStatus = {};
    permissionStatus['clipboard-write'] = false;
    permissionStatus['clipboard-write'] = await navigator.permissions.query({name: 'clipboard-write'});
    console.debug(`[clipboard-write:permissionStatus:${permissionStatus['clipboard-write'].state}]`, await permissionStatus);

    if (target.tagName.toLowerCase()!='textarea') {
        evented_on.disabled = false;
        return null;
    }

    if(section == false) {
    } else if(section == '') {
        return null;
    } else if(section == 'pbs.twimg.com') {
        /* * function download_list */
        if (target.value.trim().length) {
            items = target.value.split('\n');
            items = items.map((elem) => `wget -O \'${elem.replace(/\?.*/, '').replace(/.*\//, '')}\' \'${elem}\'&`);
            items = items.join('\n') + '\n';
            console.log(items);
            
            if (download) {
                blob = new Blob([items], {type: 'text/plain'});
                a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.target = '_blank';
                a.download = `${(btoa(location.href)).slice(0, 8)}_${Math.trunc(new Date().getTime()/10**3)}.txt`;
                a.click();
            }
            if (copy2mem) {
                navigator.clipboard.writeText(items);
            }
        }
    } else if(section == 'video.twimg.com') {
        /* * function download_list */
        if (target.value.trim().length) {
            items = target.value.split('\n');
            items = items.map((elem) => `ffmpeg -hide_banner -i \'${elem}\' -y -- ${elem.replace(/\?.*/, '').replace(/.*\//, '').replace('.m3u8', '')}.mp4; \\`);
            items = items.join('\n') + '\n';
            console.log(items);
            
            if (download) {
                blob = new Blob([items], {type: 'text/plain'});
                a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.target = '_blank';
                a.download = `${(btoa(location.href)).slice(0, 8)}_${Math.trunc(new Date().getTime()/10**3)}.txt`;
                a.click();
            }
            if (copy2mem) {
                navigator.clipboard.writeText(items);
            }
        }
    } else if(section == 'media.discordapp.net') {
        /* * function download_list */
        if (target.value.trim().length) {
            items = target.value.split('\n');
            items = items.map((elem) => `wget -O \'${elem.replace(/\?.*/, '').replace(/.*\//, '')}\' \'${elem}\'&`);
            items = items.join('\n') + '\n';
            console.log(items);
            
            if (download) {
                blob = new Blob([items], {type: 'text/plain'});
                a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.target = '_blank';
                a.download = `${(btoa(location.href)).slice(0, 8)}_${Math.trunc(new Date().getTime()/10**3)}.txt`;
                a.click();
            }
            if (copy2mem) {
                navigator.clipboard.writeText(items);
            }
        }
    } else {
        /* * function download_list */
        console.warn('Unknown `section`', section);
    }
    evented_on.disabled = false;
}
function view_thumnails(target) {
    data = target.value;
    console.log(data);
    data = data.split('\n');
    dom = [];
    dom[0] = document.createElement('div');
    dom[0].classList.add('thumnails');
    for (let i = 0; i < data.length; i++) {
        dom[1] = document.createElement('a');
        dom[1].href = data[i];
        dom[2] = document.createElement('img');
        dom[2].src = data[i].replace(/(name=.*)/g, 'name=thumb');
        dom[2].setAttribute('onerror', 'removeErrorEntries(this.src);this.remove();');
        dom[1].appendChild(dom[2]);
        dom[0].appendChild(dom[1]);
    }
    Array.from(document.querySelectorAll('div.thumnails')).map((elem) => elem.remove());
    target.parentNode.parentNode.after(dom[0]);
}
function removeErrorEntries(removetxt='') {
    console.log(`removetxt: ${removetxt}`, );
    const textareas = Array.from(document.querySelectorAll('textarea'));

    const escapedText = remotetxt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^${escapedText}$`, 'gm');

    textareas.forEach((e1) => {
        if (e1.value.length > 0) {
        e1.value = e1.value.replace(regex, '');
        e1.dispatchEvent(new Event('change', { bubbles: true }));
        e1.dispatchEvent(new Event('input', { bubbles: true }));
        e1.dispatchEvent(new Event('blur', { bubbles: true }));
        }
    });
}
