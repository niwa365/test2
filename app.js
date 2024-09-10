document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('postForm');
  const postsContainer = document.getElementById('posts');

  function displayPosts() {
    postsContainer.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `<strong>${post.username}</strong>: ${post.message}`;
      postsContainer.appendChild(postElement);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    posts.push({ username, message });
    localStorage.setItem('posts', JSON.stringify(posts));
    form.reset();
    displayPosts();
  });

  displayPosts();
});
