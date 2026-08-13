// automatically open external links in a new tab
document.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(link => {
    link.setAttribute('target', '_blank')
})