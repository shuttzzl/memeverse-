'use strict';
// Real, recognizable internet meme templates, rendered with custom captions by Memegen.link.
// Fallbacks are the original template images if its caption service is unavailable.
const memes = [
  { id:'m01',t:'drake',tag:'ANIME',post:'"one more episode" is a threat, not a promise',lines:['going_to_bed_at_a_reasonable_time','starting_a_24_episode_anime_at_1AM'],source:'https://knowyourmeme.com/memes/drakeposting',fallback:'https://i.imgflip.com/3yb159.png' },
  { id:'m02',t:'dg',tag:'SCHOOL',post:'the academic comeback has been postponed',lines:['my_exam_tomorrow','me','a_47_minute_video_about_a_rat_cooking'],source:'https://knowyourmeme.com/memes/distracted-boyfriend',fallback:'https://i.imgflip.com/4/1ur9b0.jpg' },
  { id:'m03',t:'fine',tag:'SCHOOL',post:'group project due at 11:59 / group chat at 11:58',lines:['the_group_chat_has_been_silent_for_3_weeks','this_is_fine'],source:'http://gunshowcomic.com/648',fallback:'https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AAedHX70XKjJ4f-ZTt7f_ZQ.jpeg' },
  { id:'m04',t:'doge',tag:'BRAINROT',post:'me after finally understanding a joke from 2013',lines:['such_lore','very_ancient_brainrot'],source:'https://knowyourmeme.com/memes/doge',fallback:'https://i.kym-cdn.com/photos/images/newsfeed/000/581/296/c09.jpg' },
  { id:'m05',t:'ds',tag:'SCHOOL',post:'the hardest decision known to mankind',lines:['start_the_assignment','reorganize_the_whole_desktop','me_with_1_hour_left'],source:'https://knowyourmeme.com/memes/daily-struggle-two-buttons',fallback:'https://i.imgflip.com/4/1g8my4.jpg' },
  { id:'m06',t:'gru',tag:'BRAINROT',post:'my productivity routine (speedrun any%)',lines:['open_laptop_to_study','put_on_some_study_music','watch_3_hours_of_minecraft_lore','watch_3_hours_of_minecraft_lore'],source:'https://knowyourmeme.com/memes/grus-plan',fallback:'https://i.imgflip.com/32c9bd.png' },
  { id:'m07',t:'gb',tag:'ANIME',post:'when you acquire one (1) new anime opinion',lines:['watch_the_show','read_the_manga','memorize_the_opening','argue_online_about_power_scaling'],source:'https://knowyourmeme.com/memes/galaxy-brain',fallback:'https://i.imgflip.com/4y407u.png' },
  { id:'m08',t:'astronaut',tag:'BRAINROT',post:'bro discovered the entire plot',lines:['wait_its_all_side_quests','always_has_been','me','the_internet'],source:'https://knowyourmeme.com/memes/wait-its-all-ohio-always-has-been',fallback:'https://i.imgflip.com/46mhne.png' },
  { id:'m09',t:'pigeon',tag:'ANIME',post:'a random side character gets 4 seconds of screen time',lines:['me_after_seeing_one_cool_character','_','is_this_my_new_entire_personality'],source:'https://knowyourmeme.com/memes/is-this-a-pigeon',fallback:'https://i.imgflip.com/1o00in.jpg' },
  { id:'m10',t:'rollsafe',tag:'SCHOOL',post:'flawless logic. no notes.',lines:['you_cannot_fail_a_pop_quiz','if_you_do_not_open_the_grades'],source:'https://knowyourmeme.com/memes/roll-safe',fallback:'https://i.imgflip.com/1h7in3.jpg' },
  { id:'m11',t:'harold',tag:'SCHOOL',post:'"no worries" — person with 14 worries',lines:['me_saying_no_worries','while_there_are_in_fact_multiple_worries'],source:'https://knowyourmeme.com/memes/hide-the-pain-harold',fallback:'https://i.imgflip.com/4/20co4h.jpg' },
  { id:'m12',t:'facepalm',tag:'BRAINROT',post:'when you accidentally send the screenshot to the person in it',lines:['send_a_screenshot','to_the_person_in_the_screenshot'],source:'https://knowyourmeme.com/memes/facepalm',fallback:'https://i.imgflip.com/4/13eqko.jpg' },
  { id:'m13',t:'disastergirl',tag:'SCHOOL',post:'group chat goes silent when teacher joins',lines:['me_after_saying_the_teacher_is_in_this_group','just_as_planned'],source:'https://knowyourmeme.com/memes/disaster-girl',fallback:'https://i.imgflip.com/4/23ls.jpg' },
  { id:'m14',t:'grumpycat',tag:'ANIME',post:'when someone skips the intro on your favorite anime',lines:['you_skipped_the_opening','unforgivable'],source:'https://knowyourmeme.com/memes/grumpy-cat',fallback:'https://i.imgflip.com/4/8p0a.jpg' },
  { id:'m15',t:'fry',tag:'BRAINROT',post:'the group chat when someone says "we need to talk"',lines:['not_sure_if_its_serious','or_they_found_a_new_meme'],source:'https://knowyourmeme.com/memes/futurama-fry-not-sure-if',fallback:'https://i.imgflip.com/4/1bgw.jpg' },
];
const $ = id => document.getElementById(id);
let activeFilter = 'all';
let order = memes.slice();
const likes = new Set();
const status = $('feedStatus');
const grid = $('feedGrid');
function memeUrl(m) {
  // Memegen URL escaping as documented at https://memegen.link/guide/
  const line = value => value.replace(/~/g,'~~').replace(/ /g,'_').replace(/\?/g,'~q').replace(/#/g,'~h').replace(/%/g,'~p').replace(/&/g,'~a').replace(/\//g,'~s');
  return 'https://api.memegen.link/images/'+encodeURIComponent(m.t)+'/'+m.lines.map(line).join('/')+'.jpg?width=720';
}
function renderFeed() {
  const visible = order.filter(m => activeFilter==='all' || m.tag.toLowerCase()===activeFilter);
  grid.replaceChildren();
  visible.forEach((m,i) => {
    const article = document.createElement('article');article.className='meme-card';
    const top=document.createElement('div');top.className='meme-top';
    const tag=document.createElement('span');tag.className='meme-tag';tag.textContent='// '+m.tag+' ARC';
    const idx=document.createElement('span');idx.className='meme-index';idx.textContent=String(i+1).padStart(2,'0')+' / '+String(visible.length).padStart(2,'0');
    top.append(tag,idx);
    const post=document.createElement('p');post.className='meme-post';post.textContent=m.post;
    const picture=document.createElement('div');picture.className='meme-image';
    const img=document.createElement('img');img.src=memeUrl(m);img.alt='Classic '+m.t+' meme template captioned: '+m.lines.join(' ').replaceAll('_',' ');img.loading=(i<3)?'eager':'lazy';img.decoding='async';
    let retries=0;
    img.addEventListener('error',()=>{if(retries++===0){img.src=m.fallback;}else{img.style.display='none';picture.classList.add('failed');}});
    const failure=document.createElement('div');failure.className='image-failed';failure.textContent='Meme image could not load. Check your internet connection.';
    picture.append(img,failure);
    const bottom=document.createElement('div');bottom.className='meme-bottom';
    const btn=document.createElement('button');btn.type='button';btn.className='meme-reaction'+(likes.has(m.id)?' liked':'');btn.textContent=likes.has(m.id)?'💀 REAL (1)':'💀 this is me (0)';btn.setAttribute('aria-pressed',String(likes.has(m.id)));
    btn.addEventListener('click',()=>{likes.has(m.id)?likes.delete(m.id):likes.add(m.id);btn.classList.toggle('liked',likes.has(m.id));btn.textContent=likes.has(m.id)?'💀 REAL (1)':'💀 this is me (0)';btn.setAttribute('aria-pressed',String(likes.has(m.id)));});
    const link=document.createElement('a');link.className='meme-source';link.textContent='original format ↗';link.href=m.source;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label','Source for '+m.t+' meme format (opens in new tab)');
    bottom.append(btn,link);
    article.append(top,post,picture,bottom);grid.append(article);
  });
  status.textContent=visible.length+' ACTUAL MEME FORMATS FOUND. '+(activeFilter==='all'?'YOUR FOR YOU PAGE IS COOKED.':'YOU ARE DEEP IN THE '+activeFilter.toUpperCase()+' ARC.');
}
document.querySelectorAll('[data-filter]').forEach(btn=>{btn.addEventListener('click',()=>{
  activeFilter=btn.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  renderFeed();
});});
$('shuffle').addEventListener('click',()=>{for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}renderFeed();toast('THE ALGORITHM HAS BEEN SHAKEN.');});
renderFeed();

let toastTimer;
function toast(message){const box=$('toast');box.textContent=message;box.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.classList.remove('visible'),2300);}
const examples=['I have a math exam tomorrow','I went outside today','I just finished my homework','I really need to sleep','My friend left me on read'];
$('exampleBtn').addEventListener('click',()=>{const x=examples[Math.floor(Math.random()*examples.length)];$('normalText').value=x;$('normalText').focus();});
let lastTranslation='';let translateCount=0;
function translate(text){
  const trimmed=text.trim().replace(/\s+/g,' ');
  const trimmedSentence=trimmed.slice(0,170).replace(/[.!?]+$/,'');
  const templates=[
    `CHAT. "${trimmedSentence}"??? that's not a sentence, that's a whole villain origin story. negative 900 aura.`,
    `POV: ${trimmedSentence.toLowerCase()}. bro is not beating the NPC allegations 💀`,
    `"${trimmedSentence}" — the moment bro unlocked the forbidden side quest. absolutely cooked.`,
    `chat be so fr. ${trimmedSentence.toLowerCase()} is giving final boss energy with 2 HP left.`,
    `not me saying "${trimmedSentence}" like the universe isn't about to humble me in 4K.`,
    `THE LORE JUST DROPPED: ${trimmedSentence}. this was NOT on my 2026 bingo card.`,
    `bro really said "${trimmedSentence}" and thought the aura debt collector wouldn't notice. 😭`
  ];
  let result=templates[translateCount%templates.length];translateCount++;
  if(result.length>400)result=result.slice(0,400);
  return result;
}
$('translateForm').addEventListener('submit',e=>{e.preventDefault();const input=$('normalText').value.trim();if(!input){$('normalText').focus();return;}lastTranslation=translate(input);$('translatedText').textContent=lastTranslation;$('outputStatus').textContent='COOKED ✓';});
$('copyTranslation').addEventListener('click',async()=>{
  if(!lastTranslation){toast('TRANSLATE SOMETHING FIRST.');return;}
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(lastTranslation);}else{throw Error('no clipboard');}toast('COPIED. YOUR FRIENDS ARE NOT SAFE.');}
  catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents($('translatedText'));selection.removeAllRanges();selection.addRange(range);toast('TEXT SELECTED — PRESS CTRL+C / CMD+C.');}
});
const auraResults={
  sleep:['+700','YOU ARE AN ACTUAL FUNCTIONING HUMAN. STOP FLEXING.','RARE NON-NPC'],
  anime:['+88','ONE MORE EPISODE = SEVEN MORE EPISODES. WE KNOW.','PROTAGONIST DELUSION'],
  scroll:['−1200','BRO HAS SEEN THE SAME VIDEO 6 TIMES AND STILL HASN’T LIKED IT.','SCROLL GOBLIN'],
  fridge:['+12','THE SNACKS DID NOT RESPAWN. THIS IS NOT MINECRAFT.','MIDNIGHT LOOTER']
};
document.querySelectorAll('[data-aura]').forEach(btn=>{btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-aura]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
  const [score,verdict,stamp]=auraResults[btn.dataset.aura];$('auraNumber').textContent=score;$('auraVerdict').textContent=verdict;$('auraStamp').textContent=stamp;
});btn.setAttribute('aria-pressed','false');});
const modal=$('rickModal'),dialog=modal.querySelector('.modal-dialog');let priorFocus=null;
function openRickroll(){priorFocus=document.activeElement;modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('videoShell').replaceChildren();const iframe=document.createElement('iframe');iframe.title='Rick Astley — Never Gonna Give You Up';iframe.allow='autoplay; encrypted-media; picture-in-picture';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';iframe.src='https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';$('videoShell').append(iframe);dialog.focus();}
function closeRickroll(){if(modal.getAttribute('aria-hidden')==='true')return;modal.setAttribute('aria-hidden','true');document.body.style.overflow='';$('videoShell').replaceChildren();if(priorFocus && priorFocus.focus)priorFocus.focus();}
$('heroTrap').addEventListener('click',openRickroll);$('rewardTrap').addEventListener('click',openRickroll);$('closeModal').addEventListener('click',closeRickroll);modal.querySelector('[data-close-modal]').addEventListener('click',closeRickroll);
document.addEventListener('keydown',e=>{if(modal.getAttribute('aria-hidden')==='false'){if(e.key==='Escape')closeRickroll();if(e.key==='Tab'){const focusables=[...modal.querySelectorAll('button,a[href],iframe')];const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}});
