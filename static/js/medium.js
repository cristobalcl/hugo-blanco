function updateMediumPosts(username) {
  fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@' + username)
    .then((res) => res.json())
    .then((data) => {
      // Fillter the array
      const res = data.items; //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter(item => item.categories.length > 0); // That's the main trick* !

      let output = '';
      posts.forEach((item) => {
        if (item.link.startsWith("https://medium.com/@" + username)) {
          output += `

    <article>
      <div>
        <h2><a href="${item.link}">${item.title}</a></h2>
        ${item.description}
      </div>
    </article>`
        }
      });

      document.querySelector('.medium_list').innerHTML = output;
    });
}
