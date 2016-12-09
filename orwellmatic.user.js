// Generated by LiveScript 1.5.0
/*
// ==UserScript==
// @name        Orwellmatic
// @namespace   yrmj
// @description -irritation, +orwell
// @version     0.1.1
// @include     *theguardian.com/*
// @noframes
// @resource    orwellImage https://raw.githubusercontent.com/yrmj/orwellmatic/master/george-orwell.jpg
// @resource    orwellList https://raw.githubusercontent.com/yrmj/orwellmatic/master/orwellmatic-list.json
// @resource    orwellStyles https://raw.githubusercontent.com/yrmj/orwellmatic/master/orwellmatic-styles.css
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// ==/UserScript==
*/
(function(){
  var orwellList, orwellImage, imageSwap, orwelliseElement, orwelliseDocument, styleNode, styleNodeText, head, people, banner, textbox, hide, switchName, body;
  orwellList = JSON.parse(
  GM_getResourceText('orwellList'));
  orwellImage = GM_getResourceURL('orwellImage');
  imageSwap = function(element){
    var oldImg, newImg;
    oldImg = element.querySelector('picture');
    newImg = document.createElement('img');
    newImg.src = orwellImage;
    newImg.classList.add('orwellmatic');
    element.replaceChild(newImg, oldImg);
  };
  orwelliseElement = function(element){
    var article, that;
    if (element.classList.contains('fc-item__container')) {
      article = Math.floor(Math.random() * orwellList.length);
      element.querySelector('.js-headline-text').innerHTML = orwellList[article].title;
      element.querySelector('.fc-item__link').href = orwellList[article].link;
      element.querySelector('.fc-item__byline').innerHTML = 'George Orwell';
      if (that = element.querySelector('.u-faux-block-link__overlay')) {
        that.innerHTML = orwellList[article].title;
        that.href = orwellList[article].link;
      }
      element.querySelector('.fc-item__meta').style.display = 'none';
      if (that = element.querySelector('.fc-item__avatar')) {
        imageSwap(that);
      } else if (that = element.querySelector('.fc-item__image-container')) {
        imageSwap(that);
      }
    } else {
      orwelliseElement(element.parentNode);
    }
  };
  orwelliseDocument = function(){
    var bylineElements, i$, len$, byline, j$, ref$, len1$, person;
    bylineElements = document.querySelectorAll('.fc-item__byline');
    for (i$ = 0, len$ = bylineElements.length; i$ < len$; ++i$) {
      byline = bylineElements[i$];
      for (j$ = 0, len1$ = (ref$ = people).length; j$ < len1$; ++j$) {
        person = ref$[j$];
        if (person !== '') {
          if (byline.innerHTML.includes(person)) {
            orwelliseElement(byline);
          }
        }
      }
    }
  };
  styleNode = document.createElement('style');
  styleNode.type = 'text/css';
  styleNodeText = document.createTextNode(
  GM_getResourceText('orwellStyles'));
  styleNode.appendChild(styleNodeText);
  styleNode.classList.add('orwellmatic');
  head = document.querySelector('head');
  head.insertBefore(styleNode, head.childNodes[0]);
  people = GM_getValue('people', '').split(', ');
  banner = document.createElement('div');
  banner.classList.add('orwellmatic');
  if (GM_getValue('hidden', false)) {
    banner.classList.add('hidden');
  }
  banner.innerHTML = 'Orwellise: ';
  textbox = document.createElement('textarea');
  textbox.classList.add('orwellmatic');
  textbox.value = people.join(', ');
  textbox.addEventListener("blur", function(){
    people = textbox.value.split(', ');
    GM_setValue('people', textbox.value);
    orwelliseDocument();
  });
  hide = document.createElement('button');
  switchName = {
    'Hide': 'Expand',
    'Expand': 'Hide'
  };
  if (GM_getValue('hidden', false)) {
    hide.innerHTML = 'Expand';
  } else {
    hide.innerHTML = 'Hide';
  }
  hide.classList.add('orwellmatic');
  hide.addEventListener('click', function(){
    if (GM_getValue('hidden', false)) {
      banner.classList.remove('hidden');
      GM_setValue('hidden', false);
    } else {
      banner.classList.add('hidden');
      GM_setValue('hidden', true);
    }
    hide.innerHTML = switchName[hide.innerHTML];
  });
  banner.appendChild(textbox);
  banner.appendChild(hide);
  body = document.querySelector('body');
  body.insertBefore(banner, body.childNodes[0]);
  orwelliseDocument();
}).call(this);
