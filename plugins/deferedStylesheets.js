const links = [
    'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp&display=swap',
    'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap',
    'https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900',
    'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800'
]

const addStylesheet = (link) => {
    const placeholder = document.createElement('link');
    placeholder.rel = 'stylesheet';
    placeholder.href = link
    placeholder.type = 'text/css';
    const placeholderObj = document.getElementsByTagName('link')[0];
    placeholderObj.parentNode.insertBefore(placeholder, placeholderObj);
}

if (process.client) {
    links.forEach(link => {
        addStylesheet(link)
    })
}
