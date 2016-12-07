/*
// ==UserScript==
// @name        Orwellmatic
// @namespace   yrmj
// @description -irritation, +orwell
// @version     0.1.0
// @include     *theguardian.com/*
// @resource    orwellImage https://raw.githubusercontent.com/yrmj/orwellmatic/master/george-orwell.jpg
// @resource    orwellList https://raw.githubusercontent.com/yrmj/orwellmatic/master/orwellmatic-list.json
// @resource    orwellStyles https://raw.githubusercontent.com/yrmj/orwellmatic/master/orwellmatic-styles.css
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// ==/UserScript==
*/

orwell-list = GM_get-resource-text \orwellList |> JSON.parse
orwell-image = GM_get-resource-URL \orwellImage

image-swap = (element) !->
    old-img = element.query-selector \picture
    new-img = document.create-element \img
    new-img.src = orwell-image
    new-img.class-list.add \orwellmatic
    element.replace-child new-img, old-img

orwellise-element = (element) !->
    if element.class-list.contains \fc-item__container
        article = Math.floor Math.random! * orwell-list.length
        element.query-selector \.js-headline-text .innerHTML = orwell-list[article].title
        element.query-selector \.fc-item__link .href = orwell-list[article].link
        element.query-selector \.fc-item__byline .innerHTML = 'George Orwell'
        if element.query-selector \.u-faux-block-link__overlay
            that.innerHTML = orwell-list[article].title
            that.href = orwell-list[article].link
        element.query-selector \.fc-item__meta .style.display = \none
        if element.query-selector \.fc-item__avatar
            image-swap that
        else if element.query-selector \.fc-item__image-container
            image-swap that
    else
        orwellise-element element.parent-node

orwellise-document = !->
    byline-elements = document.query-selector-all \.fc-item__byline
    for byline in byline-elements
        for person in people when person is not ''
            if byline.inner-HTML.includes person then orwellise-element byline

style-node = document.create-element \style
style-node.type = 'text/css'
style-node-text = GM_get-resource-text \orwellStyles |> document.create-text-node
style-node.append-child style-node-text
style-node.class-list.add 'orwellmatic'
head = document.query-selector \head
head.insert-before style-node, head.child-nodes[0]

people = GM_get-value \people '' .split ', '
banner = document.create-element 'div'
banner.class-list.add \orwellmatic
if GM_get-value \hidden false then banner.class-list.add \hidden
banner.innerHTML = 'Orwellise: '

textbox = document.create-element 'textarea'
textbox.class-list.add \orwellmatic
textbox.value = people.join ', '
textbox.add-event-listener "blur", !->
    people := textbox.value.split ', '
    GM_set-value \people, textbox.value
    orwellise-document!

hide = document.create-element 'button'
switch-name = { 'Hide': 'Expand', 'Expand': 'Hide' }
if GM_get-value \hidden false then hide.inner-HTML = 'Expand' else hide.inner-HTML = 'Hide'
hide.class-list.add \orwellmatic
hide.add-event-listener 'click', !->
    if GM_get-value \hidden false
        banner.class-list.remove \hidden
        GM_set-value \hidden false
    else
        banner.class-list.add \hidden
        GM_set-value \hidden true
    hide.inner-HTML = switch-name[hide.inner-HTML]

banner.append-child textbox
banner.append-child hide
body = document.query-selector 'body'
body.insert-before banner, body.child-nodes[0]

orwellise-document!
